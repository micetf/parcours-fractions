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
✅ **Progressivité** : Adaptation automatique selon le niveau (CE1/CE2/CM1)  
✅ **Autonomie** : Sauvegarde automatique de la progression

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
│   │   │   └── fractions/     # Morceaux de fractions (4 types)
│   │   └── progression/       # (futurs) Composants de suivi
│   ├── hooks/
│   │   └── useLocalStorage.js # Persistance locale
│   ├── utils/
│   │   └── fractionConfig.js  # Configuration EDUSCOL
│   ├── data/
│   │   └── progression.js     # Générateur d'exercices
│   ├── App.jsx                # Composant racine
│   ├── main.jsx
│   └── index.css              # Styles Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
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

- **Figures** : disque
- **Fractions** : 1/2, 1/4, 1/8
- **Max dénominateur** : 10

#### CE2

- **Figures** : disque, carré, rectangle
- **Fractions** : 1/2, 1/3, 1/4, 1/8
- **Max dénominateur** : 12

#### CM1

- **Figures** : disque, carré, rectangle, maison
- **Fractions** : 1/2, 1/3, 1/4, 1/5, 1/8, 1/10
- **Max dénominateur** : 20

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

---

## 🎨 Fonctionnalités

### Manipulation des morceaux

- **Déplacement** : Drag & drop (souris ou tactile)
- **Rotation** : Adaptée à la forme
    - Disque : 360°/n (ex: 90° pour un quart)
    - Autres : 90° fixe
- **Retournement** : Symétrie horizontale (sauf disque)

### Variations non-prototypiques

Pour éviter les stéréotypes visuels :

- **Rotation** : Figures orientées aléatoirement (0°, 90°, 180°, 270°)
- **Proportions** : Rectangles et toits de maison de tailles variées
- **Échelle** : Taille entre 80% et 120%
- **Position** : Morceaux positionnés aléatoirement dans la figure
    - Disque : angle de départ 0-360°
    - Autres : bande aléatoire (horizontal/vertical)

### Progression

- **Sauvegarde automatique** : localStorage du navigateur
- **Barre de progression** : Visuelle et pourcentage
- **Recommencer** : Réinitialisation avec confirmation

---

## 🧑‍💻 Développement

### Ajouter une nouvelle figure

1. **Créer le composant figure** dans `src/components/shapes/figures/` :

```jsx
export default function Triangle({
    size = 200,
    fill = "var(--shape-fill)",
    rotation = 0,
    proportions = {},
}) {
    return (
        <svg width={size} height={size} viewBox="0 0 200 200">
            <g transform={`rotate(${rotation} 100 100)`}>
                {/* Votre géométrie SVG */}
            </g>
        </svg>
    );
}
```

2. **Créer le composant fraction** dans `src/components/shapes/fractions/` :

```jsx
export default function TriangleFraction({
    denominator,
    fill = "var(--piece-fill)",
    index = 0,
    proportions = {},
}) {
    // Calculs pour 1/n de la figure
    return <svg>...</svg>;
}
```

3. **Enregistrer dans les mappings** :

```jsx
// src/components/activities/ActivityOne.jsx
const FIGURE_COMPONENTS = {
    // ...
    triangle: Triangle,
};

// src/components/shapes/Piece.jsx
const FRACTION_COMPONENTS = {
    // ...
    triangle: TriangleFraction,
};
```

4. **Ajouter la configuration** dans `src/utils/fractionConfig.js`

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
4. **Progressivité** : Du simple (CE1, disque) au complexe (CM1, maison)
5. **Non-prototypique** : Évite les représentations stéréotypées

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

### v1.0 (Alpha)

- Activité 2 limitée aux fractions < 1 (même en CM1)
- Pas d'interface enseignant
- Pas d'export des résultats
- Support hors-ligne incomplet (nécessite chargement initial)

Voir le [document SRS](./SRS_Fractions.md) pour la liste complète des limitations.

---

## 🗺️ Roadmap

### v1.1 (Priorité haute)

- [ ] Activité 2 avec fractions > 1 (CM1)
- [ ] Feedback sonore optionnel
- [ ] Mode enseignant basique

### v1.2 (Priorité moyenne)

- [ ] Export PDF des résultats
- [ ] PWA (mode hors-ligne complet)
- [ ] Activités complémentaires (comparaison, droite graduée)

### v2.0 (Long terme)

- [ ] Multi-utilisateurs avec base de données
- [ ] Gamification (badges, scores)
- [ ] Adaptation intelligente de la difficulté

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

### Tests avant PR

```bash
pnpm build          # Build sans erreurs
pnpm preview        # Test build local
# Tests manuels des fonctionnalités ajoutées
```

---

## 📄 Licence

- MIT (open-source permissif)

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

- **Documentation** : [Voir SRS_Fractions.md](./SRS_Fractions.md)
- **Vidéos** : [À venir]
- **Contact** : [email à définir]

### Pour les développeurs

- **Issues** : [GitHub Issues](https://github.com/micetf/parcours-fractions/issues)
- **Discussions** : [GitHub Discussions](https://github.com/micetf/parcours-fractions/discussions)

---

## 📊 Statistiques

![Lines of Code](https://img.shields.io/badge/LOC-~2500-blue)
![Components](https://img.shields.io/badge/Composants-15-green)
![Bundle Size](https://img.shields.io/badge/Bundle-~150KB-orange)

---

## 🔗 Liens utiles

- [Documentation React](https://react.dev)
- [Documentation Vite](https://vitejs.dev)
- [Documentation Tailwind](https://tailwindcss.com)
- [Programmes EDUSCOL 2025](https://eduscol.education.fr)
- [Convention Commits](https://www.conventionalcommits.org)

---

**Développé avec ❤️ pour l'éducation**

_Dernière mise à jour : 27 janvier 2026_
