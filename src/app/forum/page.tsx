"use client";

import { useEffect, useState } from "react";
import { MessageCircle, MessageSquare, Clock, User, AtSign, Loader2, Search, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ForumPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/forum")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
           <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Community Forum</h1>
           <p className="text-gray-500 max-w-xl mx-auto mb-8">Discuss topics, ask scholars, and explore our library of questions and answers guided by scholarly perspectives.</p>
           
           <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search forum topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/80 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all shadow-sm"
              />
           </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <Loader2 className="animate-spin text-brand-gold mb-4" size={48} />
            <p className="font-serif italic text-brand-dark">Illuminating the path...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-20 glass-panel border-dashed border-2">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">No results found</h3>
            <p className="text-gray-400">Be the first to spark a conversation about this topic.</p>
            <Link href="/ask" className="mt-8 inline-block px-10 py-3 bg-brand-dark text-white rounded-full font-bold hover:bg-black transition-all shadow-md">Start a Discussion</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q) => (
              <Link 
                key={q.id} 
                href={`/forum/${q.id}`}
                className="block glass-panel p-8 hover:shadow-xl hover:translate-y-[-2px] transition-all relative group overflow-hidden border-2 border-transparent hover:border-brand-gold/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center border-2 border-white ring-1 ring-gray-100 shadow-sm overflow-hidden">
                       {q.author?.image ? (
                         <img src={q.author.image} className="w-full h-full object-cover" />
                       ) : (
                         <User className="text-brand-gold/50" size={20} />
                       )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">Posted by</p>
                      <p className="font-medium text-brand-dark flex items-center gap-1">
                        <AtSign size={12} className="text-brand-gold" /> {q.author?.username || 'anonymous'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <Clock size={12} /> {new Date(q.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-3 group-hover:text-brand-gold transition-colors">{q.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-6 leading-relaxed">{q.content}</p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-brand-gold font-bold text-sm">
                      <MessageCircle size={18} />
                      {q._count?.answers || 0} Responses
                    </div>
                    {q.answers && q.answers.length > 0 && (
                      <div className="flex items-center gap-1.5 bg-green-50 text-green-600 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-green-100 shadow-sm">
                         <ShieldCheck size={12} /> Scholar Certified
                      </div>
                    )}
                  </div>
                  <span className="text-brand-gold font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                    View Thread <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
