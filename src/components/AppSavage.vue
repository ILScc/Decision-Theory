<template>
  <button class="calc-btn" type="button" @click="calcSavage(matrix)">calcSavage</button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { buildRiskMatrix, prettifyOutput } from "../DecisonMakingMethods/utils";
export default defineComponent({
  data() {
    return {
      result: "",
    };
  },

  props: {
    matrix: {
      type: Object,
      required: false,
    },
  },
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
<style scoped>
.calc-btn {
 font-size: 90%;
 
}
</style>
