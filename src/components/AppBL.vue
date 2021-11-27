<template>
  <form action="">
    <label for="Wald">Calc Bayes-Laplace Criteria</label>
    <input type="text" name="BL" id="BL" v-model="matrix" />
    <label for="probabilities">Insert probabilities</label>
    <input
      type="text"
      name="probabilities"
      id="probabilities"
      v-model="probabilities"
    />
    <button type="button" @click="calcBL(matrix, probabilities)">
      Calculate
    </button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import {
  sumMathProbabilities,
  prettifyOutput,
  convertProbabilities,
} from "../DecisonMakingMethods/utils";
import { CriteriaData } from "../types";
export default defineComponent({
  props: {
    rows: {
      type: Number,
      required: true,
    },
    columns: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      matrix: this.$options.SAMPLE_MATRIX,
      probabilities: this.$options.SAMPLE_PROBABILITIES,
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
  SAMPLE_PROBABILITIES: "0.1, 0.3, 0.4, 0.2",
  methods: {
    calcBL(matrix, probabilities): void {
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
