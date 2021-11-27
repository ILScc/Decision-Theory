<template>
  <form action="">
    <label for="Wald">Calc Wald Criteria</label>
    <input type="text" name="Wald" id="Wald" v-model="matrix" />
    <button type="button" @click="calcWald(matrix)">Calculate</button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { findMinInRows, prettifyOutput } from "../DecisonMakingMethods/utils";
import { CriteriaData } from "../types";

export default defineComponent({
  data() {
    return {
      matrix: this.$options.SAMPLE_MATRIX,
      result: null,
    } as CriteriaData;
  },

  methods: {
    calcWald(matrix) {
      const minInRows = findMinInRows(matrix);
      const decision = Math.max(...minInRows);
      this.result = prettifyOutput(minInRows, decision);
    },
  },
});
</script>
