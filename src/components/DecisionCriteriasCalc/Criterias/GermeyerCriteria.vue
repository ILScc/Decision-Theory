<template>
    <button
        class="btn button-main"
        type="button"
        @click="calcGermeyer(matrix, probabilities)"
    >
        calcGermeyer
    </button>
    <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import {
    isOnlyPositiveMatrix,
    handleGermeyerValidMatrix,
    handleGermeyerInvalidMatrix,
    prettifyOutput,
} from "../criteriasUtils";

export default defineComponent({
    data() {
        return {
            result: "",
        };
    },
    props: {
        matrix: {
            type: Object as PropType<number[][]>,
            required: true,
        },
        probabilities: {
            type: Object as PropType<number[]>,
            required: true,
        },
    },
    methods: {
        calcGermeyer(matrix: number[][], probabilities: number[]) {
            const isMatrixValid = !isOnlyPositiveMatrix(matrix);
            const minValueMathProbs = isMatrixValid
                ? handleGermeyerValidMatrix(matrix, probabilities)
                : handleGermeyerInvalidMatrix(matrix, probabilities);
            const decision = Math.max(...minValueMathProbs);
            this.result = prettifyOutput(minValueMathProbs, decision);
        },
    },
});
</script>
<style scoped src="./criteriasStyle.css"></style>
