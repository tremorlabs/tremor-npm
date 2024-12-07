import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      lib: path.resolve(__dirname, "./src/lib"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      contexts: path.resolve(__dirname, "./src/contexts"),
      assets: path.resolve(__dirname, "./src/assets"),
      stories: path.resolve(__dirname, "./src/stories"),
      tests: path.resolve(__dirname, "./src/tests"),
    },
  },
});
