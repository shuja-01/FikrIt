"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, ChevronLeft, Loader2, CheckCircle2, UserCheck, Shuffle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthButton from "../components/AuthButton";

export default function AskQuestion() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [guideId, setGuideId] = useState(""); // "" means auto-assign
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchGuides() {
      setLoading(true);
      try {
        const res = await fetch("/api/deeni-guides");
        const data = await res.json();
        setGuides(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGuides();
  }, []);

  if (status === "unauthenticated") {
     return (
       <main className="min-h-screen bg-brand-sand pt-40 px-6 text-center">
         <div className="glass-panel p-12 max-w-lg mx-auto shadow-xl">
           <UserCheck className="mx-auto text-brand-gold mb-6 opacity-20" size={64} />
           <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Sign In Required</h2>
           <p className="text-gray-500 mb-8">You need to be signed in to ask a question to our Deeni Guides.</p>
           <AuthButton />
           <div className="mt-8">
             <Link href="/" className="text-brand-gold font-bold hover:underline">Back to Home</Link>
           </div>
         </div>
       </main>
     );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, guideId: guideId || undefined }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/forum"), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-sand px-6">
        <div className="glass-panel p-12 text-center max-w-lg animate-in zoom-in-95 duration-500">
           <CheckCircle2 className="mx-auto text-emerald-500 mb-6" size={64} />
           <h2 className="text-3xl font-serif font-bold mb-4">Question Submitted!</h2>
           <p className="text-gray-600">Your question has been successfully submitted and assigned to a Deeni Guide. You will be redirected to the forum shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
             <HelpCircle className="text-brand-gold" size={28} />
           </div>
           <div>
             <h1 className="text-4xl font-serif font-bold text-brand-dark">Ask a Question</h1>
             <p className="text-gray-500">Seek guidance from our approved community of Deeni Guides.</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-panel p-8 space-y-6 shadow-sm border-0">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-dark uppercase tracking-wider">Question Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is your question about?" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-dark uppercase tracking-wider">Detailed Description</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Please provide details to help the Deeni Guide understand your context..." 
                className="w-full h-40 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                required
              />
            </div>

            {/* Deeni Guide Selection */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-brand-dark uppercase tracking-wider">Assign to Deeni Guide</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <button 
                   type="button"
                   onClick={() => setGuideId("")}
                   className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${guideId === "" ? "border-brand-gold bg-brand-gold/5 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200"}`}
                 >
                   <Shuffle className={guideId === "" ? "text-brand-gold" : "text-gray-400"} size={20} />
                   <div className="text-left">
                     <p className="text-sm font-bold">Auto-Assign</p>
                     <p className="text-xs text-gray-400">Least busy Deeni Guide available</p>
                   </div>
                 </button>

                 <div className="relative">
                    <select 
                      value={guideId}
                      onChange={(e) => setGuideId(e.target.value)}
                      className={`w-full h-full px-4 py-3 pr-10 rounded-xl border outline-none transition-all appearance-none ${guideId !== "" ? "border-brand-gold bg-brand-gold/5" : "border-gray-100 bg-white hover:border-gray-200 text-gray-400"}`}
                    >
                      <option value="">Manual Select...</option>
                      {loading ? (
                        <option disabled>Loading Deeni Guides...</option>
                      ) : (
                        guides.map((m) => (
                          <option key={m.id} value={m.id}>{m.name || "Unknown Guide"}</option>
                        ))
                      )}
                    </select>
                    <UserCheck className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${guideId !== "" ? "text-brand-gold" : "text-gray-300"}`} size={20} />
                 </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={submitting}
              className="px-8 py-4 bg-brand-dark text-white rounded-full font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl disabled:opacity-50"
            >
              {submitting ? <Loader2 className="animate-spin" size={20} /> : <HelpCircle size={20} />} 
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
