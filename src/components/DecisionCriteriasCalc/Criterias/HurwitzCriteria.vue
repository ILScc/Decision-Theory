<template>
  <button
    class="button-main"
    type="button"
    @click="calcHurwitz(matrix, lambda)"
  >
    calcHurwitz
  </button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent,PropType } from "vue";

import {
  getLambda,
  findMinInRows,
  findMaxInRows,
  prettifyOutput,
} from "../../../DecisonMakingMethods/utils";
export default defineComponent({
  data() {
    return {
      lambda: getLambda(),
      result: "",
    };
  },
  props: {
    matrix: {
      type: Object as PropType<number[][]>,
      required: true,
    },
  },
  methods: {
    calcHurwitz(matrix: number[][], lambda = 0.5) {
      const lambdaMinInRows = findMinInRows(matrix).map(
        (value) => value * lambda
      );
      const lambdaMaxInRows = findMaxInRows(matrix).map(
        (value) => Number((1 - lambda).toFixed(1)) * value
      );
      const options = lambdaMaxInRows.map(
        (value, i) => value + lambdaMinInRows[i]
      );
      const decision = Math.max(...options);
      this.result = prettifyOutput(options, decision);
    },
  },
});
</script>
<style scoped>
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
