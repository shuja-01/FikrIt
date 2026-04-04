export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelId: string;
  views: string;
  duration: string;
  isLatest?: boolean;
}

export const VIDEO_CHANNELS = [
  { id: 'barabanki', name: 'Barabanki Azadari', handle: '@BarabankiAzadari' },
  { id: 'nakshawani', name: 'Sayed Ammar Nakshawani', handle: '@SayedAmmarNakshawaniOfficial' },
  { id: 'thaqlain', name: 'Thaqlain', handle: '@Thaqlain' }
];

// Using highly compatible YouTube IDs that are verified for embedding
export const VIDEOS: Video[] = [
  {
    id: 'Tf_20W2m-80', 
    title: 'Majlis-e-Aza - Barabanki Azadari Special',
    thumbnail: 'https://img.youtube.com/vi/Tf_20W2m-80/hqdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '45K',
    duration: '1:12:00',
    isLatest: true
  },
  {
    id: 'EitK_N2jL0Y',
    title: 'The Essence of Faith - Sayed Ammar Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/EitK_N2jL0Y/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12'
  },
  {
    id: 'aLcl_jIuOOk',
    title: 'Reflections on the Path of the Ahlulbayt',
    thumbnail: 'https://img.youtube.com/vi/aLcl_jIuOOk/hqdefault.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '540K',
    duration: '12:05'
  },
  {
    id: 'S4vI9M3N8W0',
    title: 'Justice and Leadership in Islam',
    thumbnail: 'https://img.youtube.com/vi/S4vI9M3N8W0/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '890K',
    duration: '1:05:30'
  }
];
