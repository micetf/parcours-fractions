import { useState } from "react";
import {
    Disk,
    Square,
    Rectangle,
    House,
} from "../../components/shapes/figures";
import Piece from "../../components/shapes/Piece";

const FIGURE_COMPONENTS = {
    disk: Disk,
    square: Square,
    rectangle: Rectangle,
    house: House,
};

export default function ManipulationZone({ config }) {
    const [pieces, setPieces] = useState(() => {
        // Initialiser les morceaux avec positions aléatoires
        return Array.from({ length: config.pieceCount }).map((_, i) => ({
            id: `piece-${i}`,
            position: {
                x: 100 + (i % 3) * 120,
                y: 100 + Math.floor(i / 3) * 150,
            },
            rotation: 0,
            isFlipped: false,
            isSnapped: false, // Pour le système de clippage
            snapPosition: null,
        }));
    });

    const FigureComponent = FIGURE_COMPONENTS[config.figure];

    const handlePieceTransform = (pieceId, transform) => {
        setPieces((prev) =>
            prev.map((piece) =>
                piece.id === pieceId
                    ? {
                          ...piece,
                          position: transform.position,
                          rotation: transform.rotation,
                          isFlipped: transform.isFlipped,
                      }
                    : piece
            )
        );
    };

    const handleAddPiece = () => {
        const newPiece = {
            id: `piece-${Date.now()}`,
            position: { x: 200, y: 200 },
            rotation: 0,
            isFlipped: false,
            isSnapped: false,
            snapPosition: null,
        };
        setPieces([...pieces, newPiece]);
    };

    const handleRemovePiece = () => {
        if (pieces.length > 0) {
            setPieces(pieces.slice(0, -1));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Contrôles d'ajout/retrait */}
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
                <div className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg">
                    {pieces.length} morceau{pieces.length > 1 ? "x" : ""}
                </div>
            </div>

            {/* Zone de travail */}
            <div className="flex justify-around items-start gap-8">
                {/* Figure de référence */}
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
                    <p className="mt-4 text-gray-600">
                        <span className="font-semibold">Fraction :</span> 1/
                        {config.denominator} ({config.fractionName})
                    </p>
                </div>

                {/* Zone de manipulation */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                        Morceaux à manipuler
                    </h3>
                    <div
                        className="relative bg-amber-50 rounded-lg border-2 border-dashed border-amber-300"
                        style={{ width: "600px", height: "500px" }}
                    >
                        {pieces.map((piece, index) => (
                            <Piece
                                key={piece.id}
                                shape={config.figure}
                                denominator={config.denominator}
                                orientation={config.divisionOrientation}
                                startAngle={0}
                                index={index % config.denominator}
                                initialPosition={piece.position}
                                initialRotation={piece.rotation}
                                proportions={config.proportions || {}}
                                scale={config.scale || 1}
                                splittingType={config.splittingType}
                                onTransform={(transform) =>
                                    handlePieceTransform(piece.id, transform)
                                }
                                collectiveMode={true} // Désactiver le timer de désélection
                            />
                        ))}

                        {/* Indicateur si aucun morceau */}
                        {pieces.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
                                Cliquez sur "Ajouter un morceau" pour commencer
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Aide pédagogique */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                    💡 Questions suggérées :
                </h4>
                <ul className="space-y-1 text-gray-700">
                    <li>
                        • Que représente un de ces morceaux pour la figure ?
                    </li>
                    <li>
                        • Combien de morceaux a-t-on ? On a {pieces.length}{" "}
                        {config.fractionPlural}
                    </li>
                    <li>
                        • Combien de {config.fractionPlural} faut-il pour faire
                        le {config.figureName} complet ?
                    </li>
                    <li>
                        • Combien de morceaux manque-t-il ? Il manque{" "}
                        {Math.max(0, config.denominator - pieces.length)}{" "}
                        {config.fractionPlural}
                    </li>
                </ul>
            </div>
        </div>
    );
}
