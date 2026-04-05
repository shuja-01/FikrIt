"use client";

import { User, ArrowRight, Loader2, AtSign } from "lucide-react";
import { useState } from "react";

interface Props {
  isLoading: boolean;
  onComplete: (data: { role: "USER"; username: string }) => void;
  error?: string;
}

export function StandardOnboarding({ isLoading, onComplete, error }: Props) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    onComplete({ role: "USER", username });
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="glass-panel p-10 text-center border-t-4 border-t-brand-gold space-y-8">
        <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-2">
          <User className="text-brand-gold" size={40} />
        </div>
        <h3 className="text-3xl font-serif font-bold text-brand-dark mb-2">Standard User</h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Pick a unique username to join the FikrIt community and stay anonymous in discussions.
        </p>

        <div className="max-w-xs mx-auto space-y-3 text-left">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Unique Username</label>
          <div className="relative group">
            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-gold transition-colors" size={20} />
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              placeholder="username_123"
              className="w-full pl-12 pr-6 py-4 bg-white/60 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all shadow-inner"
              required
              minLength={3}
              maxLength={20}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100">
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading || username.length < 3}
          className="w-full sm:w-auto px-12 py-5 bg-brand-dark text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl hover:shadow-brand-gold/20 disabled:opacity-50 mx-auto group"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
          Complete Registration
        </button>
      </form>
    </div>
  );
}
