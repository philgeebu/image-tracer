<template>
    <q-page>
        <q-card class="q-mt-lg">
            <q-card-section>
                <TracingCanvas />
            </q-card-section>
            <TracingPalette />
        </q-card>
    </q-page>
</template>
<script setup lang="ts">
import TracingCanvas from 'components/TracingCanvas.vue';
import TracingPalette from 'components/TracingPalette.vue';
</script>
