export default function House({
    size = 200,
    fill = "var(--shape-fill)",
    className = "",
    rotation = 0,
    proportions = { roofHeight: 0.5 },
}) {
    const baseWidth = 120;
    const squareHeight = 100;
    const roofHeight = squareHeight * proportions.roofHeight;

    const x = 40;
    const squareY = 100 - squareHeight / 2;
    const roofTop = squareY - roofHeight;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            className={className}
        >
            <g transform={`rotate(${rotation} 100 100)`}>
                {/* Carré */}
                <rect
                    x={x}
                    y={squareY}
                    width={baseWidth}
                    height={squareHeight}
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                />
                {/* Triangle (toit) */}
                <path
                    d={`M ${x} ${squareY} L 100 ${roofTop} L ${x + baseWidth} ${squareY} Z`}
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
}
