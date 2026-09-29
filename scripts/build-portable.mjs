import fs from "node:fs";
import { createRequire } from "node:module";
import { build, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild-wasm/lib/browser.js");
globalThis.self = globalThis;
await esbuild.initialize({
  wasmModule: await WebAssembly.compile(
    fs.readFileSync(require.resolve("esbuild-wasm/esbuild.wasm")),
  ),
  worker: false,
});
const environment = {
  ...loadEnv("production", process.cwd()),
  BASE_URL: "./",
  MODE: "production",
  DEV: false,
  PROD: true,
  SSR: false,
};
await build({
  configFile: false,
  base: "./",
  resolve: { preserveSymlinks: true },
  esbuild: false,
  plugins: [
    {
      name: "portable-jsx",
      enforce: "pre",
      async renderChunk(code) {
        const result = await esbuild.transform(code, {
          loader: "js",
          format: "esm",
          minify: true,
          target: "es2022",
        });
        return { code: result.code, map: null };
      },
      configResolved(config) {
        const index = config.plugins.findIndex(
          (plugin) => plugin.name === "vite:define",
        );
        if (index >= 0) config.plugins.splice(index, 1);
      },
      async transform(code, id) {
        if (!/\.[cm]?[jt]sx?$/.test(id)) return null;
        if (
          !id.endsWith(".jsx") &&
          !code.includes("process.env.NODE_ENV") &&
          !code.includes("import.meta.env")
        )
          return null;
        const result = await esbuild.transform(code, {
          loader: id.endsWith(".jsx") ? "jsx" : "js",
          jsx: "automatic",
          target: "es2022",
          define: {
            "import.meta.env": JSON.stringify(environment),
            "process.env.NODE_ENV": '"production"',
          },
        });
        return { code: result.code, map: null };
      },
    },
    tailwindcss(),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssMinify: false,
    rollupOptions: { output: { manualChunks: { three: ["three"] } } },
  },
});
esbuild.stop();
