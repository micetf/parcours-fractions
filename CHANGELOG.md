# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Unreleased]

### À venir

- Mode Collectif : Système de clippage automatique
- Mode Collectif : Mode plein écran
- Mode Guidé : Interface enseignant et élève
- Fractionnements avancés pour autres figures
- Feedback sonore optionnel

---

## [0.4.6] - 2026-01-29

### Changed - Mode Collectif UX

#### Workflow simplifié

- Configuration automatique (suppression bouton "Générer")
- Démarrage à 0 morceau (suppression champ "Nombre")
- Bouton "🗑️ Tout retirer" ajouté

#### Confidentialité pédagogique

- Infos enseignant masquables (boutons Afficher/Masquer)
- Suppression affichage "Fraction : 1/X (nom)" visible élèves
- Questions suggérées sans révéler les réponses

### Technical Details

Fichiers modifiés : 3

- FigureSelector.jsx
- ManipulationZone.jsx
- CollectiveMode.jsx

Lignes modifiées : ~80

## [0.4.5] - 2026-01-28

### Added

#### Fractionnements en triangle pour les rectangles

**Rectangle 1/2 diagonal** : Triangle formé par la diagonale du rectangle.

- 2 positions possibles (diagonales opposées)
- Composant : `RectangleDiagonalFraction.jsx`

**Rectangle 1/4 triangles** : Triangles formés par demi-rectangles coupés en diagonale.

- 8 positions possibles (4 demi-rectangles × 2 triangles)
- Composant : `RectangleQuarterTriangleFraction.jsx`

### Changed

#### Configuration des fractionnements rectangle

**Avant** :

- 1/2 : 2 types (rectangles uniquement)
- 1/4 : 2 types (rectangles uniquement)

**Après** :

- 1/2 : 3 types (rectangles + triangles diagonaux)
- 1/4 : 3 types (rectangles + triangles quarts)

### Technical Details

**Fichiers créés** : 2

- `src/components/shapes/fractions/RectangleDiagonalFraction.jsx`
- `src/components/shapes/fractions/RectangleQuarterTriangleFraction.jsx`

**Fichiers modifiés** : 4

- `src/components/shapes/fractions/index.js`
- `src/utils/fractionTypes.js`
- `src/components/shapes/Piece.jsx`
- `src/modes/CollectiveMode/FigureSelector.jsx`

**Lignes de code ajoutées** : ~180

## [0.4.4] - 2026-01-28

### Fixed

#### Correction dimensions rectangle vs carré

**Problème** : Le rectangle s'affichait comme un carré (160×160px) créant une ambiguïté pédagogique.

**Cause** : `baseHeight = 100` dans `Rectangle.jsx` et `RectangleFraction.jsx` combiné avec `proportions.height = 1.6` donnait `100 × 1.6 = 160px`, soit les mêmes dimensions que le carré (160×160).

**Solution** :

- `baseHeight` passé de 100 à 160
- ViewBox adapté dynamiquement aux proportions (`200 × 320` au lieu de `200 × 200`)
- Centre de rotation recalculé (`centerY = viewBoxHeight / 2`)

**Résultat** : Rectangle désormais clairement distinct du carré (160×256px avec proportions par défaut).

### Technical Details

**Fichiers modifiés** : 2

- `src/components/shapes/figures/Rectangle.jsx`
- `src/components/shapes/fractions/RectangleFraction.jsx`

**Lignes de code modifiées** : ~30

## [0.4.3] - 2026-01-28

### Fixed

#### Redondance fractionnements carré

**Problème** : Pour le carré, "rectangles horizontaux" et "rectangles verticaux" sont redondants (même forme obtenue par rotation 90°).

**Solution** : Suppression de "horizontal-rectangles" dans `SQUARE_SPLITTING_TYPES[8]`.

### Added

#### Nouveau fractionnement 1/8 de carré

**Type "Rectangles demi-quart"** : Rectangle de 80×40 px (moitié du côté × quart du côté).

- 8 positions possibles (2 par côté)
- Aire = 3 200 px² = 1/8 ✓
- Composant : `SquareHalfRectangle8thFraction.jsx`

### Improved

#### Zone cliquable restreinte à la forme

**Avant** : Zone cliquable = enveloppe rectangulaire 200×200 px (coins morts pour triangles/disques).

**Après** : Zone cliquable = forme réelle du morceau (`pointer-events: auto` sur SVG).

#### Contour de sélection suit la forme

**Avant** : Bordure rectangulaire bleue fixe.

**Après** : Filtre `drop-shadow` SVG qui épouse la forme réelle (triangles, secteurs, rectangles).

### Technical Details

**Fichiers modifiés** : 13

- `src/utils/fractionTypes.js`
- `src/components/shapes/Piece.jsx`
- `src/components/shapes/fractions/SquareHalfRectangle8thFraction.jsx` (nouveau)
- `src/components/shapes/fractions/index.js`
- `src/modes/CollectiveMode/FigureSelector.jsx`
- 10 composants de fractions (ajout `pointerEvents: 'auto'`)

**Lignes de code** : ~200

## [0.4.2] - 2026-01-28

### Fixed

#### Boutons de manipulation actifs en permanence

**Problème** : Après sélection d'un morceau, les boutons "Pivoter" et "Retourner" ne fonctionnaient qu'une seule fois.

**Cause** : Architecture avec fonctions capturées dans des closures (stale closures). Les callbacks passés à `GlobalToolbar` via `selectedPiece` capturaient les anciennes valeurs d'état.

**Solution** : Refonte complète en architecture de composant contrôlé :

- `Piece.jsx` devient un composant purement contrôlé (props `position`, `rotation`, `isFlipped`)
- Le parent gère tout l'état et fournit des callbacks stables
- `GlobalToolbar` reçoit des callbacks directs (`onRotate`, `onFlip`)

#### Rotation continue dans le sens horaire

**Problème** : La rotation faisait parfois un "retour arrière" désagréable (ex: 270° → 0°).

**Cause** : Utilisation de modulo 360 combinée avec transition CSS créait une animation dans le mauvais sens.

**Solution** :

- Rotation en incrémentation continue (0, 90, 180, 270, 360, 450, ...)
- Désactivation de la transition CSS pendant la rotation
- Affichage normalisé avec modulo uniquement pour l'affichage (`rotation % 360`)

### Changed

#### Architecture : Composant contrôlé

**Piece.jsx** :

- Plus d'état local pour `rotation` et `isFlipped`
- Props contrôlées reçues du parent
- Callback `onPositionChange` pour la position uniquement
- Callback `onSelect` simplifié (retourne juste l'ID)

**GlobalToolbar.jsx** :

- Props simplifiées : `isVisible`, `rotation`, `isFlipped`, `showFlipButton`
- Callbacks directs : `onRotate()`, `onFlip()`
- Plus de structure `selectedPiece` complexe

**Parents (ManipulationZone, ActivityOne, ActivityTwo)** :

- Gestion complète de l'état des morceaux
- Callbacks pour rotation/flip
- Calcul du `rotationStep` selon la forme

### Technical Details

**Fichiers modifiés** : 5

- `src/components/shapes/Piece.jsx` (refonte complète)
- `src/components/shapes/GlobalToolbar.jsx` (API simplifiée)
- `src/modes/CollectiveMode/ManipulationZone.jsx` (gestion état)
- `src/components/activities/ActivityOne.jsx` (gestion état)
- `src/components/activities/ActivityTwo.jsx` (gestion état)

**Lignes de code modifiées** : ~250

**Breaking changes** :

- API de `Piece.jsx` modifiée (composant contrôlé)
- API de `GlobalToolbar.jsx` modifiée (callbacks directs)

---

## [0.4.1] - 2026-01-28

### Fixed

#### Correction géométrie triangle coin 1/4

**Problème** : Le composant `SquareCornerTriangleFraction` générait un triangle de 1/8 au lieu de 1/4.

**Solution** : Triangle rectangle avec côtés 160px × 80px → aire = 6 400 px² = 1/4 ✓

### Added

#### Nouveaux fractionnements pour 1/8 du carré

- **Triangle isocèle rectangle** : 80px × 80px
- **Triangle rectangle mince** : 160px × 40px

---

## [0.4.0] - 2026-01-28

### Added

#### Mode Collectif - Outil de démonstration enseignant ✨

- Sélecteur de 3 modes : Autonome, Collectif, Guidé
- Configuration libre : figure, fraction, type, nombre de morceaux
- Zone de manipulation avec ajout/retrait dynamique
- Aide pédagogique avec questions suggérées
- Contrôles permanents (pas de timer)

---

## [0.3.0] - 2026-01-27

### Added

#### Fractionnements multiples

- Carré 1/2 : 2 types (rectangles, triangles diagonaux)
- Carré 1/4 : 4 types (rectangles, triangles coins, petits carrés, croix)
- Sélection aléatoire pour éviter les stéréotypes

---

## [0.2.0] - 2026-01-28

### Changed

- Suppression sélecteur de niveau (démarrage direct CE1)
- Nouvelle progression : Fraction → Figure → Activité
- Configuration EDUSCOL corrigée (18 exercices CE1)

---

## [0.1.0] - 2026-01-27

### Added

- Affichage conditionnel des boutons (sélection + timer 3s)
- Bordure de sélection avec animation
- Tooltips sur boutons

---

## [0.0.1] - 2026-01-20

### Added

- Structure initiale (React + Vite + Tailwind)
- Figures géométriques + composants de fractions
- Drag & drop avec PointerEvents
- Sauvegarde locale

---

**Dernière mise à jour :** 28 janvier 2026
