import { calcPenalty, PeriodResultsFn } from "@/types";

const calcUnderprodPenalty: calcPenalty = (unproducedItems, penalty) =>
  unproducedItems * penalty;
const calcOverprodPenalty: calcPenalty = (overproducedItems, penalty) =>
  overproducedItems * penalty;

const calcDailyDemand = (averageDailyDemand: number) => {
  const delta = (averageDailyDemand * 10) / 100;
  const currentDemand = Math.round(
    getDemand(averageDailyDemand - delta, averageDailyDemand + delta)
  );
  return currentDemand;
};
const getDemand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const calcPeriodResults: PeriodResultsFn = (
  prodPeriod,
  initialReserve,
  averageDailyDemand,
  prodPlan,
  prodCosts,
  overProdPen,
  underProdPen,
  expectedItemRevenue,
  prodDelay,
  prodPossibilities
) => {
  let totalProducesItems = 0;
  let remainingItems = initialReserve;
  let totalRevenue = 0;
  let totalPenalties = 0;
  let totalSoldItems = 0;
  let totalDemand = 0;
  const itemsArriveDays: number[] = [];

  for (let i = 0; i < prodPeriod; i++) {
    const dailyDemand = calcDailyDemand(averageDailyDemand);
    totalDemand += dailyDemand;

    if (itemsArriveDays[0] === i) {
      itemsArriveDays.shift();
      remainingItems += prodPossibilities;
      totalProducesItems += prodPossibilities;
    }

    if (remainingItems > 0) {
      remainingItems >= dailyDemand
        ? ((totalRevenue += dailyDemand * expectedItemRevenue),
          (totalSoldItems += dailyDemand))
        : ((totalRevenue += remainingItems * expectedItemRevenue),
          (totalSoldItems += remainingItems));
    }
    remainingItems -= dailyDemand;

    if (remainingItems <= 0) {
      totalPenalties += calcUnderprodPenalty(
        Math.abs(remainingItems),
        underProdPen
      );
    }
    if (
      remainingItems <= averageDailyDemand &&
      totalProducesItems <= prodPlan
    ) {
      itemsArriveDays.push(i + prodDelay);
    }
    remainingItems = remainingItems > 0 ? remainingItems : 0;
  }
  totalPenalties += calcOverprodPenalty(remainingItems, overProdPen);

  const totalCosts = totalProducesItems * prodCosts;
  const income = totalRevenue - totalCosts - totalPenalties;
  return {
    income: income,
    remainingItems: remainingItems,
    totalProducesItems: totalProducesItems,
    totalCosts: totalCosts,
    totalSoldItems: totalSoldItems,
    totalDemand: totalDemand,
    totalRevenue: totalRevenue,
    penalties: totalPenalties,
  };
};
