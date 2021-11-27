<template>Place</template>
<script lang="ts">
import { defineComponent } from "vue";

import { buildRiskMatrix, prettifyOutput } from "../DecisonMakingMethods/utils";
export default defineComponent({
  data() {
    return {
      matrix: "",
      result: "",
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
      this.result = prettifyOutput(maxRisks, decision);
    },
  },
});
</script>
