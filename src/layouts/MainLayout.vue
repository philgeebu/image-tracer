<template>
    <q-layout view="lHh Lpr lFf">
        <!-- DRAWER -->
        <q-drawer v-model="leftDrawerOpen" class="row justify-center">
            <TracingLibrary />
        </q-drawer>

        <!-- HEADER -->
        <q-header>
            <q-toolbar>
                <q-btn
                    glossy
                    icon="menu"
                    label="Library"
                    color="deep-orange-14"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />
                <q-toolbar-title class="handwritten-font">
                    <router-link to="/">imageTracer</router-link>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <!-- PAGE -->
        <q-page-container class="row justify-center">
            <router-view />
        </q-page-container>

        <!-- FOOTER -->
        <q-footer class="row justify-center">
            <footer class="q-py-sm">
                2022 | CS701 - Term Project | Phil Gee
            </footer>
        </q-footer>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TracingLibrary from 'components/TracingLibrary.vue';
const leftDrawerOpen = ref(false);
</script>
