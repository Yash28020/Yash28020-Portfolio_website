import React, { useState, useEffect, useRef } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { IntroSequence } from './components/IntroSequence';
import { HUD } from './components/HUD';
import { OriginRealm } from './scenes/OriginRealm';
import { IntelligenceRealm } from './scenes/IntelligenceRealm';
import { DataDimension } from './scenes/DataDimension';
import { EngineeringRealm } from './scenes/EngineeringRealm';
import { CreationMultiverse } from './scenes/CreationMultiverse';
import { InfiniteFuture } from './scenes/InfiniteFuture';
import { soundManager } from './utils/audio';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') === 'true';
    }
    return false;
  });

  const [currentDimension, setCurrentDimension] = useState<string>('origin');
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  // Dimensional warp function
  const handleWarpToDimension = (dimId: string) => {
    setIsWarping(true);
    soundManager.playWarp();
    setCurrentDimension(dimId);

    const targetElement = document.getElementById(dimId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsWarping(false);
    }, 850);
  };

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleReplayIntro = () => {
    sessionStorage.removeItem('hasSeenIntro');
    setHasEntered(false);
  };

  // Scroll spy to sync HUD with currently visible dimension
  useEffect(() => {
    if (!hasEntered) return;

    const dimensionIds = ['origin', 'intelligence', 'data', 'engineering', 'projects', 'future'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (const id of dimensionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentDimension(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  // Keyboard shortcut listener (1 to 6 to warp, M to toggle sound)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toLowerCase();
      if (key === 'm') {
        handleToggleSound();
      } else if (key === '1') {
        handleWarpToDimension('origin');
      } else if (key === '2') {
        handleWarpToDimension('intelligence');
      } else if (key === '3') {
        handleWarpToDimension('data');
      } else if (key === '4') {
        handleWarpToDimension('engineering');
      } else if (key === '5') {
        handleWarpToDimension('projects');
      } else if (key === '6') {
        handleWarpToDimension('future');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian text-slate-100 selection:bg-cosmic-cyan/30 selection:text-white">
      {/* 3D Cosmic Starfield & Gateway Rings */}
      <CosmicBackground currentDimension={currentDimension} isWarping={isWarping} />

      {/* Cinematic Prologue Sequence */}
      {!hasEntered ? (
        <IntroSequence
          onComplete={() => {
            setHasEntered(true);
            setCurrentDimension('origin');
          }}
          onExploreWork={() => {
            setHasEntered(true);
            setTimeout(() => handleWarpToDimension('projects'), 100);
          }}
        />
      ) : (
        <>
          {/* Persistent Futuristic HUD */}
          <HUD
            currentDimension={currentDimension}
            onSelectDimension={handleWarpToDimension}
            onReplayIntro={handleReplayIntro}
            isMuted={isMuted}
            onToggleSound={handleToggleSound}
          />

          {/* Main 6-Dimension Multiverse Canvas */}
          <main className="relative z-10">
            {/* Dimension 01: The Origin Realm */}
            <OriginRealm onWarpToDimension={handleWarpToDimension} />

            {/* Dimension 02: The Intelligence Realm */}
            <IntelligenceRealm onWarpToDimension={handleWarpToDimension} />

            {/* Dimension 03: The Data Dimension */}
            <DataDimension onWarpToDimension={handleWarpToDimension} />

            {/* Dimension 04: The Cybernetic Foundation */}
            <EngineeringRealm onWarpToDimension={handleWarpToDimension} />

            {/* Dimension 05: The Creation Multiverse (The 7 Project Worlds) */}
            <CreationMultiverse onWarpToDimension={handleWarpToDimension} />

            {/* Dimension 06: The Infinite Future */}
            <InfiniteFuture />
          </main>
        </>
      )}
    </div>
  );
};
export default App;

