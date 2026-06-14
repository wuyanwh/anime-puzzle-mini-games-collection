export const PIECE_SHAPES = {
  L: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0]
  ],
  I: [
    [1, 1, 1, 1]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  D:[
    [1, 1],
    [1, 0]
  ],
  V:[
    [1, 1, 1],
    [1, 0 ,0],
    [1, 0 ,0]
  ],
  Q:[
    [0,1,0],
    [1,1,1],
    [0,1,0]
  ],
  I:[
    [1,1,1]
  ],
  W:[
    [1,1,0],
    [0,1,1],
    [0,0,1]
  ],
  P:[
    [0,1,1],
    [0,1,1],
    [1,1,0]
  ],
  U:[
    [1,0,1],
    [1,1,1]
  ]
};

export const PIECE_COLORS = {
  default: "green",
  green: { skin: "green", label: "\u7ec8\u672b\u5730\u8367\u5149\u7eff" },
  blue: { skin: "blue", label: "\u79d1\u6280\u84dd" },
  yellow: { skin: "yellow", label: "\u4fe1\u6807\u9ec4" },
  red: { skin: "red", label: "\u8b66\u6212\u7ea2" }
};

export function normalizePieceConfig(pieceConfig, index) {
  if (typeof pieceConfig === "string") {
    return {
      id: `${pieceConfig}${index + 1}`,
      shape: pieceConfig,
      color: PIECE_COLORS.default
    };
  }

  const shape = pieceConfig.shape || pieceConfig.type || "O";
  return {
    id: pieceConfig.id || `${shape}${index + 1}`,
    shape,
    color: pieceConfig.color || PIECE_COLORS.default
  };
}

export function colorToSkin(color) {
  return PIECE_COLORS[color]?.skin || PIECE_COLORS[PIECE_COLORS.default].skin;
}
