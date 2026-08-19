import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export const AudioWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioStatus, setAudioStatus] = useState('Tap for sound');
  const [audioMode, setAudioMode] = useState<'file' | 'synth'>('file');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Lazy Audio element setup with preload='none' to avoid blocking initial network
    const audio = new Audio('/user_audio.mp3');
    audio.loop = true;
    audio.preload = 'none';
    audioRef.current = audio;

    const onPlay = () => {
      setIsPlaying(true);
      setAudioStatus('Wedding Melody Playing');
      setAudioMode('file');
    };

    const onPause = () => {
      setIsPlaying(false);
      setAudioStatus('Music Paused');
    };

    const onError = () => {
      // If the audio file isn't available or fails, smoothly fallback to synthesizer
      setAudioMode('synth');
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
    };
  }, []);

  const playSynthesizer = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      audioContextRef.current.resume();

      const ctx = audioContextRef.current;
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 293.66, 329.63];
      let noteIdx = 0;

      const playNextNote = () => {
        if (!ctx || ctx.state !== 'running') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.6);

        noteIdx++;
      };

      playNextNote();
      if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
      oscIntervalRef.current = window.setInterval(playNextNote, 800);
      setIsPlaying(true);
      setAudioStatus('Ambient Melody');
    } catch {
      setIsPlaying(false);
      setAudioStatus('Tap to play');
    }
  };

  const stopSynthesizer = () => {
    if (oscIntervalRef.current) clearInterval(oscIntervalRef.current);
    if (audioContextRef.current) audioContextRef.current.suspend();
    setIsPlaying(false);
    setAudioStatus('Tap for sound');
  };

  const toggleAudio = () => {
    if (isPlaying) {
      if (audioMode === 'file' && audioRef.current) {
        audioRef.current.pause();
      } else {
        stopSynthesizer();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioMode === 'file') {
        audioRef.current.play().catch(() => {
          // If browser policy blocks file playback or file is missing, fallback to synth
          setAudioMode('synth');
          playSynthesizer();
        });
      } else {
        playSynthesizer();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <aside id="audio-widget-container" aria-label="Audio player controls" className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999] flex flex-col items-end">
      <div className="flex items-center gap-2">
        {isPlaying && (
          <button
            type="button"
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[#e2c092] flex items-center justify-center hover:bg-black transition-colors cursor-pointer shadow-lg outline-none"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}

        <button
          type="button"
          id="audio-toggle"
          onClick={toggleAudio}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:-translate-y-1 transition-transform outline-none overflow-hidden"
          title={isPlaying ? 'Pause music' : 'Play celebration melody'}
        >
          {/* Animated visualizer soundwave rings */}
          <div className={`absolute inset-0 bg-[#e2c092]/15 rounded-full animate-ping ${isPlaying && !isMuted ? 'opacity-100' : 'opacity-0'}`} />
          <div className="absolute inset-0 border border-white/5 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500" />

          <div className="relative z-10 text-[#e2c092] drop-shadow-md w-6 h-6 flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4">
                <span className="w-1 bg-[#e2c092] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                <span className="w-1 bg-[#e2c092] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-4" />
                <span className="w-1 bg-[#e2c092] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2" />
              </div>
            ) : (
              <Music className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </div>
        </button>
      </div>

      <p id="audio-status" className="mt-2.5 rounded-full border border-white/10 bg-black/75 px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-[#e2c092]/90 text-center backdrop-blur-sm shadow-md">
        {audioStatus}
      </p>
    </aside>
  );
};

export default AudioWidget;
