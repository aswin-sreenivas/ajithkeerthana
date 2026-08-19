import coupleInviteImg from '@/src/assets/images/couple_invite_1787071992611.jpg';
import groomImg from '@/src/assets/images/groom_portrait_1787072009302.jpg';
import brideImg from '@/src/assets/images/bride_portrait_1787072019863.jpg';
import thankYouImg from '@/src/assets/images/thank_you_bg_1787072033690.jpg';
import momentRingImg from '@/src/assets/images/moment_ring_1787072044850.jpg';
import momentWalkImg from '@/src/assets/images/moment_walk_1787072065871.jpg';
import weddingCeremonyImg from '@/src/assets/images/wedding_ceremony_couple_1787073120494.jpg';
import sacredVowsImg from '@/src/assets/images/sacred_vows_ritual_1787073144194.jpg';
import candidSunsetImg from '@/src/assets/images/candid_sunset_walk_1787073165535.jpg';
import mandapDecorImg from '@/src/assets/images/wedding_mandap_decor_1787073184886.jpg';

import { TimelineEvent, GalleryPhoto, WishNote, WeddingVideoItem } from '../types';

export const WEDDING_IMAGES = {
  couple: coupleInviteImg,
  groom: groomImg,
  bride: brideImg,
  thankYou: thankYouImg,
  momentRing: momentRingImg,
  momentWalk: momentWalkImg,
  weddingCeremony: weddingCeremonyImg,
  sacredVows: sacredVowsImg,
  candidSunset: candidSunsetImg,
  mandapDecor: mandapDecorImg,
};

export const WEDDING_DETAILS = {
  groomName: 'Ajith',
  brideName: 'Keerthana',
  dateString: 'Sunday, August 23, 2026',
  targetDateTime: '2026-08-23T11:00:00',
  ceremonyTime: '11:00 AM - 11:30 AM',
  venue: 'North View Auditorium',
  location: 'Pantheerpadam',
  mapsUrl: 'https://maps.app.goo.gl/fZ7JCvcn3Spk2B219',
  quote: 'Two hearts united beneath the blessings of our families.',
  invitationQuote:
    'Join us as we unite our souls in a sacred ceremony, followed by an evening of joy, magnificent feasts, and endless dancing to celebrate our union.',
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2018',
    title: 'First Met',
    description: 'KMCT College — Where a serendipitous greeting sparked the beginning of an unforgettable chapter.',
    alignment: 'right',
    topPercent: 10,
  },
  {
    year: '2018',
    title: 'The Confession',
    description: 'Under starry skies, friendship blossomed into a deep, tender, and everlasting devotion.',
    alignment: 'left',
    topPercent: 35,
  },
  {
    year: '2019',
    title: 'The Proposal',
    description: 'A whispered "Yes" sealed with crimson roses, boundless laughter, and shared dreams.',
    alignment: 'right',
    topPercent: 60,
  },
  {
    year: 'AUGUST 2026',
    title: 'Forever Begins',
    description: 'Walking hand in hand toward the sacred mandap to begin our most cherished and sacred adventure.',
    alignment: 'left',
    topPercent: 85,
  },
];

export interface GalleryItemData {
  id: string;
  src: string;
  caption: string;
  subtitle: string;
  category?: 'all' | 'ceremony' | 'portraits' | 'moments';
}

export const GALLERY_IMAGE_NAMES: string[] = [
  '12.jpg',
  '8.jpg',
  '7.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  'photo-04.jpg',
  'Stories Of Pranavam-34.jpg',
  'Stories Of Pranavam-33.jpg',
  'Stories Of Pranavam-23.jpg',
  'Stories Of Pranavam-17 (1).jpg',
  'Stories Of Pranavam-15.jpg',
  'Stories Of Pranavam-13.jpg',
  'Stories Of Pranavam-12 (1).jpg',
  'Stories Of Pranavam-10.jpg',
  'Stories Of Pranavam-9.jpg',
  'Stories Of Pranavam-8.jpg',
  'Stories Of Pranavam-6 (1).jpg',
  'Stories Of Pranavam-4.jpg',
  'Stories Of Pranavam-2.jpg',
  'Stories Of Pranavam.jpg',
  'Stories Of Pranavam-55 (1).jpg',
  'Stories Of Pranavam-32.jpg',
  'Stories Of Pranavam-31.jpg',
  'Stories Of Pranavam-28.jpg',
  'Stories Of Pranavam-24.jpg',
  'Stories Of Pranavam-20.jpg',
  'Stories Of Pranavam-18.jpg',
  'Stories Of Pranavam-17.jpg',
  'Stories Of Pranavam-14.jpg',
  'Stories Of Pranavam-12.jpg',
  'Stories Of Pranavam-7.jpg',
  'Stories Of Pranavam-6.jpg',
  'Stories Of Pranavam-55.jpg',
  'Stories Of Pranavam-35.jpg',
  'Stories Of Pranavam-36.jpg',
];

export const GALLERY_ITEMS: GalleryItemData[] = GALLERY_IMAGE_NAMES.map((name, index) => ({
  id: `gal-${index + 1}`,
  src: `/src/assets/images/${encodeURIComponent(name)}`,
  caption: name.replace(/\.[^/.]+$/, ''),
  subtitle: 'Ajith & Keerthana Wedding Celebration',
  category:
    index % 3 === 0
      ? 'ceremony'
      : index % 3 === 1
        ? 'portraits'
        : 'moments',
}));

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '1',
    src: WEDDING_IMAGES.couple,
    alt: 'Ajith & Keerthana Together',
    caption: 'Pure Serenity',
  },
  {
    id: '2',
    src: WEDDING_IMAGES.momentRing,
    alt: 'The Sacred Vows & Rings',
    caption: 'A Promise for Eternity',
  },
  {
    id: '3',
    src: WEDDING_IMAGES.momentWalk,
    alt: 'Sunset Promenade',
    caption: 'Hand in Hand',
  },
  {
    id: '4',
    src: WEDDING_IMAGES.groom,
    alt: 'Ajith Portrait',
    caption: 'The Groom',
  },
  {
    id: '5',
    src: WEDDING_IMAGES.bride,
    alt: 'Keerthana Portrait',
    caption: 'The Bride',
  },
  {
    id: '6',
    src: WEDDING_IMAGES.thankYou,
    alt: 'Twilight Wonder',
    caption: 'Starry Twilight',
  },
];

export const INITIAL_WISHES: WishNote[] = [
  {
    id: 'w1',
    name: 'Rahul & Ananya',
    message: 'Wishing you both a lifetime of unyielding love, laughter, and endless magical adventures!',
    x: 12,
    yPos: 15,
    rotation: -3,
    createdAt: '2026-08-18',
  },
  {
    id: 'w2',
    name: 'Siddharth',
    message: 'May your bond grow stronger with each passing day. Congratulations Ajith & Keerthana!',
    x: 58,
    yPos: 22,
    rotation: 4,
    createdAt: '2026-08-18',
  },
  {
    id: 'w3',
    name: 'Devika M.',
    message: 'So incredibly thrilled for you two! Looking forward to celebrating on August 23rd ❤️',
    x: 25,
    yPos: 55,
    rotation: -2,
    createdAt: '2026-08-18',
  },
  {
    id: 'w4',
    name: 'Kiran Kumar',
    message: 'Cheers to love, laughter, and your happily ever after!',
    x: 65,
    yPos: 60,
    rotation: 5,
    createdAt: '2026-08-18',
  },
];

export const DEFAULT_VIDEOS: WeddingVideoItem[] = [
  {
    id: 'video-1',
    title: 'Output',
    subtitle: 'Official Wedding Output Film #wedding #film #highlights',
    duration: '1:10',
    category: 'highlights',
    posterUrl: WEDDING_IMAGES.couple,
    videoUrl: '/assets/videos/output.mp4',
    embedType: 'direct',
  },
  {
    id: 'video-2',
    title: 'BTS + Output',
    subtitle: 'Behind The Scenes + Output #shorts #prewedding #bts #wedding #viral',
    duration: '0:55',
    category: 'prewedding',
    posterUrl: WEDDING_IMAGES.candidSunset,
    videoUrl: '/assets/videos/bts_output.mp4',
    embedType: 'direct',
  },
];


