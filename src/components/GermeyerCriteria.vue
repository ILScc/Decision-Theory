<template>
  <button
    class="button-main"
    type="button"
    @click="calcGermeyer(matrix, probabilities)"
  >
    calcGermeyer
  </button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

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
      type: Object as PropType<number[][]>,
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
