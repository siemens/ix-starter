/*
 * COPYRIGHT (c) Siemens AG 2018-2024 ALL RIGHTS RESERVED.
 */
import axios from "axios";
import fs, { ensureDirSync } from "fs-extra";
import path from "path";
import zlib from "zlib";
import * as tar from "tar";

const version = "2.2.0-beta.0";
const token = process.env.CSC_TOKEN;
const pkgUrl = process.env.BRAND_URL;

if (!process.env.CI) {
  console.error("This script should only be run in CI");
  process.exit(1);
}

if (!token) {
  console.error("CSC_TOKEN is required");
  process.exit(1);
}

const download = async (url, file) => {
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

const unpack = async (file) => {
  const unpackTheme = path.join(file, "..");
  return new Promise((resolve) =>
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

const cwd = process.cwd();
const __node_modules = path.join(cwd, "node_modules");
const __cache = path.join(__node_modules, ".cache", "ix-theme-downloader");
const __themeTgz = path.join(__cache, "theme.tgz");

ensureDirSync(__cache);

if (!fs.existsSync(__node_modules)) {
  console.error("node_modules not found");
  process.exit(1);
}

await download(pkgUrl, __themeTgz);
const unpackTheme = await unpack(__themeTgz);
fs.moveSync(unpackTheme, path.join(__node_modules, "@siemens", "ix-brand-theme"));
