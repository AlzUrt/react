const PRECACHE_NAME = 'app-shell';
const CACHE = "poke-cache";

self.addEventListener('install', function(event) {
    console.log('Installation...');

    caches.open(PRECACHE_NAME).then(function(cache){
        cache.addAll(
            [
                '/',
                "https://cdn.jsdelvir.net/npm/bootstrap@5.3.2/dist/css/bootsrap.min.css",
                "/static/css/main.e6c13ad2.css",
                "/static/js/main.1accf93b.js",
                "/static/css/main.e6c13ad2.css.map",
                "/static/js/main.1accf93b.js.map",
                "/favicon.ico",
                "/manifest.json",
            ]);
    })
})

self.addEventListener('activate', function(event){
    console.log("Activation !!!");
})

self.addEventListener('fetch', function(event){
    event.preventDefault();

    console.log("fetched", event.request.url);

    event.respondWith(
        caches.match(event.request.url).then(
            function(response){
                if(response){
                    return response;
                }
                else {
                    return fetch(event.request).then(function(fetchResponse){
                        if(event.request.url.startsWith("https://pokeapi.co/api/v2/")){
                            caches.open(CACHE).then(function(cache){
                                cache.put(event.request.url, fetchResponse);
                            }
                            )
                        }
                    }
                    )
                }
            }
        )
    )
}
)
