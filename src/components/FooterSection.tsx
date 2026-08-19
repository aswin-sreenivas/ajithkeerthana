import { WEDDING_IMAGES, WEDDING_DETAILS } from '../data/weddingData';

export default function FooterSection() {
  return (
    <footer
      id="v8-footer"
      className="bg-[#0a0a0a] w-full relative h-[100svh] flex flex-col items-center justify-center overflow-hidden border-t border-white/5 z-20 select-none"
    >
      {/* Dramatic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          id="footer-bg-img"
          src={WEDDING_IMAGES.thankYou}
          alt="Thank You Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.30] hover:brightness-[0.40] transition-all duration-[2s] scale-100"
        />

        {/* Gradient fades to blend the image perfectly with the dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0a0a0a]/60 to-[#050505] border-t border-white/10" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </div>

      {/* Centerpiece Content */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center h-full pointer-events-none mt-10 md:mt-16">
        {/* Massive Typography */}
        <div className="overflow-hidden w-full flex justify-center mb-4 md:mb-6">
          <h2
            id="footer-text-1"
            className="text-[16vw] md:text-[9.5vw] font-serif font-bold text-center leading-[0.85] tracking-tighter text-[#f5f5f5] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
          >
            THANK YOU
          </h2>
        </div>

        <div className="overflow-hidden w-full flex justify-center mb-6 md:mb-8">
          <p
            id="footer-text-2"
            className="font-serif italic text-xl sm:text-2xl md:text-5xl text-[#e2c092] tracking-wide drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            for being part of our story
          </p>
        </div>

        <p
          id="footer-subtitle"
          className="font-sans text-[10px] md:text-xs tracking-[0.5em] text-[#f5f5f5]/70 uppercase text-center"
        >
          {WEDDING_DETAILS.groomName} &amp; {WEDDING_DETAILS.brideName}
        </p>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] uppercase font-sans tracking-[0.3em] text-white/50 gap-4 z-20">
        <span>© 2026 {WEDDING_DETAILS.groomName} &amp; {WEDDING_DETAILS.brideName}</span>
        <span>
          {WEDDING_DETAILS.venue} {WEDDING_DETAILS.location} • {WEDDING_DETAILS.dateString}
        </span>
      </div>
    </footer>
  );
}
