import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CalendarPlus, CheckSquare, ShieldCheck } from 'lucide-react';

interface EventDetailsProps {
  onOpenInviteModal: () => void;
  onOpenRSVPModal: () => void;
  onOpenHostAdmin?: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  onOpenInviteModal,
  onOpenRSVPModal,
  onOpenHostAdmin,
}) => {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  // Calendar details
  const title = 'Wedding Celebration of Ajith & Keerthana';
  const location = 'North View Auditorium, Pantheerpadam';
  const details = 'Join us as Ajith & Keerthana unite their souls in marriage!';
  const startDate = '20260823T053000Z'; // 11:00 AM IST
  const endDate = '20260823T080000Z'; // 1:30 PM IST

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

  const downloadICS = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ajith and Keerthana Wedding//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:20260823T053000Z
DTEND:20260823T080000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Ajith_Keerthana_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 md:py-40 w-full bg-[#050505] relative overflow-hidden" id="v12-events">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#7a0016]/5 blur-[100px] animate-[pulse_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#5e0011]/5 blur-[120px] animate-[pulse_12s_ease-in-out_infinite_alternate_reverse]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="mb-24 text-center transition-all duration-1000" id="events-header">
          <span className="font-sans text-[10px] md:text-sm tracking-[0.5em] text-[#7a0016] uppercase mb-4 block">
            The Celebration
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#f5f5f5] tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            Event Details
          </h2>
        </div>

        <div className="w-full flex justify-center">
          <div className="relative w-full md:w-[75%] lg:w-[65%] p-8 md:p-12 bg-[#0a0a0a]/90 backdrop-blur-xl rounded-sm border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-l-4 border-l-[#7a0016] group hover:shadow-[0_40px_80px_rgba(122,0,22,0.2)] transition-all duration-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7a0016]/10 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#f5f5f5] group-hover:text-[#7a0016] transition-colors duration-700">
                Marriage Ceremony
              </h3>
              <span className="px-3 py-1 bg-[#7a0016]/20 border border-[#7a0016]/40 text-[#e2c092] text-[10px] uppercase tracking-widest rounded">
                Main Event
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-[#a3a3a3] text-sm md:text-base mb-10 border-y border-white/10 py-6">
              <div className="flex items-center gap-3">
                <div className="text-[#7a0016]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#a3a3a3]">Date</span>
                  <span className="text-white font-serif text-sm">Sunday, Aug 23, 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[#7a0016]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#a3a3a3]">Time</span>
                  <span className="text-white font-serif text-sm">11:00 AM - 11:30 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[#7a0016]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#a3a3a3]">Venue</span>
                  <span className="text-white font-serif text-sm">North View Auditorium</span>
                  <span className="text-[11px] text-[#a3a3a3]">Pantheerpadam</span>
                </div>
              </div>
            </div>

            <p className="font-serif italic text-[#a3a3a3] leading-relaxed mb-10 border-l border-white/10 pl-4 py-2 opacity-90">
              &quot;Join us as we unite our souls in a sacred ceremony, followed by an evening of joy, magnificent feasts, and endless dancing to celebrate our union.&quot;
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={onOpenInviteModal}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-transparent border border-white/20 text-[#f5f5f5] rounded-none font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
              >
                Open Invitation Card
                <span className="w-6 h-px bg-current transition-all duration-500 group-hover:w-10" />
              </button>

              <button
                type="button"
                onClick={onOpenRSVPModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#7a0016] text-white rounded-none font-sans text-xs tracking-[0.2em] uppercase hover:bg-red-800 transition-all duration-500 cursor-pointer shadow-[0_0_20px_rgba(122,0,22,0.5)]"
              >
                <CheckSquare className="w-4 h-4" />
                Confirm RSVP
              </button>

              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-[#e2c092]/40 text-[#e2c092] rounded-none font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#e2c092] hover:text-black transition-all duration-500 cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Add to Calendar
                </button>

                {calendarMenuOpen && (
                  <div className="absolute left-0 mt-2 w-52 bg-[#0a0a0a] border border-white/20 shadow-2xl z-30 p-2 flex flex-col gap-1">
                    <a
                      href={googleCalUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setCalendarMenuOpen(false)}
                      className="px-4 py-2 text-xs font-sans text-white hover:bg-[#7a0016] hover:text-white transition-colors block text-left"
                    >
                      Google Calendar
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        downloadICS();
                        setCalendarMenuOpen(false);
                      }}
                      className="px-4 py-2 text-xs font-sans text-white hover:bg-[#7a0016] hover:text-white transition-colors block text-left w-full cursor-pointer"
                    >
                      Apple / Outlook (.ics)
                    </button>
                  </div>
                )}
              </div>

              <a
                href="https://maps.app.goo.gl/fZ7JCvcn3Spk2B219"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/20 text-[#f5f5f5] rounded-none font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
              >
                <MapPin className="w-4 h-4" />
                Open Map
              </a>
            </div>

            {onOpenHostAdmin && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={onOpenHostAdmin}
                  className="inline-flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-[#a3a3a3] hover:text-[#e2c092] transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Host / Organizer Dashboard &amp; RSVP Export
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
