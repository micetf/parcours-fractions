/**
 * Triangle rectangle représentant 1/2 d'un rectangle (diagonale)
 * Supporte les proportions variables du rectangle
 */
export default function RectangleDiagonalFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 ou 1 (les deux triangles possibles par la diagonale)
    proportions = { width: 1, height: 1.6 },
}) {
    const baseWidth = 160;
    const baseHeight = 160;
    const width = baseWidth * proportions.width;
    const height = baseHeight * proportions.height;

    // ✅ Calcul du viewBox identique à Rectangle.jsx
    const viewBoxHeight = (200 * proportions.height) / proportions.width;
    const centerY = viewBoxHeight / 2;

    const x = 100 - width / 2;
    const y = centerY - height / 2; // ✅ Correction : utilise centerY au lieu de 100

    // Les deux triangles possibles par la diagonale
    const paths = [
        // Triangle haut-gauche vers bas-droit
        `M ${x} ${y} L ${x + width} ${y} L ${x} ${y + height} Z`,
        // Triangle haut-droit vers bas-gauche
        `M ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`,
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
