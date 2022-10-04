<template>
    <h2>Image Search</h2>
    <ol>
        <li v-for="result in results" :key="result.id">
            <img :src="getImageUrl(result.previewURL)" alt="" />
        </li>
    </ol>
</template>

<script setup>
import { ref } from 'vue';
const results = ref([]);
const getImageUrl = (name) => {
    return new URL(`${name}`, import.meta.url).href;
};
const searchImageApi = () => {
    fetch(
        'https://pixabay.com/api/?key=30198755-511fed12f4c341988f11b1a00&q=yellow+flowers&image_type=photo'
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            results.value = data.hits;
            console.log(results.value);
        });
};
searchImageApi();
</script>
