import React, { useState } from 'react';
import { 
  GraduationCap, Award, Compass, Sparkles, BookOpen, 
  ChevronRight, ArrowRight, ShieldCheck, Flame
} from 'lucide-react';
import { profileData } from '../data/profile';
import { soundManager } from '../utils/audio';

interface OriginRealmProps {
  onWarpToDimension: (dimId: string) => void;
}

export const OriginRealm: React.FC<OriginRealmProps> = ({ onWarpToDimension }) => {
  const [activePillar, setActivePillar] = useState<'education' | 'journey' | 'learning' | 'innovation' | 'achievements'>('education');
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(0);

  const pillars = [
    {
      id: 'education',
      title: 'Academic Citadel',
      subtitle: 'Higher Engineering Foundation',
      icon: GraduationCap,
      color: '#ffd166',
      badge: 'B.Tech CSE • 8.2 CGPA',
      summary: 'Rigorous engineering foundations at Lovely Professional University, specializing in Artificial Intelligence, Machine Learning, and Enterprise Systems.'
    },
    {
      id: 'journey',
      title: 'Technical Evolution',
      subtitle: 'Genesis to High Scale',
      icon: Compass,
      color: '#00f0ff',
      badge: '2023 – 2027 Journey',
      summary: 'From low-level data structures in Java to distributed multi-agent systems, fraud detection models, and 230K+ record star-schema warehouses.'
    },
    {
      id: 'learning',
      title: 'Continuous Synthesis',
      subtitle: 'Adaptive Knowledge Mastery',
      icon: BookOpen,
      color: '#9d4edd',
      badge: 'Certified & Evolving',
      summary: 'Mastering modern cloud architectures (AWS & Oracle), distributed data pipelines (PostgreSQL & Docker), and cutting-edge LLM orchestration.'
    },
    {
      id: 'innovation',
      title: 'Creative Engineering',
      subtitle: 'Research & Applied AI',
      icon: Sparkles,
      color: '#f72585',
      badge: 'Peer-Reviewed Author',
      summary: 'Authored peer-reviewed environmental AI research published in IJRTI and engineered multi-agent autonomous tender processing architectures.'
    },
    {
      id: 'achievements',
      title: 'Hall of Laurels',
      subtitle: 'National Competitive Honors',
      icon: Award,
      color: '#10b981',
      badge: 'Top 10 Finalist',
      summary: 'Top 10 Finalist at Code-A-Hunt Hackathon with NexaSense AI, verified industry job simulation honors from Deloitte and British Airways.'
    }
  ];

  return (
    <section id="origin" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      {/* Dimension Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 via-yellow-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-10 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Dimension Title Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass-gold border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>DIMENSION 01 // THE ORIGIN REALM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cinematic font-black tracking-wider text-slate-100 uppercase mb-4">
            CELESTIAL CITADEL OF COMPUTATION
          </h2>

          <p className="max-w-2xl text-slate-400 font-mono text-sm leading-relaxed">
            Where curiosity sparked the dimensional voyage. An ancient-futuristic temple hovering between galaxies, documenting the educational genesis and engineering philosophy of Yash Pratap Singh.
          </p>
        </div>

        {/* Master Identity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Identity & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl cosmic-glass border border-amber-500/30 shadow-[0_0_40px_rgba(255,209,102,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <GraduationCap className="w-48 h-48 text-amber-300" />
              </div>

              {/* Bio Subtitle */}
              <div className="text-xs font-mono tracking-widest text-cosmic-gold uppercase mb-2">
                IDENTITY SPECIFICATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mb-2">
                YASH PRATAP SINGH
              </h3>
              <p className="text-sm font-mono text-slate-300 mb-6 flex flex-wrap items-center gap-2">
                <span className="text-cosmic-cyan font-semibold">B.Tech Computer Science Engineering</span>
                <span className="text-slate-600">•</span>
                <span>Lovely Professional University (2023–2027)</span>
              </p>

              {/* Verified CGPA Pill */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-200 mb-6">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-[10px] font-mono tracking-wider uppercase text-amber-300/80">
                    ACADEMIC ACCREDITATION
                  </div>
                  <div className="text-base font-orbitron font-black text-amber-300">
                    CGPA: 8.2 / 10.0
                  </div>
                </div>
              </div>

              {/* Exact About Me Quotation from Prompt */}
              <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed border-l-2 border-amber-500/40 pl-4 py-1">
                {profileData.about.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    &ldquo;{paragraph}&rdquo;
                  </p>
                ))}
              </div>

              {/* Action Warp to Projects */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  Focus: AI/ML • Data Science • Distributed Software
                </div>
                <button
                  onClick={() => onWarpToDimension('intelligence')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-mono uppercase tracking-wider transition-all hover:scale-105"
                >
                  <span>NEXT: INTELLIGENCE REALM</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>

            {/* Interactive 5 Celestial Pillars Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const isActive = activePillar === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => {
                      soundManager.playClick(600);
                      setActivePillar(pillar.id as any);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                      isActive
                        ? 'border-amber-400 bg-amber-500/20 shadow-[0_0_20px_rgba(255,209,102,0.3)] scale-105'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1.5" style={{ color: isActive ? pillar.color : undefined }} />
                    <span className="text-[11px] font-orbitron font-semibold tracking-wider text-slate-200 block truncate w-full">
                      {pillar.title.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 hidden sm:block">
                      {pillar.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Pillar Detail Card */}
            {(() => {
              const currentP = pillars.find(p => p.id === activePillar) || pillars[0];
              const Icon = currentP.icon;
              return (
                <div className="p-6 rounded-xl cosmic-glass border border-slate-700/60 animate-fade-in flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 shrink-0">
                    <Icon className="w-6 h-6" style={{ color: currentP.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-orbitron font-bold text-white">
                        {currentP.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300">
                        {currentP.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentP.summary}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right Column: Animated Chronological Journey Timeline (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl cosmic-glass border border-slate-700/80 shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                    CHRONOLOGICAL TRAJECTORY
                  </span>
                  <h3 className="text-lg font-orbitron font-bold text-white">
                    THE ENGINEERING JOURNEY
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  2023 – 2027
                </div>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-cosmic-purple before:to-cosmic-cyan">
                {profileData.journeyMilestones.map((milestone, idx) => {
                  const isSelected = selectedMilestone === idx;
                  return (
                    <div 
                      key={milestone.year}
                      onClick={() => {
                        soundManager.playClick(500 + idx * 80);
                        setSelectedMilestone(idx);
                      }}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        isSelected ? 'scale-[1.02]' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {/* Timeline Node Point */}
                      <span 
                        className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isSelected 
                            ? 'bg-amber-400 border-white shadow-[0_0_12px_rgba(255,209,102,0.9)]' 
                            : 'bg-slate-900 border-slate-600'
                        }`}
                      />

                      <div className={`p-4 rounded-xl border transition-all ${
                        isSelected 
                          ? 'border-amber-400/60 bg-amber-500/10 shadow-lg' 
                          : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {milestone.year}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {milestone.realm}
                          </span>
                        </div>

                        <h4 className="text-sm font-orbitron font-bold text-white mb-0.5">
                          {milestone.title}
                        </h4>
                        <p className="text-xs font-medium text-slate-300 mb-2">
                          {milestone.subtitle}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

