import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useContextStore = defineStore('contextStore', () => {
    const context = ref<any>();
    const strokeWidth = ref(1);
    const strokeStyleR = ref(0);
    const strokeStyleG = ref(0);
    const strokeStyleB = ref(0);
    const strokeStyleA = ref(1);

    const setStrokeStyle = (): void => {
        const rgbaString =
            'rgba(' +
            strokeStyleR.value +
            ',' +
            strokeStyleG.value +
            ',' +
            strokeStyleB.value +
            ',' +
            strokeStyleA.value +
            ')';
        context.value.strokeStyle = rgbaString;
        context.value.lineCap = 'round';
        context.value.lineWidth = strokeWidth.value;
    };

    const resetStrokeStyle = (): void => {
        strokeWidth.value = 1;
        strokeStyleR.value = 0;
        strokeStyleG.value = 0;
        strokeStyleB.value = 0;
        strokeStyleA.value = 1;
    };

    watch(strokeWidth, () => setStrokeStyle());
    watch(strokeStyleR, () => setStrokeStyle());
    watch(strokeStyleG, () => setStrokeStyle());
    watch(strokeStyleB, () => setStrokeStyle());
    watch(strokeStyleA, () => setStrokeStyle());

    return {
        context,
        strokeWidth,
        strokeStyleR,
        strokeStyleG,
        strokeStyleB,
        strokeStyleA,
        resetStrokeStyle,
    };
});
