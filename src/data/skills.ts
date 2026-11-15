export interface SkillCategory {
  id: string;
  name: string;
  constellation: string;
  themeColor: string;
  glowColor: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    description: string;
    relatedProjects: string[];
    connections: string[];
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming Languages",
    constellation: "Cygnus Computational Matrix",
    themeColor: "#00f0ff",
    glowColor: "rgba(0, 240, 255, 0.6)",
    icon: "Code",
    description: "Core algorithmic foundations, procedural logic, and language runtimes powering backend services, machine learning models, and high-frequency analytical workflows.",
    skills: [
      {
        name: "Python",
        description: "Primary language for ML, data engineering, statistical modeling, and microservice APIs.",
        relatedProjects: ["DataOps Command Center", "RiskForge", "AI-Powered Tender Platform", "PitchIQ", "BrewFlow", "Smart Retail"],
        connections: ["Pandas", "PyTorch", "FastAPI", "Scikit-learn"]
      },
      {
        name: "SQL",
        description: "Complex relational queries, analytical window functions, star-schema modeling, and query optimization.",
        relatedProjects: ["PitchIQ", "DataOps Command Center", "Smart Retail", "BrewFlow"],
        connections: ["PostgreSQL", "ETL", "Data Warehousing"]
      },
      {
        name: "Java",
        description: "Object-oriented software design, enterprise system foundations, and data structures.",
        relatedProjects: ["LPU Foundations & DSA"],
        connections: ["Spring Boot", "Algorithms", "System Architecture"]
      },
      {
        name: "JavaScript",
        description: "Modern ES6+ asynchronous programming, interactive web interfaces, and runtime integration.",
        relatedProjects: ["Nexus Career Platform", "BrewFlow", "AI-Powered Tender Platform"],
        connections: ["React.js", "Node.js", "Three.js"]
      }
    ]
  },
  {
    id: "data-analytics",
    name: "Data Analytics & Engineering",
    constellation: "Hydra Data Streams",
    themeColor: "#05d9e8",
    glowColor: "rgba(5, 217, 232, 0.6)",
    icon: "Database",
    description: "Pipelines, statistical synthesis, exploratory data analysis, and idempotent data transformations handling raw and unstructured information.",
    skills: [
      {
        name: "Pandas",
        description: "Vectorized manipulation, multi-indexing, data cleaning, aggregation, and timeseries processing.",
        relatedProjects: ["DataOps Command Center", "PitchIQ", "Smart Retail", "RiskForge"],
        connections: ["NumPy", "Python", "EDA"]
      },
      {
        name: "NumPy",
        description: "High-performance N-dimensional array processing, matrix algebra, and mathematical operations.",
        relatedProjects: ["RiskForge", "Smart Retail"],
        connections: ["Pandas", "PyTorch", "Statistical Analysis"]
      },
      {
        name: "ETL Pipelines",
        description: "Automated extract, transform, and load workflows with idempotency and data validation checks.",
        relatedProjects: ["DataOps Command Center", "PitchIQ", "Smart Retail"],
        connections: ["PostgreSQL", "Data Warehouses", "FastAPI"]
      },
      {
        name: "EDA (Exploratory Data Analysis)",
        description: "Distribution inspection, anomaly detection, correlation analysis, and data profile generation.",
        relatedProjects: ["Smart Retail", "PitchIQ", "RiskForge"],
        connections: ["Matplotlib", "Seaborn", "Statistics"]
      },
      {
        name: "Advanced Excel",
        description: "Multi-sheet financial models, lookup functions, pivot tables, and automated workbook generation via OpenPyXL.",
        relatedProjects: ["DataOps Command Center"],
        connections: ["OpenPyXL", "KPI Dashboards"]
      },
      {
        name: "Statistical Analysis & Hypothesis Testing",
        description: "Parametric/non-parametric tests, p-value validation, distributions, and inferential analytics.",
        relatedProjects: ["Smart Retail", "RiskForge"],
        connections: ["NumPy", "Machine Learning", "EDA"]
      }
    ]
  },
  {
    id: "data-visualization",
    name: "Data Visualization & BI",
    constellation: "Orion Visual Luminary",
    themeColor: "#ffd166",
    glowColor: "rgba(255, 209, 102, 0.6)",
    icon: "PieChart",
    description: "Transforming dense numeric metrics into intuitive visual narratives, interactive dashboards, and executive reporting environments.",
    skills: [
      {
        name: "Power BI",
        description: "Enterprise dimensional modeling, interactive report authoring, and executive KPI telemetries.",
        relatedProjects: ["DataOps Command Center", "PitchIQ"],
        connections: ["DAX", "Power Query", "Star Schema"]
      },
      {
        name: "DAX & Power Query",
        description: "Formulating custom calculated measures, time-intelligence functions, and M-query ETL transforms.",
        relatedProjects: ["DataOps Command Center", "PitchIQ"],
        connections: ["Power BI", "SQL"]
      },
      {
        name: "Matplotlib & Seaborn",
        description: "Exploratory charts, violin plots, correlation heatmaps, ROC/PR curves, and statistical graphs.",
        relatedProjects: ["RiskForge", "Smart Retail"],
        connections: ["Python", "EDA", "SHAP"]
      },
      {
        name: "Data Storytelling & KPI Dashboards",
        description: "Synthesizing multi-metric business outcomes into clear, goal-driven visual interfaces.",
        relatedProjects: ["DataOps Command Center", "PitchIQ", "Smart Retail"],
        connections: ["Power BI", "Interactive Reporting"]
      }
    ]
  },
  {
    id: "ai-ml",
    name: "Machine Learning & AI",
    constellation: "Centaurus Neural Nexus",
    themeColor: "#9d4edd",
    glowColor: "rgba(157, 78, 221, 0.6)",
    icon: "Brain",
    description: "Predictive algorithms, deep neural representations, multi-agent autonomous systems, and explainable artificial intelligence.",
    skills: [
      {
        name: "PyTorch",
        description: "Deep learning frameworks, autoencoders for anomaly detection, tensor graphs, and latent space optimization.",
        relatedProjects: ["RiskForge"],
        connections: ["Autoencoders", "Anomaly Detection", "Python"]
      },
      {
        name: "Scikit-learn",
        description: "Supervised and unsupervised learning, pipelines, cross-validation, and classification models.",
        relatedProjects: ["RiskForge", "BrewFlow", "AI-Powered Tender Platform"],
        connections: ["Regression", "Clustering", "XGBoost"]
      },
      {
        name: "Agentic AI & Multi-Agent Systems",
        description: "Architecting autonomous agents with specialized roles: discovery, extraction, SKU matching, and compliance validation.",
        relatedProjects: ["AI-Powered Tender Platform"],
        connections: ["LLMs", "RAG", "Prompt Engineering"]
      },
      {
        name: "LLMs, RAG & NLP",
        description: "Prompt orchestration, document reasoning (Gemini & Grok APIs), semantic matching, and vector retrieval.",
        relatedProjects: ["AI-Powered Tender Platform", "BrewFlow"],
        connections: ["Semantic Matching", "TF-IDF", "FastAPI"]
      },
      {
        name: "Supervised & Unsupervised ML",
        description: "Regression, Random Forest, XGBoost, LightGBM, K-Means, and Optuna Bayesian optimization.",
        relatedProjects: ["RiskForge", "BrewFlow"],
        connections: ["Optuna", "MLflow", "SHAP"]
      },
      {
        name: "Explainable AI (SHAP)",
        description: "Shapley additive explanations for feature importance and transparency in safety-critical models.",
        relatedProjects: ["RiskForge"],
        connections: ["XGBoost", "PyTorch", "Model Governance"]
      }
    ]
  },
  {
    id: "platforms-tools",
    name: "Tools, Big Data & Cloud Platforms",
    constellation: "Cassiopeia Cloud Citadel",
    themeColor: "#f72585",
    glowColor: "rgba(247, 37, 133, 0.6)",
    icon: "Cloud",
    description: "Cloud infrastructure, distributed big-data clusters, version control, and containerization frameworks.",
    skills: [
      {
        name: "AWS & Azure Cloud",
        description: "Certified cloud fundamentals, compute, serverless workflows, cloud storage, and IAM security.",
        relatedProjects: ["AWS Cloud Practitioner Essentials", "Cloud Architecture"],
        connections: ["Docker", "REST APIs", "FastAPI"]
      },
      {
        name: "Git & GitHub",
        description: "Version control, branching strategies, collaborative PR workflows, and open-source release pipelines.",
        relatedProjects: ["All 7 GitHub Projects"],
        connections: ["CI/CD", "Docker"]
      },
      {
        name: "Apache Spark & Hadoop",
        description: "Distributed computing concepts, MapReduce paradigms, and big data transformations.",
        relatedProjects: ["Data Dimension Mastery"],
        connections: ["Data Warehousing", "ETL"]
      },
      {
        name: "Docker & Containerization",
        description: "Reproducible container environments, microservice packaging, and isolated deployment runtimes.",
        relatedProjects: ["DataOps Command Center", "PitchIQ"],
        connections: ["FastAPI", "PostgreSQL"]
      },
      {
        name: "REST APIs & Integration",
        description: "Designing stateless, secure, and performant RESTful contracts with JSON schemas and swagger documentation.",
        relatedProjects: ["BrewFlow", "AI-Powered Tender Platform", "DataOps Command Center"],
        connections: ["FastAPI", "PostgreSQL", "Node.js"]
      }
    ]
  },
  {
    id: "software-development",
    name: "Software & Web Engineering",
    constellation: "Pegasus Microservice Grid",
    themeColor: "#4cc9f0",
    glowColor: "rgba(76, 201, 240, 0.6)",
    icon: "Layers",
    description: "Full-stack development, modern frontend state systems, microservice backends, and in-memory caches.",
    skills: [
      {
        name: "FastAPI",
        description: "High-performance asynchronous Python web framework with Pydantic validation and automatic OpenAPI docs.",
        relatedProjects: ["DataOps Command Center", "BrewFlow", "RiskForge"],
        connections: ["Python", "PostgreSQL", "REST APIs"]
      },
      {
        name: "React.js",
        description: "Declarative component-driven interfaces, custom hooks, virtual DOM optimization, and modern SPA architecture.",
        relatedProjects: ["Nexus Career Platform", "BrewFlow", "AI-Powered Tender Platform"],
        connections: ["JavaScript", "Tailwind CSS", "Three.js"]
      },
      {
        name: "Node.js & Express.js",
        description: "Backend runtime for multi-agent microservices, asynchronous I/O, and API gateways.",
        relatedProjects: ["AI-Powered Tender Platform"],
        connections: ["JavaScript", "REST APIs"]
      },
      {
        name: "PostgreSQL & SQLAlchemy",
        description: "ACID compliant relational database, relational constraints, indices, and ORM abstractions.",
        relatedProjects: ["PitchIQ", "DataOps Command Center", "BrewFlow", "AI-Powered Tender Platform"],
        connections: ["SQL", "FastAPI"]
      },
      {
        name: "Spring Boot, Redis & Kafka",
        description: "Foundational exposure to enterprise microservice frameworks, message queues, and low-latency cache stores.",
        relatedProjects: ["System Architecture Dimension"],
        connections: ["Java", "Distributed Systems"]
      }
    ]
  },
  {
    id: "soft-skills",
    name: "Human & Engineering Mindset",
    constellation: "Phoenix Core Values",
    themeColor: "#ff9e00",
    glowColor: "rgba(255, 158, 0, 0.6)",
    icon: "Compass",
    description: "Essential interpersonal attributes, high-integrity decision making, creative problem-solving, and adaptability.",
    skills: [
      {
        name: "Problem Solving",
        description: "Deconstructing ambiguous computational challenges into structured, measurable sub-problems.",
        relatedProjects: ["RiskForge Fraud Defense", "AI Tender Document Parsing"],
        connections: ["Analytical Rigor", "Innovation"]
      },
      {
        name: "Creativity & Innovation",
        description: "Pioneering novel architectural approaches like multi-agent procurement and 6D immersive visual experiences.",
        relatedProjects: ["6D Multiverse Portfolio", "NexaSense AI"],
        connections: ["Design", "Frontend Engineering"]
      },
      {
        name: "Collaboration & Empathy",
        description: "Partnering seamlessly across cross-functional engineering teams, hackathon teammates, and stakeholders.",
        relatedProjects: ["Code-A-Hunt Hackathon", "BrewFlow"],
        connections: ["Communication", "Product Discovery"]
      },
      {
        name: "Adaptability & Integrity",
        description: "Quickly mastering cutting-edge toolchains, upholding strict data privacy, and ethical AI development.",
        relatedProjects: ["Explainable AI (SHAP)", "IJRTI Sustainability Research"],
        connections: ["Continuous Learning", "Ethics"]
      }
    ]
  }
];

