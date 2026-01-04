const cacheName = "DefaultCompany-My project-0.1.0";
const contentToCache = [
    "Build/a7ca00f6529423e42b07aee2022fe514.loader.js",
    "Build/5825efc0ea812b37a4a936f26cb8845b.framework.js.unityweb",
    "Build/46d57a4aeb0c26af708c4f21b4e5393a.data.unityweb",
    "Build/adb918efa698aa8336d65e42885a7d21.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
