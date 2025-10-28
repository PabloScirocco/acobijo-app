/* Simple service worker cache-first */
const CACHE_NAME = 'acobijo-v1';
const OFFLINE_URL = '/offline.html';
const ASSETS = [
  '/', '/index.html', '/styles.css', '/app.js',
  '/manifest.webmanifest', '/offline.html',
  '/data/sites.json',
  '/assets/icon-192.png', '/assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    try {
      // Try network first for JSON (so data stays fresh)
      if (req.url.endsWith('/data/sites.json')) {
        const net = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, net.clone());
        return net;
      }
      const cached = await caches.match(req);
      return cached || fetch(req);
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') return caches.match(OFFLINE_URL);
      throw err;
    }
  })());
});
