import { PROGRESSION_EDUSCOL } from "../utils/fractionConfig";

function randomRotation() {
    const rotations = [0, 90, 180, 270];
    return rotations[Math.floor(Math.random() * rotations.length)];
}

function randomDivisionOrientation() {
    return Math.random() > 0.5 ? "horizontal" : "vertical";
}

function randomScale() {
    return 0.8 + Math.random() * 0.4;
}

function randomProportions(figure) {
    if (figure === "rectangle") {
        return { width: 1, height: 1.5 + Math.random() };
    }
    if (figure === "house") {
        return { roofHeight: 0.4 + Math.random() * 0.3 };
    }
    return {};
}

function randomStartAngle() {
    return Math.floor(Math.random() * 360);
}

function randomPieceIndex(denominator) {
    return Math.floor(Math.random() * denominator);
}

export function generateProgression(level = "CE2") {
    const config = PROGRESSION_EDUSCOL[level];
    const exercises = [];

    config.figures.forEach((figure) => {
        config.fractions[figure]?.forEach((fraction) => {
            const figureRotation = randomRotation();
            const proportions = randomProportions(figure);
            const scale = randomScale();
            const divisionOrientation = randomDivisionOrientation();

            // Activité 1
            const startAngle = figure === "disk" ? randomStartAngle() : 0;
            const pieceIndex =
                figure !== "disk" ? randomPieceIndex(fraction.denominator) : 0;
            const pieceRotation =
                figure === "disk" ? randomStartAngle() : randomRotation();

            exercises.push({
                id: `${figure}-${fraction.denominator}-act1-${Math.random()}`,
                figure,
                fraction,
                activity: 1,
                figureRotation,
                pieceRotation,
                divisionOrientation,
                proportions,
                scale,
                startAngle,
                pieceIndex,
            });

            // Activité 2
            const givenPieces =
                Math.floor(Math.random() * (fraction.denominator - 1)) + 1;
            const piecesData = Array.from({ length: givenPieces }).map(
                (_, i) => {
                    const baseAngle =
                        figure === "disk" ? randomStartAngle() : 0;
                    const baseIndex =
                        figure !== "disk"
                            ? randomPieceIndex(fraction.denominator)
                            : i;
                    const rotation =
                        figure === "disk"
                            ? randomStartAngle()
                            : randomRotation();

                    return {
                        startAngle: baseAngle,
                        index: baseIndex,
                        position: {
                            x: 50 + (i % 3) * 80,
                            y: 50 + Math.floor(i / 3) * 100,
                        },
                        rotation,
                    };
                }
            );

            exercises.push({
                id: `${figure}-${fraction.denominator}-act2-${Math.random()}`,
                figure,
                fraction,
                activity: 2,
                givenPieces,
                figureRotation,
                divisionOrientation,
                proportions,
                scale,
                piecesData,
            });
        });
    });

    return exercises;
}
