import React, { useEffect } from 'react';
import { X, Download, ArrowLeft } from 'lucide-react';
import { WEDDING_IMAGES } from '../data/weddingData';
import { shareOnWhatsApp } from '../utils/shareUtils';

interface InvitationModalProps {
  isOpen: boolean;
  isShow: boolean;
  onClose: () => void;
  onOpenShare?: () => void;
}

export const InvitationModal: React.FC<InvitationModalProps> = ({
  isOpen,
  isShow,
  onClose,
  onOpenShare,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cardSrc = WEDDING_IMAGES.couple || '/couple.jpg';

  return (
    <div className={`invite-modal ${isOpen ? 'active' : ''}`} id="inviteModal" role="dialog" aria-modal="true">
      <div className="invite-overlay" onClick={onClose} />
      <div className={`invite-box ${isShow ? 'show' : ''} max-w-lg w-full p-4 md:p-6 bg-[#0a0a0a] border border-[#7a0016]/40 rounded-lg shadow-2xl relative z-10 flex flex-col items-center`} id="inviteCard">
        <button
          type="button"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black transition-colors cursor-pointer"
          onClick={onClose}
          title="Close Invitation (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full max-h-[72vh] overflow-hidden rounded-md border border-white/10 shadow-2xl flex items-center justify-center bg-black">
          <img
            src={cardSrc}
            alt="Wedding Invitation Card for Ajith and Keerthana"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain max-h-[70vh] rounded-md shadow-2xl"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full mt-4">
          <button
            type="button"
            onClick={onOpenShare ? onOpenShare : () => shareOnWhatsApp()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] text-black text-xs font-sans font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#20bd5a] transition-all w-full sm:flex-1 text-center shadow-lg cursor-pointer"
          >
            <svg className="w-4 h-4 fill-black shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.127-.061-.595-.192-1.428-.592-2.389-1.553-.977-.978-1.401-1.848-1.599-2.457-.142-.436-.098-.824.048-1.137.142-.304.312-.44.417-.544.105-.104.238-.152.348-.152.11 0 .22.002.316.007.106.006.248-.04.388.297.144.348.492 1.2.535 1.288.043.088.072.19.014.305-.058.115-.087.188-.174.29-.087.102-.183.228-.261.306-.088.087-.179.182-.077.357.102.175.452.746.969 1.207.667.595 1.229.779 1.403.866.174.087.276.073.378-.044.102-.116.436-.508.552-.682.116-.174.233-.146.393-.087.16.058 1.018.48 1.192.567.174.087.291.13.334.204.044.073.044.422-.1 1.027z" />
            </svg>
            Share on WhatsApp
          </button>

          <a
            href={cardSrc}
            download="Ajith_Keerthana_Wedding_Invitation.jpg"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#7a0016] text-white text-xs font-sans uppercase tracking-[0.15em] rounded-sm hover:bg-red-800 transition-colors w-full sm:flex-1 text-center shadow-lg"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-1 px-3 py-2.5 bg-transparent border border-white/20 text-[#a3a3a3] text-xs font-sans uppercase tracking-[0.15em] rounded-sm hover:bg-white hover:text-black transition-colors cursor-pointer w-full sm:w-auto"
            onClick={onClose}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationModal;
