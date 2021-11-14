<template>
    <body>
        <app-wald />
        <app-optimistic />
    </body>
</template>

<script>
import AppWald from "./components/AppWald.vue";
import AppOptimistic from "./components/AppOptimistic.vue";
export default {
    name: "App",
    components: {
        AppWald,
        AppOptimistic,
    },
};
</script>
