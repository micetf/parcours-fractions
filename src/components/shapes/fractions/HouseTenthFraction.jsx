/**
 * Fractionnement 1/10 d'une maison
 * Un dixième de la maison = un demi-toit (triangle rectangle)
 *
 * Il n'y a que 2 positions possibles :
 * - index 0 : demi-toit gauche
 * - index 1 : demi-toit droit
 *
 * Maison :
 * - Corps : carré 120×120px
 * - Toit : triangle base 120px, hauteur 60px (roofHeight=0.5)
 * - Aire totale : 120×120 + (120×60)/2 = 14 400 + 3 600 = 18 000 px²
 *
 * Vérification géométrique :
 * - Aire demi-toit : (60 × 60) / 2 = 1 800 px²
 * - 1 800 × 10 = 18 000 px² ✓
 */
export default function HouseTenthFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 ou 1 seulement
    proportions = { roofHeight: 0.5 },
}) {
    const baseWidth = 120;
    const squareHeight = 120;
    const roofHeight = squareHeight * proportions.roofHeight;

    const x = 40;
    const squareY = 120 - squareHeight / 2;
    const roofTop = squareY - roofHeight;
    const centerX = 100; // Centre de la maison

    // Triangle gauche : angle droit en bas-gauche
    const leftTriangle = `M ${x} ${squareY} 
                          L ${centerX} ${roofTop} 
                          L ${centerX} ${squareY} 
                          Z`;

    // Triangle droit : angle droit en bas-droit
    const rightTriangle = `M ${centerX} ${squareY} 
                           L ${centerX} ${roofTop} 
                           L ${x + baseWidth} ${squareY} 
                           Z`;

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <path
                d={index === 0 ? leftTriangle : rightTriangle}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
