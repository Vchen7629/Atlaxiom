import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 443,
    strictPort: true,
    host: "0.0.0.0",
   },
  server: {
    https: {
      key: fs.readFileSync('/etc/letsencrypt/live/atlaxiom.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/atlaxiom.com/fullchain.pem'),
    },
    port: 443,
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
