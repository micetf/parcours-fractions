/**
 * Fractionnement 1/5 d'une maison
 * Un cinquième de la maison = le toit complet (triangle)
 *
 * Il n'y a qu'UNE SEULE représentation : le triangle du toit
 * index est ignoré car il n'y a qu'une position
 *
 * Maison :
 * - Corps : carré 120×120px
 * - Toit : triangle base 120px, hauteur 60px (roofHeight=0.5)
 * - Aire totale : 120×120 + (120×60)/2 = 14 400 + 3 600 = 18 000 px²
 * - 1/5 de la maison = 3 600 px² = aire du toit ✓
 */
export default function HouseFifthFraction({
    fill = "var(--piece-fill)",
    proportions = { roofHeight: 0.5 },
}) {
    const baseWidth = 120;
    const squareHeight = 120;
    const roofHeight = squareHeight * proportions.roofHeight;

    const x = 40;
    const squareY = 120 - squareHeight / 2;
    const roofTop = squareY - roofHeight;

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <path
                d={`M ${x} ${squareY} 
                    L 100 ${roofTop} 
                    L ${x + baseWidth} ${squareY} 
                    Z`}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
