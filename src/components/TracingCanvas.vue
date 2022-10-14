<template>
    <canvas
        width="777"
        height="777"
        ref="tracingCanvas"
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
    >
    </canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useMainStore from 'stores/main';

const storeMain = useMainStore();
const tracingCanvas = ref(null);

const x = ref(0);
const y = ref(0);
const isDrawing = ref(false);
const drawLine = (
    context: any,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
};

const onMouseDown = (e: any) => {
    x.value = e.offsetX;
    y.value = e.offsetY;
    isDrawing.value = true;
};

const onMouseMove = (e: any) => {
    if (isDrawing.value === true) {
        drawLine(storeMain.context, x.value, y.value, e.offsetX, e.offsetY);
        x.value = e.offsetX;
        y.value = e.offsetY;
    }
};

const onMouseUp = (e: any) => {
    if (isDrawing.value === true) {
        drawLine(storeMain.context, x.value, y.value, e.offsetX, e.offsetY);
        x.value = 0;
        y.value = 0;
        isDrawing.value = false;
    }
};

onMounted(() => {
    storeMain.context = tracingCanvas.value.getContext('2d');
});
</script>

<style>
canvas {
    border: 0.1em solid;
    cursor: pointer;
}
</style>
