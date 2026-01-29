/**
 * Triangle rectangle représentant 1/8 d'un rectangle
 * Division du rectangle en 4 quarts (grille 2×2), chaque quart coupé en diagonale
 *
 * Triangle rectangle avec côtés de l'angle droit :
 * - Côté 1 : 1/2 largeur rectangle (80 px)
 * - Côté 2 : 1/2 longueur rectangle (128 px)
 * Aire : (80 × 128) / 2 = 5 120 px² = 1/8 de 40 960 px²
 *
 * 8 positions possibles (4 quarts × 2 triangles par quart)
 */
export default function RectangleEighthHalfTriangleFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 7
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

    // Dimensions des petits rectangles (grille 2×2)
    const halfWidth = width / 2; // 80 px
    const halfHeight = height / 2; // 128 px

    // Points de la grille 2×2
    const centerX = x + halfWidth;
    const centerY = y + halfHeight;

    // 8 triangles possibles : 4 quarts × 2 triangles
    const paths = [
        // Quart haut-gauche (2 triangles)
        // Triangle 0 : haut-gauche du quart (diagonal ↘)
        `M ${x},${y} 
         L ${centerX},${y} 
         L ${x},${centerY} 
         Z`,

        // Triangle 1 : bas-droit du quart (diagonal ↘)
        `M ${centerX},${y} 
         L ${centerX},${centerY} 
         L ${x},${centerY} 
         Z`,

        // Quart haut-droit (2 triangles)
        // Triangle 2 : haut-droit du quart (diagonal ↙)
        `M ${centerX},${y} 
         L ${x + width},${y} 
         L ${centerX},${centerY} 
         Z`,

        // Triangle 3 : bas-gauche du quart (diagonal ↙)
        `M ${x + width},${y} 
         L ${x + width},${centerY} 
         L ${centerX},${centerY} 
         Z`,

        // Quart bas-gauche (2 triangles)
        // Triangle 4 : haut-droit du quart (diagonal ↘)
        `M ${x},${centerY} 
         L ${centerX},${centerY} 
         L ${x},${y + height} 
         Z`,

        // Triangle 5 : bas-gauche du quart (diagonal ↘)
        `M ${centerX},${centerY} 
         L ${centerX},${y + height} 
         L ${x},${y + height} 
         Z`,

        // Quart bas-droit (2 triangles)
        // Triangle 6 : haut-gauche du quart (diagonal ↙)
        `M ${centerX},${centerY} 
         L ${x + width},${centerY} 
         L ${centerX},${y + height} 
         Z`,

        // Triangle 7 : bas-droit du quart (diagonal ↙)
        `M ${x + width},${centerY} 
         L ${x + width},${y + height} 
         L ${centerX},${y + height} 
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
