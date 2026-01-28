import { useState } from "react";
import { FIGURE_NAMES } from "../../utils/fractionConfig";
import {
    SQUARE_SPLITTING_TYPES,
    RECTANGLE_SPLITTING_TYPES,
    DISK_SPLITTING_TYPES,
} from "../../utils/fractionTypes";

// Mapping des types de fractionnements par figure
const SPLITTING_CONFIG = {
    square: SQUARE_SPLITTING_TYPES,
    rectangle: RECTANGLE_SPLITTING_TYPES,
    disk: DISK_SPLITTING_TYPES,
    house: {
        5: [{ id: "default", component: "HouseFraction", props: {} }],
        10: [{ id: "default", component: "HouseFraction", props: {} }],
    },
};

// Noms lisibles des fractionnements
const SPLITTING_NAMES = {
    "vertical-rectangles": "Rectangles verticaux",
    "horizontal-rectangles": "Rectangles horizontaux",
    "diagonal-triangles": "Triangles diagonaux",
    "corner-triangles": "Triangles coins",
    "quarter-squares": "Petits carrés",
    "cross-triangles": "Triangles croix",
    "isosceles-triangles": "Triangles isocèles",
    "thin-rectangle-triangles": "Triangles rectangles minces",
    sectors: "Secteurs",
    default: "Standard",
};

// Noms des fractions
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

export default function FigureSelector({ onGenerate, currentConfig }) {
    const [selectedFigure, setSelectedFigure] = useState("square");
    const [selectedDenominator, setSelectedDenominator] = useState(2);
    const [selectedSplittingType, setSelectedSplittingType] = useState(null);
    const [pieceCount, setPieceCount] = useState(1);

    // Obtenir les dénominateurs disponibles pour la figure sélectionnée
    const availableDenominators = Object.keys(
        SPLITTING_CONFIG[selectedFigure] || {}
    ).map(Number);

    // Obtenir les types de fractionnements disponibles pour le dénominateur sélectionné
    const availableSplittingTypes =
        SPLITTING_CONFIG[selectedFigure]?.[selectedDenominator] || [];

    // Initialiser le type de fractionnement si pas encore sélectionné
    if (selectedSplittingType === null && availableSplittingTypes.length > 0) {
        setSelectedSplittingType(availableSplittingTypes[0]);
    }

    const handleFigureChange = (figure) => {
        setSelectedFigure(figure);
        // Réinitialiser les sélections dépendantes
        const newDenominators = Object.keys(SPLITTING_CONFIG[figure] || {}).map(
            Number
        );
        if (newDenominators.length > 0) {
            setSelectedDenominator(newDenominators[0]);
        }
        setSelectedSplittingType(null);
    };

    const handleDenominatorChange = (denom) => {
        setSelectedDenominator(Number(denom));
        setSelectedSplittingType(null);
    };

    const handleGenerate = () => {
        if (!selectedSplittingType) {
            alert("Veuillez sélectionner un type de fractionnement");
            return;
        }

        const config = {
            figure: selectedFigure,
            figureName: FIGURE_NAMES[selectedFigure],
            denominator: selectedDenominator,
            fractionName: FRACTION_NAMES[selectedDenominator],
            fractionPlural: FRACTION_PLURALS[selectedDenominator],
            splittingType: selectedSplittingType,
            pieceCount: pieceCount,
            // Variations visuelles par défaut
            figureRotation: 0,
            proportions:
                selectedFigure === "rectangle"
                    ? { width: 1, height: 1.6 }
                    : selectedFigure === "house"
                      ? { roofHeight: 0.5 }
                      : {},
            scale: 1,
            divisionOrientation: "vertical",
        };

        onGenerate(config);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Configuration de la démonstration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sélection de la figure */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Figure
                    </label>
                    <select
                        value={selectedFigure}
                        onChange={(e) => handleFigureChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    >
                        <option value="square">Carré</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="disk">Disque</option>
                        <option value="house">Maison</option>
                    </select>
                </div>

                {/* Sélection du dénominateur */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fraction
                    </label>
                    <select
                        value={selectedDenominator}
                        onChange={(e) =>
                            handleDenominatorChange(e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    >
                        {availableDenominators.map((denom) => (
                            <option key={denom} value={denom}>
                                1/{denom} ({FRACTION_NAMES[denom]})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélection du type de fractionnement */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Type de fractionnement
                    </label>
                    <select
                        value={selectedSplittingType?.id || ""}
                        onChange={(e) => {
                            const type = availableSplittingTypes.find(
                                (t) => t.id === e.target.value
                            );
                            setSelectedSplittingType(type);
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    >
                        {availableSplittingTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {SPLITTING_NAMES[type.id] || type.id}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Nombre de morceaux */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre de morceaux
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={pieceCount}
                        onChange={(e) =>
                            setPieceCount(Math.max(1, Number(e.target.value)))
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold text-center focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Bouton de génération */}
            <div className="mt-6">
                <button
                    onClick={handleGenerate}
                    className="w-full py-4 bg-blue-500 text-white text-xl font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
                >
                    Générer la démonstration
                </button>
            </div>

            {/* Aperçu de la configuration */}
            {currentConfig && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">
                            Configuration actuelle :
                        </span>{" "}
                        {currentConfig.pieceCount} morceau
                        {currentConfig.pieceCount > 1 ? "x" : ""} de{" "}
                        {currentConfig.figureName} en{" "}
                        {SPLITTING_NAMES[currentConfig.splittingType.id]}
                    </p>
                </div>
            )}
        </div>
    );
}
