import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Cpu, Network, Sparkles, ChevronRight, 
  ExternalLink, Layers, Terminal, Zap, Shield
} from 'lucide-react';
import { skillsData, SkillCategory } from '../data/skills';
import { soundManager } from '../utils/audio';

interface IntelligenceRealmProps {
  onWarpToDimension: (dimId: string) => void;
}

export const IntelligenceRealm: React.FC<IntelligenceRealmProps> = ({ onWarpToDimension }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>(skillsData[3]); // Default to AI & ML
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    description: string;
    relatedProjects: string[];
    connections: string[];
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Dynamic interactive Neural Matrix Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    // Generate neural nodes based on current selected skills
    const nodes = selectedCategory.skills.map((skill, index) => {
      const angle = (index / selectedCategory.skills.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.32;
      return {
        name: skill.name,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseX: width / 2 + Math.cos(angle) * radius,
        baseY: height / 2 + Math.sin(angle) * radius,
        radius: 18,
        pulse: Math.random() * Math.PI * 2,
        skill,
      };
    });

    // Central computational core node
    const coreNode = {
      x: width / 2,
      y: height / 2,
      pulse: 0,
      radius: 28,
    };

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render Synaptic Connections from Core to Skill Nodes
      coreNode.pulse += 0.04;
      const coreGlow = Math.sin(coreNode.pulse) * 0.3 + 0.7;

      // Central core gradient
      const coreGrad = ctx.createRadialGradient(coreNode.x, coreNode.y, 0, coreNode.x, coreNode.y, coreNode.radius * 2);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, selectedCategory.themeColor);
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(coreNode.x, coreNode.y, coreNode.radius * 2 * coreGlow, 0, Math.PI * 2);
      ctx.fill();

      // Core solid
      ctx.fillStyle = selectedCategory.themeColor;
      ctx.shadowBlur = 20;
      ctx.shadowColor = selectedCategory.themeColor;
      ctx.beginPath();
      ctx.arc(coreNode.x, coreNode.y, coreNode.radius * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw connection mesh between nodes
      nodes.forEach((node, i) => {
        // Subtle floating movement
        node.x = node.baseX + Math.sin(time + i) * 8;
        node.y = node.baseY + Math.cos(time + i * 1.5) * 8;

        // Draw line from Core to Node
        const isHovered = hoveredSkill?.name === node.name;
        ctx.strokeStyle = isHovered ? '#ffffff' : `${selectedCategory.themeColor}55`;
        ctx.lineWidth = isHovered ? 2.5 : 1.2;

        ctx.beginPath();
        ctx.moveTo(coreNode.x, coreNode.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();

        // Animated pulse packet traveling along line
        const packetT = (Math.sin(time * 2 + i) + 1) / 2;
        const px = coreNode.x + (node.x - coreNode.x) * packetT;
        const py = coreNode.y + (node.y - coreNode.y) * packetT;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inter-node secondary ring connections
        const nextNode = nodes[(i + 1) % nodes.length];
        ctx.strokeStyle = `${selectedCategory.themeColor}25`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.stroke();
      });

      // Render outer skill nodes
      nodes.forEach((node) => {
        const isHovered = hoveredSkill?.name === node.name;
        const r = isHovered ? node.radius * 1.25 : node.radius;

        // Outer glow
        const nodeGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 1.8);
        nodeGrad.addColorStop(0, isHovered ? '#ffffff' : selectedCategory.themeColor);
        nodeGrad.addColorStop(0.5, `${selectedCategory.themeColor}40`);
        nodeGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Node disc
        ctx.fillStyle = isHovered ? '#ffffff' : '#0a0818';
        ctx.strokeStyle = selectedCategory.themeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node label
        ctx.fillStyle = isHovered ? '#00f0ff' : '#f1f5f9';
        ctx.font = isHovered ? 'bold 12px "Orbitron", sans-serif' : '11px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + r + 16);
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedCategory, hoveredSkill]);

  const handleSelectCategory = (cat: SkillCategory) => {
    soundManager.playClick(650);
    setSelectedCategory(cat);
    setHoveredSkill(null);
  };

  return (
    <section id="intelligence" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 -left-20 w-[600px] h-[600px] bg-cosmic-purple/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cosmic-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Dimension Title Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass-purple border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Brain className="w-3.5 h-3.5 text-cosmic-purple animate-pulse" />
            <span>DIMENSION 02 // THE INTELLIGENCE REALM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cinematic font-black tracking-wider text-slate-100 uppercase mb-4">
            THE NEURAL MATRIX & SKILL CONSTELLATION
          </h2>

          <p className="max-w-2xl text-slate-400 font-mono text-sm leading-relaxed">
            A floating futuristic AI civilization where computational intelligence takes physical form. Explore interconnected synaptic constellations spanning Deep Learning, Multi-Agent systems, and Big Data.
          </p>
        </div>

        {/* Constellation Navigation Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {skillsData.map((cat) => {
            const isSelected = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className={`px-4 py-2.5 rounded-xl border font-mono text-xs tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-purple-400 bg-purple-950/70 text-white shadow-[0_0_20px_rgba(157,78,221,0.4)] scale-105'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.themeColor }} />
                <span className="font-semibold">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Neural Display Canvas & Info Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Canvas: The Living Neural Network Mesh (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl cosmic-glass-purple border border-purple-500/30 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 relative z-10">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cosmic-purple uppercase">
                  CONSTELLATION: {selectedCategory.constellation}
                </span>
                <h3 className="text-xl font-orbitron font-bold text-white">
                  {selectedCategory.name}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                {selectedCategory.skills.length} SYNAPSES ACTIVE
              </span>
            </div>

            {/* Neural Canvas */}
            <div className="relative flex-1 w-full h-full my-2">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Canvas Footer Instruction */}
            <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cosmic-cyan" />
                Hover or click any node to inspect project lineage
              </span>
              <span className="text-cosmic-purple">6D SYNAPTIC CORE</span>
            </div>
          </div>

          {/* Right Column: Interactive Node Details & Lineage (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Category Overview Card */}
            <div className="p-6 rounded-2xl cosmic-glass border border-slate-700/80">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/40">
                  <Network className="w-5 h-5 text-cosmic-purple" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    COMPUTATIONAL DOMAIN
                  </span>
                  <h4 className="text-base font-orbitron font-bold text-white">
                    {selectedCategory.name}
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>

            {/* Skill Node Grid Selector */}
            <div className="p-6 rounded-2xl cosmic-glass border border-slate-700/80 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-cosmic-cyan uppercase mb-3">
                  INTERACTIVE NODES
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategory.skills.map((skill) => {
                    const isHovered = hoveredSkill?.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onMouseEnter={() => {
                          soundManager.playHover();
                          setHoveredSkill(skill);
                        }}
                        onClick={() => {
                          soundManager.playClick(750);
                          setHoveredSkill(skill);
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                          isHovered
                            ? 'border-cosmic-cyan bg-cosmic-cyan/20 text-white font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:text-white'
                        }`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>

                {/* Inspected Node Detail Box */}
                {hoveredSkill ? (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cosmic-cyan/40 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-orbitron font-bold text-cosmic-cyan">
                        {hoveredSkill.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        INSPECTED NODE
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                      {hoveredSkill.description}
                    </p>

                    {/* Related Projects */}
                    {hoveredSkill.relatedProjects.length > 0 && (
                      <div className="mb-2">
                        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block mb-1">
                          PRODUCTION PROJECT IMPLEMENTATIONS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {hoveredSkill.relatedProjects.map((p) => (
                            <span
                              key={p}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-200 border border-purple-500/30"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interconnected Tech */}
                    {hoveredSkill.connections.length > 0 && (
                      <div>
                        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block mb-1">
                          SYNAPTIC CONNECTIONS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {hoveredSkill.connections.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-200 border border-cyan-500/30"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border border-dashed border-slate-800 text-center text-slate-500 text-xs font-mono">
                    Select or hover any skill node above to reveal its architecture, production project connections, and technological lineage.
                  </div>
                )}
              </div>

              {/* Warp Action */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Ready to witness the data ocean?
                </span>
                <button
                  onClick={() => onWarpToDimension('data')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-mono uppercase tracking-wider transition-all hover:scale-105"
                >
                  <span>NEXT: DATA DIMENSION</span>
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

