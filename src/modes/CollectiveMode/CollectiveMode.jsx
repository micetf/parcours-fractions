import { useState } from "react";
import FigureSelector from "./FigureSelector";
import ManipulationZone from "./ManipulationZone";

export default function CollectiveMode() {
    const [demoConfig, setDemoConfig] = useState(null);

    const handleGenerate = (config) => {
        setDemoConfig(config);
    };

    const handleReset = () => {
        if (confirm("Réinitialiser la démonstration ?")) {
            setDemoConfig(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Mode Collectif - Démonstration
                </h1>
                <p className="text-gray-600">
                    Sélectionnez une figure et un fractionnement pour manipuler
                    devant la classe
                </p>
            </header>

            {/* Sélecteur de configuration */}
            <FigureSelector
                onGenerate={handleGenerate}
                currentConfig={demoConfig}
            />

            {/* Zone de manipulation */}
            {demoConfig && (
                <div className="mt-8">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Réinitialiser
                        </button>
                    </div>
                    <ManipulationZone config={demoConfig} />
                </div>
            )}
        </div>
    );
}
