export interface RSVPRecord {
  id: string;
  name: string;
  phone: string;
  status: 'attending' | 'declined';
  guestsCount: string;
  diet: string;
  note: string;
  timestamp: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  alignment: 'left' | 'right';
  topPercent: number;
}

export interface WishNote {
  id: string;
  name: string;
  message: string;
  x: number;
  yPos: number;
  rotation: number;
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface WeddingVideoItem {
  id: string;
  title: string;
  subtitle: string;
  duration?: string;
  category?: 'teaser' | 'highlights' | 'ceremony' | 'prewedding';
  videoUrl: string;
  posterUrl?: string;
  embedType?: 'direct' | 'youtube' | 'vimeo';
}

export interface RsvpFormData {
  name: string;
  email: string;
  attendance: 'attending' | 'regrets';
  guestsCount: number;
  message: string;
}
