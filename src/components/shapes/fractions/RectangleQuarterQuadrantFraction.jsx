/**
 * Triangle rectangle représentant 1/4 d'un rectangle
 * Demi-rectangle (vertical ou horizontal) coupé en diagonale
 * 8 positions possibles au total
 */
export default function RectangleQuarterQuadrantFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 7
    proportions = { width: 1, height: 1.6 },
}) {
    const baseWidth = 160;
    const baseHeight = 160; // ✅ Correction : 160 au lieu de 100
    const width = baseWidth * proportions.width;
    const height = baseHeight * proportions.height;

    // ✅ Calcul du viewBox identique à Rectangle.jsx
    const viewBoxHeight = (200 * proportions.height) / proportions.width;
    const centerYViewBox = viewBoxHeight / 2;

    const x = 100 - width / 2;
    const y = centerYViewBox - height / 2; // ✅ Correction : utilise centerYViewBox

    // Dimensions des demi-rectangles
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // Centre du rectangle
    const centerX = x + halfWidth;
    const centerY = y + halfHeight;

    // 8 triangles possibles
    const paths = [
        // Demi-rectangle vertical gauche, coupé en diagonale
        // Triangle 0: coin haut-gauche → centre-haut → coin bas-gauche
        `M ${x} ${y} L ${centerX} ${y} L ${x} ${y + height} Z`,
        // Triangle 1: centre-haut → centre-bas → coin bas-gauche
        `M ${centerX} ${y} L ${centerX} ${y + height} L ${x} ${y + height} Z`,

        // Demi-rectangle vertical droit, coupé en diagonale
        // Triangle 2: centre-haut → coin haut-droit → centre-bas
        `M ${centerX} ${y} L ${x + width} ${y} L ${centerX} ${y + height} Z`,
        // Triangle 3: coin haut-droit → coin bas-droit → centre-bas
        `M ${x + width} ${y} L ${x + width} ${y + height} L ${centerX} ${y + height} Z`,

        // Demi-rectangle horizontal haut, coupé en diagonale
        // Triangle 4: coin haut-gauche → coin haut-droit → centre-gauche
        `M ${x} ${y} L ${x + width} ${y} L ${x} ${centerY} Z`,
        // Triangle 5: coin haut-droit → centre-droit → centre-gauche
        `M ${x + width} ${y} L ${x + width} ${centerY} L ${x} ${centerY} Z`,

        // Demi-rectangle horizontal bas, coupé en diagonale
        // Triangle 6: centre-gauche → coin bas-gauche → centre-droit
        `M ${x} ${centerY} L ${x} ${y + height} L ${x + width} ${centerY} Z`,
        // Triangle 7: coin bas-gauche → coin bas-droit → centre-droit
        `M ${x} ${y + height} L ${x + width} ${y + height} L ${x + width} ${centerY} Z`,
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
