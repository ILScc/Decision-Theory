<template>
    <button
        class="btn button-main"
        type="button"
        @click="calcBL(matrix, probabilities)"
    >
        calcBL
    </button>
    <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import { sumMathProbabilities, prettifyOutput } from "../criteriasUtils";
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
        calcBL(matrix: number[][], probabilities: number[]) {
            const mathProbabilities = sumMathProbabilities(
                matrix,
                probabilities
            );
            const decision = Math.max(...mathProbabilities);
            this.result = prettifyOutput(mathProbabilities, decision);
        },
    },
});
</script>
<style scoped src="./criteriasStyle.css"></style>
