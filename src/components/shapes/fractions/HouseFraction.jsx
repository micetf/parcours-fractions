export default function HouseFraction({
    denominator,
    fill = "var(--piece-fill)",
    index = 0,
    proportions = { roofHeight: 0.5 },
}) {
    const baseWidth = 120;
    const squareHeight = 100;
    const roofHeight = squareHeight * proportions.roofHeight;

    const pieceWidth = baseWidth / denominator;
    const x = 40 + index * pieceWidth;
    const squareY = 100 - squareHeight / 2;

    // Points du triangle pour cette bande
    const leftX = x;
    const rightX = x + pieceWidth;
    const centerX = leftX + pieceWidth / 2;

    // Interpolation de la hauteur du triangle
    const centerProgress = (centerX - 40) / baseWidth;

    // Hauteur du triangle à chaque position (parabole inversée)
    const getTriangleY = (progress) => {
        const parabolaHeight =
            roofHeight * (1 - 4 * Math.pow(progress - 0.5, 2));
        return squareY - parabolaHeight;
    };

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Rectangle du bas */}
            <rect
                x={x}
                y={squareY}
                width={pieceWidth}
                height={squareHeight}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
            {/* Partie du triangle */}
            <path
                d={`M ${leftX} ${squareY} L ${centerX} ${getTriangleY(centerProgress)} L ${rightX} ${squareY} Z`}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
