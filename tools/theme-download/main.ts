/*
 * COPYRIGHT (c) Siemens AG 2018-2024 ALL RIGHTS RESERVED.
 */
import axios from "axios";
import fs, { ensureDirSync } from "fs-extra";
import path from "path";
import zlib from "zlib";
import * as tar from "tar";
import { config as dotenv } from "@dotenvx/dotenvx";

const __dirname = path.resolve("..", "..");

dotenv({
  override: true,
  path: path.join(__dirname, ".env"),
});

dotenv({
  override: true,
  path: path.join(__dirname, ".env.production"),
});

const token = process.env.CSC_TOKEN!;
let pkgUrl = process.env.BRAND_URL!;
const pkgVersion = process.env.BRAND_VERSION!;

if (!pkgUrl) {
  console.log("No additional theme configured");
  process.exit(1);
}

if (!pkgUrl.endsWith(".tgz")) {
  pkgUrl = pkgUrl + "-" + pkgVersion + ".tgz";
}

if (!process.env.CI) {
  console.error("This script should only be run in CI");
  process.exit(1);
}

if (!token) {
  console.error("CSC_TOKEN is required");
  process.exit(1);
}

const download = async (url: string, file: string) => {
  console.log("download");
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fileData = Buffer.from(response.data, "binary");
  await fs.writeFile(file, fileData);
};

const unpack = async (file: string) => {
  const unpackTheme = path.join(file, "..");
  return new Promise<string>((resolve) =>
    fs
      .createReadStream(file)
      .pipe(zlib.createGunzip())
      .pipe(
        tar.extract({
          cwd: unpackTheme,
        }),
      )
      .on("finish", () => {
        resolve(path.join(unpackTheme, "package"));
      }),
  );
};

const __node_modules = path.join(__dirname, "node_modules");
const __cache = path.join(__node_modules, ".cache", "ix-theme-downloader");
const __themeTgz = path.join(__cache, "theme.tgz");

ensureDirSync(__cache);

if (!fs.existsSync(__node_modules)) {
  console.error("node_modules not found");
  process.exit(1);
}

await download(pkgUrl, __themeTgz);
const unpackTheme = await unpack(__themeTgz);
fs.moveSync(unpackTheme, path.join(__node_modules, "@siemens-ix", "corporate-theme"));
