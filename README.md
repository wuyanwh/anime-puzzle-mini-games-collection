# Mini Games Collection

一个使用原生 HTML、CSS 和 JavaScript 构建的小游戏合集。当前已将项目按前后端职责拆分：前端负责页面展示与交互，后端负责关卡数据与关卡管理服务。

## 目录结构

```text
simple game/
├── index.html
├── pages/                 # 页面 HTML
├── frontend/              # 前端游戏源码与运行 bundle
│   └── games/endfield/
│       ├── index.js
│       ├── index.bundle.js
│       ├── components/
│       ├── configs/
│       ├── hooks/
│       └── utils/
├── backend/               # 关卡数据与关卡管理服务
│   └── games/endfield/
│       ├── answers/
│       ├── levels/
│       └── services/
├── assets/                # 图片、Logo 等静态资源
├── styles/                # 全站与游戏样式
├── scripts/               # 全站通用脚本
├── docs/                  # 项目文档
└── legacy/original-src/   # 重构前源码归档
```

## 职责划分

- `backend/games/endfield/levels/` 存放关卡数据。
- `backend/games/endfield/answers/` 存放每题答案数据，供提示与显示答案使用。
- `backend/games/endfield/services/LevelService.js` 管理关卡列表、按 ID/索引加载关卡、上一关/下一关计算。
- `frontend/games/endfield/components/` 存放棋盘、拼块、存档、UI、前端关卡适配器等交互组件。
- `frontend/games/endfield/configs/` 存放前端展示所需的拼块形状和颜色配置。
- `pages/`、`styles/`、`scripts/`、`assets/` 继续分别存放页面、样式、通用脚本和静态资源。

## 运行方式

直接打开根目录的 `index.html`，页面会进入 `pages/index.html`。终末地游戏页面加载 `frontend/games/endfield/index.bundle.js`，保留原来的直接运行方式。

## 扩展关卡

1. 在 `backend/games/endfield/levels/` 中新增关卡文件。
2. 在 `backend/games/endfield/answers/` 中新增同名答案文件，并在 `answers/index.js` 中导出。
3. 在 `backend/games/endfield/services/LevelService.js` 中导入并加入 `endfieldLevels`。
4. 如需支持新的拼块形状或颜色，在 `frontend/games/endfield/configs/pieces.js` 中补充配置。

## 旧代码

重构前的 `src/` 已移动到 `legacy/original-src/`，用于保留原有代码与对照历史实现。
