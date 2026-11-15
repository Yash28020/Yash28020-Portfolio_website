export interface AchievementItem {
  id: string;
  title: string;
  category: "Research Publication" | "Hackathon Finalist";
  issuer: string;
  date: string;
  description: string;
  highlightMetric: string;
  link?: string;
  icon: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: "Cloud" | "Data Engineering" | "AI & ML" | "Job Simulation" | "Computer Science Core";
  verificationUrl?: string;
  badgeType: "Certificate" | "Badge" | "Academic Credential";
  description: string;
  verified: boolean;
  skillsAcquired: string[];
}

export const achievementsData: AchievementItem[] = [
  {
    id: "ijrti-research-paper",
    title: "AI for Nature, Environment, and Sustainable Development",
    category: "Research Publication",
    issuer: "International Journal of Recent Technology and Engineering (IJRTI)",
    date: "June 2025",
    description: "Peer-reviewed research paper exploring intelligent machine learning frameworks for environmental monitoring, conservation analytics, and sustainable resource management.",
    highlightMetric: "Peer-Reviewed Published Paper",
    icon: "FileText"
  },
  {
    id: "code-a-hunt-hackathon",
    title: "Code-A-Hunt Hackathon Finalist",
    category: "Hackathon Finalist",
    issuer: "Lovely Professional University / Tech Community",
    date: "May 2024",
    description: "Ranked among the Top 10 Finalist teams nationwide for developing 'NexaSense' — an innovative AI-driven environmental sensing and intelligent alerting system.",
    highlightMetric: "Top 10 Finalist (Nationwide)",
    icon: "Award"
  }
];

export const certificationsData: CertificationItem[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    category: "Cloud",
    verificationUrl: "https://drive.google.com/file/d/1Dvm4heD--GW6m9HYEHPlrWqV-Hf5cb7G/view",
    badgeType: "Certificate",
    description: "Comprehensive understanding of AWS cloud concepts, security, architecture, pricing, and foundational services.",
    verified: true,
    skillsAcquired: ["AWS EC2", "S3", "IAM", "Cloud Architecture", "Serverless"]
  },
  {
    id: "oracle-data-platform",
    title: "Oracle Data Platform Foundation",
    issuer: "Oracle University",
    category: "Data Engineering",
    verificationUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=9230CE00CEC2070A18E9A03811E06950569C30966B4D982BC63033BBEE7ED5A9",
    badgeType: "Badge",
    description: "Certified proficiency in enterprise database management, data lakehouses, Autonomous Database systems, and cloud data pipelines.",
    verified: true,
    skillsAcquired: ["Oracle Cloud Infrastructure", "Autonomous Database", "Data Lakehouse", "SQL"]
  },
  {
    id: "iit-kharagpur-cloud",
    title: "Cloud Computing Certification",
    issuer: "IIT Kharagpur — NPTEL",
    category: "Cloud",
    verificationUrl: "https://drive.google.com/file/d/1rlPwbsoVh9f_PeOzX_fxcvPd7bxL6zsG/view",
    badgeType: "Certificate",
    description: "Rigorous academic certification on distributed systems, virtualization, hypervisors, cloud storage paradigms, and resource scheduling algorithms.",
    verified: true,
    skillsAcquired: ["Distributed Systems", "Virtualization", "Cloud Storage", "Resource Scheduling"]
  },
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte — Forage",
    category: "Job Simulation",
    verificationUrl: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_fmuhDnzptCdg4JraW_1759237194558_completion_certificate.pdf",
    badgeType: "Certificate",
    description: "Practical industry simulation in enterprise business telemetry, data forensic analysis, dashboard modeling, and executive presentation.",
    verified: true,
    skillsAcquired: ["Executive Telemetry", "Data Forensics", "Tableau/Power BI", "Client Delivery"]
  },
  {
    id: "oracle-ai-foundation",
    title: "Oracle AI Foundation Associate",
    issuer: "Oracle University",
    category: "AI & ML",
    badgeType: "Badge",
    description: "Foundational mastery of Artificial Intelligence paradigms, neural networks, computer vision, and machine learning life cycles.",
    verified: true,
    skillsAcquired: ["AI Concepts", "Neural Architectures", "Machine Learning Foundations"]
  },
  {
    id: "british-airways-data-science",
    title: "Data Science Job Simulation",
    issuer: "British Airways — Forage",
    category: "Job Simulation",
    badgeType: "Certificate",
    description: "Web scraping customer sentiment reviews, predictive booking classification with machine learning, and customer insights reporting.",
    verified: true,
    skillsAcquired: ["Customer Sentiment", "Predictive Modeling", "Feature Engineering", "Python"]
  },
  {
    id: "lpu-dsa-java",
    title: "Foundation and Data Structures Using Java",
    issuer: "Lovely Professional University",
    category: "Computer Science Core",
    badgeType: "Academic Credential",
    description: "Rigorous curriculum covering linear and non-linear data structures, asymptotic algorithmic complexity, graph theory, and dynamic programming.",
    verified: true,
    skillsAcquired: ["Data Structures", "Algorithms", "Java Core", "Memory Optimization"]
  }
];

