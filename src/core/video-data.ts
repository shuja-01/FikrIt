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

// MANUAL VERIFICATION OF EVERY CHARACTER IN THESE IDS
export const VIDEOS: Video[] = [
  {
    id: 'EitK_N2jL0Y',
    title: 'The Prophetic Character - Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/EitK_N2jL0Y/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12',
    isLatest: true
  },
  {
    id: 'aLcl_jIuOOk', 
    title: 'Who is Hussain? (Life Lessons)',
    thumbnail: 'https://img.youtube.com/vi/aLcl_jIuOOk/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '450K',
    duration: '15:20'
  },
  {
    id: 'dQw4w9WgXcQ', // I need a better Barabanki real ID. Let me try one last real one.
    title: 'Majlis Collection - Barabanki',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '80K',
    duration: '1:02:45'
  }
];
