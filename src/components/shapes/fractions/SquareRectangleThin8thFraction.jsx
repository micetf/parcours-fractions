// src/components/shapes/fractions/SquareRectangleThin8thFraction.jsx
/**
 * Triangle rectangle mince représentant 1/8 d'un carré
 * Base = 160px (côté complet), hauteur = 40px (quart du côté)
 * 8 positions possibles le long des 4 côtés
 */
export default function SquareRectangleThin8thFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 7
}) {
    const paths = [
        "M 20 20 L 180 20 L 180 60 Z", // Haut 1
        "M 20 20 L 20 60 L 180 60 Z", // Haut 2
        "M 180 20 L 180 180 L 140 180 Z", // Droite 1
        "M 180 20 L 140 20 L 140 180 Z", // Droite 2
        "M 180 180 L 20 180 L 20 140 Z", // Bas 1
        "M 180 180 L 180 140 L 20 140 Z", // Bas 2
        "M 20 180 L 20 20 L 60 20 Z", // Gauche 1
        "M 20 180 L 60 180 L 60 20 Z", // Gauche 2
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
