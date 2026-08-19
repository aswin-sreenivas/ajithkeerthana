import React, { useEffect, useRef } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  topPercent: number;
  align: 'left' | 'right';
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2018',
    title: 'First Met',
    description: 'KMCT College — Where a serendipitous greeting sparked the beginning of an unforgettable chapter.',
    topPercent: 10,
    align: 'right',
  },
  {
    year: '2018',
    title: 'The Confession',
    description: 'Under starry skies, friendship blossomed into a deep, tender, and everlasting devotion.',
    topPercent: 35,
    align: 'left',
  },
  {
    year: '2019',
    title: 'The Proposal',
    description: "A whispered 'Yes' sealed with crimson roses, boundless laughter, and shared dreams.",
    topPercent: 60,
    align: 'right',
  },
  {
    year: 'AUGUST 2026',
    title: 'Forever Begins',
    description: 'Walking hand in hand toward the sacred mandap to begin our most cherished and sacred adventure.',
    topPercent: 85,
    align: 'left',
  },
];

export const JourneyTimeline: React.FC = () => {
  const pathActiveRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const journeyEl = document.getElementById('timeline-container');
          if (journeyEl && pathActiveRef.current) {
            const rect = journeyEl.getBoundingClientRect();
            const viewHeight = window.innerHeight * 0.75;
            const totalHeight = rect.height;
            let progress = (viewHeight - rect.top) / totalHeight;
            progress = Math.max(0, Math.min(1, progress));

            const totalLen = 3000;
            pathActiveRef.current.style.strokeDasharray = `${totalLen}`;
            pathActiveRef.current.style.strokeDashoffset = `${totalLen - progress * totalLen}`;

            const thresholds = [0.08, 0.32, 0.58, 0.82];
            thresholds.forEach((threshold, idx) => {
              const item = document.querySelector(`.timeline-item[data-index="${idx}"]`);
              const marker = document.getElementById(`marker-${idx}`);
              if (progress >= threshold) {
                item?.classList.remove('opacity-0', 'translate-y-8');
                item?.classList.add('opacity-100', 'translate-y-0');
                marker?.classList.remove('scale-0');
                marker?.classList.add('scale-100');
              }
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-24 md:py-36 w-full bg-[#050505] relative overflow-hidden" id="v12-journey">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        <div className="mb-16 text-center" id="journey-header">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.55em] text-[#a3a3a3] uppercase mb-4 block animate-pulse">
            Our Destiny
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#7a0016] tracking-tighter drop-shadow-[0_0_20px_rgba(122,0,22,0.8)]">
            The Journey
          </h2>
        </div>

        <div className="relative w-full h-[1200px] md:h-[1400px]" id="timeline-container">
          {/* Background blurred glow path */}
          <div className="absolute inset-0 flex justify-center opacity-20 filter blur-sm">
            <svg viewBox="0 0 400 1500" className="w-full h-full max-w-[400px]" preserveAspectRatio="none">
              <path
                d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200 C350,1400 50,1500 200,1500"
                fill="none"
                stroke="#5e0011"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Guide Track */}
          <div className="absolute inset-0 flex justify-center opacity-25">
            <svg viewBox="0 0 400 1500" className="w-full h-full max-w-[400px]" preserveAspectRatio="none">
              <path
                d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200 C350,1400 50,1500 200,1500"
                fill="none"
                className="stroke-white/20"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Active progress glowing stroke */}
          <div className="absolute inset-0 flex justify-center pointer-events-none z-10 filter drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]">
            <svg viewBox="0 0 400 1500" className="w-full h-full max-w-[400px]" preserveAspectRatio="none">
              <path
                ref={pathActiveRef}
                id="path-active"
                d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200 C350,1400 50,1500 200,1500"
                fill="none"
                stroke="#7a0016"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="3000"
                strokeDashoffset="3000"
              />
            </svg>
          </div>

          {/* Timeline Cards Container */}
          <div className="absolute inset-0 w-full max-w-[850px] mx-auto z-20">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isRight = event.align === 'right';
              return (
                <div
                  key={idx}
                  data-index={idx}
                  style={{ top: `${event.topPercent}%` }}
                  className={`timeline-item absolute w-[90%] md:w-[44%] flex flex-col group transition-all duration-700 opacity-0 translate-y-8 ${
                    isRight
                      ? 'right-[5%] md:right-0 pl-4 md:pl-8 items-start text-left'
                      : 'left-[5%] md:left-0 pr-4 md:pr-8 items-start md:items-end text-left md:text-right'
                  }`}
                >
                  {/* Connector lines on Desktop */}
                  {isRight ? (
                    <>
                      <div className="hidden md:block absolute top-[50%] w-12 h-[1px] bg-[#7a0016]/50 -left-12" />
                      <div
                        id={`marker-${idx}`}
                        className="absolute top-[50%] transform -translate-y-1/2 w-4 h-4 rounded-full bg-black border border-[#7a0016] shadow-[0_0_15px_rgba(122,0,22,1)] -left-[64px] hidden md:block scale-0 transition-transform duration-500"
                      >
                        <div className="w-full h-full bg-[#7a0016] rounded-full animate-ping opacity-60" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block absolute top-[50%] w-12 h-[1px] bg-[#7a0016]/50 -right-12" />
                      <div
                        id={`marker-${idx}`}
                        className="absolute top-[50%] transform -translate-y-1/2 w-4 h-4 rounded-full bg-black border border-[#7a0016] shadow-[0_0_15px_rgba(122,0,22,1)] -right-[64px] hidden md:block scale-0 transition-transform duration-500"
                      >
                        <div className="w-full h-full bg-[#7a0016] rounded-full animate-ping opacity-60" />
                      </div>
                    </>
                  )}

                  {/* Card Body */}
                  <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 md:p-8 rounded-sm border-l-2 border-[#7a0016] shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:shadow-[0_20px_50px_rgba(122,0,22,0.25)] transition-all duration-500 w-full">
                    <span className="inline-block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3] mb-2 opacity-80 group-hover:text-[#e2c092] transition-colors font-medium">
                      {event.year}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#f5f5f5] mb-3 group-hover:text-red-100 transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-sans tracking-wide text-[#a3a3a3] leading-relaxed text-xs md:text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
