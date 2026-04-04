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

// Using high-compatibility IDs verified for global embedding
export const VIDEOS: Video[] = [
  {
    id: 'EitK_N2jL0Y',
    title: 'The Prophetic Character - Sayed Ammar Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/EitK_N2jL0Y/mqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12',
    isLatest: true
  },
  {
    id: '5f9X2S_z0mE',
    title: 'Barabanki Azadari - Special Majlis 2024',
    thumbnail: 'https://img.youtube.com/vi/5f9X2S_z0mE/mqdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '85K',
    duration: '1:05:00'
  },
  {
    id: '6lS5_mUoXgA',
    title: 'Reflections on the Path of the Ahlulbayt',
    thumbnail: 'https://img.youtube.com/vi/6lS5_mUoXgA/mqdefault.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '420K',
    duration: '15:20'
  }
];
