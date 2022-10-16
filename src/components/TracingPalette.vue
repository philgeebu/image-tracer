<template>
    <div id="mydiv" ref="mydiv">
        <q-card style="width: 10.2rem">
            <div id="mydivheader" ref="mydivheader">
                <q-card-section>
                    <p class="handwritten-font">PALETTE</p>
                </q-card-section>
                <q-separator />
            </div>
            <q-card-section>
                <!-- <canvas width="200" height="200"></canvas> -->
                <div class="whiteCanvasBackground"></div>
                <canvas width="132" height="100"></canvas>
            </q-card-section>
            <q-card-section>
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
                    Brush Alpha -
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
                    Image Alpha -
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
                <br />
                <label>
                    Tracing Alpha -
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
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContextStore } from '../stores/useContextStore';
import { useTracingStore } from '../stores/useTracingStore';

const storeContext = useContextStore();
const storeTracing = useTracingStore();

const mydiv = ref<HTMLDivElement>();
const mydivheader = ref<HTMLDivElement>();

onMounted(() => {
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

        mydivheader.value.onmousedown = dragMouseDown;
    };

    dragElement(mydiv.value);
});
</script>

<style scoped>
canvas {
    cursor: pointer;
    position: absolute;
}
#mydiv {
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 9;
}

#mydivheader {
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
    position: relative;
    border-radius: 7px;
}
</style>
