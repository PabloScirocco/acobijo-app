// --- service-worker.js (Grupo A Cobijo) ---
const CACHE_VERSION = 'v12';
const STATIC_CACHE  = `acobijo-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `acobijo-runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './events.json',
  // iconos / logos (ajusta si cambian rutas)
  './assets/logo.png',
  './assets/logo_acobijo_white.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

// dominios que NO queremos cachear (red directa)
const NETWORK_ONLY_HOSTS = [
  'api.github.com',
  'www.google.com',      // maps embed
  'maps.google.com',
  'maps.app.goo.gl',
  'wa.me'                // WhatsApp
];

// Utilidades
const isGET = req => req.method === 'GET';
const sameOrigin = url => url.origin === self.location.origin;
const hostIn = (url, list) => list.some(h => url.hostname === h);

// Pre-cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activación: limpia versiones antiguas y toma control
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(k => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
        .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// Mensaje opcional para forzar actualización inmediata
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Estrategias:
// - Navegación (HTML): network-first con fallback a cache (offline -> index.html)
// - events.json: network-first con fallback
// - Estáticos (imágenes/iconos): stale-while-revalidate
// - Hosts especiales (GitHub API, Maps, WhatsApp): network-only
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (!isGET(req)) return; // ignorar POST/PUT/etc.

  const url = new URL(req.url);

  // Red directa para dominios externos críticos (no cachear)
  if (!sameOrigin(url) && hostIn(url, NETWORK_ONLY_HOSTS)) {
    return; // dejar pasar (network only)
  }

  // Navegaciones (HTML, e.g., recargas o abrir como PWA)
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req, 'NAV'));
    return;
  }

  // events.json -> network-first
  if (sameOrigin(url) && url.pathname.endsWith('/events.json')) {
    event.respondWith(networkFirst(req, 'EVENTS'));
    return;
  }

  // Estáticos (imagenes / iconos / css / js)
  const isStaticAsset =
    sameOrigin(url) &&
    (
      url.pathname.startsWith('/assets/') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.webp') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')
    );

  if (isStaticAsset) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Por defecto: intenta cache runtime con SWR
  event.respondWith(staleWhileRevalidate(req));
});

// --- Estrategias concretas ---

async function networkFirst(request, tag = '') {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (err) {
    const cached = await cache.match(request) || await caches.match('./index.html');
    return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => undefined);
  return cached || fetchPromise || new Response('Offline', { status: 503, statusText: 'Offline' });
}