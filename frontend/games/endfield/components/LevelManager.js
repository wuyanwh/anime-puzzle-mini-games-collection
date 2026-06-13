import { endfieldLevelService } from "../../../../backend/games/endfield/services/LevelService.js";

export class LevelManager {
  constructor(saveManager, levelService = endfieldLevelService) {
    this.saveManager = saveManager;
    this.levelService = levelService;
    this.currentIndex = 0;
  }

  get total() {
    return this.levelService.total;
  }

  async loadById(levelId) {
    const result = this.levelService.loadById(levelId);
    this.currentIndex = result.index;
    this.saveManager.setCurrentLevelId(result.level.id);
    return result.level;
  }

  async loadByIndex(index) {
    const result = this.levelService.loadByIndex(index);
    this.currentIndex = result.index;
    this.saveManager.setCurrentLevelId(result.level.id);
    return result.level;
  }

  async loadSaved() {
    return this.loadById(this.saveManager.getCurrentLevelId());
  }

  async next() {
    return this.loadByIndex(this.levelService.getNextIndex(this.currentIndex));
  }

  async previous() {
    return this.loadByIndex(this.levelService.getPreviousIndex(this.currentIndex));
  }
}
