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

**Affichage conditionnel :**

```javascript
const showControls = isSelected || isDragging;

{
    showControls && (
        <div className="animate-controls-appear">
            {/* Boutons rotation/flip */}
        </div>
    );
}
```

**Cleanup automatique :**

- `useEffect` avec fonction de nettoyage pour éviter les fuites mémoires
- Le timer est systématiquement clearé au démontage du composant

#### Fichier `index.css`

**Animation de pulsation (bordure de sélection) :**

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

- Boucle infinie (2s par cycle)
- Effet de halo qui s'étend puis se rétracte

**Animation d'apparition des contrôles :**

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

- Durée : 0.2s
- Mouvement vertical + fade-in pour un effet naturel

#### Comportement UX

**Scénario nominal :**

1. **État initial** : Pièce affichée sans bordure ni boutons
2. **Premier touch/clic** : Bordure bleue + boutons apparaissent (animation)
3. **Manipulation** : Les contrôles restent visibles, timer se réinitialise
4. **Inactivité (3s)** : Désélection automatique, retour à l'état initial

**Cas particuliers gérés :**

- Clic sur bouton n'active PAS la sélection (via `e.target.closest("button")`)
- Chaque pièce gère son propre état indépendamment (pas d'état global)
- z-index adapté : 50 si sélectionné/drag, 10 sinon

#### Rationale pédagogique

**Conformité aux principes de l'ergonomie cognitive :**

- **Charge cognitive réduite** : Interface épurée, focus sur la fraction
- **Affordance progressive** : Les actions se révèlent à l'usage
- **Feedback immédiat** : Bordure + animation = signal clair
- **Attention guidée** : L'élève se concentre sur le contenu, pas sur l'UI

**Avantages observables :**

- Particulièrement efficace dans l'Activité 2 avec plusieurs morceaux
- Meilleure lisibilité pour l'enseignant observant l'écran
- Découverte naturelle des fonctionnalités par manipulation

#### Configuration

**Paramètres ajustables :**

| Paramètre                  | Fichier     | Ligne | Valeur par défaut |
| -------------------------- | ----------- | ----- | ----------------- |
| Délai de désélection       | `Piece.jsx` | ~48   | 3000ms            |
| Couleur bordure            | `Piece.jsx` | ~137  | `border-blue-400` |
| Durée animation apparition | `index.css` | ~35   | 0.2s              |
| Cycle pulsation            | `index.css` | ~17   | 2s                |

**Exemple d'ajustement par niveau :**

```javascript
// Adapter le délai selon l'âge
const delay = {
    CE1: 4000, // Plus de temps pour les jeunes
    CE2: 3000,
    CM1: 2500,
}[level];

setTimeout(() => setIsSelected(false), delay);
```

#### Tests recommandés

**Desktop :**

- [x] Clic sur pièce → sélection + affichage boutons
- [x] Drag fluide avec boutons visibles
- [x] Rotation/flip → action + timer reset
- [x] Désélection après 3s d'inactivité
- [x] Tooltips au survol

**Tablette :**

- [x] Touch sur pièce → sélection
- [x] Drag tactile sans lag
- [x] Touch sur boutons → actions immédiates

**Activité 2 (plusieurs pièces) :**

- [x] Sélection indépendante par pièce
- [x] Pas de conflit entre timers
- [x] z-index correct

#### Dépendances

- React 18.3.1+ (hooks `useState`, `useRef`, `useEffect`)
- Tailwind CSS 3.4+ (classes `group`, `group-hover`)
- Aucune dépendance externe supplémentaire

---

## [0.0.1] - 2026-01-20

### Added

- Structure initiale du projet (React + Vite + Tailwind)
- Composants de base : `App.jsx`, `ActivityOne.jsx`, `ActivityTwo.jsx`
- Figures géométriques : Disque, Carré, Rectangle, Maison
- Composants de fractions correspondants
- Système de drag & drop avec `PointerEvents`
- Configuration EDUSCOL pour les 3 niveaux (CE1, CE2, CM1)
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

**Dernière mise à jour :** 27 janvier 2026
