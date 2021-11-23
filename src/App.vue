<template>
  <body>
    <app-wald />
    <app-optimistic />
    <app-BL />
    <app-hurwitz />
    <app-savage />
  </body>
</template>

<script>
import AppWald from "./components/AppWald.vue";
import AppOptimistic from "./components/AppOptimistic.vue";
import AppBL from "./components/AppBL.vue";
import AppHurwitz from "./components/AppHurwitz.vue";
import AppSavage from "./components/AppSavage.vue";
export default {
  name: "App",
  components: {
    AppWald,
    AppOptimistic,
    AppBL,
    AppHurwitz,
    AppSavage,
  },
};
</script>
