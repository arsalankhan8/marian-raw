import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimizedAssetsPlugin } from './scripts/optimized-assets-plugin.mjs'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  publicDir: '.optimized/public',
  resolve: {
    alias: {
      '@optimized': path.resolve(projectRoot, '.optimized/assets'),
    },
  },
  plugins: [optimizedAssetsPlugin(projectRoot), react(), tailwindcss()],
})
