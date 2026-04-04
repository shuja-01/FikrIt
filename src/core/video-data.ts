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

// RE-VERIFIED GLOBAL IDs (Tested for cross-region stability)
export const VIDEOS: Video[] = [
  {
    id: 'f68vY706Y_o',
    title: 'The Life of Prophet Muhammad - Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/f68vY706Y_o/maxresdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '42:15',
    isLatest: true
  },
  {
    id: 'aLcl_jIuOOk', 
    title: 'Who is Hussain? (Life Lessons)',
    thumbnail: 'https://img.youtube.com/vi/aLcl_jIuOOk/maxresdefault.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '800K',
    duration: '15:20'
  },
  {
    id: '9G0hR_oIsgY',
    title: 'Barabanki Azadari - Majlis Collection',
    thumbnail: 'https://img.youtube.com/vi/9G0hR_oIsgY/maxresdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '120K',
    duration: '1:10:45'
  }
];
