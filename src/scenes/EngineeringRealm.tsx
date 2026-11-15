import React, { useState } from 'react';
import { 
  Cpu, Server, Database, Cloud, Container, GitBranch, 
  Layers, ArrowRight, ShieldCheck, Zap, Code2, Network
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EngineeringRealmProps {
  onWarpToDimension: (dimId: string) => void;
}

interface ArchComponent {
  id: string;
  name: string;
  category: string;
  icon: any;
  color: string;
  tech: string[];
  purpose: string;
  connectedTo: string[];
  implementationDetails: string;
  metrics: string;
}

export const EngineeringRealm: React.FC<EngineeringRealmProps> = ({ onWarpToDimension }) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('microservices');

  const components: ArchComponent[] = [
    {
      id: 'frontend',
      name: 'Interactive Frontend Matrix',
      category: 'Client & Visual State',
      icon: Layers,
      color: '#00f0ff',
      tech: ['React.js', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
      purpose: 'Delivers high-fidelity reactive user interfaces, 3D WebGL scenes, accessibility-compliant state management, and real-time dashboard telemetry.',
      connectedTo: ['gateway', 'microservices'],
      implementationDetails: 'Constructed 26 modular reusable components for Nexus Career Platform and real-time operational consoles.',
      metrics: 'Sub-60fps rendering, responsive DPR, zero layout shifts'
    },
    {
      id: 'gateway',
      name: 'Stateless REST API Gateway',
      category: 'API & Ingress Controller',
      icon: Network,
      color: '#4cc9f0',
      tech: ['FastAPI', 'Express.js', 'JWT Auth', 'Clerk', 'CORS'],
      purpose: 'Routes incoming client traffic to internal microservice endpoints, validates request payloads with Pydantic schemas, and manages authentication.',
      connectedTo: ['frontend', 'microservices', 'persistence'],
      implementationDetails: 'Engineered 14 REST endpoints in BrewFlow CRM and 23 endpoints across multi-agent tender workflows.',
      metrics: 'Asynchronous event loops, sub-50ms p95 latency'
    },
    {
      id: 'microservices',
      name: 'Distributed Microservices & Agentic AI',
      category: 'Core Business Logic',
      icon: Cpu,
      color: '#9d4edd',
      tech: ['Python', 'Node.js', 'Multi-Agent AI', 'Gemini API', 'Grok API'],
      purpose: 'Decoupled autonomous business domains: CRM campaign pipelines, 5-agent tender procurement orchestration, and automated financial reconciliations.',
      connectedTo: ['gateway', 'ml-inference', 'persistence', 'cloud'],
      implementationDetails: 'Created 5 autonomous cooperative agents (Discovery, RFP Extraction, SKU Matching, Pricing, and Compliance).',
      metrics: '4.2x throughput increase, response reduced from 1 week to <1 hr'
    },
    {
      id: 'ml-inference',
      name: 'Machine Learning & Anomaly Engine',
      category: 'Predictive Intelligence',
      icon: Zap,
      color: '#f72585',
      tech: ['PyTorch', 'Scikit-learn', 'XGBoost', 'LightGBM', 'SHAP', 'Optuna'],
      purpose: 'Runs unsupervised autoencoder anomaly detection on financial transactions, predicts customer churn probability, and interprets model decisions with Shapley values.',
      connectedTo: ['microservices', 'persistence'],
      implementationDetails: 'Trained and benchmarked on 284K+ transactions (0.17% fraud rate), 30 Optuna trials, 0.878 PR-AUC.',
      metrics: '+21% PR-AUC improvement over heuristic baselines'
    },
    {
      id: 'persistence',
      name: 'Relational Warehouse & Cache Store',
      category: 'Data Persistence',
      icon: Database,
      color: '#10b981',
      tech: ['PostgreSQL', 'SQLAlchemy', 'Redis', 'Star Schema', 'Window Functions'],
      purpose: 'Maintains strict ACID transactional guarantees, partitions 230K+ football matches across 25 years, and caches frequently accessed session states.',
      connectedTo: ['microservices', 'gateway'],
      implementationDetails: 'Engineered 12 analytical views with SQL window functions and ERP-GL tolerance balancing within ±$0.05.',
      metrics: '230,554 records indexed, 100% deterministic reconciliation'
    },
    {
      id: 'cloud',
      name: 'Cloud Infrastructure & Containers',
      category: 'DevOps & Deployment',
      icon: Cloud,
      color: '#ffd166',
      tech: ['Docker', 'AWS', 'Azure', 'Git / GitHub', 'Render', 'Vercel'],
      purpose: 'Packages backend microservices into immutable Docker containers, automates multi-environment deployments, and establishes reproducible CI/CD environments.',
      connectedTo: ['microservices', 'persistence'],
      implementationDetails: 'Certified AWS Cloud Practitioner & IIT Kharagpur Cloud Computing foundations; isolated containerized workflows.',
      metrics: 'Zero-downtime blue/green deployment strategy'
    }
  ];

  const selectedComp = components.find(c => c.id === selectedComponentId) || components[2];

  const handleSelect = (id: string) => {
    soundManager.playClick(680);
    setSelectedComponentId(id);
  };

  return (
    <section id="engineering" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cosmic-cyan/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-cosmic-cyan/30 text-cosmic-cyan font-mono text-xs uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5 text-cosmic-cyan animate-pulse" />
            <span>DIMENSION 04 // THE CYBERNETIC FOUNDATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cinematic font-black tracking-wider text-slate-100 uppercase mb-4">
            SYSTEM & SOFTWARE ARCHITECTURE
          </h2>

          <p className="max-w-2xl text-slate-400 font-mono text-sm leading-relaxed">
            An alien-inspired technological civilization of colossal mechanical structures, energy bridges, and holographic control rooms. Explore how services, APIs, databases, and neural models interconnect.
          </p>
        </div>

        {/* Interactive Architecture Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left: 6 Component Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono tracking-widest text-cosmic-cyan uppercase">
                DISTRIBUTED SYSTEM ARCHITECTURE TOPOLOGY
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                CLICK A SUBSYSTEM TO INSPECT CONNECTIONS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {components.map((comp) => {
                const Icon = comp.icon;
                const isSelected = selectedComponentId === comp.id;
                const isConnected = selectedComp.connectedTo.includes(comp.id);

                return (
                  <button
                    key={comp.id}
                    onClick={() => handleSelect(comp.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-cosmic-cyan bg-cyan-950/40 shadow-[0_0_25px_rgba(0,240,255,0.3)] scale-[1.02]'
                        : isConnected
                        ? 'border-purple-500/50 bg-purple-950/20 text-slate-200'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                          <Icon className="w-4 h-4" style={{ color: comp.color }} />
                        </div>
                        {isConnected && !isSelected && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            CONNECTED
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            ACTIVE NODE
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase">
                        {comp.category}
                      </span>
                      <h4 className="text-sm font-orbitron font-bold text-white mb-2">
                        {comp.name}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex flex-wrap gap-1">
                      {comp.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Architecture Flow Indicator */}
            <div className="p-4 rounded-xl cosmic-glass border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="text-cosmic-cyan font-bold">CURRENT TRACE:</span>
              <span className="text-slate-400 truncate max-w-md">
                Client Layer ➔ {selectedComp.name} ➔ [{selectedComp.connectedTo.join(' ➔ ')}]
              </span>
            </div>
          </div>

          {/* Right: Selected Subsystem Deep Dive (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl cosmic-glass border border-cosmic-cyan/40 shadow-2xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40">
                    <selectedComp.icon className="w-6 h-6" style={{ color: selectedComp.color }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-cosmic-cyan uppercase">
                      SUBSYSTEM SPECIFICATION
                    </span>
                    <h3 className="text-xl font-orbitron font-bold text-white">
                      {selectedComp.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      SYSTEM PURPOSE & ROLE
                    </span>
                    <p className="leading-relaxed">
                      {selectedComp.purpose}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      PRODUCTION IMPLEMENTATION DETAILS
                    </span>
                    <p className="leading-relaxed text-slate-300 font-mono text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      {selectedComp.implementationDetails}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      PERFORMANCE TELEMETRY & METRICS
                    </span>
                    <p className="font-mono text-xs text-cosmic-gold font-semibold">
                      {selectedComp.metrics}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      INTEGRATED TECHNOLOGIES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedComp.tech.map(t => (
                        <span key={t} className="px-2 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Warp to Project Galaxy */}
              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onWarpToDimension('projects')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cosmic-cyan to-blue-600 text-obsidian font-orbitron font-bold text-xs tracking-wider uppercase transition-all hover:scale-[1.02] shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer"
                >
                  <span>WARP TO PROJECT GALAXY (THE 7 WORLDS)</span>
                  <ArrowRight className="w-4 h-4 text-obsidian" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

