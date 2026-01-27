/**
 * Triangle rectangle représentant 1/2 d'un carré (diagonale)
 * Forme unie, pas de grille visible
 */
export default function SquareDiagonalFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 ou 1 (les deux triangles possibles)
}) {
    // Les deux triangles possibles par la diagonale
    const paths = [
        "M 20 20 L 180 20 L 20 180 Z", // Triangle haut-gauche
        "M 180 20 L 180 180 L 20 180 Z", // Triangle bas-droit
    ];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <path d={paths[index]} fill={fill} stroke="#000" strokeWidth="2" />
        </svg>
    );
}
