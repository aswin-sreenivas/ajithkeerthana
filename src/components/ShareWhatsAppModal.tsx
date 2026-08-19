import React, { useState } from 'react';
import { X, Copy, Check, Share2, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import { getSaveTheDateMessage, shareOnWhatsApp } from '../utils/shareUtils';

interface ShareWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareWhatsAppModal: React.FC<ShareWhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const message = getSaveTheDateMessage(currentUrl);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleDirectShare = () => {
    shareOnWhatsApp(currentUrl);
  };

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#0a0a0a] border border-[#7a0016]/60 p-6 sm:p-8 rounded-sm shadow-[0_0_80px_rgba(122,0,22,0.4)] text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#7a0016]/20 blur-[90px] pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a3a3a3] hover:text-white transition-colors p-2 cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#e2c092] block mb-2 font-medium">
          Spread the Joy
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-2">
          Share Save The Date
        </h3>
        <p className="font-sans text-xs text-[#a3a3a3] max-w-sm mx-auto mb-6">
          Share Ajith &amp; Keerthana's wedding invitation with family and friends on WhatsApp.
        </p>

        {/* Card Preview */}
        <div className="bg-black/70 border border-white/10 p-4 sm:p-5 rounded text-left mb-6 relative">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-[#e2c092] text-xs font-serif">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>WhatsApp Invite Preview</span>
          </div>

          <div className="text-xs text-[#f5f5f5] space-y-2 font-sans whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto pr-1">
            {message}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Direct WhatsApp Share Button */}
          <button
            type="button"
            onClick={handleDirectShare}
            className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer shadow-[0_0_25px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            {/* Custom WhatsApp Icon */}
            <svg className="w-4 h-4 fill-black shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.127-.061-.595-.192-1.428-.592-2.389-1.553-.977-.978-1.401-1.848-1.599-2.457-.142-.436-.098-.824.048-1.137.142-.304.312-.44.417-.544.105-.104.238-.152.348-.152.11 0 .22.002.316.007.106.006.248-.04.388.297.144.348.492 1.2.535 1.288.043.088.072.19.014.305-.058.115-.087.188-.174.29-.087.102-.183.228-.261.306-.088.087-.179.182-.077.357.102.175.452.746.969 1.207.667.595 1.229.779 1.403.866.174.087.276.073.378-.044.102-.116.436-.508.552-.682.116-.174.233-.146.393-.087.16.058 1.018.48 1.192.567.174.087.291.13.334.204.044.073.044.422-.1 1.027z" />
            </svg>
            Share on WhatsApp Now
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="py-2.5 px-3 rounded-full border border-white/20 text-[#f5f5f5] text-[11px] uppercase font-sans tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Text!' : 'Copy Full Text'}
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-full border border-[#e2c092]/40 text-[#e2c092] text-[11px] uppercase font-sans tracking-wider hover:bg-[#e2c092]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Link Copied!' : 'Copy Website Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareWhatsAppModal;
