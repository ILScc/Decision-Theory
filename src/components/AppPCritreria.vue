<template>
  <button class="button-main" type="button" @click="calcPCriteria(matrix)">
    calcHurwitz
  </button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  isOnlyPositiveMatrix,
  handlePCriterionValidMatrix,
  handlePCriterionInvalidMatrix,
  prettifyOutput,
} from "../DecisonMakingMethods/utils";
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
    calcPCriteria(matrix) {
      const isMatrixValid = isOnlyPositiveMatrix(matrix);
      const rowMultiplications = isMatrixValid
        ? handlePCriterionValidMatrix(matrix)
        : handlePCriterionInvalidMatrix(matrix);
      const decision = Math.max(...rowMultiplications);
      this.result = prettifyOutput(rowMultiplications, decision);
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
