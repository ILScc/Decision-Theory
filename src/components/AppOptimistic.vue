<template>
  <form action="">
    <label for="Wald">Calc Optimistic Criteria</label>
    <input type="text" name="Optimistic" id="Optimistic" v-model="matrix" />
    <button type="button" @click="calcOptimistic(matrix)">Calculate</button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { findMaxInRows, prettifyOutput } from "../DecisonMakingMethods/utils";
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
    calcOptimistic(matrix) {
      const maxInRows = findMaxInRows(matrix);
      const decision = Math.max(...maxInRows);
      this.result = prettifyOutput(maxInRows, decision);
    },
  },
});
</script>
