import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/__tests__/**/*.spec.[tj]s"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/__tests__/test-app/**"],
    deps: {
      // we specify 'packages' so Vitest doesn't inline the files
      moduleDirectories: ["node_modules", "packages"],
    },
    testTimeout: 20000,
    isolate: false,
  },
  oxc: {
    target: "node20",
  },
  publicDir: false,
});
