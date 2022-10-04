<script setup>
import { ref } from "vue";

const selectedImage = ref(null);
const imgSource = ref(null);

const displaySelectedImage = (value) => {
    imgSource.value = URL.createObjectURL(value);
};
</script>

<template>
    <q-form>
        <q-file
            accept="image/*"
            v-model="selectedImage"
            label="Select image..."
            @update:model-value="(newValue) => displaySelectedImage(newValue)"
        />
    </q-form>
    <q-card>
        <img v-if="imgSource" :src="imgSource" />
    </q-card>
</template>
