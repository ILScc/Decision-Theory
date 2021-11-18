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
<script>
import {
    sumMathProbabilities,
    handleDecision,
} from "../DecisonMakingMethods/utils.js";
export default {
    data() {
        return {
            matrix: this.$options.SAMPLE_MATRIX,
            probabilities: this.$options.SAMPLE_PROBABILITIES,
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
    SAMPLE_PROBABILITIES: [0.1, 0.3, 0.4, 0.2],
    methods: {
        calcBL(matrix, probabilities) {
            const mathProbabilities = sumMathProbabilities(
                matrix,
                probabilities
            );
            const decision = Math.max(...mathProbabilities);
            const answer = handleDecision(mathProbabilities, decision);
            this.result = answer;
        },
    },
};
</script>
