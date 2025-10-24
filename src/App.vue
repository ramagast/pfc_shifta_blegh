<script setup>
import { useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import BottomMenu from './components/BottomMenu.vue'

const route = useRoute()
</script>

<template>
  <TopBar v-if="route.name !== 'Splash'" />

  <RouterView />

  <BottomMenu v-if="route.name !== 'Splash'" />
</template>
