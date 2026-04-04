"use client";

import { signOut } from "next-auth/react";
import { ShieldAlert, LogOut, Clock } from "lucide-react";

export default function PendingApproval() {
  return (
    <main className="min-h-screen bg-brand-sand flex items-center justify-center px-6">
      <div className="max-w-md w-full glass-panel p-10 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto">
          <Clock className="text-brand-gold" size={40} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Application Pending</h1>
          <p className="text-gray-600 leading-relaxed">
            Thank you for applying to be a <span className="font-bold text-brand-dark">Deeni Guide</span>. 
            Our administration team is currently reviewing your profile and credentials.
          </p>
        </div>

        <div className="p-4 bg-white/50 border border-brand-gold/20 rounded-xl flex items-start gap-4 text-left">
          <ShieldAlert className="text-brand-gold shrink-0 mt-1" size={20} />
          <p className="text-sm text-gray-500 italic">
            Verification typically takes <span className="font-bold">24-48 hours</span>. You will be able to access the platform once approved.
          </p>
        </div>

        <div className="pt-4">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full py-4 bg-brand-dark text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl hover:shadow-brand-gold/10 active:scale-[0.98]"
          >
            <LogOut size={18} />
            Sign Out & Wait
          </button>
        </div>
      </div>
    </main>
  );
}
