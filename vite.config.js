import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "name": "blegh",
        "short_name": "blegh",
        "description": "La mejor comunidad de metal de España",
        "start_url": "/",
        "scope": "/",
        "display": "standalone",
        "background_color": "#000000",
        "theme_color": "#00008b",
        "orientation": "portrait",
        "icons": [
          {
            "src": "/blegh_icon_192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/blegh_icon_512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
      },
    }),
  ],
})
