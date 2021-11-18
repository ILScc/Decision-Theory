<template>
    <form action="">
        <label for="Wald">Calc Wald Criteria</label>
        <input type="text" name="Wald" id="Wald" v-model="matrix" />
        <button type="button" @click="calcWald(matrix)">Calculate</button>
        <div>Result : {{ result }}</div>
    </form>
</template>
<script>
import {
    findMinInRows,
    handleDecision,
} from "../DecisonMakingMethods/utils.js";
export default {
    data() {
        return {
            matrix: this.$options.SAMPLE_MATRIX,
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
        calcWald(matrix) {
            const minInRows = findMinInRows(matrix);
            const decision = Math.max(...minInRows);
            const answer = handleDecision(minInRows, decision);
            this.result = answer;
        },
    },
};
</script>
