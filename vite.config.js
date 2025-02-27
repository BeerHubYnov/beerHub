import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@react-three/fiber/jsx-runtime': 'react/jsx-runtime',
        '@react-three/fiber/jsx-dev-runtime': 'react/jsx-dev-runtime'
    }
  }
})
