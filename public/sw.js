var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/css//bootstrap/bootstrap.css',

'/css//bootstrap.css',
'/css//main.css',
'/css//bootstrap.map',
'/css//font-awesome.min.css',
'/css//jquerysctipttop.css',
'/manifest.json',
'/js/jquery-3.4.1.min.js',
'/js/vendor/bootstrap.min.js',
'/js/vendor/jquery-2.2.4.min.js',

    
];
self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.match(event.request)
.then(function(response) {
if (response) {
return response;
    }
return fetch(event.request).then(
function(response) {
if(!response || response.status !== 200 || response.type !== 'basic') {
return response;
}
var responseToCache = response.clone();
caches.open(CACHE_NAME)
.then(function(cache) {
cache.put(event.request, responseToCache);
});
return response;
}
);
})
);
});