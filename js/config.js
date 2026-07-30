/**
 * 主要設定：把文字和圖片路徑集中在這裡改就好。
 */

export const SITE = {
  herName: "筠筠寶貝",
  yourName: "騰騰",
  birthdayDate: "8月2日",
  title: "生日驚喜 💌",
};

export const SCENES = [
  {
    id: "landing",
    type: "intro",
    chapterLabel: "序章",
    lines: [
      "嗨，{herName}～",
      "今天 {birthdayDate} 是你的生日，讓我來和你一起慶祝 ✨",
      "我偷偷準備了一封只屬於你的生日信…",
      "準備好打開了嗎？",
    ],
    cta: "拆開信封 💌",
  },
  {
    id: "memory",
    type: "story",
    chapterLabel: "第一章 · 我們的開始",
    lines: [
      "還記得嗎？要告白的那一天…",
      "你笑起來的樣子，我到現在都記得很清楚 😊",
      "那天拍照拍到我一直爆汗",
      "謝謝你，願意走進我的生活。",
    ],
    image: "assets/images/memory-1.jpg",
    imageAlt: "我們的回憶",
  },
  {
    id: "quiz",
    type: "quiz",
    chapterLabel: "第二章 · 小小測驗",
    intro: "來個小測驗吧，看看你對「我們」有多了解！",
    questions: [
      {
        text: "我們第一次約會去了哪裡？",
        options: ["泰式餐廳 ☕", "電影院 🎬", "公園嘿嘿 🌳"],
        correct: 0,
        feedback: {
          correct: "答對啦！～第一次見面的可愛女森 🥰",
          wrong: "再想想～提示：有點泰的地方",
        },
      },
      {
        text: "我最愛你哪一點？",
        options: ["你很可愛 😄", "你很貼心 💕", "以上皆是 ✨"],
        correct: 2,
        feedback: {
          correct: "答對了！只要是你我都喜歡～",
          wrong: "嘿嘿，這題是送分題啦，再選一次！",
        },
      },
      {
        text: "如果用一個詞形容我們的關係，你會選擇？",
        options: ["搞笑搭檔", "可愛情侶", "默契夥伴"],
        correct: -1,
        feedback: {
          correct: "每個答案都對！",
          wrong: "每個答案都對！",
        },
      },
    ],
  },
  {
    id: "gallery",
    type: "gallery",
    chapterLabel: "第三章 · 回憶相冊",
    intro: "翻一翻我們的小相冊吧 📸",
    items: [
      {
        image: "assets/images/lugun.JPG",
        caption: "第一次鹿港行，粗了很多好粗的",
      },
      {
        image: "assets/images/memory-3.svg",
        caption: "第二次跨縣市到台南玩，玩得好累~",
      },
      {
        image: "assets/images/bobo.jpg",
        caption: "最近一次跟你去看袋鼠，快樂的時光總是過得好快~",
      },
      {
        image: "assets/images/night.jpg",
        caption: "好看的夜景和你",
      },
    ],
  },
  {
    id: "gift",
    type: "choice",
    chapterLabel: "第四章 · 選禮物",
    lines: [
      "生日怎麼能沒有禮物呢？",
      "三個禮物盒，選一個打開吧～ 🎁",
    ],
    options: [
      {
        label: "🎀 粉色禮盒",
        emoji: "🎀",
        reveal: "「無限抱抱券」一張！\n隨時可用，永遠有效 🤗",
      },
      {
        label: "💜 紫色禮盒",
        emoji: "💜",
        reveal: "「楓之谷遊玩券」一張！\n我們一起去打電動～ 🎮",
      },
      {
        label: "⭐ 星星禮盒",
        emoji: "⭐",
        reveal: "「永遠陪伴承諾」一份！\n不管發生什麼，我都在 💫",
      },
    ],
  },
  {
    id: "wish",
    type: "candle",
    chapterLabel: "第五章 · 許願時間",
    lines: [
      "最後一步～",
      "對著蛋糕許個願吧！",
      "點擊蠟燭，把它們吹熄 🔥",
    ],
    candleCount: 3,
  },
  {
    id: "finale",
    type: "finale",
    chapterLabel: "終章 · 生日祝福",
    lines: [
      "親愛的 {herName}，",
      "生日快樂！🎂🎉",
      "",
      "謝謝你出現在我的生活裡，",
      "遇到妳後的每一天都很不一樣。",
      "",
      "祝福你新的一歲，",
      "能一樣開開心心的過",
      "所有願望都慢慢實現，",
      "我，會一直在你身邊。",
      "",
      "Love,",
      "{yourName} 💕",
    ],
  },
];

export const STORAGE_KEY = "birthday-site-progress";
