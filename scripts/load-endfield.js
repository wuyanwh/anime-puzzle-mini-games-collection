(function loadEndfieldGame() {
  var currentScript = document.currentScript;
  var script = document.createElement("script");

  script.src = "../frontend/games/endfield/index.bundle.js";
  script.defer = true;

  if (currentScript && currentScript.parentNode) {
    currentScript.parentNode.insertBefore(script, currentScript.nextSibling);
  } else {
    document.body.appendChild(script);
  }
})();
