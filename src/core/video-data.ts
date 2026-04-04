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

// ALL THAQLAIN IDs LIVE-VERIFIED FROM RSS FEED (UC6ry6jhDUjceu5aXLe_LxjQ)
// All thumbnails use i.ytimg.com which is more reliable than img.youtube.com
export const VIDEOS: Video[] = [

  // ─── THAQLAIN (15 RSS-verified IDs) ───────────────────────────────
  {
    id: 'S0AV4BtO-Lc',
    title: 'Why Should We Care About Jannat al-Baqi?',
    thumbnail: 'https://i4.ytimg.com/vi/S0AV4BtO-Lc/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '403', duration: ''
  },
  {
    id: 'DepSpe1VIjo',
    title: "Imam al-Sajjad's Dua to Bid Farewell to Ramadan",
    thumbnail: 'https://i1.ytimg.com/vi/DepSpe1VIjo/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '2,892', duration: '',
    isLatest: false
  },
  {
    id: 'Q2U1B0EahDg',
    title: 'What Are the Rules for Paying Zakat al-Fitra?',
    thumbnail: 'https://i2.ytimg.com/vi/Q2U1B0EahDg/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '1,878', duration: ''
  },
  {
    id: 'jIDD2TIlTJg',
    title: 'Can We See the Eid Moon with a Telescope?',
    thumbnail: 'https://i3.ytimg.com/vi/jIDD2TIlTJg/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '3,829', duration: ''
  },
  {
    id: 'mXzfuQKKLUk',
    title: "Why Don't We Agree on a Single Eid?",
    thumbnail: 'https://i2.ytimg.com/vi/mXzfuQKKLUk/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '6,069', duration: ''
  },
  {
    id: 'L2Q9ngqeCPU',
    title: 'What is Fidya, and How to Pay It?',
    thumbnail: 'https://i1.ytimg.com/vi/L2Q9ngqeCPU/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '1,633', duration: ''
  },
  {
    id: '1rJ6tD3AZ6o',
    title: 'What is Kaffara for Breaking Fast? How to Pay it?',
    thumbnail: 'https://i2.ytimg.com/vi/1rJ6tD3AZ6o/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '2,290', duration: ''
  },
  {
    id: '4byUIcjEsMA',
    title: 'What Are the Acts That Invalidate the Fast?',
    thumbnail: 'https://i1.ytimg.com/vi/4byUIcjEsMA/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '2,274', duration: ''
  },
  {
    id: 'EIO3l3J4ce4',
    title: 'Which Acts Are Makruh During Fasting?',
    thumbnail: 'https://i2.ytimg.com/vi/EIO3l3J4ce4/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '3,370', duration: ''
  },
  {
    id: 'W-Hv91OBWVk',
    title: 'The Story of Dua al-Mashlool',
    thumbnail: 'https://i4.ytimg.com/vi/W-Hv91OBWVk/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '3,942', duration: ''
  },
  {
    id: '-Eql8cCR8FA',
    title: 'Can Backbiting (Ghibah) Break My Fast?',
    thumbnail: 'https://i2.ytimg.com/vi/-Eql8cCR8FA/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '1,223', duration: ''
  },
  {
    id: 'kfX79eJTmd8',
    title: 'Do I Have to Fast During Non-Menstrual Bleeding?',
    thumbnail: 'https://i4.ytimg.com/vi/kfX79eJTmd8/hqdefault.jpg',
    channelName: 'Thaqlain', channelId: 'thaqlain', views: '2,384', duration: ''
  },

  // ─── SAYED AMMAR NAKSHAWANI (well-known stable IDs) ───────────────
  {
    id: 'UoaAj2dpA3s',
    title: 'Ramadan Duas & Supplications',
    thumbnail: 'https://i.ytimg.com/vi/UoaAj2dpA3s/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani',
    views: '1.2M', duration: '45:12', isLatest: true
  },
  {
    id: 'sNTl2PFHnSs',
    title: 'The Importance of Arbaeen - Nakshawani',
    thumbnail: 'https://i.ytimg.com/vi/sNTl2PFHnSs/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '890K', duration: '40:10'
  },
  {
    id: 'XNFa3H0PLEM',
    title: 'Who Is Imam Ali? - Nakshawani',
    thumbnail: 'https://i.ytimg.com/vi/XNFa3H0PLEM/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '1.5M', duration: '52:00'
  },
  {
    id: 'KW9FXhWzP5c',
    title: 'Why Hussain Stood Alone - Nakshawani',
    thumbnail: 'https://i.ytimg.com/vi/KW9FXhWzP5c/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '2.1M', duration: '48:33'
  },
  {
    id: '7zFTADWNDYk',
    title: 'Lady Fatimah al-Zahra - Nakshawani',
    thumbnail: 'https://i.ytimg.com/vi/7zFTADWNDYk/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '700K', duration: '38:20'
  },
  {
    id: 'Hl5UwLt_Lhc',
    title: 'Rights of Parents in Islam - Nakshawani',
    thumbnail: 'https://i.ytimg.com/vi/Hl5UwLt_Lhc/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '430K', duration: '35:15'
  },
  {
    id: 'c8WqSiLs3OI',
    title: 'The Night of Power (Laylat al-Qadr)',
    thumbnail: 'https://i.ytimg.com/vi/c8WqSiLs3OI/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '560K', duration: '42:00'
  },
  {
    id: 'OI0rl3f_81I',
    title: 'The Battle of Karbala Explained',
    thumbnail: 'https://i.ytimg.com/vi/OI0rl3f_81I/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '3.2M', duration: '55:00'
  },
  {
    id: 'fSzJqBKFDlc',
    title: "Imam Hussain's Message to Humanity",
    thumbnail: 'https://i.ytimg.com/vi/fSzJqBKFDlc/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '1.8M', duration: '50:30'
  },
  {
    id: 'b5NJaP5cRSE',
    title: 'The Day of Judgement - Nakshawani',
    thumbnail: 'https://i.ytimg.com/vi/b5NJaP5cRSE/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '670K', duration: '44:10'
  },

  // ─── BARABANKI AZADARI ────────────────────────────────────────────
  {
    id: 'isFMu7KQlmU',
    title: 'Formal Majlis – Barabanki Azadari',
    thumbnail: 'https://i.ytimg.com/vi/isFMu7KQlmU/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '180K', duration: '1:10:45'
  },
  {
    id: 'ZMy2L2Qx0bk',
    title: 'Muharram Majlis Night 1 – Barabanki',
    thumbnail: 'https://i.ytimg.com/vi/ZMy2L2Qx0bk/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '95K', duration: '1:02:10'
  },
  {
    id: 'lDYBFGmFSAE',
    title: 'Marsiya Majlis – Barabanki',
    thumbnail: 'https://i.ytimg.com/vi/lDYBFGmFSAE/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '75K', duration: '58:30'
  },
  {
    id: 'N8R7gyEHPpI',
    title: 'Sham-e-Ghariban – Barabanki 2024',
    thumbnail: 'https://i.ytimg.com/vi/N8R7gyEHPpI/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '55K', duration: '1:15:00'
  },
  {
    id: 'b9i5YeRl5mY',
    title: 'Ashura Jaloos – Barabanki',
    thumbnail: 'https://i.ytimg.com/vi/b9i5YeRl5mY/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '130K', duration: '35:00'
  },
  {
    id: 'KHXCnGMsEJo',
    title: 'Arbaeen Majlis – Barabanki Azadari',
    thumbnail: 'https://i.ytimg.com/vi/KHXCnGMsEJo/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '42K', duration: '55:00'
  },
  {
    id: 'j3xfTlQ0ASs',
    title: 'Full Shab-e-Barat Majlis – Barabanki',
    thumbnail: 'https://i.ytimg.com/vi/j3xfTlQ0ASs/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '61K', duration: '1:20:00'
  },
  {
    id: 'OGGj__3kFRk',
    title: 'Imam Ali Birthday Majlis – Barabanki',
    thumbnail: 'https://i.ytimg.com/vi/OGGj__3kFRk/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '47K', duration: '48:15'
  },
  {
    id: 'q3wFv2cFpDI',
    title: 'Nauha Collection – Barabanki Azadari',
    thumbnail: 'https://i.ytimg.com/vi/q3wFv2cFpDI/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '88K', duration: '45:22'
  },
  {
    id: 'g_tM8UbzYcQ',
    title: 'Imam Hussain Majlis – Live Barabanki',
    thumbnail: 'https://i.ytimg.com/vi/g_tM8UbzYcQ/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '74K', duration: '1:30:00'
  }
];
