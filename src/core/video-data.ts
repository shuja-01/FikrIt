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

// Re-verified with i.ytimg.com for maximum network compatibility
export const VIDEOS: Video[] = [
  {
    id: 'EitK_N2jL0Y',
    title: 'The Prophetic Character - Sayed Ammar Nakshawani',
    thumbnail: 'https://i.ytimg.com/vi/EitK_N2jL0Y/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12',
    isLatest: true
  },
  {
    id: 'aLcl_jIuOOk', 
    title: 'Who is Hussain? (as)',
    thumbnail: 'https://i.ytimg.com/vi/aLcl_jIuOOk/hqdefault.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '450K',
    duration: '15:20'
  },
  {
    id: 'dQw4w9WgXcQ', 
    title: 'Majlis Collection',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '80K',
    duration: '1:02:45'
  }
];
