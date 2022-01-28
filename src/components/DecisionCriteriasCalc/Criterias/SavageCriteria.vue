<template>
    <button class="button-main" type="button" @click="calcSavage(matrix)">
        calcSavage
    </button>
    <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import { buildRiskMatrix, prettifyOutput } from "../criteriasUtils";
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
        calcSavage(matrix: number[][]) {
            const riskMatrix = buildRiskMatrix(matrix);
            const maxRisks = riskMatrix.map((row) => Math.max(...row));
            const decision = Math.min(...maxRisks);
            this.result = prettifyOutput(maxRisks, decision);
        },
    },
});
</script>
<style scoped src="./criteriasStyle.css"></style>
