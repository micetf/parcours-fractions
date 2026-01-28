# 🎯 Parcours Fractions

Application web éducative pour l'apprentissage des fractions à l'école primaire (CE1, CE2, CM1).

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![EDUSCOL](https://img.shields.io/badge/Conforme-EDUSCOL%202025-green)](https://eduscol.education.fr)
![Version](https://img.shields.io/badge/Version-0.4.3--alpha-blue)

---

## 📋 Description

Application conforme aux **programmes 2025** de l'Éducation Nationale française avec **trois modes** :

### 🎯 Mode Autonome

Parcours EDUSCOL avec deux activités :

- **Activité 1** : Déterminer combien de morceaux composent une figure
- **Activité 2** : Analyser des morceaux et répondre progressivement

### 👨‍🏫 Mode Collectif

Outil de démonstration enseignant :

- Configuration libre (figure, fraction, type, quantité)
- Ajout/retrait de morceaux à la volée
- Questions pédagogiques suggérées
- Toolbar fixe permanente

### 📝 Mode Guidé _(à venir)_

Parcours personnalisé par l'enseignant

---

## 🚀 Démarrage rapide

```bash
# Cloner
git clone https://github.com/micetf/parcours-fractions.git
cd parcours-fractions

# Installer
pnpm install

# Lancer
pnpm dev
```

Application sur **http://localhost:5173**

---

## 📝 Dernière version : v0.4.3 (28/01/2026)

**Améliorations UX :**

- ✨ **Nouveau fractionnement 1/8** : Rectangle 80×40 px
- 🐛 **Suppression redondance** : Horizontal/vertical carré
- ⚡ **Zone cliquable précise** : Restreinte à la forme réelle
- ⚡ **Contour adaptatif** : Suit la forme (drop-shadow SVG)

**Détails** : Voir [CHANGELOG.md](./CHANGELOG.md)## ⚙️ Configuration EDUSCOL 2025

### CE1 (18 exercices)

- Figures : carré, rectangle, disque
- Fractions : 1/2, 1/3, 1/4, 1/5

### CE2 (28 exercices)

- Figures : carré, rectangle, disque
- Fractions : 1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10

### CM1 (26 exercices)

- Figures : carré, rectangle, disque, maison
- Fractions : 1/2, 1/3, 1/4, 1/5, 1/8, 1/10

---

## 🎨 Fractionnements multiples

### Carré

- **1/2** (2 types) : Rectangles verticaux, Triangles diagonaux
- **1/4** (4 types) : Rectangles, Triangles coins, Petits carrés, Croix
- **1/8** (5 types) : Rectangles verticaux, **Rectangles demi-quart**, Triangles isocèles, Triangles minces

### Rectangle

- **1/2 à 1/5** (2 types) : Verticaux, Horizontaux

### Disque

- **Tous** (1 type) : Secteurs angulaires

---

## 🛠️ Stack technique

| Techno   | Version | Usage           |
| -------- | ------- | --------------- |
| React    | 18.3.1  | Framework UI    |
| Vite     | 5.4+    | Build tool      |
| Tailwind | 3.4+    | Styling         |
| pnpm     | 8.0+    | Package manager |

**Sans TypeScript** (choix architectural)

---

## 🏗️ Architecture v0.4.2

**Composant contrôlé** :

```jsx
// Piece.jsx - Présentatif pur
<Piece
    position={position}
    rotation={rotation}
    isFlipped={isFlipped}
    onPositionChange={setPosition}
    isSelected={isSelected}
/>;

// Parent - Gère l'état
const handleRotate = () =>
    setPieces((prev) =>
        prev.map((p) =>
            p.id === selectedId ? { ...p, rotation: p.rotation + step } : p
        )
    );

// Toolbar - Callbacks directs
<GlobalToolbar
    isVisible={!!selectedId}
    rotation={piece?.rotation || 0}
    onRotate={handleRotate}
    onFlip={handleFlip}
/>;
```

---

## 🧪 Tests recommandés

### Mode Autonome

- ✅ Rotation multiple (10+ clics actifs)
- ✅ Rotation continue (0→90→180→270→360→450...)
- ✅ Timer désélection 3s
- ✅ Toolbar fixe coin haut-droit

### Mode Collectif

- ✅ Configuration dynamique
- ✅ Ajout/retrait morceaux
- ✅ Contrôles permanents (pas de timer)
- ✅ Tous les boutons actifs

---

## 📱 Support

| Appareil      | Support    | Notes      |
| ------------- | ---------- | ---------- |
| Desktop       | ✅ Complet | Recommandé |
| Tablette ≥10" | ✅ Complet | Tactile OK |
| Tablette <10" | ⚠️ Partiel | Difficile  |
| Smartphone    | ❌ Non     | Trop petit |

**Résolution min** : 1024×768

---

## 🐛 Problèmes connus (v0.4.2)

- Pas de clippage automatique (Mode Collectif)
- Pas de mode plein écran
- Mode Guidé non implémenté
- Activité 2 limitée aux fractions < 1

---

## 🗺️ Roadmap

### v0.5.0

- Clippage automatique
- Mode plein écran
- Tests utilisateurs

### v1.0.0

- Mode Guidé complet
- Export PDF
- Multi-utilisateurs

---

## 📄 Licence

MIT (open-source permissif)

---

## 👥 Auteurs

**Conseiller Pédagogique Circonscription Numérique**  
Académie Grenoble | Ardèche

---

## 📞 Support

- **Documentation** : [CHANGELOG.md](./CHANGELOG.md)
- **Spécifications** : [SRS.md](./SRS.md)
- **Issues** : [GitHub](https://github.com/micetf/parcours-fractions/issues)

---

**Développé avec ❤️ pour l'éducation**

_Dernière mise à jour : 28 janvier 2026_
