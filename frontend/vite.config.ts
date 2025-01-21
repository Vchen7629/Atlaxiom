import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 80,
    strictPort: true,
    host: "0.0.0.0",
   },
  server: {
    port: 80,
    strictPort: true,
    host: "0.0.0.0",
    proxy: {
      '/auth': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        secure: false, // Disable SSL verification (use `true` if your backend uses HTTPS)
      },
    }
  }
})
