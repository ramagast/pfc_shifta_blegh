<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const perfil = ref(null)
const comentario = ref('')
const nombre = ref('')
const mostrarToast = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('perfil')
  if (stored) {
    perfil.value = JSON.parse(stored)
    nombre.value = perfil.value.nombre
  } else {
    router.push('/profile')
  }
})

const enviarComentario = () => {
  if (!comentario.value.trim()) {
    mostrarToast.value = true
    setTimeout(() => {
      mostrarToast.value = false
      router.push('/home')
    }, 2000)

  }

  const nuevoComentario = {
    usuario: nombre.value.trim(),
    avatar: perfil.value.avatar,
    comentario: comentario.value.trim(),
    fecha: Date.now(),
    megusta: 0,
    respuesta: 0,
    liked: false,
    id: Date.now().toString()
  }

  const existentes = JSON.parse(localStorage.getItem('comentarios') || '[]')
  existentes.unshift(nuevoComentario)
  localStorage.setItem('comentarios', JSON.stringify(existentes))

  comentario.value = ''
  alert('¡Comentario publicado!')
  router.push('/home')
}
</script>

<template>
  <div class="md:max-w-[64rem] mx-auto p-[1rem] pt-[8.5rem]">
    <main class="flex flex-col pt-[4rem] gap-[4rem]">
      <h1 class="text-[2.5rem] font-bold mb-[3rem]">Nuevo comentario</h1>

      <form @submit.prevent="enviarComentario" class="flex flex-col gap-[3rem]">
        <div v-if="perfil" class="flex items-center gap-[1.5rem]">
          <img
            :src="perfil.avatar"
            alt="avatar"
            class="w-[4rem] h-[4rem] rounded-full object-cover"
          />
          <p class="text-[3rem] text-gray-200 font-semibold">{{ perfil.nombre }}</p>
        </div>

        <textarea
          v-model="comentario"
          placeholder="Escribe tu comentario..."
          class="px-[1rem] py-[1rem] border-b border-[#e3e3e3] text-[#e3e3e3] text-[2rem]
                focus:border-[#2de398] focus:outline-none transition-colors duration-300"
        ></textarea>

        <button
          type="submit"
          class="bg-[#2de398] hover:opacity-[.8] transition-all duration-300 cursor-pointer text-black px-[1.5rem] py-[.5rem] rounded-[1rem] font-semibold text-[2rem] self-start"
        >
          Enviar
        </button>
      </form>
    </main>
    <transition name="fade">
      <div
        v-if="mostrarToast"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-lg"
      >
        ¡Comentario publicado!
      </div>
    </transition>
  </div>
</template>
