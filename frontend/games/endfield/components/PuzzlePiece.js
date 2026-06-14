import { PIECE_SHAPES, colorToSkin, normalizePieceConfig } from "../configs/pieces.js";
import { createElement } from "../utils/dom.js";
import { cloneMatrix, rotateMatrix } from "../utils/matrix.js";

export class PuzzlePiece {
  constructor(pieceConfig, index, handlers = {}) {
    const config = normalizePieceConfig(pieceConfig, index);
    this.type = config.shape;
    this.shape = config.shape;
    this.index = index;
    this.id = config.id;
    this.color = config.color;
    this.skin = colorToSkin(config.color);
    this.matrix = cloneMatrix(PIECE_SHAPES[this.shape] || PIECE_SHAPES.O);
    this.initialMatrix = cloneMatrix(this.matrix);
    this.origin = null;
    this.handlers = handlers;
    this.element = this.render();
  }

  render() {
    const element = createElement("button", `endfield-piece skin-${this.skin}`, {
      type: "button",
      "aria-label": `${this.shape} \u578b\u62fc\u5757`
    });

    element.dataset.pieceId = this.id;
    element.dataset.shape = this.shape;
    element.addEventListener("pointerdown", (event) => this.handlers.pointerDown?.(this, event));
    element.addEventListener("mousedown", (event) => {
      if (window.PointerEvent) return;
      this.handlers.pointerDown?.(this, event);
    });
    element.addEventListener("click", () => this.handlers.select?.(this));
    element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.handlers.rotate?.(this, event);
    });
    element.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() !== "r") return;
      event.preventDefault();
      event.stopPropagation();
      this.handlers.rotate?.(this, event);
    });

    this.element = element;
    this.updateElement();
    return element;
  }

  updateElement() {
    if (!this.element) return;
    this.element.style.setProperty("--piece-cols", this.matrix[0].length);
    this.element.style.setProperty("--piece-rows", this.matrix.length);
    this.element.innerHTML = "";

    this.matrix.forEach((row) => {
      row.forEach((value) => {
        this.element.appendChild(createElement("span", value ? "piece-cell is-on" : "piece-cell"));
      });
    });
  }

  rotate() {
    this.matrix = rotateMatrix(this.matrix);
    this.updateElement();
  }

  setPlaced(origin) {
    this.origin = { ...origin };
    this.element.hidden = true;
    this.element.classList.add("is-placed");
    this.element.classList.remove("is-dragging", "is-invalid", "is-selected");
  }

  setInTray(options = {}) {
    this.origin = null;
    if (options.resetMatrix) {
      this.matrix = cloneMatrix(this.initialMatrix);
      this.updateElement();
    }
    this.element.hidden = false;
    this.element.classList.remove("is-placed", "is-dragging", "is-invalid", "is-selected", "is-rotating");
    this.element.style.width = "";
    this.element.style.height = "";
    this.element.style.left = "";
    this.element.style.top = "";
  }

  setMatrix(matrix) {
    this.matrix = cloneMatrix(matrix);
    this.updateElement();
  }

  destroy() {}
}
