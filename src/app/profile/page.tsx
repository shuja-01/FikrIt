"use client";

import { useSession } from "next-auth/react";
import { User, Mail, ShieldCheck, Phone, Heart, BookOpen, Trash2, Loader2, ChevronLeft, MessageCircle, Clock, CheckCircle2, AtSign } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  useEffect(() => {
    if (session) {
      fetch("/api/profile/questions")
        .then(res => res.json())
        .then(data => {
           if (Array.isArray(data)) setQuestions(data);
           setLoadingQuestions(false);
        })
        .catch(err => {
           console.error(err);
           setLoadingQuestions(false);
        });
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-brand-sand flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-gold" size={48} />
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
      let success = false;
      try {
        const res = await fetch("/api/profile/delete", { method: "DELETE" });
        if (res.ok) {
           success = true;
        }
      } catch (err) {
        console.error(err);
      }
      
      if (success) {
        await signOut({ callbackUrl: "/" });
      }
    }
  };

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <div className="glass-panel p-10 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-brand-sand border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
               {session.user?.image ? (
                 <img src={session.user.image} className="w-full h-full object-cover" />
               ) : (
                 <User className="text-brand-gold/50" size={40} />
               )}
            </div>
            <div className="text-center md:text-left">
               <h1 className="text-4xl font-serif font-bold text-brand-dark mb-1">{session.user?.name}</h1>
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                 <p className="text-brand-gold font-bold flex items-center gap-2">
                   <ShieldCheck size={16} /> {(session.user as any)?.role || "User"}
                 </p>
                 {(session.user as any)?.username && (
                   <p className="text-gray-400 font-medium flex items-center gap-1 text-sm bg-gray-100/50 px-3 py-1 rounded-full border border-gray-200/50">
                     <AtSign size={14} /> {(session.user as any).username}
                   </p>
                 )}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                    <Mail size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</p>
                    <p className="font-medium">{session.user?.email}</p>
                  </div>
               </div>

               {(session.user as any)?.phone && (
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                      <Phone size={18} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Phone Number</p>
                      <p className="font-medium">{(session.user as any).phone}</p>
                    </div>
                 </div>
               )}
            </div>

            <div className="space-y-4">
               {(session.user as any)?.gender && (
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                      <Heart size={18} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Gender</p>
                      <p className="font-medium capitalize">{(session.user as any).gender}</p>
                    </div>
                 </div>
               )}

               {(session.user as any)?.marjae && (
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                      <BookOpen size={18} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Marja-e-Taqleed</p>
                      <p className="font-medium">{(session.user as any).marjae}</p>
                    </div>
                 </div>
               )}
            </div>
          </div>

          <div className="mt-12 space-y-6">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-serif font-bold text-brand-dark flex items-center gap-2">
                   <MessageCircle size={24} className="text-brand-gold" /> My Questions
                </h2>
                <Link href="/ask" className="text-sm font-bold text-brand-gold hover:underline">Ask New Question &rarr;</Link>
             </div>

             {loadingQuestions ? (
               <div className="flex items-center justify-center py-10">
                  <Loader2 className="animate-spin text-brand-gold/30" />
               </div>
             ) : questions.length === 0 ? (
               <div className="bg-white/40 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                  <p className="text-gray-400 mb-4 italic">No questions found. Start exploring your thoughts by asking our scholars.</p>
                  <Link href="/ask" className="inline-block px-8 py-3 bg-brand-gold text-white rounded-full font-bold shadow-lg hover:brightness-110 transition-all">Ask a Question</Link>
               </div>
             ) : (
               <div className="grid gap-4">
                  {questions.map((q) => (
                    <div key={q.id} className="bg-white/80 border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                       <div className="space-y-1 pr-4">
                          <h4 className="font-bold text-brand-dark group-hover:text-brand-gold transition-colors">{q.title}</h4>
                          <p className="text-xs text-gray-400 font-medium">Submitted on {new Date(q.createdAt).toLocaleDateString()}</p>
                       </div>
                       <div className="flex items-center gap-3 shrink-0">
                          {q.answers && q.answers.length > 0 ? (
                            <span className="bg-green-50 text-green-600 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-green-100 flex items-center gap-1 shadow-sm">
                               <CheckCircle2 size={12} /> Answered
                            </span>
                          ) : (
                            <span className="bg-amber-50 text-amber-600 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-amber-100 flex items-center gap-1 shadow-sm">
                               <Clock size={12} /> Pending Scholar
                            </span>
                          )}
                          <Link href={`/forum/${q.id}`} className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-brand-gold/10 hover:text-brand-gold transition-all">
                             <ChevronLeft size={20} className="rotate-180" />
                          </Link>
                       </div>
                    </div>
                  ))}
               </div>
             )}
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-wrap gap-4 mt-12">
             <button 
              onClick={async () => { await signOut({ callbackUrl: "/" }); }}
               className="px-6 py-2 bg-brand-dark text-white rounded-full text-sm font-bold hover:bg-black transition-all"
             >
                Sign Out
             </button>
             <button 
               onClick={handleDelete}
               className="px-6 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold hover:bg-red-100 transition-all flex items-center gap-2"
             >
                <Trash2 size={16} /> Delete Account
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}
