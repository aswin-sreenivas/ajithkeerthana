import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_WISHES } from '../data/weddingData';
import { WishNote } from '../types';

export default function InteractiveGuestbook() {
  const [wishes, setWishes] = useState<WishNote[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_liked');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_like_counts');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ text: string; type: 'normal' | 'error' | 'success' }>({
    text: `${wishes.length} warm wishes recorded.`,
    type: 'normal',
  });

  useEffect(() => {
    try {
      localStorage.setItem('wedding_wishes_v2', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_wishes_liked', JSON.stringify(likedMap));
      localStorage.setItem('wedding_wishes_like_counts', JSON.stringify(likeCounts));
    } catch {
      // ignore
    }
  }, [likedMap, likeCounts]);

  const handleToggleLike = (wishId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedMap[wishId];
    const newLiked = !isLiked;
    setLikedMap((prev) => ({ ...prev, [wishId]: newLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [wishId]: (prev[wishId] || 0) + (newLiked ? 1 : -1),
    }));
  };

  const presetMessages = [
    'Wishing you a lifetime of love and joy! 🥂',
    'May your love grow stronger every day. ❤️',
    'So thrilled to celebrate with you both! ✨',
    'To the most beautiful couple, congratulations! 💍',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus({ text: 'Please fill all fields before pinning.', type: 'error' });
      return;
    }

    const newWish: WishNote = {
      id: `w-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      x: Math.floor(Math.random() * 65) + 5,
      yPos: Math.floor(Math.random() * 55) + 5,
      rotation: Math.random() * 8 - 4,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setWishes((prev) => [newWish, ...prev]);
    setName('');
    setMessage('');
    setStatus({ text: 'Your wish has been pinned to the board ❤️', type: 'success' });

    // Trigger romantic confetti
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#7a0016', '#e2c092', '#5e0011', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="guestbook-section" className="py-24 md:py-36 w-full bg-[#030303] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/3 right-1/4 w-[60vw] h-[30vw] bg-[#7a0016]/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div id="guestbook-header" className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-[#7a0016] mb-4 block font-medium">
            Blessings &amp; Thoughts
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Guestbook of Wishes
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#a3a3a3] uppercase tracking-widest mt-4">
            Pin a romantic note for Ajith &amp; Keerthana
          </p>
        </div>

        {/* Pinboard Canvas */}
        <div className="relative w-full min-h-[440px] md:min-h-[520px] bg-[#090909] rounded-xl border border-white/10 p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden mb-16">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e2c092_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Render Scrap Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {wishes.slice(0, 8).map((wish) => {
              const likes = (likeCounts[wish.id] || 0) + 1;
              const isLiked = !!likedMap[wish.id];

              return (
                <div
                  key={wish.id}
                  style={{ transform: `rotate(${wish.rotation}deg)` }}
                  className="scrap-note relative p-5 md:p-6 text-[#050505] shadow-[0_15px_30px_rgba(0,0,0,0.6)] rounded-sm transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-30 cursor-pointer border border-[#e2d5c3] flex flex-col justify-between"
                >
                  {/* Champagne Gold Pushpin */}
                  <div className="w-7 h-7 rounded-full bg-[#e2c092]/40 absolute -top-3.5 left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-inner pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8b7454] shadow-sm" />
                  </div>

                  <p className="font-serif italic text-sm md:text-base leading-relaxed mb-4 text-[#1a1a1a] break-words pt-1">
                    &ldquo;{wish.message}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-black/10 mt-auto">
                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(wish.id, e)}
                      className={`inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2 py-0.5 rounded-full transition-colors ${
                        isLiked ? 'text-[#7a0016] bg-[#7a0016]/10 font-bold' : 'text-[#6b6b6b] hover:text-[#7a0016]'
                      }`}
                    >
                      <span>{isLiked ? '❤️' : '🤍'}</span>
                      <span>{likes}</span>
                    </button>
                    <p className="font-sans text-[11px] tracking-widest uppercase font-bold text-[#6b6b6b]">
                      — {wish.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div id="guestbook-form-container" className="max-w-xl mx-auto">
          <form
            id="wish-form"
            onSubmit={handleSubmit}
            className="p-8 bg-[#0a0a0a]/90 backdrop-blur-md rounded-lg border border-[#7a0016]/30 shadow-2xl flex flex-col gap-5"
          >
            <h3 className="font-serif text-2xl text-white text-center mb-1">
              Send Your Warmest Wishes
            </h3>

            {/* Quick Inspiration Chips */}
            <div>
              <span className="block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3] mb-2">
                Quick Inspiration (Click to use)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetMessages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(preset)}
                    className="text-[11px] font-sans text-[#e2c092] bg-white/5 hover:bg-white/15 border border-white/10 px-2.5 py-1 rounded-full text-left transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="wish-name" className="block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3]">
                  Your Name
                </label>
                <span className="text-[10px] font-sans text-white/30">{name.length}/50</span>
              </div>
              <input
                id="wish-name"
                type="text"
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul & Priya"
                className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-sm text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7a0016] transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="wish-message" className="block font-sans text-[10px] tracking-widest uppercase text-[#a3a3a3]">
                  Your Message
                </label>
                <span className="text-[10px] font-sans text-white/30">{message.length}/200</span>
              </div>
              <textarea
                id="wish-message"
                rows={3}
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your blessing or memory here..."
                className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-sm text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7a0016] transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#7a0016] hover:bg-[#5e0011] text-white font-sans text-xs tracking-[0.25em] uppercase font-medium rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(122,0,22,0.8)] cursor-pointer mt-2"
            >
              Pin Wish to Board
            </button>

            <p
              id="wish-status"
              className={`text-center font-sans text-xs tracking-wider transition-colors duration-300 ${
                status.type === 'error'
                  ? 'text-red-400'
                  : status.type === 'success'
                  ? 'text-[#e2c092]'
                  : 'text-white/40'
              }`}
            >
              {status.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

