import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEME_PACKAGE = "@siemens-ix/corporate-theme";
const TARGET_DIR = path.join(__dirname, "../src/assets/theme");

function findThemePackage() {
  const searchPaths = [
    path.join(__dirname, "../../../node_modules", THEME_PACKAGE),
    path.join(__dirname, "../node_modules", THEME_PACKAGE),
  ];

  for (const themePath of searchPaths) {
    if (fs.existsSync(themePath)) {
      console.log(`✓ Found theme at: ${themePath}`);
      return themePath;
    }
  }
  return null;
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
