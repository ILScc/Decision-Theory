export interface BuilderData {
  rows: number | null;
  cols: number | null;
  cells: Map<number, number>;
  matrix: number[][];
  probabilities: string;
}
export type calcPenalty = (itemProdCost: number, penalty: number) => number;
export interface DailyResults {
  dailyRevenue: number;
  dailyDemand: number;
}
export interface PeriodResults {
  income: number;
  remainingItems: number;
  totalCosts: number;
  totalRevenue: number;
  penalties: number;
}
export type PeriodResultsFn = (...args: number[]) => PeriodResults;
