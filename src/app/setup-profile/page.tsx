"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, ShieldCheck, Phone, Heart, BookOpen, Loader2, ArrowRight } from "lucide-react";

export default function SetupProfile() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [role, setRole] = useState<"USER" | "DEENI_GUIDE" | null>(null);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [marjae, setMarjae] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/profile/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, phone, gender, marjae }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      // IMPORTANT: Do NOT await update() here. It can hang in some environments.
      // The server-side session fallback in auth.ts now handles the role sync 
      // automatically on the next page load.
      if (role === "DEENI_GUIDE") {
        window.location.href = "/pending-approval";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-sand pt-20 pb-20 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Complete Your Profile</h1>
          <p className="text-xl text-gray-500">To provide the best experience, please tell us how you want to use FikrIt.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard User Option */}
            <div 
              onClick={() => setRole("USER")}
              className={`glass-panel p-8 cursor-pointer transition-all duration-300 border-2 ${role === "USER" ? "border-brand-gold bg-brand-gold/5 ring-4 ring-brand-gold/10" : "border-transparent hover:border-brand-gold/30"}`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6">
                <User className={role === "USER" ? "text-brand-gold" : "text-gray-400"} size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Standard User</h3>
              <p className="text-gray-500">Ask questions, read articles, and participate in the community.</p>
            </div>

            {/* Deeni Guide Option */}
            <div 
              onClick={() => setRole("DEENI_GUIDE")}
              className={`glass-panel p-8 cursor-pointer transition-all duration-300 border-2 ${role === "DEENI_GUIDE" ? "border-brand-gold bg-brand-gold/5 ring-4 ring-brand-gold/10" : "border-transparent hover:border-brand-gold/30"}`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6">
                <ShieldCheck className={role === "DEENI_GUIDE" ? "text-brand-gold" : "text-gray-400"} size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Deeni Guide</h3>
              <p className="text-gray-500">Help the community by providing guidance. Requires admin approval.</p>
            </div>
          </div>

          {/* Conditional Fields for Deeni Guide */}
          {role === "DEENI_GUIDE" && (
            <div className="glass-panel p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500 border-t-4 border-t-brand-gold">
              <h4 className="text-xl font-serif font-bold flex items-center gap-2">
                <ShieldCheck className="text-brand-gold" /> Guide Application Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gender</label>
                  <div className="relative">
                    <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all appearance-none"
                      required
                    >
                      <option value="">Select Gender...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Marja-e-Taqleed</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="text" 
                      value={marjae}
                      onChange={(e) => setMarjae(e.target.value)}
                      placeholder="e.g. Ayatollah Sistani"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium border border-red-100">{error}</p>
          )}

          <div className="flex justify-center pt-6">
            <button 
              type="submit"
              disabled={!role || loading}
              className="px-12 py-5 bg-brand-dark text-white rounded-full font-bold flex items-center gap-3 hover:bg-black transition-all shadow-2xl hover:shadow-brand-gold/20 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
              {role === "DEENI_GUIDE" ? "Submit Application" : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
