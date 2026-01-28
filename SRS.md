# Spécification des Exigences Logicielles (SRS)

## Application Web d'Apprentissage des Fractions

**Version :** 3.0  
**Date :** 28 janvier 2026  
**Auteur :** Conseiller Pédagogique de Circonscription Numérique  
**Statut :** En développement - Alpha v0.4.0

---

## Historique des révisions

| Version | Date       | Auteur        | Modifications                                           |
| ------- | ---------- | ------------- | ------------------------------------------------------- |
| 1.0     | 27/01/2026 | CPC Numérique | Création initiale - État Alpha v0.1.0                   |
| 2.0     | 28/01/2026 | CPC Numérique | Correction configuration EDUSCOL + nouvelle progression |
| 3.0     | 28/01/2026 | CPC Numérique | Ajout Mode Collectif - État Alpha v0.4.0                |

---

## 1. Introduction

### 1.1 Objectif du document

Ce document spécifie les exigences fonctionnelles et non-fonctionnelles de l'application web d'apprentissage des fractions destinée aux élèves de cycle 2 et cycle 3 de l'école primaire française, ainsi qu'aux enseignants pour la démonstration collective.

**Note importante** : La version 3.0 ajoute le Mode Collectif permettant aux enseignants de manipuler des fractions devant la classe avec configuration libre.

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

### 1.5 Références

- **Programmes 2025** : BO du 31 octobre 2024
- **Ressources EDUSCOL** : Fractions et nombres décimaux au cycle 3 (document 16510)
- **Livrets d'accompagnement** : CE1, CE2 (documents 67770, 65186)

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

#### F6 - Manipulation des morceaux

- Déplacement (drag & drop)
- Rotation (adaptée à la forme)
- Retournement (flip) pour formes non-circulaires

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

#### Contraintes techniques

- Stack imposée : React 18, Vite, Tailwind CSS, pnpm
- Pas de TypeScript (choix explicite)
- Composants fonctionnels uniquement
- Pas de bibliothèque de manipulation (drag natif)

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

### 3.2 Mode Autonome (préexistant v0.1-0.3)

_Voir sections 3.3 à 3.5 du SRS v2.0 pour les détails complets_

#### EF-02 : Niveau par défaut

Le mode autonome démarre au niveau CE1 sans sélection visible.

#### EF-03 : Configuration des fractions par niveau

Les fractions présentées respectent strictement les programmes EDUSCOL 2025 (voir section détaillée SRS v2.0).

#### EF-04 : Activité 1 - Compléter pour faire la figure

L'élève manipule un morceau pour déterminer le nombre nécessaire.

#### EF-05 : Activité 2 - Observer les morceaux donnés

L'élève répond à 4 questions progressives.

#### EF-06 : Alternance des activités

Pour chaque combinaison (fraction, figure), générer 1 exercice d'activité 1 puis 1 d'activité 2.

#### EF-07 : Sauvegarde de la progression

Sauvegarde de l'index de l'exercice courant dans localStorage (`fractions-autonomous-index`).

---

### 3.3 Mode Collectif (nouveau v0.4.0)

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
| Fraction (dénominateur) | Dropdown | 2, 3, 4, 5, 6, 8, 10 (selon figure)             | Change si figure change       |
| Type de fractionnement  | Dropdown | Rectangles verticaux, Triangles diagonaux, etc. | Change si dénominateur change |
| Nombre de morceaux      | Input    | 1-10                                            | -                             |

**Bouton "Générer la démonstration"** :

- Désactivé si aucune sélection
- Génère la configuration
- Affiche la zone de manipulation

**Exemple de configuration** :

```javascript
{
  figure: "square",
  figureName: "carré",
  denominator: 4,
  fractionName: "quart",
  fractionPlural: "quarts",
  splittingType: { id: "quarter-squares", component: "SquareQuarterSquareFraction", props: {} },
  pieceCount: 3,
  figureRotation: 0,
  proportions: {},
  scale: 1,
  divisionOrientation: "vertical"
}
```

#### EF-10 : Zone de manipulation

**Priorité :** Haute

**Structure :**

- **Colonne gauche** : Figure de référence
    - Titre : "Figure complète"
    - Figure dans un cadre gris
    - Légende : "Fraction : 1/X (nom)"
- **Colonne droite** : Zone de travail
    - Titre : "Morceaux à manipuler"
    - Zone 600×500px fond ambré, bordure pointillée
    - N morceaux manipulables
    - Message si 0 morceau : "Cliquez sur 'Ajouter un morceau'..."

**Contrôles d'ajout/retrait :**

- Bouton vert ➕ "Ajouter un morceau"
- Bouton rouge ➖ "Retirer un morceau" (désactivé si 0)
- Badge compteur : "X morceau(x)" (fond gris)

**Comportements :**

- Ajout : nouveau morceau à position (200, 200)
- Retrait : suppression du dernier morceau
- Compteur mis à jour en temps réel

#### EF-11 : Manipulation des morceaux en mode collectif

**Priorité :** Haute

**Différences avec Mode Autonome :**

- Prop `collectiveMode={true}` passée au composant `Piece`
- **Contrôles permanents** : Pas de timer de désélection
- Boutons ↻ et ⇄ toujours visibles
- Feedback visuel identique (bordure bleue si sélectionné)

**Actions disponibles :**

- Déplacement : drag & drop
- Rotation : bouton ↻ (angle adapté)
- Retournement : bouton ⇄ (sauf disque)

#### EF-12 : Aide pédagogique

**Priorité :** Moyenne

**Affichage :**

- Encart bleu (bg-blue-50) sous la zone de manipulation
- Titre : "💡 Questions suggérées :"
- 4 questions avec calculs automatiques

**Questions :**

1. "Que représente un de ces morceaux pour la figure ?"
2. "Combien de morceaux a-t-on ? On a X [pluriel]"
3. "Combien de [pluriel] faut-il pour faire le [figure] complet ?"
4. "Combien de morceaux manque-t-il ? Il manque Y [pluriel]"

**Calculs automatiques :**

- X = nombre de morceaux actuels
- Y = dénominateur - nombre de morceaux actuels

**Exemple concret** :

```
Configuration : Carré, 1/4 (quarts), 3 morceaux

Questions affichées :
• Que représente un de ces morceaux pour la figure ?
• Combien de morceaux a-t-on ? On a 3 quarts
• Combien de quarts faut-il pour faire le carré complet ?
• Combien de morceaux manque-t-il ? Il manque 1 quart
```

#### EF-13 : Réinitialisation

**Priorité :** Basse

**Action :** Bouton "Réinitialiser" gris en haut à droite  
**Effet :** Confirmation puis retour à l'état initial (aucune configuration)

---

### 3.4 Configuration des fractions par niveau (Mode Autonome)

_Voir section détaillée SRS v2.0 - Pas de changement en v0.4.0_

**CE1** :

- Figures : Carré, Rectangle, Disque
- Dénominateurs : 2, 3, 4, 5 (selon figure)
- Total : 18 exercices

**CE2** :

- Figures : Carré, Rectangle, Disque
- Dénominateurs : 2, 3, 4, 5, 6, 8, 10 (selon figure)
- Total : 28 exercices

**CM1** :

- Figures : Carré, Rectangle, Disque, Maison
- Dénominateurs : 2, 3, 4, 5, 8, 10 (selon figure)
- Total : 26 exercices

---

## 4. Exigences non-fonctionnelles

### 4.1 Performance

**ENF-01 :** Temps de chargement initial < 3 secondes (connexion standard)  
**ENF-02 :** Transitions et animations fluides (60 fps)  
**ENF-03 :** Réactivité du drag < 16ms (1 frame)  
**ENF-04 :** Basculement entre modes < 200ms

### 4.2 Utilisabilité

**ENF-04 :** Interface adaptée aux jeunes lecteurs (taille police ≥ 16px)  
**ENF-05 :** Boutons tactiles ≥ 44×44 pixels  
**ENF-06 :** Feedback immédiat pour toute action utilisateur  
**ENF-07 :** Palette de couleurs non-agressive (tons pastels)  
**ENF-08 :** Mode Collectif : Interface adaptée à la projection (contrastes, tailles)

### 4.3 Accessibilité

**ENF-09 :** Contraste WCAG AA minimum (4.5:1)  
**ENF-10 :** Navigation clavier complète  
**ENF-11 :** Attributs ARIA sur les boutons  
**ENF-12 :** Support lecteurs d'écran (basique)

### 4.4 Fiabilité

**ENF-13 :** Pas de perte de données en cas de fermeture du navigateur  
**ENF-14 :** Gestion des erreurs localStorage (mode dégradé)  
**ENF-15 :** Génération déterministe des exercices (seed basé sur ID)  
**ENF-16 :** Isolation des sauvegardes par mode (pas d'écrasement)

### 4.5 Maintenabilité

**ENF-17 :** Code modulaire avec composants réutilisables  
**ENF-18 :** Séparation configuration / logique métier  
**ENF-19 :** Documentation inline (JSDoc light)  
**ENF-20 :** Nomenclature cohérente (français métier, anglais code)  
**ENF-21 :** Architecture extensible pour nouveaux modes

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

### 5.2 Structure des composants

```
src/
├── modes/                         # ✨ NOUVEAU v0.4.0
│   └── CollectiveMode/
│       ├── CollectiveMode.jsx
│       ├── FigureSelector.jsx
│       └── ManipulationZone.jsx
├── components/
│   ├── ModeSelector.jsx           # ✨ NOUVEAU v0.4.0
│   ├── activities/
│   │   ├── ActivityOne.jsx
│   │   └── ActivityTwo.jsx
│   ├── shapes/
│   │   ├── Piece.jsx              # MODIFIÉ v0.4.0 (collectiveMode)
│   │   ├── figures/
│   │   │   ├── Disk.jsx
│   │   │   ├── Square.jsx
│   │   │   ├── Rectangle.jsx
│   │   │   └── House.jsx
│   │   └── fractions/
│   │       ├── DiskFraction.jsx
│   │       ├── SquareFraction.jsx
│   │       ├── SquareDiagonalFraction.jsx
│   │       ├── SquareCornerTriangleFraction.jsx
│   │       ├── SquareQuarterSquareFraction.jsx
│   │       ├── SquareCrossFraction.jsx
│   │       ├── RectangleFraction.jsx
│   │       └── HouseFraction.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   ├── fractionConfig.js
│   └── fractionTypes.js
├── data/
│   └── progression.js
└── App.jsx                        # MODIFIÉ v0.4.0 (routage modes)
```

### 5.3 Flux de données

**Modèle :** Unidirectionnel (React standard)

**Mode Autonome :**

```
App (état global)
  ↓ props
ActivityOne / ActivityTwo
  ↓ props
Piece, Figure
  ↓ callbacks
App (mise à jour état)
```

**Mode Collectif :**

```
App (routage)
  ↓
CollectiveMode (état local)
  ↓ props
FigureSelector → onGenerate → ManipulationZone
  ↓ props
Piece (collectiveMode=true)
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

### 6.1 Structure d'un exercice (Mode Autonome)

_Inchangé depuis SRS v2.0 - Voir détails complets dans version précédente_

### 6.2 Configuration EDUSCOL (Mode Autonome)

_Inchangé depuis SRS v2.0 - Voir détails complets dans version précédente_

### 6.3 Configuration démonstration (Mode Collectif)

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

### 6.4 Données sauvegardées (localStorage)

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
- Padding confortable sur boutons

### 7.2 Composants d'interface

#### Sélecteur de mode (nouveau v0.4.0)

- 3 cartes horizontales côte à côte
- Carte active : fond bleu, texte blanc, ombre portée, scale 105%
- Carte inactive : fond gris, texte gris foncé, hover gris clair
- Carte désactivée : fond gris clair, texte gris, cursor not-allowed
- Icônes : 3xl (48px)
- Texte : Titre (lg, bold) + Description (sm)

#### Mode Autonome - En-tête

_Inchangé - Voir SRS v2.0_

#### Mode Collectif - Configuration

- Carte blanche, ombre portée
- Titre : "Configuration de la démonstration" (2xl, bold)
- Grille 4 colonnes (responsive : 1 col mobile, 2 tablette, 4 desktop)
- Champs : Label (sm, semibold) + Dropdown/Input (lg, border-2)
- Bouton génération : Bleu, pleine largeur, xl, bold, ombre

#### Mode Collectif - Zone de manipulation

- 2 colonnes : Figure référence (gauche) + Zone travail (droite)
- Figure : Cadre gris clair, padding généreux
- Zone travail : 600×500px, fond ambré, bordure pointillée ambrée
- Contrôles : 3 boutons centrés au-dessus de la zone
    - Vert (ajout) + Rouge (retrait) + Badge gris (compteur)

---

## 8. Règles métier

### 8.1 Génération des exercices (Mode Autonome)

_Inchangé depuis SRS v2.0_

**RM-01** : Pour chaque fraction disponible au niveau CE1, générer 2 exercices (activité 1 et 2) pour chaque figure compatible  
**RM-02** : Les variations visuelles sont générées aléatoirement  
**RM-03** : Les angles et positions aléatoires utilisent Math.random() uniquement lors de la génération  
**RM-04** : Pour l'activité 2, le nombre de morceaux donnés est : 1 ≤ n < dénominateur  
**RM-05** : L'ordre de génération suit : Fraction → Figure → Activité  
**RM-06** : L'ordre pédagogique des fractions est : 2, 4, 8, 3, 5, 10

### 8.2 Configuration démonstration (Mode Collectif)

**RM-07 (NOUVEAU)** : Les dénominateurs disponibles dépendent de la figure sélectionnée selon EDUSCOL  
**RM-08 (NOUVEAU)** : Les types de fractionnement disponibles dépendent du dénominateur sélectionné  
**RM-09 (NOUVEAU)** : Le nombre de morceaux est libre (1-10) sans contrainte pédagogique  
**RM-10 (NOUVEAU)** : La génération n'utilise pas de variations aléatoires (rotation 0°, scale 1, etc.)  
**RM-11 (NOUVEAU)** : Chaque ajout de morceau positionne le nouveau à (200, 200)

### 8.3 Manipulation

**RM-12** : Le bouton flip n'est pas affiché pour les disques (symétrie radiale)  
**RM-13** : Le drag & drop fonctionne à la fois avec souris et tactile (PointerEvents)  
**RM-14 (NOUVEAU)** : En mode collectif, les contrôles sont toujours visibles (collectiveMode=true)  
**RM-15 (NOUVEAU)** : En mode autonome, les contrôles disparaissent après 3s d'inactivité

### 8.4 Validation (Mode Autonome uniquement)

**RM-16** : Pour l'activité 1, la validation est simultanée sur les deux champs  
**RM-17** : Pour l'activité 2, les validations sont séquentielles  
**RM-18** : Une réponse correcte déclenche un délai avant passage automatique  
**RM-19** : Une réponse incorrecte permet une nouvelle tentative immédiate

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

### CU-02 : Configurer une démonstration (Mode Collectif)

**Acteur principal :** Enseignant  
**Préconditions :** Mode Collectif sélectionné  
**Postconditions :** Démonstration générée

**Scénario nominal :**

1. L'enseignant sélectionne une figure (ex: Carré)
2. Le système met à jour les dénominateurs disponibles
3. L'enseignant sélectionne un dénominateur (ex: 1/4)
4. Le système met à jour les types de fractionnement
5. L'enseignant sélectionne un type (ex: Petits carrés)
6. L'enseignant saisit le nombre de morceaux (ex: 3)
7. L'enseignant clique sur "Générer la démonstration"
8. Le système affiche la zone de manipulation avec 3 morceaux

**Scénarios alternatifs :**

- 7a. Type de fractionnement non sélectionné → Alert "Veuillez sélectionner..."

---

### CU-03 : Manipuler en démonstration (Mode Collectif)

**Acteur principal :** Enseignant  
**Préconditions :** Démonstration générée  
**Postconditions :** État de la manipulation mis à jour

**Scénario nominal :**

1. L'enseignant déplace un morceau par drag & drop
2. Le système met à jour la position
3. L'enseignant clique sur le bouton rotation
4. Le système pivote le morceau de l'angle adapté
5. L'enseignant pose les questions suggérées aux élèves
6. Les élèves répondent oralement

**Scénarios alternatifs :**

- 3a. L'enseignant clique sur "Ajouter un morceau" → Nouveau morceau apparaît
- 3b. L'enseignant clique sur "Retirer un morceau" → Dernier morceau disparaît

---

### CU-04 : Démarrer un parcours autonome

_Voir CU-01 du SRS v2.0 - Inchangé_

---

### CU-05 : Compléter un exercice de type 1

_Voir CU-02 du SRS v2.0 - Inchangé_

---

## 10. Contraintes et limitations

### 10.1 Limitations de la version 0.4.0

**L10-01 :** Pas de clippage automatique en mode collectif  
**L10-02 :** Pas de mode plein écran pour projection optimale  
**L10-03 :** Mode Guidé non implémenté  
**L10-04 :** Pas d'interface enseignant pour personnaliser le mode autonome  
**L10-05 :** Pas de suivi détaillé des erreurs par élève  
**L10-06 :** Pas d'export des résultats  
**L10-07 :** Pas de support multi-utilisateurs  
**L10-08 :** Pas de mode hors-ligne progressif (PWA)  
**L10-09 :** Activité 2 limitée aux fractions < 1 (même en CM1)

### 10.2 Contraintes techniques

**C10-01 :** Nécessite un navigateur moderne (ES2022+)  
**C10-02 :** Données limitées à 5-10 MB (localStorage)  
**C10-03 :** Pas de synchronisation multi-appareils  
**C10-04 :** Dépendance à Google Fonts (si réseau coupé après chargement initial)

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

### 11.2 Priorité moyenne

**EV-M1 :** Fractionnements avancés

- Triangles isocèles depuis le centre (1/4)
- Fractionnements pour 1/8
- Rectangle avec diagonales

**EV-M2 :** Activité 2 avec fractions > 1 (CM1)  
**EV-M3 :** Feedback sonore optionnel  
**EV-M4 :** Export des résultats (PDF, CSV)  
**EV-M5 :** Mode hors-ligne complet (PWA)

### 11.3 Priorité basse

**EV-B1 :** Multi-utilisateurs avec base de données  
**EV-B2 :** Gamification (badges, scores)  
**EV-B3 :** Adaptation de la difficulté (IA légère)  
**EV-B4 :** Internationalisation (autres langues)

---

## 12. Critères d'acceptation globaux

### Phase Alpha (v0.4.0)

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
⬜ **CA-A14 :** Tests sur les 4 navigateurs cibles  
⬜ **CA-A15 :** Accessibilité WCAG AA validée

### Phase Beta (v0.5.0+)

⬜ **CA-B1 :** Tests utilisateurs enseignants avec Mode Collectif  
⬜ **CA-B2 :** Tests utilisateurs avec 3 classes (CE1, CE2, CM1) en Mode Autonome  
⬜ **CA-B3 :** Corrections des bugs remontés  
⬜ **CA-B4 :** Optimisations de performance si nécessaire  
⬜ **CA-B5 :** Documentation utilisateur (guide enseignant)  
⬜ **CA-B6 :** Implémentation du clippage automatique (Mode Collectif)

### Phase Release

⬜ **CA-R1 :** Déploiement sur serveur académique ou public  
⬜ **CA-R2 :** Formation des enseignants pilotes  
⬜ **CA-R3 :** Monitoring des usages pendant 1 mois  
⬜ **CA-R4 :** Collecte de retours pour v2.0

---

## 13. Annexes

### Annexe A : Correspondance fractions/noms

_Inchangé depuis SRS v2.0_

### Annexe B : Mapping figures/fractions par niveau

_Inchangé depuis SRS v2.0_

### Annexe C : Algorithmes clés

#### Ordre de génération (Mode Autonome)

_Inchangé depuis SRS v2.0_

#### Configuration dynamique (Mode Collectif)

```javascript
// Exemple de mapping dynamique
const SPLITTING_CONFIG = {
    square: {
        2: [
            { id: "vertical-rectangles", component: "SquareFraction" },
            { id: "diagonal-triangles", component: "SquareDiagonalFraction" },
        ],
        4: [
            { id: "vertical-rectangles", component: "SquareFraction" },
            {
                id: "corner-triangles",
                component: "SquareCornerTriangleFraction",
            },
            { id: "quarter-squares", component: "SquareQuarterSquareFraction" },
            { id: "cross-triangles", component: "SquareCrossFraction" },
        ],
    },
    // ...
};

// Sélection figure → Dénominateurs disponibles
const availableDenominators = Object.keys(SPLITTING_CONFIG[selectedFigure]);

// Sélection dénominateur → Types disponibles
const availableSplittingTypes =
    SPLITTING_CONFIG[selectedFigure][selectedDenominator];
```

### Annexe D : Références des documents EDUSCOL

_Inchangé depuis SRS v2.0_

---

| Version | Date       | Auteur        | Modifications                                                                |
| ------- | ---------- | ------------- | ---------------------------------------------------------------------------- |
| 1.0     | 27/01/2026 | CPC Numérique | Création initiale - État Alpha v0.1.0                                        |
| 2.0     | 28/01/2026 | CPC Numérique | Correction majeure configuration EDUSCOL + nouvelle progression pédagogique  |
| 3.0     | 28/01/2026 | CPC Numérique | Ajout Mode Collectif - Outil de démonstration enseignant - État Alpha v0.4.0 |

---

**Fin du document SRS v3.0**
