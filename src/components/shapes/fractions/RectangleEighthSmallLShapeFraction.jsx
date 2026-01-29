/**
 * Petite forme en L représentant 1/8 d'un rectangle
 * Composé de deux barres rectangulaires qui se chevauchent :
 * - Barre horizontale : 1/2 largeur × 1/8 hauteur (80×32 px = 2 560 px²)
 * - Barre verticale : 1/4 largeur × 1/4 hauteur (40×64 px = 2 560 px²)
 * Chevauchement : 1/4 largeur × 1/8 hauteur (40×32 px = 1 280 px²)
 * Total : 5 120 px² = 1/8 de 40 960 px²
 *
 * 4 positions possibles (1 vrai L par coin)
 */

export default function RectangleEighthSmallLShapeFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3
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
    const barHorizontalWidth = width / 2; // 80 px (1/2 largeur)
    const barHorizontalHeight = height / 8; // 32 px (1/8 hauteur)
    const barVerticalWidth = width / 4; // 40 px (1/4 largeur)
    const barVerticalHeight = (3 * height) / 8; // 64 px (1/4 hauteur)

    // 4 positions possibles (L dans chaque coin avec chevauchement d'angle)
    const paths = [
        // Position 0: L bas-gauche
        // Barre horizontale en bas (1/2 largeur à partir de la gauche) + barre verticale à gauche (1/4 hauteur vers le haut)
        `M ${x},${y + height}
     L ${x},${y + height - barVerticalHeight}
     L ${x + barVerticalWidth},${y + height - barVerticalHeight}
     L ${x + barVerticalWidth},${y + height - barHorizontalHeight}
     L ${x + barHorizontalWidth},${y + height - barHorizontalHeight}
     L ${x + barHorizontalWidth},${y + height}
     Z`,

        // Position 1: L bas-droit
        // Barre horizontale en bas (1/2 largeur à partir de la droite) + barre verticale à droite
        `M ${x + width - barHorizontalWidth},${y + height - barHorizontalHeight}
     L ${x + width - barVerticalWidth},${y + height - barHorizontalHeight}
     L ${x + width - barVerticalWidth},${y + height - barVerticalHeight}
     L ${x + width},${y + height - barVerticalHeight}
     L ${x + width},${y + height}
     L ${x + width - barHorizontalWidth},${y + height}
     Z`,

        // Position 2: L haut-droit
        // Barre horizontale en haut (1/2 largeur à partir de la droite) + barre verticale à droite vers le bas
        `M ${x + width - barHorizontalWidth},${y}
     L ${x + width},${y}
     L ${x + width},${y + barVerticalHeight}
     L ${x + width - barVerticalWidth},${y + barVerticalHeight}
     L ${x + width - barVerticalWidth},${y + barHorizontalHeight}
     L ${x + width - barHorizontalWidth},${y + barHorizontalHeight}
     Z`,

        // Position 3: L haut-gauche
        // Barre horizontale en haut (1/2 largeur à partir de la gauche) + barre verticale à gauche vers le bas
        `M ${x},${y}
     L ${x + barHorizontalWidth},${y}
     L ${x + barHorizontalWidth},${y + barHorizontalHeight}
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
                d={paths[index % 4]}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
