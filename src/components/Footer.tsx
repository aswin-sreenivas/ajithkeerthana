import React from 'react';
import { ChevronUp, Heart, ShieldCheck } from 'lucide-react';
import { WEDDING_IMAGES } from '../data/weddingData';

interface FooterProps {
  onOpenHostAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHostAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] w-full relative min-h-[90vh] md:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden border-t border-white/5 z-20" id="v8-footer">
      <div className="absolute inset-0 z-0">
        <img
          src={WEDDING_IMAGES.thankYou || '/thank.jpg'}
          alt="Thank You Background"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.3] contrast-125 transition-all duration-[2s] scale-100"
          id="footer-bg-img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]" />
      </div>

      <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center text-center my-auto py-16">
        <span className="font-sans text-[10px] md:text-xs tracking-[0.6em] text-red-600 uppercase mb-6 block animate-pulse">
          With Love &amp; Gratitude
        </span>

        <div className="overflow-hidden w-full flex justify-center mb-6">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-center leading-[0.9] tracking-tighter text-[#f5f5f5] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]" id="footer-text-1">
            THANK YOU
          </h2>
        </div>

        <div className="overflow-hidden w-full flex justify-center mb-6">
          <p className="font-serif italic text-xl md:text-3xl lg:text-4xl text-[#e2c092] drop-shadow-md" id="footer-text-2">
            for being part of our eternal story
          </p>
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#7a0016] to-transparent my-6" />

        <p className="font-sans text-[11px] md:text-xs tracking-[0.45em] text-[#f5f5f5]/80 uppercase mb-10" id="footer-subtitle">
          Ajith &amp; Keerthana
        </p>

        {/* Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#e2c092] text-xs font-sans uppercase tracking-[0.25em] hover:bg-[#7a0016] hover:text-white hover:border-[#7a0016] transition-all cursor-pointer shadow-lg group"
        >
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          Back to Top
        </button>
      </div>

      <div className="relative z-10 w-full px-6 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-sans tracking-[0.25em] text-white/50 gap-3 text-center bg-black/40 backdrop-blur-sm">
        <span>North View Auditorium, Pantheerpadam</span>

        {onOpenHostAdmin && (
          <button
            type="button"
            onClick={onOpenHostAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-[#e2c092]/80 hover:text-white hover:border-[#e2c092] hover:bg-[#7a0016]/40 transition-all cursor-pointer text-[9px] tracking-widest"
          >
            <ShieldCheck className="w-3 h-3 text-[#e2c092]" />
            Host Portal (RSVP Admin)
          </button>
        )}

        <span className="flex items-center gap-1">
          August 23, 2026 <Heart className="w-3 h-3 text-red-600 fill-red-600 inline ml-1" />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
