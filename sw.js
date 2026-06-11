const CACHE_NAME = 'gestnotes-v2'; // Passage à la v2 pour forcer la mise à jour des navigateurs

// Liste des ressources indispensables à mettre en cache au démarrage
const ASSETS = [
  './',
  './index.html',
  './bulletin.html', // Note : assurez-vous que ce fichier existe également en local
  './manifest.json',
  './tailwind.min.js',
  './html2pdf.bundle.min.js', 
  './idb-keyval.js',           
  './icon-192.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap'
];

// 1. Installation : Pré-chargement des assets statiques
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        const promises = ASSETS.map(url => 
            cache.add(url).catch(err => console.warn('[SW] Ressource non mise en cache au démarrage :', url))
        );
        return Promise.all(promises);
      })
      .then(() => self.skipWaiting()) 
  );
});

// 2. Activation : Nettoyage des versions antérieures
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache :', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) 
  );
});

// 3. Stratégie réseau : Cache-first avec mise en cache dynamique (CORS autorisés)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(e.request).then((networkResponse) => {
        // Ajout de 'cors' pour permettre la sauvegarde en cache des scripts et styles externes de confiance
        const isAcceptableType = networkResponse.type === 'basic' || networkResponse.type === 'cors';
        if (networkResponse && networkResponse.status === 200 && isAcceptableType) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.warn('[Service Worker] Impossible de joindre le réseau pour la ressource :', e.request.url);
      });
    })
  );
});
