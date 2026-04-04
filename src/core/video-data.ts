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

// Using IDs that are confirmed to work in iframes and have mqdefault thumbnails
export const VIDEOS: Video[] = [
  {
    id: 'EitK_N2jL0Y',
    title: 'The Prophetic Character (Part 1) - Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/EitK_N2jL0Y/mqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12',
    isLatest: true
  },
  {
    id: 'aLcl_jIuOOk',
    title: 'Reflections on the Ahlulbayt',
    thumbnail: 'https://img.youtube.com/vi/aLcl_jIuOOk/mqdefault.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '540K',
    duration: '12:05'
  },
  {
    id: '9G0hR_oIsgY', 
    title: 'Majlis Collection - Barabanki Azadari',
    thumbnail: 'https://img.youtube.com/vi/9G0hR_oIsgY/mqdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '45K',
    duration: '1:12:00'
  },
  {
    id: 'S4vI9M3N8W0',
    title: 'Leadership in early Islam',
    thumbnail: 'https://img.youtube.com/vi/S4vI9M3N8W0/mqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '890K',
    duration: '1:05:30'
  }
];
