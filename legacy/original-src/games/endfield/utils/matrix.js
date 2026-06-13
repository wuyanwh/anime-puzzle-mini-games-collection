export function cloneMatrix(matrix) {
  return matrix.map((row) => [...row]);
}

export function rotateMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      rotated[col][rows - row - 1] = matrix[row][col];
    }
  }

  return rotated;
}

export function occupiedCells(matrix, origin = { row: 0, col: 0 }) {
  const cells = [];
  matrix.forEach((line, row) => {
    line.forEach((value, col) => {
      if (value) cells.push({ row: origin.row + row, col: origin.col + col });
    });
  });
  return cells;
}
