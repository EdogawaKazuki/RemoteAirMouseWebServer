import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()
  , basicSsl()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://192.168.50.107:3001',
        changeOrigin: true,
        ws: true
      },
    }
  }
})
