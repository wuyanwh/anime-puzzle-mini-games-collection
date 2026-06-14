(function bootstrapSettings() {
  var defaults = {
    theme: "light",
    colorScheme: "aurora",
    fontSize: "medium",
    animation: "on",
    sound: "on",
    language: "zh"
  };

  function readSettings() {
    try {
      var saved = JSON.parse(localStorage.getItem("mini-games-settings-v1") || "{}");
      return {
        theme: saved.theme || localStorage.getItem("mini-games-theme") || defaults.theme,
        colorScheme: saved.colorScheme || defaults.colorScheme,
        fontSize: saved.fontSize || defaults.fontSize,
        animation: saved.animation === false ? "off" : defaults.animation,
        sound: saved.sound === false ? "off" : defaults.sound,
        language: saved.language || localStorage.getItem("mini-games-language") || defaults.language
      };
    } catch (error) {
      return defaults;
    }
  }

  var settings = readSettings();
  var root = document.documentElement;

  root.dataset.theme = settings.theme;
  root.dataset.colorScheme = settings.colorScheme;
  root.dataset.fontSize = settings.fontSize;
  root.dataset.animation = settings.animation;
  root.dataset.sound = settings.sound;
  root.lang = settings.language === "en" ? "en" : "zh-CN";
})();
