import React from 'react';
import { Sparkles } from 'lucide-react';

export const DressCodeSection: React.FC = () => {
  return (
    <section className="py-20 w-full bg-[#030303] relative border-t border-white/5" id="v12-dresscode">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[#7a0016] mb-3">
          <Sparkles className="w-4 h-4" />
          <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase">Attire Palette</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Dress Code Guide</h2>
        <p className="font-sans text-xs md:text-sm text-[#a3a3a3] max-w-2xl mx-auto leading-relaxed mb-12">
          To create a harmonious visual experience for Ajith &amp; Keerthana&apos;s special day, we invite our guests to dress in modern South Indian festive attire following our wedding color palette.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Swatch 1 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm flex flex-col items-center hover:border-[#7a0016]/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#7a0016] shadow-[0_0_20px_rgba(122,0,22,0.8)] mb-4 border border-white/20" />
            <h3 className="font-serif text-xl text-white mb-1">Velvet Crimson</h3>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#7a0016] font-bold mb-2">#7A0016</span>
            <p className="font-sans text-xs text-[#a3a3a3] leading-relaxed">
              Deep burgundy &amp; crimson silk sarees or kurtas representing romance and traditional royalty.
            </p>
          </div>

          {/* Swatch 2 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm flex flex-col items-center hover:border-[#e2c092]/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#e2c092] shadow-[0_0_20px_rgba(226,192,146,0.6)] mb-4 border border-white/20" />
            <h3 className="font-serif text-xl text-white mb-1">Champagne Gold</h3>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#e2c092] font-bold mb-2">#E2C092</span>
            <p className="font-sans text-xs text-[#a3a3a3] leading-relaxed">
              Golden brocade accents, rich zari borders, and warm champagne ethnic wear.
            </p>
          </div>

          {/* Swatch 3 */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm flex flex-col items-center hover:border-white/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#f5f5f5] shadow-[0_0_20px_rgba(255,255,255,0.4)] mb-4 border border-black/20" />
            <h3 className="font-serif text-xl text-white mb-1">Traditional Ivory Silk</h3>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#a3a3a3] font-bold mb-2">#F5F5F5</span>
            <p className="font-sans text-xs text-[#a3a3a3] leading-relaxed">
              Classic Kasavu mundu, dhoti, or cream tissue sarees with golden border weaves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCodeSection;
