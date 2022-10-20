<template>
    <canvas
        :style="'opacity: ' + storeTracing.tracingOpacity"
        :width="storeTracing.currentTracing.webformatWidth + 40"
        :height="storeTracing.currentTracing.webformatHeight + 40"
        ref="tracingCanvas"
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
    >
    </canvas>
    <img
        :src="storeTracing.currentTracing.webformatURL"
        :style="'opacity: ' + storeTracing.imageOpacity"
    />
    <div
        class="whiteCanvasBackground"
        :style="
            'width: ' +
            (storeTracing.currentTracing.webformatWidth + 40) +
            'px; height: ' +
            (storeTracing.currentTracing.webformatHeight + 40) +
            'px;'
        "
    ></div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useContextStore } from '../stores/ContextStore';
import { useTracingStore } from '../stores/TracingStore';

const route = useRoute();
const router = useRouter();
const storeContext = useContextStore();
const storeTracing = useTracingStore();

const tracingCanvas = ref<HTMLCanvasElement>();
const x = ref(0);
const y = ref(0);
const isDrawing = ref(false);
const tracing = new Image();

// used by mouse events to draw in the Canvas element
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

//
const onMouseDown = (e: any) => {
    x.value = e.offsetX;
    y.value = e.offsetY;
    isDrawing.value = true;
};

const onMouseMove = (e: any) => {
    if (isDrawing.value === true) {
        drawLine(
            storeContext.tracingContext,
            x.value,
            y.value,
            e.offsetX,
            e.offsetY
        );
        x.value = e.offsetX;
        y.value = e.offsetY;
    }
};

const onMouseUp = (e: any) => {
    if (isDrawing.value === true) {
        drawLine(
            storeContext.tracingContext,
            x.value,
            y.value,
            e.offsetX,
            e.offsetY
        );
        x.value = 0;
        y.value = 0;
        isDrawing.value = false;
    }
};

onBeforeMount(() => {
    // if there's a route id param, find an index in user's library
    const index = storeTracing.tracings.findIndex(
        (t) => t.id === parseInt(route.params.id)
    );
    // check if there isn't a currentTracing set
    if (!storeTracing.currentTracing.id) {
        if (index != -1)
            // if route id is in user's lib, set it as current tracing
            return (storeTracing.currentTracing = storeTracing.tracings[index]);
        // else send them home
        return router.push('/');
    }
});

onMounted(() => {
    // assign the Canvas elements to store variables
    storeTracing.canvasElement = tracingCanvas.value;
    storeContext.tracingContext = tracingCanvas.value.getContext('2d');

    // if the current tracing has data in the canvas key
    // set it to the tracing Image() objec
    // and feed it to the Canvas' context
    if (storeTracing.currentTracing.canvas) {
        tracing.src = storeTracing.currentTracing.canvas;
        tracing.onload = () =>
            storeContext.tracingContext.drawImage(tracing, 0, 0);
    }
});
</script>

<style scoped>
canvas {
    cursor: pointer;
    position: absolute;
    z-index: 9;
}
img {
    border: 20px white solid;
    position: absolute;
    z-index: 8;
}
.whiteCanvasBackground {
    background-color: white;
    position: relative;
}
</style>
