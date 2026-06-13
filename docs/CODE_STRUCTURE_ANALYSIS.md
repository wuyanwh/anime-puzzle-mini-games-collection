# 代码结构与功能解析

## 1. 当前目录结构

```text
simple game/
├── index.html
├── README.md
├── assets/
│   ├── images/
│   └── logos/
├── backend/
│   └── games/endfield/
│       ├── levels/
│       │   ├── level1.js
│       │   ├── level2.js
│       │   └── level3.js
│       └── services/
│           └── LevelService.js
├── frontend/
│   └── games/endfield/
│       ├── index.js
│       ├── index.bundle.js
│       ├── components/
│       ├── configs/
│       ├── hooks/
│       └── utils/
├── legacy/
│   └── original-src/
├── pages/
├── scripts/
├── styles/
└── docs/
```

## 2. 前后端职责

### 后端

`backend/games/endfield/levels/` 存放终末地关卡数据。每个关卡导出一个对象：

```js
export default {
  id: 1,
  name: "第一关",
  size: 4,
  rows: [3, 3, 4, 2],
  cols: [2, 4, 3, 3],
  blocks: ["T", "T", "L"],
  obstacles: []
};
```

`backend/games/endfield/services/LevelService.js` 负责：

- 维护关卡数组 `endfieldLevels`。
- 暴露轻量关卡清单 `levelManifest`。
- 按 ID 或索引加载关卡。
- 计算上一关和下一关索引。

### 前端

`frontend/games/endfield/index.js` 是终末地游戏源码入口，负责初始化棋盘、拼块、存档、关卡管理器和 UI。

`frontend/games/endfield/components/` 包含核心交互类：

- `PuzzleBoard.js`：棋盘渲染、占用统计、合法放置、通关检测。
- `PuzzlePiece.js`：拼块 DOM、旋转、放置状态。
- `LevelManager.js`：前端关卡适配器，调用后端 `LevelService` 并同步本地存档。
- `SaveManager.js`：使用 `localStorage` 记录当前关卡、通关进度和重置次数。
- `UIManager.js`：更新关卡标题、进度、计时器、toast 和通关弹层。

`frontend/games/endfield/configs/pieces.js` 只保留前端展示需要的拼块形状和颜色配置。

`frontend/games/endfield/index.bundle.js` 是无构建工具运行用脚本。页面目前直接加载它，以保留原有打开 HTML 即可运行的能力。

## 3. 页面与公共资源

`pages/` 存放页面 HTML，包括大厅、终末地和占位游戏页面。`pages/endfield.html` 现在加载：

```html
<script src="../frontend/games/endfield/index.bundle.js"></script>
```

`styles/` 按样式类型拆分：

- `themes.css`：主题变量。
- `global.css`：全局基础样式。
- `layout.css`：页面布局和大厅卡片。
- `sidebar.css`：侧边栏。
- `navbar.css`：顶部导航。
- `modal.css`：弹窗。
- `game.css`：通用游戏页样式。
- `endfield.css`：终末地专用样式。

`scripts/` 存放全站通用脚本，例如主题、语言、侧边栏、弹窗和大厅渲染。

`assets/` 存放图片和 Logo。

## 4. 运行流程

打开 `index.html` 后跳转到 `pages/index.html`。进入终末地时，`pages/endfield.html` 加载终末地样式与 `frontend/games/endfield/index.bundle.js`。

游戏启动流程：

1. 查找 `[data-endfield-game]` 根节点。
2. 创建 `EndfieldGame`。
3. 创建 `PuzzleBoard`、`SaveManager`、`LevelManager` 和 `UIManager`。
4. `LevelManager` 根据存档读取当前关卡 ID。
5. 后端 `LevelService` 返回对应关卡数据。
6. 前端渲染棋盘、拼块和关卡状态。

## 5. 旧代码保留

重构前的 `src/` 已移动到 `legacy/original-src/`。该目录只用于保留原始代码和对照历史实现，后续开发应写入 `frontend/` 或 `backend/`。
