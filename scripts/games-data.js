(function registerGameCatalog() {
  window.MiniGamesCatalog = {
    copy: {
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
    },
    games: [
      {
        id: "endfield",
        name: "终末地-维修电路",
        url: "endfield.html",
        cover: "../assets/images/endfield-cover.png",
        pattern: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)"
      },
      {
        id: "game2",
        name: "鸣潮-加密分区",
        url: "game2.html",
        cover: "../assets/images/wuthering-cover.png",
        pattern: "linear-gradient(45deg, rgba(255, 255, 255, 0.08) 25%, transparent 25% 50%, rgba(255, 255, 255, 0.08) 50% 75%, transparent 75%)"
      },
      {
        id: "game3",
        name: "game3",
        url: "game3.html",
        cover: "../assets/images/game3-cover.svg",
        pattern: "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 2px, transparent 2px 16px)"
      },
      {
        id: "game4",
        name: "game4",
        url: "game4.html",
        cover: "../assets/images/game4-cover.svg",
        pattern: "radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0 2px, transparent 2px 16px)"
      },
      {
        id: "game5",
        name: "game5",
        url: "game5.html",
        cover: "../assets/images/game5-cover.svg",
        pattern: "repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0 2px, transparent 2px 18px)"
      }
    ]
  };
})();
