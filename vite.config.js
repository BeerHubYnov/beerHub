import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "beerhub-6y",
    project: "beerhub_sentry"
  })],

  resolve: {
    alias: {
        '@react-three/fiber/jsx-dev-runtime': 'react/jsx-dev-runtime'
    }
  },

  build: {
    sourcemap: true
  }
})