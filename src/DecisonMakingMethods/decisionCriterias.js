import {
  handleDecision,
  isOnlyPositiveMatrix,
  handleGermeyerValidMatrix,
  handleGermeyerInvalidMatrix,
} from "./utils.js";
const { max } = Math;

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

console.log("Germeyer :", calcGermeyer(matrix, initialProbabilities));
