import { readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

function getLevelNumber(fileName) {
  const match = fileName.match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function sortByLevelFile(left, right) {
  return getLevelNumber(left) - getLevelNumber(right) || left.localeCompare(right);
}

async function loadAnswerFiles() {
  const files = (await readdir(here))
    .filter((file) => file.endsWith(".js") && file !== "index.js")
    .sort(sortByLevelFile);

  const modules = await Promise.all(
    files.map(async (file) => {
      const moduleUrl = pathToFileURL(resolve(here, file)).href;
      return import(moduleUrl);
    })
  );

  return modules.map((module) => module.default).filter(Boolean);
}

export const endfieldAnswers = await loadAnswerFiles();

export function getEndfieldAnswer(levelId) {
  return endfieldAnswers.find((answer) => answer.levelId === levelId) || null;
}
