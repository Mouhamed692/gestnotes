const CACHE_NAME = 'gestnotes-pro-v1';

// Liste des fichiers indispensables pour le fonctionnement 100% hors-ligne
const ASSETS = [
  './',
  './gestnotes.html',
  './bulletin.html',
  './tailwind.min.css', // CSS local indispensable en mode déconnecté
  './manifest.json'
];

// 1. Installation : Création du cache et mise en mémoire des ressources
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources terminée');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()) // Force le SW à devenir actif immédiatement
  );
});

// 2. Activation : Nettoyage automatique des anciens caches lors d'une mise à jour
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
    }).then(() => self.clients.claim()) // Prend le contrôle des pages immédiatement
  );
});

// 3. Stratégie "Cache First" : Priorité absolue à la vitesse et au hors-ligne
self.addEventListener('fetch', (e) => {
  // On ne gère que les requêtes GET (évite les bugs avec certaines extensions ou requêtes POST)
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Si le fichier est dans le cache, on le sert instantanément
      if (cachedResponse) {
        return cachedResponse;
      }

      // Sinon, on va le chercher sur le réseau
      return fetch(e.request).catch(() => {
        // Optionnel : Gestion d'erreur si internet est coupé et fichier non caché
        console.log('[Service Worker] Ressource indisponible hors-ligne :', e.request.url);
      });
    })
  );
});
