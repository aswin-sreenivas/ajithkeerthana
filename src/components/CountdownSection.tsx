import { useState, useEffect } from 'react';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DETAILS.targetDateTime).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0'),
        });
      } else {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName} Wedding`);
    const details = encodeURIComponent(
      `Join us in celebrating the holy matrimony of ${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName} at ${WEDDING_DETAILS.venue}, ${WEDDING_DETAILS.location}.`
    );
    const location = encodeURIComponent(`${WEDDING_DETAILS.venue}, ${WEDDING_DETAILS.location}`);
    // 20260823T110000 / 20260823T150000
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260823T053000Z/20260823T093000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ajith & Keerthana Wedding//EN',
      'BEGIN:VEVENT',
      'UID:wedding-ajith-keerthana-20260823@celebration',
      'DTSTAMP:20260818T000000Z',
      'DTSTART:20260823T053000Z',
      'DTEND:20260823T093000Z',
      `SUMMARY:${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName} Wedding`,
      `DESCRIPTION:Join us for the wedding of ${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName}`,
      `LOCATION:${WEDDING_DETAILS.venue}, ${WEDDING_DETAILS.location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Ajith_Keerthana_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="v12-countdown"
      className="py-24 md:py-36 w-full bg-[#030303] relative overflow-hidden ring-1 ring-white/5"
    >
      {/* Ambient dark red glow behind the timer */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0" aria-hidden="true">
        <div className="w-[80vw] h-[20vw] bg-[#7a0016]/15 rounded-[100%] blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <div id="countdown-header" className="mb-14 md:mb-18 text-center group cursor-default">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] text-[#a3a3a3] uppercase mb-4 block font-medium">
            The Beginning of Forever
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#f5f5f5] tracking-widest uppercase transition-colors duration-700 group-hover:text-[#7a0016] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            August 23. 2026
          </h2>
          <p className="font-sans text-xs tracking-widest text-[#e2c092]/80 uppercase mt-3">
            11:00 AM IST • North View Auditorium
          </p>
        </div>

        {/* Sleek Dark Timer Display */}
        <div
          id="countdown-timer"
          className="flex flex-wrap justify-center gap-6 md:gap-14 lg:gap-16 w-full max-w-5xl"
        >
          {/* Days */}
          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div
              id="cd-days"
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(122,0,22,0.8)] select-none"
            >
              {timeLeft.days}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016]/50 to-transparent my-3 md:my-4" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a3a3a3]">
              Days
            </span>
          </div>

          {/* Separator */}
          <div className="hidden md:flex flex-col items-center justify-start pt-6 text-4xl text-[#7a0016]/40 font-serif select-none">
            :
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div
              id="cd-hours"
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(122,0,22,0.8)] select-none"
            >
              {timeLeft.hours}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016]/50 to-transparent my-3 md:my-4" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a3a3a3]">
              Hours
            </span>
          </div>

          {/* Separator */}
          <div className="hidden md:flex flex-col items-center justify-start pt-6 text-4xl text-[#7a0016]/40 font-serif select-none">
            :
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div
              id="cd-minutes"
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(122,0,22,0.8)] select-none"
            >
              {timeLeft.minutes}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016]/50 to-transparent my-3 md:my-4" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#a3a3a3]">
              Mins
            </span>
          </div>

          {/* Separator */}
          <div className="hidden md:flex flex-col items-center justify-start pt-6 text-4xl text-[#7a0016]/40 font-serif select-none">
            :
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
            <div
              id="cd-seconds"
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#7a0016] tabular-nums transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_40px_rgba(122,0,22,1)] select-none"
            >
              {timeLeft.seconds}
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7a0016] to-transparent my-3 md:my-4 shadow-[0_0_10px_rgba(122,0,22,0.8)]" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#f5f5f5] drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
              Secs
            </span>
          </div>
        </div>

        {/* Quick Calendar Buttons */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleGoogleCalendar}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/5 border border-white/15 rounded-sm text-xs font-sans tracking-[0.2em] uppercase text-[#f5f5f5] hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[#e2c092]">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Add to Google Calendar
          </button>

          <button
            onClick={handleDownloadIcs}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-transparent border border-white/15 rounded-sm text-xs font-sans tracking-[0.2em] uppercase text-[#a3a3a3] hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download .ICS File
          </button>
        </div>
      </div>
    </section>
  );
}

