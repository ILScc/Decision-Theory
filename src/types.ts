export interface BuilderData {
  rows: number;
  cols: number;
  cells: Map<number, number>;
  matrix: number[][];
  probabilities: string;
}
