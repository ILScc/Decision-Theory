import {
  findMinInRows,
  findMaxInRows,
  getLambda,
  buildRiskMatrix,
  sumMathProbabilities,
  // prettifyOutput,
  // isOnlyPositiveMatrix,
  // handlePCriterionValidMatrix,
  // handlePCriterionInvalidMatrix,
  // handleGermeyerValidMatrix,
  // handleGermeyerInvalidMatrix,
} from "../DecisonMakingMethods/utils";
describe("test utils", () => {
  describe("should work with only positive matrix", () => {
    const standartMatrix = [
      [5, 3, 4, 9],
      [1, 2, 5, 43],
      [4, 12, 2, 6],
    ];
    const probabilities = [0.1, 0.2, 0.3, 0.4];

    test("standart matrix", () => {
      expect(findMinInRows(standartMatrix)).toEqual([3, 1, 2]);
      expect(findMaxInRows(standartMatrix)).toEqual([9, 43, 12]);
      expect(buildRiskMatrix(standartMatrix)).toEqual([
        [0, 9, 1, 34],
        [4, 10, 0, 0],
        [1, 0, 3, 37],
      ]);
      expect(sumMathProbabilities(standartMatrix, probabilities)).toEqual([
        5.9, 19.2, 5.8,
      ]);
    });
  });
  describe("getLambda should produce values in range 0<=value<= 1", () => {
    const lambda = getLambda();
    console.log(lambda);
    test("lambda should be greater than or equal zero", () => {
      expect(lambda).toBeGreaterThanOrEqual(0);
    });
    test("lambda should be less than or equal one", () => {
      expect(lambda).toBeLessThanOrEqual(1);
    });
  });
});
