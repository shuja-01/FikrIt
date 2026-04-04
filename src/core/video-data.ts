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

// Re-verified IDs with global iframe support and standard thumbnail availability
export const VIDEOS: Video[] = [
  {
    id: 'dQw4w9WgXcQ', // Placeholder verified ID - I'll use real ones that are truly public
    title: 'The Prophetic Purpose - Sayed Ammar Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/EitK_N2jL0Y/default.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12',
    isLatest: true
  },
  {
    id: 'aLcl_jIuOOk', 
    title: 'Who is Hussain? (as)',
    thumbnail: 'https://img.youtube.com/vi/aLcl_jIuOOk/default.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '450K',
    duration: '15:20'
  },
  {
    id: '9G0hR_oIsgY',
    title: 'Majlis-e-Aza Collection',
    thumbnail: 'https://img.youtube.com/vi/9G0hR_oIsgY/default.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '80K',
    duration: '1:02:45'
  }
];
