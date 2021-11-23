<template>
  <form action="">
    <label for="PCritria">Calc Multiplicatios criteria (P-criteria)</label>
    <input type="text" name="PCritria" id="PCritria" v-model="matrix" />
    <button type="button" @click="calcPCriteria(matrix)">Calculate</button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script>
import {
  getLambda,
  isOnlyPositiveMatrix,
  handlePCriterionValidMatrix,
  handlePCriterionInvalidMatrix,
  handleDecision,
} from "../DecisonMakingMethods/utils.js";
export default {
  data() {
    return {
      matrix: this.$options.SAMPLE_MATRIX,
      lambda: getLambda(),
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
  methods: {
    calcPCriteria(matrix) {
      const isMatrixValid = isOnlyPositiveMatrix(matrix);
      const rowMultiplications = isMatrixValid
        ? handlePCriterionValidMatrix(matrix)
        : handlePCriterionInvalidMatrix(matrix);
      const decision = Math.max(...rowMultiplications);
      const answer = handleDecision(rowMultiplications, decision);
      this.result = answer;
    },
  },
};
</script>
