import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "beerhub-6y",
      project: "beerhub_sentry",
    }),
  ],
  resolve: {
    alias: {
      "@react-three/fiber/jsx-runtime": path.resolve(
        __dirname,
        "node_modules/react/jsx-runtime"
      ),
      "@react-three/fiber/jsx-dev-runtime": path.resolve(
        __dirname,
        "node_modules/react/jsx-dev-runtime"
      ),
    },
  },
  build: {
    sourcemap: true,
  },
});
