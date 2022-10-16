import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Tracing } from '../models/main';
import { TRACINGS } from './mock-data';

export const useTracingStore = defineStore('tracingStore', () => {
    const canvasElement = ref<HTMLCanvasElement>();
    const tracings = ref<Tracing[]>(TRACINGS);
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
