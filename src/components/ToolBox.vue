<template>
    <div id="mydiv" ref="mydiv">
        <div id="mydivheader" ref="mydivheader">Click here to move</div>
        <label>
            Size - <span>{{ storeStroke.strokeWidth }}</span>
        </label>
        <br />
        <input
            type="range"
            min="1"
            max="15"
            step="1"
            v-model="storeStroke.strokeWidth"
        />
        <br />
        <label>
            R - <span>{{ storeStroke.strokeStyleR }}</span>
        </label>
        <br />
        <input
            type="range"
            min="1"
            max="255"
            step="1"
            v-model="storeStroke.strokeStyleR"
        />
        <br />
        <label>
            G - <span>{{ storeStroke.strokeStyleG }}</span>
        </label>
        <br />
        <input
            type="range"
            min="1"
            max="255"
            step="1"
            v-model="storeStroke.strokeStyleG"
        />
        <br />
        <label>
            B - <span>{{ storeStroke.strokeStyleB }}</span>
        </label>
        <br />
        <input
            type="range"
            min="1"
            max="255"
            step="1"
            v-model="storeStroke.strokeStyleB"
        />
        <br />
        <label>
            A - <span>{{ storeStroke.strokeStyleA }}</span>
        </label>
        <br />
        <input
            type="range"
            min="0.001"
            max="1"
            step="0.001"
            v-model="storeStroke.strokeStyleA"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStrokeStore } from '../stores/useStrokeStore';
const storeStroke = useStrokeStore();

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
#mydiv {
    position: absolute;
    z-index: 9;
}

#mydivheader {
    cursor: move;
    z-index: 10;
}
</style>
