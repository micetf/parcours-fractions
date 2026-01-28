// src/components/shapes/figures/Rectangle.jsx
export default function Rectangle({
    size = 200,
    fill = "var(--shape-fill)",
    className = "",
    rotation = 0,
    proportions = { width: 1, height: 1.6 },
}) {
    const baseWidth = 160;
    const baseHeight = 160; // ✅ Base carrée, les proportions feront le reste
    const width = baseWidth * proportions.width;
    const height = baseHeight * proportions.height;

    // ✅ ViewBox adapté
    const viewBoxHeight = (200 * proportions.height) / proportions.width;
    const centerY = viewBoxHeight / 2;

    const x = 100 - width / 2;
    const y = centerY - height / 2;

    return (
        <svg
            width={size}
            height={(size * proportions.height) / proportions.width}
            viewBox={`0 0 200 ${viewBoxHeight}`}
            className={className}
        >
            <g transform={`rotate(${rotation} 100 ${centerY})`}>
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
