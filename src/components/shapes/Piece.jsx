import { useState, useRef, useEffect } from "react";
import {
    DiskFraction,
    SquareFraction,
    SquareDiagonalFraction,
    SquareCornerTriangleFraction,
    SquareQuarterSquareFraction,
    SquareCrossFraction,
    SquareIsoscelesTriangleFraction,
    SquareRectangleThin8thFraction,
    SquareHalfRectangle8thFraction,
    RectangleFraction,
    HouseFraction,
} from "./fractions";

const FRACTION_COMPONENTS = {
    DiskFraction,
    SquareFraction,
    SquareDiagonalFraction,
    SquareCornerTriangleFraction,
    SquareQuarterSquareFraction,
    SquareCrossFraction,
    SquareIsoscelesTriangleFraction,
    SquareRectangleThin8thFraction,
    SquareHalfRectangle8thFraction,
    RectangleFraction,
    HouseFraction,
};

export default function Piece({
    shape,
    denominator,
    orientation = "vertical",
    startAngle = 0,
    index = 0,
    proportions = {},
    scale = 1,
    position = { x: 0, y: 0 },
    rotation = 0,
    isFlipped = false,
    onPositionChange,
    splittingType = null,
    collectiveMode = false,
    onSelect = null,
    pieceId = null,
    isSelected = false,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    const pieceRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const inactivityTimerRef = useRef(null);

    const resetInactivityTimer = () => {
        if (collectiveMode) return;

        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            if (onSelect) {
                onSelect(null);
            }
        }, 3000);
    };

    useEffect(() => {
        return () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isRotating) {
            const timer = setTimeout(() => setIsRotating(false), 100);
            return () => clearTimeout(timer);
        }
    }, [isRotating]);

    const handlePointerDown = (e) => {
        e.stopPropagation();

        if (onSelect) {
            onSelect(pieceId || `${shape}-${index}`);
        }

        setIsDragging(true);
        resetInactivityTimer();

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

        if (onPositionChange) {
            onPositionChange(newPosition);
        }

        resetInactivityTimer();
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);
        resetInactivityTimer();
    };

    let FractionComponent;
    if (splittingType && splittingType.component) {
        FractionComponent = FRACTION_COMPONENTS[splittingType.component];
    } else {
        const legacyMapping = {
            disk: DiskFraction,
            square: SquareFraction,
            rectangle: RectangleFraction,
            house: HouseFraction,
        };
        FractionComponent = legacyMapping[shape];
    }

    return (
        <div
            ref={pieceRef}
            className="absolute cursor-move touch-none select-none group"
            style={{
                transform: `translate(${position.x}px, ${position.y}px) 
                    rotate(${rotation}deg) 
                    scaleX(${isFlipped ? -1 : 1})
                    scale(${scale})`,
                transition:
                    isDragging || isRotating ? "none" : "transform 0.2s ease",
                zIndex: isDragging || isSelected ? 50 : 10,
                pointerEvents: "none",
                // ✨ NOUVEAU : Filtre drop-shadow qui suit la forme
                filter: isSelected
                    ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.4))"
                    : "none",
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
                {...(splittingType?.props || {})}
            />
        </div>
    );
}
