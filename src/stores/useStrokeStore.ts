import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useStrokeStore = defineStore('strokeStore', () => {
    const context = ref<any>(null);
    const newPath = ref(false);
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

    watch(strokeWidth, () => setStrokeStyle());
    watch(strokeStyleR, () => setStrokeStyle());
    watch(strokeStyleG, () => setStrokeStyle());
    watch(strokeStyleB, () => setStrokeStyle());
    watch(strokeStyleA, () => setStrokeStyle());

    return {
        context,
        newPath,
        strokeWidth,
        strokeStyleR,
        strokeStyleG,
        strokeStyleB,
        strokeStyleA,
    };
});
