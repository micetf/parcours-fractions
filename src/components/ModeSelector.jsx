export default function ModeSelector({ currentMode, onModeChange }) {
    const modes = [
        {
            id: "autonomous",
            name: "Mode Autonome",
            icon: "🎯",
            description: "Parcours EDUSCOL préétabli",
        },
        {
            id: "collective",
            name: "Mode Collectif",
            icon: "👨‍🏫",
            description: "Démonstration enseignant",
        },
        {
            id: "guided",
            name: "Mode Guidé",
            icon: "📝",
            description: "Parcours personnalisé",
            disabled: true, // À venir
        },
    ];

    return (
        <div className="max-w-4xl mx-auto mb-6 px-6">
            <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex gap-3">
                    {modes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() =>
                                !mode.disabled && onModeChange(mode.id)
                            }
                            disabled={mode.disabled}
                            className={`flex-1 p-4 rounded-lg transition-all ${
                                currentMode === mode.id
                                    ? "bg-blue-500 text-white shadow-lg scale-105"
                                    : mode.disabled
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md"
                            }`}
                        >
                            <div className="text-3xl mb-2">{mode.icon}</div>
                            <div className="font-bold text-lg mb-1">
                                {mode.name}
                            </div>
                            <div className="text-sm opacity-80">
                                {mode.description}
                            </div>
                            {mode.disabled && (
                                <div className="text-xs mt-2 italic">
                                    Bientôt disponible
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
