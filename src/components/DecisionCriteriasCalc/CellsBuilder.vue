<template>
  <form class="cells-builder">
    <input
      class="cells-builder__settings"
      type="number"
      name="rows"
      :value="rows"
      @input="$emit('update:rows', +getInputValue($event))"
      @focus="resetValue($event)"
    />
    <label class="cells-builder__text" for="rows"
      >Insert number of rows (decisions)</label
    >
    <input
      class="cells-builder__settings"
      type="number"
      name="columns"
      :value="cols"
      @input="$emit('update:cols', +getInputValue($event))"
      @focus="resetValue($event)"
    />
    <label class="cells-builder__text" for="columns"
      >Insert number of columns (conditions)</label
    >
    <input
      class="cells-builder__settings"
      type="text"
      name="probabilities"
      :value="probabilities"
      @blur="handleProbsInput($event)"
    />
    <label class="cells-builder__text" for="probabilities"
      >Insert probabilities</label
    >
    <div v-if="!isProbsSumEqualOne && !initialValue">
      Probabilities sum must be equal 1
    </div>
    <div v-if="!isProbsLengthValid && !initialValue">
      Number of inserted probabilities must be equal cols
    </div>
  </form>
</template>
<script lang="ts">
//TODO: replace v-if with list of options and choose between them
import { defineComponent, PropType } from "vue";
export default defineComponent({
  data() {
    return {
      initialValue: true,
    };
  },
  props: {
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    probabilities: { type: Object as PropType<number[]>, required: true },
  },
  emits: {
    "update:rows": null,
    "update:cols": null,
    "update:probabilities": null,
    "validation-success": null,
  },
  methods: {
    getInputValue(e: Event) {
      const target = e.target as HTMLInputElement;
      return target.value;
    },
    handleProbsInput(value) {
      const probabilities = this.getInputValue(value);
      if (!probabilities) this.initialValue = true;

      this.initialValue = false;
      this.updateProbs(probabilities);
      if (this.areProbsValid) {
        this.$emit("validation-success");
      }
    },
    updateProbs(probs) {
      const convertedProbabilities = probs.split(",").map((p) => +p);
      this.$emit("update:probabilities", convertedProbabilities);
    },
    resetValue(e: Event) {
      const target = e.target as HTMLInputElement;
      target.value = !+target.value ? "" : target.value;
    },
  },
  computed: {
    areProbsValid() {
      return this.isProbsLengthValid && this.isProbsSumEqualOne;
    },
    isProbsLengthValid() {
      return this.probabilities.length === this.cols;
    },

    isProbsSumEqualOne() {
      const probsSum = this.probabilities.reduce((prev, cur) => prev + cur, 0);
      return probsSum === 1;
    },
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
