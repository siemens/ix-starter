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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.log("No additional theme found");
  }
}

checkForAdditionalTheme();

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    mainFields: ["module"],
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./setup.mjs",
    exclude: ["**/node_modules/**", "**/public/**", "**/dist/**"],
    server: {
      deps: {
        inline: ["@siemens/ix-react", "@siemens/ix"],
      },
    },
  },
});
