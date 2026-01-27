# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Unreleased]

### À venir

- Activité 2 avec fractions > 1 (CM1)
- Mode enseignant basique
- Feedback sonore optionnel
- Composant `Band` (bande prototypique distincte du rectangle)
- Rectangle non-prototypique (inclinaisons, diagonales, formes en L)
- Carré avec fractionnement diagonal (triangles)

---

## [0.2.0] - 2026-01-28

### Changed

#### Interface utilisateur

- **Suppression complète du sélecteur de niveau** : L'application démarre directement en CE1, sans choix visible CE1/CE2/CM1
- L'en-tête affiche uniquement le titre "Les Fractions" et la barre de progression
- Le bouton "Recommencer" reste accessible

#### Progression pédagogique

- **Nouvelle logique de progression** : Fraction → Figure → Activité (au lieu de Figure → Fraction → Activité)
    - Exemple : 1/2 sur carré, rectangle, disque PUIS 1/4 sur carré, rectangle, disque
    - Avantage : Transfert immédiat du concept de fraction sur plusieurs représentations
- **Ordre des figures** : Carré → Rectangle → Disque (→ Maison en CM1)
    - Justification : Complexité cognitive croissante (symétrie → asymétrie → rotation angulaire)
- **Ordre des fractions** : 1/2, 1/4, 1/8, 1/3, 1/5, 1/10
    - Justification : Puissances de 2 (divisions successives) puis autres dénominateurs

#### Configuration EDUSCOL (CORRECTION MAJEURE)

**❌ Ancienne configuration (erronée)** :

```javascript
CE1: {
    figures: ["disk"],
    fractions: { disk: [2, 4, 8] }
}
```

**✅ Nouvelle configuration (conforme programmes 2025)** :

```javascript
CE1: {
    figures: ["square", "rectangle", "disk"],
    fractions: {
        square: [2, 4],
        rectangle: [2, 3, 4, 5],
        disk: [2, 3, 4]
    }
}
```

**Source** : Programme cycle 2 EDUSCOL 2025 (BO 31/10/2024)

> "Les fractions rencontrées au CE1 ont un dénominateur égal à 2, 3, 4, 5, 6, 8 ou 10."
> "L'élève sait partager une bande de papier en un nombre donné de parts égales."

**Changements détaillés par niveau** :

**CE1** :

- Ajout du carré (dénominateurs 2, 4)
- Ajout du rectangle (dénominateurs 2, 3, 4, 5)
- Conservation du disque (dénominateurs 2, 3, 4)
- Suppression du dénominateur 8 (déplacé au CE2)
- Total exercices : 18 (contre 6 auparavant)

**CE2** :

- Ajout du dénominateur 8 pour carré, rectangle, disque
- Ajout des dénominateurs 6, 10 pour rectangle
- Total exercices : 34

**CM1** :

- Conservation des figures square, rectangle, disk, house
- Ajustement des dénominateurs selon programme

### Fixed

- **Conformité EDUSCOL** : Configuration complète revue selon le document officiel `ensel135_annexe4.pdf`
- **Ordre pédagogique** : La progression respecte maintenant le principe de transfert immédiat des concepts

### Technical

#### Fichiers modifiés

**`src/utils/fractionConfig.js`** :

- Refonte complète de `PROGRESSION_EDUSCOL`
- Ajout de fractions manquantes pour CE1
- Réorganisation de l'ordre des figures : `["square", "rectangle", "disk"]`

**`src/data/progression.js`** :

- Nouvelle fonction `generateProgression()` avec logique Fraction → Figure → Activité
- Ordre de tri explicite : `const fractionOrder = [2, 4, 8, 3, 5, 10];`
- Boucle imbriquée modifiée :

```javascript
sortedFractions.forEach((fraction) => {
    config.figures.forEach((figure) => {
        // Activité 1
        // Activité 2
    });
});
```

**`src/App.jsx`** :

- Suppression complète du sélecteur de niveau (lignes 8-10, 14-30)
- Niveau fixe : `const defaultLevel = "CE1";`
- Suppression de la fonction `handleLevelChange()`
- Suppression de la sauvegarde `fractions-level` dans localStorage

**`src/hooks/useLocalStorage.js`** :

- Aucune modification (toujours utilisé pour `fractions-index`)

#### Impact sur la génération d'exercices

**Avant (v0.1.0)** :

```
Disque 1/2 Act.1
Disque 1/2 Act.2
Disque 1/4 Act.1
Disque 1/4 Act.2
Disque 1/8 Act.1
Disque 1/8 Act.2
```

**Après (v0.2.0)** :

```
Carré 1/2 Act.1
Carré 1/2 Act.2
Rectangle 1/2 Act.1
Rectangle 1/2 Act.2
Disque 1/2 Act.1
Disque 1/2 Act.2
Carré 1/4 Act.1
Carré 1/4 Act.2
...
```

### Rationale pédagogique

**Pourquoi Carré → Rectangle → Disque ?**

| Figure    | Complexité                                      | Ancrage concret              |
| --------- | ----------------------------------------------- | ---------------------------- |
| Carré     | Symétrique, division simple (2 ou 4)            | Serviette, gaufre            |
| Rectangle | Asymétrique, plus de possibilités (3, 4, 5)     | Tablette de chocolat         |
| Disque    | Division angulaire, rotation autour d'un centre | Pizza, gâteau d'anniversaire |

**Pourquoi Fraction → Figure ?**

- Principe didactique : **Transfert immédiat du concept**
- L'élève construit la notion de "un demi" sur 3 représentations consécutives
- Évite l'association stéréotypée "fraction = disque uniquement"
- Conforme au principe EDUSCOL de "présentation non-prototypique"

---

## [0.1.0] - 2026-01-27

### Added

- Système d'affichage conditionnel des boutons de manipulation
- Bordure de sélection avec effet de pulsation subtile (animation CSS)
- Timer de désélection automatique après 3 secondes d'inactivité
- Tooltips informatifs sur les boutons de contrôle ("Pivoter", "Retourner")
- Animations CSS pour l'apparition fluide des contrôles (glissement depuis le bas)
- Gestion du z-index dynamique selon l'état de sélection

### Changed

- Les boutons de rotation/retournement ne sont plus affichés en permanence
- Les contrôles n'apparaissent que lors de la sélection ou du drag d'une pièce
- Interface visuelle épurée par défaut pour réduire la charge cognitive
- Le timer d'inactivité se réinitialise à chaque interaction (drag, rotation, flip)

### Technical Details

#### Composant `Piece.jsx`

**Nouveaux états React :**

```javascript
const [isSelected, setIsSelected] = useState(false);
const inactivityTimerRef = useRef(null);
```

**Logique de sélection :**

- La pièce devient active au `pointerDown` (sauf si clic sur bouton)
- Une bordure bleue pulsante indique visuellement l'état sélectionné
- Les boutons de contrôle glissent depuis le bas avec une animation de 0.2s

**Timer d'inactivité :**

```javascript
const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
        setIsSelected(false);
    }, 3000); // Désélection après 3 secondes
};
```

#### Fichier `index.css`

**Animation de pulsation (bordure de sélection)** :

```css
@keyframes selection-pulse {
    0%,
    100% {
        opacity: 1;
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    50% {
        opacity: 0.8;
        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
    }
}
```

**Animation d'apparition des contrôles** :

```css
@keyframes controls-appear {
    from {
        opacity: 0;
        transform: translate(-50%, 8px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
```

---

## [0.0.1] - 2026-01-20

### Added

- Structure initiale du projet (React + Vite + Tailwind)
- Composants de base : `App.jsx`, `ActivityOne.jsx`, `ActivityTwo.jsx`
- Figures géométriques : Disque, Carré, Rectangle, Maison
- Composants de fractions correspondants
- Système de drag & drop avec `PointerEvents`
- Configuration EDUSCOL pour les 3 niveaux (CE1, CE2, CM1) - **INCORRECTE, corrigée en v0.2.0**
- Générateur de progression avec variations non-prototypiques
- Sauvegarde locale avec `useLocalStorage`
- Boutons de rotation et retournement (affichage permanent)

### Design

- Palette de couleurs pédagogique (tons pastels)
- Police Nunito (Google Fonts)
- Responsive design (desktop + tablette)

---

## Notes de version

### Convention de nommage

- **MAJOR** : Changements incompatibles avec versions précédentes
- **MINOR** : Ajout de fonctionnalités rétrocompatibles
- **PATCH** : Corrections de bugs rétrocompatibles

### Statut du projet

- **v0.x.x** : Phase Alpha (développement actif)
- **v1.x.x** : Phase Beta (tests utilisateurs)
- **v2.x.x** : Release stable (déploiement académique)

---

**Dernière mise à jour :** 28 janvier 2026
