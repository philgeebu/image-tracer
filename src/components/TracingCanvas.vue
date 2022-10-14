<template>
    <img :src="imageSource" />
    <canvas
        :width="canvasWidth"
        :height="canvasHeight"
        ref="tracingCanvas"
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
    >
    </canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStrokeStore } from '../stores/useStrokeStore';
import { useImageStore } from '../stores/useImageStore';

const storeStroke = useStrokeStore();
const storeImage = useImageStore();

const tracingCanvas = ref(null);
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
        drawLine(storeStroke.context, x.value, y.value, e.offsetX, e.offsetY);
        x.value = e.offsetX;
        y.value = e.offsetY;
    }
};

const onMouseUp = (e: any) => {
    if (isDrawing.value === true) {
        drawLine(storeStroke.context, x.value, y.value, e.offsetX, e.offsetY);
        x.value = 0;
        y.value = 0;
        isDrawing.value = false;
    }
};

onMounted(() => {
    storeStroke.context = tracingCanvas.value.getContext('2d');

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
    border: 0.1em solid;
    cursor: pointer;
    position: relative;
    z-index: 8;
}

img {
    position: absolute;
}
</style>
