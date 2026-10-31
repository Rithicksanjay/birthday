/**
 * A LITTLE WORLD MADE JUST FOR SOWMIYA ❤️
 * Core Interaction, Ambient Canvas, Audio, & Motion Engine
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. STATE & REFERENCES
  // =========================================================================
  const state = {
    entered: false,
    isPlayingMusic: false,
    candlesLit: true,
    letterOpened: false,
    giftOpened: false,
    activeSection: 'entrance'
  };

  // DOM Elements
  const body = document.body;
  const entranceSection = document.getElementById('entrance');
  const enterBtn = document.getElementById('enter-btn');
  const previewZeroBtn = document.getElementById('preview-zero-btn');
  const grandEnterBtn = document.getElementById('grand-enter-btn');
  const grandWelcomingOverlay = document.getElementById('grand-welcoming-overlay');
  const autoEnterCounter = document.getElementById('auto-enter-counter');
  const lockStatusText = document.getElementById('lock-status-text');
  const frontDays = document.getElementById('front-days');
  const frontHours = document.getElementById('front-hours');
  const frontMinutes = document.getElementById('front-minutes');
  const frontSeconds = document.getElementById('front-seconds');
  const journeyContent = document.getElementById('journey-content');
  const journeyNav = document.getElementById('journey-nav');
  const progressBar = document.getElementById('progress-bar');
  const navDots = document.querySelectorAll('.nav-dot');

  // Audio Elements
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicLabel = document.getElementById('music-label');
  const musicStatus = document.getElementById('music-status');
  const bgMusic = document.getElementById('bg-music');

  // Cake Elements
  const makeWishBtn = document.getElementById('make-wish-btn');
  const wishOutcome = document.getElementById('wish-outcome');
  const candleFlames = document.querySelectorAll('.flame');

  // Gallery & Lightbox Elements
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  // Reasons Elements
  const reasonCards = document.querySelectorAll('.reason-card');

  // Love Letter Elements
  const loveEnvelope = document.getElementById('love-envelope');
  const waxSeal = document.getElementById('wax-seal');
  const openLetterBtn = document.getElementById('open-letter-btn');
  const reopenLetterBtn = document.getElementById('reopen-letter-btn');

  // Gift Elements
  const giftBox = document.getElementById('gift-box');
  const openGiftBtn = document.getElementById('open-gift-btn');
  const giftRevealContent = document.getElementById('gift-reveal-content');

  // Hug Modal Elements
  const hugBtn = document.getElementById('hug-btn');
  const hugModal = document.getElementById('hug-modal');
  const hugModalClose = document.getElementById('hug-modal-close');
  const hugAgainBtn = document.getElementById('hug-again-btn');

  // Canvas contexts
  const ambientCanvas = document.getElementById('ambient-canvas');
  const ambientCtx = ambientCanvas.getContext('2d');
  const effectsCanvas = document.getElementById('effects-canvas');
  const effectsCtx = effectsCanvas.getContext('2d');

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // =========================================================================
  // 2. AMBIENT PARTICLES (Golden Dust, Petals, Stars & Butterflies)
  // =========================================================================
  const ambientParticles = [];
  const MAX_PARTICLES = windowWidth < 768 ? 40 : 75;

  class AmbientParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * windowWidth;
      this.y = initial ? Math.random() * windowHeight : -20;
      this.type = Math.random() < 0.25 ? 'petal' : (Math.random() < 0.1 ? 'star' : 'dust');
      this.size = this.type === 'petal' ? Math.random() * 8 + 6 : (this.type === 'star' ? Math.random() * 4 + 2 : Math.random() * 3 + 1);
      this.speedY = this.type === 'petal' ? Math.random() * 0.7 + 0.3 : Math.random() * 0.4 + 0.1;
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.5 + this.speedX;
      this.rotation += this.rotationSpeed;
      this.opacity += Math.sin(Date.now() * this.pulseSpeed * 0.001) * 0.005;

      if (this.y > windowHeight + 20 || this.x < -30 || this.x > windowWidth + 30) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = Math.max(0.1, Math.min(0.85, this.opacity));

      if (this.type === 'petal') {
        // Soft golden/ivory flower petal
        ctx.fillStyle = '#E8D6A5';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'star') {
        // Sparkling four-point star
        ctx.fillStyle = '#FFFDF8';
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
          ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.3));
        }
        ctx.closePath();
        ctx.fill();
      } else {
        // Soft glowing gold dust
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, '#FFF7DC');
        gradient.addColorStop(0.5, '#D4AF37');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function initAmbientCanvas() {
    ambientCanvas.width = windowWidth;
    ambientCanvas.height = windowHeight;
    effectsCanvas.width = windowWidth;
    effectsCanvas.height = windowHeight;

    ambientParticles.length = 0;
    for (let i = 0; i < MAX_PARTICLES; i++) {
      ambientParticles.push(new AmbientParticle());
    }
  }

  function renderAmbient() {
    ambientCtx.clearRect(0, 0, windowWidth, windowHeight);
    for (let i = 0; i < ambientParticles.length; i++) {
      ambientParticles[i].update();
      ambientParticles[i].draw(ambientCtx);
    }
    requestAnimationFrame(renderAmbient);
  }

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    ambientCanvas.width = windowWidth;
    ambientCanvas.height = windowHeight;
    effectsCanvas.width = windowWidth;
    effectsCanvas.height = windowHeight;
  });

  // =========================================================================
  // 3. EFFECTS CANVAS (Confetti, Fireworks/Crackers, Flowers, Floating Hearts)
  // =========================================================================
  const effectsParticles = [];

  class EffectParticle {
    constructor(x, y, type = 'confetti') {
      this.x = x;
      this.y = y;
      this.type = type;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.2;
      this.life = 1;

      if (type === 'firework' || type === 'cracker') {
        // High-energy radial explosion in 360 degrees
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.09;
        this.friction = 0.96;
        this.decay = Math.random() * 0.018 + 0.012;
        this.size = Math.random() * 6 + 3;
        const crackerColors = ['#D4AF37', '#FFFDF8', '#FF2A6D', '#FFD700', '#FF7597', '#FFA07A', '#05D9E8', '#FFE494', '#FF4365', '#FFFFFF'];
        this.color = crackerColors[Math.floor(Math.random() * crackerColors.length)];
      } else if (type === 'flower_petal') {
        // Soft fluttering velvety petals
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 2 + 1.2;
        this.gravity = 0.015;
        this.friction = 0.99;
        this.decay = 0.0035; // Floats for a long time
        this.size = Math.random() * 12 + 8;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.04 + 0.02;
        const petalColors = ['#C41E3A', '#D90429', '#E63946', '#FF4D6D', '#FF758F', '#D4AF37', '#FFF0F5'];
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      } else if (type === 'heart') {
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = -(Math.random() * 4 + 2);
        this.gravity = -0.05;
        this.friction = 0.96;
        this.decay = Math.random() * 0.015 + 0.01;
        this.size = Math.random() * 14 + 10;
        const palette = ['#D4AF37', '#FFFDF8', '#E8D6A5', '#FAF0D8', '#FF4D6D'];
        this.color = palette[Math.floor(Math.random() * palette.length)];
      } else {
        // Confetti
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = -(Math.random() * 8 + 4);
        this.gravity = 0.22;
        this.friction = 0.96;
        this.decay = Math.random() * 0.015 + 0.01;
        this.size = Math.random() * 8 + 4;
        const palette = ['#D4AF37', '#FFFDF8', '#E8D6A5', '#FAF0D8', '#B89730', '#FFEBB0'];
        this.color = palette[Math.floor(Math.random() * palette.length)];
      }
    }

    update() {
      if (this.type === 'flower_petal') {
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * 1.8 + this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
        return;
      }

      this.vx *= this.friction;
      this.vy = (this.vy + this.gravity) * (this.type === 'heart' ? 0.99 : this.friction);
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.life -= this.decay;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = Math.max(0, this.life);

      if (this.type === 'flower_petal') {
        // Velvet rose/flower petal curved contour
        ctx.fillStyle = this.color;
        ctx.shadowColor = 'rgba(196, 30, 58, 0.4)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.85, -this.size * 0.5, this.size * 0.85, this.size * 0.6, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.85, this.size * 0.6, -this.size * 0.85, -this.size * 0.5, 0, -this.size);
        ctx.closePath();
        ctx.fill();
      } else if (this.type === 'firework' || this.type === 'cracker') {
        // Glowing festive firecracker spark
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Shimmering cross sparkle
        if (Math.random() < 0.4) {
          ctx.fillRect(-this.size * 1.8, -0.6, this.size * 3.6, 1.2);
          ctx.fillRect(-0.6, -this.size * 1.8, 1.2, this.size * 3.6);
        }
      } else if (this.type === 'heart') {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, (this.size + topCurveHeight) / 1.4, 0, this.size);
        ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 1.4, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
      } else {
        // Golden confetti streamer / circle
        ctx.fillStyle = this.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 6;
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size * 0.6);
      }

      ctx.restore();
    }
  }

  function spawnBurst(x, y, count = 50, type = 'confetti') {
    for (let i = 0; i < count; i++) {
      effectsParticles.push(new EffectParticle(x, y, type));
    }
  }

  // Cracker Audio Synthesizer via Web Audio API (Crack, Pop, Sparkler Crackle)
  function playCrackerPopSound() {
    try {
      if (!audioContext) initWebAudioSynth();
      if (!audioContext) return;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const now = audioContext.currentTime;

      // 1. Bass thud / pop
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.16);
      oscGain.gain.setValueAtTime(0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(oscGain);
      oscGain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.2);

      // 2. Sparkler crackle noise
      const bufferSize = Math.floor(audioContext.sampleRate * 0.22);
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioContext.sampleRate * 0.05));
      }
      const noise = audioContext.createBufferSource();
      noise.buffer = buffer;
      const filter = audioContext.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.Q.setValueAtTime(2.2, now);
      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      noise.start(now);
    } catch (e) {
      // Audio autoplay gracefully handled
    }
  }

  // Continuous Fireworks/Crackers Barrage
  function spawnFirecrackerBarrage(burstCount = 8) {
    let count = 0;
    const interval = setInterval(() => {
      const rx = Math.random() * (windowWidth * 0.8) + (windowWidth * 0.1);
      const ry = Math.random() * (windowHeight * 0.5) + (windowHeight * 0.12);
      spawnBurst(rx, ry, 75, 'firework');
      playCrackerPopSound();
      count++;
      if (count >= burstCount) {
        clearInterval(interval);
      }
    }, 280);
  }

  // Flower Petals Cascade Shower
  function spawnFlowerShower(petalCount = 60) {
    for (let i = 0; i < petalCount; i++) {
      setTimeout(() => {
        const rx = Math.random() * windowWidth;
        const ry = -20 - Math.random() * 120;
        effectsParticles.push(new EffectParticle(rx, ry, 'flower_petal'));
      }, i * 35);
    }
  }

  function renderEffects() {
    effectsCtx.clearRect(0, 0, windowWidth, windowHeight);
    for (let i = effectsParticles.length - 1; i >= 0; i--) {
      const p = effectsParticles[i];
      p.update();
      p.draw(effectsCtx);
      if (p.life <= 0) {
        effectsParticles.splice(i, 1);
      }
    }
    requestAnimationFrame(renderEffects);
  }

  // =========================================================================
  // 4. MUSIC CONTROLS (Audio File + Web Audio API Dreamy Fallback)
  // =========================================================================
  let audioContext = null;
  let synthInterval = null;

  function initWebAudioSynth() {
    if (audioContext) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    } catch (e) {
      console.warn('Web Audio not supported in this environment', e);
    }
  }

  function playSynthMelodyNote(midi, duration, delay = 0) {
    if (!audioContext) return;
    const now = audioContext.currentTime + delay;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440 * Math.pow(2, (midi - 69) / 12), now);

    // Warm envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  function startSynthMelodyLoop() {
    if (!audioContext) initWebAudioSynth();
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const chords = [
      [60, 64, 67, 71, 74, 76], // Cmaj7
      [57, 60, 64, 67, 71, 72], // Am9
      [53, 57, 60, 64, 69, 72], // Fmaj7
      [55, 59, 62, 67, 71, 74]  // G6
    ];

    let chordIdx = 0;
    const playBar = () => {
      if (!state.isPlayingMusic) return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;
      notes.forEach((note, i) => {
        playSynthMelodyNote(note, 2.5, i * 0.4);
      });
    };

    playBar();
    synthInterval = setInterval(playBar, 3200);
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function toggleMusic() {
    initWebAudioSynth();
    if (state.isPlayingMusic) {
      state.isPlayingMusic = false;
      bgMusic.pause();
      stopSynthMelody();
      musicToggleBtn.classList.remove('playing');
      musicLabel.textContent = 'Play Music ✨';
      if (musicStatus) musicStatus.textContent = 'Tap to listen';
    } else {
      state.isPlayingMusic = true;
      musicToggleBtn.classList.add('playing');
      musicLabel.textContent = 'Now Playing';
      if (musicStatus) musicStatus.textContent = 'Romantic Melody ♫';

      // Try playing native audio track
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Using Web Audio synth fallback for music:', error);
          startSynthMelodyLoop();
        });
      }
    }
  }

  musicToggleBtn.addEventListener('click', toggleMusic);

  // =========================================================================
  // 5. 00:00:00 GRAND WELCOMING & DIRECT THEMED ENTRANCE
  // =========================================================================
  let celebrationTriggered = false;

  function triggerZeroCelebration(isManual = false) {
    if (celebrationTriggered) return;
    celebrationTriggered = true;

    // 1. Force digits to 00:00:00
    if (frontDays) frontDays.textContent = '00';
    if (frontHours) frontHours.textContent = '00';
    if (frontMinutes) frontMinutes.textContent = '00';
    if (frontSeconds) frontSeconds.textContent = '00';

    if (lockStatusText) {
      lockStatusText.innerHTML = '✨ <strong>UNLOCKED! Celebrating Sowmiya\'s Birthday!</strong> ✨';
    }

    // 2. Directly enter the celebration section with full crackers & flower shower!
    enterExperience();
  }

  function enterExperience() {
    if (state.entered) return;
    state.entered = true;

    // Golden light burst overlay
    const burstOverlay = document.createElement('div');
    burstOverlay.className = 'light-burst-overlay';
    document.body.appendChild(burstOverlay);

    // 1. Crackers & Fireworks Barrage firing over the celebration!
    spawnFirecrackerBarrage(12);

    // 2. Heavy cascade of velvety rose & gold flower petals!
    spawnFlowerShower(90);

    // 3. Ensure romantic music is playing
    if (!state.isPlayingMusic) {
      toggleMusic();
    }

    // 4. Animate entrance gate away smoothly
    if (entranceSection) {
      entranceSection.classList.add('fade-out');
    }

    setTimeout(() => {
      if (entranceSection) {
        entranceSection.style.display = 'none';
      }
      body.classList.remove('no-scroll');
      journeyContent.classList.add('visible');
      journeyNav.classList.remove('hidden');
      burstOverlay.remove();

      // Smoothly scroll directly to the celebration section with "HAPPY BIRTHDAY MY LOVE"
      const celebration = document.getElementById('celebration');
      if (celebration) {
        celebration.scrollIntoView({ behavior: 'smooth' });
      }

      // Continue celebratory crackers and flowers as she arrives at the cake!
      setTimeout(() => {
        spawnFirecrackerBarrage(8);
        spawnFlowerShower(60);
      }, 1500);
    }, 1000);
  }

  // =========================================================================
  // 6. SCROLL PROGRESS & JOURNEY TRACKER
  // =========================================================================
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    // Update active nav dot
    const sections = document.querySelectorAll('section');
    let currentId = 'entrance';
    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      if (scrollTop >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId !== state.activeSection) {
      state.activeSection = currentId;
      navDots.forEach(dot => {
        if (dot.getAttribute('href') === `#${currentId}`) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Intersection Observer for staggered scroll reveals
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // =========================================================================
  // 7. SECTION 2: BIRTHDAY CELEBRATION & STRICT REAL-TIME COUNTDOWN
  // =========================================================================
  function getUpcomingNovember5() {
    const now = new Date();
    const currentYear = now.getFullYear();
    // Target is strictly November 5th at 00:00:00 (12:00:00 AM Midnight)
    let target = new Date(currentYear, 10, 5, 0, 0, 0);

    // If already past November 5th 23:59:59 of this year, target next year's Nov 5
    const endOfNov5 = new Date(currentYear, 10, 5, 23, 59, 59, 999);
    if (now > endOfNov5) {
      target = new Date(currentYear + 1, 10, 5, 0, 0, 0);
    }
    return target;
  }

  function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const frontSecondsBox = document.getElementById('front-seconds-box');
    const countdownWrapper = document.getElementById('countdown-wrapper');
    const greetingBadge = document.getElementById('birthday-greeting-badge');

    // Secret developer preview trigger via URL query param (?test=true or ?preview=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('preview') || urlParams.has('test') || urlParams.has('unlock') || urlParams.has('now')) {
      setTimeout(() => {
        triggerZeroCelebration(true);
      }, 500);
      return;
    }

    const targetBirthday = getUpcomingNovember5();

    function update() {
      const now = new Date();
      const diff = targetBirthday.getTime() - now.getTime();

      // ONLY when the real time reaches Nov 5 midnight 12:00 AM (00:00:00)
      if (diff <= 0) {
        if (frontDays) frontDays.textContent = '00';
        if (frontHours) frontHours.textContent = '00';
        if (frontMinutes) frontMinutes.textContent = '00';
        if (frontSeconds) frontSeconds.textContent = '00';

        if (!celebrationTriggered) {
          triggerZeroCelebration();
        }
        if (countdownWrapper) countdownWrapper.classList.add('hidden');
        if (greetingBadge) greetingBadge.classList.remove('hidden');
        return;
      }

      // Real-time ticking down:
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      const dStr = String(d).padStart(2, '0');
      const hStr = String(h).padStart(2, '0');
      const mStr = String(m).padStart(2, '0');
      const sStr = String(s).padStart(2, '0');

      // Update Front Page Countdown Digits
      if (frontDays) frontDays.textContent = dStr;
      if (frontHours) frontHours.textContent = hStr;
      if (frontMinutes) frontMinutes.textContent = mStr;
      if (frontSeconds) {
        if (frontSeconds.textContent !== sStr) {
          frontSeconds.textContent = sStr;
          if (frontSecondsBox) {
            frontSecondsBox.classList.remove('tick-pulse');
            void frontSecondsBox.offsetWidth; // Trigger reflow for micro-animation
            frontSecondsBox.classList.add('tick-pulse');
          }
        }
      }

      // Update Inside Countdown Digits
      if (daysEl) daysEl.textContent = dStr;
      if (hoursEl) hoursEl.textContent = hStr;
      if (minutesEl) minutesEl.textContent = mStr;
      if (secondsEl) secondsEl.textContent = sStr;
    }

    update();
    setInterval(update, 1000);
  }
  initCountdown();

  // Wish Button Interaction
  makeWishBtn.addEventListener('click', () => {
    // 1. Blow out candles with gentle animation
    candleFlames.forEach(flame => {
      flame.classList.add('blown-out');
    });

    // 2. Confetti & sparkle explosion around cake
    const rect = makeWishBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnBurst(cx, cy, 70, 'confetti');
    spawnBurst(cx, cy - 80, 40, 'heart');

    // 3. Show wish outcome message
    wishOutcome.classList.remove('hidden');
    makeWishBtn.disabled = true;
    makeWishBtn.style.opacity = '0.7';
    makeWishBtn.querySelector('.btn-text').textContent = 'WISH GRANTED ✨';
  });

  // =========================================================================
  // 8. SECTION 4: GALLERY & LIGHTBOX
  // =========================================================================
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-img');
      const title = card.getAttribute('data-title') || card.querySelector('.gallery-card-title').textContent;
      const caption = card.getAttribute('data-caption') || card.querySelector('.gallery-card-caption').textContent;

      lightboxImg.src = img.src;
      lightboxTitle.textContent = title;
      lightboxCaption.textContent = caption;
      lightbox.classList.remove('hidden');
      body.classList.add('no-scroll');
    });
  });

  function closeLightboxModal() {
    lightbox.classList.add('hidden');
    body.classList.remove('no-scroll');
  }

  lightboxClose.addEventListener('click', closeLightboxModal);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
      closeLightboxModal();
    }
  });

  // =========================================================================
  // 9. SECTION 5: 10 REASONS FLIP CARDS
  // =========================================================================
  reasonCards.forEach(card => {
    const flipCard = () => {
      const isFlipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-expanded', isFlipped);

      if (isFlipped) {
        const rect = card.getBoundingClientRect();
        spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12, 'confetti');
      }
    };

    card.addEventListener('click', flipCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard();
      }
    });
  });

  // =========================================================================
  // 10. SECTION 6: INTERACTIVE LOVE LETTER
  // =========================================================================
  function openLoveLetter() {
    if (state.letterOpened) return;
    state.letterOpened = true;

    loveEnvelope.classList.add('is-open');

    // Sparkle burst from the wax seal
    const rect = loveEnvelope.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + 80;
    spawnBurst(cx, cy, 35, 'heart');
    spawnBurst(cx, cy, 30, 'confetti');

    openLetterBtn.classList.add('hidden');
    reopenLetterBtn.classList.remove('hidden');
  }

  function resetLoveLetter() {
    state.letterOpened = false;
    loveEnvelope.classList.remove('is-open');
    openLetterBtn.classList.remove('hidden');
    reopenLetterBtn.classList.add('hidden');
  }

  openLetterBtn.addEventListener('click', openLoveLetter);
  waxSeal.addEventListener('click', openLoveLetter);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLoveLetter();
    }
  });
  const envelopeFlap = document.getElementById('envelope-flap');
  if (envelopeFlap) envelopeFlap.addEventListener('click', openLoveLetter);
  reopenLetterBtn.addEventListener('click', resetLoveLetter);

  // =========================================================================
  // 11. SECTION 7: MYSTERY GIFT REVEAL
  // =========================================================================
  function openMysteryGift() {
    if (state.giftOpened) return;
    state.giftOpened = true;

    giftBox.classList.add('opened');

    // Explosive golden fireworks & heart confetti
    const rect = giftBox.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    spawnBurst(cx, cy, 80, 'firework');
    spawnBurst(cx, cy, 50, 'heart');
    spawnBurst(cx, cy - 60, 60, 'confetti');

    setTimeout(() => {
      giftRevealContent.classList.remove('hidden');
      openGiftBtn.disabled = true;
      openGiftBtn.style.opacity = '0.7';
      openGiftBtn.querySelector('.btn-text').textContent = 'GIFT UNLOCKED 🎁';
    }, 600);
  }

  openGiftBtn.addEventListener('click', openMysteryGift);
  giftBox.addEventListener('click', openMysteryGift);

  // =========================================================================
  // 12. SECTION 8 & VIRTUAL HUG MODAL
  // =========================================================================
  let hugCount = 1;

  function openHugModal() {
    hugCount = 1;
    const btnSpan = hugAgainBtn.querySelector('span') || hugAgainBtn;
    btnSpan.textContent = 'HUG TIGHTER ❤️';

    hugModal.classList.remove('hidden');
    body.classList.add('no-scroll');

    const hugBox = document.querySelector('.hug-illustration-box');
    const rect = hugBox ? hugBox.getBoundingClientRect() : hugBtn.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45, 'heart');
  }

  function closeHugModal() {
    hugModal.classList.add('hidden');
    body.classList.remove('no-scroll');
  }

  hugBtn.addEventListener('click', openHugModal);
  hugModalClose.addEventListener('click', closeHugModal);
  hugModal.addEventListener('click', (e) => {
    if (e.target === hugModal || e.target.classList.contains('hug-modal-backdrop')) {
      closeHugModal();
    }
  });

  hugAgainBtn.addEventListener('click', () => {
    hugCount++;

    // Visual squash-and-stretch squeeze animation on the couple illustration
    const hugBox = document.querySelector('.hug-illustration-box');
    if (hugBox) {
      hugBox.classList.remove('hug-squeeze');
      void hugBox.offsetWidth; // force browser reflow to restart animation
      hugBox.classList.add('hug-squeeze');
    }

    // Spawn floating golden hearts directly over the cute illustration and button
    const boxRect = hugBox ? hugBox.getBoundingClientRect() : hugAgainBtn.getBoundingClientRect();
    const btnRect = hugAgainBtn.getBoundingClientRect();

    spawnBurst(boxRect.left + boxRect.width / 2, boxRect.top + boxRect.height / 2, 50, 'heart');
    spawnBurst(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 35, 'heart');
    spawnBurst(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 25, 'confetti');

    // Sweet melodic musical chime
    initWebAudioSynth();
    playSynthMelodyNote(76, 0.4, 0);
    playSynthMelodyNote(81, 0.5, 0.08);
    playSynthMelodyNote(88, 0.7, 0.16);

    // Interactive button messages
    const messages = [
      `HUGGED TIGHTER! (${hugCount}x) 🥰`,
      `SQUEEZING EVEN TIGHTER! (${hugCount}x) ❤️`,
      `SO MUCH LOVE! (${hugCount}x) ✨`,
      `WARMEST HUG EVER! (${hugCount}x) 👑`,
      `NEVER LETTING GO! (${hugCount}x) 💖`
    ];
    const btnSpan = hugAgainBtn.querySelector('span') || hugAgainBtn;
    btnSpan.textContent = messages[(hugCount - 2) % messages.length];
  });

  // =========================================================================
  // 13. SECTION 9: THE GRAND PROPOSAL (Runaway "NO" & "YES" Wedding Finale)
  // =========================================================================
  const proposalYesBtn = document.getElementById('proposal-yes-btn');
  const proposalNoBtn = document.getElementById('proposal-no-btn');
  const proposalChoiceArena = document.getElementById('proposal-choice-arena');
  const marriageCelebrationCard = document.getElementById('marriage-celebration-card');
  const noDodgeHint = document.getElementById('no-dodge-hint');

  let dodgeCount = 0;
  const dodgePhrases = [
    'Are you sure? 🥺',
    'Wrong button, Princess! 🙈',
    'Try again! 💖',
    "You can't escape my love! 🥰",
    'Error 404: No not found! 😜',
    'Only YES allowed! 💍✨',
    'Nice try! ❤️',
    'Still love you though! 😘',
    'Just click YES! 👑💍'
  ];

  function dodgeNoBtn(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dodgeCount++;

    // Random safe movement within arena
    const maxOffset = windowWidth < 600 ? 90 : 160;
    const randX = (Math.random() - 0.5) * (maxOffset * 2);
    const randY = (Math.random() - 0.5) * 110;

    proposalNoBtn.style.transform = `translate(${randX}px, ${randY}px)`;
    
    // Change label playfully
    const noBtnText = proposalNoBtn.querySelector('.btn-text') || proposalNoBtn;
    noBtnText.textContent = dodgePhrases[(dodgeCount - 1) % dodgePhrases.length];

    // Show hint
    if (noDodgeHint) {
      noDodgeHint.classList.remove('hidden');
    }

    // Make the YES button grow bigger & pulse brighter on each dodge!
    if (proposalYesBtn) {
      const scale = Math.min(1.35, 1 + dodgeCount * 0.05);
      proposalYesBtn.style.transform = `scale(${scale})`;
      proposalYesBtn.style.boxShadow = `0 12px ${30 + dodgeCount * 5}px rgba(212, 175, 55, ${0.4 + Math.min(0.5, dodgeCount * 0.08)})`;
    }

    // Small playful confetti pop near the dodging button
    const rect = proposalNoBtn.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8, 'heart');
  }

  if (proposalNoBtn) {
    proposalNoBtn.addEventListener('mouseenter', dodgeNoBtn);
    proposalNoBtn.addEventListener('mousemove', dodgeNoBtn);
    proposalNoBtn.addEventListener('touchstart', dodgeNoBtn, { passive: false });
    proposalNoBtn.addEventListener('pointerdown', dodgeNoBtn);
    proposalNoBtn.addEventListener('click', dodgeNoBtn);
  }

  function celebrateMarriage() {
    if (state.isMarried) return;
    state.isMarried = true;

    // 1. Massive fireworks & confetti burst
    const yesRect = proposalYesBtn.getBoundingClientRect();
    const cx = yesRect.left + yesRect.width / 2;
    const cy = yesRect.top + yesRect.height / 2;

    spawnBurst(cx, cy, 100, 'firework');
    spawnBurst(cx, cy, 70, 'heart');
    spawnBurst(windowWidth / 2, windowHeight / 2, 80, 'confetti');

    // Staggered repeating celebration fireworks
    let burstInterval = setInterval(() => {
      const rx = Math.random() * windowWidth;
      const ry = Math.random() * (windowHeight * 0.6);
      spawnBurst(rx, ry, 60, 'firework');
      spawnBurst(rx, ry, 40, 'heart');
    }, 700);

    setTimeout(() => {
      clearInterval(burstInterval);
    }, 5500);

    // 2. Play wedding / royal fanfare chimes via Web Audio
    initWebAudioSynth();
    const weddingFanfare = [
      { note: 60, dur: 0.35, delay: 0 },
      { note: 65, dur: 0.35, delay: 0.25 },
      { note: 69, dur: 0.5, delay: 0.5 },
      { note: 72, dur: 0.8, delay: 0.85 },
      { note: 77, dur: 1.2, delay: 1.2 }
    ];
    weddingFanfare.forEach(item => {
      playSynthMelodyNote(item.note, item.dur, item.delay);
    });

    // 3. Switch from proposal arena to Grand Marriage Celebration Card
    proposalChoiceArena.classList.add('hidden');
    marriageCelebrationCard.classList.remove('hidden');

    // 4. Smooth scroll into the marriage card
    marriageCelebrationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (proposalYesBtn) {
    proposalYesBtn.addEventListener('click', celebrateMarriage);
  }

  // Global Keydown Handler (Escape closes modals)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!lightbox.classList.contains('hidden')) closeLightboxModal();
      if (!hugModal.classList.contains('hidden')) closeHugModal();
    }
  });

  // Initialize
  initAmbientCanvas();
  renderAmbient();
  renderEffects();

})();
