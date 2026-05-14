# Guide de Contribution

Merci de votre intérêt pour contribuer à **GestNotes** ! 🎉

Ce guide explique comment contribuer efficacement au projet.

## 📋 Code de conduite

- Soyez respectueux envers les autres contributeurs
- Fournissez des retours constructifs et honnêtes
- Signalez les bugs ou problèmes de sécurité de manière responsable

## 🐛 Signaler un bug

1. Vérifiez que le bug n'existe pas déjà dans les [Issues](https://github.com/Mouhamed692/gestnotes/issues)
2. Créez une nouvelle issue avec le titre descriptif
3. Fournissez :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs réel
   - Environnement (navigateur, OS, version)

## 🚀 Proposer une fonctionnalité

1. Ouvrez une [Discussion](https://github.com/Mouhamed692/gestnotes/discussions) ou une Issue
2. Décrivez la fonctionnalité et les bénéfices
3. Discutez de l'approche avant de commencer le développement

## 💻 Contribuer du code

### 1. Configuration locale

```bash
# Fork et clone
git clone https://github.com/VOTRE_USERNAME/gestnotes.git
cd gestnotes

# Ajouter le remote upstream
git remote add upstream https://github.com/Mouhamed692/gestnotes.git

# Installer les dépendances
npm install
```

### 2. Créer une branche

```bash
# À partir de main
git checkout main
git pull upstream main

# Créer votre branche (feature ou bugfix)
git checkout -b feature/votre-fonctionnalite
# ou
git checkout -b bugfix/votre-correction
```

### 3. Développer

```bash
# Démarrer le serveur de développement
npm run dev

# Avant de commit, vérifier la qualité
npm run lint:fix
npm run format
npm run type-check
```

### 4. Commit

Suivre les conventions de commit :

```bash
# Format : type(scope): description
# Exemples :
git commit -m "feat(grades): add average calculation for weighted scores"
git commit -m "fix(ui): correct mobile layout issues in bulletin"
git commit -m "docs: update installation instructions"
git commit -m "style: format code with prettier"
git commit -m "test: add unit tests for grades service"
```

**Types conventionnels** :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Modification de documentation
- `style` : Changements de formatage
- `refactor` : Refactorisation du code
- `test` : Ajout de tests
- `chore` : Maintenance, dépendances

### 5. Pousser et Pull Request

```bash
# Pousser votre branche
git push origin feature/votre-fonctionnalite

# Créer une Pull Request sur GitHub
```

**Dans votre PR, incluez** :
- Description claire des changements
- Référence aux issues liées (`Closes #123`)
- Screenshots si applicable (UI changes)
- Checklist :
  - [ ] Code formaté (`npm run format`)
  - [ ] Linting passé (`npm run lint`)
  - [ ] Types vérifiés (`npm run type-check`)
  - [ ] Testé localement

## ✅ Critères de révision

Votre PR sera révisée sur :
- **Qualité du code** : Lisibilité, maintenabilité
- **Conformité** : Respecte les standards du projet
- **Fonctionnalité** : Résout le problème correctement
- **Tests** : Couverture adéquate
- **Documentation** : README / commentaires à jour

## 📚 Standards du projet

### Nommage
- Fichiers : `kebab-case` (ex: `storage.js`, `grade-service.js`)
- Variables : `camelCase` (ex: `studentGrades`, `averageScore`)
- Constantes : `UPPER_SNAKE_CASE` (ex: `CACHE_NAME`)
- Classes : `PascalCase` (ex: `GradeManager`)

### Structure des fichiers

```javascript
// 1. Imports
import { calculateAverage } from '@/utils/formatters.js';

// 2. Types/Constantes
const VALID_GRADES = [0, 20];

// 3. Exports
export function calculateGPA(grades) {
  // ...
}

// 4. Helpers privés
function _validateGrade(grade) {
  // ...
}
```

### Documentation

```javascript
/**
 * Calcule la moyenne générale d'un élève
 * @param {Array<Object>} subjectGrades - Grades par matière
 * @param {Array<Object>} subjects - Configuration des matières
 * @returns {number|null} Moyenne calculée ou null si aucune note
 */
export function calculateGPA(subjectGrades, subjects) {
  // ...
}
```

## 🔄 Processus de review

1. **Review automatisée** : Linting et build
2. **Review manuel** : Un mainteneur examine le code
3. **Corrections** : Appliquez les changements demandés
4. **Approbation** : La PR est approuvée
5. **Merge** : Votre contribution est fusionnée ! 🎉

## 🤝 Ressources utiles

- [Documentation Vite](https://vitejs.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📞 Questions ?

- Ouvrez une [Discussion](https://github.com/Mouhamed692/gestnotes/discussions)
- Consultez les [Issues existantes](https://github.com/Mouhamed692/gestnotes/issues)

Merci de contribuer à GestNotes ! ❤️
