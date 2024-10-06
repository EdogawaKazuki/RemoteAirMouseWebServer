import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()
  , basicSsl()],
  build: {
    outDir: 'server/public'
  }
})
