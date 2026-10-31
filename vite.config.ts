import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/Nassi/',

  plugins: [
    react(),
    svgr({ svgrOptions: {svgo: false} }),
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
}))
