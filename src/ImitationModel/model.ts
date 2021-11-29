import { calcPeriodResults } from "./imitationModelUtils";

// Factory produces car engines. Production plan for month(30 days) - 200 engines
const prodPlan = 200;
const itemProdCost = 4000;
const prodPeriod = 30;
const prodDelay = 2; /* Minimum delay is 1, because we cant't produce new items in the same day*/
const expectedItemRevenue = 5000;
const underprodPenalty = expectedItemRevenue - itemProdCost;
const overprodPenalty = 100;
const initialReserve = 20;

const prodCapabilities = Math.round(prodPlan / prodPeriod) * prodDelay;
const averageDailyDemand = Math.round(prodPlan / prodPeriod);

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
    expectedItemRevenue,
    prodDelay,
    prodCapabilities
  )
);
