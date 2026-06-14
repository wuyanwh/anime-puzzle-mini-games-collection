import { PuzzleBoard } from "./components/PuzzleBoard.js";
import { PuzzlePiece } from "./components/PuzzlePiece.js";
import { SaveManager } from "./components/SaveManager.js";
import { LevelManager } from "./components/LevelManager.js";
import { UIManager } from "./components/UIManager.js";
import { clamp } from "./utils/dom.js";
import { cloneMatrix } from "./utils/matrix.js";

class EndfieldGame {
  constructor(root) {
    this.root = root;
    this.board = new PuzzleBoard(root.querySelector("[data-board]"));
    this.save = new SaveManager();
    this.levelManager = new LevelManager(this.save);
    this.ui = new UIManager(root);
    this.tray = root.querySelector("[data-piece-tray]");
    this.dragLayer = root.querySelector("[data-drag-layer]");
    this.pieces = [];
    this.dragState = null;
    this.selectedPiece = null;
    this.currentLevel = null;
    this.startedAt = Date.now();
    this.lastPointer = null;
  }

  async init() {
    this.bindControls();
    await this.loadLevel(await this.levelManager.loadSaved());
    window.setInterval(() => this.ui.updateTimer((Date.now() - this.startedAt) / 1000), 1000);
  }

  bindControls() {
    this.root.querySelector("[data-action='reset']").addEventListener("click", () => this.resetLevel(true));
    this.root.querySelector("[data-action='next']").addEventListener("click", async () => this.loadLevel(await this.levelManager.next(), true));
    this.root.querySelector("[data-action='previous']").addEventListener("click", async () => this.loadLevel(await this.levelManager.previous(), true));
    this.root.querySelector("[data-action='hint']").addEventListener("click", () => this.showHint());
    this.root.querySelector("[data-action='answer']").addEventListener("click", () => this.showAnswer());
    this.root.querySelector("[data-action='start']").addEventListener("click", () => {
      this.ui.showToast("\u7ec8\u672b\u5730\u7cfb\u7edf\u5df2\u542f\u52a8", "success");
      this.root.querySelector("[data-board]").scrollIntoView({ block: "center", behavior: "smooth" });
    });
    this.root.querySelector("[data-action='complete-next']").addEventListener("click", async () => {
      this.ui.hideComplete();
      await this.loadLevel(await this.levelManager.next(), true);
    });

    const boardElement = this.root.querySelector("[data-board]");
    boardElement.addEventListener("pointerdown", (event) => this.handleBoardPointerDown(event));
    boardElement.addEventListener("mousedown", (event) => {
      if (window.PointerEvent) return;
      this.handleBoardPointerDown(event);
    });
    boardElement.addEventListener("contextmenu", (event) => this.handleBoardContextMenu(event));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.dragState) {
        this.cancelDrag();
        return;
      }
      if (event.key.toLowerCase() !== "r" || !this.selectedPiece) return;
      event.preventDefault();
      this.rotatePiece(this.selectedPiece);
    });
  }

  async loadLevel(level, transition = false) {
    this.currentLevel = level;
    this.startedAt = Date.now();
    this.dragState = null;
    this.selectedPiece = null;
    this.destroyPieces();
    this.board.loadLevel(level);
    this.createPieces(level.blocks);
    this.ui.updateLevel(level, this.levelManager.total, this.save.getCompletedCount(), this.save.getResetCount(level.id));
    this.ui.updateTimer(0);

    if (transition) {
      this.root.classList.remove("is-transitioning");
      this.root.offsetWidth;
      this.root.classList.add("is-transitioning");
    }
  }

  createPieces(blocks) {
    this.tray.innerHTML = "";
    this.pieces = blocks.map((config, index) => {
      const piece = new PuzzlePiece(config, index, {
        pointerDown: (activePiece, event) => this.startDrag(activePiece, event),
        rotate: (activePiece) => this.rotatePiece(activePiece),
        select: (activePiece) => this.selectPiece(activePiece)
      });
      this.tray.appendChild(piece.element);
      return piece;
    });
  }

  destroyPieces() {
    this.pieces.forEach((piece) => piece.destroy?.());
    this.pieces = [];
  }

  resetLevel(countReset = false) {
    if (countReset) this.save.recordReset(this.currentLevel.id);
    this.board.loadLevel(this.currentLevel);
    this.pieces.forEach((piece) => {
      piece.setInTray({ resetMatrix: true });
      this.tray.appendChild(piece.element);
    });
    this.ui.updateLevel(this.currentLevel, this.levelManager.total, this.save.getCompletedCount(), this.save.getResetCount(this.currentLevel.id));
    this.ui.showToast("\u5173\u5361\u5df2\u91cd\u7f6e", "info");
  }

  showHint() {
    if (!this.currentLevel?.answer) {
      this.ui.showToast("\u5f53\u524d\u5173\u5361\u6682\u65e0\u63d0\u793a", "warning");
      return;
    }

    this.board.showAnswerHint(this.currentLevel.answer);
    this.ui.showToast("\u5df2\u6807\u51fa\u9700\u8981\u586b\u5145\u7684\u533a\u5757", "info");
  }

  showAnswer() {
    const answer = this.currentLevel?.answer;
    if (!answer?.placements?.length) {
      this.ui.showToast("\u5f53\u524d\u5173\u5361\u6682\u65e0\u7b54\u6848", "warning");
      return;
    }

    this.board.loadLevel(this.currentLevel);
    this.pieces.forEach((piece) => {
      const placement = answer.placements.find((item) => item.pieceId === piece.id);
      if (!placement) {
        piece.setInTray({ resetMatrix: true });
        this.tray.appendChild(piece.element);
        return;
      }

      piece.setMatrix(placement.matrix);
      if (this.board.canPlace(piece, placement.origin, { ignoreId: piece.id })) {
        this.board.placePiece(piece, placement.origin);
        piece.setPlaced(placement.origin);
      } else {
        piece.setInTray();
      }
      this.tray.appendChild(piece.element);
    });
    this.board.clearAnswerHint();
    this.ui.showToast("\u7b54\u6848\u5df2\u663e\u793a", "success");
  }

  selectPiece(piece) {
    this.selectedPiece?.element.classList.remove("is-selected");
    this.selectedPiece = piece;
    piece.element.classList.add("is-selected");
  }

  handleBoardPointerDown(event) {
    if (event.button !== 0 && (event.pointerType === "mouse" || event.type === "mousedown")) return;
    const cell = event.target.closest(".endfield-cell.is-filled");
    if (!cell) return;
    const placed = this.board.getPlacedPieceAt(Number(cell.dataset.row), Number(cell.dataset.col));
    const piece = this.pieces.find((item) => item.id === placed?.id);
    if (piece) this.startDrag(piece, event, { centered: true });
  }

  handleBoardContextMenu(event) {
    const cell = event.target.closest(".endfield-cell.is-filled");
    if (!cell) return;
    event.preventDefault();
    const placed = this.board.getPlacedPieceAt(Number(cell.dataset.row), Number(cell.dataset.col));
    const piece = this.pieces.find((item) => item.id === placed?.id);
    if (piece) this.rotatePiece(piece);
  }

  startDrag(piece, event, options = {}) {
    if (event.button !== undefined && event.button !== 0) return;
    if (this.dragState) this.cancelDrag();
    event.preventDefault();
    event.stopPropagation();
    this.selectPiece(piece);

    const pointerId = event.pointerId ?? "mouse";
    const wasPlaced = Boolean(piece.origin);
    const previousOrigin = wasPlaced ? { ...piece.origin } : null;
    if (wasPlaced) this.board.removePiece(piece.id);

    const sourceParent = piece.element.parentElement;
    const sourceNext = piece.element.nextSibling;
    piece.element.hidden = false;
    piece.element.classList.remove("is-placed");
    if (wasPlaced && !piece.element.parentElement) {
      this.dragLayer.appendChild(piece.element);
    }

    const rect = piece.element.getBoundingClientRect();
    const dragMetrics = this.measurePieceLayout(piece.element, rect);
    const anchor = this.getDragAnchor(piece, event, rect, options);
    piece.origin = null;
    this.dragState = {
      pointerId,
      piece,
      wasPlaced,
      previousOrigin,
      sourceParent,
      sourceNext,
      dragWidth: dragMetrics.width,
      dragHeight: dragMetrics.height,
      dragScale: 1,
      visualWidth: dragMetrics.width,
      visualHeight: dragMetrics.height,
      anchorRow: anchor.row,
      anchorCol: anchor.col,
      lastOrigin: null,
      lastValid: false
    };

    piece.element.classList.add("is-dragging");
    piece.element.classList.remove("is-selected");
    piece.element.style.width = `${dragMetrics.width}px`;
    piece.element.style.height = `${dragMetrics.height}px`;
    this.dragLayer.appendChild(piece.element);

    this.onDocumentMove = (moveEvent) => this.moveDrag(moveEvent);
    this.onDocumentEnd = (endEvent) => this.endDrag(endEvent);
    document.addEventListener("pointermove", this.onDocumentMove, { passive: false });
    document.addEventListener("pointerup", this.onDocumentEnd);
    document.addEventListener("pointercancel", this.onDocumentEnd);
    document.addEventListener("mousemove", this.onDocumentMove, { passive: false });
    document.addEventListener("mouseup", this.onDocumentEnd);

    this.positionDraggedPiece(event.clientX, event.clientY);
    this.moveDrag(event);
  }

  getDragAnchor(piece, event, rect, options = {}) {
    const occupied = [];
    piece.matrix.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value) occupied.push({ row: rowIndex, col: colIndex });
      });
    });

    const centered = {
      row: Math.floor(piece.matrix.length / 2),
      col: Math.floor(piece.matrix[0].length / 2)
    };

    if (options.centered) {
      return occupied.find((cell) => cell.row === centered.row && cell.col === centered.col) || occupied[0] || centered;
    }

    const styles = window.getComputedStyle(piece.element);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const paddingTop = parseFloat(styles.paddingTop) || 0;
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;
    const columnGap = parseFloat(styles.columnGap) || 0;
    const rowGap = parseFloat(styles.rowGap) || 0;
    const cols = piece.matrix[0].length;
    const rows = piece.matrix.length;
    const cellWidth = (rect.width - paddingLeft - paddingRight - columnGap * (cols - 1)) / cols;
    const cellHeight = (rect.height - paddingTop - paddingBottom - rowGap * (rows - 1)) / rows;
    const rawCol = clamp(Math.floor((event.clientX - rect.left - paddingLeft) / (cellWidth + columnGap)), 0, cols - 1);
    const rawRow = clamp(Math.floor((event.clientY - rect.top - paddingTop) / (cellHeight + rowGap)), 0, rows - 1);

    if (piece.matrix[rawRow]?.[rawCol]) return { row: rawRow, col: rawCol };

    return occupied.reduce((nearest, cell) => {
      const distance = Math.abs(cell.row - rawRow) + Math.abs(cell.col - rawCol);
      return distance < nearest.distance ? { ...cell, distance } : nearest;
    }, { ...(occupied[0] || centered), distance: Infinity });
  }

  moveDrag(event) {
    const pointerId = event.pointerId ?? "mouse";
    if (!this.dragState || pointerId !== this.dragState.pointerId) return;
    event.preventDefault();
    this.lastPointer = { clientX: event.clientX, clientY: event.clientY, pointerId };
    const { piece } = this.dragState;
    this.positionDraggedPiece(event.clientX, event.clientY);

    const anchorPoint = this.getDraggedAnchorPoint();
    const cell = anchorPoint ? this.board.getCellFromPoint(anchorPoint.clientX, anchorPoint.clientY) : null;
    if (!cell) {
      this.dragState.lastOrigin = null;
      this.dragState.lastValid = false;
      this.board.clearPreview();
      piece.element.classList.remove("is-invalid");
      return;
    }

    const origin = {
      row: clamp(cell.row - this.dragState.anchorRow, 0, this.board.getSize() - piece.matrix.length),
      col: clamp(cell.col - this.dragState.anchorCol, 0, this.board.getSize() - piece.matrix[0].length)
    };
    const valid = this.board.canPlace(piece, origin, { ignoreId: piece.id });
    this.dragState.lastOrigin = origin;
    this.dragState.lastValid = valid;
    this.board.preview(piece, origin, valid);
    piece.element.classList.toggle("is-invalid", !valid);
  }

  endDrag(event) {
    const pointerId = event.pointerId ?? "mouse";
    const isMouseFallback = event.type === "mouseup" && this.dragState?.pointerId !== "mouse";
    if (!this.dragState || (!isMouseFallback && pointerId !== this.dragState.pointerId)) return;
    const state = this.dragState;
    state.dropPoint = { clientX: event.clientX, clientY: event.clientY };
    this.cleanupDragListeners();
    this.dragState = null;
    this.board.clearPreview();

    const { piece } = state;
    piece.element.classList.remove("is-dragging", "is-invalid");
    piece.element.style.width = "";
    piece.element.style.height = "";
    piece.element.style.left = "";
    piece.element.style.top = "";

    if (this.isPointInTray(state.dropPoint?.clientX, state.dropPoint?.clientY)) {
      this.returnPieceToTray(piece, state);
      this.ui.showToast("\u5df2\u6536\u56de\u62fc\u5757\u4ed3", "info");
      return;
    }

    if (state.lastOrigin && state.lastValid) {
      piece.element.classList.add("is-snapping");
      window.setTimeout(() => piece.element.classList.remove("is-snapping"), 160);
      this.board.placePiece(piece, state.lastOrigin);
      piece.setPlaced(state.lastOrigin);
      this.tray.appendChild(piece.element);
      this.playSoundCue("place");
      this.checkCompletion();
      return;
    }

    this.failDrop(state);
  }

  failDrop(state) {
    const { piece } = state;
    piece.element.classList.add("is-rebounding");
    window.setTimeout(() => piece.element.classList.remove("is-rebounding"), 320);

    if (state.wasPlaced && state.previousOrigin && this.board.canPlace(piece, state.previousOrigin, { ignoreId: piece.id })) {
      this.board.placePiece(piece, state.previousOrigin);
      piece.setPlaced(state.previousOrigin);
      this.tray.appendChild(piece.element);
      this.ui.showToast("\u5df2\u56de\u5230\u539f\u4f4d\u7f6e", "warning");
      return;
    }

    this.returnPieceToTray(piece, state);
    this.ui.showToast("\u65e0\u6cd5\u653e\u7f6e\u5728\u8fd9\u91cc", "warning");
  }

  returnPieceToTray(piece, state = {}) {
    piece.setInTray();
    if (state.sourceParent === this.tray && state.sourceNext && this.tray.contains(state.sourceNext)) {
      state.sourceParent.insertBefore(piece.element, state.sourceNext);
    } else {
      this.tray.appendChild(piece.element);
    }
  }

  isPointInTray(clientX, clientY) {
    if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return false;
    const rect = this.tray.getBoundingClientRect();
    const dropPadding = 28;
    return (
      clientX >= rect.left - dropPadding &&
      clientX <= rect.right + dropPadding &&
      clientY >= rect.top - dropPadding &&
      clientY <= rect.bottom + dropPadding
    );
  }

  cancelDrag() {
    if (!this.dragState) return;
    const state = this.dragState;
    this.cleanupDragListeners();
    this.dragState = null;
    this.board.clearPreview();
    state.piece.element.classList.remove("is-dragging", "is-invalid");
    this.failDrop(state);
  }

  cleanupDragListeners() {
    document.removeEventListener("pointermove", this.onDocumentMove);
    document.removeEventListener("pointerup", this.onDocumentEnd);
    document.removeEventListener("pointercancel", this.onDocumentEnd);
    document.removeEventListener("mousemove", this.onDocumentMove);
    document.removeEventListener("mouseup", this.onDocumentEnd);
    this.onDocumentMove = null;
    this.onDocumentEnd = null;
  }

  measurePieceLayout(element, rect = element.getBoundingClientRect()) {
    return {
      width: element.offsetWidth || rect.width,
      height: element.offsetHeight || rect.height
    };
  }

  getDragScale(element) {
    const styles = window.getComputedStyle(element);
    const customScale = parseFloat(styles.getPropertyValue("--drag-scale"));
    if (Number.isFinite(customScale) && customScale > 0) return customScale;

    const transform = styles.transform;
    if (!transform || transform === "none") return 1;
    const matrix = transform.match(/^matrix\(([^)]+)\)$/);
    if (matrix) {
      const [a, b] = matrix[1].split(",").map((value) => parseFloat(value));
      const scale = Math.hypot(a || 0, b || 0);
      return scale || 1;
    }

    const matrix3d = transform.match(/^matrix3d\(([^)]+)\)$/);
    if (matrix3d) {
      const values = matrix3d[1].split(",").map((value) => parseFloat(value));
      const scale = Math.hypot(values[0] || 0, values[1] || 0, values[2] || 0);
      return scale || 1;
    }

    return 1;
  }

  syncDragMetrics() {
    const state = this.dragState;
    const { piece } = state;
    const width = piece.element.offsetWidth || state.dragWidth;
    const height = piece.element.offsetHeight || state.dragHeight;
    const scale = this.getDragScale(piece.element);

    state.dragWidth = width;
    state.dragHeight = height;
    state.dragScale = scale;
    state.visualWidth = width * scale;
    state.visualHeight = height * scale;
    return state;
  }

  getDragLayerPoint(clientX, clientY) {
    const rect = this.dragLayer.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  positionDraggedPiece(clientX, clientY) {
    const { piece, dragWidth, dragHeight } = this.syncDragMetrics();
    const point = this.getDragLayerPoint(clientX, clientY);
    piece.element.style.left = `${point.x - dragWidth / 2}px`;
    piece.element.style.top = `${point.y - dragHeight / 2}px`;
  }

  getDraggedAnchorPoint() {
    if (!this.dragState) return null;
    const { piece, anchorRow, anchorCol, dragWidth, dragHeight } = this.dragState;
    const rect = piece.element.getBoundingClientRect();
    const styles = window.getComputedStyle(piece.element);
    const cols = piece.matrix[0].length;
    const rows = piece.matrix.length;
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingTop = parseFloat(styles.paddingTop) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;
    const columnGap = parseFloat(styles.columnGap) || 0;
    const rowGap = parseFloat(styles.rowGap) || 0;
    const cellWidth = (dragWidth - paddingLeft - paddingRight - columnGap * (cols - 1)) / cols;
    const cellHeight = (dragHeight - paddingTop - paddingBottom - rowGap * (rows - 1)) / rows;
    const scaleX = dragWidth ? rect.width / dragWidth : 1;
    const scaleY = dragHeight ? rect.height / dragHeight : 1;

    return {
      clientX: rect.left + (paddingLeft + anchorCol * (cellWidth + columnGap) + cellWidth / 2) * scaleX,
      clientY: rect.top + (paddingTop + anchorRow * (cellHeight + rowGap) + cellHeight / 2) * scaleY
    };
  }

  rotatePiece(piece) {
    this.selectPiece(piece);
    if (this.dragState?.piece === piece) piece.element.classList.remove("is-selected");
    const previousMatrix = cloneMatrix(piece.matrix);
    const previousOrigin = piece.origin ? { ...piece.origin } : null;

    if (piece.origin) this.board.removePiece(piece.id);
    piece.rotate();

    if (this.dragState?.piece === piece) {
      piece.element.style.width = "";
      piece.element.style.height = "";
      const rect = piece.element.getBoundingClientRect();
      const dragMetrics = this.measurePieceLayout(piece.element, rect);
      const anchor = this.getDragAnchor(piece, this.lastPointer || { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, rect, { centered: true });
      this.dragState.dragWidth = dragMetrics.width;
      this.dragState.dragHeight = dragMetrics.height;
      this.dragState.anchorRow = anchor.row;
      this.dragState.anchorCol = anchor.col;
      piece.element.style.width = `${dragMetrics.width}px`;
      piece.element.style.height = `${dragMetrics.height}px`;
      if (this.lastPointer) this.moveDrag({ ...this.lastPointer, preventDefault() {} });
      return;
    }

    if (!previousOrigin) return;

    if (this.board.canPlace(piece, previousOrigin, { ignoreId: piece.id })) {
      this.board.placePiece(piece, previousOrigin);
      piece.setPlaced(previousOrigin);
      this.checkCompletion();
      return;
    }

    piece.matrix = previousMatrix;
    piece.updateElement();
    this.board.placePiece(piece, previousOrigin);
    piece.setPlaced(previousOrigin);
    this.ui.showToast("\u65cb\u8f6c\u7a7a\u95f4\u4e0d\u8db3", "warning");
  }

  playSoundCue(name) {
    this.root.dispatchEvent(new CustomEvent("endfield:sound", { detail: { name } }));
  }

  checkCompletion() {
    if (!this.board.isCompleted()) return;
    this.save.markCompleted(this.currentLevel.id);
    this.ui.updateLevel(this.currentLevel, this.levelManager.total, this.save.getCompletedCount(), this.save.getResetCount(this.currentLevel.id));
    this.ui.showComplete(this.currentLevel.name);
  }
}

const root = document.querySelector("[data-endfield-game]");
if (root) {
  const game = new EndfieldGame(root);
  game.init();
  root.classList.add("is-ready");
}
