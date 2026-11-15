export interface ProfileData {
  name: string;
  tagline: string;
  secondaryTagline: string;
  subtitle: string;
  role: string;
  institution: string;
  degree: string;
  duration: string;
  cgpa: string;
  about: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    phone: string;
  };
  journeyMilestones: {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    realm: string;
    icon: string;
  }[];
}

export const profileData: ProfileData = {
  name: "Yash Pratap Singh",
  tagline: "Beyond Space. Beyond Time. Beyond Imagination.",
  secondaryTagline: "One Mind. Infinite Possibilities.",
  subtitle: "AI / ML ENGINEER • DATA SCIENCE ENTHUSIAST • SOFTWARE DEVELOPER",
  role: "Computer Science Engineering Student | AI/ML & Data Science Enthusiast",
  institution: "Lovely Professional University",
  degree: "B.Tech in Computer Science Engineering",
  duration: "2023–2027",
  cgpa: "8.2/10",
  about: [
    "I am a Computer Science Engineering student passionate about building intelligent systems, data-driven solutions, and meaningful technology products. My interests span Artificial Intelligence, Machine Learning, Data Science, Software Engineering, and intelligent automation.",
    "I enjoy transforming complex problems into practical solutions through experimentation, engineering, analytical thinking, and continuous learning.",
    "My work combines data processing, machine learning, backend engineering, analytics, and interactive applications."
  ],
  contact: {
    email: "yashpratapsingh28020@gmail.com",
    github: "https://github.com/Yash28020",
    linkedin: "https://www.linkedin.com/in/yash-singh-/",
    phone: "+91 8279680144"
  },
  journeyMilestones: [
    {
      year: "2023",
      title: "Awakening at the Citadel of Computing",
      subtitle: "B.Tech CSE Matriculation at LPU",
      description: "Commenced formal computer science education at Lovely Professional University. Immersed in foundational algorithms, object-oriented design in Java, computational logic, and mathematics.",
      realm: "Origin Realm",
      icon: "Sparkles"
    },
    {
      year: "2024",
      title: "The Neural Awakening & Data Genesis",
      subtitle: "Hackathons, Machine Learning & Analytics",
      description: "Top 10 Finalist at Code-A-Hunt Hackathon with NexaSense AI. Mastered ETL architectures, statistical inference, predictive modeling, and scalable database systems.",
      realm: "Intelligence Realm",
      icon: "Cpu"
    },
    {
      year: "2025",
      title: "Published Research & Cloud Mastery",
      subtitle: "IJRTI Publication & Multi-Agent AI",
      description: "Authored research paper 'AI for Nature, Environment, and Sustainable Development' published in IJRTI. Acquired AWS Cloud Practitioner, Oracle Data Platform, and IIT Kharagpur certifications.",
      realm: "Creation Multiverse",
      icon: "BookOpen"
    },
    {
      year: "2026–2027",
      title: "Autonomous Agentic Horizons",
      subtitle: "Production Systems & Distributed Intelligence",
      description: "Architecting enterprise-scale fraud detection, procurement automation with 5 autonomous agents, and high-throughput data operations pipelines.",
      realm: "Infinite Future",
      icon: "Compass"
    }
  ]
};

