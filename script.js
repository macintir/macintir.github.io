/**
 * BIOKURI // MICHELI MAC INTIR
 * Portfólio Profissional no Padrão Visual Creme & Verde Pinheiro da BioKuri
 * Scripts de Interatividade Botânica, Bio-Canvas, Áudio Orgânico & Métricas
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioSystem();
  initBotanicalCanvas();
  initMetricsCounter();
  initLightbox();
  initSmoothScroll();
});

/* ==========================================================================
   1. SISTEMA DE ÁUDIO ORGÂNICO (SINTETIZADOR WEB AUDIO API)
   Vocalizações de aves da mata sintetizadas em tempo real via código
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioSystem() {
  const soundToggle = document.getElementById('sound-toggle');
  if (!soundToggle) return;

  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = soundToggle.querySelector('i');
    if (icon) {
      icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    }
    soundToggle.style.color = soundEnabled ? 'var(--primary)' : 'var(--text-muted)';
    if (soundEnabled) {
      playBirdVocalization();
    }
  });
}

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playBirdVocalization() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq1: 1760, freq2: 2400, start: 0, dur: 0.12 },
      { freq1: 2200, freq2: 2850, start: 0.14, dur: 0.13 },
      { freq1: 2650, freq2: 1950, start: 0.29, dur: 0.16 }
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.freq1, now + n.start);
      osc.frequency.exponentialRampToValueAtTime(n.freq2, now + n.start + n.dur);

      gain.gain.setValueAtTime(0.001, now + n.start);
      gain.gain.linearRampToValueAtTime(0.035, now + n.start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur);
    });
  } catch (e) {}
}

function playSoftChirp(freq = 1100) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.08);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

/* ==========================================================================
   2. BOTANICAL CANVAS (ESPOROS, PÓLEN & LUZES BOTÂNICAS EM MOVIMENTO)
   Ajustado para o fundo Creme da BioKuri com partículas translúcidas
   ========================================================================== */
function initBotanicalCanvas() {
  const canvas = document.getElementById('bio-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  const count = width > 1024 ? 65 : (width > 600 ? 45 : 30);
  const particles = [];

  class Spore {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 0.45 + 0.25;
      this.radius = Math.random() * 2.2 + 1.2;

      // Cores: tons translúcidos de Verde Pinheiro BioKuri e Âmbar
      this.isGold = Math.random() < 0.35;
      this.alpha = Math.random() * 0.22 + 0.12;
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.drift = (Math.random() - 0.5) * 0.4;
    }

    update() {
      // Movimento suave de subida / brisa
      this.y -= this.speed;
      this.x += Math.sin(this.angle) * 0.5 + this.drift;
      this.angle += 0.02;

      // Dispersão suave ao aproximar o cursor
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.hypot(dx, dy);

      if (dist < 120 && dist > 10) {
        const repelAngle = Math.atan2(dy, dx);
        this.x += Math.cos(repelAngle) * 1.5;
        this.y += Math.sin(repelAngle) * 1.5;
      }

      this.pulsePhase += this.pulseSpeed;

      // Reposição pelas bordas
      if (this.y < -30) {
        this.reset(false);
      }
      if (this.x < -30) this.x = width + 20;
      if (this.x > width + 30) this.x = -20;
    }

    draw() {
      const glow = Math.sin(this.pulsePhase) * 0.35 + 0.65;
      const a = this.alpha * glow;

      const r = this.isGold ? 196 : 28;
      const g = this.isGold ? 125 : 89;
      const b = this.isGold ? 59 : 51;

      // Halo sutil
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 3.5
      );
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a * 0.7})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Ponto de luz
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.9})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) {
    particles.push(new Spore());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. CONTADORES DE IMPACTO MÉTRICO
   ========================================================================== */
function initMetricsCounter() {
  const metricValues = document.querySelectorAll('.metric-val');
  if (!metricValues.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricValues.forEach(item => {
          const targetStr = item.getAttribute('data-target') || '0';
          const isPlus = item.textContent.includes('+');
          const isPercent = item.textContent.includes('%');
          const targetNum = parseInt(targetStr, 10);

          if (isNaN(targetNum)) return;

          let current = 0;
          const duration = 1200;
          const stepTime = 25;
          const increment = Math.max(1, Math.ceil(targetNum / (duration / stepTime)));

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
              current = targetNum;
              clearInterval(timer);
              item.textContent = current + (isPlus ? '+' : '') + (isPercent ? '%' : '');
            } else {
              item.textContent = current + (isPlus ? '+' : '') + (isPercent ? '%' : '');
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  metricValues.forEach(item => observer.observe(item));
}

/* ==========================================================================
   4. LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  window.openLightbox = function(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    playSoftChirp(780);
  };

  window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
    }
  });
}

/* ==========================================================================
   5. SMOOTH SCROLL COM OFFSET DE NAVBAR
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

console.log('🌿 BioKuri // Portfólio Micheli Mac Intir carregado com sucesso.');
