/**
 * Petit carré représentant 1/4 d'un grand carré
 * Aire = 1/4 de l'aire totale
 * Forme unie, pas de grille visible
 */
export default function SquareQuarterSquareFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3 (4 positions possibles)
}) {
    // Le grand carré fait 160×160, donc aire = 25600
    // Un quart = 6400, donc côté = 80
    const smallSize = 80;

    // 4 positions possibles (coins)
    const positions = [
        { x: 20, y: 20 }, // Haut-gauche
        { x: 100, y: 20 }, // Haut-droit
        { x: 100, y: 100 }, // Bas-droit
        { x: 20, y: 100 }, // Bas-gauche
    ];

    const pos = positions[index];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <rect
                x={pos.x}
                y={pos.y}
                width={smallSize}
                height={smallSize}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
