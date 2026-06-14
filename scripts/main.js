(function initGameLobby() {
  const catalog = window.MiniGamesCatalog || { copy: {}, games: [] };
  const grid = document.querySelector("#gamesGrid");
  const searchInput = document.querySelector("#gameSearch");

  function getLanguage() {
    return window.MiniGamesSettings?.getLanguage?.() || window.MiniGamesLanguage?.getLanguage?.() || "zh";
  }

  function getCopy() {
    return catalog.copy[getLanguage()] || catalog.copy.zh || {};
  }

  function createGameCard(game) {
    const article = document.createElement("article");
    const copy = getCopy();
    const description = copy.descriptions?.[game.id] || "";

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

  function filterGames(keyword = "") {
    const value = keyword.trim().toLowerCase();
    const copy = getCopy();

    renderGames(catalog.games.filter((game) => {
      const description = copy.descriptions?.[game.id] || "";
      return game.name.toLowerCase().includes(value) || description.toLowerCase().includes(value);
    }));
  }

  filterGames();

  if (searchInput) {
    searchInput.addEventListener("input", (event) => filterGames(event.target.value));
  }

  window.addEventListener("mini-games:language-change", () => {
    filterGames(searchInput ? searchInput.value : "");
  });
})();
