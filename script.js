/**
 * BIOKURI // MICHELI MAC INTIR (SUPERVISÃO AMBIENTAL & CIÊNCIA)
 * Identidade Oficial da Empresa BioKuri
 * Scripts de Interatividade Científica, Bio-Canvas, Áudio Orgânico & Animações
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioSystem();
  initBioCanvas();
  initConsoleTyping();
  initInteractiveName();
  initMetricsCounter();
  initScrollReveal();
  initLightbox();
});

/* ==========================================================================
   1. SISTEMA DE ÁUDIO ORGÂNICO (SINTETIZADOR WEB AUDIO API)
   Vocalizações suaves de aves da mata & bipes acústicos de campo
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
    soundToggle.style.color = soundEnabled ? 'var(--bio-emerald)' : 'var(--text-dim)';
    if (soundEnabled) {
      playBirdCall();
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

// Canto suave sintetizado de ave florestal (Sabiá / Pássaro da Mata Atlântica)
function playBirdCall() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq1: 1760, freq2: 2350, start: 0, dur: 0.12 },
      { freq1: 2200, freq2: 2790, start: 0.14, dur: 0.14 },
      { freq1: 2600, freq2: 1980, start: 0.30, dur: 0.18 }
    ];

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq1, now + note.start);
      osc.frequency.exponentialRampToValueAtTime(note.freq2, now + note.start + note.dur);

      gain.gain.setValueAtTime(0.001, now + note.start);
      gain.gain.linearRampToValueAtTime(0.035, now + note.start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.start + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.start);
      osc.stop(now + note.start + note.dur);
    });
  } catch (e) {
    // Autoplay restrictions
  }
}

// Gota d'água / orvalho para micro-interações
function playDewDrop(freq = 1200) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + 0.08);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

/* ==========================================================================
   2. BIO-CANVAS INTERATIVO: VAGA-LUMES & ESPOROS DO DOSSEL DA FLORESTA
   Partículas bioluminescentes esmeralda/douradas com ondulação natural
   Reage com dispersão orgânica ao cursor do mouse e ao toque
   ========================================================================== */
function initBioCanvas() {
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

  const observationZone = document.getElementById('canopy-observation-zone');
  let mouseInZone = false;
  let mouseX = -1000;
  let mouseY = -1000;
  const shockwaves = [];

  function triggerBurst(x, y) {
    shockwaves.push({
      x: x,
      y: y,
      radius: 4,
      maxRadius: 85,
      speed: 3.5,
      alpha: 0.9
    });
    playDewDrop(900 + Math.random() * 400);
  }

  // Interação na zona dedicada
  if (observationZone) {
    observationZone.addEventListener('mousemove', (e) => {
      mouseInZone = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    observationZone.addEventListener('mouseenter', (e) => {
      mouseInZone = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    observationZone.addEventListener('mouseleave', () => {
      mouseInZone = false;
      mouseX = -1000;
      mouseY = -1000;
    });

    observationZone.addEventListener('click', (e) => {
      triggerBurst(e.clientX, e.clientY);
    });

    observationZone.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        triggerBurst(touch.clientX, touch.clientY);
      }
    }, { passive: true });
  }

  // Interação no body inteiro (cursor como atrator de luz suave)
  window.addEventListener('pointermove', (e) => {
    if (!mouseInZone) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  }, { passive: true });

  // Criação dos Vaga-Lumes e Esporos de Dossel
  const particleCount = width > 1024 ? 120 : (width > 600 ? 80 : 50);
  const fireflies = [];

  class Firefly {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 0.7 + 0.4;
      this.radius = Math.random() * 2.2 + 1.2;

      // Cores BioKuri: 70% verde esmeralda floresta, 30% âmbar dourado / botânico
      this.isGold = Math.random() < 0.3;
      this.baseAlpha = Math.random() * 0.4 + 0.3;
      this.pulseSpeed = Math.random() * 0.04 + 0.02;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.turnTimer = Math.floor(Math.random() * 80) + 40;
    }

    update() {
      // 1. Reação a shockwaves
      for (let i = 0; i < shockwaves.length; i++) {
        const sw = shockwaves[i];
        const dx = this.x - sw.x;
        const dy = this.y - sw.y;
        const dist = Math.hypot(dx, dy);

        if (dist < sw.radius + 20 && dist > sw.radius - 15) {
          const repel = Math.atan2(dy, dx);
          this.angle = repel + (Math.random() - 0.5) * 0.8;
          this.speed = Math.max(this.speed, 3.2);
          break;
        }
      }

      // 2. Condução suave em direção ao cursor quando dentro da zona de dossel
      if (mouseInZone) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 320 && dist > 40) {
          const steerAngle = Math.atan2(dy, dx);
          let diff = steerAngle - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          this.angle += diff * 0.06;
          this.speed = Math.min(this.speed + 0.05, 2.2);
        }
      } else {
        // Navegação suave e aleatória pela mata
        this.turnTimer--;
        if (this.turnTimer <= 0) {
          this.angle += (Math.random() - 0.5) * 1.2;
          this.turnTimer = Math.floor(Math.random() * 90) + 40;
          this.speed = Math.random() * 0.7 + 0.4;
        }
      }

      // Propulsão
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Desaceleração pós-impulso
      if (this.speed > 1.2) {
        this.speed *= 0.96;
      }

      // Pulsar da luz (bioluminescência)
      this.pulsePhase += this.pulseSpeed;

      // Loop pelas bordas
      if (this.x < -40) this.x = width + 40;
      if (this.x > width + 40) this.x = -40;
      if (this.y < -40) this.y = height + 40;
      if (this.y > height + 40) this.y = -40;
    }

    draw() {
      const glow = Math.sin(this.pulsePhase) * 0.3 + 0.7;
      const alpha = this.baseAlpha * glow;

      const r = this.isGold ? 197 : 78;
      const g = this.isGold ? 160 : 204;
      const b = this.isGold ? 89 : 163;

      // Glow suave externo
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 4.5
      );
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`);
      grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.35})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Ponto de luz central
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    fireflies.push(new Firefly());
  }

  // Loop de renderização 60 FPS
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Atualiza e desenha shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha -= 0.022;

      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(78, 204, 163, ${sw.alpha})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    // Atualiza e desenha vaga-lumes
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update();
      fireflies[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. CONSOLE DE CAMPO CIENTÍFICO (TYPING SEQUENCE)
   ========================================================================== */
function initConsoleTyping() {
  const output = document.getElementById('terminal-output');
  if (!output) return;

  const messages = [
    '> ESTAÇÃO DE SUPERVISÃO AMBIENTAL // MICHELI MAC INTIR (CRBio 135793/01-D)',
    '> OPERAÇÃO ATIVA: Rodovias Federais BR-153 & BR-369 · Caruso / BioKuri',
    '> FRENTES: Liderança de 9 Especialistas & 5 Viaturas · Supressão · Não Conformidades',
    '> LABORATÓRIO BIOKURI: Diagnósticos de Fauna, Ornitologia Costeira & Data Science USP',
    '> STATUS: Resolução rápida de condicionantes e conformidade na prática operacional.'
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let currentP = document.createElement('p');
  output.appendChild(currentP);

  function typeChar() {
    if (lineIdx >= messages.length) {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      output.appendChild(cursor);
      return;
    }

    const currentMsg = messages[lineIdx];
    if (charIdx < currentMsg.length) {
      currentP.textContent += currentMsg.charAt(charIdx);
      charIdx++;
      setTimeout(typeChar, 14);
    } else {
      lineIdx++;
      charIdx = 0;
      if (lineIdx < messages.length) {
        currentP = document.createElement('p');
        output.appendChild(currentP);
        setTimeout(typeChar, 120);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        output.appendChild(cursor);
      }
    }
  }

  setTimeout(typeChar, 350);
}

/* ==========================================================================
   4. NOME INTERATIVO COM MICRO-ANIMAÇÃO & SOM SUTIL
   ========================================================================== */
function initInteractiveName() {
  const chars = document.querySelectorAll('.hop-char');
  chars.forEach((char, index) => {
    char.addEventListener('mouseenter', () => {
      char.style.transform = 'translateY(-8px) scale(1.18)';
      char.style.color = 'var(--bio-gold)';
      playDewDrop(900 + index * 75);
    });

    char.addEventListener('mouseleave', () => {
      char.style.transform = '';
      char.style.color = '';
    });
  });
}

/* ==========================================================================
   5. CONTADORES DE IMPACTO MÉTRICO ANIMADOS
   ========================================================================== */
function initMetricsCounter() {
  const metricItems = document.querySelectorAll('.metric-number');
  if (!metricItems.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricItems.forEach(item => {
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

  metricItems.forEach(item => observer.observe(item));
}

/* ==========================================================================
   6. SCROLL REVEAL (FADE-IN ELEGANTE)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. LIGHTBOX MODAL PARA REGISTROS DE CAMPO
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
    playDewDrop(800);
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

console.log('🌿 Estação BioKuri // Micheli Mac Intir carregada com sucesso.');
