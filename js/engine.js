/**
 * 頁面流程控制。
 */

import { SITE, SCENES, STORAGE_KEY } from "./config.js";
import {
  interpolate,
  typewriter,
  skipAllTypewriters,
  fadeIn,
  sceneTransition,
  startConfetti,
  stopConfetti,
  spawnFloatingHearts,
  playEnvelopeOpen,
} from "./effects.js";

const vars = {
  herName: SITE.herName,
  yourName: SITE.yourName,
  birthdayDate: SITE.birthdayDate,
};

class SceneEngine {
  constructor() {
    this.sceneIndex = 0;
    this.container = document.getElementById("scene-container");
    this.progressFill = document.getElementById("progress-fill");
    this.chapterLabel = document.getElementById("chapter-label");
    this.btnContinue = document.getElementById("btn-continue");
    this.btnSkip = document.getElementById("btn-skip");
    this.confettiCanvas = document.getElementById("confetti-canvas");
    this.musicToggle = document.getElementById("music-toggle");
    this.bgm = document.getElementById("bgm");

    this.activeTypewriters = [];
    this.isTyping = false;
    this.sceneResolve = null;
    this.currentGallery = null;

    this.loadProgress();
    this.bindGlobalEvents();
    this.renderScene();
  }

  bindGlobalEvents() {
    this.btnContinue.addEventListener("click", () => this.handleContinue());
    this.btnSkip.addEventListener("click", () => this.handleSkip());

    this.container.addEventListener("click", (e) => {
      if (e.target.closest("button, .quiz-option, .gift-box, .candle, .gallery-nav")) return;
      if (this.isTyping) {
        this.handleSkip();
      }
    });

    this.musicToggle.addEventListener("click", () => this.toggleMusic());

    window.addEventListener("resize", () => {
      if (this.confettiCanvas.classList.contains("active")) {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      }
    });

    window.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  handleKeydown(e) {
    const key = e.key;

    if (this.currentGallery && (key === "ArrowLeft" || key === "ArrowRight")) {
      e.preventDefault();
      if (key === "ArrowLeft") this.currentGallery.prev();
      if (key === "ArrowRight") this.currentGallery.next();
      return;
    }

    if (key === "Enter" || key === " " || key === "Spacebar") {
      if (this.isTyping) {
        e.preventDefault();
        this.handleSkip();
        return;
      }

      if (this.sceneResolve) {
        e.preventDefault();
        this.handleContinue();
      }
    }
  }

  loadProgress() {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const idx = parseInt(saved, 10);
        if (idx >= 0 && idx < SCENES.length) {
          this.sceneIndex = idx;
        }
      }
    } catch {
      /* ignore */
    }
  }

  saveProgress() {
    try {
      sessionStorage.setItem(STORAGE_KEY, String(this.sceneIndex));
    } catch {
      /* ignore */
    }
  }

  get currentScene() {
    return SCENES[this.sceneIndex];
  }

  updateProgress() {
    const pct = ((this.sceneIndex + 1) / SCENES.length) * 100;
    this.progressFill.style.width = `${pct}%`;
    this.chapterLabel.textContent = this.currentScene.chapterLabel || "";
  }

  hideButtons() {
    this.btnContinue.classList.add("hidden");
    this.btnSkip.classList.add("hidden");
  }

  showContinue(text = "繼續") {
    this.btnContinue.textContent = text;
    this.btnContinue.classList.remove("hidden");
    this.btnSkip.classList.add("hidden");
    this.isTyping = false;
  }

  showSkip() {
    this.btnSkip.classList.remove("hidden");
    this.isTyping = true;
  }

  handleSkip() {
    skipAllTypewriters(this.activeTypewriters);
    this.activeTypewriters = [];
    this.isTyping = false;
    this.btnSkip.classList.add("hidden");
    if (this.sceneResolve) {
      const resolve = this.sceneResolve;
      this.sceneResolve = null;
      resolve();
    }
  }

  handleContinue() {
    if (this.sceneResolve) {
      const resolve = this.sceneResolve;
      this.sceneResolve = null;
      resolve();
    } else {
      this.nextScene();
    }
  }

  async nextScene() {
    stopConfetti(this.confettiCanvas);
    await sceneTransition(this.container);
    this.sceneIndex++;
    this.saveProgress();
    if (this.sceneIndex >= SCENES.length) {
      this.sceneIndex = SCENES.length - 1;
      return;
    }
    this.renderScene();
  }

  clearContainer() {
    this.container.innerHTML = "";
    this.hideButtons();
    this.activeTypewriters = [];
    this.currentGallery = null;
  }

  waitForContinue(text = "繼續") {
    return new Promise((resolve) => {
      this.sceneResolve = resolve;
      this.showContinue(text);
    });
  }

  async renderLines(lines, targetEl) {
    this.activeTypewriters = [];
    this.showSkip();
    for (const raw of lines) {
      if (raw === "") {
        targetEl.appendChild(document.createElement("br"));
        continue;
      }
      const text = interpolate(raw, vars);
      const p = document.createElement("p");
      p.className = "typed-line";
      targetEl.appendChild(p);
      const result = await typewriter(p, text);
      this.activeTypewriters.push(result);
      if (!this.isTyping) break;
    }
    this.isTyping = false;
    this.btnSkip.classList.add("hidden");
  }

  async renderScene() {
    this.clearContainer();
    this.updateProgress();
    const scene = this.currentScene;

    switch (scene.type) {
      case "intro":
        await this.renderIntro(scene);
        break;
      case "story":
        await this.renderStory(scene);
        break;
      case "quiz":
        await this.renderQuiz(scene);
        break;
      case "gallery":
        await this.renderGallery(scene);
        break;
      case "choice":
        await this.renderChoice(scene);
        break;
      case "candle":
        await this.renderCandle(scene);
        break;
      case "finale":
        await this.renderFinale(scene);
        break;
    }
  }

  async renderIntro(scene) {
    const wrap = document.createElement("div");
    wrap.className = "scene-intro";

    const envelope = document.createElement("div");
    envelope.className = "envelope";
    envelope.innerHTML = `
      <div class="envelope-flap"></div>
      <div class="envelope-body">
        <span class="envelope-heart">💌</span>
      </div>
    `;
    wrap.appendChild(envelope);

    const textBox = document.createElement("div");
    textBox.className = "text-box";
    wrap.appendChild(textBox);

    this.container.appendChild(wrap);
    fadeIn(wrap);

    await this.renderLines(scene.lines, textBox);

    this.btnContinue.textContent = scene.cta;
    this.btnContinue.classList.remove("hidden");

    await this.waitForContinue(scene.cta);

    await playEnvelopeOpen(envelope);
    await this.nextScene();
  }

  async renderStory(scene) {
    const wrap = document.createElement("div");
    wrap.className = "scene-story";

    const textBox = document.createElement("div");
    textBox.className = "text-box";
    wrap.appendChild(textBox);

    const imgWrap = document.createElement("div");
    imgWrap.className = "story-image-wrap hidden";
    const img = document.createElement("img");
    img.src = scene.image;
    img.alt = scene.imageAlt || "回憶照片";
    img.className = "story-image";
    img.loading = "lazy";
    imgWrap.appendChild(img);
    wrap.appendChild(imgWrap);

    this.container.appendChild(wrap);
    fadeIn(wrap);

    await this.renderLines(scene.lines, textBox);

    imgWrap.classList.remove("hidden");
    fadeIn(imgWrap);

    await this.waitForContinue("下一頁");
    await this.nextScene();
  }

  async renderQuiz(scene) {
    const wrap = document.createElement("div");
    wrap.className = "scene-quiz";

    const introEl = document.createElement("p");
    introEl.className = "quiz-intro";
    wrap.appendChild(introEl);
    this.container.appendChild(wrap);
    fadeIn(wrap);

    await typewriter(introEl, scene.intro);
    await this.waitForContinue("開始答題");

    for (let qi = 0; qi < scene.questions.length; qi++) {
      const q = scene.questions[qi];
      await this.renderQuizQuestion(wrap, q, qi + 1, scene.questions.length);
    }

    const doneEl = document.createElement("p");
    doneEl.className = "quiz-done";
    wrap.appendChild(doneEl);
    await typewriter(doneEl, "太厲害了，這一關也完成啦 💮");
    await this.waitForContinue("繼續前進");
    await this.nextScene();
  }

  renderQuizQuestion(wrap, question, num, total) {
    return new Promise((resolve) => {
      const block = document.createElement("div");
      block.className = "quiz-block";

      const qEl = document.createElement("p");
      qEl.className = "quiz-question";
      qEl.textContent = `(${num}/${total}) ${question.text}`;
      block.appendChild(qEl);

      const optsEl = document.createElement("div");
      optsEl.className = "quiz-options";

      const feedbackEl = document.createElement("p");
      feedbackEl.className = "quiz-feedback hidden";

      let answered = false;

      question.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = opt;
        btn.addEventListener("click", async () => {
          if (answered) return;
          answered = true;

          const isCorrect =
            question.correct === -1 || idx === question.correct;
          btn.classList.add(isCorrect ? "correct" : "wrong");

          feedbackEl.classList.remove("hidden");
          feedbackEl.textContent = isCorrect
            ? question.feedback.correct
            : question.feedback.wrong;

          if (!isCorrect && question.correct !== -1) {
            optsEl.querySelectorAll(".quiz-option").forEach((b, i) => {
              if (i === question.correct) b.classList.add("correct");
            });
          }

          setTimeout(() => resolve(), 1800);
        });
        optsEl.appendChild(btn);
      });

      block.appendChild(optsEl);
      block.appendChild(feedbackEl);
      wrap.appendChild(block);
      fadeIn(block);
    });
  }

  async renderGallery(scene) {
    const wrap = document.createElement("div");
    wrap.className = "scene-gallery";

    const introEl = document.createElement("p");
    introEl.className = "gallery-intro";
    wrap.appendChild(introEl);

    const slider = document.createElement("div");
    slider.className = "gallery-slider";

    const track = document.createElement("div");
    track.className = "gallery-track";

    scene.items.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "gallery-slide";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.caption;
      img.loading = "lazy";

      const cap = document.createElement("p");
      cap.className = "gallery-caption";
      cap.textContent = item.caption;

      slide.appendChild(img);
      slide.appendChild(cap);
      track.appendChild(slide);
    });

    slider.appendChild(track);

    const nav = document.createElement("div");
    nav.className = "gallery-nav";
    nav.innerHTML = `
      <button type="button" class="gallery-arrow" id="gal-prev" aria-label="上一張">‹</button>
      <div class="gallery-dots" id="gal-dots"></div>
      <button type="button" class="gallery-arrow" id="gal-next" aria-label="下一張">›</button>
    `;

    wrap.appendChild(slider);
    wrap.appendChild(nav);
    this.container.appendChild(wrap);
    fadeIn(wrap);

    await typewriter(introEl, scene.intro);

    let current = 0;
    const total = scene.items.length;
    const dotsEl = nav.querySelector("#gal-dots");

    scene.items.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = `gallery-dot${i === 0 ? " active" : ""}`;
      dotsEl.appendChild(dot);
    });

    const updateSlide = () => {
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsEl.querySelectorAll(".gallery-dot").forEach((d, i) => {
        d.classList.toggle("active", i === current);
      });
    };

    const prev = () => {
      current = (current - 1 + total) % total;
      updateSlide();
    };

    const next = () => {
      current = (current + 1) % total;
      updateSlide();
    };

    this.currentGallery = { prev, next };

    nav.querySelector("#gal-prev").addEventListener("click", prev);
    nav.querySelector("#gal-next").addEventListener("click", next);

    let touchStartX = 0;
    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          next();
        } else {
          prev();
        }
      }
    }, { passive: true });

    await this.waitForContinue("看完了，下一頁");
    await this.nextScene();
  }

  async renderChoice(scene) {
    const wrap = document.createElement("div");
    wrap.className = "scene-choice";

    const textBox = document.createElement("div");
    textBox.className = "text-box";
    wrap.appendChild(textBox);

    const giftsEl = document.createElement("div");
    giftsEl.className = "gift-grid hidden";

    scene.options.forEach((opt) => {
      const box = document.createElement("button");
      box.type = "button";
      box.className = "gift-box";
      box.innerHTML = `
        <span class="gift-emoji">${opt.emoji}</span>
        <span class="gift-label">${opt.label}</span>
      `;
      box.addEventListener("click", async () => {
        giftsEl.querySelectorAll(".gift-box").forEach((b) => { b.disabled = true; });
        box.classList.add("selected");

        const reveal = document.createElement("div");
        reveal.className = "gift-reveal";
        reveal.innerHTML = opt.reveal.replace(/\n/g, "<br>");
        wrap.appendChild(reveal);
        fadeIn(reveal);
        startConfetti(this.confettiCanvas, 65);

        await new Promise((r) => setTimeout(r, 1800));
        await this.waitForContinue("收下禮物");
        await this.nextScene();
      });
      giftsEl.appendChild(box);
    });

    wrap.appendChild(giftsEl);
    this.container.appendChild(wrap);
    fadeIn(wrap);

    await this.renderLines(scene.lines, textBox);

    giftsEl.classList.remove("hidden");
    fadeIn(giftsEl);
  }

  async renderCandle(scene) {
    const wrap = document.createElement("div");
    wrap.className = "scene-candle";

    const textBox = document.createElement("div");
    textBox.className = "text-box";
    wrap.appendChild(textBox);

    const cake = document.createElement("div");
    cake.className = "cake hidden";
    cake.innerHTML = `
      <div class="candles-row" id="candles-row"></div>
      <div class="cake-body">🎂</div>
    `;
    wrap.appendChild(cake);

    this.container.appendChild(wrap);
    fadeIn(wrap);

    await this.renderLines(scene.lines, textBox);

    cake.classList.remove("hidden");
    fadeIn(cake);

    const row = cake.querySelector("#candles-row");
    let litCount = scene.candleCount;

    for (let i = 0; i < scene.candleCount; i++) {
      const candle = document.createElement("button");
      candle.type = "button";
      candle.className = "candle lit";
      candle.setAttribute("aria-label", `第 ${i + 1} 根蠟燭`);
      candle.innerHTML = `<span class="flame">🔥</span><span class="stick">|</span>`;

      candle.addEventListener("click", () => {
        if (!candle.classList.contains("lit")) return;
        candle.classList.remove("lit");
        candle.classList.add("out");
        candle.querySelector(".flame").textContent = "✨";
        litCount--;

        if (litCount === 0) {
          setTimeout(async () => {
            startConfetti(this.confettiCanvas, 150);
            await this.waitForContinue("願望完成啦");
            await this.nextScene();
          }, 600);
        }
      });

      row.appendChild(candle);
    }
  }

  async renderFinale(scene) {
    const wrap = document.createElement("div");
    wrap.className = "scene-finale";

    spawnFloatingHearts(wrap, 10);

    const textBox = document.createElement("div");
    textBox.className = "text-box finale-text";
    wrap.appendChild(textBox);

    this.container.appendChild(wrap);
    fadeIn(wrap);

    startConfetti(this.confettiCanvas, 100);

    await this.renderLines(scene.lines, textBox);

    this.musicToggle.classList.remove("hidden");

    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.className = "btn btn-secondary finale-restart";
    restartBtn.textContent = "再看一次";
    restartBtn.addEventListener("click", () => {
      sessionStorage.removeItem(STORAGE_KEY);
      this.sceneIndex = 0;
      stopConfetti(this.confettiCanvas);
      this.renderScene();
    });
    wrap.appendChild(restartBtn);

    this.btnContinue.classList.add("hidden");
  }

  toggleMusic() {
    if (this.bgm.src || this.bgm.querySelector("source")) {
      if (this.bgm.paused) {
        this.bgm.play().catch(() => {});
        this.musicToggle.classList.add("playing");
      } else {
        this.bgm.pause();
        this.musicToggle.classList.remove("playing");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.title = SITE.title;
  new SceneEngine();
});
