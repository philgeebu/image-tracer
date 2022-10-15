<template>
    <q-page>
        <q-card class="q-mt-lg">
            <q-card-section>
                <TracingCanvas />
            </q-card-section>
            <ToolBox />
        </q-card>
    </q-page>
</template>
<script setup lang="ts">
import TracingCanvas from 'components/TracingCanvas.vue';
import ToolBox from 'components/ToolBox.vue';
</script>
