<template>
    <div class="column q-pb-xl">
        <h2 class="handwritten-font">Library</h2>
        <div v-for="tracing in storeTracing.tracings" :key="tracing.id">
            <q-separator />
            <router-link
                :to="'/' + tracing.id"
                @click="setCurrentTracing(tracing)"
            >
                <img :src="tracing.previewURL" class="q-pa-sm" />
            </router-link>
        </div>
        <q-separator />
        <q-btn
            glossy
            @click="saveToLocalStorage()"
            label="Save"
            class="bg-deep-purple-10 q-mt-xl"
        />
    </div>
</template>
<script setup lang="ts">
import { useTracingStore } from '../stores/TracingStore';
import { Tracing } from '../models/main';

const storeTracing = useTracingStore();

// set store variable tracings to local storage if it exists
if (window.localStorage.getItem('term_project_Gee'))
    storeTracing.tracings = JSON.parse(
        window.localStorage.getItem('term_project_Gee')
    );

// used in conjunction with route changes to set the current tracing variable
const setCurrentTracing = (tracing: Tracing): void => {
    storeTracing.currentTracing = tracing;
};

const saveToLocalStorage = (): void => {
    window.localStorage.setItem(
        'term_project_Gee',
        JSON.stringify(storeTracing.tracings)
    );
};
</script>

<style scoped>
img {
    opacity: 0.75;
    transition: 0.5s ease;
}
img:hover {
    opacity: 1;
    transition: 0.5s ease;
}
</style>
