<template>
  <form class="cells-builder">
    <input
      class="cells-builder__settings"
      type="number"
      name="rows"
      :value="rows"
      @input="$emit('update:rows', +$event.target.value)"
    />
    <label class="cells-builder__text" for="rows"
      >Insert number of rows (decisions)</label
    >
    <input
      class="cells-builder__settings"
      type="number"
      name="columns"
      :value="cols"
      @input="$emit('update:cols', +$event.target.value)"
    />
    <label class="cells-builder__text" for="columns"
      >Insert number of columns (conditions)</label
    >
    <input
      class="cells-builder__settings"
      type="text"
      name="probabilities"
      :value="probabilities"
      @input="$emit('update:probabilities', $event.target.value)"
    />
    <label class="cells-builder__text" for="probabilities"
      >Insert probabilities</label
    >
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    rows: Number,
    cols: Number,
    probabilities: String,
  },
  emits: {
    "update:rows": null,
    "update:cols": null,
    "update:probabilities": null,
  },
});
</script>
<style scoped>
.cells-builder__settings {
  width: 80%;
  height: 25px;
  margin: 0 auto;
  border: solid 1px #ccc;
  border-radius: 10px;
}

.cells-builder {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.cells-builder__text {
  margin: 0 auto;
}
.cells-builder input {
  margin-top: 5px;
}
</style>
