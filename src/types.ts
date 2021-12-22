export interface CriteriaData {
  matrix: number[][] | string;
  result: string;
  probabilities?: string;
}
export interface MatrixData {
  rows: number | null;
  cols: number | null;
  cells: Map<number, number>;
  matrix: null | number[][] | (number | null)[][];
}
