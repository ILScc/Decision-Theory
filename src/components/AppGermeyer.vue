<template>
  <form action="">
    <label for="Germeyer">Calc Germeyer criteria (P-criteria)</label>
    <input type="text" name="Germeyer" id="Germeyer" v-model="matrix" />
    <button type="button" @click="calcGermeyer(matrix, probabilities)">
      Calculate
    </button>
    <div>Result : {{ result }}</div>
  </form>
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
      matrix: this.$options.SAMPLE_MATRIX,
      probabilities: this.$options.SAMPLE_PROBABILITIES,
      result: null,
    };
  },
  SAMPLE_MATRIX: [
    [54, 65, 50, 68],
    [67, 74, 55, 72],
    [51, 67, 78, 68],
    [73, 54, 67, 60],
    [76, 69, 67, 59],
  ],
  SAMPLE_PROBABILITIES: "0.1, 0.3, 0.4, 0.2",
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
