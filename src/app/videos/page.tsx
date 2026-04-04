"use client";

import { useState } from "react";
import { Play, TrendingUp } from "lucide-react";
import { Video, VIDEO_CHANNELS, VIDEOS } from "@/core/video-data";

function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const [imgSrc, setImgSrc] = useState(video.thumbnail);
  const [tries, setTries] = useState(0);

  const handleError = () => {
    const fallbacks = [
      `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`,
      `https://i.ytimg.com/vi/${video.id}/default.jpg`,
      `/ytThumnail.png`,
    ];
    if (tries < fallbacks.length) {
      setImgSrc(fallbacks[tries]);
      setTries(t => t + 1);
    }
  };

  return (
    <div className="flex flex-col group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-100">
        <img
          src={imgSrc}
          alt={video.title}
          onError={handleError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
          <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all shadow-xl">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
        {video.isLatest && (
          <div className="absolute top-2 left-2 bg-brand-gold text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
            Latest
          </div>
        )}
      </div>
      <div className="px-1">
        <div className="flex items-center gap-1.5 text-brand-gold font-black text-[10px] uppercase tracking-widest mb-1">
          <TrendingUp size={10} /> Most Watched
        </div>
        <h3 className="font-serif font-bold text-brand-dark mb-2 text-base leading-snug group-hover:text-brand-gold transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="text-xs text-gray-500 font-bold uppercase opacity-70">
          {video.channelName}
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const filteredVideos = selectedChannel
    ? VIDEOS.filter(v => v.channelId === selectedChannel)
    : VIDEOS;

  const latestVideo = VIDEOS.find(v => v.isLatest);

  const handlePlay = (video: Video) => {
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-brand-sand pt-24 px-6 md:px-12 lg:px-24 pb-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-2">Spiritual Content</h1>
            <p className="text-gray-500">Curated Majalis and Islamic knowledge from authentic channels.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedChannel(null)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!selectedChannel ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}
            >
              All Channels
            </button>
            {VIDEO_CHANNELS.map(channel => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedChannel === channel.id ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
              >
                {channel.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Latest Video */}
        {latestVideo && !selectedChannel && (
          <div className="mb-16 group cursor-pointer" onClick={() => handlePlay(latestVideo)}>
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
              <img
                src={latestVideo.thumbnail}
                alt={latestVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `/ytThumnail.png`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full md:w-3/4">
                <div className="flex items-center gap-2 text-brand-gold font-black text-xs uppercase tracking-widest mb-3">
                  <Play size={12} fill="currentColor" /> Latest Featured Release
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-brand-gold transition-colors">
                  {latestVideo.title}
                </h2>
                <p className="text-white/70 text-sm">{latestVideo.channelName} · {latestVideo.views} views</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-2xl scale-90 group-hover:scale-100 transition-all">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} onClick={() => handlePlay(video)} />
          ))}
        </div>

      </div>
    </main>
  );
}
