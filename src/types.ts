export interface CriteriaData {
  matrix: number[][] | string;
  result: string;
  probabilities?: string;
}
export type calcPenalty = (itemProdCost: number, penalty: number) => number;
export interface DailyResults {
  dailyRevenue: number;
  dailyDemand: number;
}
export type PeriodResultsFn = (...args: number[]) => {};
