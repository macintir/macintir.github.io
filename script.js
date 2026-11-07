/**
 * BIOKURI // MICHELI MAC INTIR
 * Portfólio Profissional no Padrão Visual Creme & Verde Pinheiro da BioKuri
 * Scripts de Interatividade Botânica, Bio-Canvas, Áudio Orgânico & Métricas
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioSystem();
  initButterflyCanvas();
  initMetricsCounter();
  initLightbox();
  initSmoothScroll();
});

/* ==========================================================================
   1. SISTEMA DE ÁUDIO ORGÂNICO (SINTETIZADOR WEB AUDIO API)
   Vocalizações e efeitos táteis sintetizados em tempo real via código
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

/**
 * Efeito sonoro orgânico ao interagir com as borboletas:
 * Brisa suave de asas + chime cristalino floral
 */
function playPollenBurstSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Som delicado de asas e ar floral (ruído filtrado suave)
    const bufferSize = Math.floor(ctx.sampleRate * 0.14);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.14);
    filter.Q.value = 3.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    // 2. Chime cristalino sutil
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    const baseFreq = 2400 + Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.45, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.95, now + 0.1);

    oscGain.gain.setValueAtTime(0.018, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

/* ==========================================================================
   2. BIO-CANVAS: BORBOLETÁRIO DA MATA ATLÂNTICA (BORBOLETAS NO FUNDO)
   Similar à Lagoa dos Girinos de Lucas Aøsf:
   - Borboletas nativas voando livremente pelo FUNDO do portfólio
   - Nado/voo esvoaçante ondulante em 3 camadas de profundidade
   - Janela de observação interativa (#butterfly-sanctuary-zone)
   - Ao interagir ou clicar, dispersam ou explodem em névoa floral de pólen
   ========================================================================== */
function initButterflyCanvas() {
  const canvas = document.getElementById('bio-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  function updateCanvasDimensions() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', updateCanvasDimensions);
  window.addEventListener('orientationchange', () => {
    setTimeout(updateCanvasDimensions, 150);
  });

  // Janela dedicada de observação: Borboletário da Mata Atlântica
  const sanctuaryZone = document.getElementById('butterfly-sanctuary-zone');
  let mouseInSanctuary = false;
  let mouseX = -1000;
  let mouseY = -1000;
  let isTouchInteraction = false;
  let touchResetTimer = null;
  const shockwaves = [];
  const pollens = [];
  const butterflies = [];

  function isInsideSanctuary(cx, cy) {
    if (!sanctuaryZone) return false;
    const rect = sanctuaryZone.getBoundingClientRect();
    return cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
  }

  function triggerSanctuaryRipple(x, y) {
    shockwaves.push({
      x: x,
      y: y,
      radius: 5,
      maxRadius: 75,
      speed: 3.5,
      alpha: 0.85
    });

    // Dispersão e explosão de pólen floral
    for (let i = 0; i < 22; i++) {
      pollens.push(new PollenParticle(x, y));
    }

    playPollenBurstSound();
  }

  if (sanctuaryZone) {
    sanctuaryZone.addEventListener('mousemove', (e) => {
      if (isTouchInteraction) return;
      mouseInSanctuary = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    sanctuaryZone.addEventListener('mouseenter', (e) => {
      if (isTouchInteraction) return;
      mouseInSanctuary = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    sanctuaryZone.addEventListener('mouseleave', () => {
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;
    });

    sanctuaryZone.addEventListener('click', (e) => {
      if (isTouchInteraction) return;
      triggerSanctuaryRipple(e.clientX, e.clientY);
    });

    sanctuaryZone.addEventListener('touchstart', (e) => {
      isTouchInteraction = true;
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;

      clearTimeout(touchResetTimer);
      touchResetTimer = setTimeout(() => {
        isTouchInteraction = false;
      }, 800);

      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        triggerSanctuaryRipple(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    sanctuaryZone.addEventListener('touchend', () => {
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;
    }, { passive: true });
  }

  // Permite interação ao clicar no fundo geral
  window.addEventListener('pointerdown', (e) => {
    // Se o clique foi fora de botões/links interativos principais
    const targetTag = e.target.tagName.toLowerCase();
    if (['button', 'a', 'input', 'textarea'].includes(targetTag)) return;

    // Verifica se acertou alguma borboleta próxima
    let hitButterfly = false;
    for (let i = butterflies.length - 1; i >= 0; i--) {
      const b = butterflies[i];
      if (!b.alive) continue;
      const dist = Math.hypot(b.x - e.clientX, b.y - e.clientY);
      if (dist < b.hitRadius) {
        b.explode();
        hitButterfly = true;
        break;
      }
    }

    if (!hitButterfly && !mouseInSanctuary) {
      triggerSanctuaryRipple(e.clientX, e.clientY);
    }
  });

  // ==========================================
  // CLASSE: PARTÍCULA DE PÓLEN FLORAL (POLLEN)
  // ==========================================
  class PollenParticle {
    constructor(x, y, baseColor) {
      this.x = x;
      this.y = y;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.2 + 1.2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.2; // Leve impulso para cima

      this.drag = Math.random() * 0.03 + 0.92;
      this.gravity = Math.random() * 0.025 + 0.03;

      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.04 + 0.02;
      this.swayAmp = Math.random() * 1.4 + 0.6;

      this.radius = Math.random() * 2.4 + 1.2;
      this.isPetal = Math.random() < 0.35; // Algumas são pequenas pétalas/escamas

      const POLLEN_COLORS = [
        '#C5A059', '#1C5933', '#C47D3B', '#D99B26', '#EAD8C3', '#2A7244'
      ];
      this.color = baseColor || POLLEN_COLORS[Math.floor(Math.random() * POLLEN_COLORS.length)];

      this.life = Math.random() * 220 + 260;
      this.maxLife = this.life;
    }

    update() {
      this.vx *= this.drag;
      this.vy = this.vy * this.drag + this.gravity;

      this.swayPhase += this.swaySpeed;
      const swayX = Math.sin(this.swayPhase) * this.swayAmp;

      this.x += this.vx + swayX;
      this.y += this.vy;

      this.life--;
    }

    draw() {
      if (this.life <= 0) return;
      const alpha = this.life > this.maxLife * 0.35
        ? 0.85
        : (this.life / (this.maxLife * 0.35)) * 0.85;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = this.color;

      if (this.isPetal) {
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius * 2, this.radius, this.swayPhase, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // ==========================================
  // CLASSE: BORBOLETA DA MATA ATLÂNTICA (BUTTERFLY)
  // ==========================================
  class Butterfly {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() < 0.5 ? -40 : height + 40);
      this.angle = Math.random() * Math.PI * 2;
      this.targetAngle = this.angle;
      this.speed = Math.random() * 1.1 + 0.8;

      // Profundidade (Depth Layers): similar aos girinos do Lucas
      const depth = Math.random();
      this.isDeep = depth < 0.45; // 45% fundo suave para profundidade
      if (this.isDeep) {
        this.size = Math.random() * 2.2 + 4.2;
        this.alpha = Math.random() * 0.15 + 0.18;
      } else if (depth < 0.85) {
        this.size = Math.random() * 3.2 + 7.2;
        this.alpha = Math.random() * 0.22 + 0.38;
      } else {
        this.size = Math.random() * 4.2 + 11.2;
        this.alpha = Math.random() * 0.25 + 0.65;
      }

      this.hitRadius = Math.max(38, this.size * 3.5);

      // Paletas nativas da Mata Atlântica e BioKuri
      const PALETTES = [
        { wing: '#1C5933', accent: '#C5A059', body: '#14291B' }, // Parides Verde Pinheiro & Ouro
        { wing: '#C47D3B', accent: '#FAF6F0', body: '#2A1808' }, // Heliconius Âmbar & Marfim
        { wing: '#2A7244', accent: '#72C28D', body: '#0E2515' }, // Esmeralda da Mata
        { wing: '#C5A059', accent: '#1C5933', body: '#261E0A' }, // Dourada BioKuri
        { wing: '#D98236', accent: '#FFFFFF', body: '#331B05' }, // Monarca Laranja
        { wing: '#8C6338', accent: '#C5A059', body: '#24190D' }  // Caligo Marrom Florestal
      ];
      this.palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];

      // Cores pré-computadas para zero alocação de memória no loop a 60 FPS
      const aStr = this.alpha.toFixed(2);
      const aAccentStr = Math.min(1, this.alpha * 1.3).toFixed(2);
      this.wingColor = this.hexToRgba(this.palette.wing, aStr);
      this.accentColor = this.hexToRgba(this.palette.accent, aAccentStr);
      this.bodyColor = this.hexToRgba(this.palette.body, aStr);

      // Bater de asas em 3D
      this.wingPhase = Math.random() * Math.PI * 2;
      this.wingSpeed = Math.random() * 0.16 + 0.24;

      // Voo ondulante esvoaçante típico de borboletas
      this.flutterPhase = Math.random() * Math.PI * 2;
      this.flutterSpeed = Math.random() * 0.08 + 0.06;

      this.turnTimer = Math.floor(Math.random() * 80) + 40;
      this.scatterTimer = 0;
      this.alive = true;
      this.respawnTimer = 0;
    }

    hexToRgba(hex, alpha) {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      const r = parseInt(c.substring(0, 2), 16);
      const g = parseInt(c.substring(2, 4), 16);
      const b = parseInt(c.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    explode() {
      if (!this.alive) return;
      this.alive = false;
      this.respawnTimer = Math.floor(Math.random() * 60 + 50);

      // Explosão de pólen floral
      const count = Math.floor(Math.random() * 8 + 22);
      for (let i = 0; i < count; i++) {
        pollens.push(new PollenParticle(this.x, this.y, this.palette.wing));
      }

      shockwaves.push({
        x: this.x,
        y: this.y,
        radius: 4,
        maxRadius: 55,
        speed: 3.2,
        alpha: 0.85
      });

      playPollenBurstSound();
    }

    update() {
      if (!this.alive) {
        this.respawnTimer--;
        if (this.respawnTimer <= 0) {
          this.reset(false);
        }
        return;
      }

      // 1. Reação a ondas de choque (dispersão localizada)
      for (let s = 0; s < shockwaves.length; s++) {
        const sw = shockwaves[s];
        const dx = this.x - sw.x;
        const dy = this.y - sw.y;
        const dist = Math.hypot(dx, dy);

        if (dist < sw.radius + 20 && dist > sw.radius - 16) {
          const awayAngle = Math.atan2(dy, dx);
          this.angle = awayAngle + (Math.random() - 0.5) * 1.5;
          this.targetAngle = this.angle + (Math.random() - 0.5) * 1.0;
          this.speed = Math.max(this.speed, 2.6 + Math.random() * 0.8);
          this.scatterTimer = Math.floor(Math.random() * 80) + 50;
          break;
        }
      }

      // 2. Comportamento durante dispersão ou atração no Borboletário
      if (this.scatterTimer > 0) {
        this.scatterTimer--;
        this.angle += (Math.random() - 0.5) * 0.08;
      } else if (mouseInSanctuary && !isTouchInteraction) {
        // Atração suave e orgânica em direção ao cursor no Borboletário
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 400 && dist > 45) {
          const toMouse = Math.atan2(dy, dx);
          let diff = toMouse - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;

          const steer = Math.max(0.035, 0.11 * (1 - dist / 400));
          this.angle += diff * steer;
          this.speed = Math.min(this.speed + 0.05, 2.2);
        } else {
          this.naturalSteer();
        }
      } else {
        this.naturalSteer();
      }

      // 3. Voo esvoaçante de borboleta (ondulação suave + bater de asas)
      this.flutterPhase += this.flutterSpeed;
      const flutterWiggle = Math.sin(this.flutterPhase) * 0.28;

      this.x += Math.cos(this.angle + flutterWiggle) * this.speed;
      this.y += Math.sin(this.angle + flutterWiggle) * this.speed;
      this.wingPhase += this.wingSpeed * (this.speed * 0.95);

      // Desaceleração suave
      if (this.speed > 1.5) {
        this.speed *= 0.95;
      }

      // Retorno infinito e contínuo pelas bordas
      if (this.x < -60) this.x = width + 60;
      if (this.x > width + 60) this.x = -60;
      if (this.y < -60) this.y = height + 60;
      if (this.y > height + 60) this.y = -60;
    }

    naturalSteer() {
      this.turnTimer--;
      if (this.turnTimer <= 0) {
        this.targetAngle += (Math.random() - 0.5) * 1.5;
        this.turnTimer = Math.floor(Math.random() * 100) + 40;
        this.speed = Math.random() * 1.1 + 0.8;
      }

      let diff = this.targetAngle - this.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.angle += diff * 0.045;
    }

    draw() {
      if (!this.alive) return;

      const cos = Math.cos(this.angle);
      const sin = Math.sin(this.angle);

      // Transformação de matriz ultrarrápida (sem criar objetos ou lixo para GC)
      ctx.setTransform(cos, sin, -sin, cos, this.x, this.y);

      // Bater de asas em 3D: a largura aparente oscila com o cosseno
      const flap = Math.cos(this.wingPhase);
      const wingScaleX = Math.abs(flap) * 0.88 + 0.12;
      const s = this.size;

      if (this.isDeep) {
        // Borboleta do plano profundo: renderização minimalista e translúcida
        ctx.fillStyle = this.wingColor;
        ctx.beginPath();
        // Asa esquerda
        ctx.ellipse(-s * 0.9 * wingScaleX, -s * 0.6, s * 1.1 * wingScaleX, s * 0.75, -0.4, 0, Math.PI * 2);
        // Asa direita
        ctx.ellipse(-s * 0.9 * wingScaleX, s * 0.6, s * 1.1 * wingScaleX, s * 0.75, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Corpo
        ctx.fillStyle = this.bodyColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.7, s * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      // Borboleta detalhada (meio-campo e primeiro plano)
      // 1. ASAS ANTERIORES (Forewings)
      ctx.fillStyle = this.wingColor;

      // Asa anterior esquerda
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s * 0.6 * wingScaleX, -s * 1.4, -s * 1.8 * wingScaleX, -s * 1.8, -s * 2.2 * wingScaleX, -s * 1.0);
      ctx.bezierCurveTo(-s * 2.4 * wingScaleX, -s * 0.4, -s * 1.2 * wingScaleX, -s * 0.2, 0, 0);
      ctx.fill();

      // Asa anterior direita
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s * 0.6 * wingScaleX, s * 1.4, -s * 1.8 * wingScaleX, s * 1.8, -s * 2.2 * wingScaleX, s * 1.0);
      ctx.bezierCurveTo(-s * 2.4 * wingScaleX, s * 0.4, -s * 1.2 * wingScaleX, s * 0.2, 0, 0);
      ctx.fill();

      // 2. ASAS POSTERIORES (Hindwings)
      ctx.beginPath();
      ctx.moveTo(-s * 0.3, 0);
      ctx.bezierCurveTo(-s * 1.4 * wingScaleX, -s * 0.9, -s * 1.8 * wingScaleX, -s * 0.2, -s * 1.3 * wingScaleX, 0);
      ctx.bezierCurveTo(-s * 1.8 * wingScaleX, s * 0.2, -s * 1.4 * wingScaleX, s * 0.9, -s * 0.3, 0);
      ctx.fill();

      // 3. DETALHES DE MANCHAS NAS ASAS (Accent Spots)
      ctx.fillStyle = this.accentColor;
      ctx.beginPath();
      ctx.arc(-s * 1.3 * wingScaleX, -s * 0.9, s * 0.28, 0, Math.PI * 2);
      ctx.arc(-s * 1.3 * wingScaleX, s * 0.9, s * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // 4. CORPO (Tórax e Abdômen)
      ctx.fillStyle = this.bodyColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.85, s * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();

      // 5. ANTENAS DELICADAS
      ctx.strokeStyle = this.bodyColor;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(s * 0.7, -s * 0.08);
      ctx.quadraticCurveTo(s * 1.2, -s * 0.35, s * 1.4, -s * 0.45);
      ctx.moveTo(s * 0.7, s * 0.08);
      ctx.quadraticCurveTo(s * 1.2, s * 0.35, s * 1.4, s * 0.45);
      ctx.stroke();

      // Clava da antena
      ctx.beginPath();
      ctx.arc(s * 1.4, -s * 0.45, s * 0.1, 0, Math.PI * 2);
      ctx.arc(s * 1.4, s * 0.45, s * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // População rica em 3 camadas de profundidade
  const butterflyCount = width > 1024 ? 150 : (width > 600 ? 100 : 65);
  for (let i = 0; i < butterflyCount; i++) {
    butterflies.push(new Butterfly(true));
  }

  // ==========================================
  // LOOP DE ANIMAÇÃO A 60 FPS
  // ==========================================
  function animate() {
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);

    // 1. Ondas de choque da água/ar (shockwaves)
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha *= 0.93;

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(28, 89, 51, ${sw.alpha * 0.55})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      if (sw.radius >= sw.maxRadius || sw.alpha <= 0.02) {
        shockwaves.splice(i, 1);
      }
    }

    // 2. Partículas de pólen e pétalas flutuantes
    for (let i = pollens.length - 1; i >= 0; i--) {
      pollens[i].update();
      pollens[i].draw();
      if (pollens[i].life <= 0 || pollens[i].y > height + 50) {
        pollens.splice(i, 1);
      }
    }

    // 3. Borboletas em voo livre no fundo
    for (let i = 0; i < butterflies.length; i++) {
      butterflies[i].update();
      butterflies[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
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
