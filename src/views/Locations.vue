<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const tiendas = [
  { nombre: 'Escridiscos', desc: 'Una tienda clásica que abre sus puertas desde 1977 en Madrid. Ofrece una amplia selección de vinilos y CDs de estilos como rock & roll, soul, punk, garage o beat.', lat: 40.41934832879327, lng: -3.706078750537989 },
  { nombre: 'Discos Ziggy', desc: 'Ubicada en La Latina, es una tienda muy ecléctica de compra/venta de vinilos, CDs, DVDs, cómics… con géneros variados y mucho para rebuscar.', lat: 40.41217681943662, lng: -3.706824444989926 },
  { nombre: 'Discos La Metralleta', desc: 'Considerada una de las tiendas de vinilos más míticas de Madrid, especializada en compra-venta de vinilos, CDs y DVDs de segunda mano, con décadas de trayectoria.', lat: 40.415997948817456, lng: -3.704872408171476 },
  { nombre: 'Discos La Gramola', desc: 'Tienda con mucha solera en el centro de Madrid que ofrece vinilos, CDs descatalogados, merchandising y raros, ideal para coleccionistas.', lat: 40.41915611410263, lng: -3.7058171055939413 },
  { nombre: 'Y Que Viva Joplin!', desc: 'Tienda de música de importación en el centro de Madrid, con un ambiente auténtico y una selección cuidada para amantes del vinilo y ediciones especiales.', lat: 40.42419288879895, lng: -3.712742573824969 },
  { nombre: 'Nakasha Discos', desc: 'Ubicada en Argüelles, especializada en compra-venta de vinilos (nuevos y de segunda mano) de múltiples estilos, con tienda online también.', lat: 40.43273990114739, lng: -3.7136842198521776 },
  { nombre: 'Marilians Records', desc: 'Tienda de vinilos y segunda mano en la zona de Conde Duque que combina catálogo físico con firmas, envíos y comunidad de melómanos.', lat: 40.42573620307899, lng: -3.7088716654658183 },
  { nombre: 'Bajo el volcán', desc: 'En Lavapiés/Embajadores, es una tienda especializada en vinilos nuevos y de segunda mano (rock, soul, funk, jazz, pop) que también mezcla libros.', lat: 40.410240531564845, lng: -3.699690313002258 },
  { nombre: 'Molar discos y libros', desc: 'Pequeño comercio en La Latina que mezcla librería y tienda de discos. Un espacio cultural independiente donde además de vinilos puedes encontrar libros, cómics, fanzines y realizar actividades.', lat: 40.41079596059725, lng: -3.707633285469285 },
  { nombre: 'La Integral', desc: 'En el Barrio de las Letras, esta tienda combina vinilos, libros y artículos de diseño independiente. Especializada en reediciones, ediciones actuales y objetos de regalo, con una estética muy cuidada.', lat: 40.4132122973073, lng: -3.6986342351957235 },
]

const map = ref(null)
const markers = ref([])
const activeMarker = ref(null)

const iconoRojo = L.icon({
  iconUrl: '/files/icons/marker-red.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -30],
})

onMounted(() => {
  map.value = L.map('map', {
    center: [40.4168, -3.7038],
    zoom: 13,
    zoomControl: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  }).addTo(map.value)

  tiendas.forEach((tienda) => {
    const marker = L.marker([tienda.lat, tienda.lng], { icon: iconoRojo })
      .addTo(map.value)
      .bindPopup(`<b>${tienda.nombre}</b>`, {
        closeButton: false,
        autoPan: false,
        offset: [0, -6],
      })
    markers.value.push(marker)
  })

  const zoomControl = L.control({ position: 'bottomright' })
  zoomControl.onAdd = () => {
    const div = L.DomUtil.create('div', 'custom-zoom-controls')
    div.innerHTML = `
      <button id="zoom-in">+</button>
      <button id="zoom-out">−</button>
    `
    return div
  }
  zoomControl.addTo(map.value)

  document.getElementById('zoom-in').onclick = () => map.value.zoomIn()
  document.getElementById('zoom-out').onclick = () => map.value.zoomOut()
})

const centrarTienda = (tienda, index) => {
  if (!map.value) return

  map.value.setView([tienda.lat, tienda.lng], 17, { animate: true })

  if (activeMarker.value) {
    activeMarker.value.getPopup()?.close()
    activeMarker.value._icon.classList.remove('bounce-marker')
  }

  const marker = markers.value[index]
  marker.openPopup()
  marker._icon.classList.add('bounce-marker')
  activeMarker.value = marker
}

const mostrarTodas = () => {
  if (!map.value) return
  const group = new L.featureGroup(markers.value)
  map.value.fitBounds(group.getBounds(), { padding: [40, 40] })
}
</script>

<template>
  <div class="relative min-h-screen bg-neutral-950 text-white">
    <div class="fixed top-[2rem] left-0 right-0 z-10 h-[45vh]">
      <div id="map" class="w-full h-full shadow-lg"></div>
    </div>

    <main class="max-w-[90vw] w-full md:max-w-[60vw] relative z-0 mx-auto pt-[50vh] pb-[6.5rem]">
      <div class="flex justify-between items-center mb-[2.5rem]">
        <h1 class="text-[3rem] font-bold text-[#e22d3a]">Tiendas</h1>
        <button
          @click="mostrarTodas"
          class="text-[1.8rem] bg-[#e22d3a] hover:opacity-[.5] transition-all duration-300 px-[1.5rem] py-[.5rem] rounded-[1rem] font-semibold text-[1.4rem] cursor-pointer"
        >
          Ver todas
        </button>
      </div>

      <ul class="flex flex-col gap-[1.5rem]">
        <li
          v-for="(tienda, i) in tiendas"
          :key="tienda.nombre"
          class="bg-black border border-[#e22d3a] hover:opacity-[.5] transition-all duration-300 rounded-[1rem] px-[1.5rem] py-[.5rem] cursor-pointer"
          @click="centrarTienda(tienda, i)"
        >
          <p class="font-semibold text-[2rem] mb-[2rem]">{{ tienda.nombre }}</p>
          <p class="text-[1.8rem]">{{ tienda.desc }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
}

.custom-zoom-controls {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.custom-zoom-controls button {
  background: #111;
  color: #ff1e1e;
  border: 1px solid #ff1e1e;
  font-weight: bold;
  width: 32px;
  height: 32px;
  line-height: 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-zoom-controls button:hover {
  background: #ff1e1e;
  color: white;
  transform: scale(1.05);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce-marker {
  animation: bounce 0.6s ease infinite;
}

:deep(.leaflet-popup-content-wrapper) {
  background: #111;
  color: #fff;
  border: 1px solid #ff1e1e;
  border-radius: 8px;
}
:deep(.leaflet-popup-tip) {
  background: #111;
}
</style>
