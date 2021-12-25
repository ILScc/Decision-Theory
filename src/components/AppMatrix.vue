<template>
  <div class="wrapper">
    <div class="matrix-builder">
      <form class="cells-builder">
        <input type="number" name="rows" v-model.number="rows" />
        <label for="rows">Insert number of rows (decisions)</label>
        <input type="number" name="columns" v-model.number="cols" />
        <label for="columns">Insert number of columns (conditions)</label>
        <input type="text" name="probabilities" v-model="probabilities" />
        <label for="probabilities" class="for">Insert probabilities</label>
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
      <button class="build-btn" type="button" @click="buildMatrix">
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
  </div>
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
      matrix: [[]],
      probabilities: "",
    } as BuilderData;
  },
  methods: {
    buildMatrix() {
      const orderedCells = Array.from(this.cells.keys()).sort((a, b) => a - b);
      const orderedValues = orderedCells.map((key) => {
        const value = this.cells.get(key);
        return value ? value : null; //fix this showing user that he needs to fill input
      });
      const validatedVals = this.validateValues(orderedValues);
      this.matrix = this.splitValues(validatedVals);
      console.log(this.matrix);
    },
    getValue(e) {
      console.log(e);
      const cellNumPath = e.target.attributes[1].value;
      console.log(e.target.attributes[1].value);
      const cellValue = e.target.value;
      this.cells.set(+cellNumPath, +cellValue);
    },
    validateValues(v) {
      // implement better version
      return v.map((val) => (val === null ? 0 : val));
    },
    splitValues<T>(cells: T[]) {
      //TODO: remove generic type
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
.matrix {
  max-width: 100vw;
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
.cells-builder input {
  margin-top: 5px;
}
.matrix-builder {
  display: flex;
  flex-direction: column;
}
</style>
