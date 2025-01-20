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
    port: 8080,
    strictPort: true,
    host: "0.0.0.0",
   },
  server: {
    port: 8080,
    strictPort: true,
    host: "0.0.0.0",
    origin: "http://165.227.176.18:8080",
  }
})
