import { endfieldLevels } from "../backend/games/endfield/services/LevelService.js";
import { PIECE_SHAPES } from "../frontend/games/endfield/configs/pieces.js";
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

function findConstantRange(source, name) {
  const declaration = `const ${name} = `;
  const start = source.indexOf(declaration);
  if (start < 0) return null;

  const valueStart = start + declaration.length;
  const opener = source[valueStart];
  const closer = opener === "[" ? "]" : opener === "{" ? "}" : null;
  if (!closer) return null;

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let index = valueStart; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        inString = false;
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === opener) depth += 1;
    if (char === closer) {
      depth -= 1;
      if (depth === 0) {
        const semicolon = source.indexOf(";", index);
        return semicolon >= 0 ? { start, end: semicolon + 1 } : null;
      }
    }
  }

  return null;
}

function replaceConstant(source, name, value) {
  const range = findConstantRange(source, name);
  if (!range) throw new Error(`Could not find ${name} in index.bundle.js`);
  return `${source.slice(0, range.start)}const ${name} = ${toAsciiJson(value)};${source.slice(range.end)}`;
}

const bundle = await readFile(bundlePath, "utf8");
const updated = replaceConstant(
  replaceConstant(bundle, "PIECE_SHAPES", PIECE_SHAPES),
  "ENDFIELD_LEVELS",
  endfieldLevels
);

await writeFile(bundlePath, updated, "utf8");
console.log("Updated frontend/games/endfield/index.bundle.js from backend configs and level files.");
