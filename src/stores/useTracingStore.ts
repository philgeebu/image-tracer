import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTracingStore = defineStore('tracingStore', () => {
    const mockData = [
        {
            imageID: 3010309,
            previewURL:
                'https://cdn.pixabay.com/photo/2017/12/10/17/00/robot-3010309_150.jpg',
        },
        {
            imageID: 3609237,
            previewURL:
                'https://cdn.pixabay.com/photo/2018/08/15/22/24/bridge-3609237_150.jpg',
        },
        {
            imageID: 413685,
            previewURL:
                'https://cdn.pixabay.com/photo/2014/08/08/20/51/hunger-413685_150.jpg',
        },
    ];

    const opacity = ref(1);
    const currentTracing = ref({});
    const tracings = ref(mockData);

    return {
        opacity,
        currentTracing,
        tracings,
    };
});
