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
          :position="`${row}${col}`"
          v-for="col in cols"
          :key="col"
          type="number"
        />
      </tr>
    </tbody>
  </table>
  <button type="button" @click="getMatrix">Calc</button>

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
      cells: new Map(), // rename it
    };
  },
  methods: {
    getMatrix() {
      const orderedMatrix = Array.from(this.cells.keys()).sort((a, b) => a - b);
      console.log(orderedMatrix);
    },
    getValue(e) {
      console.log(e);
      this.cells.set(+e.target.__vnode.props.position, e.target.value);
    },
  },
});
</script>
