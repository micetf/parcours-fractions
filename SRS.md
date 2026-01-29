# Spécification des Exigences Logicielles (SRS)

## Application Web d'Apprentissage des Fractions

**Version :** 3.6  
**Date dernière modif :** 29 janvier 2026  
**Auteur :** Conseiller Pédagogique de Circonscription Numérique  
**Statut :** En développement - Alpha v0.4.6

---

## 1. Historique des révisions (remplacer le tableau complet)

| Version | Date       | Auteur        | Modifications                                                               |
| ------- | ---------- | ------------- | --------------------------------------------------------------------------- |
| 1.0     | 27/01/2026 | CPC Numérique | Création initiale - État Alpha v0.1.0                                       |
| 2.0     | 28/01/2026 | CPC Numérique | Correction configuration EDUSCOL + nouvelle progression                     |
| 3.0     | 28/01/2026 | CPC Numérique | Ajout Mode Collectif - État Alpha v0.4.0                                    |
| 3.1     | 28/01/2026 | CPC Numérique | Correction géométrie triangle 1/4 + ajout triangles 1/8 - État Alpha v0.4.1 |
| 3.2     | 28/01/2026 | CPC Numérique | Architecture contrôlée + rotation continue - État Alpha v0.4.2              |
| 3.3     | 28/01/2026 | CPC Numérique | Optimisation fractionnements + UX sélection - Alpha v0.4.3                  |
| 3.4     | 28/01/2026 | CPC Numérique | Ajout fractionnements triangle rectangle - État Alpha v0.4.4                |
| 3.5     | 29/01/2026 | CPC Numérique | Refonte UX Mode Collectif pédagogique - État Alpha v0.4.6                   |
| 3.6     | 29/01/2026 | CPC Numérique | Ajout fractionnement rectangle grille 2×2 - État Alpha v0.4.7               |
| 3.7     | 29/01/2026 | CPC Numérique | Simplification fractionnements rectangle - État Alpha v0.4.8                |
| 3.8     | 29/01/2026 | CPC Numérique | Ajout fractionnement rectangle forme en L - État Alpha v0.4.9               |

## 1. Introduction

### 1.1 Objectif du document

Ce document spécifie les exigences fonctionnelles et non-fonctionnelles de l'application web d'apprentissage des fractions destinée aux élèves de cycle 2 et cycle 3 de l'école primaire française, ainsi qu'aux enseignants pour la démonstration collective.

**Note importante** : La version 3.2 introduit une architecture de composant contrôlé pour résoudre les problèmes de manipulation (boutons actifs et rotation continue).

### 1.2 Contexte du projet

L'application s'inscrit dans le cadre des programmes de mathématiques 2025 de l'Éducation Nationale française. Elle vise à faciliter la compréhension des fractions par la manipulation, la verbalisation et les représentations variées, conformément aux recommandations EDUSCOL.

### 1.3 Portée

**Nom du produit :** Parcours Fractions  
**Public cible :**

- Élèves de CE1, CE2, CM1 (Mode Autonome)
- Enseignants du primaire (Mode Collectif)

**Domaine d'application :** Enseignement des mathématiques - Fractions  
**Type :** Application web éducative monopage (SPA)

### 1.4 Définitions et acronymes

- **EDUSCOL** : Site institutionnel du ministère de l'Éducation nationale proposant des ressources pédagogiques
- **SPA** : Single Page Application
- **Fraction unitaire** : Fraction avec numérateur égal à 1 (ex: 1/2, 1/4)
- **Présentation prototypique** : Présentation stéréotypée d'une figure (ex: disque divisé à partir du haut)
- **Présentation non-prototypique** : Présentation variée évitant les stéréotypes
- **Mode Collectif** : Mode de démonstration pour l'enseignant devant la classe
- **Mode Autonome** : Mode d'apprentissage individuel pour l'élève
- **Mode Guidé** : Mode d'apprentissage avec parcours personnalisé (à venir)
- **Composant contrôlé** : Composant React dont l'état est géré par le parent
- **Closure stale** : Fonction capturant des valeurs d'état obsolètes
- **Rotation continue** : Incrémentation de rotation sans modulo (0, 90, 180, 270, 360, 450...)

### 1.5 Références

- **Programmes 2025** : BO du 31 octobre 2024
- **Ressources EDUSCOL** : Fractions et nombres décimaux au cycle 3 (document 16510)
- **Livrets d'accompagnement** : CE1, CE2 (documents 67770, 65186)
- **React Documentation** : Controlled Components

---

## 2. Description générale

### 2.1 Perspective du produit

Application web autonome ne nécessitant aucune connexion serveur après le chargement initial. Fonctionne entièrement côté client avec sauvegarde locale de la progression.

### 2.2 Fonctionnalités principales

#### F1 - Sélection du mode d'utilisation

L'utilisateur peut choisir parmi trois modes :

- **Mode Autonome (🎯)** : Parcours EDUSCOL préétabli pour les élèves
- **Mode Collectif (👨‍🏫)** : Outil de démonstration pour l'enseignant
- **Mode Guidé (📝)** : Parcours personnalisé (à venir)

#### F2 - Mode Autonome : Activité 1

L'élève manipule un morceau de fraction pour déterminer combien il en faut pour reconstituer la figure complète.

#### F3 - Mode Autonome : Activité 2

L'élève répond à une série de questions progressives sur des morceaux de fraction déjà présents.

#### F4 - Mode Collectif : Configuration démonstration

L'enseignant configure librement :

- Figure (Carré, Rectangle, Disque, Maison)
- Dénominateur (dynamique selon la figure)
- Type de fractionnement (dynamique selon le dénominateur)
- Nombre de morceaux (1-10)

#### F5 - Mode Collectif : Manipulation collective

L'enseignant manipule des morceaux devant la classe avec :

- Contrôles permanents (pas de timer)
- Ajout/retrait de morceaux à la volée
- Aide pédagogique avec questions suggérées

#### F6 - Manipulation des morceaux (v0.4.2) ⭐

**Architecture contrôlée** :

- Composant `Piece.jsx` purement présentatif
- État géré par les parents (ManipulationZone, ActivityOne, ActivityTwo)
- Props contrôlées : `position`, `rotation`, `isFlipped`
- Callbacks : `onPositionChange`, `onSelect`

**Manipulation** :

- Déplacement (drag & drop)
- Rotation adaptée à la forme, **continue sans retour**
- Retournement (flip) pour formes non-circulaires
- Toolbar fixe (coin haut-droit)

**Comportements** :

- Boutons actifs indéfiniment (callbacks stables)
- Rotation continue : 0 → 90 → 180 → 270 → 360 → 450...
- Affichage normalisé : `rotation % 360`
- Transition désactivée pendant rotation

#### F7 - Progression et suivi (Mode Autonome)

- Barre de progression visuelle
- Sauvegarde automatique dans le navigateur
- Possibilité de recommencer

### 2.3 Classes et caractéristiques des utilisateurs

| Classe     | Âge      | Compétences      | Besoins spécifiques                 | Mode(s)          |
| ---------- | -------- | ---------------- | ----------------------------------- | ---------------- |
| Élève CE1  | 7-8 ans  | Lecture en cours | Interface très simple, guidage fort | Autonome         |
| Élève CE2  | 8-9 ans  | Lecture acquise  | Autonomie progressive               | Autonome         |
| Élève CM1  | 9-10 ans | Autonome         | Défis plus complexes                | Autonome         |
| Enseignant | Adulte   | Expert métier    | Configuration libre, manipulation   | Collectif, Guidé |

### 2.4 Environnement d'exploitation

- **Navigateurs supportés** : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Appareils** : Ordinateurs de bureau, tablettes (≥10 pouces recommandé)
- **Résolution minimale** : 1024×768 pixels
- **Connexion** : Requise uniquement pour le chargement initial
- **Projection** : Mode Collectif optimisé pour projection en classe

### 2.5 Contraintes de conception et d'implémentation

#### Contraintes pédagogiques

- Conformité stricte aux programmes EDUSCOL 2025
- Présentation non-prototypique obligatoire
- Respect de la progressivité des apprentissages
- Mode Collectif : interface adaptée à la projection
- Architecture prévisible pour manipulation fluide

#### Contraintes techniques

- Stack imposée : React 18, Vite, Tailwind CSS, pnpm
- Pas de TypeScript (choix explicite)
- Composants fonctionnels uniquement
- Pas de bibliothèque de manipulation (drag natif)
- Architecture contrôlée pour état prévisible

---

## 3. Exigences fonctionnelles détaillées

### 3.1 Gestion des modes

#### EF-01 : Sélection du mode

**Priorité :** Haute  
**Description :** L'utilisateur peut basculer entre 3 modes via un sélecteur visuel.

**Critères d'acceptation :**

- 3 boutons visuels avec icônes (🎯 Autonome, 👨‍🏫 Collectif, 📝 Guidé)
- Mode sélectionné mis en évidence (fond bleu, ombre)
- Mode Guidé désactivé avec badge "Bientôt disponible"
- Sauvegarde du mode dans localStorage (`fractions-mode`)
- Basculement fluide entre modes sans perte de données

**Dépendances :** Aucune

**Rationale** :

- Permet aux enseignants d'utiliser l'outil en démonstration
- Sépare les usages pédagogiques (élève vs enseignant)
- Évolutivité pour ajouter le Mode Guidé

---

### 3.2 Mode Autonome

#### EF-02 : Niveau par défaut

Le mode autonome démarre au niveau CE1 sans sélection visible.

#### EF-03 : Configuration des fractions par niveau

Les fractions présentées respectent strictement les programmes EDUSCOL 2025.

**CE1** :

- Figures : Carré, Rectangle, Disque
- Fractions : 1/2, 1/3, 1/4, 1/5 (selon figure)
- Total : 18 exercices

**CE2** :

- Figures : Carré, Rectangle, Disque
- Fractions : 1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10 (selon figure)
- Total : 28 exercices

**CM1** :

- Figures : Carré, Rectangle, Disque, Maison
- Fractions : 1/2, 1/3, 1/4, 1/5, 1/8, 1/10 (selon figure)
- Total : 26 exercices

#### EF-04 : Activité 1 - Compléter pour faire la figure

L'élève manipule un morceau pour déterminer le nombre nécessaire.

**Déroulement** :

1. Affichage figure complète + morceau unique
2. Élève manipule le morceau (rotation, retournement, déplacement)
3. Élève répond : "Il faut X morceaux"
4. Élève sélectionne le nom de la fraction
5. Validation simultanée des deux réponses

#### EF-05 : Activité 2 - Observer les morceaux donnés

L'élève répond à 4 questions progressives.

**Questions** :

1. Que représente un morceau ? (sélection nom fraction)
2. Combien de morceaux a-t-on ? (saisie nombre)
3. Combien faut-il pour faire la figure ? (saisie nombre)
4. Combien manque-t-il ? (saisie nombre)

**Comportement** :

- Validation séquentielle (une question à la fois)
- Passage automatique après bonne réponse
- Questions précédentes affichées en grisé

#### EF-06 : Alternance des activités

Pour chaque combinaison (fraction, figure), générer 1 exercice d'activité 1 puis 1 d'activité 2.

#### EF-07 : Sauvegarde de la progression

Sauvegarde de l'index de l'exercice courant dans localStorage (`fractions-autonomous-index`).

---

### 3.3 Mode Collectif

#### EF-08 : Affichage du Mode Collectif

**Priorité :** Haute

**Éléments affichés :**

1. Titre : "Mode Collectif - Démonstration"
2. Sous-titre : "Sélectionnez une figure et un fractionnement..."
3. Carte de configuration (fond blanc, ombre)
4. Zone de manipulation (si générée)
5. Bouton "Réinitialiser"

**Comportements :**

- Interface épurée pour projection
- Contrastes adaptés à la projection
- Tailles de police lisibles à distance

#### EF-09 : Configuration de la démonstration

**Priorité :** Haute

**Champs de configuration :**

| Champ                   | Type     | Valeurs                                         | Dynamique                     |
| ----------------------- | -------- | ----------------------------------------------- | ----------------------------- |
| Figure                  | Dropdown | Carré, Rectangle, Disque, Maison                | -                             |
| Fraction (dénominateur) | Dropdown | En 2 parties, En 3 parties, ... En 10 parties   | Change si figure change       |
| Type de fractionnement  | Dropdown | Rectangles verticaux, Triangles diagonaux, etc. | Change si dénominateur change |

**Comportement automatique :** :

- Émission automatique de la configuration à chaque changement (useEffect)
- Pas de bouton "Générer" : la zone de manipulation apparaît automatiquement
- Affichage masquable des informations enseignant (bouton Afficher/Masquer)

**Structure de la configuration émise** :

```javascript
{
  figure: "square",
  figureName: "carré",
  denominator: 4,
  splittingType: {
    id: "quarter-squares",
    component: "SquareQuarterSquareFraction",
    props: {}
  },
  figureRotation: 0,
  proportions: {},
  scale: 1,
  divisionOrientation: "vertical"
}
```

**Note importante** : Les informations `fractionName` et `fractionPlural` ne sont PAS incluses dans la configuration pour éviter leur affichage involontaire aux élèves.

### EF-10 : Zone de manipulation

**Priorité :** Haute

**Structure :**

- **Colonne gauche** : Figure de référence
    - Titre : "Figure complète"
    - Figure dans un cadre gris
    - ❌ SUPPRIMÉ : Légende "Fraction : 1/X (nom)"
- **Colonne droite** : Zone de travail
    - Titre : "Morceaux à manipuler"
    - Zone 600×500px fond ambré, bordure pointillée
    - Morceaux manipulables (commence à 0)
    - Message si 0 morceau : "Cliquez sur 'Ajouter un morceau'..."

**Contrôles d'ajout/retrait :**

- Bouton vert ➕ "Ajouter un morceau"
- Bouton rouge ➖ "Retirer un morceau" (désactivé si 0)
- Bouton gris 🗑️ "Tout retirer" (désactivé si 0, avec confirmation)
- Badge compteur : "X morceau(x)" (fond gris)

**Comportements :**

- Démarrage : 0 morceau (pas de props `pieceCount`)
- Ajout : nouveau morceau à position (200, 200)
- Retrait : suppression du dernier morceau
- Tout retirer : suppression de tous les morceaux avec confirmation
- Compteur mis à jour en temps réel

---

### EF-11 : Manipulation des morceaux en mode collectif (v0.4.2)

**Priorité :** Haute

**Architecture :**

- Prop `collectiveMode={true}` passée au composant `Piece`
- **Contrôles permanents** : Pas de timer de désélection
- Boutons ↻ et ⇄ toujours visibles quand morceau sélectionné
- Feedback visuel identique (bordure bleue si sélectionné)

**Actions disponibles :**

- Déplacement : drag & drop
- Rotation : bouton ↻ (angle adapté), **actif indéfiniment**
- Retournement : bouton ⇄ (sauf disque), **actif indéfiniment**

**Différences avec Mode Autonome :**

- Mode Autonome : timer 3s de désélection automatique
- Mode Collectif : toolbar permanente tant que sélectionné

---

### EF-12 : Aide pédagogique

**Priorité :** Moyenne

**Affichage :**

- Encart bleu (bg-blue-50) sous la zone de manipulation
- Titre : "💡 Questions suggérées (à poser oralement) :"
- 4 questions avec compteurs dynamiques uniquement

**Questions (sans révéler les noms de fractions) :**

1. "Que représente un de ces morceaux pour la figure ?"
2. "Combien de morceaux a-t-on actuellement ? (X)" → X = nombre actuel
3. "Combien de morceaux identiques faut-il pour faire la figure complète ?"
4. "Combien de morceaux manque-t-il ? (Y)" → Y = dénominateur - nombre actuel

**Calculs automatiques :**

- X = `pieces.length`
- Y = `Math.max(0, config.denominator - pieces.length)`

**Exemple concret** :

```
Configuration : Carré, En 4 parties (quarts), 3 morceaux

Questions affichées :
- Que représente un de ces morceaux pour la figure ?
- Combien de morceaux a-t-on actuellement ? (3)
- Combien de morceaux identiques faut-il pour faire la figure complète ?
- Combien de morceaux manque-t-il ? (1)

```

**Panneau enseignant (masquable) :**

- Fond jaune (bg-yellow-50), bordure jaune
- Bouton "👁️ Afficher / 👁️ Masquer" dans l'en-tête
- Contenu (si affiché) :
    - Fraction : 1/X (un nom)
    - Pluriel : noms
    - Total nécessaire : X morceaux
    - Actuellement affichés : Y morceau(x)
    - Manquants : Z morceau(x)

---

#### EF-13 : Boutons de masquage (v0.4.6)

**Priorité :** Moyenne

**Emplacement 1 : FigureSelector**

- Position : Sous les champs de configuration
- Encart bleu (bg-blue-50)
- Ligne avec titre + bouton
- Texte : "📋 Info enseignant : Fraction 1/X (nom)" (si affiché)
- Bouton : "👁️ Masquer / 👁️‍🗨️ Afficher"

**Emplacement 2 : ManipulationZone**

- Position : Sous les questions suggérées
- Encart jaune (bg-yellow-50)
- Section repliable avec bouton
- Titre : "📋 Informations enseignant"
- Bouton : "👁️ Masquer / 👁️‍🗨️ Afficher"
- Contenu : 5 lignes d'informations détaillées

**Comportement :**

- État local (showTeacherInfo) dans chaque composant
- Par défaut : masqué (false)
- Bascule au clic sur le bouton
- Icône change selon l'état

---

### 3.4 Manipulation des morceaux (v0.4.2) ⭐

#### EF-14 : Architecture composant contrôlé

**Priorité :** Critique
**Problème résolu** : Boutons inactifs après premier clic (closure stale)

**Solution : Composant contrôlé**

**Piece.jsx** - Composant présentatif pur :

```jsx
export default function Piece({
    // Props contrôlées (état géré par parent)
    position = { x: 0, y: 0 },
    rotation = 0,
    isFlipped = false,

    // Callbacks
    onPositionChange,  // Appelé lors du drag
    onSelect,          // Appelé lors du clic

    // Métadonnées
    pieceId,
    isSelected,

    // Configuration visuelle
    shape,
    denominator,
    splittingType,
    proportions,
    scale,
    // ...
})
```

**Parent (ManipulationZone / ActivityOne / ActivityTwo)** - Gestion état :

```jsx
// État centralisé
const [pieces, setPieces] = useState([
    {
        id: 'piece-1',
        position: { x: 100, y: 100 },
        rotation: 0,
        isFlipped: false,
    }
]);

const [selectedPieceId, setSelectedPieceId] = useState(null);

// Callbacks stables
const handleRotateSelected = () => {
    if (!selectedPieceId) return;

    setPieces(prev => prev.map(piece =>
        piece.id === selectedPieceId
            ? { ...piece, rotation: piece.rotation + rotationStep }
            : piece
    ));
};

const handleFlipSelected = () => {
    if (!selectedPieceId) return;

    setPieces(prev => prev.map(piece =>
        piece.id === selectedPieceId
            ? { ...piece, isFlipped: !piece.isFlipped }
            : piece
    ));
};

// Rendu
<Piece
    pieceId={piece.id}
    position={piece.position}
    rotation={piece.rotation}
    isFlipped={piece.isFlipped}
    onPositionChange={(pos) => handlePositionChange(piece.id, pos)}
    onSelect={setSelectedPieceId}
    isSelected={selectedPieceId === piece.id}
/>

<GlobalToolbar
    isVisible={!!selectedPieceId}
    rotation={selectedPiece?.rotation || 0}
    isFlipped={selectedPiece?.isFlipped || false}
    showFlipButton={showFlipButton}
    onRotate={handleRotateSelected}
    onFlip={handleFlipSelected}
/>
```

**GlobalToolbar.jsx** - Callbacks directs :

```jsx
export default function GlobalToolbar({
    isVisible,
    rotation,
    isFlipped,
    showFlipButton,
    onRotate,
    onFlip,
    position = "top-right",
}) {
    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-2xl p-4">
            <button onClick={onRotate}>↻ Pivoter</button>
            {showFlipButton && <button onClick={onFlip}>⇄ Retourner</button>}
            <div>Rotation: {rotation % 360}°</div>
        </div>
    );
}
```

**Avantages de l'architecture** :

- Source unique de vérité (état dans parent)
- Callbacks toujours à jour (pas de closure stale)
- Séparation présentation/logique
- Testabilité améliorée
- Boutons actifs indéfiniment

#### EF-15 : Rotation continue dans le sens horaire

**Priorité :** Critique  
**Problème résolu** : Retour arrière désagréable (270° → 0°)

**Solution : Incrémentation continue**

**Principe** :

- Rotation stockée sans modulo : 0, 90, 180, 270, 360, 450, 540...
- CSS `rotate(450deg)` = rotation visuelle à 90° (450 % 360 = 90)
- Affichage normalisé avec modulo uniquement dans la toolbar

**Implémentation** :

```jsx
// Dans le parent
const handleRotateSelected = () => {
    setPieces(prev => prev.map(piece =>
        piece.id === selectedPieceId
            ? {
                ...piece,
                rotation: piece.rotation + rotationStep  // Pas de modulo !
              }
            : piece
    ));
};

// Dans Piece.jsx
const [isRotating, setIsRotating] = useState(false);

useEffect(() => {
    if (isRotating) {
        const timer = setTimeout(() => setIsRotating(false), 100);
        return () => clearTimeout(timer);
    }
}, [isRotating]);

// Lors d'un clic sur rotation
useEffect(() => {
    setIsRotating(true);
}, [rotation]);

// Style
style={{
    transform: `translate(${position.x}px, ${position.y}px)
                rotate(${rotation}deg)
                scaleX(${isFlipped ? -1 : 1})`,
    transition: isDragging || isRotating ? "none" : "transform 0.2s ease",
}}

// Dans GlobalToolbar - Affichage normalisé
<div>Rotation: {rotation % 360}°</div>
```

**Comportement** :

- Clic 1 : 0° → 90°
- Clic 2 : 90° → 180°
- Clic 3 : 180° → 270°
- Clic 4 : 270° → 360° (affiché "0°")
- Clic 5 : 360° → 450° (affiché "90°")
- ...

**Avantages** :

- Rotation toujours dans le sens horaire
- Pas d'animation de retour
- Smooth et prévisible

#### EF-16 : Boutons actifs en permanence

**Priorité :** Critique  
**Problème résolu** : Boutons inactifs après premier clic

**Solution : Callbacks stables**

Les callbacks `handleRotateSelected` et `handleFlipSelected` :

- Lisent toujours l'état actuel via `setPieces(prev => ...)`
- Ne capturent pas de valeurs dans une closure
- Sont stables (même référence à chaque render)

**Test de validation** :

1. Sélectionner un morceau
2. Cliquer "Pivoter" 20 fois
3. Résultat attendu : 20 rotations successives (0° → 1800°)

#### EF-17 : Toolbar fixe

**Priorité :** Haute

**Position** : Coin haut-droit de la zone de manipulation (position fixed)

**Avantages** :

- Position prévisible
- Idéale pour projection (Mode Collectif)
- Ne bouge pas avec les transformations CSS du morceau
- Toujours accessible

**Affichage** :

- Visible uniquement si un morceau est sélectionné
- Affiche rotation normalisée (0-359°)
- Affiche état flip (Normal/Retourné)
- Boutons grands (48×48px minimum) pour tactile

---

### 3.5 Types de fractionnements

#### EF-18 : Fractionnements du carré

**Priorité :** Haute

**Carré 1/2 (2 types)** :

- Rectangles verticaux (classique)
- Triangles diagonaux

**Carré 1/4 (4 types)** :

- Rectangles verticaux (classique)
- Triangles coins (✅ corrigé v0.4.1 : 160×80px)
- Petits carrés (1/4 de l'aire : 80×80px)
- Triangles croix diagonale

**Carré 1/8 (4 types)** (✨ v0.4.1) :

- Rectangles verticaux (classique) - 20×160 px
- **Rectangles demi-quart** (nouveau) - 80×40 px
- Triangles isocèles rectangles - 80×80 px
- Triangles rectangles minces - 160×40 px

**Vérifications géométriques** :

```javascript
// Carré : 160×160 = 25 600 px²

// 1/4 (6 400 px²) :
// - Rectangle vertical : 40×160 = 6 400 ✓
// - Triangle coin : (160×80)/2 = 6 400 ✓
// - Petit carré : 80×80 = 6 400 ✓
// - Triangle croix : (160×80)/2 = 6 400 ✓

// 1/8 (3 200 px²) :
// - Rectangle vertical : 20×160 = 3 200 ✓
// - Rectangle demi-quart : 80×40 = 3 200 ✓
// - Triangle isocèle rectangle : (80×80)/2 = 3 200 ✓
// - Triangle rectangle mince : (160×40)/2 = 3 200 ✓
```

#### EF-19 : Fractionnements du rectangle

**Priorité :** Haute

**Rectangle 1/2 (4 types)** :

- Rectangles verticaux
- Rectangles horizontaux
- Triangles diagonaux
- Forme en L (nouveauté v0.4.9)

**Rectangle 1/4 (5 types)** :

- Rectangles verticaux
- Rectangles horizontaux
- Triangles quarts médians (toute la largeur)
- Triangles quarts quadrants (demi-largeur)
- Grille 2×2 (petits rectangles)

**Rectangle 1/8 (2 types)** :

- Rectangles verticaux
- Rectangles horizontaux

#### EF-20 : Fractionnements du disque

**Disque (1 type)** :

- Secteurs angulaires

---

## 4. Exigences non-fonctionnelles

### 4.1 Performance

**ENF-01 :** Temps de chargement initial < 3 secondes (connexion standard)  
**ENF-02 :** Transitions et animations fluides (60 fps)  
**ENF-03 :** Réactivité du drag < 16ms (1 frame)  
**ENF-04 :** Basculement entre modes < 200ms  
**ENF-05 :** Rotation sans saccade (transition désactivée pendant rotation)

### 4.2 Utilisabilité

**ENF-06 :** Interface adaptée aux jeunes lecteurs (taille police ≥ 16px)  
**ENF-07 :** Boutons tactiles ≥ 44×44 pixels  
**ENF-08 :** Feedback immédiat pour toute action utilisateur  
**ENF-09 :** Palette de couleurs non-agressive (tons pastels)  
**ENF-10 :** Mode Collectif : Interface adaptée à la projection (contrastes, tailles)  
**ENF-11 :** Toolbar fixe prévisible (coin haut-droit)  
**ENF-12 :** Boutons actifs sans limite de clics

### 4.3 Accessibilité

**ENF-13 :** Contraste WCAG AA minimum (4.5:1)  
**ENF-14 :** Navigation clavier complète  
**ENF-15 :** Attributs ARIA sur les boutons  
**ENF-16 :** Support lecteurs d'écran (basique)

### 4.4 Fiabilité

**ENF-17 :** Pas de perte de données en cas de fermeture du navigateur  
**ENF-18 :** Gestion des erreurs localStorage (mode dégradé)  
**ENF-19 :** Génération déterministe des exercices (seed basé sur ID)  
**ENF-20 :** Isolation des sauvegardes par mode (pas d'écrasement)  
**ENF-21 :** Architecture prévisible (composant contrôlé, pas de closure stale)

### 4.5 Maintenabilité

**ENF-22 :** Code modulaire avec composants réutilisables  
**ENF-23 :** Séparation configuration / logique métier  
**ENF-24 :** Documentation inline (JSDoc light)  
**ENF-25 :** Nomenclature cohérente (français métier, anglais code)  
**ENF-26 :** Architecture extensible pour nouveaux modes  
**ENF-27 :** Composants contrôlés pour état prévisible
**ENF-28 :** Zone cliquable restreinte à la forme réelle (pas d'enveloppe morte)
**ENF-29 :** Contour de sélection suit la forme (drop-shadow SVG)

---

## 5. Architecture technique

### 5.1 Stack technologique

| Composant       | Technologie  | Version  | Justification                                |
| --------------- | ------------ | -------- | -------------------------------------------- |
| Framework       | React        | 18.3.1   | Standard industrie, composants réutilisables |
| Build Tool      | Vite         | 5.4.0+   | Performance, HMR rapide                      |
| Compilateur     | SWC          | via Vite | Compilation ultra-rapide                     |
| Styling         | Tailwind CSS | 3.4.1+   | Utilitaire, responsive, customisable         |
| Package Manager | pnpm         | 8.0+     | Performance, économie d'espace               |
| Langage         | JavaScript   | ES2022+  | Pas de TypeScript (choix projet)             |

### 5.2 Structure des composants (v0.4.2)

```
src/
├── modes/
│   └── CollectiveMode/
│       ├── CollectiveMode.jsx
│       ├── FigureSelector.jsx
│       └── ManipulationZone.jsx          # ⭐ État + callbacks
├── components/
│   ├── ModeSelector.jsx
│   ├── activities/
│   │   ├── ActivityOne.jsx               # ⭐ État + callbacks
│   │   └── ActivityTwo.jsx               # ⭐ État + callbacks
│   ├── shapes/
│   │   ├── Piece.jsx                     # ⭐ Composant contrôlé
│   │   ├── GlobalToolbar.jsx             # ⭐ Callbacks directs
│   │   ├── figures/
│   │   │   ├── Disk.jsx
│   │   │   ├── Square.jsx
│   │   │   ├── Rectangle.jsx
│   │   │   └── House.jsx
│   │   └── fractions/                    # 10 composants v0.4.1
│   │       ├── DiskFraction.jsx
│   │       ├── SquareFraction.jsx
│   │       ├── SquareDiagonalFraction.jsx
│   │       ├── SquareCornerTriangleFraction.jsx      # ✅ corrigé
│   │       ├── SquareQuarterSquareFraction.jsx
│   │       ├── SquareCrossFraction.jsx
│   │       ├── SquareIsoscelesTriangleFraction.jsx   # ✨ nouveau
│   │       ├── SquareRectangleThin8thFraction.jsx    # ✨ nouveau
│   │       ├── RectangleFraction.jsx
│   │       └── HouseFraction.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   ├── fractionConfig.js
│   └── fractionTypes.js
├── data/
│   └── progression.js
└── App.jsx
```

### 5.3 Flux de données (v0.4.2)

**Modèle :** Unidirectionnel (React standard) avec composants contrôlés

**Mode Autonome :**

```
App (état global)
  ↓ props
ActivityOne / ActivityTwo (état local)
  ↓ props (position, rotation, isFlipped)
  ↓ callbacks (onPositionChange, onSelect)
Piece (présentatif pur)
  ↑ événements
ActivityOne / ActivityTwo
  ↑ mise à jour état
GlobalToolbar
  ↑ callbacks (onRotate, onFlip)
ActivityOne / ActivityTwo
  ↑ mise à jour état
```

**Mode Collectif :**

```
App (routage)
  ↓
CollectiveMode (état local)
  ↓ props
FigureSelector → onGenerate → ManipulationZone (état local)
  ↓ props (position, rotation, isFlipped)
  ↓ callbacks (onPositionChange, onSelect)
Piece (présentatif pur)
  ↑ événements
ManipulationZone
  ↑ mise à jour état
GlobalToolbar
  ↑ callbacks (onRotate, onFlip)
ManipulationZone
  ↑ mise à jour état
```

**État global (App.jsx) :**

- `currentMode` : mode actuel (autonomous/collective/guided)
- Mode Autonome :
    - `level` : niveau CE1 (fixe)
    - `exercises` : tableau d'exercices générés
    - `currentIndex` : position dans la progression
- Mode Collectif : État local dans `CollectiveMode.jsx`

**Persistance :**

- `fractions-mode` : Mode sélectionné
- `fractions-autonomous-index` : Progression mode autonome

---

## 6. Modèle de données

### 6.1 État des morceaux (v0.4.2)

```javascript
// Dans le parent (ManipulationZone, ActivityOne, ActivityTwo)
const [pieces, setPieces] = useState([
    {
        id: string, // "piece-1"
        position: { x, y }, // { x: 100, y: 100 }
        rotation: number, // 0, 90, 180, 270, 360, 450... (continu)
        isFlipped: boolean, // false
    },
]);

const [selectedPieceId, setSelectedPieceId] = useState(null);
```

### 6.2 Structure d'un exercice (Mode Autonome)

```javascript
{
  id: string,                    // "square-2-act1-0.123456"
  figure: string,                // "disk"|"square"|"rectangle"|"house"
  fraction: {
    denominator: number,         // 2, 3, 4, 5, 8, 10
    name: string,                // "demi", "tiers"...
    plural: string               // "demis", "tiers"...
  },
  activity: number,              // 1 ou 2
  figureRotation: number,        // 0, 90, 180, 270
  pieceRotation: number,         // 0, 90, 180, 270 (ou angle disque)
  divisionOrientation: string,   // "vertical"|"horizontal"
  proportions: object,           // { width, height } ou { roofHeight }
  scale: number,                 // 0.8-1.2
  splittingType: {               // v0.3.0+
    id: string,
    component: string,
    props: object
  },
  // Activité 1 uniquement
  startAngle: number,            // 0-360 (disque)
  pieceIndex: number,            // 0 à (denominator-1)
  // Activité 2 uniquement
  givenPieces: number,           // 1 à (denominator-1)
  piecesData: [
    {
      startAngle: number,
      index: number,
      position: { x, y },
      rotation: number
    }
  ]
}
```

### 6.3 Configuration EDUSCOL (Mode Autonome)

```javascript
export const PROGRESSION_EDUSCOL = {
    CE1: {
        figures: ["square", "rectangle", "disk"],
        fractions: {
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 5, name: "cinquième", plural: "cinquièmes" },
            ],
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
            ],
        },
    },
    CE2: {
        figures: ["square", "rectangle", "disk"],
        fractions: {
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 5, name: "cinquième", plural: "cinquièmes" },
                { denominator: 6, name: "sixième", plural: "sixièmes" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
                { denominator: 10, name: "dixième", plural: "dixièmes" },
            ],
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
        },
    },
    CM1: {
        figures: ["square", "rectangle", "disk", "house"],
        fractions: {
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            house: [
                { denominator: 5, name: "cinquième", plural: "cinquièmes" },
                { denominator: 10, name: "dixième", plural: "dixièmes" },
            ],
        },
    },
};
```

### 6.4 Configuration démonstration (Mode Collectif)

```javascript
{
  figure: 'disk'|'square'|'rectangle'|'house',
  figureName: string,                // "carré", "rectangle"...
  denominator: number,               // 2, 3, 4, 5, 8, 10
  fractionName: string,              // "demi", "tiers"...
  fractionPlural: string,            // "demis", "tiers"...
  splittingType: {
    id: string,                      // "quarter-squares"...
    component: string,               // "SquareQuarterSquareFraction"
    props: object                    // {}
  },
  pieceCount: number,                // 1-10
  figureRotation: number,            // 0
  proportions: object,               // {}
  scale: number,                     // 1
  divisionOrientation: string        // "vertical"
}
```

### 6.5 Données sauvegardées (localStorage)

```javascript
{
  'fractions-mode': 'autonomous'|'collective'|'guided',
  'fractions-autonomous-index': number  // 0-17 (CE1)
}
```

---

## 7. Interface utilisateur

### 7.1 Charte graphique

**Palette de couleurs :**

```css
--primary: #3b82f6 /* Bleu - actions principales */ --success: #10b981
    /* Vert - validation */ --error: #ef4444 /* Rouge - erreur */
    --bg-light: #fef3c7 /* Fond chaud */ --shape-fill: #fbbf24
    /* Orange - figures */ --piece-fill: #60a5fa /* Bleu clair - morceaux */;
```

**Typographie :**

- Police principale : Nunito (Google Fonts)
- Poids : 400 (normal), 600 (semibold), 700 (bold), 800 (extrabold)
- Corps : 16-18px minimum
- Titres : 24-32px

**Espacements :**

- Grille Tailwind (4px de base)
- Marges généreuses pour aération
- Padding confortable sur boutons (≥ 12px)

### 7.2 Composants d'interface

#### Sélecteur de mode

- 3 cartes horizontales côte à côte
- Carte active : fond bleu, texte blanc, ombre portée, scale 105%
- Carte inactive : fond gris, texte gris foncé, hover gris clair
- Carte désactivée : fond gris clair, texte gris, cursor not-allowed
- Icônes : 3xl (48px)
- Texte : Titre (lg, bold) + Description (sm)

#### Mode Autonome - En-tête

- Titre : "Les Fractions" (4xl, bold, centré)
- Barre de progression :
    - Numéro exercice / Total
    - Type d'activité
    - Pourcentage
    - Barre visuelle (fond gris, remplissage bleu)
    - Bouton "Recommencer" (texte gris, underline)

#### Mode Collectif - Configuration

- Carte blanche, ombre portée
- Titre : "Configuration de la démonstration" (2xl, bold)
- Grille 3 colonnes (responsive : 1 col mobile, 2 tablette, 3 desktop)
- Champs : Label (sm, semibold) + Dropdown (lg, border-2)
- Encart info enseignant masquable (bleu clair)

#### Mode Collectif - Zone de manipulation

- 2 colonnes : Figure référence (gauche) + Zone travail (droite)
- Figure : Cadre gris clair, padding généreux
- Zone travail : 600×500px, fond ambré, bordure pointillée ambrée
- Contrôles : 4 éléments centrés au-dessus de la zone
    - Vert (ajout) + Rouge (retrait) + Gris (tout retirer) + Badge gris (compteur)
- Panneau enseignant masquable (jaune clair)

**Bouton masquage info enseignant**

- Taille : px-3 py-1 (petit) ou px-4 py-2 (moyen)
- Couleurs : bg-blue-200 hover:bg-blue-300 (config) ou bg-yellow-200 hover:bg-yellow-300 (zone)
- Texte : text-sm font-semibold
- Icônes : 👁️ (affiché) / 👁️‍🗨️ (masqué)
- Transition : transition-colors

#### GlobalToolbar (v0.4.2)

- Position : fixed, top-4, right-4
- Largeur : 200px
- Padding : 16px
- Fond : blanc
- Bordure : 2px blue-400
- Ombre : shadow-2xl
- z-index : 50
- Boutons : 48×48px minimum (tactile)
- Icônes : 24×24px
- Labels : 14px, bold
- Animation entrée : `animate-controls-appear`

---

## 8. Règles métier

### 8.1 Génération des exercices (Mode Autonome)

**RM-01** : Pour chaque fraction disponible au niveau CE1, générer 2 exercices (activité 1 et 2) pour chaque figure compatible

**RM-02** : Les variations visuelles sont générées aléatoirement lors de la génération initiale

**RM-03** : Les angles et positions aléatoires utilisent Math.random() uniquement lors de la génération

**RM-04** : Pour l'activité 2, le nombre de morceaux donnés est : 1 ≤ n < dénominateur

**RM-05** : L'ordre de génération suit : Fraction → Figure → Activité

**RM-06** : L'ordre pédagogique des fractions est : 2, 4, 8, 3, 5, 10

### 8.2 Configuration démonstration (Mode Collectif)

**RM-07** : Les dénominateurs disponibles dépendent de la figure sélectionnée selon EDUSCOL

**RM-08** : Les types de fractionnement disponibles dépendent du dénominateur sélectionné

**RM-09** : Le nombre de morceaux est libre (1-10) sans contrainte pédagogique

**RM-10** : La génération n'utilise pas de variations aléatoires (rotation 0°, scale 1, etc.)

**RM-11** : Chaque ajout de morceau positionne le nouveau à (200, 200)

### 8.3 Manipulation (v0.4.2)

**RM-12** : Le bouton flip n'est pas affiché pour les disques (symétrie radiale)

**RM-13** : Le drag & drop fonctionne à la fois avec souris et tactile (PointerEvents)

**RM-14** : En mode collectif, les contrôles sont toujours visibles (collectiveMode=true)

**RM-15** : En mode autonome, les contrôles disparaissent après 3s d'inactivité

**RM-16** : Les boutons "Pivoter" et "Retourner" sont actifs indéfiniment

**RM-17** : La rotation est continue (0, 90, 180, 270, 360, 450...) sans modulo

**RM-18** : L'affichage de la rotation dans la toolbar est normalisé avec modulo (0-359°)

**RM-19** : La transition CSS est désactivée pendant la rotation pour éviter l'animation de retour

### 8.4 Architecture (v0.4.2)

**RM-20** : Piece.jsx est un composant purement contrôlé, sans état local pour rotation/flip

**RM-21** : Les parents (ManipulationZone, ActivityOne, ActivityTwo) gèrent tout l'état des morceaux

**RM-22** : Les callbacks passés à GlobalToolbar sont stables et lisent toujours l'état actuel

**RM-23** : L'état des morceaux est la source unique de vérité

**RM-24** : Les callbacks utilisent `setPieces(prev => ...)` pour éviter les closures stales

### 8.5 Validation (Mode Autonome uniquement)

**RM-25** : Pour l'activité 1, la validation est simultanée sur les deux champs

**RM-26** : Pour l'activité 2, les validations sont séquentielles

**RM-27** : Une réponse correcte déclenche un délai avant passage automatique

**RM-28** : Une réponse incorrecte permet une nouvelle tentative immédiate

### 8.6 Géométrie des fractionnements (v0.4.1)

**RM-29** : Toutes les aires doivent être vérifiées mathématiquement

**RM-30** : Pour le carré 160×160 (25 600 px²) :

- 1/2 = 12 800 px²
- 1/4 = 6 400 px²
- 1/8 = 3 200 px²

**RM-31** : Triangle coin 1/4 : base 160px × hauteur 80px → (160×80)/2 = 6 400 px² ✓

**RM-32** : Triangle isocèle 1/8 : côtés 80px × 80px → (80×80)/2 = 3 200 px² ✓

**RM-33** : Triangle mince 1/8 : base 160px × hauteur 40px → (160×40)/2 = 3 200 px² ✓

---

## 9. Cas d'utilisation

### CU-01 : Basculer entre modes

**Acteur principal :** Utilisateur (enseignant ou élève)  
**Préconditions :** Application chargée  
**Postconditions :** Mode sélectionné sauvegardé

**Scénario nominal :**

1. L'utilisateur clique sur un des 3 boutons de mode
2. Le système sauvegarde le choix dans localStorage
3. Le système affiche l'interface du mode sélectionné
4. Le système préserve les données des autres modes

**Scénarios alternatifs :**

- 1a. Mode Guidé cliqué → Message "Bientôt disponible"

---

### CU-02 : Manipuler en démonstration (Mode Collectif) - v0.4.6

**Acteur principal :** Enseignant  
**Préconditions :** Configuration effectuée, zone affichée (0 morceau)  
**Postconditions :** État de la manipulation mis à jour

**Scénario nominal :**

1. L'enseignant clique sur "Ajouter un morceau"
2. Le système affiche un morceau à la position (200, 200)
3. L'enseignant répète 2 fois (total : 3 morceaux)
4. L'enseignant clique sur un morceau
5. Le système sélectionne le morceau (bordure bleue)
6. Le système affiche la toolbar fixe (coin haut-droit)
7. L'enseignant déplace le morceau par drag & drop
8. L'enseignant clique sur "Pivoter" (5 fois)
9. Le système pivote à chaque clic (rotation continue)
10. L'enseignant pose les questions suggérées aux élèves
11. Les élèves répondent oralement
12. L'enseignant clique sur "Afficher" (panneau enseignant)
13. Le système affiche : "Fraction : 1/4 (un quart), Total : 4, Actuels : 3, Manquants : 1"

**Scénarios alternatifs :**

- 12a. L'enseignant clique sur "Retirer un morceau" → Dernier morceau disparaît (2 restants)
- 12b. L'enseignant clique sur "Tout retirer" → Confirmation → Tous les morceaux disparaissent
- 12c. L'enseignant clique sur "Retourner" → Morceau se retourne
- 12d. L'enseignant clique à côté → Désélection, toolbar disparaît

---

### CU-03 : Manipuler en démonstration (Mode Collectif) - v0.4.2

**Acteur principal :** Enseignant  
**Préconditions :** Démonstration générée  
**Postconditions :** État de la manipulation mis à jour

**Scénario nominal :**

1. L'enseignant clique sur un morceau
2. Le système sélectionne le morceau (bordure bleue)
3. Le système affiche la toolbar fixe (coin haut-droit)
4. L'enseignant déplace le morceau par drag & drop
5. Le système met à jour la position
6. L'enseignant clique sur le bouton "Pivoter"
7. Le système pivote le morceau de l'angle adapté
8. L'enseignant clique à nouveau sur "Pivoter" (5 fois)
9. Le système pivote à chaque clic (rotation continue)
10. L'enseignant pose les questions suggérées aux élèves
11. Les élèves répondent oralement

**Scénarios alternatifs :**

- 6a. L'enseignant clique sur "Ajouter un morceau" → Nouveau morceau apparaît
- 6b. L'enseignant clique sur "Retirer un morceau" → Dernier morceau disparaît
- 6c. L'enseignant clique sur "Retourner" → Morceau se retourne
- 6d. L'enseignant clique à côté → Désélection, toolbar disparaît

---

### CU-04 : Démarrer un parcours autonome

**Acteur principal :** Élève  
**Préconditions :** Application chargée, Mode Autonome sélectionné  
**Postconditions :** Premier exercice affiché

**Scénario nominal :**

1. L'élève accède à l'application
2. Le système charge la progression sauvegardée (ou démarre à 0)
3. Le système affiche l'exercice correspondant à l'index sauvegardé
4. L'élève visualise la barre de progression

**Scénarios alternatifs :**

- 2a. Pas de sauvegarde → Démarre à l'exercice 0

---

### CU-05 : Compléter un exercice de type 1 - v0.4.2

**Acteur principal :** Élève  
**Préconditions :** Exercice d'activité 1 affiché  
**Postconditions :** Validation effectuée, passage à l'exercice suivant si correct

**Scénario nominal :**

1. L'élève observe la figure complète et le morceau
2. L'élève clique sur le morceau
3. Le système sélectionne le morceau et affiche la toolbar
4. L'élève clique sur "Pivoter" plusieurs fois pour comprendre
5. Le système pivote à chaque clic (rotation continue)
6. Après 3s sans interaction, la toolbar disparaît
7. L'élève saisit le nombre de morceaux nécessaires
8. L'élève sélectionne le nom de la fraction
9. L'élève clique sur "Valider"
10. Le système vérifie les deux réponses
11. Le système affiche un message de succès
12. Après 1,5 seconde, le système passe à l'exercice suivant

**Scénarios alternatifs :**

- 10a. Réponse incorrecte → Message d'erreur, nouvelle tentative
- 4a. L'élève manipule le morceau sans répondre → Pas de validation

---

### CU-06 : Compléter un exercice de type 2 - v0.4.2

**Acteur principal :** Élève  
**Préconditions :** Exercice d'activité 2 affiché  
**Postconditions :** 4 questions validées, passage à l'exercice suivant

**Scénario nominal :**

1. L'élève observe les morceaux donnés
2. L'élève clique sur un morceau
3. Le système sélectionne le morceau et affiche la toolbar
4. L'élève explore en pivotant et retournant
5. Le système exécute chaque action (boutons actifs)
6. L'élève répond à la question 1
7. Le système valide, affiche la question 2
8. L'élève répond aux questions 2, 3, 4 successivement
9. Le système valide chaque étape
10. Après la question 4 correcte, passage à l'exercice suivant

**Scénarios alternatifs :**

- 6a. Réponse incorrecte → Message d'erreur, nouvelle tentative

---

## 10. Contraintes et limitations

### 10.1 Limitations de la version 0.4.2

**L10-01 :** Pas de clippage automatique en mode collectif  
**L10-02 :** Pas de mode plein écran pour projection optimale  
**L10-03 :** Mode Guidé non implémenté  
**L10-04 :** Pas d'interface enseignant pour personnaliser le mode autonome  
**L10-05 :** Pas de suivi détaillé des erreurs par élève  
**L10-06 :** Pas d'export des résultats  
**L10-07 :** Pas de support multi-utilisateurs  
**L10-08 :** Pas de mode hors-ligne progressif (PWA)  
**L10-09 :** Activité 2 limitée aux fractions < 1 (même en CM1)  
**L10-10 :** Pas d'historique undo/redo des manipulations  
**L10-11 :** Pas d'animation fluide lors de rotations rapides successives

### 10.2 Contraintes techniques

**C10-01 :** Nécessite un navigateur moderne (ES2022+)  
**C10-02 :** Données limitées à 5-10 MB (localStorage)  
**C10-03 :** Pas de synchronisation multi-appareils  
**C10-04 :** Dépendance à Google Fonts (si réseau coupé après chargement initial)  
**C10-05 :** Architecture contrôlée impose structure parent/enfant stricte

---

## 11. Évolutions futures

### 11.1 Priorité haute

**EV-H1 :** Mode Collectif : Système de clippage automatique

- Détection proximité morceau ↔ figure
- Snap automatique si distance < 50px
- Feedback visuel (bordure verte)

**EV-H2 :** Mode Collectif : Mode plein écran

- Bouton "Mode présentation"
- Masquer les contrôles de configuration
- Maximiser la zone de manipulation

**EV-H3 :** Mode Guidé : Interface enseignant

- Sélection des exercices à inclure
- Paramétrage des variations
- Export de la configuration

**EV-H4 :** Mode Guidé : Interface élève

- Parcours personnalisé par l'enseignant
- Suivi de progression
- Feedback adapté

**EV-H5 :** Historique des manipulations

- Boutons undo/redo
- Historique des 10 dernières actions
- Replay automatique

### 11.2 Priorité moyenne

**EV-M1 :** Fractionnements avancés

- Fractionnements pour rectangle (diagonales)
- Fractionnements pour maison (variations)

**EV-M2 :** Activité 2 avec fractions > 1 (CM1)  
**EV-M3 :** Feedback sonore optionnel  
**EV-M4 :** Export des résultats (PDF, CSV)  
**EV-M5 :** Mode hors-ligne complet (PWA)  
**EV-M6 :** Animation fluide rotations rapides

### 11.3 Priorité basse

**EV-B1 :** Multi-utilisateurs avec base de données  
**EV-B2 :** Gamification (badges, scores)  
**EV-B3 :** Adaptation de la difficulté (IA légère)  
**EV-B4 :** Internationalisation (autres langues)

---

## 12. Critères d'acceptation globaux

### Phase Alpha (v0.4.2)

✅ **CA-A1 :** Le niveau CE1 fonctionne correctement (Mode Autonome)  
✅ **CA-A2 :** Les deux types d'activités fonctionnent (Mode Autonome)  
✅ **CA-A3 :** Les fractions respectent la configuration EDUSCOL 2025  
✅ **CA-A4 :** Les figures sont présentées de manière non-prototypique  
✅ **CA-A5 :** La manipulation fonctionne sur desktop et tablette  
✅ **CA-A6 :** La progression est sauvegardée et restaurée (Mode Autonome)  
✅ **CA-A7 :** La progression suit l'ordre Fraction → Figure → Activité  
✅ **CA-A8 :** L'ordre des figures est Carré → Rectangle → Disque  
✅ **CA-A9 :** Le Mode Collectif permet la configuration libre  
✅ **CA-A10 :** Le Mode Collectif affiche les contrôles permanents  
✅ **CA-A11 :** Le Mode Collectif permet l'ajout/retrait de morceaux  
✅ **CA-A12 :** L'aide pédagogique affiche les calculs corrects  
✅ **CA-A13 :** Le basculement entre modes préserve les données  
✅ **CA-A14 :** Triangle coin 1/4 affiche la géométrie correcte (160×80px)  
✅ **CA-A15 :** Nouveaux triangles 1/8 disponibles dans le sélecteur  
✅ **CA-A16 :** Architecture composant contrôlé fonctionnelle  
✅ **CA-A17 :** Rotation continue sans retour arrière  
✅ **CA-A18 :** Boutons actifs indéfiniment (pas de closure stale)  
✅ **CA-A19 :** Toolbar fixe position prévisible (coin haut-droit)  
✅ **CA-A20 :** Fractionnement rectangle forme en L disponible  
⬜ **CA-A21 :** Tests sur les 4 navigateurs cibles  
⬜ **CA-A22 :** Accessibilité WCAG AA validée

### Phase Beta (v0.5.0+)

⬜ **CA-B1 :** Tests utilisateurs enseignants avec Mode Collectif  
⬜ **CA-B2 :** Tests utilisateurs avec 3 classes (CE1, CE2, CM1) en Mode Autonome  
⬜ **CA-B3 :** Corrections des bugs remontés  
⬜ **CA-B4 :** Optimisations de performance si nécessaire  
⬜ **CA-B5 :** Documentation utilisateur (guide enseignant)  
⬜ **CA-B6 :** Implémentation du clippage automatique (Mode Collectif)  
⬜ **CA-B7 :** Implémentation historique undo/redo

### Phase Release

⬜ **CA-R1 :** Déploiement sur serveur académique ou public  
⬜ **CA-R2 :** Formation des enseignants pilotes  
⬜ **CA-R3 :** Monitoring des usages pendant 1 mois  
⬜ **CA-R4 :** Collecte de retours pour v2.0

---

## 13. Annexes

### Annexe A : Correspondance fractions/noms

| Dénominateur | Singulier | Pluriel    |
| ------------ | --------- | ---------- |
| 2            | demi      | demis      |
| 3            | tiers     | tiers      |
| 4            | quart     | quarts     |
| 5            | cinquième | cinquièmes |
| 6            | sixième   | sixièmes   |
| 8            | huitième  | huitièmes  |
| 10           | dixième   | dixièmes   |

### Annexe B : Mapping figures/fractions par niveau

**CE1 (18 exercices)** :

| Figure    | Fractions | Exercices |
| --------- | --------- | --------- |
| Carré     | 1/2, 1/4  | 4         |
| Rectangle | 1/2 à 1/5 | 8         |
| Disque    | 1/2 à 1/4 | 6         |

**CE2 (28 exercices)** :

| Figure    | Fractions            | Exercices |
| --------- | -------------------- | --------- |
| Carré     | 1/2, 1/4, 1/8        | 6         |
| Rectangle | 1/2 à 1/6, 1/8, 1/10 | 14        |
| Disque    | 1/2 à 1/4, 1/8       | 8         |

**CM1 (26 exercices)** :

| Figure    | Fractions      | Exercices |
| --------- | -------------- | --------- |
| Carré     | 1/2, 1/4, 1/8  | 6         |
| Rectangle | 1/2 à 1/4, 1/8 | 8         |
| Disque    | 1/2 à 1/4, 1/8 | 8         |
| Maison    | 1/5, 1/10      | 4         |

### Annexe C : Algorithmes clés

#### Ordre de génération (Mode Autonome)

```javascript
// Ordre pédagogique des fractions
const fractionOrder = [2, 4, 8, 3, 5, 10];

// Pour chaque fraction (dans l'ordre pédagogique)
fractionOrder.forEach((denominator) => {
    // Pour chaque figure compatible
    figures.forEach((figure) => {
        if (hasFraction(figure, denominator)) {
            // Générer Activité 1
            exercises.push(generateActivity1(figure, denominator));
            // Générer Activité 2
            exercises.push(generateActivity2(figure, denominator));
        }
    });
});
```

#### Architecture composant contrôlé (v0.4.2)

```javascript
// Parent (ManipulationZone, ActivityOne, ActivityTwo)
const [pieces, setPieces] = useState([
    { id: 'piece-1', position: {x, y}, rotation: 0, isFlipped: false }
]);

const [selectedPieceId, setSelectedPieceId] = useState(null);

const handleRotateSelected = () => {
    if (!selectedPieceId) return;

    setPieces(prev => prev.map(piece =>
        piece.id === selectedPieceId
            ? { ...piece, rotation: piece.rotation + rotationStep }
            : piece
    ));
};

// Rendu
<Piece
    pieceId={piece.id}
    position={piece.position}
    rotation={piece.rotation}
    isFlipped={piece.isFlipped}
    onPositionChange={(pos) => handlePositionChange(piece.id, pos)}
    onSelect={setSelectedPieceId}
    isSelected={selectedPieceId === piece.id}
/>

<GlobalToolbar
    isVisible={!!selectedPieceId}
    rotation={selectedPiece?.rotation || 0}
    isFlipped={selectedPiece?.isFlipped || false}
    onRotate={handleRotateSelected}
    onFlip={handleFlipSelected}
/>
```

#### Rotation continue (v0.4.2)

```javascript
// Incrémentation sans modulo
const handleRotate = () => {
    setPieces(prev => prev.map(piece =>
        piece.id === selectedId
            ? { ...piece, rotation: piece.rotation + rotationStep }
            : piece
    ));
};

// Désactivation transition pendant rotation
const [isRotating, setIsRotating] = useState(false);

useEffect(() => {
    if (isRotating) {
        const timer = setTimeout(() => setIsRotating(false), 100);
        return () => clearTimeout(timer);
    }
}, [isRotating]);

// Dans le style
transition: isDragging || isRotating ? "none" : "transform 0.2s ease"

// Affichage normalisé dans toolbar
<div>Rotation: {rotation % 360}°</div>
```

#### Vérification géométrique des fractionnements (v0.4.1)

**Triangle coin 1/4 (corrigé) :**

```javascript
// Carré : 160×160 = 25 600 px²
// Triangle : base 160px × hauteur 80px
// Aire = (160 × 80) / 2 = 6 400 px² = 1/4 ✓
```

**Triangle isocèle rectangle 1/8 :**

```javascript
// Deux côtés perpendiculaires : 80px × 80px
// Aire = (80 × 80) / 2 = 3 200 px² = 1/8 ✓
// Représentation : Carré divisé en 4, chaque petit carré coupé en diagonale
```

**Triangle rectangle mince 1/8 :**

```javascript
// Base 160px × hauteur 40px
// Aire = (160 × 40) / 2 = 3 200 px² = 1/8 ✓
// Représentation : Bandes minces le long des côtés
```

#### Configuration des fractionnements du carré (v0.4.3)

```javascript
export const SQUARE_SPLITTING_TYPES = {
    // 1/2 : 2 types possibles
    2: [
        {
            id: "vertical-rectangles",
            component: "SquareFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "diagonal-triangles",
            component: "SquareDiagonalFraction",
            props: {},
        },
    ],

    // 1/4 : 4 types possibles
    4: [
        {
            id: "vertical-rectangles",
            component: "SquareFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "corner-triangles",
            component: "SquareCornerTriangleFraction",
            props: {},
        },
        {
            id: "quarter-squares",
            component: "SquareQuarterSquareFraction",
            props: {},
        },
        {
            id: "cross-triangles",
            component: "SquareCrossFraction",
            props: {},
        },
    ],

    // 1/8 : 5 types (v0.4.3)
    8: [
        {
            id: "vertical-rectangles",
            component: "SquareFraction",
            props: { orientation: "vertical" },
        },
        // ❌ Supprimé v0.4.3 : "horizontal-rectangles" (redondant avec rotation)
        {
            id: "half-quarter-rectangles", // ✨ Nouveau v0.4.3
            component: "SquareHalfRectangle8thFraction",
            props: {},
        },
        {
            id: "isosceles-triangles",
            component: "SquareIsoscelesTriangleFraction",
            props: {},
        },
        {
            id: "thin-rectangle-triangles",
            component: "SquareRectangleThin8thFraction",
            props: {},
        },
    ],
};
```

\```

#### Configuration des fractionnements rectangle (v0.4.9)

```javascript
export const RECTANGLE_SPLITTING_TYPES = {
    // 1/2 : 4 types possibles (v0.4.9 : +1 forme en L)
    2: [
        {
            id: "vertical-rectangles",
            component: "RectangleFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "horizontal-rectangles",
            component: "RectangleFraction",
            props: { orientation: "horizontal" },
        },
        {
            id: "diagonal-triangles",
            component: "RectangleDiagonalFraction",
            props: {},
        },
        {
            id: "forme-en-l",
            component: "RectangleLShapeFraction",
            props: {},
        },
    ],

    // 1/4 : 5 types possibles (v0.4.7 : +1 type grille)
    4: [
        {
            id: "vertical-rectangles",
            component: "RectangleFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "horizontal-rectangles",
            component: "RectangleFraction",
            props: { orientation: "horizontal" },
        },
        {
            id: "quarter-median",
            component: "RectangleQuarterMedianFraction",
            props: {},
        },
        {
            id: "quarter-quadrant",
            component: "RectangleQuarterQuadrantFraction",
            props: {},
        },
        {
            id: "quarter-grid",
            component: "RectangleQuarterRectangleFraction",
            props: {},
        },
    ],

    // 1/8 : 2 types (inchangés)
    8: [
        {
            id: "vertical-rectangles",
            component: "RectangleFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "horizontal-rectangles",
            component: "RectangleFraction",
            props: { orientation: "horizontal" },
        },
    ],
};
```

#### Configuration automatique Mode Collectif (v0.4.6)

```javascript
// FigureSelector.jsx
useEffect(() => {
    if (!selectedSplittingType) return;

    const config = {
        figure: selectedFigure,
        figureName: FIGURE_NAMES[selectedFigure],
        denominator: selectedDenominator,
        splittingType: selectedSplittingType,
        // Variations visuelles par défaut
        figureRotation: 0,
        proportions:
            selectedFigure === "rectangle"
                ? { width: 1, height: 1.6 }
                : selectedFigure === "house"
                  ? { roofHeight: 0.5 }
                  : {},
        scale: 1,
        divisionOrientation: "vertical",
    };

    // Émission automatique (pas de bouton)
    onConfigChange(config);
}, [
    selectedFigure,
    selectedDenominator,
    selectedSplittingType,
    onConfigChange,
]);
```

#### Gestion des morceaux Mode Collectif (v0.4.6)

```javascript
// ManipulationZone.jsx
// État : démarre à 0 morceau
const [pieces, setPieces] = useState([]);

// Ajout
const handleAddPiece = () => {
    const newPiece = {
        id: `piece-${Date.now()}`,
        position: { x: 200, y: 200 },
        rotation: 0,
        isFlipped: false,
    };
    setPieces([...pieces, newPiece]);
};

// Retrait
const handleRemovePiece = () => {
    if (pieces.length > 0) {
        const removedPieceId = pieces[pieces.length - 1].id;
        setPieces(pieces.slice(0, -1));
        if (selectedPieceId === removedPieceId) {
            setSelectedPieceId(null);
        }
    }
};

// Tout retirer
const handleRemoveAll = () => {
    if (pieces.length > 0 && confirm("Retirer tous les morceaux ?")) {
        setPieces([]);
        setSelectedPieceId(null);
    }
};
```

#### Masquage informations enseignant (v0.4.6)

```javascript
// État local dans FigureSelector et ManipulationZone
const [showTeacherInfo, setShowTeacherInfo] = useState(false);

// Rendu conditionnel
<div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
            <span className="font-semibold">📋 Info enseignant</span>
            {showTeacherInfo && (
                <span>
                    {" "}
                    : Fraction 1/{denominator} ({fractionName})
                </span>
            )}
        </p>
        <button
            onClick={() => setShowTeacherInfo(!showTeacherInfo)}
            className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-gray-800 text-sm font-semibold rounded transition-colors"
        >
            {showTeacherInfo ? "👁️ Masquer" : "👁️‍🗨️ Afficher"}
        </button>
    </div>
</div>;
```

### Annexe D : Références des documents EDUSCOL

**Programme cycle 2 (2025)** :

- Fichier : `ensel135_annexe4.pdf`
- URL : https://www.education.gouv.fr/sites/default/files/ensel135_annexe4.pdf
- Section : Mathématiques - Nombres et calculs

**Programme cycle 3 (2025)** :

- Fichier : `ensel620_annexe2-v2.pdf`
- URL : https://www.education.gouv.fr/sites/default/files/ensel620_annexe2-v2.pdf
- Section : Mathématiques - Nombres et calculs

**Ressources fractions cycle 3** :

- Document : Fractions et nombres décimaux au cycle 3
- URL : https://eduscol.education.fr/document/16510/download
- Type : Guide pédagogique EDUSCOL

**React Documentation** :

- Controlled Components : https://react.dev/learn/sharing-state-between-components
- useState : https://react.dev/reference/react/useState

---

**Fin du document SRS v3.8 - COMPLET**

| Version | Date       | Auteur        | Modifications                                            |
| ------- | ---------- | ------------- | -------------------------------------------------------- |
| 3.8     | 29/01/2026 | CPC Numérique | Ajout fractionnement rectangle forme en L - Alpha v0.4.9 |
