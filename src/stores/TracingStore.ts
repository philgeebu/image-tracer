import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Tracing } from '../models/main';
import { TRACINGS } from './mock-data';

export const useTracingStore = defineStore('tracingStore', () => {
    // STATE
    const canvasElement = ref<HTMLCanvasElement>();
    const canvasWidth = ref(0);
    const canvasHeight = ref(0);
    const tracings = ref<Tracing[]>(TRACINGS);
    const currentTracing = ref<Tracing>();
    const tracingOpacity = ref(1);
    const imageOpacity = ref(1);

    // GETTERS
    const getCurrentTracing = computed(() => currentTracing);

    const existingTracingIndex = computed((): number =>
        tracings.value.findIndex((t) => t.id === currentTracing.value.id)
    );

    const currentTracingInLibrary = computed((): boolean =>
        Boolean(existingTracingIndex.value != -1)
    );

    // ACTIONS
    const clearCanvas = (): void => {
        const context = canvasElement.value.getContext('2d');
        context.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    };

    const saveCurrentTracing = (): void => {
        try {
            currentTracing.value.canvas = canvasElement.value.toDataURL();
            if (currentTracingInLibrary.value) {
                tracings.value[existingTracingIndex.value] =
                    currentTracing.value;
            } else tracings.value.push(currentTracing.value);
            alert('Saved!');
        } catch (error) {
            alert(error);
        }
    };

    const removeCurrentTracing = (): void => {
        if (confirm('Are you sure?')) {
            tracings.value.splice(existingTracingIndex.value, 1);
            clearCanvas();
        }
    };

    const resetTracingOpacity = (): void => {
        tracingOpacity.value = 1;
    };

    const resetImageOpacity = (): void => {
        imageOpacity.value = 1;
    };

    return {
        // STATE
        canvasElement,
        canvasWidth,
        canvasHeight,
        tracings,
        currentTracing,
        tracingOpacity,
        imageOpacity,
        // GETTERS
        getCurrentTracing,
        currentTracingInLibrary,
        // ACTIONS
        clearCanvas,
        saveCurrentTracing,
        removeCurrentTracing,
        resetTracingOpacity,
        resetImageOpacity,
    };
});
