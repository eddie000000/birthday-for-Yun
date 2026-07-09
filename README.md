# 生日驚喜互動網站

這是一個以 HTML、CSS、JavaScript 製作的生日祝福互動頁面，內容包含開場動畫、故事敘述、小測驗、相片牆、禮物選擇、吹蠟燭與結尾祝福。

## 功能特色

- 互動式故事流程
- 進度條與章節標題
- 小測驗與回饋
- 圖片相簿切換
- 禮物選擇互動
- 蠟燭點擊效果與彩帶動畫
- 可重新播放的結尾畫面

## 執行方式

這個專案使用 ES Module，需透過本機伺服器開啟，直接打開 index.html 可能會出現模組載入問題。

### 使用 Python

```bash
cd D:\yunbd
python -m http.server 8080
```

開啟瀏覽器訪問：

```text
http://localhost:8080
```

### 使用 Node.js

```bash
npx serve .
```

### 使用 VS Code / Cursor

可安裝 Live Server 擴充功能，右鍵打開 index.html 後選擇「Open with Live Server」。

## 修改內容

主要設定都在 [js/config.js](js/config.js) 中。

| 設定 | 作用 |
|------|------|
| SITE.herName | 女方名字 |
| SITE.yourName | 你的名字 |
| SITE.birthdayDate | 生日日期 |
| SCENES[].lines | 文字內容 |
| SCENES[].questions | 測驗題目 |
| SCENES[].items | 相簿圖片與說明 |
| SCENES[].options | 禮物選項內容 |

### 替換圖片

1. 把圖片放進 [assets/images](assets/images) 資料夾中。
2. 建議使用 JPG / PNG / SVG 格式，尺寸盡量接近 1:1，檔案大小小於 500KB。
3. 在 [js/config.js](js/config.js) 中更新對應的圖片路徑。

```javascript
image: "assets/images/memory-1.svg",
```

### 加入背景音樂（可選）

1. 把音樂檔放進 [assets](assets) 內的 audio 資料夾。
2. 解除 [index.html](index.html) 中音樂標籤的註解，並補上來源路徑。

## 部署到 GitHub Pages

1. 在 GitHub 建立一個 Repository。
2. 將專案推送到 GitHub。

```bash
git init
git add .
git commit -m "Add birthday interactive site"
git branch -M main
git remote add origin https://github.com/你的帳號/birthday-for-her.git
git push -u origin main
```

3. 進入 Repository 的 Settings > Pages。
4. Source 選擇「Deploy from a branch」。
5. Branch 選擇 main，Folder 選擇 / (root)。
6. 等待部署完成後即可使用以下網址：

```text
https://你的帳號.github.io/birthday-for-her/
```

## 專案結構

```text
index.html          # 入口頁面
css/style.css       # 樣式與動畫效果
js/
  config.js         # 文字、圖片與互動內容
  engine.js         # 主要流程控制
  effects.js        # 動畫與特效
assets/images/      # 圖片資源
```

## 備註

若要修改內容、配色或流程，建議先從 [js/config.js](js/config.js) 開始調整，這樣最容易維護。
