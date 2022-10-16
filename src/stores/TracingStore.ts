import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Tracing } from '../models/main';
import { TRACINGS } from './mock-data';

export const useTracingStore = defineStore('tracingStore', () => {
    // STATE
    const canvasElement = ref<HTMLCanvasElement>();
    const tracings = ref<Tracing[]>(TRACINGS);
    const currentTracing = ref<Tracing>({
        imageID: 0,
    });
    const tracingOpacity = ref(1);
    const imageOpacity = ref(1);

    // GETTERS
    const getCurrentTracing = computed(() => currentTracing);

    const existingTracingIndex = computed((): number =>
        tracings.value.findIndex(
            (t) => t.imageID === currentTracing.value.imageID
        )
    );

    const currentTracingInLibrary = computed((): boolean =>
        Boolean(existingTracingIndex.value != -1)
    );

    // ACTIONS
    const saveCurrentTracing = (): void => {
        try {
            const img = new Image();
            img.src = canvasElement.value.toDataURL();
            currentTracing.value.canvas = img;
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
        // STATE
        canvasElement,
        tracings,
        currentTracing,
        tracingOpacity,
        imageOpacity,
        // GETTERS
        getCurrentTracing,
        currentTracingInLibrary,
        // ACTIONS
        saveCurrentTracing,
        removeCurrentTracing,
        resetTracingOpacity,
        resetImageOpacity,
    };
});
