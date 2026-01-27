export default function RectangleFraction({
    denominator,
    fill = "var(--piece-fill)",
    orientation = "vertical",
    index = 0,
    proportions = { width: 1, height: 1.6 },
}) {
    const baseWidth = 160;
    const baseHeight = 100;
    const width = baseWidth * proportions.width;
    const height = baseHeight * proportions.height;
    const x = 100 - width / 2;
    const y = 100 - height / 2;

    if (orientation === "vertical") {
        const pieceWidth = width / denominator;
        const pieceX = x + index * pieceWidth;

        return (
            <svg width="200" height="200" viewBox="0 0 200 200">
                <rect
                    x={pieceX}
                    y={y}
                    width={pieceWidth}
                    height={height}
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                />
            </svg>
        );
    } else {
        const pieceHeight = height / denominator;
        const pieceY = y + index * pieceHeight;

        return (
            <svg width="200" height="200" viewBox="0 0 200 200">
                <rect
                    x={x}
                    y={pieceY}
                    width={width}
                    height={pieceHeight}
                    fill={fill}
                    stroke="#000"
                    strokeWidth="2"
                />
            </svg>
        );
    }
}
