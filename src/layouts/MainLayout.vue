<template>
    <q-layout view="lHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn
                    icon="menu"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />
                <q-toolbar-title>imageTracer</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="leftDrawerOpen"></q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const leftDrawerOpen = ref(false);
</script>
