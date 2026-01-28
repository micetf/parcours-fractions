/**
 * Triangle rectangle représentant 1/4 d'un carré (coin)
 * Un côté de l'angle droit = côté du carré (160)
 * Autre côté de l'angle droit = demi-côté (80)
 */
export default function SquareCornerTriangleFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3 (4 coins possibles)
}) {
    const paths = [
        "M 20 20 L 180 20 L 20 100 Z", // Coin haut-gauche
        "M 180 20 L 180 180 L 100 20 Z", // Coin haut-droit
        "M 180 180 L 20 180 L 180 100 Z", // Coin bas-droit
        "M 20 180 L 20 20 L 100 180 Z", // Coin bas-gauche
    ];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
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
