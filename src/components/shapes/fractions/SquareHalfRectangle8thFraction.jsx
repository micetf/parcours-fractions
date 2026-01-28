/**
 * Rectangle représentant 1/8 d'un carré
 * Dimensions : moitié du côté × quart du côté (80×40 px)
 * 8 positions possibles (2 par côté)
 */
export default function SquareHalfRectangle8thFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 7
}) {
    // Carré : 160×160
    // Rectangle : 80×40 (moitié × quart)

    const positions = [
        // Côté haut - 2 rectangles horizontaux
        { x: 20, y: 20, width: 80, height: 40 }, // 0: gauche
        { x: 100, y: 20, width: 80, height: 40 }, // 1: droite

        // Côté droit - 2 rectangles verticaux
        { x: 140, y: 60, width: 40, height: 80 }, // 2: haut
        { x: 140, y: 140, width: 40, height: 80 }, // 3: bas

        // Côté bas - 2 rectangles horizontaux
        { x: 100, y: 140, width: 80, height: 40 }, // 4: droite
        { x: 20, y: 140, width: 80, height: 40 }, // 5: gauche

        // Côté gauche - 2 rectangles verticaux
        { x: 20, y: 140, width: 40, height: 80 }, // 6: bas
        { x: 20, y: 60, width: 40, height: 80 }, // 7: haut
    ];

    const pos = positions[index];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <rect
                x={pos.x}
                y={pos.y}
                width={pos.width}
                height={pos.height}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
