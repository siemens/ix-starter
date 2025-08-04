import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import fs from "fs-extra";

const base = process.env.VUE_BASE || "/";

function checkForAdditionalTheme() {
  try {
    const themePackage = import.meta.resolve("@siemens-ix/corporate-theme");
    const theme = path.join(themePackage.replace("file://", ""), "..", "..");
    fs.copySync(theme, path.join(__dirname, "public", "theme"), {
      filter: (src) => {
        return !src.includes("corporate-theme-alternative/node_modules");
      },
    });
    console.log("Load additional theme");
  } catch (e) {
    console.log("No additional theme found", e);
  }
}

checkForAdditionalTheme();

export default defineConfig({
  base,
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  server: {
    open: false,
  },
  preview: {
    open: false,
  },
  define: {
    'process.env': {},
  },
  test: {
    setupFiles: "./src/setupTests.ts",
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
  },
});
