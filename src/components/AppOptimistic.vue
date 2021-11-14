<template>
    <form action="">
        <label for="Wald">Calc Optimistic Criteria</label>
        <input type="text" name="Optimistic" id="Optimistic" v-model="matrix" />
        <button type="button" @click="calcOptimistic(matrix)">Calculate</button>
        <div>Result : {{ result }}</div>
    </form>
</template>
<script>
import {
    findMaxInRows,
    handleDecision,
} from "../DecisonMakingMethods/utils.js";
export default {
    data() {
        return {
            matrix: [
                [54, 65, 50, 68],
                [67, 74, 55, 72],
                [51, 67, 78, 68],
                [73, 54, 67, 60],
                [76, 69, 67, 59],
            ],
            result: null,
        };
    },
    methods: {
        calcOptimistic(matrix) {
            const maxInRows = findMaxInRows(matrix);
            const decision = Math.max(...maxInRows);
            const answer = handleDecision(maxInRows, decision);
            this.result = answer;
        },
    },
};
//SAMPLE MATRIX
// [
//     [54, 65, 50, 68],
//     [67, 74, 55, 72],
//     [51, 67, 78, 68],
//     [73, 54, 67, 60],
//     [76, 69, 67, 59],
// ]
</script>
