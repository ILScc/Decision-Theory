<template>
    <form class="cells-builder">
        <label class="cells-builder__text" for="rows"
            ><span>Insert number of rows (decisions)</span>
            <input
                class="cells-builder__settings"
                type="number"
                name="rows"
                :value="rows"
                @input="$emit('update:rows', +getInputValue($event))"
                @focus="resetValue($event)"
            />
        </label>

        <label class="cells-builder__text" for="columns"
            ><span>Insert number of columns (conditions)</span
            ><input
                class="cells-builder__settings"
                type="number"
                name="columns"
                :value="cols"
                @input="$emit('update:cols', +getInputValue($event))"
                @focus="resetValue($event)"
        /></label>

        <label class="cells-builder__text" for="probabilities"
            ><span>Insert probabilities</span>
            <input
                class="cells-builder__settings"
                type="text"
                name="probabilities"
                :value="probabilities"
                @blur="handleProbsInput($event)"
        /></label>
        <div
            class="cells-bulder__warning"
            v-if="probsSum !== 1 && !initialValue"
        >
            Probabilities sum must be equal 1
        </div>
        <div
            class="cells-bulder__warning"
            v-if="!isProbsLengthValid && !initialValue"
        >
            Number of inserted probabilities must be equal cols
        </div>
    </form>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
    data() {
        return {
            initialValue: true,
            isProbsLengthValid: false,
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
        validation: null,
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
        },
        updateProbs(probs) {
            const convertedProbabilities = probs.split(",").map((p) => +p);
            const areProbsValid =
                this.calcProbsLength(convertedProbabilities, this.cols) &&
                this.probsSum === 1;

            this.$emit("validation", areProbsValid);
            this.$emit("update:probabilities", convertedProbabilities);
        },
        resetValue(e: Event) {
            const target = e.target as HTMLInputElement;
            target.value = !+target.value ? "" : target.value;
        },
        calcProbsLength(probs, cols) {
            const isEqual = probs.length === cols;
            this.isProbsLengthValid = isEqual;
            return isEqual;
        },
    },
    computed: {
        probsSum() {
            return this.probabilities.reduce((prev, cur) => prev + cur, 0);
        },
    },
});
</script>
<style scoped>
.cells-builder {
    display: flex;
    flex-direction: column;
    margin: 10px;
}
.cells-builder__settings {
    width: 80%;
    height: 25px;
    margin: 0 auto;
    border: solid 1px #ccc;
    border-radius: 10px;
}
.cells-builder input {
    margin-top: 5px;
}
.cells-bulder__warning {
    margin-top: 5px;
    color: tomato;
    align-self: center;
}
</style>
