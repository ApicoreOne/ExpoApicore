import { defineConfig } from 'vite'
// @ts-ignore
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Замените './src' на путь к вашей корневой папке
    },
  },
   server:{
     hmr:{
       overlay: true
     }
   }
})
