import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useContextStore = defineStore('contextStore', () => {
    // STATE
    const tracingContext = ref<any>();
    const paletteContext = ref<any>();
    const strokeWidth = ref(1);
    const strokeStyleR = ref(0);
    const strokeStyleG = ref(0);
    const strokeStyleB = ref(0);
    const strokeStyleA = ref(1);

    // ACTIONS
    const setStrokeStyle = (): void => {
        // create a string using variables set by the palette
        // that is used to set the strokeStyle
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

        // set the stroke style of the main Canvas
        tracingContext.value.strokeStyle = rgbaString;
        tracingContext.value.lineCap = 'round';
        tracingContext.value.lineWidth = strokeWidth.value;

        // set the stroke style of the palette's Canvas (scratch pad)
        paletteContext.value.strokeStyle = rgbaString;
        paletteContext.value.lineCap = 'round';
        paletteContext.value.lineWidth = strokeWidth.value;
    };

    // watch when each setting is adjusted, and reset the stroke style
    watch(
        [strokeWidth, strokeStyleR, strokeStyleG, strokeStyleB, strokeStyleA],
        () => setStrokeStyle()
    );

    return {
        // STATE
        tracingContext,
        paletteContext,
        strokeWidth,
        strokeStyleR,
        strokeStyleG,
        strokeStyleB,
        strokeStyleA,
    };
});
