export default function Rectangle({
    size = 200,
    fill = "var(--shape-fill)",
    className = "",
    rotation = 0,
    proportions = { width: 1, height: 1.6 },
}) {
    const baseWidth = 160;
    const baseHeight = 100;
    const width = baseWidth * proportions.width;
    const height = baseHeight * proportions.height;
    const x = 100 - width / 2;
    const y = 100 - height / 2;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            className={className}
        >
            <g transform={`rotate(${rotation} 100 100)`}>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
}
