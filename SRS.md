# Spécification des Exigences Logicielles (SRS)

## Application Web d'Apprentissage des Fractions

**Version :** 2.0  
**Date :** 28 janvier 2026  
**Auteur :** Conseiller Pédagogique de Circonscription Numérique  
**Statut :** En développement - Alpha v0.2.0

---

## Historique des révisions

| Version | Date       | Auteur        | Modifications                                           |
| ------- | ---------- | ------------- | ------------------------------------------------------- |
| 1.0     | 27/01/2026 | CPC Numérique | Création initiale - État Alpha v0.1.0                   |
| 2.0     | 28/01/2026 | CPC Numérique | Correction configuration EDUSCOL + nouvelle progression |

---

## 1. Introduction

### 1.1 Objectif du document

Ce document spécifie les exigences fonctionnelles et non-fonctionnelles de l'application web d'apprentissage des fractions destinée aux élèves de cycle 2 et cycle 3 de l'école primaire française.

**Note importante** : La version 1.0 de ce document contenait une erreur majeure dans la configuration des fractions par niveau, ne respectant pas les programmes EDUSCOL 2025. Cette version 2.0 corrige cette erreur suite à la consultation du document officiel `ensel135_annexe4.pdf`.

### 1.2 Contexte du projet

L'application s'inscrit dans le cadre des programmes de mathématiques 2025 de l'Éducation Nationale française. Elle vise à faciliter la compréhension des fractions par la manipulation, la verbalisation et les représentations variées, conformément aux recommandations EDUSCOL.

### 1.3 Portée

**Nom du produit :** Parcours Fractions  
**Public cible :** Élèves de CE1, CE2, CM1  
**Domaine d'application :** Enseignement des mathématiques - Fractions  
**Type :** Application web éducative monopage (SPA)

### 1.4 Définitions et acronymes

- **EDUSCOL** : Site institutionnel du ministère de l'Éducation nationale proposant des ressources pédagogiques
- **SPA** : Single Page Application
- **Fraction unitaire** : Fraction avec numérateur égal à 1 (ex: 1/2, 1/4)
- **Présentation prototypique** : Présentation stéréotypée d'une figure (ex: disque divisé à partir du haut)
- **Présentation non-prototypique** : Présentation variée évitant les stéréotypes

### 1.5 Références

- **Programmes 2025** : BO du 31 octobre 2024
- **Ressources EDUSCOL** : Fractions et nombres décimaux au cycle 3 (document 16510)
- **Livrets d'accompagnement** : CE1, CE2 (documents 67770, 65186)

---

## 2. Description générale

### 2.1 Perspective du produit

Application web autonome ne nécessitant aucune connexion serveur après le chargement initial. Fonctionne entièrement côté client avec sauvegarde locale de la progression.

### 2.2 Fonctionnalités principales

#### F1 - Sélection du niveau

L'utilisateur peut choisir parmi trois niveaux : CE1, CE2, CM1.

#### F2 - Activité 1 : Compléter pour faire la figure

L'élève manipule un morceau de fraction pour déterminer combien il en faut pour reconstituer la figure complète.

#### F3 - Activité 2 : Observer les morceaux donnés

L'élève répond à une série de questions progressives sur des morceaux de fraction déjà présents.

#### F4 - Manipulation des morceaux

- Déplacement (drag & drop)
- Rotation (adaptée à la forme)
- Retournement (flip) pour formes non-circulaires

#### F5 - Progression et suivi

- Barre de progression visuelle
- Sauvegarde automatique dans le navigateur
- Possibilité de recommencer

### 2.3 Classes et caractéristiques des utilisateurs

| Classe     | Âge      | Compétences      | Besoins spécifiques                 |
| ---------- | -------- | ---------------- | ----------------------------------- |
| Élève CE1  | 7-8 ans  | Lecture en cours | Interface très simple, guidage fort |
| Élève CE2  | 8-9 ans  | Lecture acquise  | Autonomie progressive               |
| Élève CM1  | 9-10 ans | Autonome         | Défis plus complexes                |
| Enseignant | Adulte   | Expert métier    | Pas d'interface dédiée (v1.0)       |

### 2.4 Environnement d'exploitation

- **Navigateurs supportés** : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Appareils** : Ordinateurs de bureau, tablettes (≥10 pouces recommandé)
- **Résolution minimale** : 1024×768 pixels
- **Connexion** : Requise uniquement pour le chargement initial

### 2.5 Contraintes de conception et d'implémentation

#### Contraintes pédagogiques

- Conformité stricte aux programmes EDUSCOL 2025
- Présentation non-prototypique obligatoire
- Respect de la progressivité des apprentissages

#### Contraintes techniques

- Stack imposée : React 18, Vite, Tailwind CSS, pnpm
- Pas de TypeScript (choix explicite)
- Composants fonctionnels uniquement
- Pas de bibliothèque de manipulation (drag natif)

---

## 3. Exigences fonctionnelles détaillées

### 3.1 Gestion des niveaux

#### EF-01 : Niveau par défaut

**Priorité :** Haute  
**Description :** L'application démarre directement au niveau CE1 sans sélection visible de l'utilisateur.

**Critères d'acceptation :**

- Aucun bouton de sélection de niveau n'est affiché dans l'interface
- Le niveau CE1 est utilisé par défaut
- La progression générée correspond au niveau CE1
- Le niveau n'est pas sauvegardé dans localStorage (suppression de `fractions-level`)

**Dépendances :** Aucune

**Rationale** :

- Simplification de l'interface (réduction de la charge cognitive)
- Évite la stigmatisation par le niveau scolaire
- Possibilité future d'adaptation automatique de la difficulté

---

### 3.2 Configuration des fractions par niveau

#### EF-02 : Fractions disponibles selon le niveau

**Priorité :** Haute  
**Description :** Les fractions présentées doivent respecter strictement les programmes EDUSCOL 2025.

**Source officielle** : Programme cycle 2, BO du 31 octobre 2024 (`ensel135_annexe4.pdf`)

**Citation textuelle** :

> "Les fractions rencontrées au CE1 ont un dénominateur égal à 2, 3, 4, 5, 6, 8 ou 10."
> "L'élève sait partager une bande de papier en un nombre donné de parts égales, en s'appuyant éventuellement sur un quadrillage. L'élève sait repérer une partie correspondant à une fraction comme 1/2, 1/3 ou 1/6."

**Règles métier :**

**CE1 :**

- **Figures** : Carré, Rectangle, Disque
- **Ordre de présentation** : Carré → Rectangle → Disque
- **Dénominateurs par figure** :
    - **Carré** : 2, 4
    - **Rectangle** : 2, 3, 4, 5
    - **Disque** : 2, 3, 4
- **Maximum dénominateur** : 5
- **Fractions > 1** : Non (toutes ≤ 1)

**Rationale ordre des figures** :

1. **Carré** : Symétrique, division simple, ancrage concret (serviette, gaufre)
2. **Rectangle** : Asymétrique, plus de possibilités, familier (tablette de chocolat)
3. **Disque** : Division angulaire (rotation), plus abstrait, mais ancrage émotionnel fort (pizza, gâteau)

**CE2 :**

- **Figures** : Carré, Rectangle, Disque
- **Ordre** : Carré → Rectangle → Disque
- **Dénominateurs par figure** :
    - **Carré** : 2, 4, 8
    - **Rectangle** : 2, 3, 4, 5, 6, 8, 10
    - **Disque** : 2, 3, 4, 8
- **Maximum dénominateur** : 10
- **Fractions > 1** : Non (toutes ≤ 1)

**CM1 :**

- **Figures** : Carré, Rectangle, Disque, Maison
- **Ordre** : Carré → Rectangle → Disque → Maison
- **Dénominateurs par figure** :
    - **Carré** : 2, 4, 8
    - **Rectangle** : 2, 3, 4, 8
    - **Disque** : 2, 3, 4, 8
    - **Maison** : 5, 10
- **Maximum dénominateur** : 10
- **Fractions > 1** : Oui (activité 2 uniquement - prévu pour v0.3.0)

**Source** : Document EDUSCOL `ensel135_annexe4.pdf`, consultation directe du 28/01/2026

**Correction par rapport à SRS v1.0** :

| Niveau | V1.0 (Erroné)               | V2.0 (Conforme EDUSCOL 2025)                        |
| ------ | --------------------------- | --------------------------------------------------- |
| CE1    | Disque uniquement (2, 4, 8) | Carré (2, 4) + Rectangle (2,3,4,5) + Disque (2,3,4) |
| CE2    | Disque, Carré, Rectangle    | ✓ Ordre modifié + ajout dénominateurs               |
| CM1    | Idem CE2 + Maison           | ✓ Ajustements dénominateurs                         |

---

### 3.3 Activité 1 - Compléter pour faire la figure

#### EF-03 : Affichage de l'exercice

**Priorité :** Haute

**Éléments affichés :**

1. Figure complète (référence)
2. Un morceau de fraction manipulable
3. Zone de réponse avec phrase à compléter

**Variations non-prototypiques :**

- Figure : rotation aléatoire (0°, 90°, 180°, 270°)
- Figure : proportions aléatoires (rectangles, toits de maison)
- Figure : échelle aléatoire (0.8 à 1.2)
- Morceau : position de départ aléatoire dans la figure
    - Disque : angle de départ aléatoire (0-360°)
    - Autres : index de bande aléatoire (0 à n-1)
- Morceau : rotation initiale aléatoire
- Morceau : orientation de division aléatoire (horizontal/vertical)

#### EF-04 : Manipulation du morceau

**Priorité :** Haute

**Actions disponibles :**

- **Déplacement** : drag & drop avec souris ou tactile
- **Rotation** : bouton avec angle adapté
    - Disque : rotation de 360°/n (ex: 90° pour quart)
    - Autres formes : rotation de 90°
- **Retournement** : bouton flip (sauf disque)

**Comportements :**

- Feedback visuel pendant le drag (z-index supérieur)
- Transitions fluides
- Support tactile et souris

#### EF-05 : Saisie et validation de la réponse

**Priorité :** Haute

**Phrase à compléter :**

> Il faut [INPUT] morceau(x) pour faire le [FIGURE].  
> C'est donc un [SELECT] du [FIGURE].

**Validations :**

- Input nombre : 1-20
- Select : demi, tiers, quart, cinquième, huitième, dixième
- Bouton "Valider" désactivé si incomplet

**Feedback :**

- Correct : message vert "✓ Bravo !" + passage automatique (1.5s)
- Incorrect : message rouge "✗ Réessaie encore"

---

### 3.4 Activité 2 - Observer les morceaux donnés

#### EF-06 : Présentation de l'exercice

**Priorité :** Haute

**Éléments affichés :**

1. Figure complète (référence)
2. n morceaux identiques présentés séparément (n < dénominateur)
3. Série de 4 questions progressives

**Variations :** Identiques à l'activité 1

#### EF-07 : Questions progressives

**Priorité :** Haute

**Question 1 :** "Que représente un de ces morceaux ?"

- Type : menu déroulant
- Réponse attendue : nom de la fraction

**Question 2 :** "Combien de morceaux a-t-on ?"

- Type : input numérique
- Format : "On a [INPUT] [pluriel]"

**Question 3 :** "Combien de [pluriel] faut-il pour faire la figure ?"

- Type : input numérique
- Format : "Il faut [INPUT] [pluriel]"

**Question 4 :** "Combien de morceaux manque-t-il ?"

- Type : input numérique
- Format : "Il manque [INPUT] [pluriel]"

**Comportement :**

- Les questions apparaissent séquentiellement
- Une question validée devient grisée et non-modifiable
- Affichage de la réponse validée avec ✓

---

### 3.5 Progression et navigation

#### EF-08 : Alternance des activités

**Priorité :** Haute

**Règle :** Pour chaque combinaison (fraction, figure), générer :

1. Un exercice d'activité 1
2. Un exercice d'activité 2

**Ordre de génération** :

```
Pour chaque fraction (1/2, 1/4, 1/8, 1/3, 1/5, 1/10) :
    Pour chaque figure (carré, rectangle, disque, maison) :
        Si cette fraction existe pour cette figure :
            Créer exercice activité 1
            Créer exercice activité 2
```

**Exemple de séquence CE1** :

| #   | Fraction | Figure    | Activité |
| --- | -------- | --------- | -------- |
| 1   | 1/2      | Carré     | 1        |
| 2   | 1/2      | Carré     | 2        |
| 3   | 1/2      | Rectangle | 1        |
| 4   | 1/2      | Rectangle | 2        |
| 5   | 1/2      | Disque    | 1        |
| 6   | 1/2      | Disque    | 2        |
| 7   | 1/4      | Carré     | 1        |
| 8   | 1/4      | Carré     | 2        |
| 9   | 1/4      | Rectangle | 1        |
| 10  | 1/4      | Rectangle | 2        |
| 11  | 1/4      | Disque    | 1        |
| 12  | 1/4      | Disque    | 2        |
| 13  | 1/3      | Rectangle | 1        |
| 14  | 1/3      | Rectangle | 2        |
| 15  | 1/3      | Disque    | 1        |
| 16  | 1/3      | Disque    | 2        |
| 17  | 1/5      | Rectangle | 1        |
| 18  | 1/5      | Rectangle | 2        |

**Total CE1** : 18 exercices

**Rationale pédagogique** :

- **Transfert immédiat** : Le concept de "un demi" est renforcé sur 3 figures consécutives
- **Variété cognitive** : Maintien de l'attention par changement de figure tous les 2 exercices
- **Généralisation** : Évite l'association stéréotypée "fraction = une seule forme"
- **Conforme EDUSCOL** : Principe de "présentation non-prototypique"

**Changement par rapport à v1.0** :

- Ancienne logique : Figure → Fraction → Activité (monotonie, transfert retardé)
- Nouvelle logique : Fraction → Figure → Activité (transfert immédiat)

#### EF-09 : Barre de progression

**Priorité :** Moyenne

**Affichage :**

- Numéro de l'exercice courant / total
- Numéro de l'activité (1 ou 2)
- Pourcentage de complétion
- Barre visuelle animée

**Note** : Le niveau (CE1/CE2/CM1) n'est plus affiché

#### EF-10 : Sauvegarde de la progression

**Priorité :** Moyenne

**Données sauvegardées :**

- Index de l'exercice courant : `fractions-index`

**Données supprimées (v0.2.0)** :

- ~~Niveau sélectionné : `fractions-level`~~ (niveau fixe CE1)

**Mécanisme :** localStorage du navigateur

#### EF-11 : Recommencer

**Priorité :** Basse

**Action :** Bouton "Recommencer" avec confirmation  
**Effet :** Retour à l'exercice 0 du niveau CE1

## 4. Exigences non-fonctionnelles

### 4.1 Performance

**ENF-01 :** Temps de chargement initial < 3 secondes (connexion standard)  
**ENF-02 :** Transitions et animations fluides (60 fps)  
**ENF-03 :** Réactivité du drag < 16ms (1 frame)

### 4.2 Utilisabilité

**ENF-04 :** Interface adaptée aux jeunes lecteurs (taille police ≥ 16px)  
**ENF-05 :** Boutons tactiles ≥ 44×44 pixels  
**ENF-06 :** Feedback immédiat pour toute action utilisateur  
**ENF-07 :** Palette de couleurs non-agressive (tons pastels)

### 4.3 Accessibilité

**ENF-08 :** Contraste WCAG AA minimum (4.5:1)  
**ENF-09 :** Navigation clavier complète  
**ENF-10 :** Attributs ARIA sur les boutons  
**ENF-11 :** Support lecteurs d'écran (basique)

### 4.4 Fiabilité

**ENF-12 :** Pas de perte de données en cas de fermeture du navigateur  
**ENF-13 :** Gestion des erreurs localStorage (mode dégradé)  
**ENF-14 :** Génération déterministe des exercices (seed basé sur ID)

### 4.5 Maintenabilité

**ENF-15 :** Code modulaire avec composants réutilisables  
**ENF-16 :** Séparation configuration / logique métier  
**ENF-17 :** Documentation inline (JSDoc light)  
**ENF-18 :** Nomenclature cohérente (français métier, anglais code)

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
├── components/
│   ├── activities/
│   │   ├── ActivityOne.jsx
│   │   └── ActivityTwo.jsx
│   ├── shapes/
│   │   ├── Piece.jsx
│   │   ├── figures/
│   │   │   ├── Disk.jsx
│   │   │   ├── Square.jsx
│   │   │   ├── Rectangle.jsx
│   │   │   └── House.jsx
│   │   └── fractions/
│   │       ├── DiskFraction.jsx
│   │       ├── SquareFraction.jsx
│   │       ├── RectangleFraction.jsx
│   │       └── HouseFraction.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   └── fractionConfig.js     # Configuration EDUSCOL (CORRIGÉE v2.0)
├── data/
│   └── progression.js         # Générateur (MODIFIÉ v2.0)
└── App.jsx                    # (MODIFIÉ v2.0 - pas de sélecteur niveau)
```

### 5.3 Flux de données

**Modèle :** Unidirectionnel (React standard)

```
App (état global)
  ↓ props
ActivityOne / ActivityTwo
  ↓ props
Piece, Figure
  ↓ callbacks
App (mise à jour état)
```

**État global (App.jsx) :**

- `level` : niveau actuel (CE1/CE2/CM1)
- `exercises` : tableau d'exercices générés
- `currentIndex` : position dans la progression

**Persistance :** Hook `useLocalStorage` synchronise avec localStorage

---

## 6. Modèle de données

### 6.1 Structure d'un exercice

```javascript
{
  id: string,                    // Identifiant unique
  figure: 'disk'|'square'|'rectangle'|'house',
  fraction: {
    denominator: number,         // 2, 3, 4, 5, 8, 10...
    name: string,                // 'demi', 'tiers'...
    plural: string               // 'demis', 'tiers'...
  },
  activity: 1|2,                 // Numéro d'activité

  // Variations visuelles
  figureRotation: number,        // 0, 90, 180, 270
  proportions: object,           // {width, height} ou {roofHeight}
  scale: number,                 // 0.8 à 1.2
  divisionOrientation: 'horizontal'|'vertical',

  // Activité 1
  startAngle: number,            // Disque: 0-360°, Autres: 0
  pieceIndex: number,            // Bande à afficher (non-disque)
  pieceRotation: number,         // Rotation initiale du morceau

  // Activité 2
  givenPieces: number,           // Nombre de morceaux donnés
  piecesData: [                  // Configuration de chaque morceau
    {
      startAngle: number,
      index: number,
      position: {x, y},
      rotation: number
    }
  ]
}
```

### 6.2 Configuration EDUSCOL

```javascript
PROGRESSION_EDUSCOL = {
  [niveau]: {
    figures: string[],          // ["square", "rectangle", "disk"] (CE1)
    fractions: {
      [figure]: [
        {
          denominator: number,
          name: string,
          plural: string
        }
      ]
    }
  }
}
```

**Exemple concret (CE1)** :

```javascript
PROGRESSION_EDUSCOL = {
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
};
```

### 6.3 Données sauvegardées (localStorage)

```javascript
{
  'fractions-index': number  // Index de l'exercice courant
  // 'fractions-level' SUPPRIMÉ en v0.2.0
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

#### En-tête

- **Titre** : "Les Fractions" (text-4xl)
- **~~Sélecteur de niveau~~** : SUPPRIMÉ en v0.2.0
- **Barre de progression** : Fond gris, remplissage bleu animé
    - Affichage : "Exercice X / Y" | "Activité N" | "Z%"
    - Bouton "Recommencer"

**Changement v0.2.0** : Interface épurée sans sélection de niveau

#### Zone d'activité

- Carte blanche avec ombre et bordures arrondies
- Deux colonnes : figure de référence | zone de travail

#### Contrôles de manipulation

- Boutons arrondis (rounded-lg)
- Ombre portée (shadow-lg)
- Effet de pression (active:scale-95)

#### Zone de réponse

- Carte blanche séparée
- Inputs avec bordure épaisse (border-2)
- Focus : bordure bleue

---

## 8. Règles métier

### 8.1 Génération des exercices

**RM-01** : Pour chaque fraction disponible au niveau CE1, générer 2 exercices (activité 1 et 2) pour chaque figure compatible

**RM-02** : Les variations visuelles sont générées aléatoirement à chaque nouvelle génération de progression

**RM-03** : Les angles et positions aléatoires utilisent Math.random() uniquement lors de la génération de la progression (pas en render)

**RM-04** : Pour l'activité 2, le nombre de morceaux donnés est : 1 ≤ n < dénominateur

**RM-05 (NOUVEAU)** : L'ordre de génération suit : Fraction (ordre pédagogique) → Figure (carré → rectangle → disque) → Activité (1 puis 2)

**RM-06 (NOUVEAU)** : L'ordre pédagogique des fractions est : 2, 4, 8, 3, 5, 10 (puissances de 2 puis autres)

### 8.2 Manipulation

**RM-07 :** Le bouton flip n'est pas affiché pour les disques (symétrie radiale)

**RM-08 :** Le drag & drop fonctionne à la fois avec souris et tactile (PointerEvents)

### 8.3 Validation

**RM-09 :** Pour l'activité 1, la validation est simultanée sur les deux champs (nombre ET nom de fraction)

**RM-10 :** Pour l'activité 2, les validations sont séquentielles (question par question)

**RM-11 :** Une réponse correcte déclenche un délai de 1s (activité 1) ou 1.5s (activité 2) avant passage automatique

**RM-12 :** Une réponse incorrecte permet une nouvelle tentative immédiate

---

## 9. Cas d'utilisation

### CU-01 : Démarrer un parcours

**Acteur principal :** Élève  
**Préconditions :** Application chargée  
**Postconditions :** Progression initialisée au niveau CE1

**Scénario nominal :**

1. L'application démarre directement au niveau CE1 (pas de sélection)
2. Le système génère la liste des 18 exercices (CE1)
3. Le système affiche le premier exercice (Carré 1/2 Activité 1)
4. La progression est sauvegardée dans localStorage (`fractions-index`)

**Scénarios alternatifs :**

- 1a. Une progression existe déjà → Le système reprend où l'élève s'était arrêté

**Changement v0.2.0** : Plus de sélection de niveau

---

### CU-02 : Compléter un exercice de type 1

**Acteur principal :** Élève  
**Préconditions :** Exercice activité 1 affiché

**Scénario nominal :**

1. L'élève observe la figure complète et le morceau
2. L'élève manipule le morceau (déplace, pivote, retourne)
3. L'élève détermine le nombre de morceaux nécessaires
4. L'élève saisit sa réponse dans les deux champs
5. L'élève clique sur "Valider"
6. Le système affiche "Bravo !" et passe automatiquement à l'exercice suivant après 1.5s

**Scénarios alternatifs :**

- 6a. Réponse incorrecte → Le système affiche "Réessaie encore" et permet une nouvelle tentative

---

### CU-03 : Recommencer le parcours

**Acteur principal :** Élève ou enseignant  
**Préconditions :** Au moins un exercice complété

**Scénario nominal :**

1. L'utilisateur clique sur "Recommencer"
2. Le système affiche une demande de confirmation
3. L'utilisateur confirme
4. Le système revient au premier exercice du niveau actuel
5. La progression est réinitialisée

---

## 10. Contraintes et limitations

### 10.1 Limitations de la version 1.0

**L10-01 :** Pas de sélection de niveau (fixe CE1)  
**L10-02 :** Pas d'interface enseignant pour personnaliser les exercices  
**L10-03 :** Pas de suivi détaillé des erreurs par élève  
**L10-04 :** Pas d'export des résultats  
**L10-05 :** Pas de support multi-utilisateurs  
**L10-06 :** Pas de mode hors-ligne progressif (PWA)  
**L10-07 :** Activité 2 limitée aux fractions < 1 (même en CM1)  
**L10-08 :** Rectangle = bande simple (pas de fractionnements complexes)

### 10.2 Contraintes techniques

**C10-01 :** Nécessite un navigateur moderne (ES2022+)  
**C10-02 :** Données limitées à 5-10 MB (localStorage)  
**C10-03 :** Pas de synchronisation multi-appareils  
**C10-04 :** Dépendance à Google Fonts (si réseau coupé après chargement initial)

---

## 11. Évolutions futures

### 11.1 Priorité haute

**EV-H1 :** Adaptation automatique du niveau selon la progression de l'élève

- Démarrage CE1 pour tous
- Montée en niveau automatique (CE2, CM1) selon taux de réussite
- Algorithme de détection du niveau optimal

**EV-H2 :** Composant `Band` distinct du rectangle

- Bande prototypique (étroite, horizontale/verticale)
- Rectangle non-prototypique (inclinaisons, diagonales)

**EV-H3 :** Activité 2 avec fractions > 1 (CM1)

- "On a plus d'une figure ! Combien de morceaux en plus ?"
- "L'ensemble fait une figure + x nèmes"

**EV-H4 :** Mode enseignant

- Sélection manuelle du niveau
- Sélection manuelle des exercices
- Paramétrage des variations
- Consultation des résultats

### 11.2 Priorité moyenne

**EV-M1 :** Fractionnements avancés

- Carré avec diagonales (triangles)
- Rectangle avec formes en L

**EV-M2 :** Export des résultats (PDF, CSV)  
**EV-M3 :** Mode hors-ligne complet (PWA)  
**EV-M4 :** Feedback sonore optionnel
**EV-M5 :** Export des résultats (PDF, CSV)  
**EV-M6 :** Mode hors-ligne complet (PWA)  
**EV-M7 :** Activités complémentaires :

- Comparaison de fractions
- Fractions sur droite graduée
- Calculs simples (addition de fractions même dénominateur)

**EV-M8 :** Personnalisation visuelle

- Choix des couleurs
- Mode sombre

### 11.3 Priorité basse

**EV-B1 :** Multi-utilisateurs avec base de données  
**EV-B2 :** Gamification (badges, scores)  
**EV-B3 :** Adaptation de la difficulté (IA légère)  
**EV-B4 :** Internationalisation (autres langues)

---

## 12. Critères d'acceptation globaux

### Phase Alpha (v0.2.0)

✅ **CA-A1 :** Le niveau CE1 fonctionne correctement  
✅ **CA-A2 :** Les deux types d'activités fonctionnent  
✅ **CA-A3 :** Les fractions respectent la configuration EDUSCOL 2025 (corrigée)  
✅ **CA-A4 :** Les figures sont présentées de manière non-prototypique  
✅ **CA-A5 :** La manipulation fonctionne sur desktop et tablette  
✅ **CA-A6 :** La progression est sauvegardée et restaurée  
✅ **CA-A7 :** La progression suit l'ordre Fraction → Figure → Activité  
✅ **CA-A8 :** L'ordre des figures est Carré → Rectangle → Disque  
⬜ **CA-A9 :** Tests sur les 4 navigateurs cibles  
⬜ **CA-A10 :** Accessibilité WCAG AA validée

### Phase Beta (v0.3.0+)

⬜ **CA-B1 :** Tests utilisateurs avec 3 classes (CE1, CE2, CM1)  
⬜ **CA-B2 :** Corrections des bugs remontés  
⬜ **CA-B3 :** Optimisations de performance si nécessaire  
⬜ **CA-B4 :** Documentation utilisateur (guide enseignant)  
⬜ **CA-B5 :** Implémentation de l'adaptation automatique de niveau

### Phase Release

⬜ **CA-R1 :** Déploiement sur serveur académique ou public  
⬜ **CA-R2 :** Formation des enseignants pilotes  
⬜ **CA-R3 :** Monitoring des usages pendant 1 mois  
⬜ **CA-R4 :** Collecte de retours pour v2.0

---

## 13. Annexes

| Dénominateur | Nom singulier | Nom pluriel | CE1 | CE2 | CM1 |
| ------------ | ------------- | ----------- | --- | --- | --- |
| 2            | demi          | demis       | ✓   | ✓   | ✓   |
| 3            | tiers         | tiers       | ✓   | ✓   | ✓   |
| 4            | quart         | quarts      | ✓   | ✓   | ✓   |
| 5            | cinquième     | cinquièmes  | ✓   | ✓   | ✓   |
| 6            | sixième       | sixièmes    | ✗   | ✓   | ✗   |
| 8            | huitième      | huitièmes   | ✗   | ✓   | ✓   |
| 10           | dixième       | dixièmes    | ✗   | ✓   | ✓   |

### Annexe B : Mapping figures/fractions par niveau (v2.0)

#### CE1 (18 exercices)

| Figure    | Dénominateurs | Nb exercices |
| --------- | ------------- | ------------ |
| Carré     | 2, 4          | 4 (2×2)      |
| Rectangle | 2, 3, 4, 5    | 8 (4×2)      |
| Disque    | 2, 3, 4       | 6 (3×2)      |
| **Total** |               | **18**       |

**Séquence complète** :
1-2: Carré 1/2 | 3-4: Rectangle 1/2 | 5-6: Disque 1/2  
7-8: Carré 1/4 | 9-10: Rectangle 1/4 | 11-12: Disque 1/4  
13-14: Rectangle 1/3 | 15-16: Disque 1/3  
17-18: Rectangle 1/5

#### CE2 (34 exercices)

| Figure    | Dénominateurs        | Nb exercices |
| --------- | -------------------- | ------------ |
| Carré     | 2, 4, 8              | 6 (3×2)      |
| Rectangle | 2, 3, 4, 5, 6, 8, 10 | 14 (7×2)     |
| Disque    | 2, 3, 4, 8           | 8 (4×2)      |
| **Total** |                      | **28**       |

#### CM1 (32 exercices)

| Figure    | Dénominateurs | Nb exercices |
| --------- | ------------- | ------------ |
| Carré     | 2, 4, 8       | 6 (3×2)      |
| Rectangle | 2, 3, 4, 8    | 8 (4×2)      |
| Disque    | 2, 3, 4, 8    | 8 (4×2)      |
| Maison    | 5, 10         | 4 (2×2)      |
| **Total** |               | **26**       |

### Annexe C : Algorithmes clés

#### Ordre de génération (v2.0)

```javascript
// Ordre pédagogique des fractions
const fractionOrder = [2, 4, 8, 3, 5, 10];

// Ordre des figures
const figureOrder = ["square", "rectangle", "disk", "house"];

// Génération
for each fraction in fractionOrder:
    for each figure in figureOrder:
        if fraction exists for figure:
            generate activity 1
            generate activity 2
```

### Annexe D : Références des documents EDUSCOL

1. **Programme cycle 2 (2025)** - BO 31/10/2024

    - URL : https://www.education.gouv.fr/sites/default/files/ensel135_annexe4.pdf
    - **Consulté le** : 28/01/2026
    - **Section** : "Les fractions" (CE1), page 17-18

2. **Ressources fractions cycle 3**

    - URL : https://eduscol.education.fr/document/16510/download

3. **Livret CE1 mathématiques**

    - URL : https://eduscol.education.fr/document/67770/download

4. **Programme cycle 3 (2025)**
    - URL : https://www.education.gouv.fr/sites/default/files/ensel620_annexe2-v2.pdf

---

| Version | Date       | Auteur        | Modifications                                                               |
| ------- | ---------- | ------------- | --------------------------------------------------------------------------- |
| 1.0     | 27/01/2026 | CPC Numérique | Création initiale - État Alpha v0.1.0                                       |
| 2.0     | 28/01/2026 | CPC Numérique | Correction majeure configuration EDUSCOL + nouvelle progression pédagogique |

---

**Fin du document SRS v2.0**
