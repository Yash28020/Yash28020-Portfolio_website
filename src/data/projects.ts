export interface ProjectWorld {
  id: string;
  name: string;
  codename: string;
  category: string;
  planetTheme: {
    name: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    atmosphereColor: string;
    glowColor: string;
    textureType: 'cyber' | 'ice' | 'molten' | 'gas' | 'matrix' | 'quantum' | 'crystalline';
    size: number;
    orbitRadius: number;
    orbitSpeed: number;
  };
  description: string;
  keyAchievements: string[];
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  architectureDetails: {
    pipeline: string;
    dataScale: string;
    coreMechanism: string;
  };
}

export const projectsData: ProjectWorld[] = [
  {
    id: "dataops-command-center",
    name: "DATAOPS COMMAND CENTER",
    codename: "AURELIA-IX",
    category: "Data Engineering | Data Quality | Business Intelligence",
    planetTheme: {
      name: "Financial Intelligence Stronghold",
      description: "A giant financial intelligence world with data streams, holographic financial dashboards, and interconnected data-processing towers.",
      primaryColor: "#00f0ff",
      secondaryColor: "#0575e6",
      atmosphereColor: "#00f0ff",
      glowColor: "rgba(0, 240, 255, 0.7)",
      textureType: "cyber",
      size: 2.2,
      orbitRadius: 14,
      orbitSpeed: 0.008
    },
    description: "Built a robust enterprise data quality and reconciliation platform processing 1,050 operational and financial records across three monthly periods with rigorous audit trails.",
    keyAchievements: [
      "Implemented six automated data-quality validation rules.",
      "Automated financial reconciliation with ERP–General Ledger tolerance of ±$0.05.",
      "Built real-time executive KPI monitoring engine.",
      "Generated automated Excel MIS reports with six worksheets.",
      "Implemented star-schema-based analytical modelling."
    ],
    technologies: [
      "Python", "Pandas", "SQL", "PostgreSQL", "FastAPI", "SQLAlchemy", 
      "OpenPyXL", "Power BI", "DAX", "Power Query", "Docker", "Pytest"
    ],
    githubUrl: "https://github.com/Yash28020/DataOps-Command-Center",
    architectureDetails: {
      pipeline: "PostgreSQL -> FastAPI Engine -> Quality Validation Rules -> Star Schema -> Excel MIS & Power BI",
      dataScale: "1,050 audited records across quarterly tranches",
      coreMechanism: "Automated ERP-GL dual reconciliation ledger with variance alerts under ±$0.05"
    }
  },
  {
    id: "pitchiq-football-platform",
    name: "PITCHIQ — FOOTBALL INTELLIGENCE ANALYTICS PLATFORM",
    codename: "STADIA-PRIME",
    category: "Data Analytics | Data Warehousing | Sports Intelligence",
    planetTheme: {
      name: "Sports Intelligence Galaxy Stadium",
      description: "A futuristic football analytics stadium floating inside a sports galaxy, with holographic match statistics and glowing data arenas.",
      primaryColor: "#10b981",
      secondaryColor: "#047857",
      atmosphereColor: "#34d399",
      glowColor: "rgba(16, 185, 129, 0.7)",
      textureType: "matrix",
      size: 2.0,
      orbitRadius: 20,
      orbitSpeed: 0.006
    },
    description: "Transformed a flat football dataset into a high-performance dimensional star schema containing 230,554 match records spanning 25 years of global sporting history.",
    keyAchievements: [
      "Engineered an idempotent Python ETL pipeline.",
      "Created 12 SQL analytical views for advanced telemetry.",
      "Used SQL window functions for season rankings and running totals.",
      "Identified and fixed a subtle data-type issue affecting division lookups.",
      "Built high-impact Power BI dashboards with interactive team comparisons."
    ],
    technologies: [
      "Python", "Pandas", "PostgreSQL", "SQL", "Data Warehousing", 
      "ETL", "Window Functions", "Docker", "Power BI", "DAX"
    ],
    githubUrl: "https://github.com/Yash28020/PitchIQ-Football-Intelligence-Analytics-Platform",
    architectureDetails: {
      pipeline: "Flat 25-Year Match Data -> Idempotent Python ETL -> Star Schema Warehouse -> 12 Window-Function Views -> Power BI",
      dataScale: "230,554 match records across a quarter-century",
      coreMechanism: "Dimensional star schema with rolling cumulative metrics & dynamic rank partitions"
    }
  },
  {
    id: "smart-retail-platform",
    name: "SMART RETAIL INTELLIGENCE PLATFORM",
    codename: "MERIDIAN-COMMERCE",
    category: "Data Analytics | Retail Intelligence | Business Insights",
    planetTheme: {
      name: "Commercial Orbital Civilization",
      description: "A futuristic retail civilization with floating stores, customer-behaviour visualization, and holographic sales dashboards.",
      primaryColor: "#f59e0b",
      secondaryColor: "#d97706",
      atmosphereColor: "#fbbf24",
      glowColor: "rgba(245, 158, 11, 0.7)",
      textureType: "crystalline",
      size: 1.9,
      orbitRadius: 26,
      orbitSpeed: 0.005
    },
    description: "Processed more than 525K retail transactions through a multi-stage ETL workflow, transforming raw noisy commerce data into more than 399K clean, validated records.",
    keyAchievements: [
      "End-to-end data cleaning, anomaly purging, and transformation.",
      "Rigorous transactional data validation and deduplication.",
      "In-depth exploratory data analysis (EDA) across diverse consumer segments.",
      "Statistical hypothesis testing and revenue significance analysis.",
      "Customer purchasing-pattern analysis and seasonal sales trend forecasting."
    ],
    technologies: [
      "Python", "Pandas", "PostgreSQL", "SQL", "EDA", 
      "Data Visualization", "Business Intelligence", "NumPy"
    ],
    architectureDetails: {
      pipeline: "525K+ Raw POS Streams -> Anomaly Filtering & Deduplication -> 399K+ Clean Warehouse Records -> Segment Clustering",
      dataScale: "525,000+ raw transactions condensed to 399,000+ clean events",
      coreMechanism: "Statistical transaction cleansing with basket affinity and customer lifetime valuation"
    }
  },
  {
    id: "brewflow-crm-service",
    name: "BREWFLOW CUSTOMER MANAGEMENT SERVICE",
    codename: "NEBULA-BREW",
    category: "Full Stack Development | CRM | Machine Learning",
    planetTheme: {
      name: "Interconnected Commercial Nexus",
      description: "A futuristic commercial civilization with interconnected customer networks, AI prediction systems, and automated communication towers.",
      primaryColor: "#ec4899",
      secondaryColor: "#be185d",
      atmosphereColor: "#f472b6",
      glowColor: "rgba(236, 72, 153, 0.7)",
      textureType: "gas",
      size: 2.1,
      orbitRadius: 32,
      orbitSpeed: 0.004
    },
    description: "Developed an enterprise-ready customer relationship management platform featuring 14 REST API endpoints distributed across two decoupled microservices.",
    keyAchievements: [
      "Full customer lifecycle management from lead acquisition to retention.",
      "AI-powered predictive customer analytics and retention scoring.",
      "Machine learning churn prediction engine with automated alert triggers.",
      "Asynchronous email campaign and lead tracking pipeline.",
      "Microservice backend architecture with resilient token authentication."
    ],
    technologies: [
      "Python", "FastAPI", "React", "JavaScript", "PostgreSQL", 
      "REST APIs", "Microservices", "JWT", "Clerk", "Scikit-learn", 
      "Groq API", "Render", "Vercel"
    ],
    githubUrl: "https://github.com/Yash28020/BrewFlow-customer-management-service",
    architectureDetails: {
      pipeline: "React Client -> Clerk Auth / JWT -> FastAPI Dual Microservices -> PostgreSQL -> Scikit-learn ML Churn Core",
      dataScale: "14 Production API endpoints with asynchronous event workers",
      coreMechanism: "Microservice decoupling with ML churn classification and Groq LLM customer insights"
    }
  },
  {
    id: "nexus-career-platform",
    name: "NEXUS — CAREER INTELLIGENCE PLATFORM",
    codename: "SYNAPSE-HORIZON",
    category: "Frontend Engineering | Interactive Product Development",
    planetTheme: {
      name: "Constellation of Knowledge",
      description: "A magical futuristic knowledge planet with floating pathways, branching constellations, interactive gateways, and intelligent holographic interfaces.",
      primaryColor: "#8b5cf6",
      secondaryColor: "#6d28d9",
      atmosphereColor: "#a78bfa",
      glowColor: "rgba(139, 92, 246, 0.7)",
      textureType: "quantum",
      size: 2.0,
      orbitRadius: 38,
      orbitSpeed: 0.0035
    },
    description: "Built a career intelligence platform supporting four distinct career pathways through 26 modular, reusable React components and interactive spatial diagrams.",
    keyAchievements: [
      "Five-stage structured career journey visualization.",
      "Interactive goal-to-evidence progression tracking system.",
      "Algorithmic skill-gap analysis and requirement mapping.",
      "Personalized learning trajectory recommendations.",
      "Four experiment blueprints with responsive, accessible UI design."
    ],
    technologies: [
      "React", "JavaScript", "Three.js", "Framer Motion", "Tailwind CSS"
    ],
    architectureDetails: {
      pipeline: "User Skill Ingestion -> Pathway Matrix Engine -> Gap Calculation -> Dynamic 3D Progression Canvas",
      dataScale: "4 Career Pathways, 26 Reusable Architectural Components",
      coreMechanism: "Goal-to-evidence progression graphs powered by declarative motion & WebGL"
    }
  },
  {
    id: "ai-tender-platform",
    name: "AI-POWERED TENDER PLATFORM",
    codename: "AETHON-CENTRAL",
    category: "Multi-Agent AI | NLP | Intelligent Automation",
    planetTheme: {
      name: "Intergalactic Procurement Hub",
      description: "A gigantic AI-powered intergalactic trading and procurement civilization with five autonomous agent towers connected through luminous energy networks.",
      primaryColor: "#06b6d4",
      secondaryColor: "#0284c7",
      atmosphereColor: "#38bdf8",
      glowColor: "rgba(6, 182, 212, 0.7)",
      textureType: "cyber",
      size: 2.4,
      orbitRadius: 44,
      orbitSpeed: 0.003
    },
    description: "Architected a state-of-the-art five-agent AI procurement ecosystem for tender discovery, RFP extraction, SKU matching, competitive pricing, and regulatory compliance.",
    keyAchievements: [
      "Engineered 23 robust REST API endpoints across multi-agent coordinators.",
      "Automated extraction and processing of massive RFP documents exceeding 500 pages.",
      "Achieved 96% faster SKU mapping using hybrid semantic embeddings.",
      "Delivered 4.2x overall throughput improvement for procurement workflows.",
      "Reduced procurement response turn-around from one week to under one hour."
    ],
    technologies: [
      "Python", "React", "Node.js", "TypeScript", "Express.js", 
      "PostgreSQL", "Google Gemini API", "xAI Grok API", "Scikit-learn", 
      "Multi-Agent AI", "NLP", "TF-IDF", "Semantic Matching", "LLM Integration"
    ],
    githubUrl: "https://github.com/Yash28020/AI-Powered-Tender-Platform",
    architectureDetails: {
      pipeline: "500+ Page RFPs -> Multi-Agent Router -> Semantic SKU Engine (Gemini & Grok) -> Compliance Validator -> Automated Bid Output",
      dataScale: "500+ page contracts parsed in seconds across 23 endpoints",
      coreMechanism: "5 Autonomous cooperative agents: Discovery, Extractor, SKU Matcher, Pricing Engine, and Compliance Guard"
    }
  },
  {
    id: "riskforge-fraud-detection",
    name: "RISKFORGE — FRAUD DETECTION & EXPLAINABILITY PLATFORM",
    codename: "SENTINEL-ZERO",
    category: "Machine Learning | Fraud Detection | Explainable AI",
    planetTheme: {
      name: "Security Command Citadel",
      description: "A dark financial-security planet with glowing transaction streams, anomaly-detection radar, AI prediction cores, and a futuristic security command center.",
      primaryColor: "#ef4444",
      secondaryColor: "#991b1b",
      atmosphereColor: "#f87171",
      glowColor: "rgba(239, 68, 68, 0.8)",
      textureType: "molten",
      size: 2.3,
      orbitRadius: 50,
      orbitSpeed: 0.0025
    },
    description: "Developed and benchmarked industrial fraud detection models on high-imbalance datasets containing 284K+ transactions with a 0.17% extreme fraud rate.",
    keyAchievements: [
      "Benchmarked Logistic Regression, Random Forest, XGBoost, and LightGBM models.",
      "Conducted 30 hyperparameter optimization trials with Optuna.",
      "Achieved exceptional 0.878 PR-AUC with fine-tuned XGBoost.",
      "Improved PR-AUC by 21% over baseline heuristic models.",
      "Built a PyTorch autoencoder for unsupervised latent anomaly detection.",
      "Integrated SHAP values for granular transaction explainability.",
      "Configured automated experiment tracking and artifact lineage with MLflow."
    ],
    technologies: [
      "Python", "Scikit-learn", "XGBoost", "LightGBM", "PyTorch", 
      "Optuna", "SHAP", "MLflow", "Groq API", "FastAPI", "Streamlit"
    ],
    liveDemoUrl: "https://sentinelml-fraud-detection.streamlit.app/",
    architectureDetails: {
      pipeline: "284K+ Highly Imbalanced Streams -> PyTorch Autoencoder + XGBoost Ensemble -> Optuna HPO -> SHAP Interpretation Engine -> Streamlit Live Console",
      dataScale: "284,807 transactions with 0.17% positive class imbalance",
      coreMechanism: "Dual-layer detection: Deep reconstruction loss autoencoder coupled with tree ensemble and Shapley feature attribution"
    }
  }
];

