const v = "1.0.0";

addEventListener('install', e => e.waitUntil(
  caches.open(v).then(cache => cache.addAll([
    '/',
    '/index.html',
    '/script.js',
    '/manifest.json',
    '/images/logo.png',
    '/favicon.ico'
  ]))
));

addEventListener('fetch', e => {
  console.log('fetch', e.request);
  e.respondWith(
    caches.match(e.request).then(cachedResponse =>
      cachedResponse || fetch(e.request)
    )
  );
});

addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key != v) return caches.delete(key);
    }));
  }));
});

addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    skipWaiting();
  }
});