<template>
  <button type="button" @click="calcGermeyer(matrix, probabilities)">
    calcGermeyer
  </button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  isOnlyPositiveMatrix,
  handleGermeyerValidMatrix,
  handleGermeyerInvalidMatrix,
  prettifyOutput,
  convertProbabilities,
} from "../DecisonMakingMethods/utils";

export default defineComponent({
  data() {
    return {
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
    calcGermeyer(matrix: number[][], probabilities: string) {
      const convertedProbabilities = convertProbabilities(probabilities);
      const isMatrixValid = !isOnlyPositiveMatrix(matrix);
      const minValueMathProbs = isMatrixValid
        ? handleGermeyerValidMatrix(matrix, convertedProbabilities)
        : handleGermeyerInvalidMatrix(matrix, convertedProbabilities);
      const decision = Math.max(...minValueMathProbs);
      this.result = prettifyOutput(minValueMathProbs, decision);
    },
  },
});
</script>
