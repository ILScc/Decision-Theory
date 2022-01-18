import {
  findMinInRows,
  findMaxInRows,
  getLambda,
  buildRiskMatrix,
  sumMathProbabilities,
  isOnlyPositiveMatrix,
  handlePCriterionValidMatrix,
  handlePCriterionInvalidMatrix,
  handleGermeyerValidMatrix,
  handleGermeyerInvalidMatrix,
} from "../components/DecisionCriteriasCalc/criteriasUtils";
describe("test utils", () => {
  describe("should work with standart matrices", () => {
    const matrixWOnlyPosVals = [
      [5, 3, 4, 9],
      [1, 2, 5, 43],
      [4, 12, 2, 6],
    ];
    const matrixWNegVals = [
      [-5, 3, 4, 9],
      [1, 2, -5, 43],
      [4, -12, 2, 6],
    ];
    const matrixWOnlyNegVals = [
      [-5, -3, -4, -9],
      [-1, -2, -5, -43],
      [-4, -12, -2, -6],
    ];
    const probabilities = [0.1, 0.2, 0.3, 0.4];

    test("standart matrix", () => {
      expect(findMinInRows(matrixWOnlyPosVals)).toEqual([3, 1, 2]);
      expect(findMaxInRows(matrixWOnlyPosVals)).toEqual([9, 43, 12]);
      expect(buildRiskMatrix(matrixWOnlyPosVals)).toEqual([
        [0, 9, 1, 34],
        [4, 10, 0, 0],
        [1, 0, 3, 37],
      ]);
      expect(sumMathProbabilities(matrixWOnlyPosVals, probabilities)).toEqual([
        5.9, 19.2, 5.8,
      ]);
    });
    test("should correctly determine matrix validity", () => {
      expect(isOnlyPositiveMatrix(matrixWOnlyPosVals)).toEqual(true);
      expect(isOnlyPositiveMatrix(matrixWNegVals)).toEqual(false);
    });
    test("PCriterion must work with every passed matrix", () => {
      expect(handlePCriterionValidMatrix(matrixWOnlyPosVals)).toEqual([
        540, 430, 576,
      ]);
      expect(handlePCriterionInvalidMatrix(matrixWNegVals)).toEqual([
        864, 688, 48,
      ]);
      expect(handlePCriterionInvalidMatrix(matrixWOnlyNegVals)).toEqual([
        2238600, 70434, 2042880,
      ]);
    });
    test("Germeyerhandlers must work with every passed matrix", () => {
      expect(
        handleGermeyerValidMatrix(matrixWOnlyNegVals, probabilities)
      ).toEqual([-3.6, -17.2, -2.4]);
      expect(
        handleGermeyerInvalidMatrix(matrixWNegVals, probabilities)
      ).toEqual([-14, -8.4, -15.2]);
      expect(
        handleGermeyerInvalidMatrix(matrixWOnlyPosVals, probabilities)
      ).toEqual([-14, -11.7, -15.2]);
    });
  });
  describe("getLambda should produce values in range 0<= value <= 1", () => {
    const lambda = getLambda();
    test("lambda should be greater than or equal zero", () => {
      expect(lambda).toBeGreaterThanOrEqual(0);
    });
    test("lambda should be less than or equal one", () => {
      expect(lambda).toBeLessThanOrEqual(1);
    });
  });
});
