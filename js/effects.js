/**
 * 共用動畫與小工具。
 */

let confettiAnimId = null;
let confettiParticles = [];

const prefersReducedMotion =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function interpolate(text, vars) {
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

export function typewriter(element, text, speed = 45) {
  return new Promise((resolve) => {
    element.textContent = "";

    if (prefersReducedMotion) {
      element.textContent = text;
      resolve({ skip: () => {} });
      return;
    }

    let i = 0;
    let cancelled = false;
    let timerId = null;

    const skip = () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
      element.textContent = text;
      resolve({ skip: () => {} });
    };

    const tick = () => {
      if (cancelled) return;
      if (i < text.length) {
        element.textContent += text[i];
        i++;
        timerId = setTimeout(tick, speed);
      } else {
        resolve({ skip });
      }
    };

    tick();
  });
}

export function skipAllTypewriters(results) {
  results.forEach((r) => r?.skip?.());
}

export function fadeIn(element, duration = 400) {
  if (prefersReducedMotion) {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    return;
  }

  element.style.opacity = "0";
  element.style.transform = "translateY(12px)";
  requestAnimationFrame(() => {
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
}

export function sceneTransition(container) {
  if (prefersReducedMotion) {
    return Promise.resolve();
  }

  container.classList.add("scene-exit");
  return new Promise((resolve) => {
    setTimeout(() => {
      container.classList.remove("scene-exit");
      container.classList.add("scene-enter");
      setTimeout(() => {
        container.classList.remove("scene-enter");
        resolve();
      }, 350);
    }, 250);
  });
}

function createParticle(canvas) {
  const colors = ["#FFB5BA", "#E8D5FF", "#FFD93D", "#FF9A76", "#7BC67E", "#FF6B9D"];
  return {
    x: Math.random() * canvas.width,
    y: -10,
    w: Math.random() * 8 + 4,
    h: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 8,
    opacity: 1,
  };
}

function drawConfetti(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
  ctx.restore();
}

export function startConfetti(canvas, count = 120) {
  if (prefersReducedMotion) {
    canvas.classList.add("active");
    setTimeout(() => stopConfetti(canvas), 250);
    return;
  }

  stopConfetti(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("active");

  confettiParticles = Array.from({ length: count }, () => createParticle(canvas));

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles = confettiParticles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.vy += 0.05;
      if (p.y > canvas.height + 20) {
        p.opacity -= 0.02;
      }
      drawConfetti(ctx, p);
      return p.opacity > 0 && p.y < canvas.height + 50;
    });

    if (confettiParticles.length > 0) {
      if (confettiParticles.length < count * 0.3) {
        confettiParticles.push(createParticle(canvas));
      }
      confettiAnimId = requestAnimationFrame(animate);
    } else {
      stopConfetti(canvas);
    }
  };

  confettiAnimId = requestAnimationFrame(animate);
}

export function stopConfetti(canvas) {
  if (confettiAnimId) {
    cancelAnimationFrame(confettiAnimId);
    confettiAnimId = null;
  }
  confettiParticles = [];
  const ctx = canvas?.getContext("2d");
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.remove("active");
  }
}

export function spawnFloatingHearts(container, count = 8) {
  const emojis = ["💖", "✨", "💌", "🎈", "🌷"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "floating-heart";
    el.textContent = emojis[i % emojis.length];
    el.style.left = `${10 + Math.random() * 80}%`;
    el.style.animationDelay = `${Math.random() * 4}s`;
    el.style.animationDuration = `${4 + Math.random() * 3}s`;
    container.appendChild(el);
  }
}

export function playEnvelopeOpen(envelopeEl) {
  envelopeEl.classList.add("envelope-open");
  return new Promise((resolve) => setTimeout(resolve, 800));
}
