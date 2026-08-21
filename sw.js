const CACHE = 'math-tables-v1';
const ASSETS = [
  '/Tables/',
  '/Tables/index.html',
  '/Tables/logo.png',
  '/Tables/logo-192.png',
  '/Tables/logo-512.png',
  '/Tables/manifest.json'
];

// Install: pre-cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  e.waitUntil(self.clients.claim());
});

// Fetch: cache-first, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
