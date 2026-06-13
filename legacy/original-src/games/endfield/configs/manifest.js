export const levelManifest = [
  { id: 1, loader: () => import("../levels/level1.js") },
  { id: 2, loader: () => import("../levels/level2.js") },
  { id: 3, loader: () => import("../levels/level3.js") }
];
