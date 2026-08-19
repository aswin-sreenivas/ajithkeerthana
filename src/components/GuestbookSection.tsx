import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Wish {
  id: string;
  name: string;
  message: string;
  likes: number;
  rotation: number;
  date: string;
}

export const GuestbookSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_v4');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishName, setWishName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    try {
      const savedLikes = localStorage.getItem('wedding_wishes_liked_v4');
      return savedLikes ? JSON.parse(savedLikes) : {};
    } catch {
      return {};
    }
  });
  const [formStatus, setFormStatus] = useState<{ text: string; type: 'normal' | 'success' | 'error' }>({
    text: '',
    type: 'normal',
  });

  const handleClearBoard = () => {
    setWishes([]);
    setLikedMap({});
    try {
      localStorage.removeItem('wedding_wishes_v4');
      localStorage.removeItem('wedding_wishes_liked_v4');
    } catch {
      // ignore
    }
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) {
      setFormStatus({ text: 'Please enter your name and sweet message.', type: 'error' });
      return;
    }

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: wishName.trim(),
      message: wishMessage.trim(),
      likes: 1,
      rotation: (Math.random() - 0.5) * 4,
      date: 'Just now',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_wishes_v4', JSON.stringify(updated));
    } catch {
      // storage limit handle
    }

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7a0016', '#e2c092', '#5e0011', '#ffffff'],
      });
    } catch {
      // ignore
    }

    setWishName('');
    setWishMessage('');
    setFormStatus({ text: 'Your warm blessing has been pinned to the board! ✨', type: 'success' });

    setTimeout(() => {
      setFormStatus({ text: '', type: 'normal' });
    }, 4000);
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;

    const updated = wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w));
    setWishes(updated);
    const newLiked = { ...likedMap, [id]: true };
    setLikedMap(newLiked);

    try {
      localStorage.setItem('wedding_wishes_v4', JSON.stringify(updated));
      localStorage.setItem('wedding_wishes_liked_v4', JSON.stringify(newLiked));
    } catch {
      // ignore
    }
  };

  return (
    <section id="guestbook-section" className="py-24 md:py-36 w-full bg-[#030303] relative overflow-hidden border-t border-white/5">
      {/* Ambient background bloom */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] bg-red-950/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div id="guestbook-header" className="text-center mb-16 md:mb-20">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.55em] uppercase text-red-700 mb-4 block">
            Love &amp; Blessings
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Wedding Guestbook
          </h2>
          <p className="font-serif italic text-[#a3a3a3] text-sm md:text-base max-w-xl mx-auto mt-4">
            Pen your wishes and prayers for Ajith &amp; Keerthana as they begin their sacred journey together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Wish Input Form */}
          <div className="lg:col-span-5 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 md:p-8 border border-white/10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-l-4 border-l-[#7a0016]">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircleHeart className="w-6 h-6 text-[#e2c092]" />
              <h3 className="font-serif text-2xl text-[#f5f5f5]">Leave a Wish</h3>
            </div>

            <form onSubmit={handleWishSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-2 font-sans">
                  Your Name / Family *
                </label>
                <input
                  type="text"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="e.g. Anand &amp; Family"
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7a0016] transition-colors rounded-none placeholder:text-white/20"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#a3a3a3] font-sans">
                    Your Blessing *
                  </label>
                  <span className="text-[10px] text-[#a3a3a3] font-mono">
                    {wishMessage.length}/300
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={300}
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  placeholder="Write your wishes for Ajith &amp; Keerthana..."
                  className="w-full bg-black/60 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7a0016] transition-colors rounded-none resize-none placeholder:text-white/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#7a0016] text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-red-800 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(122,0,22,0.4)]"
              >
                <Send className="w-3.5 h-3.5" />
                Pin My Blessing
              </button>

              {formStatus.text && (
                <div
                  className={`p-3 text-xs text-center font-sans border ${
                    formStatus.type === 'error'
                      ? 'bg-red-950/40 border-red-800 text-red-300'
                      : formStatus.type === 'success'
                      ? 'bg-amber-950/30 border-[#e2c092]/40 text-[#e2c092]'
                      : 'bg-white/5 border-white/10 text-white/70'
                  }`}
                >
                  {formStatus.text}
                </div>
              )}
            </form>
          </div>

          {/* Scrapbook Board */}
          <div className="lg:col-span-7 bg-[#080808]/70 border border-white/10 p-6 md:p-8 rounded-sm min-h-[420px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-widest text-[#a3a3a3]">
                  Pinned Wishes ({wishes.length})
                </span>
                {wishes.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearBoard}
                    className="text-[10px] uppercase tracking-wider text-[#a3a3a3] hover:text-red-400 underline transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <span className="font-sans text-[11px] text-[#e2c092] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Live Guestbook
              </span>
            </div>

            {wishes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-white/10 rounded-sm">
                <div className="w-12 h-12 rounded-full bg-red-950/30 border border-[#7a0016]/40 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-[#e2c092]" />
                </div>
                <h4 className="font-serif text-lg text-white mb-2">No blessings pinned yet</h4>
                <p className="font-sans text-xs text-[#a3a3a3] max-w-xs leading-relaxed">
                  Be the first to write a warm wish and blessing for Ajith &amp; Keerthana!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                {wishes.map((wish) => {
                  const isLiked = !!likedMap[wish.id];
                  return (
                    <div
                      key={wish.id}
                      className="relative p-5 bg-[#faf8f5] text-[#1a1a1a] shadow-lg rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
                      style={{
                        transform: `rotate(${wish.rotation || 0}deg)`,
                      }}
                    >
                      {/* Gold Pushpin Icon */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#e2c092] border-2 border-[#b3894f] shadow-md flex items-center justify-center pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      </div>

                      <div>
                        <p className="font-serif italic text-xs md:text-sm leading-relaxed text-gray-800 mb-4 pt-1">
                          &quot;{wish.message}&quot;
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-[11px]">
                        <div>
                          <span className="font-sans font-semibold tracking-wider text-gray-900 block uppercase text-[10px]">
                            {wish.name}
                          </span>
                          <span className="text-[9px] text-gray-500">{wish.date}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleLike(wish.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sans transition-colors cursor-pointer ${
                            isLiked
                              ? 'bg-red-100 text-red-600 font-medium'
                              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                          }`}
                          title={isLiked ? 'Blessing loved' : 'Send love to this wish'}
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                          <span>{wish.likes}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestbookSection;
