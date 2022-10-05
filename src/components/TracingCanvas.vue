<template>
    <canvas
        ref="tracingCanvas"
        @mousedown="startDrawing($event)"
        @mousemove="keepDrawing($event)"
        @mouseup="stopDrawing()"
    >
    </canvas>
    <ToolBox />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useMainStore from 'stores/main';
import ToolBox from 'components/ToolBox.vue';

const storeMain = useMainStore();
const tracingCanvas = ref(null);

const startDrawing = (e) => {
    storeMain.newPath = true;
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    storeMain.context.beginPath();
    storeMain.context.moveTo(x, y);
};

const keepDrawing = (e) => {
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
