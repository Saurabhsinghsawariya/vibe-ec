import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vibe-eccommerce-backend.onrender.com', // Your backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
})