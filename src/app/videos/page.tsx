"use client";

import { useState, useMemo } from "react";
import { Play, TrendingUp, Clock, Filter, Tv as VideoTv, Search, MonitorPlay, X } from "lucide-react";
import { VIDEOS, VIDEO_CHANNELS, type Video } from "@/core/video-data";

export default function VideoPortal() {
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

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
        
        {/* Featured Header */}
        {latestBarabanki && (
          <div className="relative h-[500px] mb-20 rounded-[40px] overflow-hidden group shadow-2xl animate-in zoom-in-95 duration-1000">
             <div 
               className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
               style={{ backgroundImage: `url(${latestBarabanki.thumbnail}), url('/ytThumnail.PNG')` }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
             
             <div className="absolute bottom-16 left-16 max-w-2xl">
               <div className="flex items-center gap-3 mb-6">
                 <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[3px] shadow-lg animate-pulse">LATEST UPLOAD</span>
                 <span className="text-gray-300 font-medium flex items-center gap-2"><VideoTv size={16} /> {latestBarabanki.channelName}</span>
               </div>
               <h2 className="text-6xl font-serif font-black mb-8 leading-tight">{latestBarabanki.title}</h2>
               <div className="flex items-center gap-6">
                 <button 
                   onClick={() => setActiveVideoId(latestBarabanki.id)}
                   className="bg-brand-gold text-white px-10 py-5 rounded-full font-black flex items-center gap-4 hover:bg-white hover:text-brand-dark transition-all shadow-2xl hover:shadow-brand-gold/40 scale-100 hover:scale-110 active:scale-95 duration-300"
                 >
                    <Play fill="currentColor" size={24} /> WATCH NOW
                 </button>
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
              onClick={() => setActiveVideoId(video.id)}
              className="cursor-pointer bg-white/5 border border-white/5 rounded-[32px] overflow-hidden hover:bg-white/10 transition-all group hover:translate-y-[-12px] duration-500 hover:shadow-2xl hover:shadow-brand-gold/5"
            >
              <div className="relative aspect-video overflow-hidden">
                 <img 
                    src={video.thumbnail} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as any).src = '/ytThumnail.PNG';
                    }} 
                 />
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
                      <MonitorPlay size={14} className="text-red-500" /> {video.channelName}
                    </span>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Fix for Restricted Videos */}
        {activeVideoId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 lg:p-20 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-300">
             <button 
               onClick={() => setActiveVideoId(null)}
               className="absolute top-10 right-10 p-4 bg-white/5 rounded-full hover:bg-brand-gold text-white transition-all shadow-2xl hover:scale-110 duration-300"
             >
                <X size={40} />
             </button>
             <div className="w-full h-full max-w-7xl max-h-[85vh] rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)] border border-white/10 animate-in zoom-in-95 duration-500 bg-black">
                <iframe 
                  key={activeVideoId}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="YouTube Playback"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
             </div>
          </div>
        )}

        {filteredVideos.length === 0 && (
           <div className="py-40 text-center text-gray-600 font-medium animate-pulse m-auto">
              No matching spiritual videos found for your current filter.
           </div>
        )}
      </div>
    </main>
  );
}
