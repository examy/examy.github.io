// var staticCacheName = "pwaExamy" + new Date().getTime();
var staticCacheName = "pwaExamyV27" ;
var filesToCache = [
    './',
    // './serviceworker.js',
    './offline.html',
    // './images/icons/icon-32x32.png',
    './images/icons/icon-72x72.png',
    './images/icons/icon-96x96.png',
    './images/icons/icon-128x128.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-384x384.png',
    './images/icons/icon-512x512.png',
    './images/favicon-32x32.png',
    './images/favicon-96x96.png',
    './images/favicon-16x16.png',
    /* components */
    'scripts/loadjs.min.js',
    'styles/main3.css?v=2.6',
    'scripts/scripts.js?v=2.6',
    'https://code.jquery.com/jquery-3.2.0.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.8/angular.min.js',
    'scripts/katex/katex.min.css',
    'styles/yp-Medium.woff',
    'styles/yp-Light.woff',
    './bg.jpg',
    './manifest.json',
    './images/examy.svg',
    './images/app.png',

    /* code */
    //'https://ef010.000webhostapp.com/api/users',
];

// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                .filter(cacheName => (cacheName.startsWith("pwaExamy")))
                .filter(cacheName => (cacheName !== staticCacheName))
                .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
        .catch(() => {
            return caches.match('/offline.html');
        })
    )
});
