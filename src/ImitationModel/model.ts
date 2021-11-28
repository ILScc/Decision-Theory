import type { calcPenalty, DailyResults, PeriodResultsFn } from "@/types";
// Factory produces car engines. Production plan for month(30 days) - 200 engines

const prodPlan = 200;
const itemProdCost = 4000;
const prodPeriod = 30;
const expectedItemRevenue = 5000;
const underprodPenalty = expectedItemRevenue - itemProdCost;
const overprodPenalty = 100;
const initialReserve = 10;

const calcUnderprodPenalty: calcPenalty = (unproducedItems, penalty) =>
  unproducedItems * penalty;
const calcOverprodPenalty: calcPenalty = (overproducedItems, penalty) =>
  overproducedItems * penalty;
const averageDailyDemand = Math.round(prodPlan / prodPeriod);

const getDemand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const calcDailyDemand = (averageDailyDemand: number) => {
  const deviation = (averageDailyDemand * 30) / 100;
  const currentDemand = Math.round(
    getDemand(averageDailyDemand - deviation, averageDailyDemand + deviation)
  );
  return currentDemand;
};

const calcPeriodResults: PeriodResultsFn = (
  prodPeriod,
  reserve,
  averageDailyDemand,
  plan,
  costs,
  overProdPen,
  underProdPen,
  expectedItemRevenue
) => {
  let totalProducesItems = 0;
  let remainingItems = reserve;
  let totalRevenue = 0;
  let penalties = 0;
  for (let i = 0; i < prodPeriod; i++) {
    const dailyDemand = calcDailyDemand(averageDailyDemand);
    if (remainingItems > 0) {
      remainingItems >= dailyDemand
        ? (totalRevenue += dailyDemand * expectedItemRevenue)
        : (totalRevenue += remainingItems * expectedItemRevenue);
      remainingItems -= dailyDemand;
      if (remainingItems <= 0) {
        penalties += calcUnderprodPenalty(
          Math.abs(remainingItems),
          underProdPen
        );
      } else {
        penalties += calcOverprodPenalty(remainingItems, overProdPen);
      }
      if (remainingItems < averageDailyDemand && totalProducesItems <= plan) {
        remainingItems += averageDailyDemand;
        totalProducesItems += averageDailyDemand;
      }
    }
  }
  const totalCosts = totalProducesItems * costs;
  const income = totalRevenue - totalCosts - penalties;
  return {
    income: income,
    remainingItems: remainingItems,
    totalProducesItems: totalProducesItems,
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
    underprodPenalty,
    expectedItemRevenue
  )
);
