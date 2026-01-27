/**
 * Triangle rectangle représentant 1/4 d'un carré (croix diagonale)
 * Triangle formé par deux diagonales se croisant au centre
 * Forme unie, pas de grille visible
 */
export default function SquareCrossFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 à 3 (4 triangles possibles)
}) {
    // Centre du carré
    const center = { x: 100, y: 100 };

    // Les 4 triangles formés par les diagonales
    const paths = [
        `M ${center.x} ${center.y} L 20 20 L 180 20 Z`, // Triangle haut
        `M ${center.x} ${center.y} L 180 20 L 180 180 Z`, // Triangle droite
        `M ${center.x} ${center.y} L 180 180 L 20 180 Z`, // Triangle bas
        `M ${center.x} ${center.y} L 20 180 L 20 20 Z`, // Triangle gauche
    ];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <path d={paths[index]} fill={fill} stroke="#000" strokeWidth="2" />
        </svg>
    );
}
