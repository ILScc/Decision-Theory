<template>Place</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  sumMathProbabilities,
  prettifyOutput,
  convertProbabilities,
} from "../DecisonMakingMethods/utils";
import { CriteriaData } from "../types";
export default defineComponent({
  data() {
    return {
      matrix: "",
      probabilities: "",
      result: "",
    } as CriteriaData;
  },

  methods: {
    calcBL(matrix, probabilities) {
      const convertedProbabilities = convertProbabilities(probabilities);
      if (typeof matrix == "string") {
        return;
      }
      const mathProbabilities = sumMathProbabilities(
        matrix,
        convertedProbabilities
      );
      const decision = Math.max(...mathProbabilities);
      this.result = prettifyOutput(mathProbabilities, decision);
    },
  },
});
</script>
