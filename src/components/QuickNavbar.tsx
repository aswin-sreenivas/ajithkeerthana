import { useState, useEffect } from 'react';

export default function QuickNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('v12-hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = [
        'v12-hero',
        'v12-countdown',
        'v12-journey',
        'v12-events',
        'v12-gallery',
        'v12-videos',
        'guestbook-section',
      ];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isScrolled) return null;

  return (
    <nav
      aria-label="Quick Navigation"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[990] bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/10 px-3 md:px-5 py-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-[fade-in-up_0.3s_ease-out_forwards] flex items-center gap-1 sm:gap-2 select-none"
    >
      <button
        onClick={() => scrollTo('v12-hero')}
        className="text-[10px] sm:text-xs font-serif font-bold text-[#e2c092] hover:text-white px-2 py-1 transition-colors cursor-pointer"
      >
        A &amp; K
      </button>

      <div className="w-px h-3.5 bg-white/15 mx-0.5" />

      <button
        onClick={() => scrollTo('v12-events')}
        className={`text-[9px] sm:text-[11px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          activeSection === 'v12-events'
            ? 'text-white bg-[#7a0016] font-medium shadow-[0_0_10px_rgba(122,0,22,0.6)]'
            : 'text-[#a3a3a3] hover:text-white'
        }`}
      >
        Event
      </button>

      <button
        onClick={() => scrollTo('v12-journey')}
        className={`text-[9px] sm:text-[11px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          activeSection === 'v12-journey'
            ? 'text-white bg-[#7a0016] font-medium shadow-[0_0_10px_rgba(122,0,22,0.6)]'
            : 'text-[#a3a3a3] hover:text-white'
        }`}
      >
        Journey
      </button>

      <button
        onClick={() => scrollTo('v12-gallery')}
        className={`text-[9px] sm:text-[11px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          activeSection === 'v12-gallery'
            ? 'text-white bg-[#7a0016] font-medium shadow-[0_0_10px_rgba(122,0,22,0.6)]'
            : 'text-[#a3a3a3] hover:text-white'
        }`}
      >
        Photos
      </button>

      <button
        onClick={() => scrollTo('v12-videos')}
        className={`text-[9px] sm:text-[11px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          activeSection === 'v12-videos'
            ? 'text-white bg-[#7a0016] font-medium shadow-[0_0_10px_rgba(122,0,22,0.6)]'
            : 'text-[#a3a3a3] hover:text-white'
        }`}
      >
        Films
      </button>

      <button
        onClick={() => scrollTo('guestbook-section')}
        className={`text-[9px] sm:text-[11px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          activeSection === 'guestbook-section'
            ? 'text-white bg-[#7a0016] font-medium shadow-[0_0_10px_rgba(122,0,22,0.6)]'
            : 'text-[#a3a3a3] hover:text-white'
        }`}
      >
        Wishes
      </button>
    </nav>
  );
}
