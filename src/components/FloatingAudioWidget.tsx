import { useState, useEffect, useRef } from 'react';
import { romanticAudio } from '../utils/audioEngine';

export default function FloatingAudioWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide tooltip after 8s or when user interacts
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);

    // Auto-listen to first page interaction to smoothly start romantic background audio
    const handleFirstUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });

    return () => {
      clearTimeout(tooltipTimer);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (isPlaying) {
      let currentAngle = 0;
      const animateProgress = () => {
        currentAngle = (currentAngle + 0.5) % 290;
        setProgress(currentAngle);
        animFrameRef.current = requestAnimationFrame(animateProgress);
      };
      animFrameRef.current = requestAnimationFrame(animateProgress);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    setShowTooltip(false);
    const active = romanticAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <div
      id="audio-widget-container"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999] flex flex-col items-center select-none"
    >
      <button
        id="audio-toggle"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Romantic Music'}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:-translate-y-1 transition-all duration-300 outline-none focus:outline-none overflow-hidden cursor-pointer"
      >
        {/* Rotating Visualizer Ring */}
        <svg className="absolute inset-0 w-full h-full text-[#e2c092]/40 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle
            className={`audio-progress transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            cx="50"
            cy="50"
            r="46"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="290"
            strokeDashoffset={290 - progress}
          />
        </svg>

        {/* Static Ambient Ring */}
        <div className="absolute inset-0 border border-white/10 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500 pointer-events-none" />

        {/* Pulse effect when playing */}
        {isPlaying && (
          <div
            id="audio-pulse"
            className="absolute inset-0 bg-[#e2c092]/20 rounded-full animate-ping pointer-events-none"
          />
        )}

        {/* Play / Pause Icon */}
        <div
          id="audio-icon"
          className="relative z-10 text-[#e2c092] drop-shadow-md w-4 h-4 flex items-center justify-center transition-transform group-hover:scale-110"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#f5f5f5]">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#e2c092]" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}
        </div>
      </button>

      {/* Tooltip badge */}
      {showTooltip && (
        <div
          id="audio-status"
          className="mt-3 rounded-full border border-white/10 bg-black/70 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-[#e2c092]/90 transition-opacity duration-300 text-center shadow-lg pointer-events-none"
        >
          {isPlaying ? 'Music playing' : 'Tap for sound'}
        </div>
      )}
    </div>
  );
}
