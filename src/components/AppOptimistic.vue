<template>
  <button type="button" @click="calcOptimistic(matrix)">calcOptimistic</button>
  <div>{{ result }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { findMaxInRows, prettifyOutput } from "../DecisonMakingMethods/utils";
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
    probabilities: {
      type: String,
      required: false,
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
