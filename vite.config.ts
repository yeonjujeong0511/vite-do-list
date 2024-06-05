import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? " /vite-do-list/" : "/",
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
    ],
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    host: "localhost",
    port: 3000,
  },
}));
