<script setup>
import { ref, onMounted } from 'vue'

const usuarios = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/files/usuarios.json')
    const data = await res.json()

    const enriched = data.map(u => ({
      ...u,
      megusta: Math.floor(Math.random() * 200),
      respuesta: Math.floor(Math.random() * 40),
      liked: false
    }))

    // 💬 Añadir los comentarios creados por usuarios
    const nuevos = JSON.parse(localStorage.getItem('comentarios') || '[]')

    // Mostramos primero los nuevos
    usuarios.value = [...nuevos, ...enriched]
  } catch (error) {
    console.error('Error al cargar los usuarios:', error)
  }
})


const toggleLike = (user) => {
  if (user.liked) {
    user.megusta = Math.max(0, user.megusta - 1)
    user.liked = false
  } else {
    user.megusta += 1
    user.liked = true
  }
}

// Función para calcular tiempo relativo
// 🕒 Calcular tiempo transcurrido con segundos
const tiempoTranscurrido = (timestamp) => {
  if (!timestamp) return ''

  const ahora = Date.now()
  const diff = Math.floor((ahora - timestamp) / 1000) // segundos

  if (diff < 5) return 'justo ahora'
  if (diff < 60) return `hace ${diff} seg${diff !== 1 ? 's' : ''}`
  if (diff < 3600) {
    const minutos = Math.floor(diff / 60)
    return `hace ${minutos} min${minutos !== 1 ? 's' : ''}`
  }
  if (diff < 86400) {
    const horas = Math.floor(diff / 3600)
    return `hace ${horas} hora${horas !== 1 ? 's' : ''}`
  }
  const dias = Math.floor(diff / 86400)
  return `hace ${dias} día${dias !== 1 ? 's' : ''}`
}


// Actualizar cada minuto para mantenerlo en tiempo real
setInterval(() => {
  usuarios.value = [...usuarios.value]
}, 1000
)

</script>

<template>
  <div class="md:max-w-[64rem] mx-auto p-[1rem] pt-[8.5rem]">
    <div
    v-for="user in usuarios"
    :key="user.id"
    class="border-t-[.05rem] border-[#323232] text-white text-center py-[1rem]"
    >
      <div class="py-[2rem] flex flex-col text-left gap-[2rem]">
        <div class="flex items-center gap-[2rem]">
          <img
          :src="user.avatar"
          alt="avatar"
          class="w-[3.6rem] h-[3.6rem] rounded-full object-cover justify-self-start"
          />
          <div class="flex items-center gap-[1rem]">
            <h3 class="font-bold text-[1.8rem] lowercase">{{ user.usuario }}</h3>
            <p class="text-[1.6rem] text-gray-400">
              {{ user.fecha ? tiempoTranscurrido(user.fecha) : user.tiempo }}
            </p>

          </div>
        </div>
        
        <p class="mt-2 text-[1.6rem] md:text-[1.8rem] text-gray-300 break-words whitespace-pre-wrap">
          {{ user.comentario }}
        </p>

        
        <div class="flex items-center gap-6 pt-2 text-gray-400 text-[1.6rem] ">
          <button
          @click="toggleLike(user)"
          class="flex items-center gap-2 hover:text-[#E22D3A] transition-colors"
          :aria-pressed="user.liked"
          :aria-label="user.liked ? 'Quitar me gusta' : 'Dar me gusta'"
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            class="w-[2.4rem] h-[2.4rem] cursor-pointer"
            :class="user.liked ? 'text-[#E22D3A] fill-[#E22D3A]' : 'text-gray-400'"
            >
            <path
            d="M1.34375 7.53125L1.34375 7.54043C1.34374 8.04211 1.34372 8.76295 1.6611 9.65585C1.9795 10.5516 2.60026 11.5779 3.77681 12.7544C5.59273 14.5704 7.58105 16.0215 8.33387 16.5497C8.73525 16.8313 9.26573 16.8313 9.66705 16.5496C10.4197 16.0213 12.4074 14.5703 14.2232 12.7544C15.3997 11.5779 16.0205 10.5516 16.3389 9.65585C16.6563 8.76296 16.6563 8.04211 16.6562 7.54043V7.53125C16.6562 5.23466 15.0849 3.25 12.6562 3.25C11.5214 3.25 10.6433 3.78244 9.99228 4.45476C9.59009 4.87012 9.26356 5.3491 9 5.81533C8.73645 5.3491 8.40991 4.87012 8.00772 4.45476C7.35672 3.78244 6.47861 3.25 5.34375 3.25C2.9151 3.25 1.34375 5.23466 1.34375 7.53125Z"
            stroke-width="1.25"
            />
            </svg>
            <span>{{ user.megusta }}</span>
          </button>
      
          <div class="flex items-center gap-2 hover:text-white transition-colors">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-[2.2rem] h-[2.2rem] cursor-pointer"
              >
              <path
              d="M21 15a4 4 0 0 1-4 4H8l-5 4V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v9Z"
              />
            </svg>
            <span>{{ user.respuesta }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
