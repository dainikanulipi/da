const CACHE_NAME = 'anulipi-desk-v1';

// Install: nothing to pre-cache — desk pages always need live data
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch: always go to network (no offline caching for admin/reporter tools)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
