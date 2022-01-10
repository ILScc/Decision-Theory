<template>
  <decision-criterias-calc></decision-criterias-calc>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DecisionCriteriasCalc from "./components/DecisionCriteriasCalc/DecisionCriteriasCalc.vue";

export default defineComponent({
  name: "App",
  components: {
    DecisionCriteriasCalc,
  },
});
</script>
