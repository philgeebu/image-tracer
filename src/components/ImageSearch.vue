<template>
    <div class="row justify-center">
        <q-card class="q-my-md" style="width: 20rem">
            <q-card-section>
                <q-input
                    v-model="searchTerm"
                    debounce="500"
                    label="Type to search for an image..."
                >
                    <template v-slot:append v-if="searchTerm">
                        <q-icon name="clear" @click="clear()" />
                    </template>
                    <template v-slot:append v-else>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </q-card-section>
        </q-card>
    </div>
    <q-card v-if="results.length">
        <div v-for="result in results" :key="result.id">
            <q-card-section>
                <div class="row justify-center">
                    <router-link
                        :to="'/' + result.id"
                        @click="setCurrentTracing(result)"
                    >
                        <img :src="result.webformatURL" />
                    </router-link>
                </div>
            </q-card-section>
            <q-separator />
        </div>
    </q-card>
    <div v-else class="text-center q-mt-xl text-grey-5">
        <p class="q-mb-xs">Welcome to</p>
        <p class="handwritten-font text-grey-3">imageTracer</p>
        <p class="q-mt-lg">Search for an image you like</p>
        <p class="handwritten-font text-grey-4">and TRACE IT!</p>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTracingStore } from '../stores/TracingStore';

const storeTracing = useTracingStore();

const searchTerm = ref('');
const results = ref([]);

const setCurrentTracing = (result: any): void => {
    storeTracing.currentTracing = {
        id: result.id,
        previewURL: result.previewURL,
        webformatURL: result.webformatURL,
        webformatWidth: result.webformatWidth,
        webformatHeight: result.webformatHeight,
    };
};

const clear = (): void => {
    searchTerm.value = '';
    results.value = [];
};

// watch searchTerm for changes, which is set on keyup with debounce,
// and trigger API search for JSON response, then set to results variable
watch(searchTerm, () => {
    if (searchTerm.value) {
        fetch(
            `https://pixabay.com/api/?key=30198755-511fed12f4c341988f11b1a00&q=${encodeURIComponent(
                searchTerm.value
            )}`
        )
            .then((response) => response.json())
            .then((data) => {
                results.value = data.hits;
            });
    } else clear();
});
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
p {
    font-size: 1.2rem;
}
.handwritten-font {
    margin: 0;
    font-size: 7rem;
}
</style>
