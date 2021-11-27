<template>Place</template>
<script lang="ts">
import { defineComponent } from "vue";
import { findMinInRows, prettifyOutput } from "../DecisonMakingMethods/utils";
import { CriteriaData } from "../types";

export default defineComponent({
  data() {
    return {
      matrix: "",
      result: "",
    } as CriteriaData;
  },

  methods: {
    calcWald(matrix: any) {
      const minInRows = findMinInRows(matrix);
      const decision = Math.max(...minInRows);
      this.result = prettifyOutput(minInRows, decision);
    },
  },
});
</script>
