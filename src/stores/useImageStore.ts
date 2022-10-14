import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useImageStore = defineStore('imageStore', () => {
    const currentImage = ref<number>();

    return {
        currentImage,
    };
});
