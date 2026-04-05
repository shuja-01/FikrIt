"use client";

import { useEffect, useState, use } from "react";
import { 
  ChevronLeft, Clock, User, Share2, 
  MessageSquare, Send, Loader2, Calendar, 
  Bookmark, Award, Sparkles, BookOpen 
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: session } = useSession();
  const router = useRouter();
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/s/${slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setArticle(data);
      } catch (err) {
        console.error("Failed to fetch article", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent || !session) return;

    setSubmittingComment(true);
    setCommentError("");

    try {
      const res = await fetch(`/api/articles/i/${article.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentContent }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Add comment to list and clear input
      setArticle({
        ...article,
        comments: [
          {
            ...data,
            author: {
               username: (session.user as any).username,
               name: session.user?.name,
               image: session.user?.image
            }
          },
          ...(article.comments || [])
        ]
      });
      setCommentContent("");
    } catch (err: any) {
      setCommentError(err.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${article.title}"? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/articles/i/${article.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push("/articles");
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-sand gap-4">
       <Loader2 size={32} className="animate-spin text-brand-gold" />
       <p className="font-serif italic text-lg text-gray-500">Retrieving the scrolls...</p>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-sand">
       <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6">
          <BookOpen size={30} className="text-brand-gold" />
       </div>
       <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Writings Not Found</h1>
       <p className="text-gray-500 mb-8">This piece of wisdom seems to have moved or does not exist.</p>
       <Link href="/articles" className="px-8 py-3 bg-brand-dark text-white rounded-xl font-bold hover:bg-black transition-all">
         Back to Library
       </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-brand-sand">
      {/* Immersive Header Image */}
      <div className="relative h-[65vh] w-full mt-24 px-6 sm:px-12 lg:px-24">
         <div className="max-w-7xl mx-auto h-full relative overflow-hidden rounded-[4rem] group shadow-2xl">
            <img 
               src={article.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200"} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
               alt={article.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-12 lg:p-20 text-white z-10">
               <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="px-6 py-2 bg-brand-gold text-white rounded-full text-[10px] uppercase font-black tracking-[0.2em] shadow-lg shadow-brand-gold/30">
                    {article.category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2 text-white/80 font-bold text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                     <Clock size={16} className="text-brand-gold" />
                     {format(new Date(article.createdAt), "MMMM d, yyyy")}
                  </div>
               </div>
               
               <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-8 leading-[1.1] tracking-tight max-w-4xl drop-shadow-sm">
                  {article.title}
               </h1>

                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4 group cursor-pointer">
                     <img 
                       src={article.author.image || "/default-avatar.png"} 
                       className="w-14 h-14 rounded-full border-2 border-brand-gold p-1 bg-white/10 transition-transform group-hover:scale-110" 
                       alt={article.author.name}
                     />
                     <div>
                        <p className="text-[10px] uppercase font-black text-brand-gold tracking-widest leading-none mb-1">Written By</p>
                        <p className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{article.author.scholarTitle} {article.author.name}</p>
                     </div>
                  </div>

                  {/* Author & Admin Management Controls */}
                  <div className="flex items-center gap-4">
                     {session && (session.user as any).id === article.authorId && (
                        <Link 
                           href={`/guide/articles/edit/${article.id}`}
                           className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold hover:bg-white/20 transition-all"
                        >
                           Edit Research
                        </Link>
                     )}
                     {session && ((session.user as any).id === article.authorId || (session.user as any).role === 'ADMIN') && (
                        <button 
                           onClick={handleDelete}
                           className="px-6 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-200 rounded-full text-xs font-bold hover:bg-red-500/40 transition-all"
                        >
                           Delete Article
                        </button>
                     )}
                  </div>
                </div>
             </div>
          </div>
       </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Article Content */}
         <article className="lg:col-span-8">
            <div 
              className="prose prose-xl prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-brand-dark prose-p:text-gray-600 prose-p:leading-[1.8] prose-blockquote:border-brand-gold prose-blockquote:bg-brand-sand prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-img:rounded-[2.5rem] prose-img:shadow-xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-full font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                     <Bookmark size={18} /> Save for later
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-full font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                     <Share2 size={18} /> Share Wisdom
                  </button>
               </div>
            </div>

            {/* Comments Section */}
            <section className="mt-24" id="comments">
               <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
                     <MessageSquare size={24} />
                  </div>
                  <div>
                     <h2 className="text-3xl font-serif font-bold text-brand-dark">Community Reflections</h2>
                     <p className="text-gray-400 font-medium">{article.comments?.length || 0} thoughtful contributions</p>
                  </div>
               </div>

               {session ? (
                  <form onSubmit={handleComment} className="mb-16 group">
                     <div className="relative">
                        <textarea
                           value={commentContent}
                           onChange={(e) => setCommentContent(e.target.value)}
                           placeholder="Share your reflection..."
                           className="w-full p-8 bg-white border-2 border-gray-50 rounded-[2.5rem] focus:border-brand-gold outline-none min-h-[150px] shadow-sm transition-all text-lg font-medium"
                        />
                        <button 
                           type="submit"
                           disabled={submittingComment || !commentContent}
                           className="absolute bottom-6 right-6 p-4 bg-brand-dark text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-brand-gold/10 disabled:opacity-50"
                        >
                           {submittingComment ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="text-brand-gold" />}
                        </button>
                     </div>
                     {commentError && <p className="mt-4 text-red-500 text-sm font-medium pl-4">{commentError}</p>}
                  </form>
               ) : (
                  <div className="p-12 bg-white rounded-[3rem] border border-gray-50 text-center mb-16 shadow-inner">
                     <Sparkles size={32} className="text-brand-gold/30 mx-auto mb-6" />
                     <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Join the Conversation</h3>
                     <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                        Sign in to share your thoughts, ask questions, or reflect on this scholarly research with others.
                     </p>
                     <Link href="/signin" className="px-10 py-4 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-brand-gold/10">
                        Sign In to FikrIt
                     </Link>
                  </div>
               )}

               <div className="space-y-10">
                  {article.comments?.map((comment: any) => (
                     <div key={comment.id} className="flex gap-6 group">
                        <img 
                          src={comment.author.image || "/default-avatar.png"} 
                          className="w-14 h-14 rounded-full border-4 border-white shadow-lg flex-shrink-0" 
                          alt={comment.author.name}
                        />
                        <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 group-hover:shadow-md transition-shadow">
                           <div className="flex items-center justify-between mb-4">
                              <div>
                                 <p className="font-bold text-brand-dark text-lg leading-none">{comment.author.name}</p>
                                 <p className="text-xs font-medium text-gray-400 mt-1">@{comment.author.username}</p>
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                 {format(new Date(comment.createdAt), "MMM d, h:mm a")}
                              </span>
                           </div>
                           <p className="text-gray-600 leading-relaxed text-lg">
                              {comment.content}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </section>
         </article>

         {/* Sidebar Bio & Related */}
         <aside className="lg:col-span-4 space-y-12">
            <div className="glass-panel p-10 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <Award size={20} className="text-brand-gold opacity-30" />
               </div>
               <img 
                  src={article.author.image || "/default-avatar.png"} 
                  className="w-28 h-28 rounded-full border-4 border-white shadow-xl mx-auto mb-6 p-1 bg-brand-gold/10" 
                  alt={article.author.name}
               />
               <p className="text-[10px] uppercase font-black text-brand-gold tracking-[0.3em] mb-2 leading-none">The Author</p>
               <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{article.author.scholarTitle} {article.author.name}</h3>
               <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {article.author.bio || `Peace be upon you. I am an ${article.author.scholarTitle} dedicated to providing authentic guidance and scholarly research for our community.`}
               </p>
               <Link href={`/guides/${article.author.username}`} className="block w-full py-4 bg-brand-gold text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-gold/10">
                  View Full Profile
               </Link>
            </div>

            <div className="bg-brand-dark text-white rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
               <h4 className="text-xl font-serif font-bold mb-6 text-brand-gold">Research Pillars</h4>
               <ul className="space-y-6">
                  {['Authenticity', 'Scholarship', 'Community', 'Dialogue'].map((pillar, i) => (
                     <li key={pillar} className="flex items-center gap-4 text-sm font-medium border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <span className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-[10px] font-bold text-brand-gold">0{i+1}</span>
                        {pillar}
                     </li>
                  ))}
               </ul>
            </div>
         </aside>
      </div>
    </main>
  );
}
