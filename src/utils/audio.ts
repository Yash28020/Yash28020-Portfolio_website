// Web Audio API procedural cinematic sound engine
class CosmicSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlayingAmbient: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.playChime(660, 'sine', 0.15);
    } else {
      this.stopAmbient();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public unmute() {
    if (this.isMuted) {
      this.toggleMute();
    }
  }

  public mute() {
    if (!this.isMuted) {
      this.toggleMute();
    }
  }

  public startAmbient() {
    this.init();
    if (!this.ctx || this.isMuted || this.isPlayingAmbient) return;

    try {
      // Create master ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);

      // Low pass filter for warm deep space resonance
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(120, this.ctx.currentTime);

      // Binaural cosmic drone oscillators (55Hz and 55.8Hz for subtle 0.8Hz theta pulsation)
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(55.8, this.ctx.currentTime);

      this.ambientOsc1.connect(this.filterNode);
      this.ambientOsc2.connect(this.filterNode);
      this.filterNode.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isPlayingAmbient = true;
    } catch {
      // Audio context might fail before user gesture
    }
  }

  public stopAmbient() {
    if (!this.ambientGain || !this.ctx) return;
    try {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        if (this.ambientOsc1) {
          try { this.ambientOsc1.stop(); this.ambientOsc1.disconnect(); } catch {}
          this.ambientOsc1 = null;
        }
        if (this.ambientOsc2) {
          try { this.ambientOsc2.stop(); this.ambientOsc2.disconnect(); } catch {}
          this.ambientOsc2 = null;
        }
        this.isPlayingAmbient = false;
      }, 1000);
    } catch {}
  }

  // Futuristic interface blip
  public playClick(pitch: number = 880) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  // Hover chime
  public playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  // Dimension warp & transition sound
  public playWarp() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.8);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 0.4);
      filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.85);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.9);
    } catch {}
  }

  // Harmonic celestial chime
  public playChime(freq: number = 528, type: OscillatorType = 'sine', duration: number = 0.8) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration + 0.05);
    } catch {}
  }
}

export const soundManager = new CosmicSoundEngine();

