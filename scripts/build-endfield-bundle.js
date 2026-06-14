import { endfieldLevels } from "../backend/games/endfield/services/LevelService.js";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const bundlePath = resolve(here, "../frontend/games/endfield/index.bundle.js");

function toAsciiJson(value) {
  return JSON.stringify(value, null, 2)
    .replace(/[^\x0a\x0d\x20-\x7e]/g, (char) => {
      const code = char.charCodeAt(0).toString(16).padStart(4, "0");
      return `\\u${code}`;
    })
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const bundle = await readFile(bundlePath, "utf8");
const levelsSource = `const ENDFIELD_LEVELS = ${toAsciiJson(endfieldLevels)};`;
const updated = bundle.replace(/const ENDFIELD_LEVELS = [\s\S]*?;\s*\n\s*class LevelService/, `${levelsSource}\n\n  class LevelService`);

if (updated === bundle) {
  throw new Error("Could not find ENDFIELD_LEVELS in index.bundle.js");
}

await writeFile(bundlePath, updated, "utf8");
console.log("Updated frontend/games/endfield/index.bundle.js from backend level files.");
