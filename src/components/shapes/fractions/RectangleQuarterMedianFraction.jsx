/**
 * Triangle rectangle représentant 1/4 d'un rectangle
 * Base = largeur complète du rectangle
 * Hauteur = moitié de la hauteur du rectangle
 * 4 positions possibles
 */
export default function RectangleQuarterMedianFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3
    proportions = { width: 1, height: 1.6 },
}) {
    const baseWidth = 160;
    const baseHeight = 160;
    const width = baseWidth * proportions.width;
    const height = baseHeight * proportions.height;

    const viewBoxHeight = (200 * proportions.height) / proportions.width;
    const centerYViewBox = viewBoxHeight / 2;

    const x = 100 - width / 2;
    const y = centerYViewBox - height / 2;

    const halfHeight = height / 2;
    const centerY = y + halfHeight;

    // 4 triangles possibles
    const paths = [
        // Triangle 0: haut-gauche (coin haut-gauche → coin haut-droit → coin bas-gauche)
        `M ${x} ${y} L ${x + width} ${y} L ${x} ${centerY} Z`,
        // Triangle 1: haut-droit (coin haut-droit → coin bas-droit → coin haut-gauche)
        `M ${x + width} ${y} L ${x + width} ${centerY} L ${x} ${y} Z`,
        // Triangle 2: bas-gauche (coin bas-gauche → coin haut-gauche → coin bas-droit)
        `M ${x} ${y + height} L ${x} ${centerY} L ${x + width} ${y + height} Z`,
        // Triangle 3: bas-droit (coin bas-droit → coin bas-gauche → coin haut-droit)
        `M ${x + width} ${y + height} L ${x} ${y + height} L ${x + width} ${centerY} Z`,
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
