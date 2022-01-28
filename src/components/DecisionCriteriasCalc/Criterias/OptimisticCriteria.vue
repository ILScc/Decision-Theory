<template>
    <button class="button-main" type="button" @click="calcOptimistic(matrix)">
        calcOptimistic
    </button>
    <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import { findMaxInRows, prettifyOutput } from "../criteriasUtils";
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
        calcOptimistic(matrix) {
            const maxInRows = findMaxInRows(matrix);
            const decision = Math.max(...maxInRows);
            this.result = prettifyOutput(maxInRows, decision);
        },
    },
});
</script>
<style scoped src="./criteriasStyle.css"></style>
