(function initLanguageModule() {
  const appTitle = "Anime Puzzle Mini-Games Collection";
  const dictionaries = {
    zh: {
      "nav.home": "\u9996\u9875",
      "nav.settings": "\u8bbe\u7f6e",
      "nav.about": "\u5173\u4e8e",
      "app.title": appTitle,
      "search.placeholder": "\u641c\u7d22\u6e38\u620f...",
      "hero.title": "\u9009\u62e9\u6e38\u620f\u5f00\u59cb\u5427",
      "about.copy": "\u4e00\u4e2a\u7528\u4e8e\u96c6\u4e2d\u5c55\u793a\u548c\u6269\u5c55\u52a8\u6f2b\u89e3\u8c1c\u5c0f\u6e38\u620f\u7684\u73b0\u4ee3\u5316\u5408\u96c6\u7f51\u7ad9\u3002",
      "about.version": "\u7248\u672c\u4fe1\u606f",
      "about.stack": "\u6280\u672f\u6808",
      "about.note": "\u5f00\u53d1\u8bf4\u660e",
      "about.noteCopy": "\u5f53\u524d\u7248\u672c\u5df2\u63a5\u5165\u53ef\u73a9\u7684\u7ec8\u672b\u5730-\u7ef4\u4fee\u7535\u8def\uff0c\u5e76\u4fdd\u7559\u9e23\u6f6e-\u52a0\u5bc6\u5206\u533a\u7b49\u540e\u7eed\u6e38\u620f\u5165\u53e3\u3002"
    },
    en: {
      "nav.home": "Home",
      "nav.settings": "Settings",
      "nav.about": "About",
      "app.title": appTitle,
      "search.placeholder": "Search games...",
      "hero.title": "Choose a game",
      "about.copy": "A modern collection site for anime puzzle mini-games.",
      "about.version": "Version",
      "about.stack": "Tech Stack",
      "about.note": "Development",
      "about.noteCopy": "This version includes the playable Endfield repair puzzle and reserved entries for future games."
    }
  };

  function getLanguage() {
    return window.MiniGamesSettings?.getLanguage?.() || "zh";
  }

  function readDictionary(dictionary, key) {
    return Object.prototype.hasOwnProperty.call(dictionary, key) ? dictionary[key] : undefined;
  }

  function translate(key, language = getLanguage()) {
    const dictionary = dictionaries[language] || dictionaries.zh;
    const localValue = readDictionary(dictionary, key);
    if (localValue !== undefined) return localValue;

    const settingsValue = window.MiniGamesSettings?.translate?.(key, language);
    if (settingsValue !== undefined && settingsValue !== key) return settingsValue;

    const fallbackValue = readDictionary(dictionaries.zh, key);
    return fallbackValue !== undefined ? fallbackValue : key;
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
