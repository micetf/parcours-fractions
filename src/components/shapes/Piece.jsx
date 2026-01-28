import { useState, useRef, useEffect } from "react";
import {
    DiskFraction,
    SquareFraction,
    SquareDiagonalFraction,
    SquareCornerTriangleFraction,
    SquareQuarterSquareFraction,
    SquareCrossFraction,
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
    initialPosition = { x: 0, y: 0 },
    initialRotation = 0,
    onTransform,
    splittingType = null,
    collectiveMode = false, // NOUVEAU : mode collectif
}) {
    const [position, setPosition] = useState(initialPosition);
    const [rotation, setRotation] = useState(initialRotation);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const pieceRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const inactivityTimerRef = useRef(null);

    // Rotation adaptée selon la forme
    const rotationStep = shape === "disk" ? 360 / denominator : 90;
    const showFlipButton = shape !== "disk";

    // Timer de désélection automatique (SAUF en mode collectif)
    const resetInactivityTimer = () => {
        if (collectiveMode) return; // Pas de timer en mode collectif

        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            setIsSelected(false);
        }, 3000);
    };

    // Nettoyer le timer au démontage
    useEffect(() => {
        return () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, []);

    const handlePointerDown = (e) => {
        if (e.target.closest("button")) return;

        setIsSelected(true);
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
        setPosition(newPosition);
        onTransform?.({ position: newPosition, rotation, isFlipped });
        resetInactivityTimer();
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);
        resetInactivityTimer();
    };

    const handleRotate = (e) => {
        e.stopPropagation();
        const newRotation = (rotation + rotationStep) % 360;
        setRotation(newRotation);
        onTransform?.({ position, rotation: newRotation, isFlipped });
        resetInactivityTimer();
    };

    const handleFlip = (e) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
        onTransform?.({ position, rotation, isFlipped: !isFlipped });
        resetInactivityTimer();
    };

    // Sélectionner le bon composant de fraction
    let FractionComponent;
    if (splittingType && splittingType.component) {
        FractionComponent = FRACTION_COMPONENTS[splittingType.component];
    } else {
        // Fallback vers l'ancien système
        const legacyMapping = {
            disk: DiskFraction,
            square: SquareFraction,
            rectangle: RectangleFraction,
            house: HouseFraction,
        };
        FractionComponent = legacyMapping[shape];
    }

    // Afficher les boutons si la pièce est sélectionnée, en drag, OU en mode collectif
    const showControls = isSelected || isDragging || collectiveMode;

    return (
        <div
            ref={pieceRef}
            className="absolute cursor-move touch-none select-none group"
            style={{
                transform: `translate(${position.x}px, ${position.y}px) 
                    rotate(${rotation}deg) 
                    scaleX(${isFlipped ? -1 : 1})
                    scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.2s ease",
                zIndex: isDragging || isSelected ? 50 : 10,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {/* Bordure de sélection */}
            {isSelected && (
                <div
                    className="absolute inset-0 border-4 border-blue-400 rounded-lg pointer-events-none animate-selection-pulse"
                    style={{
                        width: "200px",
                        height: "200px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}

            <FractionComponent
                denominator={denominator}
                orientation={orientation}
                startAngle={startAngle}
                index={index}
                proportions={proportions}
                {...(splittingType?.props || {})}
            />

            {/* Boutons de contrôle */}
            {showControls && (
                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-2 animate-controls-appear">
                    <button
                        onClick={handleRotate}
                        className="group/btn relative w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-all hover:scale-110 text-xl font-bold shadow-lg"
                        aria-label="Pivoter"
                    >
                        ↻
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                            Pivoter
                        </span>
                    </button>
                    {showFlipButton && (
                        <button
                            onClick={handleFlip}
                            className="group/btn relative w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition-all hover:scale-110 text-xl font-bold shadow-lg"
                            aria-label="Retourner"
                        >
                            ⇄
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                                Retourner
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
