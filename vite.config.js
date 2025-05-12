import { defineConfig } from 'vite'
// @ts-ignore
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'public/robots.txt'),
          dest: '.'
        }
      ]
    })
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
