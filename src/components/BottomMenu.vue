<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const isLoggedIn = ref(false)
const avatar = ref(null)

const cargarPerfil = () => {
  const stored = localStorage.getItem('perfil')
  if (stored) {
    const perfil = JSON.parse(stored)
    isLoggedIn.value = true
    avatar.value = perfil.avatar || '/files/avatars/avatar_usuario.webp'
  } else {
    isLoggedIn.value = false
    avatar.value = null
  }
}

const handlePerfilActualizado = (e) => {
  isLoggedIn.value = true
  avatar.value = e.detail.avatar || '/files/avatars/avatar_usuario.webp'
}

const handlePerfilCerrado = () => {
  isLoggedIn.value = false
  avatar.value = null
}

onMounted(() => {
  cargarPerfil()
  window.addEventListener('perfil-actualizado', handlePerfilActualizado)
  window.addEventListener('perfil-cerrado', handlePerfilCerrado)
})

onBeforeUnmount(() => {
  window.removeEventListener('perfil-actualizado', handlePerfilActualizado)
  window.removeEventListener('perfil-cerrado', handlePerfilCerrado)
})

const tabs = [
  { to: '/home', key: 'home', icon: '/files/icons/home.png', active: '/files/icons/home-red.png' },
  { to: '/artists', key: 'artists', icon: '/files/icons/artists.png', active: '/files/icons/artists-red.png' },
  { to: '/new-comment', key: 'new', icon: '/files/icons/new-comment.png', active: '/files/icons/new-comment-red.png' },
  { to: '/locations', key: 'locations', icon: '/files/icons/locations.png', active: '/files/icons/locations-red.png' },
  { to: '/profile', key: 'profile', icon: '/files/icons/profile.png', active: '/files/icons/profile-red.png' },
]

const isActive = (tab) => route.path.startsWith(tab.to)

const iconFor = (tab) => {
  if (tab.key === 'profile') {
    if (isLoggedIn.value) return avatar.value || '/files/avatars/avatar_usuario.webp'
    return isActive(tab) ? tab.active : tab.icon
  }
  return isActive(tab) ? tab.active : tab.icon
}

const imgClassFor = (tab) => {
  const base = 'w-[2rem] md:w-[3rem]'
  if (tab.key !== 'profile') return base
  if (isLoggedIn.value) {
    return `${base} rounded-full object-cover border border-neutral-600`
  }
  return base
}
</script>

<template>
  <nav class="fixed bottom-0 inset-x-0 bg-[linear-gradient(to_top,black_50%,transparent_100%)] z-50">
    <ul class="flex justify-between items-center px-[2rem] md:px-[1rem] py-[2rem] md:max-w-[60vw] md:mx-auto">
      <li v-for="tab in tabs" :key="tab.key">
        <RouterLink :to="tab.to" class="block">
          <img
            :src="iconFor(tab)"
            :alt="tab.key"
            :class="imgClassFor(tab)"
            class="w-[2rem] aspect-square"
          />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
