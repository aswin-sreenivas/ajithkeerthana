import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[100svh] bg-[#050505] flex items-center justify-center overflow-hidden" id="v12-hero">
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#5e0011]/20 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pt-10 pb-28 md:pb-32">
        <p className="font-sans text-[10px] md:text-sm tracking-[0.5em] text-[#7a0016] uppercase mb-6 md:mb-8 animate-fade-in-up font-medium">
          The Union Of Two Souls
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#f5f5f5] leading-[1.1] tracking-tighter mix-blend-screen drop-shadow-[0_0_20px_rgba(94,0,17,0.5)] animate-fade-in-up">
          Ajith
          <span className="block text-[#7a0016] italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl my-1 md:my-2 drop-shadow-[0_0_15px_rgba(122,0,22,0.8)]">&amp;</span>
          Keerthana
        </h1>
        <div className="w-20 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#7a0016] to-transparent my-6 md:my-8 animate-fade-in-up" />
        <p className="font-serif italic text-[#a3a3a3] text-base md:text-xl lg:text-2xl max-w-xl animate-fade-in-up px-2">
          &quot;Two hearts united beneath the blessings of our families.&quot;
        </p>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById('v12-countdown')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-4 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 group cursor-pointer outline-none transition-transform hover:translate-y-0.5"
        aria-label="Scroll down to countdown"
      >
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[#a3a3a3] group-hover:text-[#e2c092] transition-colors mb-2">
          Scroll Down
        </span>
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-[#7a0016] via-[#e2c092]/40 to-transparent overflow-hidden relative">
          <div className="w-full h-full bg-[#f5f5f5] animate-slide-up-fade" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
