export interface BuilderData {
  rows: number;
  cols: number;
  matrix: number[][];
  cells: Map<number, number>;
  probabilities: string;
  isBuilded: boolean | null;
}
