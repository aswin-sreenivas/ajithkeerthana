import React, { useState } from 'react';
import { WEDDING_IMAGES } from '../data/weddingData';

interface DynamicHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  drift: number;
  rot: number;
  scale: number;
}

const HEART_EMOJIS = ['❤️', '💖', '💕', '💓', '✨', '🌸', '💘'];

export const CoupleCard: React.FC<{
  imageSrc: string;
  alt: string;
  role: string;
  name: string;
}> = ({ imageSrc, alt, role, name }) => {
  const [dynamicHearts, setDynamicHearts] = useState<DynamicHeart[]>([]);

  const spawnHeartAt = (clientX: number, clientY: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newHeart: DynamicHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      drift: (Math.random() - 0.5) * 60,
      rot: (Math.random() - 0.5) * 50,
      scale: Math.random() * 0.4 + 0.8,
    };

    setDynamicHearts((prev) => [...prev.slice(-12), newHeart]);

    setTimeout(() => {
      setDynamicHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1700);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Math.random() > 0.25) return;
    spawnHeartAt(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      spawnHeartAt(touch.clientX, touch.clientY, e.currentTarget);
    }
  };

  const ambientHearts = [
    { left: '15%', delay: '0s', duration: '2.4s', drift: '-20px', rot: '-15deg', emoji: '💖' },
    { left: '40%', delay: '0.4s', duration: '2.8s', drift: '15px', rot: '20deg', emoji: '❤️' },
    { left: '65%', delay: '0.9s', duration: '2.2s', drift: '-10px', rot: '-10deg', emoji: '💕' },
    { left: '85%', delay: '1.3s', duration: '2.6s', drift: '25px', rot: '25deg', emoji: '✨' },
    { left: '30%', delay: '1.7s', duration: '2.5s', drift: '-18px', rot: '-18deg', emoji: '💓' },
    { left: '75%', delay: '2.0s', duration: '2.9s', drift: '12px', rot: '15deg', emoji: '🌸' },
  ];

  return (
    <div className="group relative flex flex-col items-center select-none">
      {/* Soft crimson ambient glow on hover */}
      <div className="absolute -inset-4 bg-red-800/20 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />

      {/* Main Image Frame Container */}
      <div
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        className="relative w-[180px] sm:w-[220px] md:w-[260px] bg-black/50 border border-white/10 backdrop-blur-md overflow-visible shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-700 group-hover:-translate-y-3 group-hover:border-red-900/60 group-hover:shadow-[0_30px_70px_rgba(122,0,22,0.35)] cursor-pointer rounded-sm"
      >
        <div className="relative w-full h-[260px] sm:h-[300px] md:h-[360px] overflow-hidden rounded-sm bg-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

          {/* Shimmer light sweep */}
          <div className="absolute -left-[120%] top-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:left-[140%] transition-all duration-[1800ms] z-20 pointer-events-none" />

          <img
            src={imageSrc}
            alt={alt}
            decoding="async"
            fetchPriority="high"
            width={260}
            height={360}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale-[12%] brightness-90 contrast-110 scale-100 transition-all duration-[1.5s] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
          />
        </div>

        {/* Hover Ambient Floating Hearts */}
        <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none overflow-hidden z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {ambientHearts.map((heart, idx) => (
            <span
              key={idx}
              className="absolute bottom-2 text-lg md:text-xl drop-shadow-[0_2px_8px_rgba(255,50,80,0.8)] pointer-events-none"
              style={{
                left: heart.left,
                animation: `float-heart-up ${heart.duration} ease-out infinite`,
                animationDelay: heart.delay,
                ['--heart-x' as string]: heart.drift,
                ['--heart-rot' as string]: heart.rot,
              }}
            >
              {heart.emoji}
            </span>
          ))}
        </div>

        {/* Dynamic Interactive Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-visible z-40">
          {dynamicHearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute text-xl pointer-events-none drop-shadow-[0_2px_10px_rgba(255,0,50,0.9)]"
              style={{
                left: heart.x,
                top: heart.y,
                transform: `scale(${heart.scale})`,
                animation: 'float-heart-up 1.6s ease-out forwards',
                ['--heart-x' as string]: `${heart.drift}px`,
                ['--heart-rot' as string]: `${heart.rot}deg`,
              }}
            >
              {heart.emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Card Caption */}
      <div className="mt-5 text-center z-30">
        <span className="block text-[9px] tracking-[0.45em] uppercase text-red-700 mb-2 font-sans group-hover:text-[#e2c092] transition-colors">
          {role}
        </span>
        <h3 className="text-white text-2xl md:text-4xl font-serif leading-none group-hover:text-red-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all">
          {name}
        </h3>
      </div>
    </div>
  );
};

export const CoupleSection: React.FC = () => {
  return (
    <section className="py-24 md:py-36 w-full bg-[#030303] relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[40vh] bg-red-900/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,0,0.08),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent opacity-60" />
      </div>

      <div className="mb-16 md:mb-20 text-center z-10">
        <span className="font-sans text-[10px] tracking-[0.6em] text-red-700 uppercase mb-5 block animate-pulse">
          The Couple
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
          Ajith
          <span className="text-red-800 mx-2 md:mx-4">&amp;</span>
          Keerthana
        </h2>
        <div className="flex items-center justify-center gap-3 mt-7">
          <div className="w-10 h-[1px] bg-red-900/50" />
          <div className="w-2 h-2 rounded-full bg-red-800" />
          <div className="w-10 h-[1px] bg-red-900/50" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap z-10 px-4">
        {/* Groom Card */}
        <CoupleCard
          imageSrc={WEDDING_IMAGES.groom || '/groom.jpg'}
          alt="Groom Ajith"
          role="Groom"
          name="Ajith"
        />

        {/* Bride Card */}
        <CoupleCard
          imageSrc={WEDDING_IMAGES.bride || '/bride.jpg'}
          alt="Bride Keerthana"
          role="Bride"
          name="Keerthana"
        />
      </div>
    </section>
  );
};

export default CoupleSection;
