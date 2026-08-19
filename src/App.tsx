import React, { useState, lazy, Suspense } from 'react';
import Petals from './components/Petals';
import QuickNavbar from './components/QuickNavbar';
import AudioWidget from './components/AudioWidget';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import CoupleSection from './components/CoupleSection';
import JourneyTimeline from './components/JourneyTimeline';
import EventDetails from './components/EventDetails';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import GuestbookSection from './components/GuestbookSection';
import Footer from './components/Footer';

// Code split heavy modals so initial page load is ultra lightweight and fast
const InvitationModal = lazy(() => import('./components/InvitationModal'));
const RSVPModal = lazy(() => import('./components/RSVPModal'));
const HostAdminModal = lazy(() => import('./components/HostAdminModal'));
const ShareWhatsAppModal = lazy(() => import('./components/ShareWhatsAppModal'));

export default function App() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isInviteShow, setIsInviteShow] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isHostAdminOpen, setIsHostAdminOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleOpenInvite = () => {
    setIsInviteOpen(true);
    setTimeout(() => setIsInviteShow(true), 50);
  };

  const handleCloseInvite = () => {
    setIsInviteShow(false);
    setTimeout(() => setIsInviteOpen(false), 300);
  };

  const handleOpenRSVP = () => {
    setIsRSVPOpen(true);
  };

  const handleCloseRSVP = () => {
    setIsRSVPOpen(false);
  };

  const handleOpenHostAdmin = () => {
    setIsHostAdminOpen(true);
  };

  const handleCloseHostAdmin = () => {
    setIsHostAdminOpen(false);
  };

  const handleOpenShare = () => {
    setIsShareOpen(true);
  };

  const handleCloseShare = () => {
    setIsShareOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f5] selection:bg-[#7a0016] selection:text-white overflow-x-hidden font-sans">
      {/* Falling Rose Petals Canvas/SVG Layer */}
      <Petals />

      {/* Floating Header Quick Nav */}
      <QuickNavbar />

      {/* Floating Audio Controller */}
      <AudioWidget />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Countdown Section */}
      <Countdown />

      {/* 3. The Couple Section */}
      <CoupleSection />

      {/* 4. Destiny Journey Timeline */}
      <JourneyTimeline />

      {/* 5. Event Celebration Details */}
      <EventDetails
        onOpenInviteModal={handleOpenInvite}
        onOpenRSVPModal={handleOpenRSVP}
        onOpenHostAdmin={handleOpenHostAdmin}
      />

      {/* 6. Memories Photo Gallery & Lightbox */}
      <GallerySection />

      {/* 7. Cinematic Wedding Films & Videos */}
      <VideoSection />

      {/* 8. Interactive Guestbook & Blessings */}
      <GuestbookSection />

      {/* 9. Thank You Footer */}
      <Footer onOpenHostAdmin={handleOpenHostAdmin} />

      {/* Lazy Loaded Modal Dialogs */}
      <Suspense fallback={null}>
        {/* Invitation Card Modal */}
        {isInviteOpen && (
          <InvitationModal
            isOpen={isInviteOpen}
            isShow={isInviteShow}
            onClose={handleCloseInvite}
            onOpenShare={handleOpenShare}
          />
        )}

        {/* RSVP Modal */}
        {isRSVPOpen && (
          <RSVPModal
            isOpen={isRSVPOpen}
            onClose={handleCloseRSVP}
          />
        )}

        {/* Host Admin & RSVP Manager Modal */}
        {isHostAdminOpen && (
          <HostAdminModal
            isOpen={isHostAdminOpen}
            onClose={handleCloseHostAdmin}
          />
        )}

        {/* WhatsApp Save the Date Share Modal */}
        {isShareOpen && (
          <ShareWhatsAppModal
            isOpen={isShareOpen}
            onClose={handleCloseShare}
          />
        )}
      </Suspense>
    </div>
  );
}
