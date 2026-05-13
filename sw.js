

const CACHE_NAME = 'gestnotes-pro-v1';

// Liste des fichiers à mettre en cache pour le mode hors-ligne
const ASSETS = [
  './',
  './gestnotes.html',
  './bulletin.html',
  './manifest.json'
  // On retire les liens HTTPS externes (Tailwind et FontAwesome)
];

// Installation : Le robot télécharge et stocke les fichiers
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Mise en cache des ressources terminée');
      return cache.addAll(ASSETS);
    })
  );
});

// Activation : Nettoyage des anciens caches si vous faites une mise à jour
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Stratégie "Cache First" : On utilise la mémoire du téléphone en priorité
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Retourne le fichier du cache s'il existe, sinon va le chercher sur internet
      return cachedResponse || fetch(e.request);
    })
  );
});
