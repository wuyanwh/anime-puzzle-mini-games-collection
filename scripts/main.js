const gameCopy = {
  zh: {
    start: "开始游戏",
    empty: "没有找到匹配的小游戏。",
    descriptions: {
      endfield: "科技风拼块计数解谜：拖拽并旋转拼块，让每一行与每一列的占用数量全部吻合目标。",
      game2: "预留给益智类玩法，可快速接入棋盘、卡片或拖拽交互。",
      game3: "适合作为动作或躲避类小游戏的页面入口与展示卡片。",
      game4: "为策略、收集或养成类玩法准备的统一占位页面。",
      game5: "未来可扩展排行榜、成就和多人模式的小游戏入口。"
    }
  },
  en: {
    start: "Start Game",
    empty: "No matching games found.",
    descriptions: {
      endfield: "A futuristic block-counting logic puzzle: drag and rotate pieces until every row and column matches its target.",
      game2: "Reserved for puzzle mechanics, boards, cards, or drag interactions.",
      game3: "A clean entry for action, dodge, or movement-based mini games.",
      game4: "Prepared for strategy, collection, or progression-based gameplay.",
      game5: "A future-ready slot for rankings, achievements, and multiplayer modes."
    }
  }
};

const games = [
  {
    id: "endfield",
    name: "终末地",
    icon: "01",
    url: "endfield.html",
    cover: "../assets/images/endfield-cover.png",
    pattern: "radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.24), transparent 0.8rem)"
  },
  {
    id: "game2",
    name: "game2",
    icon: "02",
    url: "game2.html",
    cover: "../assets/images/game2-cover.svg",
    pattern: "linear-gradient(45deg, rgba(248, 250, 252, 0.12) 25%, transparent 25% 50%, rgba(248, 250, 252, 0.12) 50% 75%, transparent 75%)"
  },
  {
    id: "game3",
    name: "game3",
    icon: "03",
    url: "game3.html",
    cover: "../assets/images/game3-cover.svg",
    pattern: "repeating-linear-gradient(90deg, rgba(248, 250, 252, 0.12) 0 2px, transparent 2px 16px)"
  },
  {
    id: "game4",
    name: "game4",
    icon: "04",
    url: "game4.html",
    cover: "../assets/images/game4-cover.svg",
    pattern: "radial-gradient(circle at center, rgba(248, 250, 252, 0.16) 0 2px, transparent 2px 16px)"
  },
  {
    id: "game5",
    name: "game5",
    icon: "05",
    url: "game5.html",
    cover: "../assets/images/game5-cover.svg",
    pattern: "repeating-linear-gradient(135deg, rgba(248, 250, 252, 0.12) 0 2px, transparent 2px 18px)"
  }
];

const grid = document.querySelector("#gamesGrid");
const searchInput = document.querySelector("#gameSearch");

function getLanguage() {
  return window.MiniGamesSettings?.getLanguage?.() || window.MiniGamesLanguage?.getLanguage?.() || "zh";
}

function getCopy() {
  return gameCopy[getLanguage()] || gameCopy.zh;
}

function createGameCard(game) {
  const article = document.createElement("article");
  const copy = getCopy();
  const description = copy.descriptions[game.id];
  article.className = "game-card";
  article.style.setProperty("--cover-pattern", game.pattern);

  article.innerHTML = `
    <div class="game-card__cover" aria-hidden="true">
      <img src="${game.cover}" alt="" loading="lazy">
    </div>
    <div class="game-card__body">
      <div>
        <h3>${game.name}</h3>
        <p>${description}</p>
      </div>
      <a class="start-button" href="${game.url}">${copy.start}</a>
    </div>
  `;

  return article;
}

function renderGames(list) {
  if (!grid) return;

  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">${getCopy().empty}</div>`;
    return;
  }

  list.forEach((game) => grid.appendChild(createGameCard(game)));
}

function filterGames(keyword) {
  const value = keyword.trim().toLowerCase();
  const copy = getCopy();
  renderGames(games.filter((game) => {
    return game.name.toLowerCase().includes(value) || copy.descriptions[game.id].toLowerCase().includes(value);
  }));
}

renderGames(games);

if (searchInput) {
  searchInput.addEventListener("input", (event) => filterGames(event.target.value));
}

window.addEventListener("mini-games:language-change", () => {
  filterGames(searchInput ? searchInput.value : "");
});
