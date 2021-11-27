<template>
  <app-matrix></app-matrix>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppMatrix from "./components/AppMatrix.vue";


export default defineComponent({
  name: "App",
  components: {
    AppMatrix,
  },
});
</script>
