import { useState, useRef } from "react";
import {
    DiskFraction,
    SquareFraction,
    RectangleFraction,
    HouseFraction,
} from "./fractions";

const FRACTION_COMPONENTS = {
    disk: DiskFraction,
    square: SquareFraction,
    rectangle: RectangleFraction,
    house: HouseFraction,
};

export default function Piece({
    shape,
    denominator,
    orientation = "vertical",
    startAngle = 0,
    index = 0,
    proportions = {},
    scale = 1,
    initialPosition = { x: 0, y: 0 },
    initialRotation = 0,
    onTransform,
}) {
    const [position, setPosition] = useState(initialPosition);
    const [rotation, setRotation] = useState(initialRotation);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const pieceRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0 });

    // Rotation adaptée selon la forme
    const rotationStep = shape === "disk" ? 360 / denominator : 90;
    const showFlipButton = shape !== "disk";

    const handlePointerDown = (e) => {
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;

        const newPosition = {
            x: e.clientX - dragStartRef.current.x,
            y: e.clientY - dragStartRef.current.y,
        };
        setPosition(newPosition);
        onTransform?.({ position: newPosition, rotation, isFlipped });
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);
    };

    const handleRotate = (e) => {
        e.stopPropagation();
        const newRotation = (rotation + rotationStep) % 360;
        setRotation(newRotation);
        onTransform?.({ position, rotation: newRotation, isFlipped });
    };

    const handleFlip = (e) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
        onTransform?.({ position, rotation, isFlipped: !isFlipped });
    };

    const FractionComponent = FRACTION_COMPONENTS[shape];

    return (
        <div
            ref={pieceRef}
            className="absolute cursor-move touch-none select-none"
            style={{
                transform: `translate(${position.x}px, ${position.y}px) 
                    rotate(${rotation}deg) 
                    scaleX(${isFlipped ? -1 : 1})
                    scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.2s ease",
                zIndex: isDragging ? 50 : 10,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <FractionComponent
                denominator={denominator}
                orientation={orientation}
                startAngle={startAngle}
                index={index}
                proportions={proportions}
            />

            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                    onClick={handleRotate}
                    className="w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-transform text-xl font-bold shadow-lg"
                    aria-label="Pivoter"
                >
                    ↻
                </button>
                {showFlipButton && (
                    <button
                        onClick={handleFlip}
                        className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition-transform text-xl font-bold shadow-lg"
                        aria-label="Retourner"
                    >
                        ⇄
                    </button>
                )}
            </div>
        </div>
    );
}
