import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Tracing } from '../models/main';

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

    const canvasElement = ref<HTMLCanvasElement>();
    const tracings = ref<Tracing[]>(mockData);
    const currentTracing = ref<Tracing>({
        imageID: 0,
    });
    const tracingOpacity = ref(1);
    const imageOpacity = ref(1);

    const getCurrentTracing = computed(() => currentTracing);

    const existingTracingIndex = computed((): number => {
        return tracings.value.findIndex(
            (t) => t.imageID === currentTracing.value.imageID
        );
    });

    const currentTracingInLibrary = computed((): boolean => {
        return Boolean(existingTracingIndex.value != -1);
    });

    const saveCurrentTracing = (): void => {
        const img = new Image();
        img.src = canvasElement.value.toDataURL();
        currentTracing.value.canvas = img;
        if (currentTracingInLibrary.value) {
            tracings.value[existingTracingIndex.value] = currentTracing.value;
        } else tracings.value.push(currentTracing.value);
    };

    const removeCurrentTracing = (): void => {
        if (confirm('Are you sure?'))
            tracings.value.splice(existingTracingIndex.value, 1);
    };

    const resetTracingOpacity = (): void => {
        tracingOpacity.value = 1;
    };

    const resetImageOpacity = (): void => {
        imageOpacity.value = 1;
    };

    return {
        canvasElement,
        tracings,
        currentTracing,
        tracingOpacity,
        imageOpacity,
        getCurrentTracing,
        currentTracingInLibrary,
        saveCurrentTracing,
        removeCurrentTracing,
        resetTracingOpacity,
        resetImageOpacity,
    };
});
