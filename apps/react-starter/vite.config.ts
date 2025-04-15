import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs-extra";

const base = process.env.REACT_BASE || "/";

function checkForAdditionalTheme() {
  try {
    const themePackage = import.meta.resolve("@siemens/ix-brand-theme");
    const theme = path.join(themePackage.replace("file://", ""), "..", "..");

    fs.copySync(theme, path.join(__dirname, "public", "theme"), {
      filter: (src) => {
        return !src.includes("ix-brand-theme/node_modules");
      },
    });
    console.log("Load additional theme");
  } catch (e) {
    console.log("No additional theme found", e);
  }
}

checkForAdditionalTheme();

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
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
