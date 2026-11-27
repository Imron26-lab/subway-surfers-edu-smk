/**
 * Web Audio API Synthesizer - Subway Surfers Edu
 * Menghasilkan musik latar arcade upbeat & efek suara permainan 100% offline tanpa file MP3 eksternal.
 */

class SoundManagerClass {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('smk_surfers_mute') === '1';
    this.bgmPlaying = false;
    this.bgmDucked = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
    this.unlocked = false;
    this.setupMobileAudioUnlock();
  }

  setupMobileAudioUnlock() {
    const unlock = () => {
      this.init();
      if (!this.ctx) return;
      this.ctx.resume().then(() => {
        // Putar buffer hening 1 sampel untuk membuka kunci Web Audio di iOS Safari (iPhone/iPad)
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        if (source.start) source.start(0);
        this.unlocked = true;
      }).catch(() => {});
    };

    ['touchstart', 'touchend', 'click', 'keydown'].forEach(evt => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('smk_surfers_mute', this.muted ? '1' : '0');
    if (this.muted) {
      this.stopBgm();
    }
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.12, vol = 0.18, slideTo = null, delay = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playNoise(duration = 0.15, vol = 0.15, filterFreq = 1000) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  playClick() {
    this.playTone(620, 'triangle', 0.06, 0.14, 880);
  }

  playCoin() {
    // Suara koin klasik B5 -> E6
    this.playTone(987.77, 'sine', 0.07, 0.16);
    this.playTone(1318.51, 'sine', 0.16, 0.18, null, 0.06);
  }

  playLaneSwitch() {
    this.playTone(300, 'triangle', 0.08, 0.14, 520);
  }

  playJump() {
    this.playTone(240, 'sine', 0.18, 0.2, 680);
  }

  playSlide() {
    this.playTone(420, 'triangle', 0.16, 0.18, 130);
    this.playNoise(0.14, 0.08, 900);
  }

  playPowerup() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      this.playTone(n, 'triangle', 0.14, 0.18, null, i * 0.06);
    });
  }

  playHoverboard() {
    this.playTone(220, 'sawtooth', 0.25, 0.12, 660);
    this.playTone(330, 'triangle', 0.3, 0.15, 880, 0.05);
  }

  playShieldBreak() {
    this.playNoise(0.28, 0.22, 1600);
    this.playTone(880, 'sawtooth', 0.25, 0.18, 180);
  }

  playCrash() {
    // Bunyi tabrakan + peluit satpam/polisi
    this.playNoise(0.32, 0.28, 700);
    this.playTone(160, 'sawtooth', 0.25, 0.25, 55);
    // Peluit
    this.playTone(2600, 'sine', 0.12, 0.14, 2800, 0.18);
    this.playTone(2750, 'sine', 0.22, 0.16, 2500, 0.32);
  }

  playQuizOpen() {
    const notes = [587.33, 739.99, 880, 1174.66];
    notes.forEach((n, i) => {
      this.playTone(n, 'sine', 0.15, 0.18, null, i * 0.055);
    });
  }

  playCorrect() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((n, i) => {
      this.playTone(n, 'triangle', 0.18, 0.22, null, i * 0.07);
    });
  }

  playWrong() {
    this.playTone(311.13, 'sawtooth', 0.2, 0.18, 277.18);
    this.playTone(246.94, 'sawtooth', 0.35, 0.2, 185.0, 0.18);
  }

  playTick() {
    this.playTone(880, 'sine', 0.04, 0.1);
  }

  setBgmDucking(ducked) {
    this.bgmDucked = ducked;
  }

  startBgm() {
    if (this.muted || this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;
    this.bgmStep = 0;

    // Bassline & arpeggio ala Subway Surfers / Arcade Runner (135 BPM -> 111ms per 1/16 note)
    const bassNotes = [
      130.81, 0, 130.81, 155.56, 174.61, 0, 196.00, 174.61,
      130.81, 0, 130.81, 155.56, 233.08, 0, 196.00, 155.56
    ];
    const leadNotes = [
      523.25, 0, 622.25, 523.25, 698.46, 0, 783.99, 0,
      932.33, 783.99, 698.46, 622.25, 523.25, 0, 783.99, 622.25
    ];

    this.bgmTimer = setInterval(() => {
      if (this.muted || !this.bgmPlaying) return;
      const step = this.bgmStep % 16;
      const mult = this.bgmDucked ? 0.28 : 1.0;

      const b = bassNotes[step];
      if (b > 0) {
        this.playTone(b, 'triangle', 0.11, 0.065 * mult);
      }

      const l = leadNotes[step];
      if (l > 0 && !this.bgmDucked) {
        this.playTone(l, 'sine', 0.09, 0.04 * mult);
      }

      // Hi-hat ritmis setiap ketukan genap
      if (step % 2 === 0 && !this.bgmDucked) {
        this.playNoise(0.03, 0.02, 4500);
      }

      this.bgmStep++;
    }, 135);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

window.SoundManager = new SoundManagerClass();
