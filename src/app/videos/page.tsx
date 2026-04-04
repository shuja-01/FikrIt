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

  return (
    <main className="min-h-screen bg-brand-sand pt-24 px-6 md:px-12 lg:px-24 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Spiritual Content</h1>
            <p className="text-gray-600 mt-2">Curated Majalis and Islamic knowledge from top authentic channels.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setSelectedChannel(null)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!selectedChannel ? 'bg-brand-gold text-white' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
            >
              All Spiritual Channels
            </button>
            {VIDEO_CHANNELS.map(channel => (
              <button 
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedChannel === channel.id ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
              >
                {channel.name}
              </button>
            ))}
          </div>
        </div>

        {/* Latest Video Card (Opens YouTube) */}
        {latestVideo && !selectedChannel && (
          <div className="mb-16 group cursor-pointer" onClick={() => handlePlay(latestVideo)}>
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={latestVideo.thumbnail} 
                alt={latestVideo.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 text-brand-gold font-black text-xs uppercase tracking-widest mb-3">
                  <Play size={12} fill="currentColor" /> Latest Featured Release
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-brand-gold transition-colors">
                  {latestVideo.title}
                </h2>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">{latestVideo.channelName}</span>
                  <span>{latestVideo.views} views</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {latestVideo.duration}</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-2xl">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid (All Open in New Tab) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map(video => (
            <div 
              key={video.id} 
              className="flex flex-col group cursor-pointer"
              onClick={() => handlePlay(video)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-4">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-white">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="px-1">
                <div className="flex items-center gap-1.5 text-brand-gold font-black text-[10px] uppercase tracking-widest mb-1">
                   <TrendingUp size={10} /> Most Watched
                </div>
                <h3 className="font-serif font-bold text-brand-dark mb-2 text-lg leading-snug group-hover:text-brand-gold transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium font-black opacity-70">
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
