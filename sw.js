const CACHE_NAME = 'gestnotes-v2';

const ASSETS = [
  './',
  './index.html',
  './bulletin.html', 
  './manifest.json',
  './html2pdf.bundle.min.js', 
  './idb-keyval.js',           
  './icon-192.png',
  'https://cdn.tailwindcss.com', // Mis à jour avec le CDN
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap'
];

// 1. Installation
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
        const promises = ASSETS.map(url => 
            cache.add(url).catch(err => console.warn('[SW] Ressource non trouvée au démarrage :', url))
        );
        return Promise.all(promises);
    }).then(() => self.skipWaiting()) 
  );
});

// 2. Activation : Nettoyage
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Suppression ancien cache :', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) 
  );
});

// 3. Stratégie de Fetch (Requêtes réseau)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  // Contournement obligatoire pour Google Drive / Apps Script (CORS & Redirections)
  if (e.request.url.includes('script.google.com') || e.request.url.includes('script.googleusercontent.com')) {
    return; // Le navigateur gère tout seul
  }

  // A. STRATÉGIE "NETWORK-FIRST" (Réseau en priorité) POUR LES PAGES HTML
  // Permet à l'application de se mettre à jour instantanément si du réseau est dispo
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, networkResponse.clone()); // On met à jour le cache
          return networkResponse;
        });
      }).catch(() => {
        // Si pas de réseau, on lit depuis le cache
        return caches.match(e.request);
      })
    );
    return;
  }

  // B. STRATÉGIE "CACHE-FIRST" (Cache en priorité) POUR LE RESTE (CSS, JS, Images, Polices)
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // On renvoie immédiatement la version en cache
      }

      // Si absent du cache, on va le chercher sur le réseau
      return fetch(e.request).then((networkResponse) => {
        const isAcceptableType = networkResponse.type === 'basic' || networkResponse.type === 'cors';
        if (networkResponse && networkResponse.status === 200 && isAcceptableType) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache); // Ajout dynamique au cache
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.warn('[SW] Offline et ressource non mise en cache :', e.request.url);
      });
    })
  );
});
