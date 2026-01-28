export default function GlobalToolbar({
    isVisible,
    rotation,
    isFlipped,
    showFlipButton,
    onRotate,
    onFlip,
    position = "top-right",
}) {
    if (!isVisible) return null;

    const positionClasses = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    };

    return (
        <div
            className={`fixed ${positionClasses[position]} z-50 bg-white rounded-xl shadow-2xl p-4 border-2 border-blue-400 animate-controls-appear`}
        >
            <div className="flex flex-col gap-3">
                <div className="text-sm font-semibold text-gray-700 mb-2 pb-2 border-b border-gray-200">
                    Morceau sélectionné
                </div>

                <button
                    onClick={onRotate}
                    className="group/btn relative flex items-center gap-3 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-all text-lg font-bold shadow-lg"
                    aria-label="Pivoter"
                >
                    <span className="text-2xl">↻</span>
                    <span>Pivoter</span>
                </button>

                {showFlipButton && (
                    <button
                        onClick={onFlip}
                        className="group/btn relative flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition-all text-lg font-bold shadow-lg"
                        aria-label="Retourner"
                    >
                        <span className="text-2xl">⇄</span>
                        <span>Retourner</span>
                    </button>
                )}

                <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                    Rotation: {rotation % 360}°
                    {showFlipButton && (
                        <> • {isFlipped ? "Retourné" : "Normal"}</>
                    )}
                </div>
            </div>
        </div>
    );
}
