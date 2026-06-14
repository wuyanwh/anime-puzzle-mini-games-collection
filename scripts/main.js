const gameCopy = {
  zh: {
    start: "开始游戏",
    empty: "没有找到匹配的小游戏。",
    descriptions: {
      endfield: "故障Delta机器人会梦到艾露管理员吗",
      game2: "",
      game3: "",
      game4: "",
      game5: ""
    }
  },
  en: {
    start: "Start Game",
    empty: "No matching games found.",
    descriptions: {
      endfield: "Will a faulty Delta robot dream of Administrator Ayla?",
      game2: "",
      game3: "",
      game4: "",
      game5: ""
    }
  }
};

const games = [
  {
    id: "endfield",
    name: "终末地-维修电路",
    icon: "01",
    url: "endfield.html",
    cover: "../assets/images/endfield-cover.png",
    pattern: "radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.24), transparent 0.8rem)"
  },
  {
    id: "game2",
    name: "鸣潮-加密分区",
    icon: "02",
    url: "game2.html",
    cover: "../assets/images/wuthering-cover.png",
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
