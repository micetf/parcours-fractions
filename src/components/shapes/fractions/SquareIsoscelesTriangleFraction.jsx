// src/components/shapes/fractions/SquareIsoscelesTriangleFraction.jsx
/**
 * Triangle isocèle rectangle représentant 1/8 d'un carré
 * Deux côtés perpendiculaires de 80px (demi-côté du carré)
 * Le carré est divisé en 4 petits carrés, chacun coupé en diagonale
 */
export default function SquareIsoscelesTriangleFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 7
}) {
    const paths = [
        // Petit carré haut-gauche
        "M 20 20 L 100 20 L 20 100 Z", // 0: triangle haut-gauche
        "M 100 20 L 100 100 L 20 100 Z", // 1: triangle bas-droit

        // Petit carré haut-droit
        "M 100 20 L 180 20 L 100 100 Z", // 2: triangle haut-gauche
        "M 180 20 L 180 100 L 100 100 Z", // 3: triangle bas-droit

        // Petit carré bas-droit
        "M 100 100 L 180 100 L 100 180 Z", // 4: triangle haut-gauche
        "M 180 100 L 180 180 L 100 180 Z", // 5: triangle bas-droit

        // Petit carré bas-gauche
        "M 20 100 L 100 100 L 20 180 Z", // 6: triangle haut-gauche
        "M 100 100 L 100 180 L 20 180 Z", // 7: triangle bas-droit
    ];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <path d={paths[index]} fill={fill} stroke="#000" strokeWidth="2" />
        </svg>
    );
}
