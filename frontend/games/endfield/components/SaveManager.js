export class SaveManager {
  constructor(storageKey = "endfield-save-v1") {
    this.storageKey = storageKey;
  }

  read() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    } catch {
      return {};
    }
  }

  write(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        ...this.read(),
        ...data,
        updatedAt: Date.now()
      }));
    } catch {
      // Some file:// browser contexts block storage; gameplay should still boot.
    }
  }

  getCurrentLevelId() {
    return this.read().currentLevelId || 1;
  }

  setCurrentLevelId(levelId) {
    this.write({ currentLevelId: levelId });
  }

  markCompleted(levelId) {
    const save = this.read();
    const completedLevels = Array.from(new Set([...(save.completedLevels || []), levelId])).sort((a, b) => a - b);
    this.write({ completedLevels, currentLevelId: levelId });
  }

  recordReset(levelId) {
    const save = this.read();
    const resets = save.resets || {};
    resets[levelId] = (resets[levelId] || 0) + 1;
    this.write({ resets });
  }

  getResetCount(levelId) {
    return this.read().resets?.[levelId] || 0;
  }

  getCompletedCount() {
    return this.read().completedLevels?.length || 0;
  }
}
