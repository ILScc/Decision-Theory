<template>
  <button class="calc-btn" type="button" @click="calcHL(matrix, probabilities)">
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
.calc-btn {
  font-size: 90%;
 
}
</style>
