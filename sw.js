// cache name, cache assets
const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'main.js',
    'style.css',
    'favicon.svg',
];

// install event
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    // cache all assets
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => { console.log('[Service Worker] Caching app...'); cache.addAll(cacheAssets); })
            .then(() => self.skipWaiting())
    );
}
);

// activate event
self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('[Service Worker] Removing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        }
        )
    );
}
);

// fetch event
self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetching something ....', event);
    // show cached data if offline
    if (event.request.url.includes("http")) {
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    const resClone = res.clone();
                    caches
                        .open(cacheName)
                        .then(cache => { cache.put(event.request, resClone); });
                    return res;
                })
                .catch(err => caches.match(event.request).then(res => res), err => console.log("a7a"))
        );
    }
}
);