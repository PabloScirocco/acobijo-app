(function () {
  'use strict';

  // Basic consent mode: do not load Google, create its queue, or send even a
  // consent ping until analytics has been explicitly accepted.
  const script = document.currentScript;
  const measurementId = script && script.dataset.measurementId;
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return;
  const storageKey = 'acobijo_analytics_consent_v1';
  const consentLifetime = 180 * 24 * 60 * 60 * 1000;
  const places = ['oyambre', 'ramales', 'ruiloba', 'cardeo', 'verdemar'];
  const views = ['home', 'stay', 'incidents', 'events', 'places', 'schedules', 'musts', 'food', 'markets', 'contacts', 'routes', 'awards', 'favorites', 'suggest'];
  const officialHosts = {
    'oyambre.com': 'oyambre', 'campingramales.com': 'ramales',
    'campingelhelguero.com': 'ruiloba', 'elhelguero.es': 'ruiloba',
    'elcardeo.es': 'cardeo', 'hotelacobijo.com': 'verdemar'
  };
  // Public reception numbers identify the destination, never an event field.
  const whatsappPlaces = {
    '34675696212': 'oyambre', '34654463133': 'ramales',
    '34652826564': 'ruiloba', '34664686158': 'cardeo', '34662204718': 'verdemar'
  };
  const copy = {
    es: ['Privacidad y estadísticas', '¿Nos ayudas a mejorar la app?', 'Con tu permiso, usamos cookies de Google Analytics para conocer las visitas y el uso de la app. No las usamos para publicidad. Puedes cambiar tu elección aquí en cualquier momento.', 'Aceptar estadísticas', 'Rechazar estadísticas', 'Privacidad de Google', 'Estadísticas activadas', 'Estadísticas desactivadas', 'Todavía no has elegido.'],
    en: ['Privacy and analytics', 'Help us improve the app?', 'With your permission, we use Google Analytics cookies to understand visits and app usage. We do not use them for advertising. You can change your choice here at any time.', 'Accept analytics', 'Reject analytics', 'Google privacy', 'Analytics enabled', 'Analytics disabled', 'You have not chosen yet.'],
    fr: ['Confidentialité et statistiques', 'Nous aider à améliorer l’application ?', 'Avec votre accord, nous utilisons les cookies Google Analytics pour connaître les visites et l’utilisation de l’application. Nous ne les utilisons pas à des fins publicitaires. Vous pouvez modifier votre choix ici à tout moment.', 'Accepter les statistiques', 'Refuser les statistiques', 'Confidentialité Google', 'Statistiques activées', 'Statistiques désactivées', 'Vous n’avez pas encore choisi.'],
    de: ['Datenschutz und Statistik', 'Helfen Sie uns, die App zu verbessern?', 'Mit Ihrer Zustimmung verwenden wir Google-Analytics-Cookies, um Besuche und die Nutzung der App zu verstehen. Wir nutzen sie nicht für Werbung. Sie können Ihre Wahl hier jederzeit ändern.', 'Statistik akzeptieren', 'Statistik ablehnen', 'Google-Datenschutz', 'Statistik aktiviert', 'Statistik deaktiviert', 'Sie haben noch keine Auswahl getroffen.'],
    nl: ['Privacy en statistieken', 'Help je ons de app te verbeteren?', 'Met je toestemming gebruiken we Google Analytics-cookies om bezoeken en het gebruik van de app te begrijpen. We gebruiken ze niet voor advertenties. Je kunt je keuze hier altijd wijzigen.', 'Statistieken toestaan', 'Statistieken weigeren', 'Privacy van Google', 'Statistieken ingeschakeld', 'Statistieken uitgeschakeld', 'Je hebt nog geen keuze gemaakt.']
  };
  const baseUrl = new URL('../', script.src);
  let choice = readChoice(), enabled = false, loaded = false;
  let lastPage = '', scheduled = false, standaloneSent = false, installSent = false;
  let lastEstablishment = selectedPlace();
  let panel, preferences, status, pendingPromo = 0;

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return saved && ['accepted', 'rejected'].includes(saved.value) &&
        Number.isFinite(saved.expires) && saved.expires > Date.now() ? saved : null;
    } catch (_) { return null; }
  }
  function language() {
    let lang;
    try { lang = localStorage.getItem('lang'); } catch (_) {}
    if (Object.hasOwn(copy, lang)) return lang;
    // The app resolves navigator.language and publishes the result on <html>.
    const documentLanguage = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    return Object.hasOwn(copy, documentLanguage) ? documentLanguage : 'es';
  }
  function selectedPlace() {
    const value = document.getElementById('stayPlace')?.value;
    return places.includes(value) ? value : 'oyambre';
  }
  function currentView() {
    const value = document.querySelector('.view.active')?.id.replace(/^view-/, '');
    return views.includes(value) ? value : 'home';
  }
  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  }
  function context() {
    const view = currentView();
    // Never forward location.search/hash, referrers, form values or link text.
    const url = new URL(baseUrl.href);
    url.searchParams.set('nav', view);
    if (view === 'stay') url.searchParams.set('focus', selectedPlace());
    return {
      page_location: url.href, page_referrer: '',
      page_title: 'Grupo A Cobijo · ' + view + (view === 'stay' ? ' · ' + selectedPlace() : ''),
      app_section: view, establishment: selectedPlace(), ui_language: language(),
      app_mode: isStandalone() ? 'standalone' : 'browser'
    };
  }
  function send(name, extra = {}) {
    if (!enabled) return;
    window.gtag('event', name, Object.assign({ send_to: measurementId }, context(), extra));
  }
  function pageView() {
    if (!enabled) return;
    const data = context();
    if (data.page_location === lastPage) return;
    lastPage = data.page_location;
    // This also keeps automatically generated engagement events on the safe URL.
    window.gtag('set', { page_location: data.page_location, page_title: data.page_title, page_referrer: '' });
    send('page_view');
  }
  function schedulePageView() {
    if (scheduled) return;
    scheduled = true;
    Promise.resolve().then(() => { scheduled = false; pageView(); });
  }
  function updateEstablishment() {
    const place = selectedPlace();
    if (place !== lastEstablishment) {
      lastEstablishment = place;
      send('select_establishment');
    }
    schedulePageView();
  }
  function openStandalone() {
    if (enabled && isStandalone() && !standaloneSent) {
      standaloneSent = true;
      send('pwa_open');
    }
  }
  function startAnalytics() {
    if (enabled) return;
    enabled = true;
    lastEstablishment = selectedPlace();
    window['ga-disable-' + measurementId] = false;
    if (!loaded) {
      loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
      });
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      window.gtag('js', new Date());
      window.gtag('config', measurementId, Object.assign({
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false, ignore_referrer: true,
        cookie_prefix: 'acobijo', cookie_domain: location.hostname,
        cookie_path: baseUrl.pathname, cookie_expires: 15552000,
        cookie_update: false
      }, context()));
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
      document.head.append(tag);
    }
    pageView();
    openStandalone();
  }
  function removeAnalyticsCookies() {
    // Only our prefixed cookies; preserve other applications on this host.
    document.cookie.split(';').forEach(part => {
      const name = part.trim().split('=')[0];
      if (!/^acobijo_ga(?:_|$)/.test(name)) return;
      [baseUrl.pathname, '/'].forEach(path => {
        ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach(domain => {
          document.cookie = name + '=; Max-Age=0; path=' + path + domain + '; SameSite=Lax';
        });
      });
    });
  }
  function stopAnalytics() {
    enabled = false;
    window['ga-disable-' + measurementId] = true;
    removeAnalyticsCookies();
    // Unload Google's listeners and queued automatic events, without sending a
    // denied-consent ping. The next load sees the saved rejection.
    if (loaded) location.reload();
  }
  function choose(value) {
    choice = { value, expires: Date.now() + consentLifetime };
    try { localStorage.setItem(storageKey, JSON.stringify(choice)); } catch (_) {}
    panel.hidden = true;
    renderCopy();
    if (value === 'accepted') startAnalytics(); else stopAnalytics();
    preferences.focus({ preventScroll: true });
  }
  function renderCopy() {
    if (!panel) return;
    const words = copy[language()];
    panel.querySelectorAll('[data-analytics-copy]').forEach(node => {
      node.textContent = words[Number(node.dataset.analyticsCopy)];
    });
    preferences.textContent = words[0];
    status.textContent = words[choice?.value === 'accepted' ? 6 : choice?.value === 'rejected' ? 7 : 8];
  }
  function buildPreferences() {
    const main = document.querySelector('main');
    if (!main) return;
    panel = document.createElement('section');
    panel.id = 'analyticsPreferences';
    panel.className = 'analytics-consent';
    panel.setAttribute('aria-labelledby', 'analyticsTitle');
    panel.tabIndex = -1;
    panel.innerHTML = '<div><h2 id="analyticsTitle" data-analytics-copy="1"></h2>' +
      '<p data-analytics-copy="2"></p><a href="https://policies.google.com/privacy" target="_blank" rel="noopener" data-analytics-copy="5"></a></div>' +
      '<div class="analytics-consent-actions"><button type="button" class="btn" id="analyticsAccept" data-analytics-copy="3"></button>' +
      '<button type="button" class="btn" id="analyticsReject" data-analytics-copy="4"></button></div>';
    panel.hidden = !!choice;
    main.prepend(panel);
    const footer = document.createElement('footer');
    footer.className = 'analytics-footer';
    preferences = document.createElement('button');
    preferences.type = 'button';
    preferences.className = 'text-link';
    preferences.setAttribute('aria-controls', panel.id);
    preferences.onclick = () => {
      panel.hidden = false;
      panel.scrollIntoView({ behavior: 'auto', block: 'start' });
      panel.focus({ preventScroll: true });
    };
    status = document.createElement('span');
    status.setAttribute('role', 'status');
    footer.append(preferences, status);
    main.append(footer);
    document.getElementById('analyticsAccept').onclick = () => choose('accepted');
    document.getElementById('analyticsReject').onclick = () => choose('rejected');
    renderCopy();
    if (choice?.value === 'accepted') startAnalytics();
  }
  function contactPlace(node, url) {
    const host = url.hostname.replace(/^www\./, '');
    const number = (host === 'wa.me' ? url.pathname.replace(/^\/|\/$/g, '') : url.searchParams.get('phone') || '').replace(/^\+/, '');
    if (Object.hasOwn(whatsappPlaces, number)) return whatsappPlaces[number];
    const card = node.closest('[id^="place-"]');
    const id = card?.id.slice(6);
    if (places.includes(id)) return id;
    if (node.closest('#oyambreRestaurant')) return 'oyambre';
    if (node.closest('#ramalesRestaurant')) return 'ramales';
    const incident = document.getElementById('incPlace')?.value;
    return node.id === 'incWA' && places.includes(incident) ? incident : selectedPlace();
  }
  document.addEventListener('click', event => {
    if (!enabled) return;
    const node = event.target.closest('a,button');
    if (!node) return;
    if (node.classList.contains('promo-copy')) { pendingPromo = Date.now(); return; }
    if (node.id === 'stayWeb') { send('official_website_click'); return; }
    if (node.tagName !== 'A') return;
    let url;
    try { url = new URL(node.href); } catch (_) { return; }
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'wa.me' || host === 'api.whatsapp.com') {
      send('whatsapp_click', { establishment: contactPlace(node, url), contact_context: node.closest('.restaurant-card') ? 'restaurant' : 'reception' });
      return;
    }
    const place = officialHosts[host];
    if (place && (/^\/$/.test(url.pathname) || /^\/(reservas?|booking)(\/|$)/i.test(url.pathname))) {
      send('official_website_click', { establishment: place });
      return;
    }
    const routeId = node.closest('[data-route-id]')?.dataset.routeId;
    const route = (window.ACOBIJO_ROUTES || []).find(row => row.id === routeId);
    if (route && /^\d+$/.test(routeId) && (host === 'wikiloc.com' || host.endsWith('.wikiloc.com'))) {
      send('route_open', { route_id: routeId, route_activity: route.activity === 'bike' ? 'bike' : 'walk' });
    }
  }, true);
  window.addEventListener('acobijo:feedback', event => {
    const message = event.detail?.message;
    const success = ['Código copiado', 'Code copied', 'Code copié', 'Code kopiert', 'Code gekopieerd'];
    if (pendingPromo && Date.now() - pendingPromo < 10000 && success.includes(message) &&
        document.querySelector('.promo-feedback')?.textContent === message) {
      pendingPromo = 0;
      send('promo_code_copy', { promotion: 'appcobijo_2026' });
    }
  });
  document.addEventListener('acobijo:view', schedulePageView);
  window.addEventListener('acobijo:stay-tools', updateEstablishment);
  document.addEventListener('change', event => {
    if (['stayPlace', 'homePlace'].includes(event.target.id)) updateEstablishment();
  });
  document.addEventListener('acobijo:language', renderCopy);
  window.addEventListener('appinstalled', () => {
    if (enabled && !installSent) { installSent = true; send('pwa_install'); }
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    choice = readChoice();
    if (panel) { panel.hidden = !!choice; renderCopy(); }
    if (choice?.value === 'accepted') startAnalytics(); else stopAnalytics();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    if (choice && choice.expires <= Date.now()) {
      choice = null;
      if (panel) { panel.hidden = false; renderCopy(); }
      stopAnalytics();
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildPreferences);
  else buildPreferences();
})();
