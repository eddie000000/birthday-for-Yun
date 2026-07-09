# 生日驚喜小網站
[生日驚喜小網站](https://eddie000000.github.io/birthday-for-Yun/index.html)

這是一個用 HTML、CSS、JavaScript 做的生日互動網站，適合部署在 GitHub Pages。

## 特色

- 逐字顯示的生日信
- 回憶故事卡片
- 小測驗互動
- 相簿滑動瀏覽
- 禮物盒驚喜揭曉
- 吹蠟燭許願儀式
- 生日結尾祝福動畫

## 如何修改內容

主要文字都集中在 [js/config.js](js/config.js)。

| 欄位 | 用途 |
|---|---|
| `SITE.herName` | 她的名字 |
| `SITE.yourName` | 你的名字 |
| `SITE.birthdayDate` | 生日日期 |
| `SCENES[].lines` | 每段文字內容 |
| `SCENES[].questions` | 小測驗題目 |
| `SCENES[].items` | 相簿照片與說明 |
| `SCENES[].options` | 禮物盒內容 |

## 放照片

1. 把圖片放進 [assets/images](assets/images)。
2. 建議使用 JPG、PNG 或 SVG。
3. 在 [js/config.js](js/config.js) 裡把路徑改成你的圖片檔名。

例如：

```js
image: "assets/images/memory-1.svg",
```

## 背景音樂

1. 把音樂檔放進 `assets/audio/`。
2. 到 [index.html](index.html) 解除註解 `<source>` 那一行。
3. 右下角的音樂按鈕可隨時開關，第一次播放時也會顯示提示。

## 本機預覽

你可以用任何靜態伺服器打開這個資料夾，像是：

```bash
python -m http.server 8080
```

或：

```bash
npx serve .
```

## 部署到 GitHub Pages

1. 把專案推到 GitHub Repository。
2. 到 Repository 的 `Settings > Pages`。
3. `Source` 選 `Deploy from a branch`。
4. `Branch` 選 `main`，資料夾選 `/ (root)`。
5. 儲存後稍等幾分鐘，就會拿到 GitHub Pages 網址。

## 專案結構

```text
index.html
css/style.css
js/
  config.js
  engine.js
  effects.js
assets/images/
```
