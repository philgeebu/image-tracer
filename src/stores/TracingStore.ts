import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Tracing } from '../models/main';
import { TRACINGS } from './mock-data';

export const useTracingStore = defineStore('tracingStore', () => {
    const blankTracing: Tracing = {
        id: 0,
        previewURL: '',
        webformatURL: '',
        webformatWidth: 0,
        webformatHeight: 0,
    };
    // STATE
    const canvasElement = ref<HTMLCanvasElement>();
    const currentTracing = ref<Tracing>(blankTracing);
    const tracings = ref<Tracing[]>(TRACINGS);
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
        context.clearRect(
            0,
            0,
            currentTracing.value.webformatWidth,
            currentTracing.value.webformatHeight
        );
    };

    const exportCanvas = (): void => {
        const canvasUrl = canvasElement.value.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = canvasUrl;
        downloadLink.download =
            'imageTracer-tracing-' + currentTracing.value.id;
        downloadLink.click();
        downloadLink.remove();
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

    return {
        // STATE
        canvasElement,
        currentTracing,
        tracings,
        tracingOpacity,
        imageOpacity,
        // GETTERS
        getCurrentTracing,
        currentTracingInLibrary,
        // ACTIONS
        clearCanvas,
        exportCanvas,
        saveCurrentTracing,
        removeCurrentTracing,
    };
});
