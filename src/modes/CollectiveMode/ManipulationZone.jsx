import { useState } from "react";
import {
    Disk,
    Square,
    Rectangle,
    House,
} from "../../components/shapes/figures";
import Piece from "../../components/shapes/Piece";
import GlobalToolbar from "../../components/shapes/GlobalToolbar";

const FIGURE_COMPONENTS = {
    disk: Disk,
    square: Square,
    rectangle: Rectangle,
    house: House,
};

const FRACTION_NAMES = {
    2: "demi",
    3: "tiers",
    4: "quart",
    5: "cinquième",
    6: "sixième",
    8: "huitième",
    10: "dixième",
};

const FRACTION_PLURALS = {
    2: "demis",
    3: "tiers",
    4: "quarts",
    5: "cinquièmes",
    6: "sixièmes",
    8: "huitièmes",
    10: "dixièmes",
};

export default function ManipulationZone({ config }) {
    const [pieces, setPieces] = useState([]);
    const [selectedPieceId, setSelectedPieceId] = useState(null);

    const FigureComponent = FIGURE_COMPONENTS[config.figure];

    const rotationStep =
        config.figure === "disk" ? 360 / config.denominator : 90;
    const showFlipButton = config.figure !== "disk";

    const selectedPiece = pieces.find((p) => p.id === selectedPieceId);

    const fractionName = FRACTION_NAMES[config.denominator];
    const fractionPlural = FRACTION_PLURALS[config.denominator];

    const handlePiecePositionChange = (pieceId, newPosition) => {
        setPieces((prev) =>
            prev.map((piece) =>
                piece.id === pieceId
                    ? { ...piece, position: newPosition }
                    : piece
            )
        );
    };

    const handleRotateSelected = () => {
        if (!selectedPieceId) return;

        setPieces((prev) =>
            prev.map((piece) =>
                piece.id === selectedPieceId
                    ? { ...piece, rotation: piece.rotation + rotationStep }
                    : piece
            )
        );
    };

    const handleFlipSelected = () => {
        if (!selectedPieceId) return;

        setPieces((prev) =>
            prev.map((piece) =>
                piece.id === selectedPieceId
                    ? { ...piece, isFlipped: !piece.isFlipped }
                    : piece
            )
        );
    };

    const handleAddPiece = () => {
        // ✅ CORRECTION : Position variée pour chaque nouveau morceau
        // Grille 3 colonnes avec espacement
        const col = pieces.length % 3;
        const row = Math.floor(pieces.length / 3);

        const newPiece = {
            id: `piece-${Date.now()}`,
            position: {
                x: 100 + col * 120, // Espacement horizontal 120px
                y: 100 + row * 120, // Espacement vertical 120px
            },
            rotation: 0,
            isFlipped: false,
        };
        setPieces([...pieces, newPiece]);
    };

    const handleRemovePiece = () => {
        if (pieces.length > 0) {
            const removedPieceId = pieces[pieces.length - 1].id;
            setPieces(pieces.slice(0, -1));
            if (selectedPieceId === removedPieceId) {
                setSelectedPieceId(null);
            }
        }
    };

    const handleRemoveAll = () => {
        if (pieces.length > 0 && confirm("Retirer tous les morceaux ?")) {
            setPieces([]);
            setSelectedPieceId(null);
        }
    };

    const handleContainerClick = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedPieceId(null);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={handleAddPiece}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                    ➕ Ajouter un morceau
                </button>
                <button
                    onClick={handleRemovePiece}
                    disabled={pieces.length === 0}
                    className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                    ➖ Retirer un morceau
                </button>
                <button
                    onClick={handleRemoveAll}
                    disabled={pieces.length === 0}
                    className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                    🗑️ Tout retirer
                </button>
                <div className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg">
                    {pieces.length} morceau{pieces.length > 1 ? "x" : ""}
                </div>
            </div>

            <div className="flex justify-around items-start gap-8">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Figure complète
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                        <div
                            style={{
                                transform: `scale(${config.scale || 1})`,
                            }}
                        >
                            <FigureComponent
                                size={200}
                                rotation={config.figureRotation || 0}
                                proportions={config.proportions || {}}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                        Morceaux à manipuler
                    </h3>
                    <div
                        className="relative bg-amber-50 rounded-lg border-2 border-dashed border-amber-300"
                        style={{ width: "600px", height: "500px" }}
                        onPointerDown={handleContainerClick}
                    >
                        {pieces.map((piece, index) => (
                            <Piece
                                key={piece.id}
                                pieceId={piece.id}
                                shape={config.figure}
                                denominator={config.denominator}
                                orientation={config.divisionOrientation}
                                startAngle={0}
                                index={index % config.denominator}
                                position={piece.position}
                                rotation={piece.rotation}
                                isFlipped={piece.isFlipped}
                                onPositionChange={(pos) =>
                                    handlePiecePositionChange(piece.id, pos)
                                }
                                proportions={config.proportions || {}}
                                scale={config.scale || 1}
                                splittingType={config.splittingType}
                                collectiveMode={true}
                                onSelect={setSelectedPieceId}
                                isSelected={selectedPieceId === piece.id}
                            />
                        ))}

                        {pieces.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg pointer-events-none">
                                Cliquez sur "Ajouter un morceau" pour commencer
                            </div>
                        )}

                        <GlobalToolbar
                            isVisible={!!selectedPieceId}
                            rotation={selectedPiece?.rotation || 0}
                            isFlipped={selectedPiece?.isFlipped || false}
                            showFlipButton={showFlipButton}
                            onRotate={handleRotateSelected}
                            onFlip={handleFlipSelected}
                            position="top-right"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                    💡 Questions suggérées (à poser oralement) :
                </h4>
                <ul className="space-y-1 text-gray-700">
                    <li>
                        • Que représente un de ces morceaux pour la figure ?
                    </li>
                    <li>
                        • Combien de morceaux a-t-on actuellement ?{" "}
                        <span className="font-semibold">({pieces.length})</span>
                    </li>
                    <li>
                        • Combien de morceaux identiques faut-il pour faire la
                        figure complète ?
                    </li>
                    <li>
                        • Combien de morceaux manque-t-il ?{" "}
                        <span className="font-semibold">
                            ({Math.max(0, config.denominator - pieces.length)})
                        </span>
                    </li>
                </ul>
            </div>

            <details className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <summary className="cursor-pointer font-semibold text-gray-800">
                    📋 Informations enseignant (ne pas projeter)
                </summary>
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p>
                        <span className="font-semibold">Fraction :</span> 1/
                        {config.denominator} (un {fractionName})
                    </p>
                    <p>
                        <span className="font-semibold">Pluriel :</span>{" "}
                        {fractionPlural}
                    </p>
                    <p>
                        <span className="font-semibold">
                            Total nécessaire :
                        </span>{" "}
                        {config.denominator} morceaux
                    </p>
                    <p>
                        <span className="font-semibold">
                            Actuellement affichés :
                        </span>{" "}
                        {pieces.length} morceau{pieces.length > 1 ? "x" : ""}
                    </p>
                    <p>
                        <span className="font-semibold">Manquants :</span>{" "}
                        {Math.max(0, config.denominator - pieces.length)}{" "}
                        morceau
                        {Math.max(0, config.denominator - pieces.length) > 1
                            ? "x"
                            : ""}
                    </p>
                </div>
            </details>
        </div>
    );
}
