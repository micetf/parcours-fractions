export default function DiskFraction({
    denominator,
    fill = "var(--piece-fill)",
    startAngle = 0,
}) {
    const angle = 360 / denominator;
    const start = startAngle * (Math.PI / 180);
    const end = (startAngle + angle) * (Math.PI / 180);

    const x1 = 100 + 80 * Math.cos(start - Math.PI / 2);
    const y1 = 100 + 80 * Math.sin(start - Math.PI / 2);
    const x2 = 100 + 80 * Math.cos(end - Math.PI / 2);
    const y2 = 100 + 80 * Math.sin(end - Math.PI / 2);

    const largeArc = angle > 180 ? 1 : 0;

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <path
                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={fill}
                stroke="#000"
                strokeWidth="2"
                style={{ pointerEvents: "auto" }}
            />
        </svg>
    );
}
