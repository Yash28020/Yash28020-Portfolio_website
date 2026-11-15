import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Download, Compass, Volume2, VolumeX, EyeOff } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface IntroSequenceProps {
  onComplete: (targetDimension?: string) => void;
  onExploreWork: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, onExploreWork }) => {
  // Step 0: Singularity (tiny glowing point)
  // Step 1: "BEFORE SPACE, THERE WAS NOTHING."
  // Step 2: "BEFORE TIME, THERE WAS POSSIBILITY."
  // Step 3: "EVERY IDEA CREATES A NEW UNIVERSE." (Big Bang burst)
  // Step 4: "YOU HAVE ENTERED THE SIXTH DIMENSION." (Gateway opens)
  // Step 5: Full Reveal (YASH PRATAP SINGH, actions)
  const [step, setStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Big Bang particles
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
  }>>([]);

  const singularityPulseRef = useRef<number>(0);

  useEffect(() => {
    // Canvas setup for Singularity and Big Bang particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const palette = ['#00f0ff', '#ffd166', '#9d4edd', '#f72585', '#ffffff', '#05d9e8'];

    const render = () => {
      ctx.fillStyle = 'rgba(3, 3, 8, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Singularity stage
      if (step < 3) {
        singularityPulseRef.current += 0.05;
        const pulse = Math.sin(singularityPulseRef.current) * 0.5 + 1;
        const radius = (step === 0 ? 3 : step === 1 ? 5 : 8) * pulse;

        // Outer glow
        const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 12);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
        grad.addColorStop(0.5, 'rgba(157, 78, 221, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 12, 0, Math.PI * 2);
        ctx.fill();

        // Singularity core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting micro-particles around singularity
        for (let i = 0; i < 20; i++) {
          const angle = singularityPulseRef.current * 1.5 + (i * Math.PI) / 10;
          const dist = 30 + Math.sin(i + singularityPulseRef.current) * 15;
          const px = centerX + Math.cos(angle) * dist;
          const py = centerY + Math.sin(angle) * dist;
          ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#ffd166';
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render expanding Big Bang particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [step]);

  // Timed progression of the cinematic prologue
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1600), // Step 1: BEFORE SPACE
      setTimeout(() => setStep(2), 3400), // Step 2: BEFORE TIME
      setTimeout(() => {
        setStep(3); // Step 3: EVERY IDEA CREATES A NEW UNIVERSE + Big Bang
        triggerBigBang();
        soundManager.playWarp();
      }, 5200),
      setTimeout(() => {
        setStep(4); // Step 4: SIXTH DIMENSION GATEWAY
        soundManager.playChime(784, 'sine', 1.2);
      }, 7200),
      setTimeout(() => {
        setStep(5); // Step 5: Full reveal
      }, 9200),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const triggerBigBang = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = 350;
    const palette = ['#00f0ff', '#ffd166', '#9d4edd', '#f72585', '#ffffff', '#4cc9f0', '#05d9e8'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 16 + 2;
      particlesRef.current.push({
        x: width / 2,
        y: height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.2,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        decay: Math.random() * 0.008 + 0.004,
      });
    }
  };

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleSkip = () => {
    soundManager.playClick(600);
    setStep(5);
  };

  const handleEnterUniverse = () => {
    soundManager.playWarp();
    soundManager.startAmbient();
    sessionStorage.setItem('hasSeenIntro', 'true');
    onComplete();
  };

  const handleExploreProjects = () => {
    soundManager.playWarp();
    soundManager.startAmbient();
    sessionStorage.setItem('hasSeenIntro', 'true');
    onExploreWork();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian overflow-hidden select-none">
      {/* Background Simulation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Top Floating Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cosmic-cyan animate-ping" />
          <span className="text-xs uppercase tracking-widest font-mono text-slate-400">
            SYSTEM // PROLOGUE SEQUENCE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur-md text-xs font-mono text-slate-300 hover:border-cosmic-cyan hover:text-cosmic-cyan transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cosmic-cyan animate-pulse" />}
            <span>{isMuted ? "SOUND: OFF" : "SOUND: ON"}</span>
          </button>

          {step < 5 && (
            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-cosmic-purple/50 bg-purple-950/40 backdrop-blur-md text-xs font-mono tracking-wider text-purple-200 hover:bg-purple-900/60 hover:border-cosmic-cyan hover:text-white transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>SKIP PROLOGUE</span>
            </button>
          )}
        </div>
      </div>

      {/* Cinematic Phase Typography (Steps 1 to 4) */}
      {step < 5 && (
        <div className="relative z-20 text-center max-w-4xl px-6 pointer-events-none">
          {step === 1 && (
            <div className="animate-fade-in transition-opacity duration-1000">
              <p className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-cosmic-cyan mb-3">
                GENESIS 0.0
              </p>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-cinematic font-bold tracking-widest text-slate-100 neon-text-cyan">
                BEFORE SPACE, THERE WAS NOTHING.
              </h1>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in transition-opacity duration-1000">
              <p className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-cosmic-gold mb-3">
                PRIMORDIAL TENSOR
              </p>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-cinematic font-bold tracking-widest text-slate-100 neon-text-gold">
                BEFORE TIME, THERE WAS POSSIBILITY.
              </h1>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in transition-opacity duration-1000 scale-105">
              <p className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-cosmic-magenta mb-3">
                THE COSMIC CATALYST
              </p>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-cinematic font-bold tracking-widest text-slate-100 text-shadow">
                EVERY IDEA CREATES A NEW UNIVERSE.
              </h1>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in transition-opacity duration-1000">
              <div className="inline-block p-1 px-4 mb-4 rounded-full border border-cosmic-cyan/60 bg-cosmic-cyan/10 text-cosmic-cyan font-mono text-xs tracking-widest uppercase">
                DIMENSIONAL BREACH DETECTED
              </div>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-cinematic font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan via-white to-cosmic-purple neon-text-cyan">
                YOU HAVE ENTERED THE SIXTH DIMENSION.
              </h1>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Master Portal Reveal (Yash Pratap Singh) */}
      {step === 5 && (
        <div className="relative z-30 max-w-4xl mx-auto px-6 py-10 text-center flex flex-col items-center justify-center animate-fade-in">
          {/* Dimensional Stargate Halo */}
          <div className="relative mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-cosmic-cyan/50 animate-spin-slow flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-cosmic-purple animate-spin-reverse flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-cosmic-cyan via-cosmic-purple to-cosmic-magenta opacity-90 blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.8)]" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-orbitron text-xl md:text-2xl font-black text-white tracking-widest drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]">
                6D
              </span>
            </div>
          </div>

          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cosmic-cyan/30 bg-cosmic-cyan/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-cyan animate-pulse" />
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-cosmic-cyan font-medium uppercase">
              AI / ML ENGINEER • DATA SCIENCE ENTHUSIAST • SOFTWARE DEVELOPER
            </span>
          </div>

          {/* Master Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinematic font-black tracking-wider text-slate-100 uppercase mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_5px_25px_rgba(0,0,0,0.9)]">
              YASH PRATAP SINGH
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-2xl font-cinematic tracking-widest text-cosmic-gold mb-2 neon-text-gold">
            &ldquo;Beyond Space. Beyond Time. Beyond Imagination.&rdquo;
          </p>

          <p className="text-xs md:text-sm font-mono tracking-widest text-slate-400 mb-8 uppercase">
            One Mind. Infinite Possibilities.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
            {/* Primary Action */}
            <button
              onClick={handleEnterUniverse}
              className="group relative w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cosmic-cyan via-cosmic-turquoise to-blue-600 text-obsidian font-orbitron font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] active:scale-95"
            >
              <span>ENTER THE UNIVERSE</span>
              <ArrowRight className="w-4 h-4 text-obsidian transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Action: Explore Work */}
            <button
              onClick={handleExploreProjects}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-cosmic-purple/50 bg-purple-950/30 backdrop-blur-md text-slate-200 font-orbitron font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-purple-900/50 hover:border-cosmic-magenta hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <Compass className="w-4 h-4 text-cosmic-magenta" />
              <span>EXPLORE MY WORK</span>
            </button>

            {/* Download Resume Button */}
            <a
              href="/resume.pdf"
              download="Yash_Pratap_Singh_Resume.pdf"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 backdrop-blur-md text-slate-300 font-mono font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:border-cosmic-gold hover:text-cosmic-gold transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-cosmic-gold" />
              <span>RESUME</span>
            </a>
          </div>

          {/* Quick specs pill */}
          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            <span>6 Dimensions</span>
            <span>•</span>
            <span>7 Planetary Worlds</span>
            <span>•</span>
            <span>Lovely Professional University</span>
            <span>•</span>
            <span>CGPA 8.2</span>
          </div>
        </div>
      )}
    </div>
  );
};

