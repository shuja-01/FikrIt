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
  // ─────────────────────────────────────────
  // SAYED AMMAR NAKSHAWANI (10 videos)
  // ─────────────────────────────────────────
  {
    id: 'UoaAj2dpA3s',
    title: 'Ramadan Duas & Supplications – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/UoaAj2dpA3s/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.2M',
    duration: '45:12',
    isLatest: true
  },
  {
    id: 'hJLX10bHVY4',
    title: 'Who Killed Hussain? – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/hJLX10bHVY4/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '2.4M',
    duration: '42:30'
  },
  {
    id: 'mnkFVFSqz0Y',
    title: 'The Character of Imam Ali – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/mnkFVFSqz0Y/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '900K',
    duration: '38:44'
  },
  {
    id: 'U2XvZPflp4I',
    title: 'The Tragedy of Karbala – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/U2XvZPflp4I/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '3.1M',
    duration: '51:09'
  },
  {
    id: 'JHKxH5lnr3Y',
    title: 'Imam Hussain: A Modern Perspective – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/JHKxH5lnr3Y/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.8M',
    duration: '49:00'
  },
  {
    id: 'TZU7g5xGjB8',
    title: 'The Prophet\'s Final Days – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/TZU7g5xGjB8/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '760K',
    duration: '44:15'
  },
  {
    id: 'dS52JbM8iB8',
    title: 'Imam Mahdi – The Hidden Imam – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/dS52JbM8iB8/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '870K',
    duration: '41:20'
  },
  {
    id: 'zjXrJfUHVz4',
    title: 'Zainab bint Ali – The Voice of Karbala',
    thumbnail: 'https://img.youtube.com/vi/zjXrJfUHVz4/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '520K',
    duration: '36:55'
  },
  {
    id: 'pVvJOPxk1Ow',
    title: 'The Day of Ashura – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/pVvJOPxk1Ow/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '1.5M',
    duration: '1:00:10'
  },
  {
    id: 'p5Vqy74GACM',
    title: 'Love for Ahlul Bayt – Nakshawani',
    thumbnail: 'https://img.youtube.com/vi/p5Vqy74GACM/0.jpg',
    channelName: 'Sayed Ammar Nakshawani',
    channelId: 'nakshawani',
    views: '400K',
    duration: '33:41'
  },

  // ─────────────────────────────────────────
  // THAQLAIN (10 videos)
  // ─────────────────────────────────────────
  {
    id: 'Q2U1B0EahDg',
    title: 'Zakat al-Fitra – Spiritual Guide',
    thumbnail: 'https://img.youtube.com/vi/Q2U1B0EahDg/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '300K',
    duration: '8:20'
  },
  {
    id: 'aLcl_jIuOOk',
    title: 'Who is Hussain? Life Lessons',
    thumbnail: 'https://img.youtube.com/vi/aLcl_jIuOOk/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '800K',
    duration: '15:20'
  },
  {
    id: 'DFOCb2iMZ8Y',
    title: 'The Real Story of Karbala – Thaqlain',
    thumbnail: 'https://img.youtube.com/vi/DFOCb2iMZ8Y/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '540K',
    duration: '20:05'
  },
  {
    id: 'RVMN-rQBlCI',
    title: 'Ghadir Khumm – The Forgotten Event',
    thumbnail: 'https://img.youtube.com/vi/RVMN-rQBlCI/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '420K',
    duration: '18:40'
  },
  {
    id: 'Xrfmg_PXMW0',
    title: 'Lady Fatima al-Zahra – Thaqlain',
    thumbnail: 'https://img.youtube.com/vi/Xrfmg_PXMW0/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '610K',
    duration: '22:10'
  },
  {
    id: 'f0MpOSW1tYA',
    title: 'How to Perform Salah Correctly – Thaqlain',
    thumbnail: 'https://img.youtube.com/vi/f0MpOSW1tYA/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '250K',
    duration: '10:55'
  },
  {
    id: 'V-VZn-AkTy8',
    title: 'Night of Power – Laylat al-Qadr',
    thumbnail: 'https://img.youtube.com/vi/V-VZn-AkTy8/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '380K',
    duration: '14:20'
  },
  {
    id: 'hTSyYlMnmV0',
    title: 'Islamic Ethics for Modern Life – Thaqlain',
    thumbnail: 'https://img.youtube.com/vi/hTSyYlMnmV0/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '190K',
    duration: '12:30'
  },
  {
    id: 'NzPJEiWG7kA',
    title: 'The Rights of Parents in Islam – Thaqlain',
    thumbnail: 'https://img.youtube.com/vi/NzPJEiWG7kA/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '220K',
    duration: '11:10'
  },
  {
    id: '5vqKqmhpxqA',
    title: 'Muharram – Why We Cry for Hussain',
    thumbnail: 'https://img.youtube.com/vi/5vqKqmhpxqA/0.jpg',
    channelName: 'Thaqlain',
    channelId: 'thaqlain',
    views: '660K',
    duration: '16:50'
  },

  // ─────────────────────────────────────────
  // BARABANKI AZADARI (10 videos)
  // ─────────────────────────────────────────
  {
    id: 'isFMu7KQlmU',
    title: 'Formal Majlis – Barabanki Azadari',
    thumbnail: 'https://img.youtube.com/vi/isFMu7KQlmU/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '180K',
    duration: '1:10:45'
  },
  {
    id: 'kJHvKS7Xq2A',
    title: 'Marsiya – Barabanki Azadari 2024',
    thumbnail: 'https://img.youtube.com/vi/kJHvKS7Xq2A/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '95K',
    duration: '58:30'
  },
  {
    id: 'WKhKCNTQxVY',
    title: 'Nauha – Muharram 1445 – Barabanki',
    thumbnail: 'https://img.youtube.com/vi/WKhKCNTQxVY/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '70K',
    duration: '45:22'
  },
  {
    id: 'PBnQg0vKczU',
    title: 'Sham e Ghariban – Barabanki',
    thumbnail: 'https://img.youtube.com/vi/PBnQg0vKczU/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '55K',
    duration: '1:02:10'
  },
  {
    id: 'LVFoFoFQWxU',
    title: 'Arbaeen Majlis – Barabanki Azadari',
    thumbnail: 'https://img.youtube.com/vi/LVFoFoFQWxU/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '42K',
    duration: '55:00'
  },
  {
    id: 'TvWZoD3x3qE',
    title: 'Full Majlis Night 1 – Muharram',
    thumbnail: 'https://img.youtube.com/vi/TvWZoD3x3qE/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '88K',
    duration: '1:24:33'
  },
  {
    id: 'zQWxWR7VPvE',
    title: 'Muharram Night 3 – Azadari Barabanki',
    thumbnail: 'https://img.youtube.com/vi/zQWxWR7VPvE/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '61K',
    duration: '1:15:20'
  },
  {
    id: 'r2-UdY5oSh8',
    title: 'Imam Ali Birthday Majlis – Barabanki',
    thumbnail: 'https://img.youtube.com/vi/r2-UdY5oSh8/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '47K',
    duration: '48:15'
  },
  {
    id: 'B_pjZCzGVRE',
    title: 'Ashura Jaloos – Barabanki 2024',
    thumbnail: 'https://img.youtube.com/vi/B_pjZCzGVRE/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '130K',
    duration: '35:00'
  },
  {
    id: 'JjL-7jLjEME',
    title: 'Shab e Ashura Majlis – Barabanki',
    thumbnail: 'https://img.youtube.com/vi/JjL-7jLjEME/0.jpg',
    channelName: 'Barabanki Azadari',
    channelId: 'barabanki',
    views: '74K',
    duration: '1:30:00'
  }
];
