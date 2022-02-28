<template>
    <form class="cells-builder">
        <label class="cells-builder__text"
            ><span>Insert number of rows (decisions)</span>
            <input
                class="cells-builder__settings"
                type="number"
                name="rows"
                :value="rows"
                @input="$emit('update:rows', +getInputValue($event))"
            />
        </label>

        <label class="cells-builder__text"
            ><span>Insert number of columns (conditions)</span
            ><input
                class="cells-builder__settings"
                type="number"
                name="columns"
                :value="cols"
                @input="$emit('update:cols', +getInputValue($event))"
        /></label>

        <label class="cells-builder__text"
            ><span>Insert probabilities</span>
            <input
                v-for="(col, idx) in cols"
                :key="col"
                class="cells-builder__settings"
                type="text"
                name="probabilities"
                :value="probabilities[idx]"
                @blur="handleProbsInput(idx, $event)"
        /></label>
        <!-- <div
            class="cells-bulder__warning"
            v-if="probsSum !== 1 && !initialValue"
        >
            Probabilities sum must be equal 1
        </div> -->
    </form>
</template>
<script lang="ts">
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
    },
    methods: {
        getInputValue(e: Event) {
            const target = e.target as HTMLInputElement;
            return target.value;
        },
        handleProbsInput(idx, e: Event) {
            const probability = +this.getInputValue(e);

            const newProbs = this.probabilities.slice();
            newProbs[idx] = probability;
            this.$emit("update:probabilities", newProbs);
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
