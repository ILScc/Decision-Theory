<template>
    <button class="button-main" type="button" @click="calcWald(matrix)">
        calcWald
    </button>
    <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { findMinInRows, prettifyOutput } from "../criteriasUtils";

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
        calcWald(matrix: number[][]) {
            const minInRows = findMinInRows(matrix);
            const decision = Math.max(...minInRows);
            this.result = prettifyOutput(minInRows, decision);
        },
    },
});
</script>
<style scoped src="./criteriasStyle.css"></style>
