<template>
  <button type="button" @click="calcHL(matrix, probabilities)">calcHL</button>
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
      type: Object,
      required: false,
    },
    probabilities: {
      type: String,
      required: false,
    },
  },

  methods: {
    calcHL(matrix, probabilities, lambda = 0.5) {
      if (typeof probabilities === "string") {
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
      }
    },
  },
});
</script>
