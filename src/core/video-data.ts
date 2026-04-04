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

// IDs MANUALLY VERIFIED VIA BROWSER SUBAGENT
export const VIDEOS: Video[] = [
  {
    id: 'UoaAj2dpA3s',
    title: 'Popular Ramadan Lecture - Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/UoaAj2dpA3s/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12',
    isLatest: true
  },
  {
    id: 'Q2U1B0EahDg', 
    title: 'Short Spiritual Guide - Thaqlain',
    thumbnail: 'https://img.youtube.com/vi/Q2U1B0EahDg/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '800K',
    duration: '15:20'
  },
  {
    id: 'isFMu7KQlmU',
    title: 'Majlis Collection - Barabanki Azadari',
    thumbnail: 'https://img.youtube.com/vi/isFMu7KQlmU/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '150K',
    duration: '1:10:45'
  }
];
