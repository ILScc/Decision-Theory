<template>
  <button type="button" @click="calcWald(matrix)">calcWald</button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { findMinInRows, prettifyOutput } from "../DecisonMakingMethods/utils";

export default defineComponent({
  data() {
    return {
      result: "",
    };
  },
  props: {
    matrix: {
      type: Object,
      required: false,
    },
  },
  methods: {
    calcWald(matrix) {
      const minInRows = findMinInRows(matrix);
      const decision = Math.max(...minInRows);
      this.result = prettifyOutput(minInRows, decision);
      console.log(matrix);
    },
  },
});
</script>
