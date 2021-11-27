<template>
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
import AppBL from "./components/AppBL.vue";
import AppGermeyer from "./components/AppGermeyer.vue";
import AppHL from "./components/AppHL.vue";
import AppHurwitz from "./components/AppHurwitz.vue";
import AppOptimistic from "./components/AppOptimistic.vue";
import AppPCritreria from "./components/AppPCritreria.vue";
import AppSavage from "./components/AppSavage.vue";
import AppWald from "./components/AppWald.vue";

export default defineComponent({
  name: "App",
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
});
</script>
