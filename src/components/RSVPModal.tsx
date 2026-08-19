import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, Send } from 'lucide-react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'attending' | 'declined'>('attending');
  const [guestsCount, setGuestsCount] = useState('1');
  const [diet, setDiet] = useState('veg');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rsvpData = {
      id: `rsvp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      phone: phone.trim(),
      status,
      guestsCount,
      diet,
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push(rsvpData);
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch {
      // Storage safety
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#0a0a0a] border border-[#7a0016]/50 p-6 md:p-8 rounded-sm shadow-[0_0_80px_rgba(122,0,22,0.3)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a3a3a3] hover:text-white transition-colors p-2 cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7a0016] block mb-2 font-medium">
                Kindly Respond
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white">RSVP Confirmation</h3>
              <p className="font-sans text-xs text-[#a3a3a3] mt-1">
                Please let us know if you can join Ajith &amp; Keerthana on Aug 23, 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-1 font-sans">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7a0016]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-1 font-sans">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7a0016]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStatus('attending')}
                  className={`py-3 px-4 text-xs font-sans uppercase tracking-wider border transition-all cursor-pointer ${
                    status === 'attending'
                      ? 'bg-[#7a0016] border-[#7a0016] text-white shadow-[0_0_15px_rgba(122,0,22,0.6)] font-medium'
                      : 'border-white/10 text-[#a3a3a3] hover:border-white/30'
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('declined')}
                  className={`py-3 px-4 text-xs font-sans uppercase tracking-wider border transition-all cursor-pointer ${
                    status === 'declined'
                      ? 'bg-[#5e0011] border-[#5e0011] text-white shadow-[0_0_15px_rgba(94,0,17,0.6)] font-medium'
                      : 'border-white/10 text-[#a3a3a3] hover:border-white/30'
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>

              {status === 'attending' && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-1 font-sans">
                      Attending Guests
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#7a0016]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4+">4+ Family Members</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-1 font-sans">
                      Meal Preference
                    </label>
                    <select
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#7a0016]"
                    >
                      <option value="veg">Traditional Veg Feast</option>
                      <option value="nonveg">Non-Vegetarian Delight</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-1 font-sans">
                  Special Note / Warm Message
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any message for Ajith &amp; Keerthana?"
                  className="w-full bg-black/60 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#7a0016] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#7a0016] text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-red-800 transition-colors shadow-lg cursor-pointer mt-4 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Response
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-[#e2c092] mb-4 animate-bounce" />
            <h3 className="font-serif text-3xl text-white mb-2">Thank You!</h3>
            <p className="font-sans text-sm text-[#a3a3a3] max-w-sm leading-relaxed mb-6">
              {status === 'attending'
                ? `Your RSVP for ${guestsCount} guest(s) has been confirmed! We can't wait to celebrate with you.`
                : 'Thank you for letting us know. You will be missed in our hearts!'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-white/20 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSVPModal;
