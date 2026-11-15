import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Globe, ExternalLink, ArrowLeft, ArrowRight, 
  Sparkles, CheckCircle, Database, ShieldCheck, Flame, Cpu, X
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { projectsData, ProjectWorld } from '../data/projects';
import { soundManager } from '../utils/audio';

interface CreationMultiverseProps {
  onWarpToDimension: (dimId: string) => void;
}

export const CreationMultiverse: React.FC<CreationMultiverseProps> = ({ onWarpToDimension }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<ProjectWorld | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<ProjectWorld | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetsGroupRef = useRef<THREE.Group | null>(null);
  const planetMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const animFrameIdRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const galaxyRotationRef = useRef<{ x: number; y: number }>({ x: 0.3, y: 0 });

  // Initialize Three.js 3D Galaxy with 7 Planetary Worlds
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = 520;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 45, 75);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Central Cosmic Core / Star
    const coreGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfff0aa,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Core Glow Corona
    const coronaGeo = new THREE.SphereGeometry(5.5, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xff7700,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    scene.add(coronaMesh);

    // Group for all planetary orbits
    const planetsGroup = new THREE.Group();
    scene.add(planetsGroup);
    planetsGroupRef.current = planetsGroup;

    // Build the 7 Planetary Worlds
    projectsData.forEach((project, idx) => {
      const { orbitRadius, size, primaryColor, atmosphereColor } = project.planetTheme;

      // 1. Orbital Ring
      const orbitGeo = new THREE.RingGeometry(orbitRadius - 0.1, orbitRadius + 0.1, 64);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(primaryColor),
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      });
      const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
      orbitRing.rotation.x = Math.PI / 2;
      planetsGroup.add(orbitRing);

      // 2. Planet Mesh with procedural material
      const planetGeo = new THREE.SphereGeometry(size, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(primaryColor),
        roughness: 0.4,
        metalness: 0.7,
        emissive: new THREE.Color(primaryColor),
        emissiveIntensity: 0.25,
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);

      // Starting orbital position spread
      const initialAngle = (idx / projectsData.length) * Math.PI * 2;
      planetMesh.position.x = Math.cos(initialAngle) * orbitRadius;
      planetMesh.position.z = Math.sin(initialAngle) * orbitRadius;
      planetMesh.userData = { id: project.id, angle: initialAngle, radius: orbitRadius, speed: project.planetTheme.orbitSpeed };

      // 3. Planetary Atmosphere Glow
      const atmoGeo = new THREE.SphereGeometry(size * 1.25, 24, 24);
      const atmoMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(atmosphereColor),
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
      });
      const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
      planetMesh.add(atmoMesh);

      // 4. Optional Planetary Ring for specific worlds
      if (idx === 0 || idx === 3 || idx === 5) {
        const ringGeo = new THREE.RingGeometry(size * 1.5, size * 2.2, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(primaryColor),
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        planetMesh.add(ringMesh);
      }

      planetsGroup.add(planetMesh);
      planetMeshesRef.current.set(project.id, planetMesh);
    });

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x222233, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffeedd, 3, 200);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Mouse drag rotation listeners
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      galaxyRotationRef.current.y += deltaX * 0.005;
      galaxyRotationRef.current.x += deltaY * 0.005;

      // Clamp vertical pitch
      galaxyRotationRef.current.x = Math.max(0.1, Math.min(Math.PI / 2.5, galaxyRotationRef.current.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      cameraRef.current.aspect = w / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();

      // Apply galaxy drag rotation
      if (planetsGroupRef.current) {
        planetsGroupRef.current.rotation.y = galaxyRotationRef.current.y;
        planetsGroupRef.current.rotation.x = galaxyRotationRef.current.x;

        // Auto-orbit planets
        planetMeshesRef.current.forEach((mesh) => {
          mesh.userData.angle += mesh.userData.speed;
          mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.radius;
          mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.radius;
          mesh.rotation.y += delta * 0.8;
        });
      }

      // Pulse central core
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 1;
      coreMesh.scale.set(pulse, pulse, pulse);
      coronaMesh.scale.set(pulse * 1.1, pulse * 1.1, pulse * 1.1);

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, []);

  // Enter Planet Environment
  const handleEnterPlanet = (planet: ProjectWorld) => {
    soundManager.playWarp();
    soundManager.playChime(660, 'triangle', 0.6);
    setSelectedPlanet(planet);
  };

  const handleReturnToGalaxy = () => {
    soundManager.playClick(520);
    setSelectedPlanet(null);
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 right-10 w-[700px] h-[700px] bg-cosmic-magenta/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-pink-500/30 text-pink-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Globe className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
            <span>DIMENSION 05 // THE CREATION MULTIVERSE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cinematic font-black tracking-wider text-slate-100 uppercase mb-4">
            THE PLANETARY PROJECT GALAXY
          </h2>

          <p className="max-w-2xl text-slate-400 font-mono text-sm leading-relaxed">
            Seven unique planetary civilizations orbiting a singular computational sun. Click and drag to orbit the galaxy, hover over worlds, and select any planet to enter its environment.
          </p>
        </div>

        {/* 3D Interactive Galaxy Canvas Container */}
        <div className="relative rounded-3xl cosmic-glass border border-pink-500/30 overflow-hidden shadow-[0_0_60px_rgba(247,37,133,0.15)] mb-8">
          <div ref={containerRef} className="w-full h-[450px] sm:h-[500px] cursor-grab active:cursor-grabbing" />

          {/* Overlay Galaxy HUD controls */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase bg-black/60 px-3 py-1.5 rounded-full border border-pink-500/30 backdrop-blur-md">
              ORBITAL GALAXY VIEW // DRAG TO ROTATE
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="text-[11px] font-mono text-slate-400 bg-black/60 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md hidden sm:block">
              {hoveredPlanet ? (
                <span className="text-white">
                  TARGET LOCKED: <span className="text-cosmic-cyan font-bold">{hoveredPlanet.name}</span> ({hoveredPlanet.codename})
                </span>
              ) : (
                <span>SELECT A PLANET ORBIT TO INITIATE DESCENT</span>
              )}
            </div>

            <div className="text-[11px] font-mono text-pink-300 bg-black/60 px-3 py-1.5 rounded-full border border-pink-500/30 backdrop-blur-md">
              7 PLANETARY WORLDS ACTIVE
            </div>
          </div>
        </div>

        {/* Quick Planet Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {projectsData.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => handleEnterPlanet(project)}
              onMouseEnter={() => {
                soundManager.playHover();
                setHoveredPlanet(project);
              }}
              onMouseLeave={() => setHoveredPlanet(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-pink-500/60 text-slate-300 hover:text-white font-mono text-xs tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.planetTheme.primaryColor }} />
              <span className="font-semibold">{project.name.split(' — ')[0]}</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">[{project.codename}]</span>
            </button>
          ))}
        </div>

        {/* Planetary Showcase Grid (All 7 Worlds) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => {
            return (
              <div
                key={project.id}
                className="group relative p-6 rounded-2xl cosmic-glass border border-slate-800 hover:border-pink-500/50 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(247,37,133,0.2)] hover:-translate-y-1"
              >
                <div>
                  {/* Planet Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: project.planetTheme.primaryColor, color: project.planetTheme.primaryColor }} />
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        WORLD 0{idx + 1} // {project.codename}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-pink-400 font-semibold">
                      {project.planetTheme.name}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-pink-300 transition-colors mb-2">
                    {project.name}
                  </h3>

                  {/* Category */}
                  <p className="text-xs font-mono text-cosmic-cyan mb-3">
                    {project.category}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Achievements Bullet Highlights */}
                  <div className="space-y-1.5 mb-4 border-l-2 border-slate-800 pl-3">
                    {project.keyAchievements.slice(0, 2).map((ach, aIdx) => (
                      <div key={aIdx} className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-snug">
                        <span className="text-pink-400">•</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleEnterPlanet(project)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-200 text-xs font-mono uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>ENTER PLANET</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-300" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Inspect Source on GitHub"
                      aria-label={`${project.name} GitHub Repository`}
                      className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Launch Live Sentinel Demo"
                      aria-label={`${project.name} Live Demo`}
                      className="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:text-emerald-100 hover:border-emerald-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PLANET ENVIRONMENTAL INSPECTION MODAL */}
        {selectedPlanet && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="planet-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/95 backdrop-blur-2xl animate-fade-in"
          >
            <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 md:p-8 rounded-3xl cosmic-glass border border-pink-500/40 shadow-[0_0_80px_rgba(247,37,133,0.3)]">
              {/* Modal Navigation Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <button
                  onClick={handleReturnToGalaxy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-pink-400 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>RETURN TO GALAXY</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: selectedPlanet.planetTheme.primaryColor }} />
                  <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                    ORBIT LOCKED: {selectedPlanet.codename}
                  </span>
                </div>

                <button
                  onClick={handleReturnToGalaxy}
                  aria-label="Close Planet Inspection Console"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Planet Identity Banner */}
              <div className="mt-6 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                    {selectedPlanet.planetTheme.name}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedPlanet.category}
                  </span>
                </div>

                <h2 id="planet-modal-title" className="text-2xl sm:text-4xl font-orbitron font-bold text-white mb-2">
                  {selectedPlanet.name}
                </h2>

                <p className="text-sm font-mono text-slate-300 italic mb-4">
                  &ldquo;{selectedPlanet.planetTheme.description}&rdquo;
                </p>

                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  {selectedPlanet.description}
                </p>
              </div>

              {/* Architecture & Telemetry Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 block mb-1">
                    TECHNICAL ARCHITECTURE FLOW
                  </span>
                  <p className="text-xs font-mono text-slate-200 leading-relaxed">
                    {selectedPlanet.architectureDetails.pipeline}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cosmic-cyan block mb-1">
                    DATA SCALE & BENCHMARK
                  </span>
                  <p className="text-xs font-mono text-cosmic-gold font-semibold mb-2">
                    {selectedPlanet.architectureDetails.dataScale}
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    CORE ENGINEERING MECHANISM
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedPlanet.architectureDetails.coreMechanism}
                  </p>
                </div>
              </div>

              {/* Key Achievements */}
              <div className="mb-6">
                <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
                  VERIFIED PRODUCTION MILESTONES & ACHIEVEMENTS:
                </h4>
                <div className="space-y-2">
                  {selectedPlanet.keyAchievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-2">
                  TECHNOLOGY STACK:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlanet.technologies.map(t => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-pink-950/60 border border-pink-500/30 text-xs font-mono text-pink-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Links Footer */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {selectedPlanet.githubUrl && (
                    <a
                      href={selectedPlanet.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-white text-white text-xs font-mono font-medium transition-all hover:scale-105"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>VIEW REPOSITORY ON GITHUB</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {selectedPlanet.liveDemoUrl && (
                    <a
                      href={selectedPlanet.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian text-xs font-orbitron font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    >
                      <span>LAUNCH LIVE STREAMLIT DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5 text-obsidian" />
                    </a>
                  )}
                </div>

                <button
                  onClick={handleReturnToGalaxy}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  ESC / RETURN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Warp to Dimension 6 */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onWarpToDimension('future')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cosmic-cyan text-obsidian font-orbitron font-bold text-xs tracking-wider uppercase transition-all hover:scale-105 shadow-[0_0_30px_rgba(247,37,133,0.4)] cursor-pointer"
          >
            <span>PROCEED TO DIMENSION 06: THE INFINITE FUTURE</span>
            <ArrowRight className="w-4 h-4 text-obsidian" />
          </button>
        </div>
      </div>
    </section>
  );
};
