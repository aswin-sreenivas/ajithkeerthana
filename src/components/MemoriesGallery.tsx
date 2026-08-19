import { useState, useEffect, useCallback } from 'react';
import { GALLERY_PHOTOS } from '../data/weddingData';

export default function MemoriesGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : null));
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : null));
  }, [selectedIndex]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  const currentPhoto = selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] : null;

  return (
    <section id="v12-gallery" className="py-24 md:py-36 w-full bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-[#7a0016]/10 blur-[140px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* HEADING */}
        <div id="gallery-header" className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-[#7a0016] mb-4 block font-medium">
            Beautiful Memories
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Moments Together
          </h2>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              className="gallery-img-box w-full h-[240px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-xl bg-black relative shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-500 cursor-pointer group hover:-translate-y-2 hover:scale-[1.02] border border-white/5 hover:border-[#7a0016]/40"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover block transition-all duration-700 filter brightness-85 group-hover:brightness-100 group-hover:scale-108"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-60" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-[#e2c092] border border-white/10">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Carousel Controls */}
      {currentPhoto !== null && selectedIndex !== null && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-pointer animate-[fade-in-up_0.2s_ease-out_forwards]"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-xl transition-all duration-300 cursor-pointer z-50 shadow-lg"
            aria-label="Close Lightbox"
          >
            ✕
          </button>

          {/* Left / Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-xl transition-all duration-300 cursor-pointer z-50 backdrop-blur-md"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Right / Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-xl transition-all duration-300 cursor-pointer z-50 backdrop-blur-md"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Photo Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] rounded-lg overflow-hidden border border-[#7a0016]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative flex flex-col cursor-default"
          >
            <div className="relative bg-black flex items-center justify-center max-h-[72vh]">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[72vh] object-contain"
              />
            </div>
            <div className="p-4 bg-[#0a0a0a] flex items-center justify-between border-t border-white/10 px-6">
              <div>
                <p className="font-serif text-lg text-white">{currentPhoto.caption}</p>
                <p className="font-sans text-xs text-[#a3a3a3] uppercase tracking-widest mt-0.5">
                  {currentPhoto.alt}
                </p>
              </div>
              <span className="text-xs font-sans text-[#e2c092] tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                {selectedIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

