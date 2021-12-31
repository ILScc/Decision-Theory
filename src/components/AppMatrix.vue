<template>
  <main class="wrapper">
    <div class="matrix-builder">
      <form class="cells-builder">
        <input
          class="cells-builder__settings"
          type="number"
          name="rows"
          v-model.number="rows"
        />
        <label class="cells-builder__text" for="rows"
          >Insert number of rows (decisions)</label
        >
        <input
          class="cells-builder__settings"
          type="number"
          name="columns"
          v-model.number="cols"
        />
        <label class="cells-builder__text" for="columns"
          >Insert number of columns (conditions)</label
        >
        <input
          class="cells-builder__settings"
          type="text"
          name="probabilities"
          v-model="probabilities"
        />
        <label class="cells-builder__text" for="probabilities"
          >Insert probabilities</label
        >
      </form>
      <table class="matrix">
        <tbody class="matrix" v-if="rows">
          <tr v-for="row in rows" :key="row">
            <input
              class="cell"
              @change="handleInput"
              :cell="`${row}${col}`"
              v-for="col in cols"
              :key="col"
              type="number"
            />
          </tr>
        </tbody>
      </table>
      <button class="build-btn button-main" type="button" @click="buildMatrix">
        Build matrix
      </button>
    </div>

    <div class="crit-wrapper">
      <b-l-criteria :matrix="matrix" :probabilities="probabilities" />
      <germeyer-criteria :matrix="matrix" :probabilities="probabilities" />
      <h-l-criteria :matrix="matrix" :probabilities="probabilities" />
      <hurwitz-criteria :matrix="matrix" />
      <optimistic-criteria :matrix="matrix" />
      <p-criteria :matrix="matrix" />
      <savage-criteria :matrix="matrix" />
      <wald-criteria :matrix="matrix" />
    </div>
  </main>
</template>
<script lang="ts">
import { BuilderData } from "@/types";
import { defineComponent } from "vue";

import BLCriteria from "./BLCriteria.vue";
import GermeyerCriteria from "./GermeyerCriteria.vue";
import HLCriteria from "./HLCriteria.vue";
import HurwitzCriteria from "./HurwitzCriteria.vue";
import OptimisticCriteria from "./OptimisticCriteria.vue";
import PCriteria from "./PCriteria.vue";
import SavageCriteria from "./SavageCriteria.vue";
import WaldCriteria from "./WaldCriteria.vue";
export default defineComponent({
  components: {
    BLCriteria,
    GermeyerCriteria,
    HLCriteria,
    HurwitzCriteria,
    OptimisticCriteria,
    PCriteria,
    SavageCriteria,
    WaldCriteria,
  },
  data() {
    return {
      rows: null,
      cols: null,
      cells: new Map(),
      matrix: [],
      probabilities: "",
    } as BuilderData;
  },
  methods: {
    buildMatrix() {
      const invalidCells = this.getInvalidCells();
      if (invalidCells.length) {
        this.markInvalid(invalidCells);
        return;
      }
      const orderedCells = [...this.cells.keys()].sort((a, b) => a - b);
      const orderedCellsValues = orderedCells.map((key) => {
        const value = this.cells.get(key);
        return value ? value : 0;
      });
      this.matrix = this.buildMatrixRows(orderedCellsValues);
    },

    handleInput({ target }) {
      const cellOrderPath = target.attributes.cell.value;
      const cellValue = target.value;
      this.cells.set(+cellOrderPath, +cellValue);
      if (target.classList.contains("cell-invalid")) {
        target.classList.remove("cell-invalid");
      }
    },

    buildMatrixRows<T>(cells: T[]) {
      const matrix: T[][] = [];
      if (this.cols) {
        for (let i = 0; i < cells.length; i += this.cols) {
          matrix.push(cells.slice(i, i + this.cols));
        }
        return matrix;
      }
      return matrix;
    },

    markInvalid(invalidCells) {
      invalidCells.forEach((cell) => cell.classList.add("cell-invalid"));
    },

    getInvalidCells() {
      const cells = document.getElementsByClassName(
        "cell" // eslint-disable-next-line no-undef
      ) as HTMLCollectionOf<HTMLInputElement>;
      const invalidCells: HTMLInputElement[] = [];
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].value === "") {
          console.log(cells[i]);
          invalidCells.push(cells[i]);
        }
      }
      return invalidCells;
    },
  },
});
</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  gap: 10%;
}
.crit-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  margin-top: 20px;
  gap: 10px;
}
/* matrix */
.matrix {
  max-width: 100vw;
  margin: 5px auto;
}

.cells-builder__settings {
  width: 80%;
  height: 25px;
  margin: 0 auto;
  border: solid 1px #ccc;
  border-radius: 10px;
}
.cell {
  border: solid 1px;
  border-radius: 4px;
  margin: 2px;
  padding: 0;
  width: 6rem;

  font: inherit;
  line-height: normal;
}
.cell-invalid {
  border: solid 1px red;
}
@media (max-width: 500px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
  }
  .cell {
    width: 1.5rem;
  }
}
.build-btn {
  margin-top: 10px;
}
.cells-builder {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.cells-builder__text {
  margin: 0 auto;
}
.cells-builder input {
  margin-top: 5px;
}
.matrix-builder {
  display: flex;
  flex-direction: column;
}
/* /matrix */

.button-main {
  height: 8%;
  border: solid 1px;
  background-color: none;
  border-radius: 10px;
  margin: 5px;
  padding: 3px;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;

  line-height: normal;
}
.button-main:hover {
  background: rgb(248, 246, 246);
  transition: background 0.1s ease-in;
}
</style>
