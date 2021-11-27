<template>
  <form action="">
    <label for="Hurwitz">Calc Hurwitz</label>
    <input type="text" name="Hurwitz" id="Hurwitz" v-model="matrix" />
    <label for="Lambda">Insert lambda (should be in range [0, 1])</label>
    <input type="text" name="lambda" id="lambda" v-model="lambda" />
    <button type="button" @click="calcHurwitz(matrix)">Calculate</button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script lang="ts">
import {
  getLambda,
  findMinInRows,
  findMaxInRows,
  prettifyOutput,
} from "../DecisonMakingMethods/utils";
export default {
  data() {
    return {
      matrix: this.$options.SAMPLE_MATRIX,
      lambda: getLambda(),
      result: null,
    };
  },
  SAMPLE_MATRIX: [
    [54, 65, 50, 68],
    [67, 74, 55, 72],
    [51, 67, 78, 68],
    [73, 54, 67, 60],
    [76, 69, 67, 59],
  ],
  methods: {
    calcHurwitz(matrix, lambda = this.lambda) {
      const lambdaMinInRows = findMinInRows(matrix).map(
        (value) => value * lambda
      );
      const lambdaMaxInRows = findMaxInRows(matrix).map(
        (value) => (1 - lambda).toFixed(1) * value
      );
      const options = lambdaMaxInRows.map(
        (value, i) => value + lambdaMinInRows[i]
      );
      const decision = Math.max(...options);
      const answer = prettifyOutput(options, decision);
      this.result = answer;
    },
  },
};
</script>
