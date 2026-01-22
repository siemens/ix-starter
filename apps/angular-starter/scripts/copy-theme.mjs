import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEME_PACKAGE = "@siemens-ix/corporate-theme";
const TARGET_DIR = path.join(__dirname, "../src/assets/theme");

function findThemePackage() {
  const require = createRequire(import.meta.url);
  try {
    const packageJsonPath = require.resolve(`${THEME_PACKAGE}/package.json`);
    const themePath = path.dirname(packageJsonPath);
    console.log(`✓ Found theme at: ${themePath}`);
    return themePath;
  } catch (error) {
    return null;
  }
}

function copyTheme(sourcePath, targetPath) {
  fs.copySync(sourcePath, targetPath, {
    overwrite: true,
    filter: (src) => !src.includes("node_modules"),
  });
  console.log(`✓ Theme copied to: ${targetPath}`);
}

try {
  const themePath = findThemePackage();

  if (!themePath) {
    console.log("ℹ No theme found - using default");
    process.exit(0);
  }

  copyTheme(themePath, TARGET_DIR);
} catch (error) {
  console.error(`✗ Error: ${error.message}`);
  process.exit(1);
}
