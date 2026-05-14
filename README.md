# GestNotes – Système de Gestion des Notes Scolaires

[![Build & Deploy](https://github.com/Mouhamed692/gestnotes/workflows/Build%20&%20Deploy/badge.svg)](https://github.com/Mouhamed692/gestnotes/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Un système complet et moderne de **gestion des notes scolaires** avec calcul de moyennes, édition de bulletins et support hors-ligne (PWA).

## ✨ Fonctionnalités principales

- 📊 **Gestion complète des notes** : Saisie des notes (D1, D2, Composition)
- 📈 **Calcul automatique** : Moyennes par matière et générale
- 📄 **Bulletins PDF** : Génération et impression
- 💾 **Stockage local** : Données persistantes avec LocalStorage
- 🔄 **Mode hors-ligne** : Progressive Web App (PWA) avec Service Worker
- 📱 **Responsive** : Design adapté desktop, tablet et mobile
- 🎯 **Multi-classes** : Gestion de plusieurs niveaux (CI à Terminale)

## 🚀 Installation & démarrage

### Prérequis
- Node.js 18+ et npm

### Développement local

```bash
# Cloner le repository
git clone https://github.com/Mouhamed692/gestnotes.git
cd gestnotes

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# L'application sera disponible sur http://localhost:3000
```

### Production

```bash
# Build optimisé
npm run build

# Prévisualiser la build
npm run preview
```

## 📁 Structure du projet

```
gestnotes/
├── src/
│   ├── index.html                 # Point d'entrée
│   ├── main.js                    # Bootstrap application
│   ├── components/
│   │   ├── ui.js                 # Composants UI réutilisables
│   │   └── toast.js              # Système de notifications
│   ├── services/
│   │   └── grades.js             # Logique métier
│   ├── utils/
│   │   ├── storage.js            # Gestion LocalStorage + migration
│   │   └── formatters.js         # Calculs et formatage
│   └── styles/
│       └── main.css              # Styles Tailwind + animations
├── public/
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service Worker
├── .github/workflows/
│   └── build.yml                 # GitHub Actions CI/CD
├── package.json
├── vite.config.js
├── tsconfig.json
├── eslint.config.js
├── .prettierrc.json
└── README.md

```

## 🛠️ Scripts npm

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build production optimisé |
| `npm run preview` | Prévisualiser la build |
| `npm run lint` | Vérifier avec ESLint |
| `npm run lint:fix` | Corriger les erreurs ESLint |
| `npm run format` | Formater le code avec Prettier |
| `npm run type-check` | Vérifier les types TypeScript |

## 🔧 Configuration des outils

### ESLint
Vérifie la qualité du code avec des règles strictes :
- Interdiction des `console.log` en production
- Utilisation obligatoire de `const` et `let`
- Comparaisons strictes (`===`)

### Prettier
Formatage automatique cohérent :
- Tabulation : 2 espaces
- Guillemets simples
- Largeur : 100 caractères

### TypeScript
Support complet des types avec alias `@/*` pour les imports.

### Vite
Bundler ultra-rapide avec minification Terser et code-splitting automatique.

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connecter le repository GitHub à Vercel
2. Ajouter les variables d'environnement si nécessaire
3. Les déploiements se font automatiquement sur chaque push vers `main`

### GitHub Actions
Un workflow CI/CD est inclus pour :
- Tester sur Node 18 et 20
- Vérifier la qualité du code (ESLint, Prettier)
- Builder l'application
- Déployer automatiquement sur Vercel

## 📱 PWA & Mode hors-ligne

L'application est une Progressive Web App :
- Installable sur desktop et mobile
- Fonctionne complètement hors-ligne
- Synchronisation automatique quand la connexion revient

Fichiers clés :
- `manifest.json` : Métadonnées et icônes
- `sw.js` : Service Worker avec cache-first strategy

## 📊 Données & migration

Les données sont stockées localement avec migration automatique :
- Ancien format → Nouveau format
- Compatibilité descendante garantie
- Export CSV pour chaque bulletin

## 🤝 Contribution

Les contributions sont bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## 📄 Licence

Ce projet est licensé sous la Licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Mouhamed692** - [@Mouhamed692](https://github.com/Mouhamed692)

## 🙏 Remerciements

- [Vite](https://vitejs.dev/) - Build tool rapide
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [ESLint](https://eslint.org/) - Linter JavaScript
- [Prettier](https://prettier.io/) - Code formatter

## 📞 Support

Pour les problèmes ou suggestions, veuillez ouvrir une [Issue](https://github.com/Mouhamed692/gestnotes/issues).

---

**Dernière mise à jour** : Mai 2024
