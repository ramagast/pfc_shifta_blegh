<script setup>
import { ref, watch, onMounted } from 'vue'

const dark = ref(false)

onMounted(() => {
  try {
    dark.value = localStorage.getItem('theme') === 'dark'
  } catch(e) { dark.value = false }
  document.documentElement.classList.toggle('dark', dark.value)
})

watch(dark, (value) => {
  document.documentElement.classList.toggle('dark', value)
  try { localStorage.setItem('theme', value ? 'dark' : 'light') } catch(e) {}
})
</script>

<template>
  <header class="w-full bg-[linear-gradient(to_bottom,black_50%,transparent_100%)] dark:text-white fixed top-0 z-50 ">
    <div class="flex items-center justify-between px-[1rem] py-[2rem] md:max-w-[60vw] md:mx-auto">
      <img src="/files/logo.png" alt="logo" class="w-[8rem]" />
      <div class="flex items-center gap-4">
        <img src="/files/icons/notification.png" alt="notificaciones" class="w-[2.5rem]" />
      </div>
    </div>
  </header>
</template>
