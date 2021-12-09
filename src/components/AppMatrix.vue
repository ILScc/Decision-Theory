<template>
  <form>
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
          :position="`${row}${col}`"
          v-for="col in cols"
          :key="col"
          type="number"
        />
      </tr>
    </tbody>
  </table>
  <button type="button" @click="getMatrix">Confirm matrix</button>
  <form action="">
    <label for="probabilities" class="for">Insert probabilities</label>
    <input type="text" name="probabilities" v-model="probabilities" />
  </form>

  <app-BL :matrix="matrix" :probabilities="probabilities" />
  <app-germeyer :matrix="matrix" :probabilities="probabilities"/>
  <app-HL :matrix="matrix" :probabilities="probabilities" />
  <app-hurwitz :matrix="matrix" />
  <app-optimistic :matrix="matrix" />
  <app-p-critreria :matrix="matrix" />
  <app-savage :matrix="matrix" />
  <app-wald :matrix="matrix" />
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
      probabilities: null,
    } as MatrixData;
  },
  methods: {
    getMatrix() {
      const orderedCells = Array.from(this.cells.keys()).sort((a, b) => a - b);
      const orderedValues = orderedCells.map((key) => {
        const value = this.cells.get(key);
        return value ? value : 0; //fix this showing user that he needs to fill input
      });
      this.matrix = this.splitCells(orderedValues);
    },
    getValue(e) {
      this.cells.set(+e.target.__vnode.props.position, +e.target.value);
    },
    splitCells<T>(cells: T[]) {
      //TODO: remove generic type
      const arrOfArrs: T[][] = [];
      if (this.cols) {
        for (let i = 0; i < cells.length; i += this.cols) {
          arrOfArrs.push(cells.slice(i, i + this.cols));
        }
        return arrOfArrs;
      }
      return arrOfArrs;
    },
  },
});
</script>
