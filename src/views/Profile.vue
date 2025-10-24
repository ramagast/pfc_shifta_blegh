<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nombre = ref('')
const avatar = ref('')
const isLoggedIn = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('perfil')
  if (stored) {
    const perfil = JSON.parse(stored)
    nombre.value = perfil.nombre
    avatar.value = perfil.avatar
    isLoggedIn.value = true
  }
})

// 🧠 Guardar perfil (login o actualización)
const guardarPerfil = () => {
  if (!nombre.value.trim()) {
    alert('Por favor, introduce un nombre.')
    return
  }

  const perfil = {
    nombre: nombre.value.trim(),
    avatar: avatar.value || '/files/avatars/avatar_usuario.webp'
  }

  localStorage.setItem('perfil', JSON.stringify(perfil))
  isLoggedIn.value = true

  // 👇 Emitimos un evento global para avisar al BottomMenu
  window.dispatchEvent(new CustomEvent('perfil-actualizado', { detail: perfil }))

  alert('Perfil guardado correctamente.')
  router.push('/new-comment')
}

// 🚪 Cerrar sesión
const cerrarSesion = () => {
  const confirmacion = confirm('¿Seguro que quieres cerrar sesión?')
  if (!confirmacion) return

  localStorage.removeItem('perfil')
  nombre.value = ''
  avatar.value = ''
  isLoggedIn.value = false

  // 👇 Emitimos un evento global para que BottomMenu vuelva al icono por defecto
  window.dispatchEvent(new CustomEvent('perfil-cerrado'))

  alert('Sesión cerrada. Puedes iniciar con otro usuario.')
}
</script>


<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div
      class="max-w-[90vw] md:max-w-[60vw] w-full text-white rounded-lg shadow-md flex flex-col gap-[4rem]"
    >
      <h1 v-if="!isLoggedIn" class="text-[4rem] font-bold">Hell awaits... you!</h1>

      <!-- ✅ Si NO está logado, mostramos formulario -->
      <div v-if="!isLoggedIn" class="flex flex-col gap-[3rem]">
        <input
          v-model="nombre"
          type="text"
          placeholder="Tu nombre"
          class="px-[1rem] py-[1rem] border-b border-[#e3e3e3] text-[2rem] 
                focus:border-[#2de398] focus:outline-none transition-colors duration-300"
        />

        <input
          v-model="avatar"
          type="text"
          placeholder="URL de avatar (opcional)"
          class="px-[1rem] py-[1rem] border-b border-[#e3e3e3] text-[2rem]
                focus:border-[#2de398] focus:outline-none transition-colors duration-300"
        />


        <button
          class="bg-[#e22d3a] hover:bg-red-700 text-white px-[1.5rem] py-[.5rem] rounded-[1rem] font-semibold text-[2rem]"
          @click="guardarPerfil"
        >
          Entrar
        </button>
      </div>

      <!-- ✅ Si SÍ está logado, mostramos datos y botón de cerrar sesión -->
      <div v-else class="flex flex-col items-center gap-[3rem]">
        <img
          :src="avatar || '/files/avatars/avatar_usuario.webp'"
          alt="Avatar"
          class="w-24 h-24 rounded-full object-cover border border-neutral-700"
        />
        <p class="text-[3.5rem] font-bold">Hola, {{ nombre }}</p>

        <button
          @click="cerrarSesion"
          class="bg-[#2de398] hover:opacity-[.8] transition-all duration-300 cursor-pointer text-black px-[1.5rem] py-[.5rem] rounded-[1rem] font-semibold text-[2rem]"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>
