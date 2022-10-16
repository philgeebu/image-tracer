<template>
    <div class="column">
        <h2 class="handwritten-font">Library</h2>
        <div v-for="tracing in storeTracing.tracings" :key="tracing.imageID">
            <q-separator />
            <router-link to="/trace" @click="setCurrentTracing(tracing)">
                <img :src="tracing.previewURL" class="q-pa-sm" />
            </router-link>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useTracingStore } from '../stores/TracingStore';
import { Tracing } from '../models/main';

const storeTracing = useTracingStore();

const setCurrentTracing = (tracing: Tracing): void => {
    storeTracing.currentTracing = tracing;
};
</script>
