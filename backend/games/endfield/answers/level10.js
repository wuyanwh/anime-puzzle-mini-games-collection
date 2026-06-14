export default {
  levelId: 10,
  placements: [
    {
      pieceId: "Q1",
      origin: { row: 0, col: 0 },
      matrix: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]
    },
    {
      pieceId: "Q2",
      origin: { row: 2, col: 2 },
      matrix: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]
    },
    {
      pieceId: "W3",
      origin: { row: 0, col: 2 },
      matrix: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
      ]
    },
    {
      pieceId: "W4",
      origin: { row: 2, col: 0 },
      matrix: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
      ]
    }
  ]
};
