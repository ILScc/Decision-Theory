<template>
  <form action="">
    <label for="Savage">Calc Savage</label>
    <input type="text" name="Savage" id="Savage" v-model="matrix" />
    <button type="button" @click="calcSavage(matrix)">Calculate</button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script>
import {
  buildRiskMatrix,
  handleDecision,
} from "../DecisonMakingMethods/utils.js";
export default {
  data() {
    return {
      matrix: this.$options.SAMPLE_MATRIX,
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
    calcSavage(matrix) {
      const riskMatrix = buildRiskMatrix(matrix);
      const maxRisks = riskMatrix.map((row) => Math.max(...row));
      const decision = Math.min(...maxRisks);
      const answer = handleDecision(maxRisks, decision);
      this.result = answer;
    },
  },
};
</script>
