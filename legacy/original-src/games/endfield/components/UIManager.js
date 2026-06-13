export class UIManager {
  constructor(root) {
    this.root = root;
    this.nodes = {
      levelName: root.querySelector("[data-level-name]"),
      levelIndex: root.querySelector("[data-level-index]"),
      progress: root.querySelector("[data-progress]"),
      timer: root.querySelector("[data-timer]"),
      resets: root.querySelector("[data-resets]"),
      toast: root.querySelector("[data-toast]"),
      complete: root.querySelector("[data-complete]")
    };
    this.toastTimer = null;
  }

  updateLevel(level, total, completedCount, resets) {
    this.nodes.levelName.textContent = level.name;
    this.nodes.levelIndex.textContent = `${level.id}/${total}`;
    this.nodes.progress.textContent = `${completedCount}/${total}`;
    this.nodes.resets.textContent = resets;
  }

  updateTimer(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remain = Math.floor(seconds % 60).toString().padStart(2, "0");
    this.nodes.timer.textContent = `${minutes}:${remain}`;
  }

  showToast(message, tone = "info") {
    window.clearTimeout(this.toastTimer);
    this.nodes.toast.textContent = message;
    this.nodes.toast.dataset.tone = tone;
    this.nodes.toast.hidden = false;
    requestAnimationFrame(() => this.nodes.toast.classList.add("is-visible"));
    this.toastTimer = window.setTimeout(() => {
      this.nodes.toast.classList.remove("is-visible");
      window.setTimeout(() => {
        this.nodes.toast.hidden = true;
      }, 180);
    }, 1600);
  }

  showComplete(levelName) {
    this.nodes.complete.querySelector("[data-complete-title]").textContent = `${levelName} 已完成`;
    this.nodes.complete.hidden = false;
    requestAnimationFrame(() => this.nodes.complete.classList.add("is-visible"));
  }

  hideComplete() {
    this.nodes.complete.classList.remove("is-visible");
    window.setTimeout(() => {
      this.nodes.complete.hidden = true;
    }, 180);
  }
}
