import { createElement } from "../utils/dom.js";
import { occupiedCells } from "../utils/matrix.js";
import { PIECE_COLORS, colorToSkin } from "../configs/pieces.js";

const DEFAULT_COLOR = PIECE_COLORS.default;
const SKIN_CLASSES = Object.keys(PIECE_COLORS)
  .filter((color) => color !== "default")
  .map((color) => `skin-${colorToSkin(color)}`);

function normalizeColorTargets(targets, size) {
  const zeroes = () => Array(size).fill(0);

  if (Array.isArray(targets)) {
    return { [DEFAULT_COLOR]: [...targets, ...zeroes()].slice(0, size) };
  }

  if (!targets || typeof targets !== "object") {
    return { [DEFAULT_COLOR]: zeroes() };
  }

  return Object.fromEntries(
    Object.entries(targets).map(([color, values]) => [
      color,
      [...(Array.isArray(values) ? values : []), ...zeroes()].slice(0, size)
    ])
  );
}

function normalizeFixedBlocks(fixedBlocks = []) {
  return fixedBlocks.map((block, index) => {
    if (Array.isArray(block)) {
      const [row, col, color = DEFAULT_COLOR] = block;
      return { id: `fixed-${index + 1}`, row, col, color, skin: colorToSkin(color) };
    }

    const color = block.color || DEFAULT_COLOR;
    return {
      id: block.id || `fixed-${index + 1}`,
      row: block.row,
      col: block.col,
      color,
      skin: colorToSkin(color)
    };
  });
}

function getBlockColor(block) {
  return typeof block === "string" ? DEFAULT_COLOR : block.color || DEFAULT_COLOR;
}

export class PuzzleBoard {
  constructor(root) {
    this.root = root;
    this.level = null;
    this.targets = { rows: {}, cols: {}, colors: [DEFAULT_COLOR] };
    this.fixedBlocks = [];
    this.placedPieces = new Map();
    this.cellElements = [];
    this.previewCells = [];
    this.hintCells = [];
  }

  loadLevel(level) {
    this.level = level;
    this.placedPieces.clear();
    this.clearAnswerHint();
    this.fixedBlocks = normalizeFixedBlocks(level.fixedBlocks || level.litBlocks || level.fixedCells);
    this.targets = this.createTargets(level);
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
      const stack = createElement("div", "endfield-hint-stack endfield-hint-stack--col");
      this.targets.colors.forEach((color) => {
        stack.appendChild(this.createHint("col", col, this.targets.cols[color]?.[col] ?? 0, color));
      });
      colHints.appendChild(stack);
    }

    for (let row = 0; row < size; row += 1) {
      const stack = createElement("div", "endfield-hint-stack endfield-hint-stack--row");
      this.targets.colors.forEach((color) => {
        stack.appendChild(this.createHint("row", row, this.targets.rows[color]?.[row] ?? 0, color));
      });
      rowHints.appendChild(stack);

      for (let col = 0; col < size; col += 1) {
        const cell = createElement("div", "endfield-cell", {
          "data-row": row,
          "data-col": col
        });
        if (this.isObstacle(row, col)) cell.classList.add("is-obstacle");
        const fixedBlock = this.getFixedBlock(row, col);
        if (fixedBlock) {
          cell.classList.add("is-fixed", "is-filled", `skin-${fixedBlock.skin}`);
          cell.dataset.fixedColor = fixedBlock.color;
        }
        matrix.appendChild(cell);
        this.cellElements.push(cell);
      }
    }

    this.root.appendChild(colHints);
    this.root.appendChild(rowHints);
    this.root.appendChild(matrix);
    this.updateStats();
  }

  createTargets(level) {
    const size = this.getSize();
    const rows = normalizeColorTargets(level.rows, size);
    const cols = normalizeColorTargets(level.cols, size);
    const blockColors = (level.blocks || []).map(getBlockColor);
    const fixedColors = this.fixedBlocks.map((block) => block.color);
    const colors = [...new Set([...Object.keys(rows), ...Object.keys(cols), ...blockColors, ...fixedColors])];
    colors.forEach((color) => {
      rows[color] ||= Array(size).fill(0);
      cols[color] ||= Array(size).fill(0);
    });

    return {
      rows,
      cols,
      colors: colors.length ? colors : [DEFAULT_COLOR]
    };
  }

  createHint(axis, index, target, color = DEFAULT_COLOR) {
    const skin = colorToSkin(color);
    const hint = createElement("div", `endfield-hint endfield-hint--${axis} skin-${skin}`, {
      [`data-${axis}-hint`]: index,
      "data-color": color,
      "aria-label": `${axis === "col" ? "\u5217" : "\u884c"}${color}\u76ee\u6807 ${target}`
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

  getFixedBlock(row, col) {
    return this.fixedBlocks.find((block) => block.row === row && block.col === col);
  }

  canPlace(piece, origin, options = {}) {
    const size = this.getSize();
    const cells = occupiedCells(piece.matrix, origin);

    return cells.every(({ row, col }) => {
      if (row < 0 || col < 0 || row >= size || col >= size) return false;
      if (this.isObstacle(row, col)) return false;
      if (this.getFixedBlock(row, col)) return false;

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
      cell.classList.remove("is-filled", "is-fixed", "is-placed-flash", ...SKIN_CLASSES);
      cell.removeAttribute("data-piece-id");
      cell.removeAttribute("data-fixed-color");
    });

    this.fixedBlocks.forEach((fixedBlock) => {
      const cell = this.getCell(fixedBlock.row, fixedBlock.col);
      if (!cell) return;
      cell.classList.add("is-filled", "is-fixed", `skin-${fixedBlock.skin}`);
      cell.dataset.fixedColor = fixedBlock.color;
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

  showAnswerHint(answer) {
    this.clearAnswerHint();
    answer?.placements?.forEach((placement) => {
      occupiedCells(placement.matrix, placement.origin).forEach(({ row, col }) => {
        const cell = this.getCell(row, col);
        if (!cell || cell.classList.contains("is-fixed")) return;
        cell.classList.add("is-answer-hint");
        this.hintCells.push(cell);
      });
    });
  }

  clearAnswerHint() {
    this.hintCells.forEach((cell) => cell.classList.remove("is-answer-hint"));
    this.hintCells = [];
  }

  getStats() {
    const size = this.getSize();
    const rows = Object.fromEntries(this.targets.colors.map((color) => [color, Array(size).fill(0)]));
    const cols = Object.fromEntries(this.targets.colors.map((color) => [color, Array(size).fill(0)]));

    this.fixedBlocks.forEach(({ row, col, color }) => {
      if (!rows[color]) {
        rows[color] = Array(size).fill(0);
        cols[color] = Array(size).fill(0);
      }
      if (row >= 0 && row < size) rows[color][row] += 1;
      if (col >= 0 && col < size) cols[color][col] += 1;
    });

    for (const placed of this.placedPieces.values()) {
      occupiedCells(placed.matrix, placed.origin).forEach(({ row, col }) => {
        const color = placed.color || DEFAULT_COLOR;
        if (!rows[color]) {
          rows[color] = Array(size).fill(0);
          cols[color] = Array(size).fill(0);
        }
        rows[color][row] += 1;
        cols[color][col] += 1;
      });
    }

    return { rows, cols };
  }

  updateStats() {
    if (!this.level) return;
    const stats = this.getStats();

    this.targets.colors.forEach((color) => {
      stats.rows[color].forEach((count, row) => {
        this.updateHint(`[data-row-hint="${row}"][data-color="${color}"]`, count, this.targets.rows[color]?.[row] ?? 0);
      });

      stats.cols[color].forEach((count, col) => {
        this.updateHint(`[data-col-hint="${col}"][data-color="${color}"]`, count, this.targets.cols[color]?.[col] ?? 0);
      });
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
      for (const color of this.targets.colors) {
        if (stats.rows[color][index] !== (this.targets.rows[color]?.[index] ?? 0)) return false;
        if (stats.cols[color][index] !== (this.targets.cols[color]?.[index] ?? 0)) return false;
      }
    }

    return true;
  }
}
