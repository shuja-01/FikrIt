"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, CheckCircle, XCircle, Loader2, Phone, User as UserIcon, Heart, BookOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FikrAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pendingGuides, setPendingGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
       fetchPendingGuides();
    }
  }, [status]);

  async function fetchPendingGuides() {
    try {
      const res = await fetch("/api/admin/pending-guides");
      const data = await res.json();
      setPendingGuides(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(userId: string, action: "approve" | "reject") {
    setActionLoading(userId);
    try {
      const res = await fetch("/api/admin/guide-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });

      if (res.ok) {
        setPendingGuides(prev => prev.filter(g => g.id !== userId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-sand flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-gold" size={48} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldAlert className="text-brand-gold" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-brand-dark">FikrAdmin</h1>
            <p className="text-gray-500 font-medium">Deeni Guide Approval Center</p>
          </div>
        </div>

        {pendingGuides.length === 0 ? (
          <div className="glass-panel p-20 text-center shadow-sm">
            <CheckCircle className="mx-auto text-emerald-500 mb-6 opacity-20" size={64} />
            <h2 className="text-2xl font-serif font-bold text-brand-dark mb-2">No Pending Applications</h2>
            <p className="text-gray-400">All Deeni Guides are currently approved or processed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {pendingGuides.map((guide) => (
              <div key={guide.id} className="glass-panel p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-l-8 border-l-brand-gold hover:shadow-xl transition-all duration-300">
                <div className="flex gap-6 items-center">
                   <div className="w-20 h-20 rounded-full bg-brand-sand border-2 border-white shadow-inner overflow-hidden flex items-center justify-center">
                     {guide.image ? <img src={guide.image} className="w-full h-full object-cover" /> : <UserIcon className="text-brand-gold/50" size={32} />}
                   </div>
                   <div className="space-y-1">
                     <h3 className="text-2xl font-serif font-bold text-brand-dark">{guide.name || "Anonymous Guide"}</h3>
                     <p className="text-brand-gold font-bold text-sm tracking-widest uppercase">{guide.email}</p>
                   </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 px-0 md:px-8">
                  <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-white/40">
                    <Phone className="text-brand-gold" size={18} />
                    <span className="text-sm font-medium">{guide.phone || "No Phone"}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-white/40">
                    <Heart className="text-brand-gold" size={18} />
                    <span className="text-sm font-medium capitalize">{guide.gender || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-white/40">
                    <BookOpen className="text-brand-gold" size={18} />
                    <span className="text-sm font-medium truncate" title={guide.marjae}>{guide.marjae || "No Marjae"}</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <button 
                    onClick={() => handleAction(guide.id, "reject")}
                    disabled={actionLoading === guide.id}
                    className="flex-1 md:flex-none px-6 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all group"
                  >
                    <XCircle size={18} className="group-hover:rotate-12 transition-transform" /> Reject
                  </button>
                  <button 
                    onClick={() => handleAction(guide.id, "approve")}
                    disabled={actionLoading === guide.id}
                    className="flex-1 md:flex-none px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 group"
                  >
                    {actionLoading === guide.id ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} className="group-hover:scale-110 transition-transform" />}
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
