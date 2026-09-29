import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  esbuild: { jsx: "automatic" },
  base: "./",
  plugins: [tailwindcss()],
  build: { rollupOptions: { output: { manualChunks: { three: ["three"] } } } },
});
