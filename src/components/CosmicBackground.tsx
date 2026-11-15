import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  currentDimension: string;
  isWarping?: boolean;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ currentDimension, isWarping = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulaRef = useRef<THREE.Points | null>(null);
  const portalRingsRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Dimension color accents
  const getDimensionColor = (dim: string) => {
    switch (dim) {
      case 'origin':
        return { primary: new THREE.Color(0xffd166), secondary: new THREE.Color(0xff9e00), fog: 0x05040a };
      case 'intelligence':
        return { primary: new THREE.Color(0x9d4edd), secondary: new THREE.Color(0x00f0ff), fog: 0x070414 };
      case 'data':
        return { primary: new THREE.Color(0x05d9e8), secondary: new THREE.Color(0x0077b6), fog: 0x030712 };
      case 'engineering':
        return { primary: new THREE.Color(0x00f0ff), secondary: new THREE.Color(0x10b981), fog: 0x040810 };
      case 'projects':
        return { primary: new THREE.Color(0xf72585), secondary: new THREE.Color(0x7209b7), fog: 0x080310 };
      case 'future':
        return { primary: new THREE.Color(0xffd166), secondary: new THREE.Color(0x00f0ff), fog: 0x06060f };
      default:
        return { primary: new THREE.Color(0x00f0ff), secondary: new THREE.Color(0x9d4edd), fog: 0x030308 };
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const initialColors = getDimensionColor(currentDimension);
    scene.fog = new THREE.FogExp2(initialColors.fog, 0.0012);

    // CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 250;
    cameraRef.current = camera;

    // RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // Clear previous children if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 1. MULTI-LAYER STAR FIELD (10,000 STARS)
    const starCount = 8000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x00f0ff),
      new THREE.Color(0x9d4edd),
      new THREE.Color(0xffd166),
      new THREE.Color(0x4cc9f0),
      new THREE.Color(0xf72585),
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Spherical distribution
      const radius = 100 + Math.random() * 1200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[idx] = color.r;
      starColors[idx + 1] = color.g;
      starColors[idx + 2] = color.b;

      starSizes[i] = Math.random() * 2.5 + 0.6;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    // Star point shader / material
    const starMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // 2. NEBULA CLOUD PARTICLES
    const nebulaCount = 1800;
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
      const idx = i * 3;
      const armAngle = (i % 3) * ((2 * Math.PI) / 3);
      const dist = Math.random() * 600 + 40;
      const spiral = dist * 0.008;

      nebulaPositions[idx] = Math.cos(armAngle + spiral) * dist + (Math.random() - 0.5) * 80;
      nebulaPositions[idx + 1] = (Math.random() - 0.5) * 120;
      nebulaPositions[idx + 2] = Math.sin(armAngle + spiral) * dist + (Math.random() - 0.5) * 80;

      const col = Math.random() > 0.5 ? initialColors.primary : initialColors.secondary;
      nebulaColors[idx] = col.r;
      nebulaColors[idx + 1] = col.g;
      nebulaColors[idx + 2] = col.b;
    }

    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 14,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);
    nebulaRef.current = nebula;

    // 3. DIMENSIONAL CELESTIAL GATEWAY RINGS
    const portalGroup = new THREE.Group();
    for (let r = 0; r < 4; r++) {
      const ringGeo = new THREE.TorusGeometry(180 + r * 70, 0.4 + r * 0.2, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? initialColors.primary : initialColors.secondary,
        transparent: true,
        opacity: 0.25 - r * 0.04,
        wireframe: true,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (r * Math.PI) / 8;
      ringMesh.rotation.y = (r * Math.PI) / 6;
      portalGroup.add(ringMesh);
    }
    scene.add(portalGroup);
    portalRingsRef.current = portalGroup;

    // MOUSE LISTENER FOR PARALLAX
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Parallax camera rotation
      if (cameraRef.current) {
        cameraRef.current.position.x = mouseRef.current.x * 25;
        cameraRef.current.position.y = mouseRef.current.y * 20;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Rotate star field
      if (starsRef.current) {
        starsRef.current.rotation.y = elapsedTime * 0.02;
        starsRef.current.rotation.x = elapsedTime * 0.008;
      }

      // Rotate nebula spiral
      if (nebulaRef.current) {
        nebulaRef.current.rotation.y = -elapsedTime * 0.03;
      }

      // Rotate portal rings
      if (portalRingsRef.current) {
        portalRingsRef.current.children.forEach((child, idx) => {
          child.rotation.z = elapsedTime * (0.05 + idx * 0.03) * (idx % 2 === 0 ? 1 : -1);
          child.rotation.y = Math.sin(elapsedTime * 0.2 + idx) * 0.2;
        });
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
    };
  }, []);

  // Update color theme and warp on dimension change
  useEffect(() => {
    if (!sceneRef.current || !nebulaRef.current || !portalRingsRef.current) return;
    const colors = getDimensionColor(currentDimension);
    sceneRef.current.fog = new THREE.FogExp2(colors.fog, isWarping ? 0.0005 : 0.0012);

    // Update portal ring colors
    portalRingsRef.current.children.forEach((child, idx) => {
      const mesh = child as THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;
      if (mesh.material) {
        mesh.material.color.set(idx % 2 === 0 ? colors.primary : colors.secondary);
      }
    });

    // Update nebula colors
    const geom = nebulaRef.current.geometry;
    const colorsAttr = geom.getAttribute('color') as THREE.BufferAttribute;
    if (colorsAttr) {
      for (let i = 0; i < colorsAttr.count; i++) {
        const col = i % 2 === 0 ? colors.primary : colors.secondary;
        colorsAttr.setXYZ(i, col.r, col.g, col.b);
      }
      colorsAttr.needsUpdate = true;
    }
  }, [currentDimension, isWarping]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
        isWarping ? 'scale-110 filter brightness-125' : 'scale-100 filter brightness-100'
      }`}
      style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
      aria-hidden="true"
    />
  );
};

