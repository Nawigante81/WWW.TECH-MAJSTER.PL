// sw.js – rozbudowany Service Worker
const CACHE_VERSION = 'v12';
const STATIC_CACHE = `tm-pro-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `tm-pro-dynamic-${CACHE_VERSION}`;
const HTML_FALLBACK_URL = '/index.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/uslugi.html',
  '/cennik.html',
  '/realizacje.html',
  '/porady.html',
  '/kontakt.html',
  '/o-nas.html',
  '/faq.html',
  '/assets/css/styles.css',
  '/assets/css/tailwind.css',
  '/assets/js/app.js',
  '/assets/js/pages.js',
  '/assets/js/web-vitals-fallback.js',
  '/assets/data/articles.json',
  '/assets/img/favicon.png',
  '/assets/img/logo.svg',
  '/assets/img/og-cover.jpg',
  '/assets/img/icon-512.png',
  '/manifest.webmanifest'
  // Opcjonalnie: modele /assets/models/demo.gltf itd.
];

// Util: limit dynamic entries
async function limitCache(cacheName, max = 60) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    await cache.delete(keys[0]);
    return limitCache(cacheName, max);
  }
}

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(STATIC_CACHE).then(c => c.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => ![STATIC_CACHE, DYNAMIC_CACHE].includes(k)).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', evt => {
  if (evt.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', evt => {
  const { request } = evt;
  const url = new URL(request.url);

  // Ignore non-GET or external (except same-origin)
  if (request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  // HTML navigation (SPA fallback)
  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    evt.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request)
          .then(res => {
            const copy = res.clone();
            caches.open(DYNAMIC_CACHE).then(c => c.put(request, copy));
            return res;
          })
          .catch(() => cached || caches.match(HTML_FALLBACK_URL));
        return cached || fetchPromise;
      })
    );
    return;
  }

  // JSON (articles) – network-first
  if (request.url.endsWith('/assets/data/articles.json')) {
    evt.respondWith(
      fetch(request)
        .then(res => {
          const copy = res.clone();
            caches.open(DYNAMIC_CACHE).then(c => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets – cache-first
  if (STATIC_ASSETS.includes(url.pathname)) {
    evt.respondWith(
      caches.match(request).then(cached =>
        cached ||
        fetch(request).then(res => {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(request, copy));
          return res;
        })
      )
    );
    return;
  }

  // Default: stale-while-revalidate (e.g. images added później)
  evt.respondWith(
    caches.match(request).then(cached => {
      const net = fetch(request)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(DYNAMIC_CACHE).then(c => {
              c.put(request, copy);
              limitCache(DYNAMIC_CACHE);
            });
          }
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});

// Opcjonalnie: oczyszczanie nieużywanych zgłoszeń push / sync (brak implementacji na teraz)