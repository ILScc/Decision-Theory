import {
  buildRiskMatrix,
  findMinInRows,
  findMaxInRows,
  sumMathProbabilities,
  handleDecision,
  getLambda,
  isOnlyPositiveMatrix,
  handlePCriterionValidMatrix,
  handlePCriterionInvalidMatrix,
  handleGermeyerValidMatrix,
  handleGermeyerInvalidMatrix,
} from "./utils.js";
const { min, max } = Math;

function calcSavage(matrix) {
  const riskMatrix = buildRiskMatrix(matrix);
  const maxRisks = riskMatrix.map((row) => max(...row));
  const decision = min(...maxRisks);
  const answer = handleDecision(maxRisks, decision);
  return answer;
}
function calcHurwitz(matrix, lambda = getLambda()) {
  const lambdaMinInRows = findMinInRows(matrix).map((value) => value * lambda);
  const lambdaMaxInRows = findMaxInRows(matrix).map(
    (value) => (1 - lambda).toFixed(1) * value
  );
  const options = lambdaMaxInRows.map((value, i) => value + lambdaMinInRows[i]);
  const decision = max(...options);
  const answer = handleDecision(options, decision);
  return `${answer}, lambda = ${lambda}`;
}

function calcHL(matrix, probabilities, lambda = getLambda()) {
  const lambdaMathProbabilities = sumMathProbabilities(
    matrix,
    probabilities
  ).map((value) => lambda * value);
  const lambdaMinInRows = findMinInRows(matrix).map(
    (value) => (1 - lambda.toFixed(1)) * value
  );
  const options = lambdaMathProbabilities.map(
    (value, i) => value + lambdaMinInRows[i]
  );
  const decision = max(...options);
  const answer = handleDecision(options, decision);
  return `${answer}, lambda = ${lambda}`;
}
function calcPCriterion(matrix) {
  const isMatrixValid = isOnlyPositiveMatrix(matrix);
  const rowMultiplications = isMatrixValid
    ? handlePCriterionValidMatrix(matrix)
    : handlePCriterionInvalidMatrix(matrix);
  const decision = max(...rowMultiplications);
  const answer = handleDecision(rowMultiplications, decision);
  return answer;
}

function calcGermeyer(matrix, probabilities) {
  const isMatrixValid = !isOnlyPositiveMatrix(matrix);
  const minValueMathProbs = isMatrixValid
    ? handleGermeyerValidMatrix(matrix, probabilities)
    : handleGermeyerInvalidMatrix(matrix, probabilities);
  const decision = max(...minValueMathProbs);
  const answer = handleDecision(minValueMathProbs, decision);
  return answer;
}

// Usage
const matrix = [
  [54, 65, 50, 68],
  [67, 74, 55, 72],
  [51, 67, 78, 68],
  [73, 54, 67, 60],
  [76, 69, 67, 59],
];

const initialProbabilities = [0.1, 0.3, 0.4, 0.2];

console.log("Savage :", calcSavage(matrix));
console.log("Hurwitz :", calcHurwitz(matrix));
console.log("Hodges–Lehmann :", calcHL(matrix, initialProbabilities));
console.log("P-criterion :", calcPCriterion(matrix));
console.log("Germeyer :", calcGermeyer(matrix, initialProbabilities));
