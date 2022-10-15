<template>
    <div class="row justify-center">
        <q-card class="q-my-md" style="width: 20rem">
            <q-card-section>
                <q-input
                    v-model="searchTerm"
                    debounce="500"
                    placeholder="Search for an image..."
                >
                    <template v-slot:append>
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
                        to="/trace"
                        @click="setCurrentImage(result.id)"
                    >
                        <img :src="getImageUrl(result.webformatURL)" alt=""
                    /></router-link>
                </div>
            </q-card-section>
            <q-separator />
        </div>
    </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useImageStore } from '../stores/useImageStore';

const storeImage = useImageStore();

const searchTerm = ref('');
const results = ref(<any>[]);

const getImageUrl = (name: string): string => {
    return new URL(`${name}`, import.meta.url).href;
};

const setCurrentImage = (id: number): void => {
    storeImage.currentImageID = id;
};

watch(searchTerm, () => {
    fetch(
        `https://pixabay.com/api/?key=30198755-511fed12f4c341988f11b1a00&q=${encodeURIComponent(
            searchTerm.value
        )}&image_type=photo`
    )
        .then((response) => response.json())
        .then((data) => {
            results.value = data.hits;
        });
});
</script>
