/**
 * Rectangle représentant 1/4 d'un rectangle
 * Division en grille 2×2 (demi-largeur × demi-longueur)
 * 4 positions possibles
 */
export default function RectangleQuarterRectangleFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3 (4 positions possibles en grille 2×2)
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

    // Dimensions des petits rectangles (demi largeur × demi longueur)
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // 4 positions possibles (grille 2×2)
    const positions = [
        { x: x, y: y }, // 0: Haut-gauche
        { x: x + halfWidth, y: y }, // 1: Haut-droit
        { x: x, y: y + halfHeight }, // 2: Bas-gauche
        { x: x + halfWidth, y: y + halfHeight }, // 3: Bas-droit
    ];

    const pos = positions[index];

    return (
        <svg
            width="200"
            height={(200 * proportions.height) / proportions.width}
            viewBox={`0 0 200 ${viewBoxHeight}`}
        >
            <rect
                x={pos.x}
                y={pos.y}
                width={halfWidth}
                height={halfHeight}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
