import type { calcPenalty, DailyResults, PeriodResultsFn } from "@/types";
// Factory produces car engines. Production plan for month(30 days) - 200 engines

const prodPlan = 200;
const itemProdCost = 4000;
const prodPeriod = 30;
const expectedItemRevenue = 5000;
const underprodPenalty = expectedItemRevenue - itemProdCost;
const overprodPenalty = 100;
const initialReserve = 5;

const calcUnderprodPenalty: calcPenalty = (unproducedItems, penalty) =>
  unproducedItems * penalty;
const calcOverprodPenalty: calcPenalty = (overproducedItems, penalty) =>
  overproducedItems * penalty;

const getDemand = (min: number, max: number) =>
  Math.random() * (max - min) + min;
const averageDailyDemand = prodPlan / prodPeriod;

const calcDailyResults = (averageDailyDemand: number) => {
  const deviation = (averageDailyDemand * 30) / 100;
  const currentDemand = Math.round(
    getDemand(averageDailyDemand - deviation, averageDailyDemand + deviation)
  );
  return {
    dailyRevenue: currentDemand * expectedItemRevenue,
    dailyDemand: currentDemand,
  } as DailyResults;
};

const calcPeriodResults: PeriodResultsFn = (
  prodPeriod,
  reserve,
  averageDailyDemand,
  plan,
  costs,
  overProdPen,
  underProdPen
) => {
  const totalCosts = plan * costs;
  let remainingItems = reserve + plan;
  let totalRevenue = 0;
  let penalties = 0;
  for (let i = 0; i < prodPeriod; i++) {
    const { dailyRevenue, dailyDemand } = calcDailyResults(averageDailyDemand);
    if (remainingItems > 0) {
      totalRevenue += dailyRevenue;
      console.log(i, totalRevenue, remainingItems);
    }
    remainingItems -= dailyDemand;
  }
  if (remainingItems <= 0) {
    penalties += calcUnderprodPenalty(Math.abs(remainingItems), underProdPen);
  } else {
    penalties += calcOverprodPenalty(remainingItems, overProdPen);
  }

  const income = totalRevenue - totalCosts - penalties;
  return {
    income: income,
    remainingItems: remainingItems,
    totalCosts: totalCosts,
    totalRevenue: totalRevenue,
    penalties: penalties,
  };
};

//Usage

console.table(
  calcPeriodResults(
    prodPeriod,
    initialReserve,
    averageDailyDemand,
    prodPlan,
    itemProdCost,
    overprodPenalty,
    underprodPenalty
  )
);
