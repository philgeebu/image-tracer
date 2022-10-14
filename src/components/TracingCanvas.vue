<template>
    <img :src="imageSource" />
    <canvas
        :width="canvasWidth + 40"
        :height="canvasHeight + 40"
        ref="tracingCanvas"
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
    >
    </canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContextStore } from '../stores/useContextStore';
import { useImageStore } from '../stores/useImageStore';

const storeContext = useContextStore();
const storeImage = useImageStore();

const tracingCanvas = ref<HTMLCanvasElement>();
const x = ref(0);
const y = ref(0);
const isDrawing = ref(false);
const imageSource = ref<string>();
const canvasWidth = ref(600);
const canvasHeight = ref(600);

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
        drawLine(storeContext.context, x.value, y.value, e.offsetX, e.offsetY);
        x.value = e.offsetX;
        y.value = e.offsetY;
    }
};

const onMouseUp = (e: any) => {
    if (isDrawing.value === true) {
        drawLine(storeContext.context, x.value, y.value, e.offsetX, e.offsetY);
        x.value = 0;
        y.value = 0;
        isDrawing.value = false;
    }
};

onMounted(() => {
    storeContext.context = tracingCanvas.value.getContext('2d');

    fetch(
        `https://pixabay.com/api/?key=30198755-511fed12f4c341988f11b1a00&id=${storeImage.currentImage}`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            imageSource.value = data.hits[0].webformatURL;
            canvasWidth.value = data.hits[0].webformatWidth;
            canvasHeight.value = data.hits[0].webformatHeight;
        });
});
</script>

<style scoped>
canvas {
    cursor: pointer;
    position: relative;
    z-index: 8;
}

img {
    border: 20px white solid;
    position: absolute;
}
</style>
