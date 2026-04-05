"use client";

import { useEffect, useState } from "react";
import { User, MessageCircle, Clock, AtSign, Loader2, Award, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PublicGuideProfile() {
  const params = useParams();
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/guide/profile/${params.username}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setGuide(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.username]);

  if (loading) return (
    <div className="min-h-screen bg-brand-sand flex items-center justify-center">
      <Loader2 className="animate-spin text-brand-gold" size={48} />
    </div>
  );

  if (!guide) return (
    <div className="min-h-screen bg-brand-sand pt-24 px-6 text-center">
       <h1 className="text-3xl font-serif font-bold text-brand-dark mb-4">Guide Profile Not Found</h1>
       <Link href="/forum" className="text-brand-gold font-bold hover:underline">&larr; Back to Forum</Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel p-12 shadow-2xl relative overflow-hidden mb-12 border-t-8 border-brand-gold/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative">
            <div className="w-40 h-40 rounded-[2.5rem] bg-brand-dark border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center ring-1 ring-gray-100 shrink-0">
               {guide.image ? (
                 <img src={guide.image} className="w-full h-full object-cover" />
               ) : (
                 <Award className="text-brand-gold" size={64} />
               )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="text-5xl font-serif font-bold text-brand-dark">{guide.name}</h1>
                    {guide.scholarTitle && (
                      <span className="bg-brand-gold/10 text-brand-gold text-xs uppercase font-black tracking-[0.2em] px-4 py-1.5 rounded-full border border-brand-gold/20">
                        {guide.scholarTitle}
                      </span>
                    )}
                 </div>
                 <p className="text-brand-gold font-bold flex items-center justify-center md:justify-start gap-2 text-lg">
                    <AtSign size={18} /> {guide.username}
                 </p>
              </div>

              <div className="bg-brand-sand/50 p-6 rounded-3xl border border-brand-gold/5 italic text-gray-600 leading-relaxed text-lg">
                 "{guide.bio || 'Our deeni guide is dedicated to bringing clarity and guidance through scholarly perspectives.'}"
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-4">
                 <div className="flex items-center gap-2">
                    <MessageCircle className="text-brand-gold" size={20} />
                    <span className="font-bold text-brand-dark">{guide._count?.answers || 0}</span>
                    <span className="text-gray-400 text-sm font-medium">Thoughts Shared</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <GraduationCap className="text-brand-gold" size={20} />
                    <span className="text-gray-400 text-sm font-medium italic">Verified Representative</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl font-serif font-bold text-brand-dark flex items-center gap-3 pl-4">
              <Clock size={28} className="text-brand-gold opacity-50" /> Recent Scholarly Contributions
           </h2>

           {guide.answers?.length === 0 ? (
             <div className="bg-white/40 border border-dashed border-gray-200 rounded-[2.5rem] p-16 text-center">
                <p className="text-gray-400 italic">No public contributions yet. Stay tuned for their wisdom.</p>
             </div>
           ) : (
             <div className="grid gap-6">
                {guide.answers.map((answer: any) => (
                  <Link 
                    key={answer.id} 
                    href={`/forum/${answer.question.id}`}
                    className="block bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:translate-x-2 transition-all group"
                  >
                     <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-3">Topic Discussion</p>
                     <h3 className="text-xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-gold transition-colors">{answer.question.title}</h3>
                     <p className="text-gray-500 line-clamp-2 leading-relaxed italic">" {answer.content.substring(0, 150)}... "</p>
                     <div className="mt-6 flex items-center justify-end text-brand-gold font-bold text-sm">
                        View Thread <ChevronRight size={16} />
                     </div>
                  </Link>
                ))}
             </div>
           )}
        </div>
      </div>
    </main>
  );
}
