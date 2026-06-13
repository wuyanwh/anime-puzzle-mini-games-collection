(function initLanguageModule() {
  const dictionaries = {
    zh: {
      "nav.home": "首页",
      "nav.settings": "设置",
      "nav.about": "关于",
      "app.title": "小游戏合集",
      "search.placeholder": "搜索游戏...",
      "hero.title": "选择一个小游戏开始探索",
      "hero.copy": "统一管理多个小游戏入口，后续可按同一结构快速扩展更多玩法。",
      "about.copy": "一个用于集中展示和扩展小游戏入口的现代化合集网站框架。",
      "about.version": "版本信息",
      "about.stack": "技术栈",
      "about.note": "开发说明",
      "about.noteCopy": "当前版本完成统一导航、主题同步、游戏大厅和占位游戏页。"
    },
    en: {
      "nav.home": "Home",
      "nav.settings": "Settings",
      "nav.about": "About",
      "app.title": "Mini Games",
      "search.placeholder": "Search games...",
      "hero.title": "Choose a mini game to explore",
      "hero.copy": "Manage multiple mini game entries in one place, ready for future gameplay expansion.",
      "about.copy": "A modern collection framework for showcasing and expanding mini game entries.",
      "about.version": "Version",
      "about.stack": "Tech Stack",
      "about.note": "Development",
      "about.noteCopy": "This version includes unified navigation, theme sync, the game lobby, and placeholder game pages."
    }
  };

  function getLanguage() {
    return window.MiniGamesSettings?.getLanguage?.() || "zh";
  }

  function translate(key, language = getLanguage()) {
    return dictionaries[language]?.[key] || window.MiniGamesSettings?.translate?.(key, language) || dictionaries.zh[key] || key;
  }

  function applyLanguage(language) {
    if (window.MiniGamesSettings) {
      window.MiniGamesSettings.applyLanguage(language);
      return;
    }
    renderLanguage();
  }

  function renderLanguage() {
    const language = getLanguage();
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n, language);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = translate(element.dataset.i18nPlaceholder, language);
    });

    document.querySelectorAll("[data-language-option]").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.languageOption === language);
    });
  }

  window.MiniGamesLanguage = { getLanguage, applyLanguage, translate, renderLanguage };

  renderLanguage();
  window.addEventListener("mini-games:language-change", renderLanguage);
})();
