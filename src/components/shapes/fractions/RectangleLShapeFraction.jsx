/**
 * Rectangle représentant 1/2 d'un rectangle
 * Division en forme de L qui s'emboîtent
 * 2 positions possibles (L complémentaires)
 */
export default function RectangleLShapeFraction({
    fill = "var(--piece-fill)",
    index = 0, // 0 ou 1 (2 positions complémentaires)
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

    // Calcul des dimensions
    // Barre horizontale : largeur complète × 1/4 hauteur
    const barH = height / 4;
    // Barre verticale : 1/2 largeur × 3/4 hauteur
    const barW = width / 2;
    const barV = height / 2;

    // 2 formes en L complémentaires
    const paths = [
        // L n°1 (haut-gauche)
        // Composé de :
        // - Rectangle horizontal en haut : toute la largeur × 1/4 hauteur
        // - Rectangle vertical à gauche : 1/2 largeur × 3/4 hauteur (en bas du premier)
        `M ${x} ${y} 
         L ${x + width} ${y} 
         L ${x + width} ${y + barH} 
         L ${x + barW} ${y + barH} 
         L ${x + barW} ${y + barH + barV} 
         L ${x} ${y + barH + barV} 
         Z`,

        // L n°2 (bas-droit) - complémentaire
        // Prend tout l'espace restant
        `M ${x + barW} ${y + barH} 
         L ${x + width} ${y + barH} 
         L ${x + width} ${y + height} 
         L ${x} ${y + height} 
         L ${x} ${y + barH + barV} 
         L ${x + barW} ${y + barH + barV} 
         Z`,
    ];

    return (
        <svg
            width="200"
            height={(200 * proportions.height) / proportions.width}
            viewBox={`0 0 200 ${viewBoxHeight}`}
        >
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
