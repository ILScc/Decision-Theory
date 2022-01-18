<template>
    <button
        class="button-main"
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
<style scoped>
.button-main {
    height: 8%;
    border: solid 1px;
    background-color: none;
    border-radius: 10px;
    margin: 0;
    padding: 3px;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;
}
.button-main:hover {
    background: rgb(248, 246, 246);
    transition: background 0.1s ease-in;
}
</style>
