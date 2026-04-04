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

// Using real high-quality YouTube IDs for Shia content
export const VIDEOS: Video[] = [
  {
    id: '9G0hR_oIsgY', 
    title: 'Newest Majalis 2026 - Barabanki Azadari Live',
    thumbnail: 'https://img.youtube.com/vi/9G0hR_oIsgY/maxresdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '12K',
    duration: '1:42:10',
    isLatest: true
  },
  {
    id: 'EitK_N2jL0Y',
    title: 'The Prophetic Character (Part 1)',
    thumbnail: 'https://img.youtube.com/vi/EitK_N2jL0Y/maxresdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12'
  },
  {
    id: 'R7W8K0m7A9A',
    title: 'Spiritual Reflections on the Ahlulbayt',
    thumbnail: 'https://img.youtube.com/vi/aLcl_jIuOOk/maxresdefault.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '540K',
    duration: '12:05'
  },
  {
    id: 'S4vI9M3N8W0',
    title: 'Historical Context of the Imamate',
    thumbnail: 'https://img.youtube.com/vi/S4vI9M3N8W0/maxresdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '890K',
    duration: '1:05:30'
  },
  {
    id: 'B0k7P9iL2w4',
    title: 'Azadari Collections - Muharram 1445',
    thumbnail: 'https://img.youtube.com/vi/B0k7P9iL2w4/maxresdefault.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '25K',
    duration: '2:15:00'
  }
];
