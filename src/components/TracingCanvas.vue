<script setup>
import { ref, onMounted, watch } from 'vue';

const sketchCanvas = ref(null);
const context = ref(null);
const newPath = ref(false);
const strokeWidth = ref(1);
const strokeStyleR = ref(0);
const strokeStyleG = ref(0);
const strokeStyleB = ref(0);
const strokeStyleA = ref(0.05);

const startDrawing = (e) => {
    newPath.value = true;
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop - 50;
    context.value.beginPath();
    context.value.moveTo(x, y);
};

const keepDrawing = (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop - 50;
    if (newPath.value) {
        context.value.lineTo(x, y);
        context.value.stroke();
    }
};

const stopDrawing = () => {
    context.value.closePath();
    newPath.value = false;
};

const setStrokeStyle = () => {
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
};

onMounted(() => {
    context.value = sketchCanvas.value.getContext('2d');
});

watch(strokeWidth, () => (context.value.lineWidth = strokeWidth.value));
watch(strokeStyleR, () => setStrokeStyle());
watch(strokeStyleG, () => setStrokeStyle());
watch(strokeStyleB, () => setStrokeStyle());
watch(strokeStyleA, () => setStrokeStyle());
</script>

<template>
    <canvas
        ref="sketchCanvas"
        @mousedown="startDrawing($event)"
        @mousemove="keepDrawing($event)"
        @mouseup="stopDrawing()"
    >
    </canvas>
    <label>Size:</label>
    <input type="range" min="1" max="15" step="1" v-model="strokeWidth" />
    <br />
    <label>R</label>
    <input type="range" min="1" max="255" step="1" v-model="strokeStyleR" />
    <br />
    <label>G</label>
    <input type="range" min="1" max="255" step="1" v-model="strokeStyleG" />
    <br />
    <label>B</label>
    <input type="range" min="1" max="255" step="1" v-model="strokeStyleB" />
    <br />
    <label>A</label>
    <input
        type="range"
        min="0.001"
        max=".05"
        step="0.001"
        v-model="strokeStyleA"
    />
</template>

<style>
canvas {
    border: 1px solid;
    cursor: pointer;
}
</style>
