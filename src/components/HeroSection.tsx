import { WEDDING_DETAILS } from '../data/weddingData';

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('v12-countdown');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="v12-hero"
      className="relative w-full h-[100svh] bg-[#050505] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Deep glowing central vignette */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center" aria-hidden="true">
        <div className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#5e0011]/15 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      {/* Subtle background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,0,22,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Cinematic Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full max-w-5xl mx-auto">
        <p className="font-sans text-[10px] md:text-sm tracking-[0.5em] text-[#7a0016] uppercase mb-6 md:mb-8 font-medium animate-[fade-in-up_1.5s_ease-out_forwards]">
          The Union Of Two Souls
        </p>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#f5f5f5] leading-[1.08] tracking-tighter mix-blend-screen drop-shadow-[0_0_25px_rgba(94,0,17,0.6)] animate-[fade-in-up_1.8s_ease-out_0.3s_forwards]">
          {WEDDING_DETAILS.groomName}
          <span className="block text-[#7a0016] italic text-5xl md:text-7xl lg:text-8xl my-1 md:my-2 drop-shadow-[0_0_15px_rgba(122,0,22,0.9)]">
            &amp;
          </span>
          {WEDDING_DETAILS.brideName}
        </h1>

        <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#7a0016] to-transparent my-8 md:my-10 animate-[fade-in-up_2s_ease-out_0.6s_forwards]" />

        <p className="font-serif italic text-[#a3a3a3] text-lg md:text-xl lg:text-2xl max-w-xl animate-[fade-in-up_2s_ease-out_0.9s_forwards] px-4">
          &ldquo;{WEDDING_DETAILS.quote}&rdquo;
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll down to countdown"
        className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer group bg-transparent border-0 outline-none"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#a3a3a3] mb-3 group-hover:text-[#f5f5f5] transition-colors">
          Descend
        </span>
        <div className="w-px h-14 md:h-16 bg-gradient-to-b from-[#7a0016] to-transparent overflow-hidden relative">
          <div className="w-full h-full bg-[#f5f5f5] animate-[slide-up-fade_2s_ease-in-out_infinite]" />
        </div>
      </button>
    </section>
  );
}
