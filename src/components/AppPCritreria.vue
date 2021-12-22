<template>
  <button type="button" @click="calcPCriteria(matrix)">calcHurwitz</button>
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
