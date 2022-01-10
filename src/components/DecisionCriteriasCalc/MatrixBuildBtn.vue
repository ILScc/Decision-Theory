<template>
  <button
    class="button-main"
    type="button"
    @click="buildMatrix"
    :class="isMatrixBuilded"
  >
    Build matrix
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    cells: { type: Object, required: true },
    probabilities: { type: Object as PropType<number[]>, required: true },
    isBuilded: { type: Boolean as PropType<boolean | null>, required: false },
  },
  emits: {
    buildMatrix: null,
  },
  methods: {
    buildMatrix() {
      const orderedCells = [...this.cells.keys()].sort((a, b) => a - b);
      const orderedCellsValues = orderedCells.map((key) => {
        const value = this.cells.get(key);
        return value ? value : NaN;
      });
      const matrix = this.buildMatrixRows(orderedCellsValues);
      this.$emit("buildMatrix", matrix);
    },
    buildMatrixRows<T>(cells: T[]) {
      const matrix: T[][] = [];
      if (this.cols) {
        for (let i = 0; i < cells.length; i += this.cols) {
          matrix.push(cells.slice(i, i + this.cols));
        }
        return matrix;
      }
      return matrix;
    },
  },
  computed: {
    isMatrixBuilded(): string {
      if (this.isBuilded === null) return "";
      return this.isBuilded ? "button-main--success" : "button-main--fail";
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
  margin: 5px;
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
.button-main--success {
  border: 1px solid green;
}
.button-main--fail {
  border: 1px solid red;
}
</style>
