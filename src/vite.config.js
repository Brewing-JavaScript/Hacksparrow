import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// react + vite version
export default defineConfig({
  plugins: [react()],
})
