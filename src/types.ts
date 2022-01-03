export interface BuilderData {
  rows: number | null;
  cols: number | null;
  cells: Map<number, number>;
  matrix: number[][];
  probabilities: string;
}
