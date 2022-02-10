<template>
    <div class="matrix" v-if="rows">
        <div v-for="row in rows" :key="row">
            <input
                class="matrix__cell"
                @blur="handleInput"
                :cell="`${row}${col}`"
                v-for="col in cols"
                :key="col"
                :class="{ 'matrix__cell_invalid': !cells.get(+`${row}${col}`) }"
                type="number"
            />
        </div>
    </div>
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
        return { cells: new Map(), invalidCells: []};
    },
    methods: {
        handleInput({ target }) {
            if (!this.rows) return;
            const cellOrder = target.attributes.cell.value;
            const cellValue = target.value;

            if (cellValue === "") {
                this.cells.delete(+cellOrder);
                return;
            }
            this.cells.set(+cellOrder, +cellValue);
            this.$emit("setCells", this.cells);
        },
    },
    computed: {},
});
</script>
<style scoped>
.matrix {
    max-width: 100vw;
    margin: 5px auto;
}
.matrix__cell {
    border: solid 1px;
    border-radius: 4px;
    margin: 2px;
    padding: 0;
    width: 6rem;

    font: inherit;
    line-height: normal;
}
.matrix__cell_invalid {
    border: solid 1px red;
}
@media (max-width: 500px) {
    .matrix__cell {
        width: 1.5rem;
    }
}
</style>
