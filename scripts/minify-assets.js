const fs = require("node:fs");
const path = require("node:path");
const CleanCSS = require("clean-css");
const { minify } = require("terser");

const assetsDirectory = path.join(__dirname, "..", "_site", "assets");

function getFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? getFiles(entryPath) : [entryPath];
  });
}

async function minifyAssets() {
  const assetFiles = getFiles(assetsDirectory);

  for (const filePath of assetFiles) {
    const source = fs.readFileSync(filePath, "utf8");

    if (filePath.endsWith(".css")) {
      const result = new CleanCSS().minify(source);
      if (result.errors.length > 0) {
        throw new Error(`CSS minification failed for ${filePath}: ${result.errors.join(", ")}`);
      }
      fs.writeFileSync(filePath, result.styles);
    } else if (filePath.endsWith(".js")) {
      const result = await minify(source);
      if (!result.code) {
        throw new Error(`JavaScript minification produced no output for ${filePath}`);
      }
      fs.writeFileSync(filePath, result.code);
    }
  }
}

minifyAssets().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});