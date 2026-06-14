# Anime Puzzle Mini-Games Collection

一个用原生 HTML、CSS 和 JavaScript 搭建的动漫解谜小游戏合集。项目以游戏大厅为统一入口，当前已完成游戏是 `终末地-维修电路`，下一个想做的游戏是 `鸣潮-加密分区`。但是目前还不兼容移动端＞﹏＜

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

普通游玩不需要安装依赖，也不需要启动开发服务器。终末地页面会加载：

```text
frontend/games/endfield/index.bundle.js
```

## 目录结构

```text
simple game/
├─ index.html                     # 根入口，跳转到游戏大厅
├─ pages/                         # 大厅、游戏页和占位页
├─ styles/                        # 全站样式、页面样式和游戏专用样式
│  ├─ layout.css                  # 通用页面外壳
│  ├─ home.css                    # 游戏大厅专用视觉
│  └─ endfield.css                # 终末地专用视觉
├─ scripts/                       # 全站脚本
│  ├─ bootstrap-settings.js       # 首屏设置初始化，避免主题闪烁
│  ├─ games-data.js               # 大厅游戏数据、封面和文案
│  ├─ main.js                     # 大厅渲染与搜索逻辑
│  └─ load-endfield.js            # 终末地 bundle 加载器
├─ assets/                        # Logo、图标、封面和背景等静态资源
├─ frontend/games/endfield/       # 终末地前端源代码和可运行 bundle
└─ backend/games/endfield/        # 终末地关卡数据、答案数据和关卡服务
```

## 已有内容

- 游戏大厅：展示小游戏入口，支持搜索、主题设置、语言切换、字号、动画和音效偏好。
- `终末地-维修电路`：已录入 14 个关卡，支持拖拽、吸附、旋转、提示、显示答案、重置、计时和本地进度记录。
- `鸣潮-加密分区`：预留页面、封面和详情弹窗，后续可接入真实玩法。
- `game3` / `game4` / `game5`：预留扩展入口。

## 维护入口

- 大厅卡片名称、封面、入口和简介：修改 `scripts/games-data.js`。
- 大厅搜索和卡片渲染逻辑：修改 `scripts/main.js`。
- 首页视觉：修改 `styles/home.css`。
- 全站主题、弹窗、侧边栏和语言：修改 `scripts/theme.js`、`scripts/modal.js`、`scripts/sidebar.js`、`scripts/language.js`。
- 单个游戏介绍弹窗：修改对应的 `pages/*.html`。
- 终末地关卡：修改 `backend/games/endfield/levels/`。
- 终末地答案：修改 `backend/games/endfield/answers/`。

## 终末地数据说明

关卡和答案分开维护。关卡文件只描述棋盘规则和公开加载的数据，例如：

```js
export default {
  id: 2,
  name: "咦？还有异色！",
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

修改源代码或关卡后，同步更新 `frontend/games/endfield/index.bundle.js`，确保直接打开 HTML 时加载到最新内容：

```text
scripts/build-endfield-bundle.js
```
