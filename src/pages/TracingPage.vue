<template>
    <q-page>
        {{ routeID }}
        <TracingCanvas />
    </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TracingCanvas from 'components/TracingCanvas.vue';
const route = useRoute();
const routeID = ref(route.params.id);
</script>
