/* sw.js — Grupo A Cobijo (versión simple, sin Workbox) */
const VERSION = 'v3';
const CACHE_STATIC = `acobijo-static-${VERSION}`;
const CACHE_RUNTIME = `acobijo-runtime-${VERSION}`;

/* Núcleo mínimo para funcionar offline */
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
];

/* Activos recomendados (intenta cachearlos pero no falles si no existen) */
const OPTIONAL_ASSETS = [
  './assets/logo-acobijo.svg',
  './assets/logo-acobijo.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/oyambre.jpg',
  './assets/ramales.jpg',
  './assets/cardeo.jpg',
  './assets/helguero.jpg'
];

/* Instalar: pre-cache de la shell + activos opcionales sin romper la instalación */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_STATIC);
    await cache.addAll(CORE_ASSETS);
    await Promise.allSettled(OPTIONAL_ASSETS.map(u => cache.add(u)));
    self.skipWaiting();
  })());
});

/* Activar: limpieza de versiones antiguas y control inmediato */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => ![CACHE_STATIC, CACHE_RUNTIME].includes(k))
          .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* Utilidades de estrategias */
async function cacheFirst(req, cacheName = CACHE_STATIC) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreVary: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && (res.status === 200 || res.type === 'opaque')) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    // Para navegaciones, sirve index.html como fallback
    if (req.mode === 'navigate') {
      const shell = await caches.match('./index.html');
      if (shell) return shell;
      return new Response(
        `<!doctype html><meta charset="utf-8"><title>Offline</title><body style="font-family:system-ui;padding:16px">Sin conexión. Vuelve a intentarlo más tarde.</body>`,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }
    throw err;
  }
}

async function networkFirst(req, cacheName = CACHE_RUNTIME) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && (res.status === 200 || res.type === 'opaque')) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreVary: true });
    if (hit) return hit;
    // Fallback de navegación a index
    if (req.mode === 'navigate') {
      const shell = await caches.match('./index.html');
      if (shell) return shell;
    }
    throw err;
  }
}

async function staleWhileRevalidate(req, cacheName = CACHE_RUNTIME) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreVary: true });
  const fetchPromise = fetch(req).then(res => {
    if (res && (res.status === 200 || res.type === 'opaque')) {
      cache.put(req, res.clone());
    }
    return res;
  }).catch(() => cached || Promise.reject());
  return cached || fetchPromise;
}

/* Fetch: 
   - Navegaciones HTML => networkFirst (para tener contenido fresco).
   - Estáticos same-origin (img, script, style, font) => cacheFirst.
   - Scripts de CDN (jsDelivr, unpkg) => staleWhileRevalidate.
   - Resto => networkFirst con fallback a cache. */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  // Navegación HTML (SPA / multipágina)
  if (req.mode === 'navigate' || (req.destination === 'document')) {
    event.respondWith(networkFirst(req));
    return;
  }

  // CDN comunes: entrega rápido desde cache mientras revalida
  const isCdn = /(^|\.)(cdn\.jsdelivr\.net|unpkg\.com)$/i.test(url.hostname);
  if (isCdn && req.destination === 'script') {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Estáticos same-origin
  if (isSameOrigin && ['image', 'script', 'style', 'font'].includes(req.destination)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Por defecto
  event.respondWith(networkFirst(req));
});

/* Manejo de mensajes desde la app (opcional) */
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
