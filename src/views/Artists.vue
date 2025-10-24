<script setup>
import { ref, computed } from 'vue'

const filtros = ['death', 'groove', 'thrash', 'power', 'black']
const activo = ref('')
const setFiltro = (f) => activo.value = (activo.value === f ? '' : f)

const items = [
  { src: '/files/bands/black/emperor.png', tag: 'black' },
  { src: '/files/bands/groove/pantera.png', tag: 'groove' },
  { src: '/files/bands/power/blind_guardian.png', tag: 'power' },
  { src: '/files/bands/death/obituary.png', tag: 'death' },
  { src: '/files/bands/groove/chimaira.png', tag: 'groove' },
  { src: '/files/bands/thrash/slayer.png', tag: 'thrash' },
  { src: '/files/bands/power/dragonforce.png', tag: 'power' },
  { src: '/files/bands/death/death.png', tag: 'death' },
  { src: '/files/bands/thrash/anthrax.png', tag: 'thrash' },
  { src: '/files/bands/black/mayhem.png', tag: 'black' }
]

const metaleros = computed(() => activo.value ? items.filter(i => i.tag === activo.value) : items)
</script>

<template>
  <div class="md:max-w-[60vw] mx-auto pb-[6rem] pt-[8.5rem] py-[2rem] px-[1rem]">
    <main class="mx-auto md:p-[1rem]">
      <div class="flex gap-[1rem] mb-[2rem] overflow-x-auto">
        <button
          v-for="f in filtros"
          :key="f"
          @click="setFiltro(f)"
          class="px-[1.8rem] py-[1rem] hover:border-[#2de398] transition-all duration-300 cursor-pointer border rounded-[1rem] text-[1.6rem] capitalize whitespace-nowrap transition-colors"
          :class="activo === f ? 'bg-[#2de398] text-black border-[#2de398]' : 'border-[#e3e3e3] text-[#e3e3e3]'"
        >{{ f }}</button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <img v-for="(item, i) in metaleros" :key="i" :src="item.src" alt="band" class="w-full aspect-square object-contain  rounded-xl" />
      </div>
    </main>
  </div>
</template>
