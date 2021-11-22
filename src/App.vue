<template>
  <body>
    <app-wald />
    <app-optimistic />
    <app-BL />
  </body>
</template>

<script>
import AppWald from "./components/AppWald.vue";
import AppOptimistic from "./components/AppOptimistic.vue";
import AppBL from "./components/AppBL.vue";
export default {
  name: "App",
  components: {
    AppWald,
    AppOptimistic,
    AppBL,
  },
};
</script>
