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
    id: 'fUpfvu_OAmE',
    title: '25. Tanya Jawab Bulan Suci Ramadhan (Bagian 1) | Sayed Ammar Nakshawani | Ramadhan 2026',
    thumbnail: 'https://i.ytimg.com/vi/fUpfvu_OAmE/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '6,567K', duration: '57:29', isLatest: true
  },
  {
    id: '5ZIVAEY9c6A',
    title: '24. Apakah Imam Ali Menamai Putranya Umar? | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/5ZIVAEY9c6A/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '7,701K', duration: '50:36'
  },
  {
    id: 'UoaAj2dpA3s',
    title: '23. Ten Powerful Sunni & Shia Duas | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/UoaAj2dpA3s/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '4,176K', duration: '1:18:03'
  },
  {
    id: 'f44i7EG-nAk',
    title: '22. The Muslim Lantern: Sunni-Shia Unity | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/f44i7EG-nAk/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '21,743K', duration: '55:16'
  },
  {
    id: 'Vq_mSPo4nv8',
    title: '21. Is Imam Ali Greater Than The Prophets? | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/Vq_mSPo4nv8/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '11,084K', duration: '1:35:56'
  },
  {
    id: 'gqHV0HpWquE',
    title: '20. Raise Your Children Loving Imam Ali | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/gqHV0HpWquE/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '13,148K', duration: '1:20:20'
  },
  {
    id: 'ZHXW5rMZI00',
    title: '19. Imam Ali & The Ethics Of War | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/ZHXW5rMZI00/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '36,384K', duration: '1:12:59'
  },
  {
    id: 'H4_HsXqkAfw',
    title: '18. Imamate In The Qur’an | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/H4_HsXqkAfw/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '9,476K', duration: '1:03:41'
  },
  {
    id: 'Me8t3vF6pBg',
    title: '17. Khalid Ibn Waleed Or Imam Ali: Sword Of Allah? | Sayed Ammar Nakshawani | Ramadan 2026',
    thumbnail: 'https://i.ytimg.com/vi/Me8t3vF6pBg/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '8,777K', duration: '1:00:03'
  },
  {
    id: '92AD4SRPeSU',
    title: '16. Mengapa Para Sahabat Bertengkar, Menghina & Membenci Imam Ali? | Sayed Ammar Nakshawani | Ram...',
    thumbnail: 'https://i.ytimg.com/vi/92AD4SRPeSU/hqdefault.jpg',
    channelName: 'Sayed Ammar Nakshawani', channelId: 'nakshawani', views: '10,806K', duration: '51:31'
  },

  // ─── BARABANKI AZADARI ────────────────────────────────────────────
  {
    id: 'h4gnwlVWz8k',
    title: 'माँ माँ होती है 💔 | Syed Monis Raza Naqvi | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/h4gnwlVWz8k/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '148K', duration: '6:15'
  },
  {
    id: 'hvYjuXhOrsw',
    title: 'Aza-E-Fatmiya | क्यों छोड़ जाती है माँ | Monis Raza Naqvi | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/hvYjuXhOrsw/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '203K', duration: '6:20'
  },
  {
    id: 'isFMu7KQlmU',
    title: 'Marsiya | Jnb Tasawwar mehndi Sb | Kesaruva Sadat Barabanki | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/isFMu7KQlmU/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '299K', duration: '14:06'
  },
  {
    id: 'VKoJH5JiDWo',
    title: 'मदीने वापसी पर दिल सोज़ मंजर | 8 RabiulAwwal | Bhanauli Sadat Musafirkhana | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/VKoJH5JiDWo/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '519K', duration: '5:36'
  },
  {
    id: '9mJP3ExHqe0',
    title: 'Dardnak Naqabat | Zeeshan Ali Azmi | Sarai Ismail Barabanki | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/9mJP3ExHqe0/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '417K', duration: '8:22'
  },
  {
    id: 'EB9Lx31_3JU',
    title: 'Nasheb Me | Abbas Ali Arfi | Karbala Civil Line Barabanki | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/EB9Lx31_3JU/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '304K', duration: '15:32'
  },
  {
    id: '2PhNTBCdpuM',
    title: 'Wo Sakina Bahen Thi Meri | Shabih Abbas Arfi | Zaidpur Barabanki | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/2PhNTBCdpuM/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '445K', duration: '7:20'
  },
  {
    id: '96PS-BNGlqk',
    title: 'Tumhari Lash Pahchanu Mai Kaisae | Ali Moosa | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/96PS-BNGlqk/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '8,430K', duration: '12:01'
  },
  {
    id: '0A1a32lhrWg',
    title: 'Dariya Alam | 25 Moharram | Belaon Sayyedwada Barabanki | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/0A1a32lhrWg/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '872K', duration: '5:21'
  },
  {
    id: 'ylXyC0YSGC4',
    title: 'सीने में जवां लाल के बरछी की अनी है 💔 | Anjuman Haidariya Maniharpur | 2025 |',
    thumbnail: 'https://i.ytimg.com/vi/ylXyC0YSGC4/hqdefault.jpg',
    channelName: 'Barabanki Azadari', channelId: 'barabanki', views: '396K', duration: '15:15'
  }
];
