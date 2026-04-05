"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  ChevronLeft, Send, Save, Image as ImageIcon, 
  Type, Layout, Loader2, Sparkles 
} from "lucide-react";
import Link from "next/link";
import { TipTapEditor } from "@/components/editor/TipTapEditor";

export default function EditArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("FIQH");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(false);
  
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated" || (session?.user as any)?.role !== 'DEENI_GUIDE') {
      router.push("/");
      return;
    }

    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error("Failed to fetch article settings");
        const data = await res.json();
        
        // Authorization: Only the author can edit
        if (data.authorId !== (session.user as any).id) {
           setError("Unauthorized: You can only edit your own research.");
           setFetching(false);
           return;
        }

        setTitle(data.title);
        setContent(data.content);
        setExcerpt(data.excerpt || "");
        setCategory(data.category);
        setImageUrl(data.imageUrl || "");
        setPublished(data.published);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    if (session) fetchArticle();
  }, [id, session, status, router]);

  const handleSubmit = async (publishStatus: boolean) => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          category,
          imageUrl,
          published: publishStatus
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update article");

      router.push("/guide/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-sand">
        <Loader2 className="animate-spin text-brand-gold h-12 w-12" />
      </div>
    );
  }

  if (error && !title) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-brand-sand px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Access Restricted</h2>
          <p className="text-gray-500 mb-8 max-w-md">{error}</p>
          <Link href="/guide/dashboard" className="px-8 py-3 bg-brand-dark text-white rounded-xl font-bold">
            Back to Dashboard
          </Link>
       </div>
     );
  }

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/guide/dashboard" className="inline-flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={20} /> Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-serif font-bold text-brand-dark mb-2">Edit Research</h1>
            <p className="text-gray-500 font-medium">Refining your insights for the community: <span className="text-brand-gold italic">"{title}"</span></p>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={() => handleSubmit(false)}
               disabled={loading}
               className="px-8 py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
             >
               {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save as Draft
             </button>
             <button 
               onClick={() => handleSubmit(true)}
               disabled={loading}
               className="px-8 py-3 bg-brand-dark text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-brand-gold/10"
             >
               {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} className="text-brand-gold" />} {published ? "Update Publication" : "Publish Now"}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 capitalize tracking-widest pl-2">Article Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Essence of Ma'rifat in Modern Times"
                className="w-full text-4xl font-serif font-bold bg-transparent border-b-2 border-gray-200 focus:border-brand-gold outline-none pb-4 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 capitalize tracking-widest pl-2">Scholarly Content</label>
              <TipTapEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-panel p-8 space-y-6">
              <h3 className="text-xl font-serif font-bold text-brand-dark border-b border-gray-50 pb-4">Article Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest flex items-center gap-2">
                    <Layout size={12} /> Category
                  </label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-4 bg-white border border-gray-100 rounded-xl focus:ring-4 focus:ring-brand-gold/10 outline-none appearance-none font-bold text-brand-dark"
                  >
                    <option value="QURANIC_STUDIES">Quranic Studies</option>
                    <option value="HADITH_SUNNAH">Hadith & Sunnah</option>
                    <option value="FIQH">Fiqh (Jurisprudence)</option>
                    <option value="HISTORY_AHLULBAYT">History of Ahlulbayt</option>
                    <option value="CONTEMPORARY_ISSUES">Contemporary Issues</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest flex items-center gap-2">
                    <ImageIcon size={12} /> Cover Image URL
                  </label>
                  <input 
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-4 bg-white border border-gray-100 rounded-xl focus:ring-4 focus:ring-brand-gold/10 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest flex items-center gap-2">
                    <Type size={12} /> Summary Excerpt
                  </label>
                  <textarea 
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="A short summary for the list view..."
                    className="w-full p-4 bg-white border border-gray-100 rounded-xl focus:ring-4 focus:ring-brand-gold/10 outline-none min-h-[100px]"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}
            </div>

            <div className="bg-brand-dark rounded-3xl p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
               <Sparkles size={24} className="text-brand-gold mb-4" />
               <h4 className="text-lg font-serif font-bold mb-2">Publishing Ethics</h4>
               <p className="text-gray-400 text-sm leading-relaxed font-medium">
                 Frequent updates to your research ensure that the community always has access to your most refined and corrected scholarly perspectives.
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
