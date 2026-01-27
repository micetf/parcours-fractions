export const PROGRESSION_EDUSCOL = {
    CE1: {
        figures: ["disk"],
        fractions: {
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
        },
    },
    CE2: {
        figures: ["disk", "square", "rectangle"],
        fractions: {
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
                { denominator: 3, name: "tiers", plural: "tiers" },
            ],
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
                { denominator: 3, name: "tiers", plural: "tiers" },
            ],
        },
    },
    CM1: {
        figures: ["disk", "square", "rectangle", "house"],
        fractions: {
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
                { denominator: 3, name: "tiers", plural: "tiers" },
            ],
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
                { denominator: 3, name: "tiers", plural: "tiers" },
            ],
            house: [
                { denominator: 5, name: "cinquième", plural: "cinquièmes" },
                { denominator: 10, name: "dixième", plural: "dixièmes" },
            ],
        },
    },
};

export const FIGURE_NAMES = {
    disk: "disque",
    square: "carré",
    rectangle: "rectangle",
    house: "maison",
};
