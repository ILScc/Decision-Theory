<template>
  <form action="">
    <label for="HL">Calc Hodges–Lehmann criteria</label>
    <input type="text" name="HL" id="HL" v-model="matrix" />
    <label for="probabilities">Insert probabilities</label>
    <input
      type="text"
      name="probabilities"
      id="probabilities"
      v-model="probabilities"
    />
    <label for="Lambda">Insert lambda (should be in range [0, 1])</label>
    <input type="text" name="lambda" id="lambda" v-model="lambda" />
    <button type="button" @click="calcHL(matrix, probabilities, lambda)">
      Calculate
    </button>
    <div>Result : {{ result }}</div>
  </form>
</template>
<script>
import {
  getLambda,
  findMinInRows,
  sumMathProbabilities,
  prettifyOutput,
  convertProbabilities
} from "../DecisonMakingMethods/utils.js";
export default {
  data() {
    return {
      matrix: this.$options.SAMPLE_MATRIX,
      lambda: getLambda(),
      result: null,
      probabilities: this.$options.SAMPLE_PROBABILITIES,
    };
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
    calcHL(matrix, probabilities, lambda = this.lambda) {
      const convertedProbabilities = convertProbabilities(probabilities);
      const lambdaMathProbabilities = sumMathProbabilities(
        matrix,
        convertedProbabilities
      ).map((value) => lambda * value);
      const lambdaMinInRows = findMinInRows(matrix).map(
        (value) => (1 - lambda.toFixed(1)) * value
      );
      const options = lambdaMathProbabilities.map(
        (value, i) => value + lambdaMinInRows[i]
      );
      const decision = Math.max(...options);
      const answer = prettifyOutput(options, decision);
      this.result = answer;
    },
  },
};
</script>
