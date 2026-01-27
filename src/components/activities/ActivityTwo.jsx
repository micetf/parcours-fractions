import { useState } from "react";
import { Disk, Square, Rectangle, House } from "../shapes/figures";
import Piece from "../shapes/Piece";

const FIGURE_COMPONENTS = {
    disk: Disk,
    square: Square,
    rectangle: Rectangle,
    house: House,
};

export default function ActivityTwo({ exercise, onComplete }) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        onePiece: "",
        howMany: "",
        needed: "",
        missing: "",
    });
    const [isCorrect, setIsCorrect] = useState(null);

    const FigureComponent = FIGURE_COMPONENTS[exercise.figure];
    const totalPieces = exercise.fraction.denominator;
    const givenPieces = exercise.givenPieces;
    const missingPieces = totalPieces - givenPieces;

    const handleAnswer = (field, value) => {
        setAnswers({ ...answers, [field]: value });
        setIsCorrect(null);
    };

    const validateStep = () => {
        let correct = false;

        switch (step) {
            case 1:
                correct = answers.onePiece === exercise.fraction.name;
                break;
            case 2:
                correct = parseInt(answers.howMany) === givenPieces;
                break;
            case 3:
                correct = parseInt(answers.needed) === totalPieces;
                break;
            case 4:
                correct = parseInt(answers.missing) === missingPieces;
                break;
        }

        setIsCorrect(correct);

        if (correct) {
            setTimeout(() => {
                if (step < 4) {
                    setStep(step + 1);
                    setIsCorrect(null);
                } else {
                    onComplete?.();
                }
            }, 1000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Observe les morceaux
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <div className="flex justify-around items-start gap-8">
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

                    <div className="text-center">
                        <p className="text-lg font-semibold mb-4 text-gray-700">
                            Morceaux donnés :
                        </p>
                        <div
                            className="relative"
                            style={{ width: 400, height: 300 }}
                        >
                            {exercise.piecesData?.map((pieceData, i) => (
                                <Piece
                                    key={i}
                                    shape={exercise.figure}
                                    denominator={exercise.fraction.denominator}
                                    orientation={exercise.divisionOrientation}
                                    startAngle={pieceData.startAngle}
                                    index={pieceData.index}
                                    initialPosition={pieceData.position}
                                    initialRotation={pieceData.rotation}
                                    proportions={exercise.proportions || {}}
                                    scale={exercise.scale || 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
                {step >= 1 && (
                    <div className={`mb-6 ${step > 1 ? "opacity-50" : ""}`}>
                        <p className="text-xl mb-4 text-gray-800">
                            <span className="font-bold text-primary">
                                Question 1 :
                            </span>{" "}
                            Que représente un de ces morceaux ?
                        </p>
                        {step === 1 ? (
                            <select
                                value={answers.onePiece}
                                onChange={(e) =>
                                    handleAnswer("onePiece", e.target.value)
                                }
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none"
                            >
                                <option value="">-- choisir --</option>
                                <option value="demi">un demi</option>
                                <option value="tiers">un tiers</option>
                                <option value="quart">un quart</option>
                                <option value="cinquième">un cinquième</option>
                                <option value="huitième">un huitième</option>
                                <option value="dixième">un dixième</option>
                            </select>
                        ) : (
                            <p className="text-lg text-green-700 font-semibold">
                                ✓ C'est un {answers.onePiece}
                            </p>
                        )}
                    </div>
                )}

                {step >= 2 && (
                    <div className={`mb-6 ${step > 2 ? "opacity-50" : ""}`}>
                        <p className="text-xl mb-4 text-gray-800">
                            <span className="font-bold text-primary">
                                Question 2 :
                            </span>{" "}
                            Combien de morceaux a-t-on ?
                        </p>
                        {step === 2 ? (
                            <div className="flex items-center gap-3 text-lg">
                                <span>On a</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={answers.howMany}
                                    onChange={(e) =>
                                        handleAnswer("howMany", e.target.value)
                                    }
                                    className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold focus:border-blue-500 focus:outline-none"
                                />
                                <span>{exercise.fraction.plural}</span>
                            </div>
                        ) : (
                            <p className="text-lg text-green-700 font-semibold">
                                ✓ On a {answers.howMany}{" "}
                                {exercise.fraction.plural}
                            </p>
                        )}
                    </div>
                )}

                {step >= 3 && (
                    <div className={`mb-6 ${step > 3 ? "opacity-50" : ""}`}>
                        <p className="text-xl mb-4 text-gray-800">
                            <span className="font-bold text-primary">
                                Question 3 :
                            </span>{" "}
                            Combien de {exercise.fraction.plural} faut-il pour
                            faire la figure ?
                        </p>
                        {step === 3 ? (
                            <div className="flex items-center gap-3 text-lg">
                                <span>Il faut</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={answers.needed}
                                    onChange={(e) =>
                                        handleAnswer("needed", e.target.value)
                                    }
                                    className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold focus:border-blue-500 focus:outline-none"
                                />
                                <span>{exercise.fraction.plural}</span>
                            </div>
                        ) : (
                            <p className="text-lg text-green-700 font-semibold">
                                ✓ Il faut {answers.needed}{" "}
                                {exercise.fraction.plural}
                            </p>
                        )}
                    </div>
                )}

                {step >= 4 && (
                    <div className="mb-6">
                        <p className="text-xl mb-4 text-gray-800">
                            <span className="font-bold text-primary">
                                Question 4 :
                            </span>{" "}
                            Combien de morceaux manque-t-il pour faire la figure
                            ?
                        </p>
                        <div className="flex items-center gap-3 text-lg">
                            <span>Il manque</span>
                            <input
                                type="number"
                                min="0"
                                max="20"
                                value={answers.missing}
                                onChange={(e) =>
                                    handleAnswer("missing", e.target.value)
                                }
                                className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold focus:border-blue-500 focus:outline-none"
                            />
                            <span>{exercise.fraction.plural}</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={validateStep}
                    disabled={
                        (step === 1 && !answers.onePiece) ||
                        (step === 2 && !answers.howMany) ||
                        (step === 3 && !answers.needed) ||
                        (step === 4 && !answers.missing)
                    }
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
                        {isCorrect ? "✓ Bravo !" : "✗ Réessaie"}
                    </div>
                )}
            </div>
        </div>
    );
}
