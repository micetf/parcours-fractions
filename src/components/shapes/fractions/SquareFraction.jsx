export default function SquareFraction({
    denominator,
    fill = "var(--piece-fill)",
    orientation = "vertical",
    index = 0,
}) {
    if (orientation === "vertical") {
        const width = 160 / denominator;
        const x = 20 + index * width;

        return (
            <svg width="200" height="200" viewBox="0 0 200 200">
                <rect
                    x={x}
                    y="20"
                    width={width}
                    height="160"
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                    style={{ pointerEvents: "auto" }}
                />
            </svg>
        );
    } else {
        const height = 160 / denominator;
        const y = 20 + index * height;

        return (
            <svg width="200" height="200" viewBox="0 0 200 200">
                <rect
                    x="20"
                    y={y}
                    width="160"
                    height={height}
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                    style={{ pointerEvents: "auto" }}
                />
            </svg>
        );
    }
}
