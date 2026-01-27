import { useState } from "react";
import { Disk, Square, Rectangle, House } from "../shapes/figures";
import Piece from "../shapes/Piece";
import { FIGURE_NAMES } from "../../utils/fractionConfig";

const FIGURE_COMPONENTS = {
    disk: Disk,
    square: Square,
    rectangle: Rectangle,
    house: House,
};

export default function ActivityOne({ exercise, onComplete }) {
    const [answer, setAnswer] = useState("");
    const [fractionAnswer, setFractionAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);

    const FigureComponent = FIGURE_COMPONENTS[exercise.figure];
    const figureName = FIGURE_NAMES[exercise.figure];
    const correctAnswer = exercise.fraction.denominator;
    const correctFraction = exercise.fraction.name;

    const handleValidate = () => {
        const numAnswer = parseInt(answer);
        const correct =
            numAnswer === correctAnswer && fractionAnswer === correctFraction;
        setIsCorrect(correct);

        if (correct) {
            setTimeout(() => onComplete?.(), 1500);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Complète la phrase
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <div className="flex justify-around items-center gap-8">
                    <div className="text-center">
                        <p className="text-lg font-semibold mb-4 text-gray-700">
                            Figure complète :
                        </p>
                        <div
                            style={{
                                transform: `scale(${exercise.scale || 1})`,
                            }}
                        >
                            <FigureComponent
                                size={200}
                                rotation={exercise.figureRotation || 0}
                                proportions={exercise.proportions || {}}
                            />
                        </div>
                    </div>

                    <div className="text-center relative">
                        <p className="text-lg font-semibold mb-4 text-gray-700">
                            Morceau à manipuler :
                        </p>
                        <div
                            className="relative"
                            style={{ width: 300, height: 300 }}
                        >
                            <Piece
                                shape={exercise.figure}
                                denominator={exercise.fraction.denominator}
                                orientation={exercise.divisionOrientation}
                                startAngle={exercise.startAngle || 0}
                                index={exercise.pieceIndex || 0}
                                initialPosition={{ x: 50, y: 50 }}
                                initialRotation={exercise.pieceRotation || 0}
                                proportions={exercise.proportions || {}}
                                scale={exercise.scale || 1}
                                splittingType={exercise.splittingType} // ← AJOUTÉ
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-xl leading-relaxed text-gray-800">
                    <p className="mb-6">
                        Il faut{" "}
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold focus:border-blue-500 focus:outline-none"
                        />{" "}
                        morceau{answer > 1 ? "x" : ""} pour faire le{" "}
                        {figureName}.
                    </p>

                    <p className="mb-8">
                        C'est donc un{" "}
                        <select
                            value={fractionAnswer}
                            onChange={(e) => setFractionAnswer(e.target.value)}
                            className="px-4 py-2 border-2 border-gray-300 rounded-lg font-bold focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">-- choisir --</option>
                            <option value="demi">demi</option>
                            <option value="tiers">tiers</option>
                            <option value="quart">quart</option>
                            <option value="cinquième">cinquième</option>
                            <option value="huitième">huitième</option>
                            <option value="dixième">dixième</option>
                        </select>{" "}
                        du {figureName}.
                    </p>

                    <button
                        onClick={handleValidate}
                        disabled={!answer || !fractionAnswer}
                        className="w-full py-4 bg-primary text-white text-xl font-bold rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Valider
                    </button>

                    {isCorrect !== null && (
                        <div
                            className={`mt-6 p-4 rounded-xl text-center text-xl font-bold ${
                                isCorrect
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {isCorrect
                                ? "✓ Bravo ! C'est correct !"
                                : "✗ Réessaie encore"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
