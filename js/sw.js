const CACHE_NAME = 'dashboard-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/widgets/universal_time.js',
    '/js/widgets/system_resources.js',
    '/js/widgets/main_chart.js',
    '/js/widgets/weather.js',
    '/js/widgets/crypto.js',
    '/js/widgets/pomodoro.js',
    '/js/widgets/clipboard-manager.js',
    '/js/widgets/quick-calculator.js',
    '/js/widgets/todo-list.js',
    '/js/widgets/focus-mode.js',
    '/js/widgets/system-notes.js',
    '/js/widgets/media-tracker.js',
    '/js/widgets/notes.js',
    '/js/api.js',
    '/js/notes_gist.js',
    '/js/utils.js',
    '/assets/favicon.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache)
                    .catch(err => {
                        console.error('Failed to cache:', err);
                        // Se falhar ao adicionar algum item, continua sem ele
                        return Promise.all(
                            urlsToCache.map(url => {
                                return fetch(url)
                                    .then(response => {
                                        if (response.ok) {
                                            return cache.put(url, response);
                                        }
                                    })
                                    .catch(e => console.warn(`Skipped caching ${url}:`, e));
                            })
                        );
                    });
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(networkResponse => {
                        // Opcional: Estratégia de cache-first com atualização em background
                        // Aqui você pode escolher se quer armazenar respostas da rede no cache
                        return networkResponse;
                    })
                    .catch(() => {
                        // Retorna uma resposta fallback se tudo falhar
                        return new Response('Offline', { status: 503 });
                    });
            })
    );
});

// Limpa caches antigos (opcional, mas recomendado)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});