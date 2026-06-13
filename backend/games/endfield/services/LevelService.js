import level1 from "../levels/level1.js";
import level2 from "../levels/level2.js";
import level3 from "../levels/level3.js";

export const endfieldLevels = [level1, level2, level3];

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
