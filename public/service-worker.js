const CACHE_NAME = "money-tracker-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css", // Add your CSS files
  "/app.js",     // Add your JS files
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
