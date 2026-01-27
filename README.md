# 🎯 Parcours Fractions

Application web éducative pour l'apprentissage des fractions à l'école primaire (CE1, CE2, CM1).

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![EDUSCOL](https://img.shields.io/badge/Conforme-EDUSCOL%202025-green)](https://eduscol.education.fr)

---

## 📋 Description

Application web interactive conforme aux **programmes 2025** de l'Éducation Nationale française. Elle permet aux élèves de cycle 2 et 3 de manipuler des fractions à travers deux activités progressives :

1. **Activité 1** : Déterminer combien de morceaux identiques composent une figure
2. **Activité 2** : Analyser des morceaux donnés et répondre à des questions progressives

### Caractéristiques pédagogiques

✅ **Conformité EDUSCOL** : Respect strict des programmes 2025  
✅ **Manipulation** : Déplacement, rotation, retournement des morceaux  
✅ **Présentation non-prototypique** : Variations aléatoires pour éviter les stéréotypes  
✅ **Fractionnements multiples** : Plusieurs représentations géométriques par fraction ✨ **v0.3.0**  
✅ **Progressivité** : Adaptation automatique selon le niveau (CE1/CE2/CM1)  
✅ **Autonomie** : Sauvegarde automatique de la progression

---

## 📝 Changelog

Voir **[CHANGELOG.md](./CHANGELOG.md)** pour l'historique détaillé des modifications.

### Dernière version : v0.3.0 (27/01/2026)

**Fractionnements multiples** : Représentations géométriques variées

- ✨ **Carré 1/2** : Rectangle vertical OU triangle diagonal
- ✨ **Carré 1/4** : Rectangle, triangle coin, petit carré OU croix
- 🎲 Sélection aléatoire à chaque génération
- 🎨 4 nouveaux composants de fractions
- 🏗️ Architecture extensible pour futurs types

**Impact pédagogique :** Généralisation du concept de fraction en évitant l'association stéréotypée "fraction = une seule forme".

**⚠️ Bug connu :** Triangle coin 1/4 représente actuellement 1/8 (correction prévue v0.3.1)

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
│   ├── components/
│   │   ├── activities/        # Activités pédagogiques
│   │   │   ├── ActivityOne.jsx
│   │   │   └── ActivityTwo.jsx
│   │   ├── shapes/
│   │   │   ├── Piece.jsx      # Composant manipulable
│   │   │   ├── figures/       # Figures complètes (4 formes)
│   │   │   └── fractions/     # Morceaux de fractions
│   │   │       ├── DiskFraction.jsx
│   │   │       ├── SquareFraction.jsx
│   │   │       ├── SquareDiagonalFraction.jsx ✨ v0.3.0
│   │   │       ├── SquareCornerTriangleFraction.jsx ✨ v0.3.0
│   │   │       ├── SquareQuarterSquareFraction.jsx ✨ v0.3.0
│   │   │       ├── SquareCrossFraction.jsx ✨ v0.3.0
│   │   │       ├── RectangleFraction.jsx
│   │   │       └── HouseFraction.jsx
│   │   └── progression/       # (futurs) Composants de suivi
│   ├── hooks/
│   │   └── useLocalStorage.js # Persistance locale
│   ├── utils/
│   │   ├── fractionConfig.js  # Configuration EDUSCOL
│   │   └── fractionTypes.js   # Types de fractionnements ✨ v0.3.0
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
└── CHANGELOG.md               # Historique des versions
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

### Types de fractionnements (v0.3.0)

La configuration est définie dans `src/utils/fractionTypes.js` :

#### Carré 1/2

- `vertical-rectangles` : Rectangle vertical (classique)
- `diagonal-triangles` : Triangle rectangle diagonal

#### Carré 1/4

- `vertical-rectangles` : Rectangle vertical (classique)
- `corner-triangles` : Triangle rectangle coin ⚠️ **Bug : affiche 1/8**
- `quarter-squares` : Petit carré (1/4 de l'aire)
- `cross-triangles` : Triangle rectangle croix diagonale

### Personnalisation visuelle

Modifier les variables CSS dans `src/index.css` :

```css
:root {
    --primary: #3b82f6; /* Couleur principale */
    --success: #10b981; /* Validation */
    --error: #ef4444; /* Erreur */
    --bg-light: #fef3c7; /* Fond */
    --shape-fill: #fbbf24; /* Figures */
    --piece-fill: #60a5fa; /* Morceaux */
}
```

### Paramètres de manipulation (v0.1.0+)

Ajuster le délai de désélection automatique dans `src/components/shapes/Piece.jsx` :

```javascript
// Ligne ~58
setTimeout(() => setIsSelected(false), 3000); // 3 secondes (3000ms)
```

**Recommandations par niveau :**

- **CE1** : 4000ms (plus de temps pour les jeunes)
- **CE2** : 3000ms (défaut)
- **CM1** : 2500ms (plus réactif)

---

## 🎨 Fonctionnalités

### Manipulation des morceaux

- **Déplacement** : Drag & drop (souris ou tactile)
- **Rotation** : Adaptée à la forme
    - Disque : 360°/n (ex: 90° pour un quart)
    - Autres : 90° fixe
- **Retournement** : Symétrie horizontale (sauf disque)
- **Contrôles conditionnels** : Les boutons n'apparaissent que lors de la sélection (v0.1.0+)

### Variations non-prototypiques

Pour éviter les stéréotypes visuels :

- **Rotation** : Figures orientées aléatoirement (0°, 90°, 180°, 270°)
- **Proportions** : Rectangles et toits de maison de tailles variées
- **Échelle** : Taille entre 80% et 120%
- **Position** : Morceaux positionnés aléatoirement dans la figure
    - Disque : angle de départ 0-360°
    - Autres : bande aléatoire (horizontal/vertical)

### Fractionnements multiples (v0.3.0) ✨

Pour éviter l'association stéréotypée "fraction = une seule forme" :

- **Sélection aléatoire** : Chaque génération choisit un type de fractionnement
- **Carré 1/2** : Soit rectangle vertical, soit triangle diagonal
- **Carré 1/4** : Soit rectangle, soit triangle coin, soit petit carré, soit croix
- **Extensible** : Architecture prête pour ajouter plus de types (triangles isocèles, 1/8, etc.)

### Progression

- **Sauvegarde automatique** : localStorage du navigateur
- **Barre de progression** : Visuelle et pourcentage
- **Recommencer** : Réinitialisation avec confirmation

---

## 🧑‍💻 Développement

### Ajouter un nouveau type de fractionnement

Exemple : Ajouter des triangles isocèles pour 1/4

**1. Créer le composant fraction** dans `src/components/shapes/fractions/` :

```jsx
// SquareIsoscelesFraction.jsx
export default function SquareIsoscelesFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3
}) {
    const center = { x: 100, y: 100 };
    const midPoints = [
        { x: 100, y: 20 }, // Haut
        { x: 180, y: 100 }, // Droite
        { x: 100, y: 180 }, // Bas
        { x: 20, y: 100 }, // Gauche
    ];

    const current = midPoints[index];
    const next = midPoints[(index + 1) % 4];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <path
                d={`M ${center.x} ${center.y} L ${current.x} ${current.y} L ${next.x} ${next.y} Z`}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
            />
        </svg>
    );
}
```

**2. Enregistrer dans les mappings** :

```jsx
// src/components/shapes/fractions/index.js
export { default as SquareIsoscelesFraction } from "./SquareIsoscelesFraction";

// src/components/shapes/Piece.jsx
import { SquareIsoscelesFraction } from "./fractions";

const FRACTION_COMPONENTS = {
    // ...
    SquareIsoscelesFraction,
};
```

**3. Ajouter dans la configuration** `src/utils/fractionTypes.js` :

```javascript
export const SQUARE_SPLITTING_TYPES = {
    4: [
        // ... types existants
        {
            id: "isosceles-center",
            component: "SquareIsoscelesFraction",
            props: {},
        },
    ],
};
```

C'est tout ! Le nouveau type sera automatiquement sélectionné aléatoirement.

### Modifier la logique de génération

Le fichier `src/data/progression.js` contient toute la logique de génération d'exercices. Modifier les fonctions :

- `randomRotation()` : Rotations possibles
- `randomProportions(figure)` : Variations de proportions
- `generateProgression(level)` : Séquence complète

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
6. **Charge cognitive réduite** : Interface épurée (v0.1.0+)
7. **Fractionnements multiples** : Généralisation du concept (v0.3.0+)

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

#### Exemple Nginx

```nginx
server {
    listen 80;
    server_name fractions.example.com;
    root /var/www/fractions/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Variables d'environnement

Aucune variable d'environnement requise pour la version actuelle.

---

## 🧪 Tests

### Tests manuels recommandés

Avant chaque release, tester :

- ✅ Sélection des 3 niveaux
- ✅ Drag & drop (souris + tactile)
- ✅ Rotation adaptée (disque vs autres formes)
- ✅ Bouton flip masqué pour disque
- ✅ Affichage conditionnel des contrôles (v0.1.0+)
- ✅ Désélection automatique après 3s (v0.1.0+)
- ✅ **Fractionnements multiples variés** (v0.3.0+)
- ✅ Validation correcte/incorrecte
- ✅ Passage automatique entre exercices
- ✅ Sauvegarde/restauration progression
- ✅ Bouton recommencer
- ✅ Responsive (desktop + tablette)

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

### v0.3.0 (Alpha)

- **Triangle coin 1/4 affiche 1/8** : Le composant `SquareCornerTriangleFraction` génère un triangle trop petit (correction prévue v0.3.1)
- Activité 2 limitée aux fractions < 1 (même en CM1)
- Pas d'interface enseignant
- Pas d'export des résultats
- Support hors-ligne incomplet (nécessite chargement initial)

Voir le [CHANGELOG.md](./CHANGELOG.md) et le [SRS.md](./SRS.md) pour la liste complète.

---

## 🗺️ Roadmap

### v0.3.1 (Priorité critique)

- [ ] **Corriger le bug triangle 1/4** (affiche actuellement 1/8)

### v0.4.0 (Priorité haute)

- [ ] Triangles isocèles depuis le centre (1/4)
- [ ] Fractionnements avancés pour 1/8
- [ ] Rectangle avec diagonales (1/2, 1/4)
- [ ] Tests utilisateurs avec élèves

### v0.5.0 (Priorité moyenne)

- [ ] Activité 2 avec fractions > 1 (CM1)
- [ ] Feedback sonore optionnel
- [ ] Mode enseignant basique

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
    - `feat:` Nouvelle fonctionnalité
    - `fix:` Correction de bug
    - `docs:` Documentation
    - `style:` Formatage
    - `refactor:` Refactorisation
    - `test:` Tests
    - `chore:` Tâches diverses
- **Code** : ESLint + Prettier (config à ajouter)
- **Branches** : `feature/`, `fix/`, `docs/`
- **Changelog** : Mettre à jour [CHANGELOG.md](./CHANGELOG.md) selon [Keep a Changelog](https://keepachangelog.com/fr/)

### Tests avant PR

```bash
pnpm build          # Build sans erreurs
pnpm preview        # Test build local
# Tests manuels des fonctionnalités ajoutées
```

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

![Version](https://img.shields.io/badge/Version-0.3.0--alpha-blue)
![Lines of Code](https://img.shields.io/badge/LOC-~3000-blue)
![Components](https://img.shields.io/badge/Composants-19-green)
![Bundle Size](https://img.shields.io/badge/Bundle-~180KB-orange)

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

_Dernière mise à jour : 27 janvier 2026_
