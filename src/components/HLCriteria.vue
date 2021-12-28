<template>
  <button class="button-main" type="button" @click="calcHL(matrix, probabilities)">
    calcHL
  </button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  getLambda,
  findMinInRows,
  sumMathProbabilities,
  prettifyOutput,
  convertProbabilities,
} from "../DecisonMakingMethods/utils";
export default defineComponent({
  data() {
    return {
      lambda: getLambda(),
      result: "",
    };
  },
  props: {
    matrix: {
      type: Object as () => number[][],
      required: true,
    },
    probabilities: {
      type: String,
      required: true,
    },
  },

  methods: {
    calcHL(matrix: number[][], probabilities, lambda = 0.5) {
      const convertedProbabilities = convertProbabilities(probabilities);
      const lambdaMathProbabilities = sumMathProbabilities(
        matrix,
        convertedProbabilities
      ).map((value) => lambda * value);
      const lambdaMinInRows = findMinInRows(matrix).map(
        (value) => (1 - Number(lambda.toFixed(1))) * value
      );
      const options = lambdaMathProbabilities.map(
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
