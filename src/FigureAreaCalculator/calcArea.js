const { random } = Math;
const calcRandomNumberInRange = (min, max) => random() * (max - min) + min;

const calcRectArea = (a, b) => a * b;

const checkIsPointInArea = (x, y, ...fns) =>
    fns.map((fn) => fn(x, y)).every((value) => value === true);

const countFigureArea = (testsCount, xRange, yRange, ...fns) => {
    const rectSide1 = xRange[1] - xRange[0];
    const rectSide2 = yRange[1] - yRange[0];
    const rectArea = calcRectArea(rectSide1, rectSide2);
    let counter = 0;
    for (let i = 0; i < testsCount; i++) {
        const isInArea = checkIsPointInArea(
            calcRandomNumberInRange(...xRange),
            calcRandomNumberInRange(...yRange),
            ...fns
        );

        if (isInArea) counter++;
    }
    const figureArea = (counter / testsCount) * rectArea;
    return figureArea;
};

//Usage

const firstFn = (x, y) => y <= 1 / (0.2 * x);
const secondFn = (x, y) => y >= 0.2 * x ** 2;

console.log(
    "Area with 100 iterations",
    countFigureArea(100, [0, 2.925], [0, 4], firstFn, secondFn)
);
console.log(
    "Area with 200 iterations",
    countFigureArea(200, [0, 2.925], [0, 4], firstFn, secondFn)
);
console.log(
    "Area with 1000 iterations",
    countFigureArea(1000, [0, 2.925], [0, 4], firstFn, secondFn)
);
console.log(
    "Area with 5000 iterations",
    countFigureArea(5000, [0, 2.925], [0, 4], firstFn, secondFn)
);
