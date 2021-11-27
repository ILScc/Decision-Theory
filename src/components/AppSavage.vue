<template>
  <form action="">
    <label for="Savage">Calc Savage</label>
    <input type="text" name="Savage" id="Savage" v-model="matrix" />
    <button type="button" @click="calcSavage(matrix)">Calculate</button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { buildRiskMatrix, prettifyOutput } from "../DecisonMakingMethods/utils";
import { CriteriaData } from "../types";
export default defineComponent({
  data() {
    return {
      matrix: this.$options.SAMPLE_MATRIX,
      result: null,
    } as CriteriaData;
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
      this.result = prettifyOutput(maxRisks, decision);
    },
  },
});
</script>
