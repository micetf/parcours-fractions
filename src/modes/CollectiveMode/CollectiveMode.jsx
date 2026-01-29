import { useState } from "react";
import FigureSelector from "./FigureSelector";
import ManipulationZone from "./ManipulationZone";

export default function CollectiveMode() {
    const [currentConfig, setCurrentConfig] = useState(null);

    return (
        <div className="max-w-6xl mx-auto px-6">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Mode Collectif - Démonstration
                </h1>
                <p className="text-gray-600">
                    Configurez la figure et manipulez les morceaux devant la
                    classe
                </p>
            </header>

            <FigureSelector onConfigChange={setCurrentConfig} />

            {currentConfig && (
                <div className="mt-8">
                    <ManipulationZone config={currentConfig} />
                </div>
            )}
        </div>
    );
}
