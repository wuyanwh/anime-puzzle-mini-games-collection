(function initGlobalSettings() {
  const settingsKey = "mini-games-settings-v1";
  const legacyThemeKey = "mini-games-theme";
  const legacyLanguageKey = "mini-games-language";

  const defaults = {
    theme: "dark",
    colorScheme: "aurora",
    fontSize: "medium",
    sound: true,
    animation: true,
    language: "zh"
  };

  const options = {
    theme: ["light", "dark", "custom"],
    colorScheme: ["aurora", "cyan", "rose"],
    fontSize: ["small", "medium", "large"],
    language: ["zh", "en"]
  };

  const labels = {
    zh: {
      title: "设置",
      eyebrow: "Settings",
      themeTitle: "主题模式",
      themeCopy: "浅色、深色与自定义主题会同步到全站所有页面。",
      light: "浅色",
      dark: "深色",
      custom: "自定义",
      colorTitle: "颜色方案",
      colorCopy: "选择按钮、卡片和高亮元素使用的全局强调色。",
      aurora: "极光蓝紫",
      cyan: "青蓝科技",
      rose: "玫瑰暖光",
      fontTitle: "字体大小",
      fontCopy: "调整正文、按钮和面板文字比例，刷新后仍会保留。",
      small: "小",
      medium: "标准",
      large: "大",
      soundTitle: "音效开关",
      soundCopy: "统一控制游戏和界面音效偏好。",
      soundOn: "开启音效",
      soundOff: "关闭音效",
      animationTitle: "动画效果",
      animationCopy: "控制页面过渡、悬停动效和游戏反馈动画。",
      animationOn: "开启动画",
      animationOff: "关闭动画",
      languageTitle: "语言设置",
      languageCopy: "主页面与子页面使用同一语言偏好。",
      zh: "简体中文",
      en: "English"
    },
    en: {
      title: "Settings",
      eyebrow: "Settings",
      themeTitle: "Theme Mode",
      themeCopy: "Light, dark, and custom themes sync across every page.",
      light: "Light",
      dark: "Dark",
      custom: "Custom",
      colorTitle: "Color Scheme",
      colorCopy: "Choose the global accent colors for buttons, cards, and highlights.",
      aurora: "Aurora",
      cyan: "Cyan Tech",
      rose: "Rose Glow",
      fontTitle: "Font Size",
      fontCopy: "Adjust text scale for content, buttons, and panels. It persists after refresh.",
      small: "Small",
      medium: "Default",
      large: "Large",
      soundTitle: "Sound",
      soundCopy: "Control game and interface sound preferences from one place.",
      soundOn: "Sound On",
      soundOff: "Sound Off",
      animationTitle: "Animation",
      animationCopy: "Control page transitions, hover motion, and game feedback animations.",
      animationOn: "Animation On",
      animationOff: "Animation Off",
      languageTitle: "Language",
      languageCopy: "Home and subpages share the same language preference.",
      zh: "Simplified Chinese",
      en: "English"
    }
  };

  let state = readSettings();

  function readJson(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  }

  function readSettings() {
    const saved = readJson(settingsKey) || {};
    const legacyTheme = localStorage.getItem(legacyThemeKey);
    const legacyLanguage = localStorage.getItem(legacyLanguageKey);
    return normalize({
      ...defaults,
      ...saved,
      theme: saved.theme || legacyTheme || defaults.theme,
      language: saved.language || legacyLanguage || defaults.language
    });
  }

  function normalize(next) {
    const normalized = { ...defaults, ...next };
    Object.entries(options).forEach(([key, allowed]) => {
      if (!allowed.includes(normalized[key])) normalized[key] = defaults[key];
    });
    normalized.sound = normalized.sound !== false;
    normalized.animation = normalized.animation !== false;
    return normalized;
  }

  function saveSettings(settings) {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
    localStorage.setItem(legacyThemeKey, settings.theme);
    localStorage.setItem(legacyLanguageKey, settings.language);
  }

  function currentLabels() {
    return labels[state.language] || labels.zh;
  }

  function applyDom(settings) {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.colorScheme = settings.colorScheme;
    root.dataset.fontSize = settings.fontSize;
    root.dataset.sound = settings.sound ? "on" : "off";
    root.dataset.animation = settings.animation ? "on" : "off";
    root.lang = settings.language === "en" ? "en" : "zh-CN";
  }

  function setSetting(key, value, options = {}) {
    const next = normalize({ ...state, [key]: value });
    const changed = JSON.stringify(next) !== JSON.stringify(state);
    state = next;
    applyDom(state);
    if (!options.skipSave) saveSettings(state);
    syncControls();
    renderSettingsPanels();

    if (changed || options.forceEvent) {
      window.dispatchEvent(new CustomEvent("mini-games:settings-change", { detail: { settings: getSettings() } }));
      if (key === "language" || options.languageChanged) {
        window.dispatchEvent(new CustomEvent("mini-games:language-change", { detail: { language: state.language } }));
      }
    }
  }

  function updateSettings(partial, options = {}) {
    const oldLanguage = state.language;
    const next = normalize({ ...state, ...partial });
    const changed = JSON.stringify(next) !== JSON.stringify(state);
    state = next;
    applyDom(state);
    if (!options.skipSave) saveSettings(state);
    syncControls();
    renderSettingsPanels();

    if (changed || options.forceEvent) {
      window.dispatchEvent(new CustomEvent("mini-games:settings-change", { detail: { settings: getSettings() } }));
      if (oldLanguage !== state.language || options.languageChanged) {
        window.dispatchEvent(new CustomEvent("mini-games:language-change", { detail: { language: state.language } }));
      }
    }
  }

  function getSettings() {
    return { ...state };
  }

  function getTheme() {
    return state.theme;
  }

  function applyTheme(theme) {
    setSetting("theme", theme);
  }

  function getLanguage() {
    return state.language;
  }

  function applyLanguage(language) {
    setSetting("language", language);
  }

  function translate(key, language = state.language) {
    const dictionary = labels[language] || labels.zh;
    return dictionary[key] || labels.zh[key] || key;
  }

  function isSoundEnabled() {
    return state.sound;
  }

  function segmented(name, values) {
    const dictionary = currentLabels();
    const titleKeys = {
      theme: "themeTitle",
      colorScheme: "colorTitle",
      fontSize: "fontTitle",
      language: "languageTitle"
    };
    return `
      <div class="segmented" role="group" aria-label="${dictionary[titleKeys[name]] || name}">
        ${values.map((value) => `
          <button class="segmented__button" type="button" data-setting="${name}" data-setting-value="${value}">
            ${dictionary[value]}
          </button>
        `).join("")}
      </div>
    `;
  }

  function toggleControl(name, onLabel, offLabel) {
    const dictionary = currentLabels();
    const checked = state[name] ? "checked" : "";
    return `
      <label class="setting-toggle">
        <input type="checkbox" data-setting-toggle="${name}" ${checked}>
        <span class="setting-toggle__track" aria-hidden="true"><span></span></span>
        <span class="setting-toggle__text" data-toggle-label="${name}">
          ${state[name] ? dictionary[onLabel] : dictionary[offLabel]}
        </span>
      </label>
    `;
  }

  function renderSettingsPanels() {
    const dictionary = currentLabels();
    document.querySelectorAll("#settingsModal").forEach((modal) => {
      modal.setAttribute("aria-labelledby", "settingsTitle");
      modal.innerHTML = `
        <header class="modal__header">
          <div><p class="section-label">${dictionary.eyebrow}</p><h2 id="settingsTitle">${dictionary.title}</h2></div>
          <button class="modal__close" type="button" data-modal-close aria-label="${dictionary.title}">x</button>
        </header>
        <div class="modal__body settings-panel">
          <div class="setting-row">
            <div><h3>${dictionary.themeTitle}</h3><p>${dictionary.themeCopy}</p></div>
            ${segmented("theme", options.theme)}
          </div>
          <div class="setting-row">
            <div><h3>${dictionary.colorTitle}</h3><p>${dictionary.colorCopy}</p></div>
            ${segmented("colorScheme", options.colorScheme)}
          </div>
          <div class="setting-row">
            <div><h3>${dictionary.fontTitle}</h3><p>${dictionary.fontCopy}</p></div>
            ${segmented("fontSize", options.fontSize)}
          </div>
          <div class="setting-row">
            <div><h3>${dictionary.soundTitle}</h3><p>${dictionary.soundCopy}</p></div>
            ${toggleControl("sound", "soundOn", "soundOff")}
          </div>
          <div class="setting-row">
            <div><h3>${dictionary.animationTitle}</h3><p>${dictionary.animationCopy}</p></div>
            ${toggleControl("animation", "animationOn", "animationOff")}
          </div>
          <div class="setting-row">
            <div><h3>${dictionary.languageTitle}</h3><p>${dictionary.languageCopy}</p></div>
            ${segmented("language", options.language)}
          </div>
        </div>
      `;
    });
    syncControls();
  }

  function syncControls() {
    document.querySelectorAll("[data-setting]").forEach((button) => {
      const key = button.dataset.setting;
      button.classList.toggle("is-selected", state[key] === button.dataset.settingValue);
      button.setAttribute("aria-pressed", String(state[key] === button.dataset.settingValue));
    });

    document.querySelectorAll("[data-theme-option]").forEach((button) => {
      button.classList.toggle("is-selected", state.theme === button.dataset.themeOption);
    });

    document.querySelectorAll("[data-language-option]").forEach((button) => {
      button.classList.toggle("is-selected", state.language === button.dataset.languageOption);
    });

    document.querySelectorAll("[data-setting-toggle]").forEach((input) => {
      const key = input.dataset.settingToggle;
      input.checked = Boolean(state[key]);
    });

    document.querySelectorAll("[data-toggle-label]").forEach((element) => {
      const key = element.dataset.toggleLabel;
      const dictionary = currentLabels();
      if (key === "sound") element.textContent = state.sound ? dictionary.soundOn : dictionary.soundOff;
      if (key === "animation") element.textContent = state.animation ? dictionary.animationOn : dictionary.animationOff;
    });

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const icon = button.querySelector("[data-theme-icon]");
      const label = button.querySelector("[data-theme-label]");
      const nextLabel = state.theme === "light" ? "Switch to dark mode" : "Switch to light mode";
      button.setAttribute("aria-label", nextLabel);
      if (icon) icon.textContent = state.theme === "light" ? "moon" : "sun";
      if (label) label.textContent = currentLabels().themeTitle;
    });
  }

  window.MiniGamesSettings = {
    getSettings,
    setSetting,
    updateSettings,
    renderSettingsPanels,
    isSoundEnabled,
    applyLanguage,
    getLanguage,
    translate
  };

  window.MiniGamesTheme = {
    getTheme,
    applyTheme,
    toggleTheme() {
      applyTheme(state.theme === "light" ? "dark" : "light");
    }
  };

  window.MiniGamesLanguage = {
    getLanguage,
    applyLanguage,
    translate
  };

  applyDom(state);

  document.addEventListener("DOMContentLoaded", renderSettingsPanels);

  document.addEventListener("click", (event) => {
    const themeToggle = event.target.closest("[data-theme-toggle]");
    if (themeToggle) window.MiniGamesTheme.toggleTheme();

    const settingOption = event.target.closest("[data-setting]");
    if (settingOption) {
      setSetting(settingOption.dataset.setting, settingOption.dataset.settingValue);
      return;
    }

    const themeOption = event.target.closest("[data-theme-option]");
    if (themeOption) applyTheme(themeOption.dataset.themeOption);

    const languageOption = event.target.closest("[data-language-option]");
    if (languageOption) applyLanguage(languageOption.dataset.languageOption);
  });

  document.addEventListener("change", (event) => {
    const toggle = event.target.closest("[data-setting-toggle]");
    if (toggle) setSetting(toggle.dataset.settingToggle, toggle.checked);
  });

  document.addEventListener("endfield:sound", (event) => {
    if (!state.sound) event.preventDefault();
  }, true);

  window.addEventListener("storage", (event) => {
    if ([settingsKey, legacyThemeKey, legacyLanguageKey].includes(event.key)) {
      state = readSettings();
      applyDom(state);
      syncControls();
      renderSettingsPanels();
      window.dispatchEvent(new CustomEvent("mini-games:settings-change", { detail: { settings: getSettings() } }));
      window.dispatchEvent(new CustomEvent("mini-games:language-change", { detail: { language: state.language } }));
    }
  });
})();
