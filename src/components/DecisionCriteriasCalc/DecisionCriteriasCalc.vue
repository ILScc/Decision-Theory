<template>
  <main class="wrapper">
    <div class="matrix-builder">
      <cells-builder
        v-model:rows="rows"
        v-model:cols="cols"
        v-model:probabilities="probabilities"
      />
      <matrix-table :rows="rows" :cols="cols" @setCells="setCells" />
      <matrix-build-btn
        :cols="cols"
        :rows="rows"
        :cells="cells"
        :probabilities="probabilities"
        :isBuilded="isBuilded"
        @build-matrix="handleBuild"
      />
    </div>

    <div class="crit-wrapper">
      <bayes-laplace :matrix="matrix" :probabilities="probabilities" />
      <germeyer-criteria :matrix="matrix" :probabilities="probabilities" />
      <hodges-lehmann :matrix="matrix" :probabilities="probabilities" />
      <hurwitz-criteria :matrix="matrix" />
      <optimistic-criteria :matrix="matrix" />
      <p-criteria :matrix="matrix" />
      <savage-criteria :matrix="matrix" />
      <wald-criteria :matrix="matrix" />
    </div>
  </main>
</template>
<script lang="ts">
import { BuilderData } from "@/types";
import { defineComponent } from "vue";
import MatrixBuildBtn from "./MatrixBuildBtn.vue";
import BayesLaplace from "./Criterias/BayesLaplace.vue";
import GermeyerCriteria from "./Criterias/GermeyerCriteria.vue";
import HurwitzCriteria from "./Criterias/HurwitzCriteria.vue";
import OptimisticCriteria from "./Criterias/OptimisticCriteria.vue";
import PCriteria from "./Criterias/PCriteria.vue";
import SavageCriteria from "./Criterias/SavageCriteria.vue";
import WaldCriteria from "./Criterias/WaldCriteria.vue";
import HodgesLehmann from "./Criterias/HodgesLehmann.vue";
import MatrixTable from "./MatrixTable.vue";
import CellsBuilder from "./CellsBuilder.vue";

export default defineComponent({
  components: {
    BayesLaplace,
    GermeyerCriteria,
    HurwitzCriteria,
    OptimisticCriteria,
    PCriteria,
    SavageCriteria,
    WaldCriteria,
    MatrixBuildBtn,
    HodgesLehmann,
    MatrixTable,
    CellsBuilder,
  },
  data() {
    return {
      rows: 0,
      cols: 0,
      matrix: [],
      cells: new Map(),
      probabilities: [],
      isBuilded: null,
    } as BuilderData;
  },

  methods: {
    handleBuild(matrix) {
      if (!this.cols || !this.rows) return;
      const invalidCells = this.getInvalidCells();
      if (invalidCells.length) {
        this.markInvalid(invalidCells);
        this.isBuilded = false;
        return;
      }
      this.isBuilded = true;
      this.matrix = matrix;
    },
    setCells(cells) {
      this.cells = cells;
    },

    markInvalid(invalidCells) {
      invalidCells.forEach((cell) => cell.classList.add("cell-invalid"));
    },

    getInvalidCells() {
      const cells = document.getElementsByClassName(
        "cell" // eslint-disable-next-line no-undef
      ) as HTMLCollectionOf<HTMLInputElement>;
      const invalidCells: HTMLInputElement[] = [];
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].value === "") {
          invalidCells.push(cells[i]);
        }
      }
      return invalidCells;
    },
  },
});
</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  gap: 10%;
}
@media (max-width: 500px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
  }
}
.crit-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  margin-top: 20px;
  gap: 10px;
}
.matrix-builder {
  display: flex;
  flex-direction: column;
}
</style>
