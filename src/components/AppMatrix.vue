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
              @change="getValue"
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
      <app-BL :matrix="matrix" :probabilities="probabilities" />
      <app-germeyer :matrix="matrix" :probabilities="probabilities" />
      <app-HL :matrix="matrix" :probabilities="probabilities" />
      <app-hurwitz :matrix="matrix" />
      <app-optimistic :matrix="matrix" />
      <app-p-critreria :matrix="matrix" />
      <app-savage :matrix="matrix" />
      <app-wald :matrix="matrix" />
    </div>
  </main>
</template>
<script lang="ts">
import { BuilderData } from "@/types";
import { defineComponent } from "vue";

import AppBL from "./AppBL.vue";
import AppGermeyer from "./AppGermeyer.vue";
import AppHL from "./AppHL.vue";
import AppHurwitz from "./AppHurwitz.vue";
import AppOptimistic from "./AppOptimistic.vue";
import AppPCritreria from "./AppPCritreria.vue";
import AppSavage from "./AppSavage.vue";
import AppWald from "./AppWald.vue";
export default defineComponent({
  components: {
    AppBL,
    AppGermeyer,
    AppHL,
    AppHurwitz,
    AppOptimistic,
    AppPCritreria,
    AppSavage,
    AppWald,
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
      const orderedCells = Array.from(this.cells.keys()).sort((a, b) => a - b);
      const orderedValues = orderedCells.map((key) => {
        const value = this.cells.get(key);
        return value ? value : 0;
      });
      this.matrix = this.splitValues(orderedValues);
    },
    getValue({ target }) {
      const cellNumPath = target.attributes.cell.value;
      const cellValue = target.value;
      this.cells.set(+cellNumPath, +cellValue);
    },
    splitValues<T>(cells: T[]) {
      const matrix: T[][] = [];
      if (this.cols) {
        for (let i = 0; i < cells.length; i += this.cols) {
          matrix.push(cells.slice(i, i + this.cols));
        }
        return matrix;
      }
      return matrix;
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
}

.cells-builder__settings {
  width: 80%;
  height: 25px;
  margin: 0 auto;
  border: solid 1px #ccc;
  border-radius: 10px;
}
.cell {
  width: 6rem;
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
  margin: 0;
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
