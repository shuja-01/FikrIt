"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Clock, TrendingUp, Search } from "lucide-react";
import { Video, VIDEO_CHANNELS, VIDEOS } from "@/core/video-data";

export default function VideosPage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = VIDEOS.filter(v => {
    const matchesChannel = !selectedChannel || v.channelId === selectedChannel;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const latestVideo = VIDEOS.find(v => v.isLatest);

  const handlePlay = (video: Video) => {
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
  };

  const VideoThumbnail = ({ video }: { video: Video }) => {
    const [imgSrc, setImgSrc] = useState(video.thumbnail);
    const [fallbackTried, setFallbackTried] = useState(false);

    return (
      <img 
        src={imgSrc} 
        alt={video.title}
        onError={() => {
          if (!fallbackTried) {
             setImgSrc(`https://img.youtube.com/vi/${video.id}/0.jpg`);
             setFallbackTried(true);
          } else {
             setImgSrc('/logo.jpeg');
          }
        }}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    );
  };

  return (
    <main className="min-h-screen bg-brand-sand pt-24 px-6 md:px-12 lg:px-24 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Spiritual Content</h1>
            <p className="text-gray-600 max-w-xl">Curated collections of Majalis and Islamic knowledge from top authentic channels.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setSelectedChannel(null)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!selectedChannel ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              All Spiritual Channels
            </button>
            {VIDEO_CHANNELS.map(channel => (
              <button 
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedChannel === channel.id ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-gray-400'}`}
              >
                {channel.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Video (Force New Tab) */}
        {latestVideo && !selectedChannel && (
          <div className="mb-16 group cursor-pointer" onClick={() => handlePlay(latestVideo)}>
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black/5">
              <VideoThumbnail video={latestVideo} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3">
                <div className="flex items-center gap-2 text-brand-gold font-black text-xs uppercase tracking-widest mb-3">
                  <Play size={12} fill="currentColor" /> Latest Featured Release
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-brand-gold transition-colors">
                  {latestVideo.title}
                </h2>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span className="bg-white/10 px-3 py-1 rounded-full">{latestVideo.channelName}</span>
                  <span>{latestVideo.views} views</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {latestVideo.duration}</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map(video => (
            <div 
              key={video.id} 
              className="flex flex-col group cursor-pointer"
              onClick={() => handlePlay(video)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4 bg-black/5">
                <VideoThumbnail video={video} />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </div>
              
              <div className="px-1">
                <div className="flex items-center gap-1.5 text-brand-gold font-black text-[10px] uppercase tracking-widest mb-1">
                   <TrendingUp size={10} /> Most Watched
                </div>
                <h3 className="font-serif font-bold text-brand-dark mb-2 text-lg leading-snug group-hover:text-brand-gold transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase opacity-70">
                   {video.channelName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
