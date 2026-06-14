import { readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getEndfieldAnswer } from "../answers/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const levelsDir = resolve(here, "../levels");

function getLevelNumber(fileName) {
  const match = fileName.match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function sortByLevelFile(left, right) {
  return getLevelNumber(left) - getLevelNumber(right) || left.localeCompare(right);
}

async function loadLevelFiles() {
  const files = (await readdir(levelsDir))
    .filter((file) => file.endsWith(".js"))
    .sort(sortByLevelFile);

  const modules = await Promise.all(
    files.map(async (file) => {
      const moduleUrl = pathToFileURL(resolve(levelsDir, file)).href;
      return import(moduleUrl);
    })
  );

  return modules.map((module) => module.default).filter(Boolean);
}

export const endfieldLevels = (await loadLevelFiles()).map((level) => ({
  ...level,
  answer: getEndfieldAnswer(level.id)
}));

export const levelManifest = endfieldLevels.map((level) => ({
  id: level.id,
  name: level.name,
  size: level.size
}));

export class LevelService {
  constructor(levels = endfieldLevels) {
    this.levels = levels;
  }

  get total() {
    return this.levels.length;
  }

  loadById(levelId) {
    const index = this.levels.findIndex((level) => level.id === levelId);
    return this.loadByIndex(index >= 0 ? index : 0);
  }

  loadByIndex(index) {
    const safeIndex = Math.min(Math.max(index, 0), this.levels.length - 1);
    return {
      index: safeIndex,
      level: this.levels[safeIndex]
    };
  }

  getNextIndex(currentIndex) {
    return (currentIndex + 1) % this.levels.length;
  }

  getPreviousIndex(currentIndex) {
    return (currentIndex - 1 + this.levels.length) % this.levels.length;
  }
}

export const endfieldLevelService = new LevelService();
