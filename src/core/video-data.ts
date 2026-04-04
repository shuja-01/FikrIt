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

export const VIDEOS: Video[] = [
  {
    id: 'dQw4w9WgXcQ', // Mock ID for demonstration
    title: 'Newest Majalis 2026 - Live Streams',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '12K',
    duration: '1:42:10',
    isLatest: true
  },
  {
    id: 'yt1',
    title: 'The Prophetic Character (Part 1)',
    thumbnail: 'https://i.ytimg.com/vi/EitK_N2jL0Y/maxresdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12'
  },
  {
    id: 'yt2',
    title: 'Reflections on Karbala',
    thumbnail: 'https://i.ytimg.com/vi/aLcl_jIuOOk/maxresdefault.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '540K',
    duration: '12:05'
  },
  {
    id: 'yt3',
    title: 'Historical Analysis of Najaf',
    thumbnail: 'https://i.ytimg.com/vi/aLcl_jIuOOk/maxresdefault_live.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '890K',
    duration: '1:05:30'
  }
];
