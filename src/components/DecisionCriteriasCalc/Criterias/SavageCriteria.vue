<template>
  <button class="button-main" type="button" @click="calcSavage(matrix)">
    calcSavage
  </button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import { buildRiskMatrix, prettifyOutput } from "../../../DecisonMakingMethods/utils";
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
  },
  methods: {
    calcSavage(matrix: number[][]) {
      const riskMatrix = buildRiskMatrix(matrix);
      const maxRisks = riskMatrix.map((row) => Math.max(...row));
      const decision = Math.min(...maxRisks);
      this.result = prettifyOutput(maxRisks, decision);
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
