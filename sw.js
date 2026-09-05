/* fb40 · /sw.js · v0.2.0 · 2026-09-05 */
const CACHE_NAME = 'fb40-shell-v0.2.0';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './styles/tokens.css',
  './styles/base.css',
  './styles/layout.css',
  './styles/map.css',
  './styles/chapel.css',
  './styles/sheet.css',
  './js/main.js',
  './js/core/db.js',
  './js/core/state.js',
  './js/core/router.js',
  './js/core/events.js',
  './js/core/dates.js',
  './js/core/version.js',
  './js/core/log.js',
  './js/data/schema.js',
  './js/data/migrate.js',
  './js/data/backup.js',
  './js/life/activities.js',
  './js/systems/chapel.js',
  './js/ui/shell.js',
  './js/ui/onboarding.js',
  './js/ui/map.js',
  './js/ui/chapel.js',
  './js/ui/settings.js',
  './js/ui/sheet.js',
  './js/ui/locked.js',
  './js/ui/components/button.js',
  './js/ui/components/field.js',
  './js/ui/components/notice.js',
  './data/config.json',
  './data/prologue-questions.json',
  './data/asset-manifest.json',
  './assets/settlement/settlement-shell.webp',
  './assets/settlement/settlement-shell-fallback.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('fb40-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
