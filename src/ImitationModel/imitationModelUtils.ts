import { calcPenalty, PeriodResultsFn } from "@/types";

const calcUnderprodPenalty: calcPenalty = (unproducedItems, penalty) =>
  unproducedItems * penalty;
const calcOverprodPenalty: calcPenalty = (overproducedItems, penalty) =>
  overproducedItems * penalty;

const getEvenDistrDemand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const calcDailyDemand = (averageDailyDemand: number) => {
  const delta = (averageDailyDemand * 10) / 100;
  const currentDemand = Math.round(
    getEvenDistrDemand(averageDailyDemand - delta, averageDailyDemand + delta)
  );
  return currentDemand;
};

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
  prodCapabilities
) => {
  let totalProducedItems = 0;
  let remainingItems = initialReserve;
  let totalRevenue = 0;
  let totalPenalties = 0;
  let totalSoldItems = 0;
  let totalDemand = 0;
  const itemsArriveDays: number[] = [];

  for (let i = 0; i < prodPeriod; i++) {
    const dailyDemand = calcDailyDemand(averageDailyDemand);
    console.log(dailyDemand);
    totalDemand += dailyDemand;

    if (itemsArriveDays[0] === i) {
      itemsArriveDays.shift();
      remainingItems += prodCapabilities;
      totalProducedItems += prodCapabilities;
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
      totalProducedItems <= prodPlan
    ) {
      itemsArriveDays.push(i + prodDelay);
    }
    remainingItems = remainingItems > 0 ? remainingItems : 0;
  }
  totalPenalties += calcOverprodPenalty(remainingItems, overProdPen);

  const totalCosts = totalProducedItems * prodCosts;
  const income = totalRevenue - totalCosts - totalPenalties;
  return {
    income: income,
    remainingItems: remainingItems,
    totalProducesItems: totalProducedItems,
    totalCosts: totalCosts,
    totalSoldItems: totalSoldItems,
    totalDemand: totalDemand,
    totalRevenue: totalRevenue,
    penalties: totalPenalties,
  };
};
