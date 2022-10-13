<template>
    <canvas
        ref="tracingCanvas"
        @mousedown="startDrawing($event)"
        @mousemove="keepDrawing($event)"
        @mouseup="stopDrawing()"
    >
    </canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useMainStore from 'stores/main';

const storeMain = useMainStore();
const tracingCanvas = ref(null);

const startDrawing = (e: any) => {
    storeMain.newPath = true;
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    storeMain.context.beginPath();
    storeMain.context.moveTo(x, y);
};

const keepDrawing = (e: any) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    if (storeMain.newPath) {
        storeMain.context.lineTo(x, y);
        storeMain.context.stroke();
    }
};

const stopDrawing = () => {
    storeMain.context.closePath();
    storeMain.newPath = false;
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
