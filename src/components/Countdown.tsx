import React, { useEffect, useState } from 'react';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const target = new Date('2026-08-23T11:00:00').getTime();
    const pad = (n: number) => n.toString().padStart(2, '0');

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days: pad(d), hours: pad(h), minutes: pad(m), seconds: pad(s) });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-40 w-full bg-[#030303] relative overflow-hidden ring-1 ring-white/5" id="v12-countdown">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-[80vw] h-[20vw] bg-[#7a0016]/10 rounded-[100%] blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="mb-16 md:mb-20 text-center transition-all duration-1000 group cursor-default" id="countdown-header">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] text-[#a3a3a3] uppercase mb-4 block font-medium">
            The Beginning of Forever
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#f5f5f5] tracking-widest uppercase transition-colors duration-1000 group-hover:text-[#7a0016] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            August 23, 2026
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full max-w-5xl transition-all duration-1000" id="countdown-timer">
          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-transform duration-700 hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(122,0,22,0.8)] select-none">
              {timeLeft.days}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016]/50 to-transparent my-4" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a3a3a3]">Days</span>
          </div>

          <div className="hidden md:flex flex-col items-center justify-start pt-6 text-4xl text-[#7a0016]/30 font-serif select-none">:</div>

          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-transform duration-700 hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(122,0,22,0.8)] select-none">
              {timeLeft.hours}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016]/50 to-transparent my-4" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a3a3a3]">Hours</span>
          </div>

          <div className="hidden md:flex flex-col items-center justify-start pt-6 text-4xl text-[#7a0016]/30 font-serif select-none">:</div>

          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-transform duration-700 hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(122,0,22,0.8)] select-none">
              {timeLeft.minutes}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016]/50 to-transparent my-4" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a3a3a3]">Mins</span>
          </div>

          <div className="hidden md:flex flex-col items-center justify-start pt-6 text-4xl text-[#7a0016]/30 font-serif select-none">:</div>

          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-transform duration-700 hover:-translate-y-2 hover:drop-shadow-[0_0_40px_rgba(122,0,22,1)] select-none">
              {timeLeft.seconds}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016] to-transparent my-4 shadow-[0_0_10px_rgba(122,0,22,0.8)]" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#f5f5f5] drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Secs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
