<template>
    <button class="btn button-main" type="button" @click="calcPCriteria(matrix)">
        calcHurwitz
    </button>
    <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import {
    isOnlyPositiveMatrix,
    handlePCriterionValidMatrix,
    handlePCriterionInvalidMatrix,
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
    },
    methods: {
        calcPCriteria(matrix: number[][]) {
            const isMatrixValid = isOnlyPositiveMatrix(matrix);
            const rowMultiplications = isMatrixValid
                ? handlePCriterionValidMatrix(matrix)
                : handlePCriterionInvalidMatrix(matrix);
            const decision = Math.max(...rowMultiplications);
            this.result = prettifyOutput(rowMultiplications, decision);
        },
    },
});
</script>
<style scoped src="./criteriasStyle.css"></style>
