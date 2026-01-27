import { useState } from "react";
import ActivityOne from "./components/activities/ActivityOne";
import ActivityTwo from "./components/activities/ActivityTwo";
import { generateProgression } from "./data/progression";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
    // Niveau fixe CE1 par défaut (non affiché à l'utilisateur)
    const defaultLevel = "CE1";

    const [exercises] = useState(() => generateProgression(defaultLevel));
    const [currentIndex, setCurrentIndex] = useLocalStorage(
        "fractions-index",
        0
    );

    const handleComplete = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            alert("Bravo ! Tu as terminé tous les exercices !");
            setCurrentIndex(0);
        }
    };

    const handleReset = () => {
        if (confirm("Recommencer depuis le début ?")) {
            setCurrentIndex(0);
        }
    };

    const currentExercise = exercises[currentIndex];
    const ActivityComponent =
        currentExercise.activity === 1 ? ActivityOne : ActivityTwo;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
            {/* Header */}
            <header className="max-w-4xl mx-auto mb-8 px-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Les Fractions
                </h1>

                {/* Progression */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>
                            Exercice {currentIndex + 1} / {exercises.length}
                        </span>
                        <span>Activité {currentExercise.activity}</span>
                        <span>
                            {Math.round(
                                ((currentIndex + 1) / exercises.length) * 100
                            )}
                            %
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-primary h-3 rounded-full transition-all duration-500"
                            style={{
                                width: `${((currentIndex + 1) / exercises.length) * 100}%`,
                            }}
                        />
                    </div>
                    <button
                        onClick={handleReset}
                        className="mt-3 text-sm text-gray-600 hover:text-gray-800 underline"
                    >
                        Recommencer
                    </button>
                </div>
            </header>

            {/* Activité */}
            <main>
                <ActivityComponent
                    key={currentExercise.id}
                    exercise={currentExercise}
                    onComplete={handleComplete}
                />
            </main>
        </div>
    );
}

export default App;
