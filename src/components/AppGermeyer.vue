<template>place</template>
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
      matrix: "",
      probabilities: "",
      result: "",
    };
  },
  methods: {
    calcGermeyer(matrix, probabilities) {
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
