export default {
  levelId: 12,
  placements: [
    {
      pieceId: "D1",
      origin: { row: 2, col: 2 },
      matrix: [
        [1, 1],
        [0, 1]
      ]
    },
    {
      pieceId: "W2",
      origin: { row: 2, col: 0 },
      matrix: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
      ]
    },
    {
      pieceId: "S3",
      origin: { row: 0, col: 3 },
      matrix: [
        [1, 0],
        [1, 1],
        [0, 1]
      ]
    },
    {
      pieceId: "T4",
      origin: { row: 0, col: 0 },
      matrix: [
        [0, 1, 0],
        [1, 1, 1]
      ]
    }
  ]
};
