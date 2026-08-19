import { useState } from 'react';
import { WEDDING_DETAILS } from '../data/weddingData';
import InvitationModal from './InvitationModal';

export default function EventDetailsSection() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    const fullAddress = `${WEDDING_DETAILS.venue}, ${WEDDING_DETAILS.location}`;
    navigator.clipboard.writeText(fullAddress).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    });
  };

  return (
    <section id="v12-events" className="py-24 md:py-36 w-full bg-[#050505] relative overflow-hidden">
      {/* Animated Soft Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#7a0016]/10 blur-[100px] animate-[pulse_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#5e0011]/10 blur-[120px] animate-[pulse_12s_ease-in-out_infinite_alternate_reverse]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div id="events-header" className="mb-16 md:mb-20 text-center">
          <span className="font-sans text-[10px] md:text-sm tracking-[0.5em] text-[#7a0016] uppercase mb-4 block font-medium">
            The Celebration
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#f5f5f5] tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            Event Details
          </h2>
        </div>

        {/* Event Plate Container */}
        <div className="w-full flex flex-col gap-16 md:gap-32 items-center">
          <div className="flex w-full justify-center md:justify-start event-plate">
            {/* Obsidian Glass Plate */}
            <div className="relative w-full md:w-[68%] lg:w-[58%] p-8 md:p-12 bg-[#0a0a0a]/90 backdrop-blur-xl rounded-sm border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.85)] border-l-4 border-l-[#7a0016] group hover:-translate-y-1 hover:shadow-[0_40px_80px_rgba(122,0,22,0.25)] hover:border-white/20 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7a0016]/15 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <div className="flex items-center justify-between gap-4 mb-8">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#f5f5f5] group-hover:text-[#7a0016] transition-colors duration-500">
                  Marriage Ceremony
                </h3>
                <span className="px-3 py-1 bg-[#7a0016]/20 border border-[#7a0016]/40 text-[10px] font-sans tracking-widest uppercase text-[#e2c092] rounded-full">
                  Main Event
                </span>
              </div>

              <div className="flex flex-col gap-6 font-sans text-[#a3a3a3] text-sm md:text-base mb-8">
                {/* Date */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#7a0016] group-hover:text-[#e2c092] transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <span className="tracking-wide text-[#f5f5f5]/90 font-medium">{WEDDING_DETAILS.dateString}</span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#7a0016] group-hover:text-[#e2c092] transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="tracking-wide text-[#f5f5f5]/90 font-medium">{WEDDING_DETAILS.ceremonyTime}</span>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#7a0016] group-hover:text-[#e2c092] transition-colors duration-300 shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1 tracking-wide">
                    <span className="text-[#f5f5f5] font-medium">{WEDDING_DETAILS.venue}</span>
                    <span className="text-[#a3a3a3] text-xs md:text-sm">{WEDDING_DETAILS.location}</span>
                  </div>
                </div>
              </div>

              <p className="font-serif italic text-[#a3a3a3] leading-relaxed mb-8 border-l border-white/15 pl-4 py-1.5 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                &ldquo;{WEDDING_DETAILS.invitationQuote}&rdquo;
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  id="openInviteBtn"
                  onClick={() => setIsInviteOpen(true)}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#e2c092] transition-all duration-300 cursor-pointer font-medium"
                >
                  View Invitation Card
                  <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
                </button>

                <a
                  href={WEDDING_DETAILS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-transparent border border-white/20 text-[#f5f5f5] font-sans text-xs tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                  Get Directions
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-transparent border border-white/15 text-[#a3a3a3] font-sans text-xs tracking-[0.2em] uppercase hover:text-white hover:border-white/30 transition-all duration-300 cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-emerald-400">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy Venue
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invitation Modal */}
      <InvitationModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </section>
  );
}

