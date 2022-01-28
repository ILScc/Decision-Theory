<template>
    <button
        class="btn button-main"
        type="button"
        @click="calcHurwitz(matrix, lambda)"
    >
        calcHurwitz
    </button>
    <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import {
    getLambda,
    findMinInRows,
    findMaxInRows,
    prettifyOutput,
} from "../criteriasUtils";
export default defineComponent({
    data() {
        return {
            lambda: getLambda(),
            result: "",
        };
    },
    props: {
        matrix: {
            type: Object as PropType<number[][]>,
            required: true,
        },
    },
    methods: {
        calcHurwitz(matrix: number[][], lambda = 0.5) {
            const lambdaMinInRows = findMinInRows(matrix).map(
                (value) => value * lambda
            );
            const lambdaMaxInRows = findMaxInRows(matrix).map(
                (value) => Number((1 - lambda).toFixed(1)) * value
            );
            const options = lambdaMaxInRows.map(
                (value, i) => value + lambdaMinInRows[i]
            );
            const decision = Math.max(...options);
            this.result = prettifyOutput(options, decision);
        },
    },
});
</script>
<style scoped src="./criteriasStyle.css"></style>
