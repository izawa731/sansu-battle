// 最終更新：2026-07-29
const CACHE = "animal-dice-race-v1.3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./images/tyranno.png",
  "./images/elephant.png",
  "./images/hornet.png",
  "./images/shark.png",
  "./images/quetzalcoatlus.png",
  "./images/hercules.png",
  "./images/lion.png",
  "./images/titanoboa_v3.png",
  "./sounds/bgm_opening.mp3",
  "./sounds/bgm_battle_v2.mp3",
  "./sounds/jingle_victory.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
    )
  );
});
