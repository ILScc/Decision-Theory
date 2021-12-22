const { min, max, random, abs } = Math;

const transposeMatrix = (matrix: number[][]) => {
  const transponsedMatrix: number[][] = [];
  const totalCols = matrix[0].length;
  let colNum = 0;
  while (colNum < totalCols) {
    const column: number[] = [];
    matrix.forEach((row) => {
      column.push(row[colNum]);
    });
    transponsedMatrix.push(column);
    colNum++;
  }
  return transponsedMatrix;
};

const calcMaxInColumns = (matrix: number[][]) => {
  const transponsedMatrix = transposeMatrix(matrix);
  const maxInColumns = transponsedMatrix.map((column) => max(...column));
  return maxInColumns;
};

const multiplyRowsValues = (matrix: number[][]) =>
  matrix.map((row) => row.reduce((value, nexValue) => value * nexValue));

const getOnlyNegativeMatrix = (matrix: number[][]) => {
  const maxMatrixValue = max(...findMaxInRows(matrix));
  const onlyNegativeMatrix = matrix.map((row) =>
    row.map((value) => (value <= 0 ? value : value - (maxMatrixValue + 1)))
  );
  return onlyNegativeMatrix;
};

const findMinRowProbability = (matrix: number[][], probabilities: number[]) => {
  const matrixOfMathProbs = matrix.map((row) =>
    row.map((value, i) => value * probabilities[i])
  );
  const minRowProbability = matrixOfMathProbs.map((row) => min(...row));
  return minRowProbability;
};

export const getLambda = () => {
  return Number.parseFloat(((random() * 11) % 1).toFixed(1));
};

export const convertProbabilities = (probabilities: string) =>
  probabilities.split(",").map((p) => +p);

export const buildRiskMatrix = (matrix: number[][]) => {
  const maxInCols = calcMaxInColumns(matrix);
  const riskMatrix = JSON.parse(JSON.stringify(matrix));
  const totalColumns = matrix[0].length;
  let columnNum = 0;

  while (columnNum < totalColumns) {
    for (let rowNum = 0; rowNum <= matrix.length - 1; rowNum++) {
      riskMatrix[rowNum][columnNum] =
        maxInCols[columnNum] - matrix[rowNum][columnNum];
    }
    columnNum++;
  }
  return riskMatrix;
};

export const findMinInRows = (matrix: number[][]) =>
  matrix.map((row) => min(...row));
export const findMaxInRows = (matrix: number[][]) =>
  matrix.map((row) => max(...row));
export const sumMathProbabilities = (
  matrix: number[][],
  probabilities: number[]
) =>
  matrix.map((row) => {
    let result = 0;
    row.forEach((revenue, i) => {
      result += revenue * probabilities[i];
    });
    const formattedResult = result % 1 === 0 ? result : +result.toFixed(1);
    return formattedResult;
  });

export const prettifyOutput = (options: number[], decision: number) => {
  const decisionNum = options.findIndex((option) => option === decision);
  const formattedDecision = decision % 1 === 0 ? decision : decision.toFixed(1);
  const answer = `Decision ${decisionNum + 1} with value ${formattedDecision}`;
  return answer;
};

const getOnlyPositiveMatrix = (matrix: number[][]) => {
  const minMatrixValue = min(...findMinInRows(matrix));
  const onlyPositiveMatrix = matrix.map((row) =>
    row.map((value) => (value >= 0 ? value : value + abs(minMatrixValue) + 1))
  );
  return onlyPositiveMatrix;
};

export const isOnlyPositiveMatrix = (matrix: number[][]) =>
  matrix.every((row) => row.every((value) => value >= 0));

export const handlePCriterionValidMatrix = (matrix: number[][]) => {
  const rowMultiplications = multiplyRowsValues(matrix);
  return rowMultiplications;
};
export const handlePCriterionInvalidMatrix = (matrix: number[][]) => {
  const onlyPositiveMatrix = getOnlyPositiveMatrix(matrix);
  const rowMultiplications = multiplyRowsValues(onlyPositiveMatrix);
  return rowMultiplications;
};

export const handleGermeyerValidMatrix = (
  matrix: number[][],
  probabilities: number[]
) => {
  const worstRowProbability = findMinRowProbability(matrix, probabilities);
  return worstRowProbability;
};
export const handleGermeyerInvalidMatrix = (
  matrix: number[][],
  probabilities: number[]
) => {
  const onlyNegativeMatrix = getOnlyNegativeMatrix(matrix);
  const minRowProbability = findMinRowProbability(
    onlyNegativeMatrix,
    probabilities
  );
  return minRowProbability;
};
