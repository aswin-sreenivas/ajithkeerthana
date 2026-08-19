import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from 'lucide-react';
import { DEFAULT_VIDEOS } from '../data/weddingData';
import { WeddingVideoItem } from '../types';

export const VideoSection: React.FC = () => {
  const videos: WeddingVideoItem[] = DEFAULT_VIDEOS;

  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideo = videos[activeVideoIdx] || videos[0];

  // Detect video embed type
  const getEmbedInfo = (url: string) => {
    if (!url) {
      return {
        type: 'direct',
        src: '',
      };
    }

    // YouTube
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );

    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      };
    }

    // Vimeo
    const vimeoMatch = url.match(
      /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^/]*\/videos\/|album\/(?:\d+\/)?video\/|video\/|)(\d+)/
    );

    if (vimeoMatch && vimeoMatch[1]) {
      return {
        type: 'vimeo',
        src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      };
    }

    // Direct video
    return {
      type: 'direct',
      src: url,
    };
  };

  const embedInfo = currentVideo
    ? getEmbedInfo(currentVideo.videoUrl)
    : {
        type: 'direct',
        src: '',
      };

  // Video playback listeners
  useEffect(() => {
    const video = videoRef.current;

    if (!video || embedInfo.type !== 'direct') {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [activeVideoIdx, embedInfo.type]);

  // Reset video when switching
  const handleSelectVideo = (idx: number) => {
    setActiveVideoIdx(idx);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Play / pause
  const togglePlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  // Mute / unmute
  const toggleMute = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) {
      return;
    }

    const time = Number(e.target.value);

    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Format time
  const formatTime = (secs: number) => {
    if (isNaN(secs)) {
      return '0:00';
    }

    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);

    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section
      id="v12-videos"
      className="py-24 md:py-36 w-full bg-[#050505] relative overflow-hidden border-t border-b border-white/5"
    >
      {/* Cinematic Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-red-950/20 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.55em] uppercase text-red-700 mb-3 block animate-pulse font-medium">
            Cinematic Highlights
          </span>

          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Wedding Films
          </h2>

          <p className="font-serif italic text-sm md:text-base text-[#a3a3a3] max-w-xl mx-auto mt-3">
            Immerse in the motion, laughter, and sacred melodies of our most cherished day.
          </p>
        </div>

        {/* Main Cinematic Theater Player */}
        {currentVideo && (
          <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.9)]">

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">

              {embedInfo.type === 'direct' ? (
                <>
                  {/* Main Video - NO POSTER / THUMBNAIL */}
                  <video
                    ref={videoRef}
                    src={currentVideo.videoUrl}
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;

                      if (!target.dataset.failed) {
                        target.dataset.failed = 'true';

                        target.src =
                          activeVideoIdx === 0
                            ? 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-and-hugging-42639-large.mp4'
                            : 'https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-on-their-wedding-day-walking-outdoors-42637-large.mp4';

                        target.load();
                      }
                    }}
                  />

                  {/* Big Center Play Button */}
                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#7a0016]/90 hover:bg-red-800 text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl cursor-pointer z-20 backdrop-blur-sm border border-white/20"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  )}

                  {/* Custom Controls Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-300 z-20">

                    {/* Scrubber */}
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#e2c092]"
                    />

                    <div className="flex items-center justify-between text-white text-xs">

                      <div className="flex items-center gap-3">

                        {/* Play / Pause */}
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="hover:text-[#e2c092] transition-colors cursor-pointer"
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-current" />
                          )}
                        </button>

                        {/* Mute */}
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="hover:text-[#e2c092] transition-colors cursor-pointer"
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-red-400" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>

                        {/* Time */}
                        <span className="text-[11px] font-mono text-[#a3a3a3]">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>

                      </div>

                      {/* Fullscreen */}
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="hover:text-[#e2c092] transition-colors cursor-pointer"
                        title="Fullscreen"
                        aria-label="Fullscreen"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                </>
              ) : (
                /* YouTube / Vimeo Embedded Iframe */
                <iframe
                  src={embedInfo.src}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}

            </div>

            {/* Video Description Caption */}
            <div className="p-4 sm:p-6 bg-[#0c0c0c] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">

              <div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mb-1">
                  {currentVideo.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#a3a3a3] font-sans">
                  {currentVideo.subtitle}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 2 Featured Videos Playlist Selector Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">

          {videos.map((vid, idx) => {
            const isSelected = idx === activeVideoIdx;

            return (
              <div
                key={vid.id}
                onClick={() => handleSelectVideo(idx)}
                className={`group relative p-3.5 sm:p-4 rounded-lg bg-black/60 border transition-all duration-300 cursor-pointer flex items-center gap-3.5 shadow-lg ${
                  isSelected
                    ? 'border-[#e2c092] ring-1 ring-[#e2c092]/60 bg-white/5'
                    : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                }`}
              >

                {/* Play Icon - NO THUMBNAIL */}
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black shrink-0 border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#e2c092] bg-[#7a0016]/40 text-[#e2c092]'
                      : 'border-white/10 text-white/80 group-hover:border-white/30 group-hover:text-white'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-1.5 mb-1">

                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#e2c092]">
                      Film {idx + 1}
                    </span>

                    {vid.duration && (
                      <span className="text-[10px] text-[#a3a3a3] font-mono">
                        • {vid.duration}
                      </span>
                    )}

                  </div>

                  <h4 className="text-xs sm:text-sm font-serif text-white font-medium truncate">
                    {vid.title}
                  </h4>

                  <p className="text-[11px] text-[#a3a3a3] font-sans truncate mt-0.5">
                    {vid.subtitle}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default VideoSection;