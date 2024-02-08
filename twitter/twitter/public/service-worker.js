const CACHE_NAME = 'version-1';
const urlsToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/592.433cbff2.chunk.js',
    '/static/js/592.433cbff2.chunk.js.map',
    '/static/js/main.b514a1ff.js',
    '/static/js/main.b514a1ff.js.map',
    '/static/css/main.f855e6bc.css',
    '/static/css/main.f855e6bc.css.map',
    '/manifest.json',
    '/favicon.ico',
];

// Installation du SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Écouter les requêtes
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/tweets')) {
        // Utiliser une stratégie de cache pour les données de l'API
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        // Mettre en cache la copie de la réponse puis la retourner
                        cache.put(event.request.url, response.clone());
                        return response;
                    })
                    .catch(() => {
                        // Si la requête réseau échoue, essayer de récupérer dans le cache
                        return cache.match(event.request);
                    });
            })
        );
    } else {
        // Stratégie de cache pour les autres requêtes (ressources statiques, etc.)
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    return response || fetch(event.request).catch(() => caches.match('/offline.html'));
                })
        );
    }
});


// Activer le SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});
