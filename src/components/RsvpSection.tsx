import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'attending',
    guestsCount: 1,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#7a0016', '#e2c092', '#ffffff', '#8b7454'],
        });
      } catch {
        // ignore
      }
    }, 700);
  };

  return (
    <section id="v12-rsvp" className="py-24 md:py-36 w-full bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vw] bg-[#7a0016]/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div id="rsvp-header" className="text-center mb-14">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] text-[#7a0016] uppercase mb-4 block font-medium">
            Be Our Honored Guest
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            RSVP
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#a3a3a3] uppercase tracking-widest mt-3">
            Kindly respond by August 10, 2026
          </p>
        </div>

        {/* Invitation RSVP Envelope / Card */}
        <div
          id="invitation-card"
          className="relative w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-lg p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Subtle Golden Crimson Border Top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7a0016] to-transparent" />

          {!isSubmitted ? (
            <form id="rsvp-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Attendance Toggle */}
              <div className="flex gap-4 justify-center mb-2">
                <label
                  className={`flex-1 p-4 rounded-sm border cursor-pointer text-center transition-all duration-300 ${
                    formData.attendance === 'attending'
                      ? 'border-[#7a0016] bg-[#7a0016]/20 text-white font-medium shadow-[0_0_15px_rgba(122,0,22,0.4)]'
                      : 'border-white/10 bg-black/40 text-[#a3a3a3] hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="attending"
                    checked={formData.attendance === 'attending'}
                    onChange={() => setFormData({ ...formData, attendance: 'attending' })}
                    className="hidden"
                  />
                  <span className="font-serif text-base block mb-1">Joyfully Attending</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-white/50">
                    See you in {WEDDING_DETAILS.location}
                  </span>
                </label>

                <label
                  className={`flex-1 p-4 rounded-sm border cursor-pointer text-center transition-all duration-300 ${
                    formData.attendance === 'regrets'
                      ? 'border-[#7a0016] bg-[#7a0016]/20 text-white font-medium shadow-[0_0_15px_rgba(122,0,22,0.4)]'
                      : 'border-white/10 bg-black/40 text-[#a3a3a3] hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="regrets"
                    checked={formData.attendance === 'regrets'}
                    onChange={() => setFormData({ ...formData, attendance: 'regrets' })}
                    className="hidden"
                  />
                  <span className="font-serif text-base block mb-1">Regretfully Decline</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-white/50">
                    With you in spirit
                  </span>
                </label>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-sm text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7a0016] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-sm text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7a0016] transition-colors"
                  />
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3] mb-2">
                  Number of Guests
                </label>
                <select
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-[#7a0016] transition-colors"
                >
                  <option value={1}>1 Guest (Self)</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5+ Guests (Family)</option>
                </select>
              </div>

              {/* Note / Dietary */}
              <div>
                <label className="block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3] mb-2">
                  Special Note or Dietary Wishes
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Optional message to the bride & groom..."
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-sm text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7a0016] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                id="rsvp-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#7a0016] hover:bg-[#5e0011] text-white font-sans text-xs tracking-[0.3em] uppercase font-medium rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,0,22,0.9)] cursor-pointer mt-2"
              >
                {isSubmitting ? 'Sealing RSVP...' : 'Confirm RSVP'}
              </button>
            </form>
          ) : (
            /* Success View with Wax Seal Stamp */
            <div id="rsvp-success" className="py-8 flex flex-col items-center text-center animate-[fade-in-up_0.6s_ease-out_forwards]">
              {/* Wax Seal */}
              <div
                id="wax-seal"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#94001c] via-[#7a0016] to-[#40000b] border-2 border-[#e2c092]/60 shadow-[0_0_40px_rgba(122,0,22,1)] flex items-center justify-center mb-6 animate-[wax-stamp_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#e2c092]/30 flex flex-col items-center justify-center text-center">
                  <span className="font-serif italic text-xl md:text-2xl text-[#e2c092] leading-none">
                    A &amp; K
                  </span>
                  <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-[#e2c092]/80 mt-1">
                    Confirmed
                  </span>
                </div>
              </div>

              <h3 id="success-text-1" className="font-serif text-3xl md:text-4xl text-white mb-2">
                Thank You, {formData.name}!
              </h3>

              <p id="success-text-2" className="font-sans text-sm text-[#a3a3a3] max-w-md mb-8">
                {formData.attendance === 'attending'
                  ? 'Your attendance has been honored and recorded. We look forward to celebrating with you on August 23, 2026.'
                  : 'Your wishes have been received with gratitude. You will be missed in person but felt in our hearts.'}
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 border border-white/20 text-xs uppercase tracking-widest text-[#a3a3a3] hover:text-white hover:border-white/40 transition-colors"
              >
                Edit RSVP
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
