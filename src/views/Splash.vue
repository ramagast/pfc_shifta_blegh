<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const start = () => setTimeout(() => router.push('/home'), 600)
</script>

<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-black overflow-hidden">
    <div class="max-w-[30rem] opacity-0 blur-[.2rem] animation-fade-bg">
      <img src="/files/preload-bg.png" alt="fondo" class="w-full" />
    </div>
    <div class="absolute flex flex-col justify-center items-center w-full h-full opacity-0 animation-fade-logo-plus-moveup">
      <img src="/files/logo.png" alt="logo" class="max-w-[30rem] w-[70%]" />
    </div>
    <button @click="start" class="py-[1rem] px-[3rem] text-[clamp(2.5rem,4vw,3rem)] absolute opacity-0 rounded-[1rem] pointer text-black bg-white animation-moveup-btn cursor-pointer">Entrar</button>
  </div>
</template>
