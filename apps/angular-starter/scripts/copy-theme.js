const fs = require("fs-extra");
const path = require("path");

try {
  const themePackage = require.resolve("@siemens-ix/corporate-theme");
  const theme = path.join(themePackage, "..", "..");
  fs.copySync(theme, path.join(__dirname, "../src/assets/theme"), {
    filter: (src) => !src.includes("corporate-theme-alternative/node_modules"),
  });
  console.log("Load additional theme");
} catch (e) {
  console.log("No additional theme found", e);
}
