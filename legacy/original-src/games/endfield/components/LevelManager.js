import { levelManifest } from "../configs/manifest.js";

export class LevelManager {
  constructor(saveManager) {
    this.saveManager = saveManager;
    this.manifest = levelManifest;
    this.cache = new Map();
    this.currentIndex = 0;
  }

  get total() {
    return this.manifest.length;
  }

  async loadById(levelId) {
    const index = this.manifest.findIndex((entry) => entry.id === levelId);
    return this.loadByIndex(index >= 0 ? index : 0);
  }

  async loadByIndex(index) {
    const safeIndex = Math.min(Math.max(index, 0), this.manifest.length - 1);
    const entry = this.manifest[safeIndex];
    this.currentIndex = safeIndex;
    this.saveManager.setCurrentLevelId(entry.id);

    if (!this.cache.has(entry.id)) {
      const module = await entry.loader();
      this.cache.set(entry.id, module.default);
    }

    return this.cache.get(entry.id);
  }

  async loadSaved() {
    return this.loadById(this.saveManager.getCurrentLevelId());
  }

  async next() {
    return this.loadByIndex((this.currentIndex + 1) % this.manifest.length);
  }

  async previous() {
    return this.loadByIndex((this.currentIndex - 1 + this.manifest.length) % this.manifest.length);
  }
}
