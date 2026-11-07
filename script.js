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

    // Som delicado de asas e ar floral
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

    // Chime cristalino sutil
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
   2. BIO-CANVAS: BORBOLETÁRIO DA MATA ATLÂNTICA (BORBOLETAS REAIS NO FUNDO)
   - Espécies autênticas da Mata Atlântica (Heliconius, Morpho, Parides, Phoebis)
   - Anatomia lepidóptera fidedigna: asas anteriores, posteriores, nervuras,
     margens recortadas, corpo segmentado e antenas com clava apical.
   - Voo biológico real: flutuações, elevação aerodinâmica a cada bater de asas,
     planeios suaves e ausência de aglomeração ("não embalado").
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

  // Janela de observação interativa
  const sanctuaryZone = document.getElementById('butterfly-sanctuary-zone');
  let mouseInSanctuary = false;
  let mouseX = -1000;
  let mouseY = -1000;
  let isTouchInteraction = false;
  let touchResetTimer = null;
  const shockwaves = [];
  const pollens = [];
  const butterflies = [];

  function triggerSanctuaryRipple(x, y) {
    shockwaves.push({
      x: x,
      y: y,
      radius: 4,
      maxRadius: 65,
      speed: 2.8,
      alpha: 0.8
    });

    // Névoa suave de pólen floral
    for (let i = 0; i < 18; i++) {
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
      }, 700);

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

  // Interação no clique geral
  window.addEventListener('pointerdown', (e) => {
    const targetTag = e.target.tagName.toLowerCase();
    if (['button', 'a', 'input', 'textarea'].includes(targetTag)) return;

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
  // CLASSE: PÓLEN FLORAL (POLLEN)
  // ==========================================
  class PollenParticle {
    constructor(x, y, baseColor) {
      this.x = x;
      this.y = y;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 0.8;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.0;

      this.drag = Math.random() * 0.03 + 0.93;
      this.gravity = Math.random() * 0.02 + 0.025;

      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.035 + 0.02;
      this.swayAmp = Math.random() * 1.2 + 0.5;

      this.radius = Math.random() * 2.0 + 1.0;
      const COLORS = ['#C5A059', '#1C5933', '#C47D3B', '#D98236', '#FAF6F0'];
      this.color = baseColor || COLORS[Math.floor(Math.random() * COLORS.length)];

      this.life = Math.random() * 180 + 200;
      this.maxLife = this.life;
    }

    update() {
      this.vx *= this.drag;
      this.vy = this.vy * this.drag + this.gravity;
      this.swayPhase += this.swaySpeed;
      this.x += this.vx + Math.sin(this.swayPhase) * this.swayAmp;
      this.y += this.vy;
      this.life--;
    }

    draw() {
      if (this.life <= 0) return;
      const alpha = this.life > this.maxLife * 0.3
        ? 0.85
        : (this.life / (this.maxLife * 0.3)) * 0.85;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ==========================================
  // PALETAS DE ESPÉCIES REAIS DA MATA ATLÂNTICA
  // ==========================================
  const SPECIES_PALETTES = [
    // 1. Heliconius besckei (Âmbar Terracota, Preto Aveludado e Marfim)
    {
      name: 'Heliconius besckei',
      wingBase: '#C47D3B',
      wingAccent: '#FAF6F0',
      wingBorder: '#1A120A',
      bodyColor: '#1A120A'
    },
    // 2. Morpho helenor (Azul Esmeralda da Mata Atlântica)
    {
      name: 'Morpho helenor',
      wingBase: '#1C5933',
      wingAccent: '#52C284',
      wingBorder: '#0B1D11',
      bodyColor: '#0B1D11'
    },
    // 3. Parides bunichus (Verde Pinheiro BioKuri com Mancha Rubra)
    {
      name: 'Parides bunichus',
      wingBase: '#153D23',
      wingAccent: '#C94A4A',
      wingBorder: '#0C1A11',
      bodyColor: '#0C1A11'
    },
    // 4. Phoebis philea / Anteos (Borboleta-Gema / Marfim & Dourado BioKuri)
    {
      name: 'Phoebis philea',
      wingBase: '#FAF6F0',
      wingAccent: '#C5A059',
      wingBorder: '#383020',
      bodyColor: '#2B2418'
    },
    // 5. Danaus plexippus (Monarca / Laranja Terracota & Borda Negra com Pontos)
    {
      name: 'Danaus',
      wingBase: '#D97E36',
      wingAccent: '#FFFFFF',
      wingBorder: '#1F140A',
      bodyColor: '#1F140A'
    }
  ];

  // ==========================================
  // CLASSE: BORBOLETA REAL (BUTTERFLY)
  // ==========================================
  class Butterfly {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() < 0.5 ? -50 : height + 50);
      this.angle = Math.random() * Math.PI * 2;
      this.targetAngle = this.angle;

      // Velocidade serena, graciosa e natural (NUNCA acelerada ou "embalada")
      this.speed = Math.random() * 0.35 + 0.75; // 0.75 a 1.10 px/frame

      // Escala e camadas de profundidade
      const depth = Math.random();
      this.isDeep = depth < 0.40; // 40% em profundidade suave
      if (this.isDeep) {
        this.size = Math.random() * 2.0 + 9.0;
        this.alpha = Math.random() * 0.12 + 0.35;
      } else {
        this.size = Math.random() * 3.5 + 13.5;
        this.alpha = Math.random() * 0.18 + 0.72;
      }

      this.hitRadius = Math.max(34, this.size * 2.2);
      this.palette = SPECIES_PALETTES[Math.floor(Math.random() * SPECIES_PALETTES.length)];

      // Ciclo biológico de asas: bater e planar
      this.wingPhase = Math.random() * Math.PI * 2;
      this.wingSpeed = Math.random() * 0.05 + 0.18; // Frequência de bater de asas realista
      this.gliding = false;
      this.flapTimer = Math.floor(Math.random() * 50) + 30;
      this.glideTimer = 0;

      // Esvoaçar ondulante e poético
      this.flutterPhase = Math.random() * Math.PI * 2;
      this.flutterSpeed = Math.random() * 0.06 + 0.04;
      this.flutterWiggle = 0;

      this.turnTimer = Math.floor(Math.random() * 90) + 40;
      this.scatterTimer = 0;
      this.alive = true;
      this.respawnTimer = 0;
    }

    explode() {
      if (!this.alive) return;
      this.alive = false;
      this.respawnTimer = Math.floor(Math.random() * 60) + 50;

      const count = Math.floor(Math.random() * 8) + 18;
      for (let i = 0; i < count; i++) {
        pollens.push(new PollenParticle(this.x, this.y, this.palette.wingBase));
      }

      shockwaves.push({
        x: this.x,
        y: this.y,
        radius: 4,
        maxRadius: 50,
        speed: 2.8,
        alpha: 0.8
      });

      playPollenBurstSound();
    }

    update(all) {
      if (!this.alive) {
        this.respawnTimer--;
        if (this.respawnTimer <= 0) {
          this.reset(false);
        }
        return;
      }

      // 1. Reação a shockwaves (dispersão suave)
      for (let s = 0; s < shockwaves.length; s++) {
        const sw = shockwaves[s];
        const dx = this.x - sw.x;
        const dy = this.y - sw.y;
        const dist = Math.hypot(dx, dy);

        if (dist < sw.radius + 30 && dist > sw.radius - 18) {
          const awayAngle = Math.atan2(dy, dx);
          this.angle = awayAngle + (Math.random() - 0.5) * 0.7;
          this.targetAngle = this.angle;
          this.speed = Math.min(1.8, this.speed + 0.6);
          this.scatterTimer = 35;
          this.gliding = false;
          break;
        }
      }

      // 2. Separação suave entre borboletas (impede aglomeração / "embalamento")
      for (let j = 0; j < all.length; j++) {
        const other = all[j];
        if (other === this || !other.alive) continue;
        const sepDx = this.x - other.x;
        const sepDy = this.y - other.y;
        const sepDist = Math.hypot(sepDx, sepDy);
        if (sepDist < 42 && sepDist > 0.1) {
          const push = (42 - sepDist) * 0.012;
          this.x += (sepDx / sepDist) * push;
          this.y += (sepDy / sepDist) * push;
        }
      }

      // 3. Comportamento calmo no Borboletário (SEM correria)
      if (this.scatterTimer > 0) {
        this.scatterTimer--;
        this.speed *= 0.97;
      } else if (mouseInSanctuary && !isTouchInteraction) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);

        // Apenas borboletas já por perto sentem uma atração calma
        if (dist < 220 && dist > 65) {
          const toMouse = Math.atan2(dy, dx);
          let diff = toMouse - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;

          this.angle += diff * 0.022;
          this.speed = Math.max(0.7, Math.min(this.speed, 1.05));
        } else {
          this.naturalFlutter();
        }
      } else {
        this.naturalFlutter();
      }

      // 4. Alternância natural de voo: bater de asas e planar
      if (this.gliding) {
        this.glideTimer--;
        if (this.glideTimer <= 0) {
          this.gliding = false;
          this.flapTimer = Math.floor(Math.random() * 55) + 35;
        }
        this.wingPhase = 0; // Asas abertas no planeio
        this.speed = Math.max(0.65, this.speed * 0.988);
      } else {
        this.wingPhase += this.wingSpeed;
        this.flapTimer--;
        if (this.flapTimer <= 0) {
          this.gliding = true;
          this.glideTimer = Math.floor(Math.random() * 45) + 25;
        }

        // Elevação aerodinâmica a cada batida de asas (ondulação vertical real)
        const lift = Math.abs(Math.sin(this.wingPhase)) * 0.38;
        this.y -= lift * 0.6;
      }

      // Esvoaçar característico da borboleta
      this.flutterWiggle = Math.sin(this.flutterPhase) * 0.16;
      this.flutterPhase += this.flutterSpeed;

      this.x += Math.cos(this.angle + this.flutterWiggle) * this.speed;
      this.y += Math.sin(this.angle + this.flutterWiggle) * this.speed;

      // Bordas
      if (this.x < -80) this.x = width + 80;
      if (this.x > width + 80) this.x = -80;
      if (this.y < -80) this.y = height + 80;
      if (this.y > height + 80) this.y = -80;
    }

    naturalFlutter() {
      this.turnTimer--;
      if (this.turnTimer <= 0) {
        this.targetAngle += (Math.random() - 0.5) * 1.1;
        this.turnTimer = Math.floor(Math.random() * 90) + 40;
        this.speed = Math.random() * 0.35 + 0.75;
      }

      let diff = this.targetAngle - this.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.angle += diff * 0.035;
    }

    draw() {
      if (!this.alive) return;

      const cos = Math.cos(this.angle);
      const sin = Math.sin(this.angle);
      ctx.setTransform(cos, sin, -sin, cos, this.x, this.y);

      // Bater de asas em 3D: a largura lateral contrai suavemente em perspectiva
      const rawFlap = Math.cos(this.wingPhase);
      const flapScale = Math.abs(rawFlap) * 0.82 + 0.18;
      const s = this.size;

      const { wingBase, wingAccent, wingBorder, bodyColor } = this.palette;

      ctx.globalAlpha = this.alpha;

      // ==========================================
      // 1. ANTENAS COM CLAVAS APICAIS (Lepidoptera)
      // ==========================================
      ctx.strokeStyle = bodyColor;
      ctx.lineWidth = Math.max(0.7, s * 0.07);
      ctx.beginPath();
      ctx.moveTo(s * 0.5, -s * 0.08);
      ctx.quadraticCurveTo(s * 1.05, -s * 0.35, s * 1.38, -s * 0.52);
      ctx.moveTo(s * 0.5, s * 0.08);
      ctx.quadraticCurveTo(s * 1.05, s * 0.35, s * 1.38, s * 0.52);
      ctx.stroke();

      // Clavas antenais dilatadas
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.arc(s * 1.4, -s * 0.53, s * 0.11, 0, Math.PI * 2);
      ctx.arc(s * 1.4, s * 0.53, s * 0.11, 0, Math.PI * 2);
      ctx.fill();

      // ==========================================
      // 2. ASAS POSTERIORES (Hindwings) - Leque recortado
      // ==========================================
      [-1, 1].forEach(side => {
        ctx.save();
        const sy = side * flapScale;

        ctx.beginPath();
        ctx.moveTo(-s * 0.1, sy * s * 0.15);
        ctx.bezierCurveTo(-s * 0.2, sy * s * 0.85, -s * 0.65, sy * s * 1.35, -s * 1.1, sy * s * 1.25);
        ctx.bezierCurveTo(-s * 1.45, sy * s * 0.95, -s * 1.35, sy * s * 0.45, -s * 0.95, sy * s * 0.1);
        ctx.closePath();

        ctx.fillStyle = wingBase;
        ctx.fill();

        // Borda aveludada escura
        ctx.strokeStyle = wingBorder;
        ctx.lineWidth = Math.max(0.6, s * 0.1);
        ctx.stroke();

        // Mancha ocelar / detalhe de espécie
        ctx.fillStyle = wingAccent;
        ctx.beginPath();
        ctx.ellipse(-s * 0.75, sy * s * 0.72, s * 0.24, s * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // ==========================================
      // 3. ASAS ANTERIORES (Forewings) - Amplas e aerodinâmicas
      // ==========================================
      [-1, 1].forEach(side => {
        ctx.save();
        const sy = side * flapScale;

        ctx.beginPath();
        ctx.moveTo(s * 0.2, sy * s * 0.15);
        // Borda costal arqueada até o ápice
        ctx.bezierCurveTo(s * 0.5, sy * s * 0.85, s * 0.92, sy * s * 1.6, s * 0.88, sy * s * 2.15);
        // Margem externa até o ângulo anal (tornus)
        ctx.bezierCurveTo(s * 0.45, sy * s * 2.2, -s * 0.22, sy * s * 1.75, -s * 0.38, sy * s * 1.15);
        // Margem interna retornando ao tórax
        ctx.bezierCurveTo(-s * 0.25, sy * s * 0.5, -s * 0.05, sy * s * 0.2, s * 0.2, sy * s * 0.15);
        ctx.closePath();

        ctx.fillStyle = wingBase;
        ctx.fill();

        // Faixa discal / Mancha de espécie
        ctx.fillStyle = wingAccent;
        ctx.beginPath();
        ctx.ellipse(s * 0.35, sy * s * 1.18, s * 0.35, s * 0.55 * Math.abs(rawFlap), side * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Borda externa aveludada
        ctx.strokeStyle = wingBorder;
        ctx.lineWidth = Math.max(0.8, s * 0.12);
        ctx.stroke();

        // Nervuras delicadas da asa (Veins)
        ctx.strokeStyle = wingBorder;
        ctx.lineWidth = Math.max(0.4, s * 0.05);
        ctx.beginPath();
        ctx.moveTo(s * 0.2, sy * s * 0.15);
        ctx.lineTo(s * 0.68, sy * s * 1.85);
        ctx.moveTo(s * 0.2, sy * s * 0.15);
        ctx.lineTo(s * 0.22, sy * s * 1.8);
        ctx.moveTo(s * 0.2, sy * s * 0.15);
        ctx.lineTo(-s * 0.15, sy * s * 1.3);
        ctx.stroke();

        // Pontos marginais brancos característicos
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s * 0.75, sy * s * 2.0, s * 0.065, 0, Math.PI * 2);
        ctx.arc(s * 0.52, sy * s * 1.95, s * 0.065, 0, Math.PI * 2);
        ctx.arc(s * 0.25, sy * s * 1.82, s * 0.065, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // ==========================================
      // 4. CORPO ANATÔMICO (Cabeça, Tórax e Abdômen)
      // ==========================================
      // Tórax
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.ellipse(s * 0.1, 0, s * 0.32, s * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cabeça com olhos compostos
      ctx.beginPath();
      ctx.arc(s * 0.46, 0, s * 0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#080C09';
      ctx.beginPath();
      ctx.arc(s * 0.48, -s * 0.1, s * 0.07, 0, Math.PI * 2);
      ctx.arc(s * 0.48, s * 0.1, s * 0.07, 0, Math.PI * 2);
      ctx.fill();

      // Abdômen segmentado e afilado
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.ellipse(-s * 0.48, 0, s * 0.52, s * 0.13, 0, 0, Math.PI * 2);
      ctx.fill();

      // Linhas finas de segmentação
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.5;
      for (let seg = -s * 0.25; seg > -s * 0.8; seg -= s * 0.14) {
        ctx.beginPath();
        ctx.moveTo(seg, -s * 0.11);
        ctx.lineTo(seg, s * 0.11);
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
    }
  }

  // População harmoniosa e desimpedida (SEM superlotação)
  const butterflyCount = width > 1024 ? 32 : (width > 600 ? 22 : 14);
  for (let i = 0; i < butterflyCount; i++) {
    butterflies.push(new Butterfly(true));
  }

  // ==========================================
  // LOOP DE ANIMAÇÃO A 60 FPS
  // ==========================================
  function animate() {
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);

    // 1. Ondas sutis de choque
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha *= 0.94;

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(28, 89, 51, ${sw.alpha * 0.45})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (sw.radius >= sw.maxRadius || sw.alpha <= 0.02) {
        shockwaves.splice(i, 1);
      }
    }

    // 2. Névoa de pólen floral
    for (let i = pollens.length - 1; i >= 0; i--) {
      pollens[i].update();
      pollens[i].draw();
      if (pollens[i].life <= 0 || pollens[i].y > height + 50) {
        pollens.splice(i, 1);
      }
    }

    // 3. Borboletas em voo biológico real no fundo
    for (let i = 0; i < butterflies.length; i++) {
      butterflies[i].update(butterflies);
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