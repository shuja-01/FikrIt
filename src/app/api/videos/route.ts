import { NextResponse } from 'next/server';

// YouTube public RSS feeds don't require API key
const CHANNELS: Record<string, { name: string; channelId: string; label: string }> = {
  barabanki: {
    name: 'Barabanki Azadari',
    channelId: 'UCKWpuTAHzgOKqLXCkHdWBZw',
    label: 'barabanki'
  },
  nakshawani: {
    name: 'Sayed Ammar Nakshawani',
    channelId: 'UCf-5sPiTGJiuJFYfSnKBQ2w',
    label: 'nakshawani'
  },
  thaqlain: {
    name: 'Thaqlain',
    channelId: 'UCTMaUGyvmcJKDTIVqODGJGw',
    label: 'thaqlain'
  }
};

async function fetchChannelVideos(channel: (typeof CHANNELS)[string]) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channelId}`;
  const res = await fetch(rssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!res.ok) return [];

  const xml = await res.text();

  // Parse <entry> blocks from XML
  const entries: any[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const idMatch = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = block.match(/<title>(.*?)<\/title>/);
    const publishedMatch = block.match(/<published>(.*?)<\/published>/);
    const viewCountMatch = block.match(/<media:statistics views="(\d+)"/);

    if (idMatch && titleMatch) {
      const videoId = idMatch[1].trim();
      entries.push({
        id: videoId,
        title: titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim(),
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        channelName: channel.name,
        channelId: channel.label,
        views: viewCountMatch ? Number(viewCountMatch[1]).toLocaleString() : 'N/A',
        duration: '',
        published: publishedMatch ? publishedMatch[1] : ''
      });
    }
  }

  return entries.slice(0, 15); // Latest 15 per channel
}

export async function GET() {
  try {
    const [barabanki, nakshawani, thaqlain] = await Promise.all([
      fetchChannelVideos(CHANNELS.barabanki),
      fetchChannelVideos(CHANNELS.nakshawani),
      fetchChannelVideos(CHANNELS.thaqlain)
    ]);

    // Mark the most recent Barabanki video as 'isLatest'
    if (barabanki.length > 0) {
      barabanki[0].isLatest = true;
    }

    const all = [...barabanki, ...nakshawani, ...thaqlain];

    return NextResponse.json({ videos: all });
  } catch (error) {
    console.error('RSS fetch error:', error);
    return NextResponse.json({ videos: [] }, { status: 500 });
  }
}
