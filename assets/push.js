(function () {
  'use strict';

  // Only the public application ID belongs in this static website.
  const APP_ID = '8f825451-a654-4daf-aafd-7dc27706d48a';
  const SDK_URL = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
  const STORAGE_KEY = 'acobijo_push_preferences_v1';
  const PLACES = ['oyambre', 'ramales', 'ruiloba', 'cardeo', 'verdemar'];
  const CATEGORY_IDS = { events: 'pushEvents', offers: 'pushOffers', important: 'pushImportant' };
  const fallback = {
    inactive: 'Los avisos están desactivados.', active: 'Los avisos están activados.',
    preparing: 'Preparando los avisos…', syncing: 'Guardando las preferencias…',
    checking: 'Comprobando los avisos…', disabling: 'Desactivando los avisos…',
    offline: 'Necesitas conexión para gestionar los avisos.',
    unsupported: 'Este navegador no admite los avisos.',
    installRequired: 'Instala la app para activar los avisos en este dispositivo.',
    denied: 'Los avisos están bloqueados en los ajustes del navegador.',
    chooseCategory: 'Elige al menos un tipo de aviso, o desactiva los avisos.',
    error: 'No hemos podido activar los avisos. Vuelve a intentarlo.',
    saveError: 'No hemos podido guardar las preferencias. Vuelve a intentarlo.',
    disableError: 'No hemos podido confirmar la baja. Vuelve a intentarlo.',
    permissionDismissed: 'No se han activado los avisos. Puedes volver a intentarlo.',
    preferencesChanged: 'Tienes cambios sin guardar.',
    help: 'Puedes cambiar el alojamiento y los tipos de aviso o desactivarlos aquí.',
    helpInstall: 'En iOS 16.4 o posterior: Safari → Compartir → Añadir a pantalla de inicio. Abre la app instalada.',
    helpDenied: 'Permite las notificaciones de esta web en los ajustes del navegador y vuelve aquí.',
    helpOffline: 'Vuelve a intentarlo cuando recuperes la conexión.',
    helpError: 'Comprueba la conexión. Si el problema continúa, vuelve a abrir la app.',
    helpDisableError: 'También puedes bloquear las notificaciones en los ajustes del navegador.'
  };
  let panel, fields, saved = readSaved(), dirty = false, busy = false;
  let sdk, sdkPromise, initialization, statusKey = 'inactive', helpKey = 'help';
  let tagSignature = '', generation = 0, bound = false;

  function normalize(value) {
    if (!value || !PLACES.includes(value.place) || typeof value.enabled !== 'boolean') return null;
    if (Object.keys(CATEGORY_IDS).some(key => typeof value[key] !== 'boolean')) return null;
    return {
      place: value.place, events: value.events, offers: value.offers, important: value.important,
      enabled: value.enabled, pendingDisable: value.pendingDisable === true
    };
  }
  function readSaved() {
    try { return normalize(JSON.parse(localStorage.getItem(STORAGE_KEY))); } catch (_) { return null; }
  }
  function store(value) {
    const next = normalize(value);
    if (!next) throw new Error('Invalid preferences');
    // A persistent opt-out is needed so reloading can never silently opt back in.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    saved = next;
  }
  function toTags(value) {
    return { camping: value.place, events: value.events ? '1' : '0', offers: value.offers ? '1' : '0', important: value.important ? '1' : '0' };
  }
  function signature(value) { return JSON.stringify(toTags(value)); }
  function language() {
    let value;
    try { value = localStorage.getItem('lang'); } catch (_) {}
    if (!['es', 'en', 'fr', 'de', 'nl'].includes(value)) value = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return ['es', 'en', 'fr', 'de', 'nl'].includes(value) ? value : 'es';
  }
  function words() { return Object.assign({}, fallback, window.ACOBIJO_PUSH_COPY?.es, window.ACOBIJO_PUSH_COPY?.[language()]); }
  function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent || '') || (/Macintosh/.test(navigator.userAgent || '') && navigator.maxTouchPoints > 1); }
  function standalone() { return navigator.standalone === true || !!window.matchMedia?.('(display-mode: standalone)').matches; }
  function permission() { return window.Notification?.permission || 'default'; }
  function availability() {
    if (isIOS() && !standalone()) return 'installRequired';
    if (!window.isSecureContext || !('serviceWorker' in navigator) || !window.PushManager || !window.Notification) return 'unsupported';
    if (permission() === 'denied') return 'denied';
    if (navigator.onLine === false) return 'offline';
    return null;
  }
  function sub() { return sdk?.User?.PushSubscription; }
  function subscribed() { return !!(sub()?.id && sub().optedIn === true && permission() === 'granted'); }
  function active() { return !!(saved?.enabled && !saved.pendingDisable && subscribed() && tagSignature === signature(saved)); }
  function setStatus(key, help) {
    statusKey = key;
    helpKey = help || ({ installRequired: 'helpInstall', denied: 'helpDenied', offline: 'helpOffline', error: 'helpError', saveError: 'helpError', disableError: 'helpDisableError' }[key] || 'help');
    render();
  }
  function render() {
    if (!panel) return;
    const copy = words();
    panel.querySelectorAll('[data-push-copy]').forEach(node => {
      const key = node.dataset.pushCopy;
      if (typeof copy[key] === 'string') node.textContent = copy[key];
    });
    fields.status.textContent = copy[statusKey] || fallback.error;
    fields.help.textContent = copy[helpKey] || fallback.help;
    panel.dataset.pushState = statusKey;
    panel.setAttribute('aria-busy', String(busy));
    const enabled = active();
    fields.enable.hidden = enabled;
    fields.save.hidden = !saved?.enabled || saved.pendingDisable;
    fields.disable.hidden = !(saved?.enabled || saved?.pendingDisable || subscribed());
    [fields.enable, fields.save, fields.disable, fields.place, ...Object.keys(CATEGORY_IDS).map(key => fields[key])].forEach(node => { node.disabled = busy; });
    const unavailable = ['unsupported', 'installRequired'].includes(availability());
    fields.enable.disabled = busy || unavailable;
    fields.save.disabled = busy || unavailable;
  }
  function formValue(enabled) {
    return normalize({ place: fields.place.value, events: fields.events.checked, offers: fields.offers.checked, important: fields.important.checked, enabled, pendingDisable: false });
  }
  function populate(value) {
    fields.place.value = value.place;
    Object.keys(CATEGORY_IDS).forEach(key => { fields[key].checked = value[key]; });
  }
  function currentPlace() {
    const place = document.getElementById('stayPlace')?.value;
    return PLACES.includes(place) ? place : 'oyambre';
  }
  function defaultValue() { return { place: currentPlace(), events: true, offers: false, important: true, enabled: false, pendingDisable: false }; }
  function refresh() {
    if (busy) { render(); return; }
    if (saved?.pendingDisable) { setStatus('disableError'); return; }
    const problem = availability();
    if (problem) { setStatus(problem); return; }
    if (dirty && saved?.enabled) { setStatus('preferencesChanged'); return; }
    setStatus(active() ? 'active' : 'inactive');
  }
  function timeLimit(promise, milliseconds = 15000) {
    let timer;
    return Promise.race([Promise.resolve(promise), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Timed out')), milliseconds); })]).finally(() => clearTimeout(timer));
  }
  function loadSDK() {
    if (sdk) return Promise.resolve(sdk);
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise((resolve, reject) => {
      let settled = false, script;
      const timer = setTimeout(() => finish(new Error('SDK unavailable')), 15000);
      function finish(error, value) {
        if (settled) return;
        settled = true; clearTimeout(timer);
        if (error) { sdkPromise = null; script?.remove(); reject(error); } else resolve(value);
      }
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async OneSignal => {
        try {
          // Never install a second worker at the PWA's existing scope.
          if (!initialization) initialization = Promise.resolve().then(() => OneSignal.init({
            appId: APP_ID,
            serviceWorkerPath: 'acobijo-app/push/onesignal/OneSignalSDKWorker.js',
            serviceWorkerParam: { scope: '/acobijo-app/push/onesignal/' },
            autoResubscribe: false,
            notifyButton: { enable: false },
            promptOptions: { slidedown: { prompts: [{ type: 'push', autoPrompt: false }] } },
            welcomeNotification: { disable: true }
          })).catch(error => { initialization = null; throw error; });
          await initialization;
          if (!sdk) {
            sdk = OneSignal;
            sdk.User.PushSubscription.addEventListener('change', () => {
              if (!saved?.enabled && sdk.User.PushSubscription.optedIn) {
                Promise.resolve().then(() => sdk.User.PushSubscription.optOut()).then(() => {
                  if (sdk.User.PushSubscription.optedIn !== false) throw new Error('Opt-out not confirmed');
                  if (saved?.pendingDisable) store({ ...saved, pendingDisable: false });
                  if (!busy) refresh();
                }).catch(() => setStatus('disableError'));
                return;
              }
              if (!busy) refresh();
            });
            sdk.Notifications?.addEventListener('permissionChange', () => { if (!busy) refresh(); });
          }
          // A timed-out script may finish after the guest has cancelled, or a
          // second tab may have disabled push while initialization was pending.
          if (!saved?.enabled) {
            await timeLimit(sdk.User.PushSubscription.optOut());
            if (sdk.User.PushSubscription.optedIn !== false) throw new Error('Opt-out not confirmed');
            if (saved?.pendingDisable) store({ ...saved, pendingDisable: false });
          }
          finish(null, sdk);
        } catch (error) { finish(error); }
      });
      // After a network failure the downloaded SDK may still be available.
      if (!window.OneSignal?.init) {
        script = document.createElement('script');
        script.src = SDK_URL; script.async = true;
        script.dataset.acobijoPushSdk = 'true';
        script.onerror = () => finish(new Error('SDK download failed'));
        document.head.append(script);
      }
    });
    return sdkPromise;
  }
  function assertCurrent(epoch) {
    if (epoch !== generation) throw new Error('Preferences changed in another tab');
    if (navigator.onLine === false) throw new Error('Offline');
  }
  async function waitForSubscription(epoch) {
    if (subscribed()) return;
    await new Promise((resolve, reject) => {
      const subscription = sub();
      const timer = setTimeout(() => finish(new Error('Subscription timed out')), 15000);
      function finish(error) {
        clearTimeout(timer);
        subscription.removeEventListener('change', changed);
        if (error) reject(error); else resolve();
      }
      function changed() {
        try { assertCurrent(epoch); if (subscribed()) finish(); }
        catch (error) { finish(error); }
      }
      subscription.addEventListener('change', changed);
      changed();
    });
  }
  async function syncTags(epoch) {
    assertCurrent(epoch);
    if (!subscribed() || !saved?.enabled || saved.pendingDisable) throw new Error('No active subscription');
    const expected = toTags(saved);
    tagSignature = '';
    // v16 addTags accepts a local update, not a server-delivery acknowledgement.
    // Check acceptance and the plan quota; never report a caught failure as active.
    const existing = sdk.User.getTags() || {};
    if (new Set([...Object.keys(existing), ...Object.keys(expected)]).size > 6) throw new Error('Tag limit');
    await Promise.resolve(sdk.User.addTags(expected));
    assertCurrent(epoch);
    const actual = sdk.User.getTags() || {};
    if (Object.keys(expected).some(key => actual[key] !== expected[key])) throw new Error('Tags not accepted');
    tagSignature = signature(saved);
  }
  async function rollback(epoch, failureStatus) {
    tagSignature = '';
    if (epoch !== generation) return;
    try { store({ ...(saved || defaultValue()), enabled: false, pendingDisable: true }); }
    catch (_) { saved = { ...(saved || defaultValue()), enabled: false, pendingDisable: true }; }
    if (sdk) {
      try {
        await timeLimit(sub().optOut());
        if (sub().optedIn !== false) throw new Error('Opt-out not confirmed');
        store({ ...saved, enabled: false, pendingDisable: false });
      } catch (_) { setStatus('disableError'); return; }
    }
    setStatus(failureStatus);
  }
  async function settled(epoch) {
    // An in-flight optIn can resolve after another tab has called optOut.
    if (epoch !== generation && !saved?.enabled && sdk) {
      try { await timeLimit(sub().optOut()); }
      catch (_) { setStatus('disableError'); }
    }
    busy = false; render();
    if (epoch !== generation) resume();
  }
  async function enable() {
    if (busy) return;
    const problem = availability();
    if (problem) { setStatus(problem); return; }
    const next = formValue(true);
    if (!next || !(next.events || next.offers || next.important)) { setStatus('chooseCategory'); return; }
    const epoch = ++generation;
    busy = true; tagSignature = ''; setStatus('preparing');
    try {
      store(next); dirty = false;
      // Request in the original click task, BEFORE downloading or awaiting SDK.
      // This preserves the user gesture required by iOS Home Screen web apps.
      const requested = permission() === 'granted' ? 'granted' : await window.Notification.requestPermission();
      assertCurrent(epoch);
      if (requested !== 'granted') {
        store({ ...saved, enabled: false, pendingDisable: false });
        setStatus(requested === 'denied' ? 'denied' : 'permissionDismissed'); return;
      }
      await loadSDK(); assertCurrent(epoch);
      if (!sdk.Notifications.isPushSupported()) { await rollback(epoch, 'unsupported'); return; }
      if (permission() !== 'granted') throw new Error('Notification permission changed');
      if (!sub().token) {
        // Native permission and a push subscription are different. In v16,
        // optIn() with granted permission only clears optedOut; it does not
        // register a missing push token. The SDK request performs registration.
        // Since permission is already granted, it shows no second native prompt.
        const registration = Promise.resolve(sdk.Notifications.requestPermission());
        registration.then(() => { if (!saved?.enabled) return sub().optOut(); }).catch(() => {});
        const registered = await timeLimit(registration); assertCurrent(epoch);
        if (!registered) throw new Error('Push registration failed');
      }
      if (permission() !== 'granted') throw new Error('Notification permission changed');
      if (!sub().optedIn) {
        // An existing token can be explicitly opted out from a previous visit.
        const optedIn = Promise.resolve(sub().optIn());
        optedIn.then(() => { if (!saved?.enabled) return sub().optOut(); }).catch(() => {});
        await timeLimit(optedIn); assertCurrent(epoch);
      }
      await waitForSubscription(epoch);
      setStatus('syncing'); await syncTags(epoch);
      setStatus('active');
    } catch (_) { await rollback(epoch, navigator.onLine === false ? 'offline' : 'error'); }
    finally { await settled(epoch); }
  }
  async function save() {
    if (busy || !saved?.enabled || saved.pendingDisable) return;
    const next = formValue(true);
    if (!next || !(next.events || next.offers || next.important)) { setStatus('chooseCategory'); return; }
    const epoch = ++generation;
    busy = true; tagSignature = ''; setStatus('syncing');
    try {
      store(next); dirty = false;
      assertCurrent(epoch); await loadSDK(); assertCurrent(epoch);
      await syncTags(epoch); setStatus('active');
    } catch (_) { await rollback(epoch, navigator.onLine === false ? 'offline' : 'saveError'); }
    finally { await settled(epoch); }
  }
  async function finishDisable(epoch) {
    assertCurrent(epoch); await loadSDK(); assertCurrent(epoch);
    await timeLimit(sub().optOut()); assertCurrent(epoch);
    if (sub().optedIn !== false) throw new Error('Opt-out not confirmed');
    store(Object.assign({}, saved, { enabled: false, pendingDisable: false }));
    tagSignature = ''; setStatus('inactive');
  }
  async function disable() {
    if (busy) return;
    const epoch = ++generation;
    busy = true; tagSignature = ''; setStatus('disabling');
    try {
      store(Object.assign({}, saved || defaultValue(), { enabled: false, pendingDisable: true }));
      dirty = false;
      await finishDisable(epoch);
    } catch (_) { if (epoch === generation) setStatus('disableError'); }
    finally { await settled(epoch); }
  }
  async function resume() {
    if (busy || !saved || (!saved.enabled && !saved.pendingDisable)) { refresh(); return; }
    if (saved.pendingDisable) { await disable(); return; }
    const problem = availability();
    if (problem) { setStatus(problem); return; }
    // A saved preference is not permission: returning visitors are never prompted.
    if (permission() !== 'granted') { refresh(); return; }
    const epoch = ++generation;
    busy = true; tagSignature = ''; setStatus('checking');
    try {
      await loadSDK(); assertCurrent(epoch);
      if (!subscribed()) { setStatus('inactive'); return; }
      await syncTags(epoch); setStatus(dirty ? 'preferencesChanged' : 'active');
    } catch (_) { await rollback(epoch, navigator.onLine === false ? 'offline' : 'saveError'); }
    finally { await settled(epoch); }
  }
  function bind() {
    if (bound) return;
    panel = document.getElementById('pushPanel');
    if (!panel) return;
    fields = {};
    for (const [key, id] of Object.entries({ place: 'pushPlace', enable: 'pushEnable', save: 'pushSave', disable: 'pushDisable', status: 'pushStatus', help: 'pushHelp', ...CATEGORY_IDS })) {
      fields[key] = document.getElementById(id);
      if (!fields[key]) return;
    }
    bound = true; panel.hidden = false;
    populate(saved || defaultValue());
    fields.enable.addEventListener('click', enable);
    fields.save.addEventListener('click', save);
    fields.disable.addEventListener('click', disable);
    [fields.place, ...Object.keys(CATEGORY_IDS).map(key => fields[key])].forEach(node => node.addEventListener('change', () => { dirty = true; refresh(); }));
    document.addEventListener('acobijo:language', render);
    window.addEventListener('acobijo:stay-tools', () => {
      // Prefill only until the guest edits or saves notification preferences.
      if (!saved && !dirty && !busy) fields.place.value = currentPlace();
    });
    window.addEventListener('offline', () => { if (!busy) refresh(); });
    window.addEventListener('online', () => { if (!busy) resume(); });
    window.addEventListener('pageshow', () => { if (!busy) resume(); });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && !busy) resume(); });
    window.addEventListener('storage', event => {
      if (event.key !== STORAGE_KEY) return;
      generation++; saved = readSaved(); tagSignature = ''; dirty = false;
      populate(saved || defaultValue());
      // Honour a second tab's opt-out even if an enable operation was in flight.
      if (!saved?.enabled && sdk) Promise.resolve().then(() => sub().optOut()).catch(() => setStatus('disableError'));
      if (!busy) resume(); else render();
    });
    resume();
  }
  // Pure helpers and a read-only snapshot support regression tests without sends.
  window.ACOBIJO_PUSH = Object.freeze({
    normalizePreferences: normalize, toTags,
    getState: () => ({ status: statusKey, busy, active: active(), dirty, preferences: saved ? { ...saved } : null }),
    appId: APP_ID, storageKey: STORAGE_KEY
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
