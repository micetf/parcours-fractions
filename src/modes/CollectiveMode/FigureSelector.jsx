import { useState, useEffect } from "react";
import { FIGURE_NAMES } from "../../utils/fractionConfig";
import {
    SQUARE_SPLITTING_TYPES,
    RECTANGLE_SPLITTING_TYPES,
    DISK_SPLITTING_TYPES,
} from "../../utils/fractionTypes";

const SPLITTING_CONFIG = {
    square: SQUARE_SPLITTING_TYPES,
    rectangle: RECTANGLE_SPLITTING_TYPES,
    disk: DISK_SPLITTING_TYPES,
    house: {
        5: [{ id: "default", component: "HouseFraction", props: {} }],
        10: [{ id: "default", component: "HouseFraction", props: {} }],
    },
};

const SPLITTING_NAMES = {
    "vertical-rectangles": "Rectangles verticaux",
    "horizontal-rectangles": "Rectangles horizontaux",
    "diagonal-triangles": "Triangles diagonaux",
    "corner-triangles": "Triangles coins",
    "quarter-squares": "Petits carrés",
    "cross-triangles": "Triangles croix",
    "isosceles-triangles": "Triangles isocèles",
    "thin-rectangle-triangles": "Triangles rectangles minces",
    "half-quarter-rectangles": "Rectangles demi-quart",
    "quarter-median": "Triangle sur toute la largeur",
    "quarter-quadrant": "Triangle sur demi-largeur",
    sectors: "Secteurs",
    default: "Standard",
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

export default function FigureSelector({ onConfigChange }) {
    const [selectedFigure, setSelectedFigure] = useState("square");
    const [selectedDenominator, setSelectedDenominator] = useState(2);
    const [selectedSplittingType, setSelectedSplittingType] = useState(null);
    const [showTeacherInfo, setShowTeacherInfo] = useState(false);

    const availableDenominators = Object.keys(
        SPLITTING_CONFIG[selectedFigure] || {}
    ).map(Number);

    const availableSplittingTypes =
        SPLITTING_CONFIG[selectedFigure]?.[selectedDenominator] || [];

    if (selectedSplittingType === null && availableSplittingTypes.length > 0) {
        setSelectedSplittingType(availableSplittingTypes[0]);
    }

    const handleFigureChange = (figure) => {
        setSelectedFigure(figure);
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

    useEffect(() => {
        if (!selectedSplittingType) return;

        const config = {
            figure: selectedFigure,
            figureName: FIGURE_NAMES[selectedFigure],
            denominator: selectedDenominator,
            splittingType: selectedSplittingType,
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

        onConfigChange(config);
    }, [
        selectedFigure,
        selectedDenominator,
        selectedSplittingType,
        onConfigChange,
    ]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Configuration de la démonstration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fractionnement
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
                                En {denom} parties
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Type de découpe
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
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">
                            📋 Info enseignant
                        </span>
                        {showTeacherInfo && (
                            <span>
                                {" "}
                                : Fraction 1/{selectedDenominator} (
                                {FRACTION_NAMES[selectedDenominator]})
                            </span>
                        )}
                    </p>
                    <button
                        onClick={() => setShowTeacherInfo(!showTeacherInfo)}
                        className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-gray-800 text-sm font-semibold rounded transition-colors"
                    >
                        {showTeacherInfo ? "👁️ Masquer" : "👁️‍🗨️ Afficher"}
                    </button>
                </div>
            </div>
        </div>
    );
}
