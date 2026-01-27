# Spécification des Exigences Logicielles (SRS)

## Application Web d'Apprentissage des Fractions

**Version :** 1.0  
**Date :** 27 janvier 2026  
**Auteur :** Conseiller Pédagogique de Circonscription Numérique  
**Statut :** En développement

---

## 1. Introduction

### 1.1 Objectif du document

Ce document spécifie les exigences fonctionnelles et non-fonctionnelles de l'application web d'apprentissage des fractions destinée aux élèves de cycle 2 et cycle 3 de l'école primaire française.

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

#### EF-01 : Sélection du niveau

**Priorité :** Haute  
**Description :** L'utilisateur doit pouvoir sélectionner son niveau scolaire.

**Critères d'acceptation :**

- 3 boutons visibles : CE1, CE2, CM1
- Le niveau actif est mis en évidence visuellement
- Le changement de niveau réinitialise la progression
- Le niveau sélectionné est sauvegardé localement

**Dépendances :** Aucune

---

### 3.2 Configuration des fractions par niveau

#### EF-02 : Fractions disponibles selon le niveau

**Priorité :** Haute  
**Description :** Les fractions présentées doivent respecter les programmes EDUSCOL.

**Règles métier :**

**CE1 :**

- Figures : disque uniquement
- Dénominateurs : 2, 4, 8
- Fractions ≤ 1 uniquement

**CE2 :**

- Figures : disque, carré, rectangle
- Dénominateurs : disque (2,3,4,8), carré (2,4,8), rectangle (2,3,4,8)
- Maximum : 12
- Fractions ≤ 1 uniquement

**CM1 :**

- Figures : disque, carré, rectangle, maison
- Dénominateurs : disque (2,3,4,8), carré (2,4,8), rectangle (2,3,4,8), maison (5,10)
- Maximum : 20
- Fractions > 1 autorisées (activité 2 uniquement)

**Source :** Document EDUSCOL 65186

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

**Règle :** Pour chaque combinaison (figure, fraction), générer :

1. Un exercice d'activité 1
2. Un exercice d'activité 2

**Ordre :** Séquentiel dans l'ordre : disque → carré → rectangle → maison

#### EF-09 : Barre de progression

**Priorité :** Moyenne

**Affichage :**

- Numéro de l'exercice courant / total
- Numéro de l'activité (1 ou 2)
- Pourcentage de complétion
- Barre visuelle animée

#### EF-10 : Sauvegarde de la progression

**Priorité :** Moyenne

**Données sauvegardées :**

- Niveau sélectionné
- Index de l'exercice courant

**Mécanisme :** localStorage du navigateur

#### EF-11 : Recommencer

**Priorité :** Basse

**Action :** Bouton "Recommencer" avec confirmation
**Effet :** Retour à l'exercice 0 du niveau courant

---

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
│   ├── ui/                    # Composants génériques (futurs)
│   ├── activities/            # Activités pédagogiques
│   │   ├── ActivityOne.jsx
│   │   └── ActivityTwo.jsx
│   ├── shapes/               # Formes géométriques
│   │   ├── Piece.jsx         # Morceau manipulable
│   │   ├── figures/          # Figures complètes
│   │   │   ├── Disk.jsx
│   │   │   ├── Square.jsx
│   │   │   ├── Rectangle.jsx
│   │   │   └── House.jsx
│   │   └── fractions/        # Morceaux de fractions
│   │       ├── DiskFraction.jsx
│   │       ├── SquareFraction.jsx
│   │       ├── RectangleFraction.jsx
│   │       └── HouseFraction.jsx
│   └── progression/          # (futurs) ProgressBar, etc.
├── hooks/                    # Hooks React personnalisés
│   └── useLocalStorage.js
├── utils/                    # Utilitaires
│   └── fractionConfig.js     # Configuration EDUSCOL
├── data/                     # Générateurs de données
│   └── progression.js
└── App.jsx                   # Composant racine
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
    figures: string[],
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

### 6.3 Données sauvegardées (localStorage)

```javascript
{
  'fractions-level': 'CE1'|'CE2'|'CM1',
  'fractions-index': number
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

- Titre : "Les Fractions" (texte-4xl)
- Sélecteur de niveau : 3 boutons horizontaux
- Barre de progression : fond gris, remplissage bleu animé

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

**RM-01 :** Chaque combinaison (figure, fraction, niveau) génère 2 exercices (activité 1 et 2)

**RM-02 :** Les variations visuelles sont générées aléatoirement à chaque nouvelle génération de progression

**RM-03 :** Les angles et positions aléatoires utilisent Math.random() uniquement lors de la génération de la progression (pas en render)

**RM-04 :** Pour l'activité 2, le nombre de morceaux donnés est : 1 ≤ n < dénominateur

### 8.2 Manipulation

**RM-05 :** La rotation du disque s'effectue par pas de 360°/dénominateur

**RM-06 :** La rotation des autres formes s'effectue par pas de 90°

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
**Postconditions :** Progression initialisée

**Scénario nominal :**

1. L'élève sélectionne son niveau (CE1, CE2 ou CM1)
2. Le système génère la liste des exercices
3. Le système affiche le premier exercice
4. La progression est sauvegardée

**Scénarios alternatifs :**

- 1a. Une progression existe déjà → Le système reprend où l'élève s'était arrêté

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

**L10-01 :** Pas d'interface enseignant pour personnaliser les exercices  
**L10-02 :** Pas de suivi détaillé des erreurs par élève  
**L10-03 :** Pas d'export des résultats  
**L10-04 :** Pas de support multi-utilisateurs  
**L10-05 :** Pas de mode hors-ligne progressif (PWA)  
**L10-06 :** Activité 2 limitée aux fractions < 1 (même en CM1)

### 10.2 Contraintes techniques

**C10-01 :** Nécessite un navigateur moderne (ES2022+)  
**C10-02 :** Données limitées à 5-10 MB (localStorage)  
**C10-03 :** Pas de synchronisation multi-appareils  
**C10-04 :** Dépendance à Google Fonts (si réseau coupé après chargement initial)

---

## 11. Évolutions futures

### 11.1 Priorité haute

**EV-H1 :** Activité 2 avec fractions > 1 (CM1)

- "On a plus d'une figure ! Combien de morceaux en plus ?"
- "L'ensemble fait une figure + x nèmes"

**EV-H2 :** Mode enseignant

- Sélection manuelle des exercices
- Paramétrage des variations
- Consultation des résultats

**EV-H3 :** Feedback sonore optionnel

- Sons de validation/erreur
- Activation/désactivation par l'utilisateur

### 11.2 Priorité moyenne

**EV-M1 :** Export des résultats (PDF, CSV)  
**EV-M2 :** Mode hors-ligne complet (PWA)  
**EV-M3 :** Activités complémentaires :

- Comparaison de fractions
- Fractions sur droite graduée
- Calculs simples (addition de fractions même dénominateur)

**EV-M4 :** Personnalisation visuelle

- Choix des couleurs
- Mode sombre

### 11.3 Priorité basse

**EV-B1 :** Multi-utilisateurs avec base de données  
**EV-B2 :** Gamification (badges, scores)  
**EV-B3 :** Adaptation de la difficulté (IA légère)  
**EV-B4 :** Internationalisation (autres langues)

---

## 12. Critères d'acceptation globaux

### Phase Alpha (actuelle)

✅ **CA-A1 :** Les trois niveaux (CE1, CE2, CM1) sont fonctionnels  
✅ **CA-A2 :** Les deux types d'activités fonctionnent correctement  
✅ **CA-A3 :** Les fractions respectent la configuration EDUSCOL  
✅ **CA-A4 :** Les figures et morceaux sont présentés de manière non-prototypique  
✅ **CA-A5 :** La manipulation (drag, rotate, flip) fonctionne sur desktop et tablette  
✅ **CA-A6 :** La progression est sauvegardée et restaurée  
⬜ **CA-A7 :** L'application est testée sur les 4 navigateurs cibles  
⬜ **CA-A8 :** L'accessibilité WCAG AA est validée

### Phase Beta

⬜ **CA-B1 :** Tests utilisateurs avec 3 classes (CE1, CE2, CM1)  
⬜ **CA-B2 :** Corrections des bugs remontés  
⬜ **CA-B3 :** Optimisations de performance si nécessaire  
⬜ **CA-B4 :** Documentation utilisateur (guide enseignant)

### Phase Release

⬜ **CA-R1 :** Déploiement sur serveur académique ou public  
⬜ **CA-R2 :** Formation des enseignants pilotes  
⬜ **CA-R3 :** Monitoring des usages pendant 1 mois  
⬜ **CA-R4 :** Collecte de retours pour v2.0

---

## 13. Annexes

### Annexe A : Nomenclature des fractions

| Dénominateur | Nom singulier | Nom pluriel | Programmes    |
| ------------ | ------------- | ----------- | ------------- |
| 2            | demi          | demis       | CE1, CE2, CM1 |
| 3            | tiers         | tiers       | CE2, CM1      |
| 4            | quart         | quarts      | CE1, CE2, CM1 |
| 5            | cinquième     | cinquièmes  | CM1 (maison)  |
| 8            | huitième      | huitièmes   | CE1, CE2, CM1 |
| 10           | dixième       | dixièmes    | CM1 (maison)  |

### Annexe B : Mapping figures/fractions par niveau

Voir section 3.2 pour le détail complet.

### Annexe C : Algorithmes clés

#### Génération angle de départ aléatoire (disque)

```javascript
function randomStartAngle() {
    return Math.floor(Math.random() * 360);
}
```

#### Sélection index de bande aléatoire

```javascript
function randomPieceIndex(denominator) {
    return Math.floor(Math.random() * denominator);
}
```

#### Calcul angle de rotation adapté

```javascript
const rotationStep = shape === "disk" ? 360 / denominator : 90;
```

### Annexe D : Références des documents EDUSCOL

1. **Programme cycle 2 (2025)** - BO 31/10/2024

    - URL : https://www.education.gouv.fr/sites/default/files/ensel135_annexe4.pdf

2. **Ressources fractions cycle 3**

    - URL : https://eduscol.education.fr/document/16510/download

3. **Livret CE1 mathématiques**

    - URL : https://eduscol.education.fr/document/67770/download

4. **Programme cycle 3 (2025)**
    - URL : https://www.education.gouv.fr/sites/default/files/ensel620_annexe2-v2.pdf

---

## Historique des versions

| Version | Date       | Auteur        | Modifications                  |
| ------- | ---------- | ------------- | ------------------------------ |
| 1.0     | 27/01/2026 | CPC Numérique | Création initiale - État Alpha |

---

**Fin du document SRS**
