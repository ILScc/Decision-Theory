<template>
  <form action="">
    <input type="number" name="rows" v-model.number="rows" />
    <label for="rows">Insert number of rows (decisions)</label>
    <input type="number" name="columns" v-model.number="cols" />
    <label for="columns">Insert number of columns (conditions)</label>
  </form>
  <table>
    <tbody v-if="rows">
      <tr v-for="row in rows" :key="row">
        <input
          @change="getValue"
          :cell="`${row}${col}`"
          v-for="col in cols"
          :key="col"
          type="number"
        />
      </tr>
    </tbody>
  </table>
  <button type="button" @click="buildMatrix">Calc</button>

  <app-BL />
  <app-germeyer />
  <app-HL />
  <app-hurwitz />
  <app-optimistic />
  <app-p-critreria />
  <app-savage />
  <app-wald />
</template>
<script lang="ts">
import { MatrixData } from "@/types";
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
      matrix: null,
    } as MatrixData;
  },
  methods: {
    buildMatrix() {
      const orderedCells = Array.from(this.cells.keys()).sort((a, b) => a - b);
      const orderedValues = orderedCells.map((key) => {
        const value = this.cells.get(key);
        return value ? value : null; //fix this showing user that he needs to fill input
      });
      this.matrix = this.splitValues(orderedValues);
    },
    getValue(e) {
      this.cells.set(+e.target.__vnode.props.cell, +e.target.value);
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
