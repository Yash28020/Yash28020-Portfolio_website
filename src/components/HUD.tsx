import React, { useState } from 'react';
import { 
  Volume2, VolumeX, Download, Compass, ChevronUp, 
  Map, Sparkles, X, Menu, ExternalLink, Globe
} from 'lucide-react';
import { dimensionsData, DimensionInfo } from '../data/dimensions';
import { soundManager } from '../utils/audio';

interface HUDProps {
  currentDimension: string;
  onSelectDimension: (dimId: string) => void;
  onReplayIntro: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  currentDimension,
  onSelectDimension,
  onReplayIntro,
  isMuted,
  onToggleSound,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeDim = dimensionsData.find(d => d.id === currentDimension) || dimensionsData[0];
  const activeIndex = dimensionsData.findIndex(d => d.id === currentDimension);
  const progressPercent = ((activeIndex + 1) / dimensionsData.length) * 100;

  const handleDimensionClick = (dimId: string) => {
    soundManager.playWarp();
    onSelectDimension(dimId);
    setIsMapOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleScrollToTop = () => {
    soundManager.playClick(700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSelectDimension('origin');
  };

  return (
    <>
      {/* TOP FLOATING HUD BAR */}
      <header className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        {/* Left: Dimension Indicator / Quantum Compass */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setIsMapOpen(true)}
            aria-label="Open Dimensional Multiverse Map"
            className="group flex items-center gap-3 px-3.5 py-2 rounded-xl cosmic-glass border border-cosmic-cyan/30 hover:border-cosmic-cyan text-left transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cosmic-cyan animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-cosmic-cyan relative" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                <span>DIMENSION {activeDim.number}</span>
                <span className="text-cosmic-cyan">•</span>
                <span className="text-cosmic-cyan hidden sm:inline">WARP MATRIX</span>
              </div>
              <div className="text-xs sm:text-sm font-orbitron font-bold text-white tracking-wider group-hover:text-cosmic-cyan transition-colors">
                {activeDim.name}
              </div>
            </div>
            <Map className="w-4 h-4 text-slate-400 group-hover:text-cosmic-cyan transition-colors ml-1" />
          </button>
        </div>

        {/* Center: Desktop Navigation Quick Pills */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full cosmic-glass border border-slate-700/60 pointer-events-auto shadow-2xl backdrop-blur-xl">
          {dimensionsData.map((dim) => {
            const isActive = dim.id === currentDimension;
            return (
              <button
                key={dim.id}
                onClick={() => handleDimensionClick(dim.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-obsidian font-bold bg-gradient-to-r from-cosmic-cyan to-cosmic-turquoise shadow-[0_0_15px_rgba(0,240,255,0.7)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {dim.number} {dim.name.replace('THE ', '').split(' ')[0]}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls (Sound, Resume, Mobile Menu) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Quick Galaxy Project Warp */}
          <button
            onClick={() => handleDimensionClick('projects')}
            aria-label="Warp to 3D Project Galaxy"
            title="Warp to 3D Project Galaxy"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl cosmic-glass border border-cosmic-magenta/40 hover:border-cosmic-magenta text-slate-200 hover:text-white text-xs font-mono transition-all hover:shadow-[0_0_20px_rgba(247,37,133,0.3)] cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-cosmic-magenta animate-spin-slow" />
            <span className="font-orbitron font-semibold text-cosmic-magenta">PROJECTS</span>
          </button>

          {/* Sound On / Off */}
          <button
            onClick={onToggleSound}
            aria-label={isMuted ? "Unmute cosmic audio" : "Mute cosmic audio"}
            title={isMuted ? "Turn Cosmic Sound ON" : "Turn Cosmic Sound OFF"}
            className="flex items-center justify-center w-9 h-9 rounded-xl cosmic-glass border border-slate-700 hover:border-cosmic-cyan text-slate-300 hover:text-cosmic-cyan transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cosmic-cyan animate-pulse" />}
          </button>

          {/* Download Resume Action */}
          <a
            href="/resume.pdf"
            download="Yash_Pratap_Singh_Resume.pdf"
            title="Download Yash Pratap Singh's Actual Resume PDF"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl cosmic-glass-gold border border-amber-500/40 hover:border-amber-400 text-amber-200 hover:text-amber-100 text-xs font-mono transition-all hover:shadow-[0_0_20px_rgba(255,209,102,0.3)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cosmic-gold" />
            <span className="font-semibold">RESUME</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl cosmic-glass border border-slate-700 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* RIGHT FIXED DIMENSIONAL ORBIT INDICATOR (DESKTOP) */}
      <aside aria-label="Dimension progress tracker" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-none">
        <div className="text-[10px] font-mono tracking-widest text-slate-400 rotate-90 mb-4 origin-center">
          PROGRESS
        </div>

        {/* Orbit Node Line */}
        <div className="relative w-1.5 h-48 bg-slate-800/80 rounded-full overflow-hidden flex flex-col justify-start">
          <div
            className="w-full bg-gradient-to-b from-cosmic-cyan via-cosmic-purple to-cosmic-magenta rounded-full transition-all duration-500"
            style={{ height: `${progressPercent}%` }}
          />
        </div>

        {/* Node Buttons */}
        <div className="flex flex-col gap-2.5 pointer-events-auto">
          {dimensionsData.map((dim, idx) => {
            const isActive = dim.id === currentDimension;
            return (
              <button
                key={dim.id}
                onClick={() => handleDimensionClick(dim.id)}
                title={`Warp to Dimension ${dim.number}: ${dim.name}`}
                className={`group relative flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-2 border-cosmic-cyan bg-cosmic-cyan text-obsidian font-bold shadow-[0_0_15px_rgba(0,240,255,0.8)] scale-110'
                    : 'border border-slate-700 bg-slate-900/80 text-slate-400 hover:border-cosmic-cyan hover:text-cosmic-cyan'
                }`}
              >
                {dim.number}

                {/* Tooltip on hover */}
                <span className="absolute right-9 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-orbitron tracking-wider text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {dim.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Back to Top */}
        <button
          onClick={handleScrollToTop}
          title="Return to Genesis / Top"
          className="pointer-events-auto mt-2 p-1.5 rounded-full border border-slate-700 bg-slate-900/60 text-slate-400 hover:text-cosmic-cyan hover:border-cosmic-cyan transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </aside>

      {/* FULL DIMENSIONAL MULTIVERSE MAP MODAL */}
      {isMapOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="map-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-2xl animate-fade-in"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-2xl cosmic-glass border border-cosmic-cyan/40 shadow-[0_0_60px_rgba(0,240,255,0.2)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cosmic-cyan/10 border border-cosmic-cyan/30">
                  <Map className="w-5 h-5 text-cosmic-cyan" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cosmic-cyan uppercase">
                    INTERDIMENSIONAL TRANSIT SYSTEM
                  </span>
                  <h2 id="map-modal-title" className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wider">
                    MULTIVERSE DIMENSIONAL MAP
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setIsMapOpen(false)}
                aria-label="Close Multiverse Map"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dimensions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {dimensionsData.map((dim) => {
                const isActive = dim.id === currentDimension;
                return (
                  <button
                    key={dim.id}
                    onClick={() => handleDimensionClick(dim.id)}
                    className={`relative p-5 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                      isActive
                        ? 'border-cosmic-cyan bg-cosmic-cyan/10 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold tracking-widest text-cosmic-cyan">
                          DIMENSION {dim.number}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/40">
                            CURRENT POSITION
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-orbitron font-bold text-white group-hover:text-cosmic-cyan transition-colors mb-1">
                        {dim.name}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium mb-2">
                        {dim.title}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {dim.atmosphere}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cosmic-cyan group-hover:translate-x-1 transition-transform">
                      <span>INITIATE WARP</span>
                      <Sparkles className="w-3.5 h-3.5 text-cosmic-cyan" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsMapOpen(false);
                    onReplayIntro();
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  REPLAY PROLOGUE INTRO
                </button>
                <a
                  href="/resume.pdf"
                  download="Yash_Pratap_Singh_Resume.pdf"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cosmic-gold" />
                  <span>DOWNLOAD ACTUAL RESUME (PDF)</span>
                </a>
              </div>

              <div className="text-xs font-mono text-slate-400">
                LPU • CSE • 2023–2027 • CGPA 8.2
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex flex-col p-6 lg:hidden animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="text-sm font-orbitron font-bold text-white">
              DIMENSIONAL MATRIX
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-3 py-6">
            {dimensionsData.map((dim) => {
              const isActive = dim.id === currentDimension;
              return (
                <button
                  key={dim.id}
                  onClick={() => handleDimensionClick(dim.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left ${
                    isActive
                      ? 'border-cosmic-cyan bg-cosmic-cyan/15 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-cosmic-cyan">DIMENSION {dim.number}</span>
                    <div className="text-sm font-orbitron font-bold">{dim.name}</div>
                  </div>
                  <Sparkles className="w-4 h-4 text-cosmic-cyan" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="/resume.pdf"
              download="Yash_Pratap_Singh_Resume.pdf"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cosmic-gold to-amber-600 text-obsidian font-orbitron font-bold text-xs tracking-wider"
            >
              <Download className="w-4 h-4 text-obsidian" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="py-2.5 rounded-xl border border-slate-700 text-xs font-mono text-slate-400 hover:text-white"
            >
              REPLAY PROLOGUE INTRO
            </button>
          </div>
        </div>
      )}
    </>
  );
};

