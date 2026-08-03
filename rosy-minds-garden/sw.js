const CACHE_NAME = "rosy-minds-garden-v4";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./facebook-page-patch.js"
];

function injectFacebookPatch(html) {
  if (html.includes("facebook-page-patch.js")) return html;
  return html.replace(
    "</body>",
    '<script src="facebook-page-patch.js"></script></body>'
  );
}

async function patchedHtmlResponse(response) {
  const html = injectFacebookPatch(await response.text());
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.delete("content-length");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();

    const windows = await self.clients.matchAll({ type: "window" });
    await Promise.all(windows.map(client => client.navigate(client.url).catch(() => null)));
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request, { cache: "no-store" });
        return patchedHtmlResponse(response);
      } catch {
        const cached = await caches.match("./index.html");
        if (cached) return patchedHtmlResponse(cached);
        return Response.error();
      }
    })());
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
