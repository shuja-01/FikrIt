"use client";

import { useState, useMemo } from "react";
import { Play, TrendingUp, Clock, Filter, Youtube, Search, Tv } from "lucide-react";
import { VIDEOS, VIDEO_CHANNELS, Video } from "@/core/video-data";

export default function VideoPortal() {
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return VIDEOS.filter(v => {
      const matchChannel = selectedChannel === "all" || v.channelId === selectedChannel;
      const matchSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchChannel && matchSearch;
    });
  }, [selectedChannel, searchQuery]);

  const latestBarabanki = useMemo(() => {
    return VIDEOS.find(v => v.channelId === 'barabanki' && v.isLatest);
  }, []);

  return (
    <main className="min-h-screen bg-brand-dark pt-10 pb-20 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Featured Latest Header (Only for @BarabankiAzadari as requested) */}
        {latestBarabanki && (
          <div className="relative h-[500px] mb-20 rounded-[40px] overflow-hidden group shadow-2xl animate-in zoom-in-95 duration-1000">
             <div 
               className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
               style={{ backgroundImage: `url(${latestBarabanki.thumbnail})` }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
             
             <div className="absolute bottom-16 left-16 max-w-2xl">
               <div className="flex items-center gap-3 mb-6">
                 <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[3px] shadow-lg animate-pulse">LATEST UPLOAD</span>
                 <span className="text-gray-300 font-medium flex items-center gap-2"><Tv size={16} /> {latestBarabanki.channelName}</span>
               </div>
               <h2 className="text-6xl font-serif font-black mb-8 leading-tight">{latestBarabanki.title}</h2>
               <div className="flex items-center gap-6">
                 <button className="bg-brand-gold text-white px-10 py-5 rounded-full font-black flex items-center gap-4 hover:bg-white hover:text-brand-dark transition-all shadow-2xl hover:shadow-brand-gold/40 scale-100 hover:scale-110 active:scale-95 duration-300">
                    <Play fill="currentColor" size={24} /> WATCH NOW
                 </button>
                 <div className="text-gray-400 font-medium flex items-center gap-8">
                   <span className="flex items-center gap-2 font-black text-white"><Clock size={16} className="text-brand-gold" /> {latestBarabanki.duration}</span>
                   <span className="flex items-center gap-2 font-black text-white"><Search size={16} className="text-brand-gold" /> {latestBarabanki.views} VIEWS</span>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* Global Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
             <button 
               onClick={() => setSelectedChannel("all")}
               className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-bold transition-all border-2 ${selectedChannel === 'all' ? 'bg-brand-gold border-brand-gold shadow-lg shadow-brand-gold/20' : 'bg-white/5 border-white/10 text-gray-400 hover:border-brand-gold/40'}`}
             >
               All Spiritual Channels
             </button>
             {VIDEO_CHANNELS.map(c => (
               <button 
                 key={c.id}
                 onClick={() => setSelectedChannel(c.id)}
                 className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-bold transition-all border-2 ${selectedChannel === c.id ? 'bg-brand-gold border-brand-gold shadow-lg shadow-brand-gold/20' : 'bg-white/5 border-white/10 text-gray-400 hover:border-brand-gold/40'}`}
               >
                 {c.name}
               </button>
             ))}
          </div>

          <div className="relative group w-full md:w-96">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-gold transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Search spiritual content..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white/5 border border-white/10 pl-14 pr-8 py-5 rounded-[22px] outline-none focus:ring-4 focus:ring-brand-gold/20 focus:border-brand-gold/40 transition-all font-medium placeholder-gray-600"
             />
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {filteredVideos.map((video, idx) => (
            <div 
              key={video.id + idx} 
              className="bg-white/5 border border-white/5 rounded-[32px] overflow-hidden hover:bg-white/10 transition-all group hover:translate-y-[-12px] duration-500 hover:shadow-2xl hover:shadow-brand-gold/5"
            >
              <div className="relative aspect-video overflow-hidden">
                 <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                       <Play fill="white" size={32} />
                    </div>
                 </div>
                 <div className="absolute bottom-4 right-4 bg-black/80 px-2.5 py-1 rounded-md text-xs font-black text-white">
                   {video.duration}
                 </div>
              </div>
              
              <div className="p-8">
                 <div className="flex items-center gap-2 mb-4">
                   <TrendingUp className="text-brand-gold" size={14} />
                   <span className="text-[10px] font-black text-brand-gold uppercase tracking-[2px]">MOST WATCHED</span>
                 </div>
                 <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-relaxed h-[3.5rem]">{video.title}</h3>
                 <div className="flex items-center justify-between text-gray-500 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/5">
                    <span className="flex items-center gap-2 text-gray-300">
                      <Youtube size={14} className="text-red-500" /> {video.channelName}
                    </span>
                    <span className="flex items-center gap-1.5"><TrendingUp size={12} fill="currentColor" /> {video.views}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
           <div className="py-40 text-center text-gray-600 font-medium animate-pulse">
              No matching spiritual videos found for your current filter.
           </div>
        )}
      </div>
    </main>
  );
}
