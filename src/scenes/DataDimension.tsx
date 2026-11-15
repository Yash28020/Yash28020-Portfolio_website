import React, { useState } from 'react';
import { 
  Database, GitCommit, Filter, BarChart3, LineChart, 
  ArrowRight, ShieldCheck, Activity, Layers, Cpu, CheckCircle2
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface DataDimensionProps {
  onWarpToDimension: (dimId: string) => void;
}

export const DataDimension: React.FC<DataDimensionProps> = ({ onWarpToDimension }) => {
  const [activePipelineStage, setActivePipelineStage] = useState<number>(0);
  const [activeSchemaTab, setActiveSchemaTab] = useState<'star-schema' | 'validation' | 'bi-kpis'>('star-schema');

  const pipelineStages = [
    {
      id: 0,
      title: "1. Raw Data Ingestion & Extraction",
      tag: "ETL GENESIS",
      tech: "Python • SQL • Pandas • Apache Spark",
      description: "Extracting high-volume transactional streams, flat match logs, and financial ERP records from heterogeneous distributed sources.",
      scale: "525K+ raw records & 230K+ sporting events",
      operation: "Idempotent extraction, connection pooling, chunked batch streaming."
    },
    {
      id: 1,
      title: "2. Data Quality & Rule Validation",
      tag: "PURIFICATION MATRIX",
      tech: "PostgreSQL • Pytest • SQLAlchemy",
      description: "Enforcing six rigorous data-quality validation rules, deduplication, anomaly thresholding, and financial ERP-to-GL tolerance within ±$0.05.",
      scale: "126K+ anomalies purged & variance zeroed",
      operation: "Schema compliance, null checks, referential foreign key integrity."
    },
    {
      id: 2,
      title: "3. Dimensional Modeling & Star Schema",
      tag: "WAREHOUSE FOUNDATION",
      tech: "PostgreSQL • Star Schema • Star Modeling",
      description: "Transforming flat relational tables into optimized dimensional models consisting of high-speed Fact tables and descriptive Dimension tables.",
      scale: "25-year time partitions & 12 analytical views",
      operation: "Surrogate keys, grain normalization, slowly changing dimensions (SCD)."
    },
    {
      id: 3,
      title: "4. Business Intelligence & Telemetry",
      tag: "DECISION ARCHITECTURE",
      tech: "Power BI • DAX • Advanced Excel • OpenPyXL",
      description: "Synthesizing millions of data points into interactive executive KPI dashboards, automated 6-worksheet MIS reports, and dynamic drill-downs.",
      scale: "100% automated MIS generation",
      operation: "DAX time-intelligence, window functions, running totals & rankings."
    },
    {
      id: 4,
      title: "5. Predictive Analytics & Machine Learning",
      tag: "INTELLIGENT HORIZONS",
      tech: "Scikit-learn • XGBoost • PyTorch • SHAP",
      description: "Feeding clean dimensional features into machine learning models for customer churn forecasting, fraud detection, and multi-agent procurement.",
      scale: "0.878 PR-AUC & 96% SKU match acceleration",
      operation: "Feature engineering, Optuna hyperparameter optimization, SHAP interpretability."
    }
  ];

  return (
    <section id="data" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-cosmic-turquoise/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-cosmic-turquoise/30 text-cosmic-turquoise font-mono text-xs uppercase tracking-widest mb-4">
            <Database className="w-3.5 h-3.5 text-cosmic-turquoise animate-pulse" />
            <span>DIMENSION 03 // THE DATA DIMENSION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cinematic font-black tracking-wider text-slate-100 uppercase mb-4">
            THE COSMIC OCEAN OF LIVING DATA
          </h2>

          <p className="max-w-2xl text-slate-400 font-mono text-sm leading-relaxed">
            Witness how raw entropy transforms into refined intelligence. From multi-stage idempotent ETL pipelines and star-schema warehouses to executive Power BI telemetry.
          </p>
        </div>

        {/* Dynamic Interactive Pipeline Stages */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono tracking-widest text-cosmic-turquoise uppercase">
              ETL TRANSFORMATION LIFE CYCLE
            </span>
            <span className="text-xs font-mono text-slate-400">
              STAGE {activePipelineStage + 1} OF 5
            </span>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {pipelineStages.map((stage, idx) => {
              const isActive = activePipelineStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    soundManager.playClick(600 + idx * 60);
                    setActivePipelineStage(idx);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'border-cosmic-turquoise bg-cosmic-turquoise/15 text-white shadow-[0_0_20px_rgba(5,217,232,0.3)] scale-[1.02]'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cosmic-turquoise block mb-1">
                      {stage.tag}
                    </span>
                    <span className="text-xs font-orbitron font-semibold text-slate-200 block truncate">
                      {stage.title.split('. ')[1]}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>STEP 0{idx + 1}</span>
                    {isActive && <Activity className="w-3 h-3 text-cosmic-turquoise animate-pulse" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Deep Dive Card */}
          {(() => {
            const curStage = pipelineStages[activePipelineStage];
            return (
              <div className="mt-4 p-6 sm:p-8 rounded-2xl cosmic-glass border border-cosmic-turquoise/40 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-cosmic-turquoise tracking-widest uppercase">
                      ACTIVE TRANSFORMATION PIPELINE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white mt-1">
                      {curStage.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
                      {curStage.tech}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      STAGE OBJECTIVE
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {curStage.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      RECORD SCALE & BENCHMARK
                    </span>
                    <p className="text-xs sm:text-sm text-cosmic-gold font-mono font-semibold">
                      {curStage.scale}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      INTERNAL MECHANICS
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                      {curStage.operation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Interactive Architecture Deep Dives: Star Schema / Validation / BI Dashboards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Diagram Explorer (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl cosmic-glass border border-slate-700/80 flex flex-col justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-6">
              <button
                onClick={() => {
                  soundManager.playClick(600);
                  setActiveSchemaTab('star-schema');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-orbitron tracking-wider transition-all cursor-pointer ${
                  activeSchemaTab === 'star-schema'
                    ? 'bg-cosmic-turquoise text-obsidian font-bold shadow-[0_0_15px_rgba(5,217,232,0.5)]'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                DIMENSIONAL STAR SCHEMA
              </button>
              <button
                onClick={() => {
                  soundManager.playClick(650);
                  setActiveSchemaTab('validation');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-orbitron tracking-wider transition-all cursor-pointer ${
                  activeSchemaTab === 'validation'
                    ? 'bg-cosmic-turquoise text-obsidian font-bold shadow-[0_0_15px_rgba(5,217,232,0.5)]'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                QUALITY RULES ENGINE
              </button>
              <button
                onClick={() => {
                  soundManager.playClick(700);
                  setActiveSchemaTab('bi-kpis');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-orbitron tracking-wider transition-all cursor-pointer ${
                  activeSchemaTab === 'bi-kpis'
                    ? 'bg-cosmic-turquoise text-obsidian font-bold shadow-[0_0_15px_rgba(5,217,232,0.5)]'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                BI KPI TELEMETRY
              </button>
            </div>

            {/* Tab 1: Star Schema Diagram */}
            {activeSchemaTab === 'star-schema' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cosmic-turquoise">
                    DATABASE MODEL: PITCHIQ & DATAOPS WAREHOUSE
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">STAR ARCHITECTURE</span>
                </div>

                {/* Star Schema Interactive Visual Map */}
                <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 relative">
                  {/* Central Fact Table */}
                  <div className="max-w-xs mx-auto p-4 rounded-xl bg-cyan-950/70 border-2 border-cosmic-turquoise text-center shadow-[0_0_25px_rgba(0,240,255,0.2)] mb-8">
                    <div className="text-[10px] font-mono text-cosmic-turquoise uppercase tracking-widest font-bold">
                      FACT TABLE
                    </div>
                    <div className="text-sm font-orbitron font-bold text-white">
                      Fact_Match_Telemetry
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 mt-2 space-y-0.5 text-left border-t border-cyan-800/60 pt-2">
                      <div>• match_id (PK)</div>
                      <div>• date_key (FK) • team_id (FK)</div>
                      <div>• goals_scored • expected_goals (xG)</div>
                      <div>• possession_pct • season_rank</div>
                    </div>
                  </div>

                  {/* Radiating Dimension Tables */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                      <div className="text-amber-400 font-bold mb-1">Dim_Date</div>
                      <div className="text-slate-400 text-[10px]">
                        date_key (PK)<br/>season, quarter, month, day_of_week
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                      <div className="text-purple-400 font-bold mb-1">Dim_Teams</div>
                      <div className="text-slate-400 text-[10px]">
                        team_id (PK)<br/>division, stadium, country, manager
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                      <div className="text-emerald-400 font-bold mb-1">Dim_Division</div>
                      <div className="text-slate-400 text-[10px]">
                        division_id (PK)<br/>tier_level, league_code, regulation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Quality Rules Engine */}
            {activeSchemaTab === 'validation' && (
              <div className="space-y-3 animate-fade-in">
                <div className="text-xs font-mono text-cosmic-turquoise mb-2">
                  DATAOPS COMMAND CENTER: 6 RIGOROUS INTEGRITY AUDIT RULES
                </div>
                {[
                  { rule: "RULE 1: ERP to GL Tolerance Check", test: "ABS(ERP_Balance - GL_Balance) <= $0.05", status: "PASS", tech: "FastAPI / SQLAlchemy" },
                  { rule: "RULE 2: Zero Null Key Enforcement", test: "NOT NULL on account_id, period_id, posting_date", status: "PASS", tech: "PostgreSQL Constraint" },
                  { rule: "RULE 3: Transaction Duplication Purge", test: "Hash fingerprinting over (ref_no, amount, timestamp)", status: "PASS", tech: "Pandas Vectorized" },
                  { rule: "RULE 4: Temporal Boundary Audit", test: "posting_date between FY_start and FY_end", status: "PASS", tech: "Pytest Suite" },
                  { rule: "RULE 5: Foreign Dimension Referencing", test: "Foreign key validation against Chart of Accounts", status: "PASS", tech: "Star Schema" },
                  { rule: "RULE 6: Outlier Anomaly Flagging", test: "Z-score > 3.5 on transaction deviations", status: "PASS", tech: "NumPy / Statistics" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-orbitron font-semibold text-white">{item.rule}</div>
                      <div className="text-[11px] font-mono text-slate-400">{item.test}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">{item.tech}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: BI KPIs Telemetry */}
            {activeSchemaTab === 'bi-kpis' && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-xs font-mono text-cosmic-turquoise mb-2">
                  POWER BI & EXECUTIVE MIS TELEMETRY
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">RECONCILIATION ACCURACY</div>
                    <div className="text-xl font-orbitron font-bold text-cosmic-cyan mt-1">99.98%</div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-1">±$0.05 Tolerance</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">DATASETS PROCESSED</div>
                    <div className="text-xl font-orbitron font-bold text-cosmic-gold mt-1">755K+</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">POS & Sports records</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">ANALYTICAL VIEWS</div>
                    <div className="text-xl font-orbitron font-bold text-cosmic-purple mt-1">12 Views</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">Window Functions</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">MIS REPORT SHEETS</div>
                    <div className="text-xl font-orbitron font-bold text-cosmic-magenta mt-1">6 Sheets</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">Automated OpenPyXL</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300">
                  <span className="text-cosmic-cyan font-bold">DAX Measure Formulation:</span> Rolling 5-year goal ratio, home advantage bias, and dynamic league rank partitions computed via SQL window functions (OVER PARTITION BY).
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Dimensional Integrity: 100% Validated</span>
              <span className="text-cosmic-turquoise">PostgreSQL • Power BI • DAX</span>
            </div>
          </div>

          {/* Right Column: Skills Matrix & Warp (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-6 rounded-2xl cosmic-glass border border-slate-700/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-900/40 border border-cyan-500/40">
                  <BarChart3 className="w-5 h-5 text-cosmic-turquoise" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    TECHNICAL INVENTORY
                  </span>
                  <h4 className="text-base font-orbitron font-bold text-white">
                    DATA ENGINEERING & BI STACK
                  </h4>
                </div>
              </div>

              {/* Exact skills mentioned in prompt */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Python", "SQL", "Pandas", "NumPy", "ETL", "EDA", 
                  "PostgreSQL", "Apache Spark", "Apache Hadoop", "Power BI", 
                  "Advanced Excel", "DAX", "Statistics", "Data Visualization"
                ].map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Transforming chaotic data streams into clean star schemas, deterministic validation pipelines, and business intelligence models that empower executive decision-making.
              </p>
            </div>

            {/* Quick Link to Project Dimension */}
            <div className="p-6 rounded-2xl cosmic-glass border border-slate-700/80 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cosmic-turquoise uppercase block mb-1">
                  DIMENSIONAL TRANSIT
                </span>
                <h4 className="text-lg font-orbitron font-bold text-white mb-2">
                  THE CYBERNETIC FOUNDATION
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Next: travel to the alien technological civilization where microservices, REST APIs, cloud infrastructure, Docker, and distributed backend systems are engineered.
                </p>
              </div>

              <button
                onClick={() => onWarpToDimension('engineering')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cosmic-turquoise to-blue-600 text-obsidian font-orbitron font-bold text-xs tracking-wider uppercase transition-all hover:scale-[1.02] shadow-[0_0_25px_rgba(5,217,232,0.4)] cursor-pointer"
              >
                <span>WARP TO CYBERNETIC FOUNDATION</span>
                <ArrowRight className="w-4 h-4 text-obsidian" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

