<template>
    <div class="column">
        <h2 class="handwritten-font">Library</h2>
        <div v-for="tracing in storeTracing.tracings" :key="tracing.imageID">
            <q-separator />
            <router-link to="/trace" @click="setCurrentImage(tracing.imageID)">
                <img :src="tracing.previewURL" class="q-pa-sm" />
            </router-link>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useTracingStore } from '../stores/useTracingStore';
import { useImageStore } from '../stores/useImageStore';

const storeTracing = useTracingStore();
const storeImage = useImageStore();

const setCurrentImage = (id: number): void => {
    storeImage.currentImageID = id;
};
</script>
