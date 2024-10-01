import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    mainFields: ["module"],
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./setup.mjs",
    server: {
      deps: {
        inline: ["@siemens/ix-react", "@siemens/ix"],
      },
    },
  },
});
