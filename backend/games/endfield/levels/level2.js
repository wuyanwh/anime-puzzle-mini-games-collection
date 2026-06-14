export default {
  id: 2,
  name: "第二关",
  size: 4,
  rows: {
    green: [2, 3, 1, 2],
    blue: [1, 1, 1, 2]
  },
  cols: {
    green: [3, 2, 2, 1],
    blue: [1, 0, 1, 3]
  },
  blocks: [
    { shape: "L", color: "green" },
    { shape: "J", color: "blue" },
    { shape: "S", color: "green" }
  ],
  fixedBlocks: [{ row: 0, col: 0, color: "blue" }],
  obstacles: []
};
