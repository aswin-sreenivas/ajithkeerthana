import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Share2,
} from 'lucide-react';
import { GALLERY_ITEMS, GalleryItemData } from '../data/weddingData';

// Individual Optimized Gallery Card with IntersectionObserver
const GalleryCard: React.FC<{
  item: GalleryItemData;
  idx: number;
  onOpen: (idx: number) => void;
}> = React.memo(({ item, idx, onOpen }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' } // Preload 300px before scrolling into view
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onOpen(idx)}
      className="group relative h-[320px] md:h-[380px] rounded-sm overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-red-900/60 transition-all duration-500 cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.8)] hover:-translate-y-1.5"
    >
      {/* Skeleton Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
      )}

      {isInView && (
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          decoding="async"
          width={380}
          height={380}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setIsLoaded(true);
            (e.target as HTMLImageElement).src = '/assets/images/couple_invite_1787071992611.jpg';
          }}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } grayscale-[8%] brightness-90 contrast-110 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100`}
        />
      )}

      {/* Hover overlay with minimalist open indicator */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10 pointer-events-none">
        <div className="p-3 rounded-full bg-black/60 border border-white/20 text-[#e2c092] backdrop-blur-sm shadow-xl">
          <Maximize2 className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
});

export const GallerySection: React.FC = () => {
  const items: GalleryItemData[] = GALLERY_ITEMS;

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Touch Swipe coordinates for Mobile Lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    if (activeIdx !== null && items.length > 0) {
      setActiveIdx((prev) => (prev! + 1) % items.length);
    }
  }, [activeIdx, items.length]);

  const handlePrev = useCallback(() => {
    if (activeIdx !== null && items.length > 0) {
      setActiveIdx((prev) => (prev! - 1 + items.length) % items.length);
    }
  }, [activeIdx, items.length]);

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, handleClose, handleNext, handlePrev]);

  // Mobile Touch Swipe Handling in Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Download high-res photo from lightbox
  const handleDownloadPhoto = (photo: GalleryItemData) => {
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = `${photo.caption || 'wedding_photo'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share photo via WhatsApp
  const handleSharePhoto = (photo: GalleryItemData) => {
    const text = encodeURIComponent(
      `Celebrating Ajith & Keerthana's Wedding! View this precious moment: ${window.location.origin}${photo.src}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section
      id="v12-gallery"
      className="py-24 md:py-36 w-full bg-[#050505] relative overflow-hidden transition-colors"
    >
      {/* Ambient lighting backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[45vw] bg-red-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div id="gallery-header" className="text-center mb-10 md:mb-14">
          <span className="font-sans text-[10px] md:text-xs tracking-[0.55em] uppercase text-red-700 mb-3 block animate-pulse font-medium">
            Visual Memories
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Moments Together
          </h2>
          <p className="font-serif italic text-sm md:text-base text-[#a3a3a3] max-w-xl mx-auto mt-3">
            A vibrant gallery of smiles, sacred traditions, and timeless memories created along our journey.
          </p>

        </div>

        {/* Responsive Photo Grid (No captions, clean minimalist display) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              idx={idx}
              onOpen={setActiveIdx}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Sleek, Compact Photo Viewer) */}
      {activeIdx !== null && items[activeIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.15s_ease-out]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Compact Centered Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#0e0e0e] border border-white/20 rounded-xl shadow-2xl overflow-hidden flex flex-col p-2.5 sm:p-3"
          >
            {/* Minimal Top Bar */}
            <div className="w-full flex items-center justify-between text-white pb-2 border-b border-white/10 shrink-0">
              <span className="font-mono text-[11px] text-[#a3a3a3] bg-white/10 px-2 py-0.5 rounded-full">
                {activeIdx + 1} / {items.length}
              </span>

              <div className="flex items-center gap-1">
                {/* WhatsApp Share */}
                <button
                  type="button"
                  onClick={() => handleSharePhoto(items[activeIdx])}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-[#25D366] transition-colors cursor-pointer"
                  title="Share via WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                {/* Download Photo */}
                <button
                  type="button"
                  onClick={() => handleDownloadPhoto(items[activeIdx])}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-[#7a0016] transition-colors cursor-pointer"
                  title="Download Photo"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  type="button"
                  className="p-1.5 rounded-full bg-white/10 text-[#a3a3a3] hover:text-white hover:bg-white/20 transition-colors cursor-pointer ml-1"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Compact Main Image Viewport */}
            <div className="relative w-full flex items-center justify-center my-2 overflow-hidden bg-black/60 rounded-lg">
              {/* Left Arrow */}
              {items.length > 1 && (
                <button
                  onClick={handlePrev}
                  type="button"
                  className="absolute left-1.5 z-30 p-1.5 rounded-full bg-black/75 hover:bg-[#7a0016] text-white transition-all cursor-pointer outline-none backdrop-blur-sm border border-white/10"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}

              {/* Image Frame */}
              <div className="h-[38vh] sm:h-[42vh] md:h-[46vh] w-full flex items-center justify-center overflow-hidden">
                <img
                  src={items[activeIdx].src}
                  alt={items[activeIdx].caption}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/couple_invite_1787071992611.jpg';
                  }}
                  className="max-h-full max-w-full w-auto h-auto object-contain select-none transition-transform duration-200"
                />
              </div>

              {/* Right Arrow */}
              {items.length > 1 && (
                <button
                  onClick={handleNext}
                  type="button"
                  className="absolute right-1.5 z-30 p-1.5 rounded-full bg-black/75 hover:bg-[#7a0016] text-white transition-all cursor-pointer outline-none backdrop-blur-sm border border-white/10"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Compact Thumbnail Strip */}
            {items.length > 1 && (
              <div className="w-full pt-1.5 border-t border-white/10 shrink-0">
                <div className="flex items-center justify-start sm:justify-center gap-1 overflow-x-auto py-0.5 max-w-full scrollbar-none">
                  {items.map((thumb, tIdx) => (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setActiveIdx(tIdx)}
                      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded overflow-hidden border transition-all shrink-0 cursor-pointer ${
                        activeIdx === tIdx
                          ? 'border-[#e2c092] scale-105 shadow-sm ring-1 ring-[#e2c092]'
                          : 'border-white/20 opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={thumb.src}
                        alt={thumb.caption}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/couple_invite_1787071992611.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
