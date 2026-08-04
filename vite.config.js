import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@schemas": path.resolve(__dirname, "./src/schemas"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@data": path.resolve(__dirname, "./src/data")
    }
  },

  server: {
    host: true,
    port: 5173,
    open: true
  },

  preview: {
    port: 4173
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    minify: false
  }
});