# 🎯 Parcours Fractions

Application web éducative pour l'apprentissage des fractions à l'école primaire (CE1, CE2, CM1).

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![EDUSCOL](https://img.shields.io/badge/Conforme-EDUSCOL%202025-green)](https://eduscol.education.fr)

---

## 📋 Description

Application web interactive conforme aux **programmes 2025** de l'Éducation Nationale française. Elle propose **trois modes d'utilisation** :

### 🎯 Mode Autonome

Parcours EDUSCOL préétabli avec deux activités progressives :

1. **Activité 1** : Déterminer combien de morceaux identiques composent une figure
2. **Activité 2** : Analyser des morceaux donnés et répondre à des questions progressives

### 👨‍🏫 Mode Collectif ✨ **v0.4.0**

Outil de démonstration pour l'enseignant :

- Sélection libre : figure, fraction, type de fractionnement
- Ajout/retrait de morceaux à la volée
- Manipulation devant la classe sur écran projeté
- Questions pédagogiques suggérées

### 📝 Mode Guidé

Parcours personnalisé par l'enseignant _(à venir)_

### Caractéristiques pédagogiques

✅ **Conformité EDUSCOL** : Respect strict des programmes 2025  
✅ **Manipulation** : Déplacement, rotation, retournement des morceaux  
✅ **Présentation non-prototypique** : Variations aléatoires pour éviter les stéréotypes  
✅ **Fractionnements multiples** : Plusieurs représentations géométriques par fraction  
✅ **Progressivité** : Adaptation automatique selon le niveau (CE1/CE2/CM1)  
✅ **Trois modes d'utilisation** : Autonome, Collectif, Guidé  
✅ **Autonomie** : Sauvegarde automatique de la progression

---

## 📝 Changelog

Voir **[CHANGELOG.md](./CHANGELOG.md)** pour l'historique détaillé des modifications.

### Dernière version : v0.4.1 (28/01/2026)

**Corrections critiques :**

- 🐛 Correction géométrie triangle coin 1/4 (affichait 1/8)

**Nouveaux fractionnements pour 1/8 :**

- ✨ Triangle isocèle rectangle (demi-côté × demi-côté)
- ✨ Triangle rectangle mince (côté × quart)
- ✨ Ajout au sélecteur du Mode Collectif

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** ≥ 18.0.0
- **pnpm** ≥ 8.0.0 (recommandé) ou npm

```bash
# Vérifier les versions
node --version
pnpm --version

# Installer pnpm si nécessaire
npm install -g pnpm
```

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/micetf/parcours-fractions.git
cd parcours-fractions

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur **http://localhost:5173**

---

## 📦 Scripts disponibles

```bash
# Développement avec Hot Module Replacement
pnpm dev

# Build de production
pnpm build

# Prévisualiser le build de production
pnpm preview

# Linter (si configuré)
pnpm lint
```

---

## 🏗️ Structure du projet

```
fractions-app/
├── public/                    # Assets statiques
├── src/
│   ├── modes/                 # ✨ v0.4.0
│   │   └── CollectiveMode/
│   │       ├── CollectiveMode.jsx
│   │       ├── FigureSelector.jsx
│   │       └── ManipulationZone.jsx
│   ├── components/
│   │   ├── ModeSelector.jsx   # ✨ v0.4.0
│   │   ├── activities/        # Activités pédagogiques
│   │   │   ├── ActivityOne.jsx
│   │   │   └── ActivityTwo.jsx
│   │   ├── shapes/
│   │   │   ├── Piece.jsx      # Modifié v0.4.0/v0.4.1
│   │   │   ├── figures/       # Figures complètes (4 formes)
│   │   │   └── fractions/     # Morceaux de fractions (10 types) ✨ v0.4.1
│   │   └── progression/       # (futurs) Composants de suivi
│   ├── hooks/
│   │   └── useLocalStorage.js # Persistance locale
│   ├── utils/
│   │   ├── fractionConfig.js  # Configuration EDUSCOL
│   │   └── fractionTypes.js   # Types de fractionnements ✨ v0.4.1
│   ├── data/
│   │   └── progression.js     # Générateur d'exercices
│   ├── App.jsx                # Composant racine
│   ├── main.jsx
│   └── index.css              # Styles Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── README.md
├── CHANGELOG.md
└── SRS.md                     # Spécifications complètes
```

---

## 🛠️ Technologies utilisées

| Technologie                             | Version  | Usage                    |
| --------------------------------------- | -------- | ------------------------ |
| [React](https://react.dev)              | 18.3.1   | Framework UI             |
| [Vite](https://vitejs.dev)              | 5.4+     | Build tool & dev server  |
| [SWC](https://swc.rs)                   | via Vite | Compilation ultra-rapide |
| [Tailwind CSS](https://tailwindcss.com) | 3.4+     | Styling utilitaire       |
| [pnpm](https://pnpm.io)                 | 8.0+     | Gestionnaire de paquets  |

**Note** : Pas de TypeScript (choix architectural explicite)

---

## ⚙️ Configuration

### Niveaux et fractions (EDUSCOL 2025)

La configuration est définie dans `src/utils/fractionConfig.js` :

#### CE1

- **Figures** : carré, rectangle, disque
- **Fractions** : 1/2, 1/3, 1/4, 1/5
- **Max dénominateur** : 5
- **Total exercices** : 18

#### CE2

- **Figures** : carré, rectangle, disque
- **Fractions** : 1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10
- **Max dénominateur** : 10
- **Total exercices** : 28

#### CM1

- **Figures** : carré, rectangle, disque, maison
- **Fractions** : 1/2, 1/3, 1/4, 1/5, 1/8, 1/10
- **Max dénominateur** : 10
- **Total exercices** : 26

### Types de fractionnements

La configuration est définie dans `src/utils/fractionTypes.js` :

#### Carré 1/2 (2 types)

- Rectangles verticaux (classique)
- Triangles diagonaux

#### Carré 1/4 (4 types)

- Rectangles verticaux (classique)
- Triangles coins ✅ **Corrigé v0.4.1**
- Petits carrés (1/4 de l'aire)
- Triangles croix diagonale

#### Carré 1/8 (4 types) ✨ **v0.4.1**

- Rectangles verticaux
- Rectangles horizontaux
- **Triangles isocèles rectangles** (nouveau)
- **Triangles rectangles minces** (nouveau)

#### Rectangle 1/2 à 1/5 (2 types)

- Rectangles verticaux
- Rectangles horizontaux

---

## 🎨 Fonctionnalités

### Mode Autonome

**Manipulation des morceaux :**

- **Déplacement** : Drag & drop (souris ou tactile)
- **Rotation** : Adaptée à la forme (90° carré, 360°/n disque)
- **Retournement** : Symétrie horizontale (sauf disque)
- **Contrôles conditionnels** : Les boutons apparaissent à la sélection (timer 3s)

**Variations non-prototypiques :**

- Rotation aléatoire des figures (0°, 90°, 180°, 270°)
- Proportions aléatoires (rectangles, toits)
- Échelle aléatoire (80%-120%)
- Position de départ aléatoire des morceaux

**Fractionnements multiples :**

- Sélection aléatoire d'un type de fractionnement
- Évite l'association stéréotypée "fraction = une seule forme"

**Progression :**

- Sauvegarde automatique (localStorage)
- Barre de progression visuelle
- Bouton recommencer

### Mode Collectif (v0.4.0+) ✨

**Configuration libre :**

- Sélection figure (dropdown)
- Sélection dénominateur (dropdown dynamique)
- Sélection type de fractionnement (dropdown dynamique)
- Nombre de morceaux (1-10)
- Bouton "Générer la démonstration"

**Zone de manipulation :**

- Figure de référence à gauche
- Zone de travail 600×500px à droite
- Boutons "Ajouter un morceau" / "Retirer un morceau"
- Compteur de morceaux
- Contrôles permanents (pas de timer)

**Aide pédagogique :**

- Questions suggérées automatiques
- Calculs dynamiques (morceaux manquants)
- Adapté au dénominateur sélectionné

---

## 🧑‍💻 Développement

### Ajouter un nouveau type de fractionnement

1. Créer le composant dans `src/components/shapes/fractions/`
2. Vérifier la géométrie (aire = 1/n de la figure)
3. Ajouter l'export dans `index.js`
4. Ajouter dans `FRACTION_COMPONENTS` de `Piece.jsx`
5. Configurer dans `fractionTypes.js`
6. Ajouter le nom dans `FigureSelector.jsx`

**Exemple de vérification géométrique :**

```javascript
// Carré 160×160 = 25 600 px²
// Pour 1/4 : aire = 6 400 px²
// Triangle rectangle coin : (160 × 80) / 2 = 6 400 ✓
```

---

## 📚 Documentation pédagogique

### Références EDUSCOL

- [Programme cycle 2 (2025)](https://www.education.gouv.fr/sites/default/files/ensel135_annexe4.pdf)
- [Programme cycle 3 (2025)](https://www.education.gouv.fr/sites/default/files/ensel620_annexe2-v2.pdf)
- [Ressources fractions cycle 3](https://eduscol.education.fr/document/16510/download)

### Principes pédagogiques appliqués

1. **Manipulation** : Objets tangibles (virtuels) à déplacer, pivoter
2. **Verbalisation** : Phrases à compléter, questions guidées
3. **Représentations variées** : 4 figures géométriques différentes
4. **Progressivité** : Du simple (CE1, carré) au complexe (CM1, maison)
5. **Non-prototypique** : Évite les représentations stéréotypées
6. **Charge cognitive réduite** : Interface épurée
7. **Fractionnements multiples** : Généralisation du concept
8. **Démonstration enseignant** : Mode collectif pour manipulation collective

---

## 🚢 Déploiement

### Build de production

```bash
pnpm build
```

Génère le dossier `dist/` prêt pour le déploiement.

### Déploiement statique

L'application est une SPA (Single Page Application) sans backend. Compatible avec :

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- Serveur web classique (Apache, Nginx)

---

## 🧪 Tests

### Tests manuels recommandés

Avant chaque release, tester :

**Mode Autonome :**

- ✅ Drag & drop (souris + tactile)
- ✅ Rotation adaptée (disque vs autres formes)
- ✅ Bouton flip masqué pour disque
- ✅ Affichage conditionnel des contrôles
- ✅ Désélection automatique après 3s
- ✅ Fractionnements multiples variés
- ✅ Validation correcte/incorrecte
- ✅ Passage automatique entre exercices
- ✅ Sauvegarde/restauration progression

**Mode Collectif (v0.4.0+) :**

- ✅ Sélection des 3 modes
- ✅ Sélection figure → dénominateurs dynamiques
- ✅ Sélection dénominateur → types dynamiques
- ✅ Génération démonstration
- ✅ Ajout/retrait morceaux
- ✅ Contrôles permanents (pas de timer)
- ✅ Aide pédagogique avec calculs corrects
- ✅ Responsive (desktop + tablette)

**Vérification géométrique (v0.4.1) :**

- ✅ Triangle coin 1/4 : aire = 6 400 px²
- ✅ Triangle isocèle 1/8 : aire = 3 200 px²
- ✅ Triangle mince 1/8 : aire = 3 200 px²

### Navigateurs testés

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📱 Support des appareils

| Appareil      | Support         | Notes                  |
| ------------- | --------------- | ---------------------- |
| Desktop       | ✅ Complet      | Recommandé             |
| Tablette ≥10" | ✅ Complet      | Tactile supporté       |
| Tablette <10" | ⚠️ Partiel      | Manipulation difficile |
| Smartphone    | ❌ Non supporté | Écran trop petit       |

**Résolution minimale** : 1024×768

---

## 🐛 Problèmes connus

### v0.4.1 (Alpha)

**Mode Collectif :**

- Pas de clippage automatique (prévu v0.5.0)
- Pas de mode plein écran (prévu v0.5.0)

**Mode Autonome :**

- Activité 2 limitée aux fractions < 1 (même en CM1)

**Général :**

- Mode Guidé non implémenté
- Pas d'interface enseignant pour le mode autonome
- Pas d'export des résultats
- Support hors-ligne incomplet (nécessite chargement initial)

Voir le [CHANGELOG.md](./CHANGELOG.md) et le [SRS.md](./SRS.md) pour la liste complète.

---

## 🗺️ Roadmap

### v0.5.0 (Priorité haute)

- [ ] Mode Collectif : Système de clippage automatique
- [ ] Mode Collectif : Mode plein écran
- [ ] Fractionnements avancés pour autres figures

### v0.6.0 (Priorité moyenne)

- [ ] Mode Guidé : Interface enseignant
- [ ] Mode Guidé : Interface élève
- [ ] Tests utilisateurs avec élèves

### v1.0.0 (Long terme)

- [ ] Multi-utilisateurs avec base de données
- [ ] Gamification (badges, scores)
- [ ] Adaptation intelligente de la difficulté

Voir [CHANGELOG.md](./CHANGELOG.md) pour plus de détails.

---

## 🤝 Contribution

Les contributions sont les bienvenues !

### Processus

1. **Fork** le projet
2. Créer une **branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Commit** : `git commit -m 'feat: ajout fonctionnalité X'`
4. **Push** : `git push origin feature/ma-fonctionnalite`
5. Ouvrir une **Pull Request**

### Conventions

- **Commits** : Format [Conventional Commits](https://www.conventionalcommits.org)
- **Code** : ESLint + Prettier (config à ajouter)
- **Branches** : `feature/`, `fix/`, `docs/`
- **Changelog** : Mettre à jour [CHANGELOG.md](./CHANGELOG.md) selon [Keep a Changelog](https://keepachangelog.com/fr/)

---

## 📄 Licence

MIT (open-source permissif)

---

## 👥 Auteurs

**Conseiller Pédagogique de Circonscription Numérique**  
Académie : Grenoble  
Département : Ardèche

### Remerciements

- **Équipe EDUSCOL** : Pour les ressources pédagogiques
- **Enseignants pilotes** : Pour les retours terrain
- **Communauté React** : Pour l'écosystème open-source

---

## 📞 Support

### Pour les enseignants

- **Documentation** : [Voir SRS.md](./SRS.md)
- **Historique** : [Voir CHANGELOG.md](./CHANGELOG.md)
- **Vidéos** : [À venir]
- **Contact** : [email à définir]

### Pour les développeurs

- **Issues** : [GitHub Issues](https://github.com/micetf/parcours-fractions/issues)
- **Discussions** : [GitHub Discussions](https://github.com/micetf/parcours-fractions/discussions)
- **Changelog** : [CHANGELOG.md](./CHANGELOG.md)

---

## 📊 Statistiques

![Version](https://img.shields.io/badge/Version-0.4.1--alpha-blue)
![Lines of Code](https://img.shields.io/badge/LOC-~4000-blue)
![Components](https://img.shields.io/badge/Composants-24-green)
![Bundle Size](https://img.shields.io/badge/Bundle-~220KB-orange)

---

## 🔗 Liens utiles

- [Documentation React](https://react.dev)
- [Documentation Vite](https://vitejs.dev)
- [Documentation Tailwind](https://tailwindcss.com)
- [Programmes EDUSCOL 2025](https://eduscol.education.fr)
- [Keep a Changelog](https://keepachangelog.com/fr/)
- [Conventional Commits](https://www.conventionalcommits.org)

---

**Développé avec ❤️ pour l'éducation**

_Dernière mise à jour : 28 janvier 2026_
