// service-worker.js
// v5 — 2025-11-06 — SPA robusta (404->index), Navigation Preload, aviso de versión activa
const VERSION      = 'v5-2025-11-06';
const CACHE_STATIC = 'acobijo-static-' + VERSION;
const CACHE_DATA   = 'acobijo-data-' + VERSION;

// Helpers de ruta respetando el scope (GitHub Pages /subcarpeta/)
const SCOPE = new URL(self.registration.scope);
const R = (p) => new URL(p, SCOPE).pathname;

// Precarga lo esencial (para modo offline)
const CORE = [
  R('./'),                   // raíz del scope
  R('index.html'),
  R('assets/logo.png'),
  R('assets/icons/icon-192.png'),
  R('manifest.webmanifest')
];

// ---------- Install ----------
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_STATIC);
    // fetch+put en vez de addAll para tolerar fallos puntuales
    await Promise.all(CORE.map(async (url) => {
      try {
        const resp = await fetch(url, { cache: 'reload' });
        if (resp && resp.ok) await cache.put(url, resp);
      } catch (_) { /* ignorar errores individuales */ }
    }));
  })());
  self.skipWaiting();
});

// ---------- Activate ----------
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Borrar cachés antiguas
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => ![CACHE_STATIC, CACHE_DATA].includes(k))
      .map(k => caches.delete(k)));

    // Navigation Preload (si disponible)
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch (_) {}
    }

    await self.clients.claim();

    // Avisar a clientes que hay versión activa
    const cls = await self.clients.matchAll({ includeUncontrolled: true });
    cls.forEach(c => c.postMessage({ type: 'SW_ACTIVE', version: VERSION }));
  })());
});

// ---------- Estrategias ----------
function wantsFlush(url) {
  try { return new URL(url).searchParams.has('flush'); } catch { return false; }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req, { cache: 'no-store' });
    const key = new Request(new URL(req.url).pathname);
    cache.put(key, res.clone());
    return res;
  } catch (_) {
    const cached = await cache.match(new Request(new URL(req.url).pathname));
    if (cached) return cached;
    throw _;
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const key = new Request(new URL(req.url).pathname);
  const cached = await cache.match(key);
  const fetching = fetch(req)
    .then(res => { cache.put(key, res.clone()); return res; })
    .catch(() => null);
  return cached || fetching || fetch(req);
}

// ---------- Fetch ----------
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Bypass de caché con ?flush=1
  if (wantsFlush(req.url)) {
    event.respondWith(fetch(req, { cache: 'no-store' }).catch(() => caches.match(R('index.html'))));
    return;
  }

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  const path = url.pathname;

  // Navegación SPA: usa preload/red y cae a index.html si 404/offline
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = event.preloadResponse ? await event.preloadResponse : null;
        if (preload && preload.ok) return preload;

        const res = await fetch(req, { cache: 'no-store' });
        if (!res || !res.ok || res.status === 404 || res.type === 'opaqueredirect') {
          const cachedIndex = await caches.match(R('index.html'));
          return cachedIndex || res;
        }
        return res;
      } catch (_) {
        const cachedIndex = await caches.match(R('index.html'));
        return cachedIndex || new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }

  // Datos dinámicos (JSON) -> network-first
  if (path.endsWith('/events.json') || path.endsWith('/schedules.json') || path.endsWith('events.json') || path.endsWith('schedules.json')) {
    event.respondWith(networkFirst(req, CACHE_DATA));
    return;
  }

  // Estáticos mismo origen -> SWR
  if (isSameOrigin) {
    event.respondWith(staleWhileRevalidate(req, CACHE_STATIC));
    return;
  }

  // Externos -> red, cae a copia si existe
  event.respondWith(fetch(req).catch(() => caches.match(req, { ignoreSearch: true })));
});

// ---------- Mensajes ----------
self.addEventListener('message', (e) => {
  const msg = e.data;
  if (msg === 'SKIP_WAITING' && self.skipWaiting) {
    self.skipWaiting();
    return;
  }
  if (msg === 'CLEAR_CACHES') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    return;
  }
});
