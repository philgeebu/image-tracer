<template>
    <div id="myPalette" ref="myPalette">
        <q-card style="width: 10.2rem" class="q-pb-sm">
            <div id="myPaletteHeader" ref="myPaletteHeader">
                <q-card-section>
                    <p class="handwritten-font">PALETTE</p>
                </q-card-section>
                <q-separator />
            </div>
            <q-card-actions align="around">
                <q-btn
                    glossy
                    label="Clear Tracing"
                    class="bg-orange-10"
                    @click="storeTracing.clearCanvas()"
                />
            </q-card-actions>
            <q-card-section class="q-pb-none">
                <div class="whiteCanvasBackground"></div>
                <canvas
                    width="132"
                    height="100"
                    ref="paletteCanvas"
                    @mousedown="onMouseDown($event)"
                    @mousemove="onMouseMove($event)"
                    @mouseup="onMouseUp($event)"
                ></canvas>
            </q-card-section>
            <q-card-section>
                <label>
                    Brush -
                    <span>{{
                        Math.round(storeContext.strokeStyleA * 100) + '%'
                    }}</span>
                </label>
                <br />
                <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    v-model="storeContext.strokeStyleA"
                />
                <br />
                <label>
                    Size - <span>{{ storeContext.strokeWidth }}</span>
                </label>
                <br />
                <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    v-model="storeContext.strokeWidth"
                />
                <br />
                <label>
                    Red - <span>{{ storeContext.strokeStyleR }}</span>
                </label>
                <br />
                <input
                    type="range"
                    min="1"
                    max="255"
                    step="1"
                    v-model="storeContext.strokeStyleR"
                />
                <br />
                <label>
                    Green - <span>{{ storeContext.strokeStyleG }}</span>
                </label>
                <br />
                <input
                    type="range"
                    min="1"
                    max="255"
                    step="1"
                    v-model="storeContext.strokeStyleG"
                />
                <br />
                <label>
                    Blue - <span>{{ storeContext.strokeStyleB }}</span>
                </label>
                <br />
                <input
                    type="range"
                    min="1"
                    max="255"
                    step="1"
                    v-model="storeContext.strokeStyleB"
                />
                <br />
                <label>
                    Tracing -
                    <span>{{
                        Math.round(storeTracing.tracingOpacity * 100) + '%'
                    }}</span>
                </label>
                <br />
                <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    v-model="storeTracing.tracingOpacity"
                />
                <br />
                <label>
                    Image -
                    <span>{{
                        Math.round(storeTracing.imageOpacity * 100) + '%'
                    }}</span>
                </label>
                <br />
                <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    v-model="storeTracing.imageOpacity"
                />
            </q-card-section>
            <q-card-actions align="around">
                <q-btn
                    glossy
                    label="Save"
                    class="bg-green-10"
                    @click="storeTracing.saveCurrentTracing()"
                />
                <q-btn
                    glossy
                    label="Delete"
                    class="bg-red-10"
                    v-if="storeTracing.currentTracingInLibrary"
                    @click="storeTracing.removeCurrentTracing()"
                />
            </q-card-actions>
            <q-card-actions
                align="around"
                v-if="storeTracing.currentTracingInLibrary"
            >
                <q-btn
                    glossy
                    label="Export Tracing"
                    class="bg-blue-grey-10"
                    @click="storeTracing.exportCanvas()"
                />
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContextStore } from '../stores/ContextStore';
import { useTracingStore } from '../stores/TracingStore';

const storeContext = useContextStore();
const storeTracing = useTracingStore();

const x = ref(0);
const y = ref(0);
const isDrawing = ref(false);

const myPalette = ref<HTMLDivElement>();
const myPaletteHeader = ref<HTMLDivElement>();
const paletteCanvas = ref<HTMLCanvasElement>();

// Configure Palette Canvas with mouse events
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
    if (isDrawing.value) {
        drawLine(
            storeContext.paletteContext,
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
    if (isDrawing.value) {
        drawLine(
            storeContext.paletteContext,
            x.value,
            y.value,
            e.offsetX,
            e.offsetY
        );
        x.value = 0;
        y.value = 0;
        isDrawing.value = false;
        storeContext.paletteContext.clearRect(0, 0, 132, 100);
    }
};

// Create Draggable Palette
const dragElement = (element: any) => {
    let p1 = 0,
        p2 = 0,
        p3 = 0,
        p4 = 0;

    const dragMouseDown = (e: any) => {
        e.preventDefault();
        p3 = e.clientX;
        p4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    const elementDrag = (e: any) => {
        e.preventDefault();
        p1 = p3 - e.clientX;
        p2 = p4 - e.clientY;
        p3 = e.clientX;
        p4 = e.clientY;
        element.style.top = element.offsetTop - p2 + 'px';
        element.style.left = element.offsetLeft - p1 + 'px';
    };

    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    };

    myPaletteHeader.value.onmousedown = dragMouseDown;
};

onMounted(() => {
    storeContext.paletteContext = paletteCanvas.value.getContext('2d');
    dragElement(myPalette.value);
});
</script>

<style scoped>
canvas {
    cursor: pointer;
    position: relative;
}
#myPalette {
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 9;
}

#myPaletteHeader {
    cursor: move;
    z-index: 10;
}
.handwritten-font {
    font-size: 2rem;
    margin: 0;
    padding: 0;
}
.whiteCanvasBackground {
    width: 132px;
    height: 100px;
    background-color: white;
    border-radius: 7px;
    position: absolute;
}
</style>
