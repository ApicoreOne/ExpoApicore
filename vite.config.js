import { defineConfig } from 'vite'
// @ts-ignore
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  publicDir: 'public',
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
   server:{
     hmr:{
       overlay: true
     }
   }
})
