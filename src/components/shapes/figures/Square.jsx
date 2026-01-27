export default function Square({
    size = 200,
    fill = "var(--shape-fill)",
    className = "",
    rotation = 0,
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            className={className}
        >
            <g transform={`rotate(${rotation} 100 100)`}>
                <rect
                    x="20"
                    y="20"
                    width="160"
                    height="160"
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
}
