export interface DimensionInfo {
  id: string;
  number: string;
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  atmosphere: string;
  colors: {
    primary: string;
    secondary: string;
    glow: string;
    accent: string;
  };
  icon: string;
}

export const dimensionsData: DimensionInfo[] = [
  {
    id: "origin",
    number: "01",
    name: "THE ORIGIN REALM",
    title: "Celestial Genesis & Identity",
    subtitle: "Where curiosity ignited the cosmic spark",
    tagline: "Cosmic mythology meets futuristic celestial architecture",
    atmosphere: "An enormous floating celestial civilization surrounded by galaxies, ancient futuristic temples, luminous waterfalls, and golden energy rings.",
    colors: {
      primary: "#ffd166",
      secondary: "#ff9e00",
      glow: "rgba(255, 209, 102, 0.5)",
      accent: "#ffffff"
    },
    icon: "Sun"
  },
  {
    id: "intelligence",
    number: "02",
    name: "THE INTELLIGENCE REALM",
    title: "The Neural Constellation",
    subtitle: "AI Civilization & Algorithmic Synapses",
    tagline: "Artificial intelligence megacity with living neural constellations",
    atmosphere: "Giant neural network structures, glowing computational cores, moving data streams, and holographic intelligence entities.",
    colors: {
      primary: "#9d4edd",
      secondary: "#7209b7",
      glow: "rgba(157, 78, 221, 0.5)",
      accent: "#00f0ff"
    },
    icon: "Brain"
  },
  {
    id: "data",
    number: "03",
    name: "THE DATA DIMENSION",
    title: "The Cosmic Ocean of Information",
    subtitle: "From Raw Entropy to Actionable Intelligence",
    tagline: "An infinite galaxy of living data and dynamic pipelines",
    atmosphere: "Floating dashboards, planetary data networks, illuminated ETL waterfalls, star schemas, and millions of moving particles.",
    colors: {
      primary: "#05d9e8",
      secondary: "#0077b6",
      glow: "rgba(5, 217, 232, 0.5)",
      accent: "#38bdf8"
    },
    icon: "Database"
  },
  {
    id: "engineering",
    number: "04",
    name: "THE CYBERNETIC FOUNDATION",
    title: "Software & System Architecture",
    subtitle: "Microservices, Distributed Systems & Resilient Infrastructure",
    tagline: "Alien technological civilization with colossal mechanical structures",
    atmosphere: "Energy bridges, interconnected servers, digital infrastructure, Docker clusters, and holographic control rooms.",
    colors: {
      primary: "#00f0ff",
      secondary: "#4cc9f0",
      glow: "rgba(0, 240, 255, 0.5)",
      accent: "#10b981"
    },
    icon: "Cpu"
  },
  {
    id: "projects",
    number: "05",
    name: "THE CREATION MULTIVERSE",
    title: "The Planetary Project Galaxy",
    subtitle: "Seven Unique Worlds of Engineering & Innovation",
    tagline: "Every project exists as its own interactive planetary world",
    atmosphere: "A massive interactive 3D galaxy with seven orbiting planetary civilizations waiting to be explored.",
    colors: {
      primary: "#f72585",
      secondary: "#7209b7",
      glow: "rgba(247, 37, 133, 0.6)",
      accent: "#ffd166"
    },
    icon: "Globe"
  },
  {
    id: "future",
    number: "06",
    name: "THE INFINITE FUTURE",
    title: "The Celestial Horizon",
    subtitle: "Achievements, Research, Credentials & Interdimensional Contact",
    tagline: "An enormous futuristic temple suspended above an infinite cosmic ocean",
    atmosphere: "Giant celestial gateway, floating golden structures, cosmic waterfalls, research archive, and a holographic contact portal.",
    colors: {
      primary: "#ffd166",
      secondary: "#00f0ff",
      glow: "rgba(255, 209, 102, 0.6)",
      accent: "#f72585"
    },
    icon: "Sparkles"
  }
];

