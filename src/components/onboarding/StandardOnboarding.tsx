"use client";

import { User, ArrowRight, Loader2 } from "lucide-react";

interface Props {
  isLoading: boolean;
  onComplete: (role: "USER") => void;
  error?: string;
}

export function StandardOnboarding({ isLoading, onComplete, error }: Props) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-panel p-10 text-center border-t-4 border-t-brand-gold">
        <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <User className="text-brand-gold" size={40} />
        </div>
        <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">Standard User</h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
          Join the FikrIt community to ask questions, read spiritual articles, and participate in enriching discussions.
        </p>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 font-medium border border-red-100">
            {error}
          </div>
        )}

        <button 
          onClick={() => onComplete("USER")}
          disabled={isLoading}
          className="w-full sm:w-auto px-12 py-5 bg-brand-dark text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl hover:shadow-brand-gold/20 disabled:opacity-50 mx-auto group"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
          Continue as Standard User
        </button>
      </div>
    </div>
  );
}
