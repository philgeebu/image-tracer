import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useImageStore = defineStore('imageStore', () => {
    const currentImageID = ref<number>();
    const opacity = ref(1);

    const getCurrentImageID = computed(() => currentImageID);

    return {
        currentImageID,
        opacity,
        getCurrentImageID,
    };
});
