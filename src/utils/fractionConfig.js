export const PROGRESSION_EDUSCOL = {
    CE1: {
        figures: ["square", "rectangle", "disk"],
        fractions: {
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 5, name: "cinquième", plural: "cinquièmes" },
            ],
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
            ],
        },
    },
    CE2: {
        figures: ["square", "rectangle", "disk"],
        fractions: {
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 5, name: "cinquième", plural: "cinquièmes" },
                { denominator: 6, name: "sixième", plural: "sixièmes" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
                { denominator: 10, name: "dixième", plural: "dixièmes" },
            ],
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
        },
    },
    CM1: {
        figures: ["square", "rectangle", "disk", "house"],
        fractions: {
            square: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            rectangle: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            disk: [
                { denominator: 2, name: "demi", plural: "demis" },
                { denominator: 3, name: "tiers", plural: "tiers" },
                { denominator: 4, name: "quart", plural: "quarts" },
                { denominator: 8, name: "huitième", plural: "huitièmes" },
            ],
            house: [
                { denominator: 5, name: "cinquième", plural: "cinquièmes" },
                { denominator: 10, name: "dixième", plural: "dixièmes" },
            ],
        },
    },
};

export const FIGURE_NAMES = {
    square: "carré",
    rectangle: "rectangle",
    disk: "disque",
    house: "maison",
};
