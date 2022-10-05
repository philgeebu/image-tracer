<template>
    <div class="row justify-center">
        <q-card class="q-my-md search-input-card">
            <q-card-section>
                <q-form
                    @submit="searchImageApi"
                    @reset="onReset"
                    class="q-gutter-md"
                >
                    <q-input
                        v-model="searchTerm"
                        label="Search for an image..."
                    />
                    <div class="row justify-end">
                        <q-btn
                            glossy
                            dense
                            size="xl"
                            class="handwritten-font q-px-lg"
                            type="submit"
                            color="green-9"
                            text-color="grey-1"
                            label="Submit"
                        />
                        <q-btn
                            glossy
                            dense
                            size="xl"
                            class="handwritten-font q-px-lg q-ml-sm"
                            type="reset"
                            color="grey-5"
                            text-color="grey-14"
                            label="Clear"
                        />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
    <q-card v-if="results.length">
        <div v-for="result in results" :key="result.id">
            <q-card-section>
                <div class="row justify-center">
                    <router-link :to="result.id.toString()">
                        <img :src="getImageUrl(result.webformatURL)" alt=""
                    /></router-link>
                </div>
            </q-card-section>
            <q-separator />
        </div>
    </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const searchTerm = ref('');
const results = ref([]);
const getImageUrl = (name) => {
    return new URL(`${name}`, import.meta.url).href;
};
const searchImageApi = () => {
    if (searchTerm.value) {
        fetch(
            `https://pixabay.com/api/?key=30198755-511fed12f4c341988f11b1a00&q=${encodeURIComponent(
                searchTerm.value
            )}&image_type=photo`
        )
            .then((response) => response.json())
            .then((data) => {
                results.value = data.hits;
            });
    } else alert('Please enter a search term');
};

const onReset = () => {
    searchTerm.value = '';
    results.value = [];
};
</script>

<style scoped>
.search-input-card {
    width: 24em;
}
</style>
