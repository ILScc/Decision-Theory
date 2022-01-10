<template>
  <table class="matrix">
    <tbody class="matrix" v-if="rows">
      <tr v-for="row in rows" :key="row">
        <input
          class="cell"
          @change="handleInput"
          :cell="`${row}${col}`"
          v-for="col in cols"
          :key="col"
          type="number"
        />
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    rows: {
      type: Number,
      requred: true,
    },
    cols: {
      type: Number,
      required: true,
    },
  },
  emits: {
    setCells: null,
  },
  data() {
    return { cells: new Map() };
  },
  methods: {
    handleInput({ target }) {
      const cellOrderPath = target.attributes.cell.value;
      const cellValue = target.value;
      this.cells.set(+cellOrderPath, +cellValue);
      this.$emit("setCells", this.cells);
      if (target.classList.contains("cell-invalid")) {
        target.classList.remove("cell-invalid");
      }
    },
  },
});
</script>
<style scoped>
.matrix {
  max-width: 100vw;
  margin: 5px auto;
}
.cell {
  border: solid 1px;
  border-radius: 4px;
  margin: 2px;
  padding: 0;
  width: 6rem;

  font: inherit;
  line-height: normal;
}
.cell-invalid {
  border: solid 1px red;
}
@media (max-width: 500px) {
  .cell {
    width: 1.5rem;
  }
}
</style>
