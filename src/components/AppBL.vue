<template>
  <button type="button" @click="calcBL(matrix, probabilities)">calcBL</button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  sumMathProbabilities,
  prettifyOutput,
  convertProbabilities,
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
    probabilities: {
      type: String,
      required: false,
    },
  },

  methods: {
    calcBL(matrix, probabilities) {
      const convertedProbabilities = convertProbabilities(probabilities);
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
