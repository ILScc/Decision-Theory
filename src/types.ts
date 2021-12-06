export interface MatrixData {
  rows: number | null;
  cols: number | null;
  cells: Map<number, number>;
  matrix: null | number[][];
  probabilities: null | string;
}
