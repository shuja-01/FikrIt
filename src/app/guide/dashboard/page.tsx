"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageSquare, Clock, CheckCircle2, Loader2, User, AtSign, ShieldCheck, Send, ExternalLink, Award, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GuideDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState<{ [key: string]: string }>({});
  const [submitLoading, setSubmitLoading] = useState<{ [key: string]: boolean }>({});
  const [notifications, setNotifications] = useState<any[]>([]);
  const [myArticles, setMyArticles] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [questionsRes, notificationsRes, articlesRes] = await Promise.all([
        fetch("/api/guide/questions"),
        fetch("/api/notifications"),
        fetch("/api/articles/my")
      ]);

      const questionsData = await questionsRes.json();
      const notificationsData = await notificationsRes.json();
      const articlesData = await articlesRes.json();

      if (Array.isArray(questionsData)) setQuestions(questionsData);
      if (Array.isArray(notificationsData)) setNotifications(notificationsData);
      if (Array.isArray(articlesData)) setMyArticles(articlesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    if (session && (session.user as any).role !== 'DEENI_GUIDE') router.push("/profile");
    if (session) fetchData();
  }, [session, status]);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch("/api/guide/questions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: id, action: 'approve' })
      });
      if (res.ok) fetchData();
    } catch (err) {
       console.error(err);
    }
  };

  const handleAnswer = async (id: string) => {
    if (!answerContent[id]) return;
    setSubmitLoading(prev => ({ ...prev, [id]: true }));
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: id, content: answerContent[id] })
      });
      if (res.ok) {
        setAnswerContent(prev => ({ ...prev, [id]: "" }));
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete article. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-sand">
      <Loader2 className="animate-spin text-brand-gold h-12 w-12" />
    </div>
  );

  const pendingQuestions = questions.filter(q => q.answers.length === 0);
  const moderatedQuestions = questions.filter(q => q.parentId && !q.isPublic);
  const answeredQuestions = questions.filter(q => q.answers.length > 0);

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-serif font-bold text-brand-dark mb-2">Guide Dashboard</h1>
              <p className="text-gray-500 font-medium">Peace be upon you, {session?.user?.name}. Your wisdom is requested here.</p>
            </div>
            <div className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl border border-white/50 backdrop-blur-sm">
               <div className="bg-brand-gold/10 px-6 py-3 rounded-xl border border-brand-gold/10 text-center">
                  <p className="text-[10px] uppercase font-black text-brand-gold tracking-widest mb-1">Assigned</p>
                  <p className="text-2xl font-serif font-bold text-brand-dark leading-none">{questions.length}</p>
               </div>
               <div className="bg-green-50 px-6 py-3 rounded-xl border border-green-100 text-center">
                  <p className="text-[10px] uppercase font-black text-green-600 tracking-widest mb-1">Answered</p>
                  <p className="text-2xl font-serif font-bold text-brand-dark leading-none">{answeredQuestions.length}</p>
               </div>
               <Link 
                 href="/guide/articles/new"
                 className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg hover:shadow-brand-gold/20"
               >
                 <BookOpen size={18} className="text-brand-gold" /> Write New Article
               </Link>
            </div>
        </header>

        {/* Action Required: Follow-up Approvals */}
        {moderatedQuestions.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6 flex items-center gap-3">
               <ShieldCheck className="text-brand-gold" /> Pending Follow-up Approvals
            </h2>
            <div className="grid gap-4">
               {moderatedQuestions.map(q => (
                 <div key={q.id} className="bg-brand-gold/5 border-2 border-brand-gold/20 p-8 rounded-3xl shadow-sm animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-start justify-between gap-4 mb-4">
                       <div>
                          <p className="text-[10px] uppercase font-black text-brand-gold tracking-widest mb-2">New Follow-up Inquiry</p>
                          <h3 className="text-xl font-bold text-brand-dark leading-tight">{q.content}</h3>
                       </div>
                       <div className="flex gap-2">
                          <button 
                            onClick={() => handleApprove(q.id)}
                            className="px-6 py-2 bg-brand-gold text-white rounded-full text-xs font-bold shadow-md hover:brightness-110 transition-all"
                          >
                             Approve Publically
                          </button>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brand-gold font-medium bg-white/50 w-fit px-3 py-1 rounded-full border border-brand-gold/10">
                       <MessageSquare size={14} /> Part of thread: {q.parent?.title}
                    </div>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* Main Section: Worklist & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <header className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold text-brand-dark flex items-center gap-3">
                 <Clock className="text-brand-gold" /> My Tasks
              </h2>
            </header>

            <div className="space-y-8">
              {pendingQuestions.length === 0 ? (
                <div className="text-center py-20 bg-white/40 border border-dashed border-gray-200 rounded-[2.5rem]">
                   <CheckCircle2 size={48} className="mx-auto text-green-300 mb-4" />
                   <h3 className="text-2xl font-serif font-bold text-brand-dark">No pending tasks</h3>
                   <p className="text-gray-400">All questions assigned to you have been addressed. Alhamdulillah!</p>
                </div>
              ) : (
                pendingQuestions.map(q => (
                  <div key={q.id} className="glass-panel p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                         <User size={14} className="text-brand-gold" /> {q.author?.username || 'anonymous'}
                         <span className="mx-2">•</span>
                         <Clock size={14} className="text-brand-gold" /> {new Date(q.createdAt).toLocaleDateString()}
                      </div>
                      <Link href={`/forum/${q.id}`} className="text-brand-gold font-bold text-xs hover:underline flex items-center gap-1 group/link">
                         View Full Thread <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </Link>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">{q.title}</h3>
                    <div className="bg-brand-sand/50 p-6 rounded-2xl border border-brand-gold/5 mb-8">
                       <p className="text-brand-dark text-lg leading-relaxed whitespace-pre-wrap">{q.content}</p>
                    </div>

                    <div className="space-y-4">
                       <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">My Scholarly Perspective</label>
                       <textarea 
                         value={answerContent[q.id] || ""}
                         onChange={(e) => setAnswerContent(prev => ({ ...prev, [q.id]: e.target.value }))}
                         placeholder="Write your response citing relevant sources and wisdom..."
                         className="w-full p-8 bg-white border-2 border-gray-50 rounded-[2rem] min-h-[200px] outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all text-brand-dark leading-relaxed text-lg shadow-sm"
                       />
                       <button 
                          onClick={() => handleAnswer(q.id)}
                          disabled={submitLoading[q.id] || !answerContent[q.id]}
                          className="w-full py-5 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                          {submitLoading[q.id] ? <Loader2 className="animate-spin" size={24} /> : <><Award size={20} className="text-brand-gold" /> Post Official Response</>}
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-8 mt-16">
            <header className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold text-brand-dark flex items-center gap-3">
                 <BookOpen className="text-brand-gold" /> My Published Research
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {myArticles.length === 0 ? (
                <div className="md:col-span-2 text-center py-20 bg-white/40 border border-dashed border-gray-200 rounded-[2.5rem]">
                   <BookOpen size={48} className="mx-auto text-brand-gold/20 mb-4" />
                   <h3 className="text-2xl font-serif font-bold text-brand-dark">No research published yet</h3>
                   <p className="text-gray-400">Share your wisdom by writing your first article.</p>
                </div>
              ) : (
                myArticles.map(article => (
                  <div key={article.id} className="glass-panel p-8 relative overflow-hidden group">
                     <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${article.published ? 'bg-green-100 text-green-700' : 'bg-brand-gold/10 text-brand-gold'}`}>
                          {article.published ? 'Published' : 'Draft'}
                        </span>
                        <div className="flex gap-2">
                           <Link 
                             href={`/guide/articles/edit/${article.id}`}
                             className="p-2 hover:bg-brand-gold/10 rounded-full transition-colors text-brand-dark"
                           >
                             <Sparkles size={16} />
                           </Link>
                           <button 
                             onClick={() => handleDeleteArticle(article.id, article.title)}
                             className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                           >
                             <Loader2 size={16} className="text-red-400" />
                           </button>
                        </div>
                     </div>
                     <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 line-clamp-2">{article.title}</h3>
                     <p className="text-gray-500 text-sm mb-6 line-clamp-3">{article.excerpt || "No summary provided."}</p>
                     
                     <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                           <MessageSquare size={14} /> {article._count.comments} Reflections
                        </div>
                        <Link 
                          href={`/articles/${article.slug}`}
                          className="text-xs font-black text-brand-gold uppercase tracking-widest hover:underline"
                        >
                          Read Article
                        </Link>
                     </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Insights Sidebar */}
          <div className="lg:col-span-4 space-y-10">
             <div className="glass-panel p-10">
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-8 border-b border-gray-50 pb-4">Activity Insights</h3>
                
                {notifications.length > 0 ? (
                  <div className="space-y-6">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="flex gap-4 group cursor-pointer border-b border-gray-50 pb-6 last:border-0">
                         <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                         <div className="flex-1">
                            <p className="text-sm font-medium text-brand-dark leading-tight mb-2 group-hover:text-brand-gold transition-colors">
                              {notif.message}
                            </p>
                            <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                         </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                     <Sparkles size={32} className="text-brand-gold/20 mx-auto mb-4" />
                     <p className="text-gray-400 text-sm font-serif italic">No recent alerts. Your reflections are well-received.</p>
                  </div>
                )}
             </div>

             <div className="bg-brand-dark rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <Award size={32} className="text-brand-gold mb-6" />
                <h4 className="text-xl font-serif font-bold mb-4">Scholarly Impact</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                  You've addressed {answeredQuestions.length} community inquiries. Your insights are shaping our collective understanding.
                </p>
                <div className="h-1 bg-white/10 rounded-full w-full mb-2">
                   <div className="h-1 bg-brand-gold rounded-full w-[85%]" />
                </div>
                <p className="text-[10px] uppercase font-black text-brand-gold tracking-widest text-right">Commitment Level: Exceptional</p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
