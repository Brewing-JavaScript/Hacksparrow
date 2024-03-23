import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';


// https://vitejs.dev/config/
// react + vite version
export default defineConfig({
  plugins: [react(),
    reactRefresh()
  ]
})


// 
