<template>
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
        max=".050"
        step="0.001"
        v-model="storeMain.strokeStyleA"
    />
</template>

<script setup lang="ts">
import useMainStore from 'stores/main';
const storeMain = useMainStore();
</script>
