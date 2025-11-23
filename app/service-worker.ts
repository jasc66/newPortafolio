/// <reference lib="webworker" />

// Nuevo archivo para implementar un service worker
import { clientsClaim } from "workbox-core"
import { ExpirationPlugin } from "workbox-expiration"
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies"

// Workbox inyecta esto en build:
declare const __WB_MANIFEST: Array<import("workbox-precaching").PrecacheEntry>

// Asegura que "self" tenga el tipo correcto en SW:
declare const self: ServiceWorkerGlobalScope

clientsClaim()

// Precache todos los assets generados por webpack
precacheAndRoute(__WB_MANIFEST)

// Configuración para SPA
const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== "navigate") return false
    if (url.pathname.startsWith("/_")) return false
    if (url.pathname.match(fileExtensionRegexp)) return false
    return true
  },
  createHandlerBoundToURL("/index.html"),
)

// Estrategia de caché para imágenes
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  }),
)

// Estrategia de caché para fuentes
registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
      }),
    ],
  }),
)

// Estrategia para archivos estáticos
registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  }),
)

// Escuchar evento de instalación
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/globals.css",
        "/section-backgrounds.css",
        "/images/project/Portafolio_Karla.png",
        "/images/project/iPortafolio_Kevin.png",
      ])
    }),
  )
})

// Escuchar evento de activación
self.addEventListener("activate", (event: ExtendableEvent) => {
  const currentCaches = ["v1", "images", "google-fonts", "static-resources"]

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName)
          }
          return Promise.resolve(false)
        }),
      )
    }),
  )
})

// Esto permite que el service worker tome el control inmediatamente
self.skipWaiting()
