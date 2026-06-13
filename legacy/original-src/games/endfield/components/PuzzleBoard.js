import { createElement } from "../utils/dom.js";
import { occupiedCells } from "../utils/matrix.js";

export class PuzzleBoard {
  constructor(root) {
    this.root = root;
    this.level = null;
    this.placedPieces = new Map();
    this.cellElements = [];
    this.previewCells = [];
  }

  loadLevel(level) {
    this.level = level;
    this.placedPieces.clear();
    this.render();
  }

  render() {
    const size = this.getSize();
    this.root.innerHTML = "";
    this.root.style.setProperty("--board-size", size);
    this.cellElements = [];

    const colHints = createElement("div", "endfield-hints endfield-hints--cols");
    const rowHints = createElement("div", "endfield-hints endfield-hints--rows");
    const matrix = createElement("div", "endfield-board__matrix");

    for (let col = 0; col < size; col += 1) {
      colHints.appendChild(this.createHint("col", col, this.level.cols[col] ?? 0));
    }

    for (let row = 0; row < size; row += 1) {
      rowHints.appendChild(this.createHint("row", row, this.level.rows[row] ?? 0));

      for (let col = 0; col < size; col += 1) {
        const cell = createElement("div", "endfield-cell", {
          "data-row": row,
          "data-col": col
        });
        if (this.isObstacle(row, col)) cell.classList.add("is-obstacle");
        matrix.appendChild(cell);
        this.cellElements.push(cell);
      }
    }

    this.root.appendChild(colHints);
    this.root.appendChild(rowHints);
    this.root.appendChild(matrix);
    this.updateStats();
  }

  createHint(axis, index, target) {
    const hint = createElement("div", `endfield-hint endfield-hint--${axis}`, {
      [`data-${axis}-hint`]: index,
      "aria-label": `${axis === "col" ? "\u5217" : "\u884c"}\u76ee\u6807 ${target}`
    });

    for (let item = 0; item < target; item += 1) {
      hint.appendChild(createElement("span", "hint-bar"));
    }

    return hint;
  }

  getSize() {
    return this.level?.size || Math.max(this.level?.rows?.length || 4, this.level?.cols?.length || 4);
  }

  getCell(row, col) {
    return this.root.querySelector(`.endfield-cell[data-row="${row}"][data-col="${col}"]`);
  }

  getCellFromPoint(clientX, clientY) {
    const element = this.cellElements.find((cell) => {
      const rect = cell.getBoundingClientRect();
      return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
    });
    if (!element) return null;
    return {
      row: Number(element.dataset.row),
      col: Number(element.dataset.col)
    };
  }

  isObstacle(row, col) {
    return this.level?.obstacles?.some(([obstacleRow, obstacleCol]) => obstacleRow === row && obstacleCol === col);
  }

  canPlace(piece, origin, options = {}) {
    const size = this.getSize();
    const cells = occupiedCells(piece.matrix, origin);

    return cells.every(({ row, col }) => {
      if (row < 0 || col < 0 || row >= size || col >= size) return false;
      if (this.isObstacle(row, col)) return false;

      for (const [pieceId, placed] of this.placedPieces.entries()) {
        if (pieceId === options.ignoreId) continue;
        if (occupiedCells(placed.matrix, placed.origin).some((cell) => cell.row === row && cell.col === col)) {
          return false;
        }
      }

      return true;
    });
  }

  placePiece(piece, origin) {
    this.placedPieces.set(piece.id, {
      id: piece.id,
      shape: piece.shape || piece.type,
      color: piece.color,
      skin: piece.skin,
      matrix: piece.matrix.map((row) => [...row]),
      origin: { ...origin }
    });
    this.paintPlacedCells();
    this.updateStats();
  }

  removePiece(pieceId) {
    this.placedPieces.delete(pieceId);
    this.paintPlacedCells();
    this.updateStats();
  }

  getPlacedPieceAt(row, col) {
    for (const placed of this.placedPieces.values()) {
      if (occupiedCells(placed.matrix, placed.origin).some((cell) => cell.row === row && cell.col === col)) {
        return placed;
      }
    }
    return null;
  }

  paintPlacedCells() {
    this.cellElements.forEach((cell) => {
      cell.classList.remove("is-filled", "skin-green", "skin-blue", "skin-yellow", "skin-red", "is-placed-flash");
      cell.removeAttribute("data-piece-id");
    });

    for (const placed of this.placedPieces.values()) {
      occupiedCells(placed.matrix, placed.origin).forEach(({ row, col }) => {
        const cell = this.getCell(row, col);
        if (!cell) return;
        cell.classList.add("is-filled", `skin-${placed.skin}`, "is-placed-flash");
        cell.dataset.pieceId = placed.id;
      });
    }
  }

  preview(piece, origin, valid) {
    this.clearPreview();
    occupiedCells(piece.matrix, origin).forEach(({ row, col }) => {
      const cell = this.getCell(row, col);
      if (!cell) return;
      cell.classList.add(valid ? "is-preview-valid" : "is-preview-invalid");
      this.previewCells.push(cell);
    });
  }

  clearPreview() {
    this.previewCells.forEach((cell) => cell.classList.remove("is-preview-valid", "is-preview-invalid"));
    this.previewCells = [];
  }

  getStats() {
    const size = this.getSize();
    const rows = Array(size).fill(0);
    const cols = Array(size).fill(0);

    for (const placed of this.placedPieces.values()) {
      occupiedCells(placed.matrix, placed.origin).forEach(({ row, col }) => {
        rows[row] += 1;
        cols[col] += 1;
      });
    }

    return { rows, cols };
  }

  updateStats() {
    if (!this.level) return;
    const stats = this.getStats();

    stats.rows.forEach((count, row) => {
      this.updateHint(`[data-row-hint="${row}"]`, count, this.level.rows[row] ?? 0);
    });

    stats.cols.forEach((count, col) => {
      this.updateHint(`[data-col-hint="${col}"]`, count, this.level.cols[col] ?? 0);
    });
  }

  updateHint(selector, current, target) {
    const hint = this.root.querySelector(selector);
    if (!hint) return;

    hint.dataset.current = current;
    hint.classList.toggle("is-met", current === target);
    hint.classList.toggle("is-over", current > target);
    hint.querySelectorAll(".hint-bar").forEach((bar, index) => {
      bar.classList.toggle("is-lit", index < current && current <= target);
    });
  }

  isCompleted() {
    const stats = this.getStats();
    const size = this.getSize();
    if (this.placedPieces.size === 0) return false;

    for (let index = 0; index < size; index += 1) {
      if (stats.rows[index] !== (this.level.rows[index] ?? 0)) return false;
      if (stats.cols[index] !== (this.level.cols[index] ?? 0)) return false;
    }

    return true;
  }
}
