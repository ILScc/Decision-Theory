<template>
    <div class="matrix">
        <div class="matrix" v-if="rows">
            <div v-for="row in rows" :key="row">
                <input
                    class="cell"
                    @blur="handleInput"
                    :cell="`${row}${col}`"
                    v-for="col in cols"
                    :key="col"
                    type="number"
                />
            </div>
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
        return { cells: new Map() };
    },
    methods: {
        handleInput({ target }) {
            if (!this.rows) return;
            const cellOrder = target.attributes.cell.value;
            const cellValue = target.value;

            if (cellValue === "") {
                this.cells.delete(+cellOrder);
                target.classList.add("cell-invalid");
                return;
            }
            this.cells.set(+cellOrder, +cellValue);

            if (target.classList.contains("cell-invalid")) {
                target.classList.remove("cell-invalid");
            }
            this.$emit("setCells", this.cells);
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
