/**
 * Forme en L représentant 1/4 d'un rectangle
 * Composé de deux barres :
 * - Barre horizontale : largeur complète × 1/8 hauteur (5 120 px²)
 * - Barre verticale : 1/2 largeur × 1/4 hauteur (5 120 px²)
 * Total : 10 240 px² = 1/4 de 40 960 px²
 *
 * 4 positions possibles (L dans chaque coin)
 */
export default function RectangleQuarterLShapeFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3 (L dans chaque coin)
    proportions = { width: 1, height: 1.6 },
}) {
    const baseWidth = 160;
    const baseHeight = 160;
    const width = baseWidth * proportions.width;
    const height = baseHeight * proportions.height;

    // ViewBox adapté aux proportions
    const viewBoxHeight = (200 * proportions.height) / proportions.width;
    const centerYViewBox = viewBoxHeight / 2;

    const x = 100 - width / 2;
    const y = centerYViewBox - height / 2;

    // Dimensions des barres
    const barHorizontalHeight = height / 8; // 32 px (1/8 hauteur)
    const barVerticalWidth = width / 2; // 80 px (1/2 largeur)
    const barVerticalHeight = (height * 3) / 8; // 64 px (1/4 hauteur)

    // 4 positions possibles (L dans chaque coin)
    const paths = [
        // Position 0: L bas-gauche
        // Barre horizontale en bas (toute la largeur) + barre verticale à gauche (moitié largeur)
        `M ${x},${y + height} 
         L ${x},${y + height - barVerticalHeight} 
         L ${x + barVerticalWidth},${y + height - barVerticalHeight} 
         L ${x + barVerticalWidth},${y + height - barHorizontalHeight} 
         L ${x + width},${y + height - barHorizontalHeight} 
         L ${x + width},${y + height} 
         Z`,

        // Position 1: L bas-droit
        // Barre horizontale en bas + barre verticale à droite
        `M ${x},${y + height - barHorizontalHeight} 
         L ${x + width - barVerticalWidth},${y + height - barHorizontalHeight} 
         L ${x + width - barVerticalWidth},${y + height - barVerticalHeight} 
         L ${x + width},${y + height - barVerticalHeight} 
         L ${x + width},${y + height} 
         L ${x},${y + height} 
         Z`,

        // Position 2: L haut-droit (L inversé)
        // Barre horizontale en haut + barre verticale à droite
        `M ${x},${y} 
         L ${x + width},${y} 
         L ${x + width},${y + barVerticalHeight} 
         L ${x + width - barVerticalWidth},${y + barVerticalHeight} 
         L ${x + width - barVerticalWidth},${y + barHorizontalHeight} 
         L ${x},${y + barHorizontalHeight} 
         Z`,

        // Position 3: L haut-gauche (L inversé)
        // Barre horizontale en haut + barre verticale à gauche
        `M ${x},${y} 
         L ${x + width},${y} 
         L ${x + width},${y + barHorizontalHeight} 
         L ${x + barVerticalWidth},${y + barHorizontalHeight} 
         L ${x + barVerticalWidth},${y + barVerticalHeight} 
         L ${x},${y + barVerticalHeight} 
         Z`,
    ];

    return (
        <svg
            width="200"
            height={(200 * proportions.height) / proportions.width}
            viewBox={`0 0 200 ${viewBoxHeight}`}
        >
            <path
                d={paths[index]}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
