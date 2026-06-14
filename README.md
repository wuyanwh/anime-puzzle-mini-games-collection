# Anime Puzzle Mini-Games Collection

一个用原生 HTML、CSS 和 JavaScript 搭建的动漫解谜小游戏合集。项目以游戏大厅为统一入口，当前已完成游戏是 `终末地-维修电路`，下一个想做的游戏是 `鸣潮-加密分区`。目前可以进入http://121.40.75.179:8000/ 访问项目(～￣▽￣)～

## 项目定位

这个仓库更偏向“可直接打开的静态小游戏合集”，不依赖前端框架或后端服务即可体验。页面、样式、交互脚本、关卡数据和静态资源按职责拆开，方便继续添加新游戏或扩展终末地关卡。

## 已有内容

- 游戏大厅：展示小游戏入口，支持搜索、主题设置、语言切换、字号、动画和音效偏好。
- `终末地-维修电路`：已录入 14 个关卡，支持拖拽、吸附、旋转、提示、显示答案、重置、计时和本地进度记录。
- `鸣潮-加密分区`：预留页面、封面和详情弹窗，后续可接入真实玩法。
- `game3` / `game4` / `game5`：预留扩展入口，用于放置新的动漫解谜玩法。

## 本地运行

直接打开根目录的 `index.html` 即可进入大厅：

```text
index.html -> pages/index.html
```

进入终末地页面时，页面会加载：

```text
frontend/games/endfield/index.bundle.js
```

因此普通游玩不需要安装依赖，也不需要启动开发服务器。

## 目录结构

```text
simple game/
├── index.html             # 根入口，跳转到游戏大厅
├── pages/                 # 大厅、游戏页和占位页
├── scripts/               # 全站脚本：大厅渲染、设置、弹窗、侧栏、语言
├── styles/                # 全站样式和游戏专用样式
├── assets/                # Logo、图标、封面等静态资源
├── backgrounds/           # 背景素材
├── frontend/              # 前端游戏源码和可运行 bundle
│   └── games/endfield/
│       ├── index.js
│       ├── index.bundle.js
│       ├── components/
│       ├── configs/
│       ├── hooks/
│       └── utils/
└── backend/               # 关卡数据、答案数据和关卡管理服务
    └── games/endfield/
        ├── levels/
        ├── answers/
        └── services/
```

## 关键文件

- `pages/index.html`：游戏大厅外壳。
- `scripts/main.js`：大厅卡片数据、简介和搜索逻辑。
- `pages/endfield.html`：终末地页面、玩法面板和游戏介绍弹窗。
- `frontend/games/endfield/index.js`：终末地源码入口。
- `frontend/games/endfield/index.bundle.js`：浏览器直接运行版本。
- `frontend/games/endfield/configs/pieces.js`：拼块形状与颜色配置。
- `backend/games/endfield/levels/`：终末地关卡定义。
- `backend/games/endfield/answers/`：答案数据，供提示和显示答案使用。
- `backend/games/endfield/services/LevelService.js`：关卡读取、排序、总数和上下关计算。

## 终末地玩法数据

关卡和答案分开维护。关卡文件只描述棋盘规则和可公开加载的数据，例如：

```js
export default {
  id: 2,
  name: "哇!还有异色!",
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
```

字段含义：

- `id`：关卡编号，用于进度记录和答案匹配。
- `name`：页面显示的关卡名称。
- `size`：棋盘边长。
- `rows` / `cols`：行列目标，可以是普通数字数组，也可以按颜色拆分。
- `blocks`：本关可用拼块，支持字符串形状或带颜色的对象。
- `fixedBlocks`：开局固定在棋盘上的格子。
- `obstacles`：不可放置的障碍格。

这种拆分让游戏页面只关心关卡结构，提示和答案可以单独补充，不会污染关卡本体。

## 维护关卡

1. 在 `backend/games/endfield/levels/` 新增 `level*.js`。
2. 如需提示或显示答案，在 `backend/games/endfield/answers/` 新增对应答案文件。
3. 如需新拼块形状或颜色，在 `frontend/games/endfield/configs/pieces.js` 增加配置。
4. 修改源码或关卡后，同步更新 `frontend/games/endfield/index.bundle.js`，保证直接打开 HTML 时加载到最新内容。

同步脚本位于：

```text
scripts/build-endfield-bundle.js
```

## 更新页面文案

- 大厅卡片名称、封面、入口和简介：修改 `scripts/main.js`。
- 首页“关于”弹窗：修改 `pages/index.html` 和 `scripts/language.js`。
- 单个游戏的介绍弹窗：修改对应的 `pages/*.html`。
- 终末地玩法界面文案：优先检查 `pages/endfield.html` 和 `frontend/games/endfield/components/`。

## 设计取向

- 保持静态部署友好：根入口和游戏页都能直接在浏览器中打开。
- 保持数据可读：关卡、答案、拼块配置都用普通 JavaScript 对象表达。
- 保持扩展简单：新增小游戏时复用大厅、侧栏、设置和弹窗结构即可。
- 保持前后端职责清晰：`frontend/` 放交互与展示，`backend/` 放关卡数据与管理服务。
