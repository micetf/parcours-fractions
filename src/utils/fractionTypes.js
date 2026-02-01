/**
 * Configuration des types de fractionnements pour chaque figure
 * Chaque fraction peut avoir plusieurs représentations géométriques UNIES
 */

export const SQUARE_SPLITTING_TYPES = {
    // 1/2 : 2 types possibles
    2: [
        {
            id: "vertical-rectangles",
            component: "SquareFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "diagonal-triangles",
            component: "SquareDiagonalFraction",
            props: {},
        },
    ],

    // 1/4 : 4 types possibles
    4: [
        {
            id: "vertical-rectangles",
            component: "SquareFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "corner-triangles",
            component: "SquareCornerTriangleFraction",
            props: {},
        },
        {
            id: "quarter-squares",
            component: "SquareQuarterSquareFraction",
            props: {},
        },
        {
            id: "cross-triangles",
            component: "SquareCrossFraction",
            props: {},
        },
    ],

    // 1/8 : 4 types
    8: [
        {
            id: "vertical-rectangles",
            component: "SquareFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "isosceles-triangles",
            component: "SquareIsoscelesTriangleFraction",
            props: {},
        },
        {
            id: "thin-rectangle-triangles",
            component: "SquareRectangleThin8thFraction",
            props: {},
        },
        {
            id: "half-quarter-rectangles",
            component: "SquareHalfRectangle8thFraction",
            props: {},
        },
    ],
};

export const RECTANGLE_SPLITTING_TYPES = {
    // 1/2 : 4 types possibles (rectangles + diagonal + L)
    2: [
        {
            id: "vertical-rectangles",
            component: "RectangleFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "horizontal-rectangles",
            component: "RectangleFraction",
            props: { orientation: "horizontal" },
        },
        {
            id: "diagonal-triangles",
            component: "RectangleDiagonalFraction",
            props: {},
        },
        {
            id: "l-shape",
            component: "RectangleLShapeFraction",
            props: {},
        },
    ],

    // 1/4 : 6 types possibles (rectangles + triangles + grille + L)
    4: [
        {
            id: "vertical-rectangles",
            component: "RectangleFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "horizontal-rectangles",
            component: "RectangleFraction",
            props: { orientation: "horizontal" },
        },
        {
            id: "quarter-median",
            component: "RectangleQuarterMedianFraction",
            props: {},
        },
        {
            id: "quarter-quadrant",
            component: "RectangleQuarterQuadrantFraction",
            props: {},
        },
        {
            id: "quarter-grid",
            component: "RectangleQuarterRectangleFraction",
            props: {},
        },
        {
            id: "quarter-l-shape",
            component: "RectangleQuarterLShapeFraction",
            props: {},
        },
    ],

    // 1/8 : 5 types (rectangles + grille chocolat + triangles + petits L)
    8: [
        {
            id: "vertical-rectangles",
            component: "RectangleFraction",
            props: { orientation: "vertical" },
        },
        {
            id: "horizontal-rectangles",
            component: "RectangleFraction",
            props: { orientation: "horizontal" },
        },
        {
            id: "chocolate-grid",
            component: "RectangleEighthChocolateFraction",
            props: {},
        },
        {
            id: "half-triangles",
            component: "RectangleEighthHalfTriangleFraction",
            props: {},
        },
        {
            id: "small-l-shapes",
            component: "RectangleEighthSmallLShapeFraction",
            props: {},
        },
    ],
};

export const DISK_SPLITTING_TYPES = {
    // Disque : uniquement secteurs
    2: [{ id: "sectors", component: "DiskFraction", props: {} }],
    3: [{ id: "sectors", component: "DiskFraction", props: {} }],
    4: [{ id: "sectors", component: "DiskFraction", props: {} }],
    8: [{ id: "sectors", component: "DiskFraction", props: {} }],
};

export const HOUSE_SPLITTING_TYPES = {
    // 1/5 : Toit complet (triangle) + 4 rectangles verticaux
    5: [
        {
            id: "roof-and-base",
            component: "HouseFifthFraction",
            props: {},
        },
    ],

    // 1/10 : 2 demi-toits (triangles rectangles) + 8 rectangles verticaux
    10: [
        {
            id: "half-roofs",
            component: "HouseTenthFraction",
            props: {},
        },
    ],
};

/**
 * Récupère un type de fractionnement aléatoire pour une figure et un dénominateur
 */
export function getRandomSplittingType(figure, denominator) {
    let types;

    switch (figure) {
        case "square":
            types = SQUARE_SPLITTING_TYPES[denominator];
            break;
        case "rectangle":
            types = RECTANGLE_SPLITTING_TYPES[denominator];
            break;
        case "disk":
            types = DISK_SPLITTING_TYPES[denominator];
            break;
        case "house":
            types = HOUSE_SPLITTING_TYPES[denominator];
            break;
        default:
            return null;
    }

    if (!types || types.length === 0) return null;

    return types[Math.floor(Math.random() * types.length)];
}
