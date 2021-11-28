<template>
  <form action="">
    <input type="number" name="rows" v-model="rows" />
    <label for="rows">Insert number of rows (decisions)</label>
    <input type="number" name="columns" v-model="columns" />
    <label for="columns">Insert number of columns (conditions)</label>
  </form>
  <table>
    <tbody>
      <tr v-for="row in rows" :key="row">
        <td v-for="col in columns" :key="col">
          <input type="number" />
        </td>
      </tr>
    </tbody>
  </table>

  <app-BL />
  <app-germeyer />
  <app-HL />
  <app-hurwitz />
  <app-optimistic />
  <app-p-critreria />
  <app-savage />
  <app-wald />
</template>
<script lang="ts">
import { defineComponent } from "vue";

import AppBL from "./AppBL.vue";
import AppGermeyer from "./AppGermeyer.vue";
import AppHL from "./AppHL.vue";
import AppHurwitz from "./AppHurwitz.vue";
import AppOptimistic from "./AppOptimistic.vue";
import AppPCritreria from "./AppPCritreria.vue";
import AppSavage from "./AppSavage.vue";
import AppWald from "./AppWald.vue";
export default defineComponent({
  components: {
    AppBL,
    AppGermeyer,
    AppHL,
    AppHurwitz,
    AppOptimistic,
    AppPCritreria,
    AppSavage,
    AppWald,
  },
  data() {
    return {
      rows: 0,
      columns: 0,
    };
  },
  methods: {},
});
</script>
