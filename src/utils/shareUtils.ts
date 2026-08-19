export const getSaveTheDateMessage = (url?: string) => {
  const websiteUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://ajith-keerthana.vercel.app');

  return `✨ *SAVE THE DATE* ✨

We joyfully invite you and your family to celebrate the wedding ceremony of
🤵 *Ajith*  &  👰 *Keerthana*

📅 *Date:* Sunday, August 23, 2026
⏰ *Muhurtham:* 11:00 AM – 1:30 PM (Lunch to follow)
📍 *Venue:* North View Auditorium, Pantheerpadam, Calicut
🗺️ *Location Map:* https://maps.app.goo.gl/fZ7JCvcn3Spk2B219

🌸 *View Invitation, Visual Memories & RSVP:*
👉 ${websiteUrl}

_Seeking your heartfelt presence, love, and blessings on our auspicious day!_
❤️ *Ajith & Keerthana*`;
};

export const shareOnWhatsApp = (customUrl?: string) => {
  const message = getSaveTheDateMessage(customUrl);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};
