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
      "今天 {birthdayDate} 是你的日子，先把掌聲收下 ✨",
      "我偷偷準備了一封只屬於你的生日信…",
      "準備好一起打開了嗎？",
    ],
    cta: "拆開信封 💌",
  },
  {
    id: "memory",
    type: "story",
    chapterLabel: "第一章 · 我們的開始",
    lines: [
      "還記得嗎？我們第一次見面的那一天…",
      "你笑起來的樣子，我到現在都記得很清楚 😊",
      "從那天起，我的世界好像多了一種很溫柔的顏色。",
      "謝謝你，願意走進我的生活。",
    ],
    image: "assets/images/memory-1.svg",
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
        options: ["咖啡廳 ☕", "電影院 🎬", "公園散步 🌳"],
        correct: 0,
        feedback: {
          correct: "答對啦！那天你點了熱可可，真的超可愛～ 🥰",
          wrong: "再想想～提示：有咖啡香氣的地方 ☕",
        },
      },
      {
        text: "我最愛你哪一點？",
        options: ["你的笑容 😄", "你的溫柔 💕", "以上皆是 ✨"],
        correct: 2,
        feedback: {
          correct: "標準答案！你的每一面我都喜歡～",
          wrong: "嘿嘿，這題是送分題啦，再選一次！",
        },
      },
      {
        text: "如果用一個詞形容我們的相處，你會選？",
        options: ["甜蜜 🍬", "搞笑 🤣", "默契 🤝"],
        correct: -1,
        feedback: {
          correct: "每個答案都對！因為我們就是最有趣的組合～",
          wrong: "每個答案都對！因為我們就是最有趣的組合～",
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
        image: "assets/images/memory-2.svg",
        caption: "第一次一起旅行的那天，陽光剛剛好 ☀️",
      },
      {
        image: "assets/images/memory-3.svg",
        caption: "你做的料理…嗯，真的有把心意加滿！💯",
      },
      {
        image: "assets/images/memory-4.svg",
        caption: "平凡的日子，因為有你而變得特別 ✨",
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
        reveal: "「無限擁抱券」一張！\n隨時可用，永遠有效 🤗",
      },
      {
        label: "💜 紫色禮盒",
        emoji: "💜",
        reveal: "「專屬約會券」一張！\n地點你定，我買單 🍽️",
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
      "謝謝你出現在我的生命裡，",
      "讓每一天都像今天一樣值得慶祝。",
      "",
      "願新的一歲，",
      "你的笑容比陽光更燦爛，",
      "所有願望都慢慢實現，",
      "而我，會一直在你身邊。",
      "",
      "Love,",
      "{yourName} 💕",
    ],
  },
];

export const STORAGE_KEY = "birthday-site-progress";
