import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      "/api": {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
    use: {
      baseURL: 'http://localhost:5173',
    }
  }
})
