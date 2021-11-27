<template>place</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  getLambda,
  isOnlyPositiveMatrix,
  handlePCriterionValidMatrix,
  handlePCriterionInvalidMatrix,
  prettifyOutput,
} from "../DecisonMakingMethods/utils";
export default defineComponent({
  data() {
    return {
      matrix: "",
      lambda: getLambda(),
      result: "",
    };
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
