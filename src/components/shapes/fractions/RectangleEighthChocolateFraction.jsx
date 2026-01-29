/**
 * Carreau de chocolat représentant 1/8 d'un rectangle
 * Division en grille 4×2 (4 barres de 2 chocolats)
 * - Largeur d'un carreau : 1/2 largeur rectangle (80 px)
 * - Hauteur d'un carreau : 1/4 hauteur rectangle (64 px)
 * Aire : 80 × 64 = 5 120 px² = 1/8 de 40 960 px²
 *
 * 8 positions possibles (grille 4×2)
 */
export default function RectangleEighthChocolateFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 7 (grille 4×2)
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

    // Dimensions d'un carreau de chocolat
    const carreauWidth = width / 2; // 80 px (2 chocolats par barre)
    const carreauHeight = height / 4; // 64 px (4 barres)

    // Grille 4×2 : 8 positions possibles
    // index = row * 2 + col
    const row = Math.floor(index / 2); // 0-3 (4 barres)
    const col = index % 2; // 0-1 (2 chocolats)

    const carreauX = x + col * carreauWidth;
    const carreauY = y + row * carreauHeight;

    return (
        <svg
            width="200"
            height={(200 * proportions.height) / proportions.width}
            viewBox={`0 0 200 ${viewBoxHeight}`}
        >
            <rect
                x={carreauX}
                y={carreauY}
                width={carreauWidth}
                height={carreauHeight}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
