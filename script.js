/**
 * BIOKURI // MICHELI MAC INTIR
 * Portfólio Profissional no Padrão Visual Creme & Verde Pinheiro da BioKuri
 * Scripts de Interatividade Botânica, Bio-Canvas, Áudio Orgânico & Métricas
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioSystem();
  initAvianInteractiveCanvas();
  initMetricsCounter();
  initLightbox();
  initSmoothScroll();
});

/* ==========================================================================
   1. SISTEMA DE ÁUDIO ORGÂNICO (SINTETIZADOR WEB AUDIO API)
   Vocalizações de aves e efeitos táteis sintetizados em tempo real via código
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
 * Efeito sonoro orgânico ao explodir uma ave em penas:
 * Ruído de asas/penas rascunhando o ar + chirp melódico suave
 */
function playFeatherBurstSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Som de farfalhar de penas e asas (ruído filtrado suave)
    const bufferSize = Math.floor(ctx.sampleRate * 0.15);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.15);
    filter.Q.value = 2.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    // 2. Nota cantada curta e cristalina
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    const baseFreq = 2100 + Math.random() * 500;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.11);

    oscGain.gain.setValueAtTime(0.02, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  } catch (e) {}
}

/* ==========================================================================
   2. AVIAN INTERACTIVE CANVAS (PÁSSAROS EM VOO LIVRE & EXPLOSÃO DE PENAS)
   - Bandos de aves voando suavemente pelo horizonte em tons BioKuri
   - Ao clicar em qualquer ave, ela se dispersa em uma explosão realista de penas
   - As penas flutuam e dançam no ar com física orgânica (gravidade, balanço e giro 3D)
   ========================================================================== */
function initAvianInteractiveCanvas() {
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
  let isHoveringBird = false;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Paleta BioKuri para as aves
  const BIRD_PALETTE = [
    { fill: '#1C5933', dark: '#144024', name: 'Pinheiro' },
    { fill: '#C47D3B', dark: '#965C26', name: 'Âmbar' },
    { fill: '#14291B', dark: '#0C1A11', name: 'Musgo Escuro' },
    { fill: '#2A7244', dark: '#1F5633', name: 'Esmeralda' },
    { fill: '#C5A059', dark: '#96783A', name: 'Ouro BioKuri' }
  ];

  // Penas e anéis de choque
  const feathers = [];
  const rings = [];
  const spores = [];
  const birds = [];

  // ==========================================
  // CLASSE: PENA FLUTUANTE (FEATHER)
  // ==========================================
  class Feather {
    constructor(x, y, baseColor) {
      this.x = x;
      this.y = y;

      // Dispersão explosiva em 360° com leve impulso para cima
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.5 + 1.8;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.6;

      // Arrasto do ar e gravidade suave
      this.drag = Math.random() * 0.03 + 0.92;
      this.gravity = Math.random() * 0.03 + 0.035;

      // Oscilação pendular (sway da pena caindo)
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.045 + 0.025;
      this.swayAmp = Math.random() * 1.5 + 0.8;

      // Rotação 2D e giro 3D (flip no ar)
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.flipPhase = Math.random() * Math.PI * 2;
      this.flipSpeed = Math.random() * 0.05 + 0.02;

      // Dimensões
      this.length = Math.random() * 16 + 14;
      this.width = Math.random() * 6.5 + 4.5;

      // Cores naturais de plumagem
      const PLUMAGE_COLORS = [
        '#1C5933', '#287A46', '#C47D3B', '#D99B26', '#EAD8C3', '#FFFFFF', '#6C4A28'
      ];
      this.color = baseColor || PLUMAGE_COLORS[Math.floor(Math.random() * PLUMAGE_COLORS.length)];

      // Tempo de vida longo para flutuarem suavemente pela tela
      this.life = Math.random() * 320 + 380;
      this.maxLife = this.life;
    }

    update() {
      this.vx *= this.drag;
      this.vy = this.vy * this.drag + this.gravity;

      this.swayPhase += this.swaySpeed;
      const swayX = Math.sin(this.swayPhase) * this.swayAmp;

      this.x += this.vx + swayX;
      this.y += this.vy;

      this.rot += this.rotSpeed;
      this.flipPhase += this.flipSpeed;

      this.life--;
    }

    draw() {
      if (this.life <= 0) return;

      const alpha = this.life > this.maxLife * 0.3
        ? 0.92
        : (this.life / (this.maxLife * 0.3)) * 0.92;

      const flip = Math.cos(this.flipPhase);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.scale(flip, 1);
      ctx.globalAlpha = Math.max(0, alpha);

      const l = this.length;
      const w = this.width;

      // Raque central (eixo da pena)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -l * 0.5);
      ctx.quadraticCurveTo(1.5, 0, 0, l * 0.52);
      ctx.stroke();

      // Vexilo / Barbas da pena (formato clássico aerodinâmico)
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -l * 0.5);
      ctx.bezierCurveTo(-w * 1.1, -l * 0.22, -w * 1.25, l * 0.15, -w * 0.3, l * 0.42);
      ctx.lineTo(0, l * 0.48);
      ctx.bezierCurveTo(w * 0.3, l * 0.42, w * 1.1, l * 0.15, w * 0.9, -l * 0.22);
      ctx.closePath();
      ctx.fill();

      // Ranhuras delicadas das barbas
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 0.5;
      for (let o = -l * 0.3; o < l * 0.32; o += 3.8) {
        ctx.beginPath();
        ctx.moveTo(0, o);
        ctx.lineTo(-w * 0.65, o - 2.2);
        ctx.moveTo(0, o);
        ctx.lineTo(w * 0.55, o - 2.2);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  // ==========================================
  // CLASSE: ANEL DE ONDA / SHOCKWAVE (PUFF RING)
  // ==========================================
  class PuffRing {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.radius = 6;
      this.maxRadius = 60;
      this.color = color || '#C5A059';
      this.alpha = 0.85;
    }

    update() {
      this.radius += 3.2;
      this.alpha *= 0.88;
    }

    draw() {
      if (this.alpha <= 0.02) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = this.alpha;
      ctx.stroke();
      ctx.restore();
    }
  }

  // ==========================================
  // CLASSE: PÁSSARO EM VOO (BIRD)
  // ==========================================
  class Bird {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      const palette = BIRD_PALETTE[Math.floor(Math.random() * BIRD_PALETTE.length)];
      this.color = palette.fill;
      this.darkerColor = palette.dark;

      // Direção do voo (esquerda->direita ou direita->esquerda)
      this.direction = Math.random() < 0.65 ? 1 : -1;
      this.speed = Math.random() * 1.5 + 1.8;
      this.scale = Math.random() * 0.5 + 0.65; // Variação de escala e profundidade
      this.hitRadius = Math.max(48, 42 * this.scale);

      if (initial) {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.75) + 40;
      } else {
        this.x = this.direction > 0 ? -60 : width + 60;
        this.y = Math.random() * (height * 0.75) + 40;
      }

      this.vx = this.direction * this.speed;
      this.vy = 0;

      // Ondulação suave de altitude
      this.wavePhase = Math.random() * Math.PI * 2;
      this.waveSpeed = Math.random() * 0.02 + 0.015;
      this.waveAmp = Math.random() * 0.6 + 0.3;

      // Ciclo de bater de asas e planar (glide)
      this.flapPhase = Math.random() * Math.PI * 2;
      this.flapSpeed = Math.random() * 0.06 + 0.18;
      this.isGliding = false;
      this.flapTimer = Math.floor(Math.random() * 90 + 70);
      this.glideTimer = 0;

      this.hovered = false;
      this.alive = true;
      this.respawnTimer = 0;
    }

    explode() {
      if (!this.alive) return;
      this.alive = false;
      this.respawnTimer = Math.floor(Math.random() * 60 + 50); // Renasce após ~1.5s

      // Cria anel de dispersão
      rings.push(new PuffRing(this.x, this.y, this.color));

      // Dispersa entre 26 e 34 penas ricas no ar
      const featherCount = Math.floor(Math.random() * 9 + 26);
      for (let i = 0; i < featherCount; i++) {
        feathers.push(new Feather(this.x, this.y, this.color));
      }

      // Efeito sonoro táteis orgânicos
      playFeatherBurstSound();
    }

    update() {
      if (!this.alive) {
        this.respawnTimer--;
        if (this.respawnTimer <= 0) {
          this.reset(false);
        }
        return;
      }

      // Movimento de voo
      this.x += this.vx;
      this.wavePhase += this.waveSpeed;
      this.y += Math.sin(this.wavePhase) * this.waveAmp;

      // Alternância entre bater asas e planar
      if (this.isGliding) {
        this.glideTimer--;
        if (this.glideTimer <= 0) {
          this.isGliding = false;
          this.flapTimer = Math.floor(Math.random() * 90 + 80);
        }
      } else {
        this.flapPhase += this.flapSpeed;
        this.flapTimer--;
        if (this.flapTimer <= 0) {
          this.isGliding = true;
          this.glideTimer = Math.floor(Math.random() * 70 + 60);
        }
      }

      // Proximidade do cursor (reação interativa sutil)
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.hypot(dx, dy);

      this.hovered = dist < this.hitRadius;

      if (dist < 80 && dist > 10) {
        // Leve desvio natural de rota
        const angle = Math.atan2(dy, dx);
        this.y += Math.sin(angle) * 0.8;
      }

      // Renasce pelas bordas
      if (this.direction > 0 && this.x > width + 80) {
        this.reset(false);
      } else if (this.direction < 0 && this.x < -80) {
        this.reset(false);
      }
    }

    draw() {
      if (!this.alive) return;

      ctx.save();
      ctx.translate(this.x, this.y);

      // Orientação conforme a direção do voo
      ctx.scale(this.direction * this.scale, this.scale);

      // Inclinação suave conforme a subida/descida
      const bank = Math.sin(this.wavePhase) * 0.12;
      ctx.rotate(bank);

      // Bater de asas: oscila de -1 (asas para cima) a 1 (asas para baixo)
      const flap = this.isGliding ? -0.22 : Math.sin(this.flapPhase);

      const fill = this.color;
      ctx.fillStyle = fill;
      ctx.strokeStyle = fill;
      ctx.lineWidth = 1;

      // 1. CAUDA (aberta e aerodinâmica)
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-24, -5 + flap * 2);
      ctx.lineTo(-27, 0);
      ctx.lineTo(-24, 5 - flap * 2);
      ctx.closePath();
      ctx.fill();

      // 2. ASA DISTANTE (ligeiramente mais escura para dar volume 3D)
      ctx.save();
      ctx.fillStyle = this.darkerColor;
      ctx.beginPath();
      ctx.moveTo(-2, -2);
      const farJointY = -12 * flap - 3;
      const farTipX = -8 + flap * 3;
      const farTipY = -26 * flap - 6;
      ctx.quadraticCurveTo(-4, farJointY, farTipX, farTipY);
      ctx.quadraticCurveTo(4, farJointY + 5, 4, -1);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 3. CORPO & CABEÇA
      ctx.beginPath();
      ctx.moveTo(18, 0); // Ponta do bico
      ctx.quadraticCurveTo(12, -4.5, 4, -4);
      ctx.quadraticCurveTo(-6, -3, -11, 0);
      ctx.quadraticCurveTo(-5, 4.5, 6, 4);
      ctx.quadraticCurveTo(13, 2, 18, 0);
      ctx.closePath();
      ctx.fill();

      // 4. BICO EM TOM ÂMBAR
      ctx.fillStyle = '#D99B26';
      ctx.beginPath();
      ctx.moveTo(16, -1);
      ctx.lineTo(21, 0.5);
      ctx.lineTo(16, 1.8);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = fill;

      // 5. ASA PRÓXIMA (asa principal em movimento amplo)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const nearJointY = 14 * flap + 4;
      const nearTipX = -10 + flap * 4;
      const nearTipY = 30 * flap + 8;
      ctx.quadraticCurveTo(-2, nearJointY, nearTipX, nearTipY);
      ctx.quadraticCurveTo(6, nearJointY - 3, 7, 1);
      ctx.closePath();
      ctx.fill();

      // 6. DETALHE DO OLHO
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(12, -1, 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Auréola sutil ao aproximar o mouse (avisa que é clicável)
      if (this.hovered) {
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();
    }
  }

  // ==========================================
  // CLASSE: ESPORO BOTÂNICO DE PROFUNDIDADE
  // ==========================================
  class AmbientSpore {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 15;
      this.speed = Math.random() * 0.35 + 0.15;
      this.radius = Math.random() * 1.8 + 1.0;
      this.alpha = Math.random() * 0.15 + 0.08;
      this.isGold = Math.random() < 0.35;
      this.drift = (Math.random() - 0.5) * 0.3;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speed;
      this.x += Math.sin(this.angle) * 0.4 + this.drift;
      this.angle += 0.015;

      if (this.y < -20) this.reset(false);
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
    }

    draw() {
      const r = this.isGold ? 196 : 28;
      const g = this.isGold ? 125 : 89;
      const b = this.isGold ? 59 : 51;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Inicialização do Bando e do Ambiente
  const birdCount = width > 1024 ? 14 : (width > 600 ? 9 : 7);
  for (let i = 0; i < birdCount; i++) {
    birds.push(new Bird(true));
  }

  const sporeCount = width > 1024 ? 30 : 18;
  for (let i = 0; i < sporeCount; i++) {
    spores.push(new AmbientSpore());
  }

  // ==========================================
  // EVENTOS DE INTERAÇÃO (CLIQUE / TOQUE)
  // ==========================================
  function handleInteraction(clientX, clientY) {
    let hitAny = false;

    // Checa se acertou alguma ave
    for (let i = birds.length - 1; i >= 0; i--) {
      const b = birds[i];
      if (!b.alive) continue;

      const dist = Math.hypot(b.x - clientX, b.y - clientY);
      if (dist < b.hitRadius) {
        b.explode();
        hitAny = true;
        break; // Explode uma ave por clique
      }
    }

    // Se clicou no fundo livre sem ave próxima:
    // Solta uma rajada suave de 3 a 5 penas flutuantes pelo vento
    if (!hitAny) {
      rings.push(new PuffRing(clientX, clientY, '#C47D3B'));
      const count = Math.floor(Math.random() * 3 + 3);
      for (let i = 0; i < count; i++) {
        feathers.push(new Feather(clientX, clientY));
      }
      playSoftChirp(1400);
    }
  }

  window.addEventListener('pointerdown', (e) => {
    // Permite que cliques em botões e links funcionem normalmente,
    // mas também detecta a interação das aves em toda a janela
    handleInteraction(e.clientX, e.clientY);
  });

  // Conexão do pill de dica interativa no Hero
  const hintPill = document.getElementById('bird-hint-pill');
  if (hintPill) {
    hintPill.addEventListener('click', (e) => {
      e.stopPropagation();
      // Encontra a ave mais próxima do centro da tela e explode com festa
      const target = birds.find(b => b.alive) || birds[0];
      if (target) {
        target.explode();
      }
    });
  }

  // ==========================================
  // LOOP DE RENDERIZAÇÃO A 60 FPS
  // ==========================================
  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Esporos sutis em segundo plano
    for (let i = 0; i < spores.length; i++) {
      spores[i].update();
      spores[i].draw();
    }

    // 2. Anéis de choque das explosões
    for (let i = rings.length - 1; i >= 0; i--) {
      rings[i].update();
      rings[i].draw();
      if (rings[i].alpha <= 0.02) {
        rings.splice(i, 1);
      }
    }

    // 3. Pássaros voando pelo céu
    isHoveringBird = false;
    for (let i = 0; i < birds.length; i++) {
      birds[i].update();
      birds[i].draw();
      if (birds[i].hovered) isHoveringBird = true;
    }

    // 4. Penas flutuantes e dançantes no ar
    for (let i = feathers.length - 1; i >= 0; i--) {
      feathers[i].update();
      feathers[i].draw();
      if (feathers[i].life <= 0 || feathers[i].y > height + 80) {
        feathers.splice(i, 1);
      }
    }

    // Feedback visual do cursor
    if (isHoveringBird) {
      document.body.style.cursor = 'crosshair';
    } else if (document.body.style.cursor === 'crosshair') {
      document.body.style.cursor = '';
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
