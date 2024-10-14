import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000, // Use Render's provided port or fall back to 3000
    host: '0.0.0.0', // Bind to 0.0.0.0
  }
})
