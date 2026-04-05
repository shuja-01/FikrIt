"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, MessageSquare, Clock, User, AtSign, Loader2, ChevronLeft, ShieldCheck, Send, Info, Award, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [thread, setThread] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [followupContent, setFollowupContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchThread = () => {
     fetch(`/api/forum/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setThread(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchThread();
  }, [params.id]);

  const handleFollowup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followupContent || submitLoading) return;
    
    setSubmitLoading(true);
    try {
       const res = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
             title: `Follow-up: ${thread.title}`,
             content: followupContent,
             parentId: thread.id
          })
       });
       
       if (res.ok) {
          setMessage("Your follow-up question has been submitted for approval.");
          setFollowupContent("");
          // Note: It won't show up immediately because it requires approval
       }
    } catch (err) {
       console.error(err);
    } finally {
       setSubmitLoading(false);
    }
  };

  const handleDeleteThread = async () => {
    if (!confirm("Are you sure you want to permanently delete this thread?")) return;
    try {
      const res = await fetch(`/api/forum/${thread.id}`, { method: 'DELETE' });
      if (res.ok) router.push('/forum');
      else alert("Failed to delete thread.");
    } catch (err) { console.error(err); }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (!confirm("Are you sure you want to remove this response?")) return;
    try {
      const res = await fetch(`/api/answers/${answerId}`, { method: 'DELETE' });
      if (res.ok) {
        setThread({
          ...thread,
          answers: thread.answers.filter((a: any) => a.id !== answerId)
        });
      } else {
        alert("Failed to delete answer.");
      }
    } catch (err) { console.error(err); }
  };

  if (loading) return (
     <div className="min-h-screen bg-brand-sand flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-gold" size={48} />
     </div>
  );

  if (!thread) return (
    <div className="min-h-screen bg-brand-sand pt-24 px-6 text-center">
       <h1 className="text-3xl font-serif font-bold text-brand-dark mb-4">Thread Not Found</h1>
       <Link href="/forum" className="text-brand-gold font-bold hover:underline">&larr; Back to Forum</Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-4 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/forum" className="inline-flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={20} /> Back to Forum
        </Link>

        {/* Original Question Card */}
        <div className="bg-white border-2 border-brand-gold/10 rounded-[2.5rem] p-10 shadow-xl shadow-brand-gold/5 relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
            
            <div className="flex items-center gap-4 mb-8">
               <div className="w-14 h-14 rounded-2xl bg-brand-sand border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                  {thread.author?.image ? (
                    <img src={thread.author.image} className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-brand-gold/50" size={24} />
                  )}
               </div>
               <div className="flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">Question by</p>
                  <p className="font-bold text-brand-dark text-xl flex items-center gap-1.5 capitalize">
                     {thread.author?.username || 'anonymous'}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">{new Date(thread.createdAt).toLocaleDateString()}</p>
               </div>
               {session && ((session.user as any).role === 'ADMIN' || (session.user as any).id === thread.authorId) && (
                  <button 
                     onClick={handleDeleteThread}
                     className="p-3 text-red-500/50 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all self-start"
                     title="Delete Thread"
                  >
                     <Trash2 size={20} />
                  </button>
               )}
            </div>

            <h1 className="text-4xl font-serif font-bold text-brand-dark mb-6 leading-tight">{thread.title}</h1>
            <div className="prose prose-brand max-w-none">
              <p className="text-brand-dark/80 text-xl leading-relaxed whitespace-pre-wrap">{thread.content}</p>
            </div>
        </div>

        {/* Scholar Answers */}
        <div className="space-y-8 mb-16">
          <div className="flex items-center gap-3 mb-6 pl-4">
             <ShieldCheck size={28} className="text-brand-gold" />
             <h2 className="text-2xl font-serif font-bold text-brand-dark">Scholar Responses</h2>
          </div>

          {thread.answers?.length === 0 ? (
            <div className="bg-white/50 border border-dashed border-gray-200 rounded-3xl p-12 text-center">
               <p className="text-gray-400 font-medium italic">Our scholars are carefully crafting a response to the light of your thought.</p>
            </div>
          ) : (
            thread.answers.map((answer: any) => (
              <div key={answer.id} className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-lg relative ml-auto max-w-[95%]">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-3xl bg-brand-dark border-4 border-white shadow-xl overflow-hidden flex items-center justify-center ring-1 ring-gray-100 shrink-0">
                     {answer.author?.image ? (
                       <img src={answer.author.image} className="w-full h-full object-cover" />
                     ) : (
                       <Award className="text-brand-gold" size={32} />
                     )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h4 className="font-bold text-brand-dark text-lg capitalize">{answer.author?.name}</h4>
                      {answer.author?.scholarTitle && (
                        <span className="bg-brand-gold/10 text-brand-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-brand-gold/10">
                           {answer.author.scholarTitle}
                        </span>
                      )}
                    </div>
                    {answer.author?.bio && (
                      <p className="text-xs text-gray-400 font-medium line-clamp-1 italic">{answer.author.bio}</p>
                    )}
                  </div>
                  {session && ((session.user as any).role === 'ADMIN' || (session.user as any).id === answer.authorId) && (
                    <button 
                       onClick={() => handleDeleteAnswer(answer.id)}
                       className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                       title="Delete Answer"
                    >
                       <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="prose prose-brand max-w-none mb-4">
                  <p className="text-brand-dark text-lg leading-relaxed whitespace-pre-wrap">{answer.content}</p>
                </div>
                
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-right">Answered on {new Date(answer.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>

        {/* Future: Thread Replies (Follow-up Questions) would go here */}

        {/* Post Follow-up Form */}
        <div className="mt-20 glass-panel p-10 border-brand-gold/20 relative">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
               <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">Continuing the Thought?</h3>
               <p className="text-gray-500 mb-6 leading-relaxed">If there's more light to be shed, feel free to submit a follow-up inquiry. Our guides will review and address it.</p>
               <div className="bg-brand-sand/50 p-6 rounded-2xl border border-brand-gold/5 flex items-start gap-4">
                  <Info className="text-brand-gold mt-1 shrink-0" size={20} />
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    <strong>Note:</strong> Follow-up questions are private by default and require guide approval to become part of the public thread.
                  </p>
               </div>
            </div>
            
            <div className="md:w-2/3">
               {session ? (
                 <form onSubmit={handleFollowup} className="space-y-4">
                    <textarea 
                      value={followupContent}
                      onChange={(e) => setFollowupContent(e.target.value)}
                      placeholder="My follow-up thought is..."
                      className="w-full p-8 bg-brand-sand border-2 border-white rounded-[2rem] min-h-[160px] outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all text-brand-dark text-lg shadow-inner"
                      required
                    />
                    <button 
                      type="submit"
                      disabled={submitLoading || !followupContent}
                      className="w-full py-5 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {submitLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Submit Follow-up
                        </>
                      )}
                    </button>
                    {message && <p className="text-center font-bold text-brand-gold animate-in fade-in slide-in-from-top-2">{message}</p>}
                 </form>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[2rem] p-10 bg-gray-50/50">
                    <p className="text-gray-400 font-bold mb-4">Please sign in to ask a follow-up.</p>
                    <Link href="/signin" className="px-10 py-3 bg-brand-gold text-white rounded-full font-bold shadow-lg">Sign In</Link>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
