<template>
    <div class="card" id="mydiv" ref="mydiv">
        <div id="mydivheader" ref="mydivheader">Click here to move</div>
        <div class="card-section">
            <label>
                Size - <span>{{ storeMain.strokeWidth }}</span>
            </label>
            <br />
            <input
                type="range"
                min="1"
                max="15"
                step="1"
                v-model="storeMain.strokeWidth"
            />
            <br />
            <label>
                R - <span>{{ storeMain.strokeStyleR }}</span>
            </label>
            <br />
            <input
                type="range"
                min="1"
                max="255"
                step="1"
                v-model="storeMain.strokeStyleR"
            />
            <br />
            <label>
                G - <span>{{ storeMain.strokeStyleG }}</span>
            </label>
            <br />
            <input
                type="range"
                min="1"
                max="255"
                step="1"
                v-model="storeMain.strokeStyleG"
            />
            <br />
            <label>
                B - <span>{{ storeMain.strokeStyleB }}</span>
            </label>
            <br />
            <input
                type="range"
                min="1"
                max="255"
                step="1"
                v-model="storeMain.strokeStyleB"
            />
            <br />
            <label>
                A - <span>{{ storeMain.strokeStyleA }}</span>
            </label>
            <br />
            <input
                type="range"
                min="0.001"
                max="1"
                step="0.001"
                v-model="storeMain.strokeStyleA"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useMainStore from 'stores/main';
const storeMain = useMainStore();

const mydiv = ref({});
const mydivheader = ref({});
onMounted(() => {
    const dragElement = (elmnt: any) => {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        const dragMouseDown = (e: any) => {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e: any) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
            elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
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
