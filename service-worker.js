// service-worker-v4.js
// v4 — forzar actualización y arreglar botones sirviendo el index nuevo
const CACHE_STATIC = 'acobijo-static-v4';
const CACHE_DATA   = 'acobijo-data-v4';

// Helpers de ruta respetando el scope (GitHub Pages /subcarpeta/)
const SCOPE = new URL(self.registration.scope);
const R = (p) => new URL(p, SCOPE).pathname;

// Precarga lo esencial
const CORE = [
  R('./'), R('index.html'),
  R('assets/logo.png'),
  R('assets/icons/icon-192.png'),
  R('manifest.webmanifest')
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_STATIC).then(c => c.addAll(CORE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => ![CACHE_STATIC, CACHE_DATA].includes(k))
        .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Utilidades de estrategia
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request, { cache: 'no-store' });
    const key = new Request(new URL(request.url).pathname, { ignoreSearch: true });
    cache.put(key, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(new Request(new URL(request.url).pathname, { ignoreSearch: true }));
    if (cached) return cached;
    throw err;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const key = new Request(new URL(request.url).pathname, { ignoreSearch: true });
  const cached = await cache.match(key);
  const fetchPromise = fetch(request)
    .then(res => { cache.put(key, res.clone()); return res; })
    .catch(() => null);
  return cached || fetchPromise || fetch(request);
}

// Permite saltarse la caché con ?flush=1
function wantsFlush(url) {
  try { return new URL(url).searchParams.has('flush'); } catch { return false; }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  // Modo depuración: saltar caché
  if (wantsFlush(req.url)) {
    e.respondWith(fetch(req, { cache: 'no-store' }).catch(() => caches.match(R('index.html'))));
    return;
  }

  // Navegación: usa red y cae a index.html si offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match(R('index.html')))
    );
    return;
  }

  // Datos dinámicos (JSON) -> network-first
  const path = url.pathname;
  if (path.endsWith('events.json') || path.endsWith('schedules.json')) {
    e.respondWith(networkFirst(req, CACHE_DATA));
    return;
  }

  // Estáticos del mismo origen -> SWR
  if (isSameOrigin) {
    e.respondWith(staleWhileRevalidate(req, CACHE_STATIC));
    return;
  }

  // Recursos externos: intenta red, cae a caché si existe
  e.respondWith(
    fetch(req).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});

// (Opcional) Activar inmediatamente una nueva versión desde consola:
// navigator.serviceWorker.getRegistrations().then(r=>r[0].active.postMessage('SKIP_WAITING'))
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING' && self.skipWaiting) self.skipWaiting();
});
