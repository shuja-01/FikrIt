"use client";

import { useState } from "react";
import { User, ShieldCheck } from "lucide-react";
import { StandardOnboarding } from "@/components/onboarding/StandardOnboarding";
import { GuideOnboarding } from "@/components/onboarding/GuideOnboarding";

export default function SetupProfile() {
  const [role, setRole] = useState<"USER" | "DEENI_GUIDE" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async (userData: any) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/profile/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      // Bypassing the deadlock with a clean redirect
      if (userData.role === "DEENI_GUIDE") {
        window.location.href = "/pending-approval";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-sand pt-20 pb-20 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-6xl font-serif font-bold text-brand-dark mb-6">Start Your Journey</h1>
          {!role && (
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Choose your path to get started with the FikrIt experience.
            </p>
          )}
        </div>

        {/* Role Selection (Main Screen) */}
        {!role && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-700">
            {/* Standard User Option */}
            <div 
              onClick={() => setRole("USER")}
              className="glass-panel p-10 cursor-pointer transition-all duration-500 border-2 border-transparent hover:border-brand-gold/40 hover:bg-white/70 group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md mb-8 group-hover:scale-110 transition-transform duration-500">
                <User className="text-gray-400 group-hover:text-brand-gold" size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Standard User</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Connect, reflect, and grow. Ask questions and participate in spiritual discussions.
              </p>
            </div>

            {/* Deeni Guide Option */}
            <div 
              onClick={() => setRole("DEENI_GUIDE")}
              className="glass-panel p-10 cursor-pointer transition-all duration-500 border-2 border-transparent hover:border-brand-gold/40 hover:bg-white/70 group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md mb-8 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="text-gray-400 group-hover:text-brand-gold" size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Deeni Guide</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Provide guidance and share knowledge for the community. Note: This profile requires official verification.
              </p>
            </div>
          </div>
        )}

        {/* Separated Onboarding Path: Standard User */}
        {role === "USER" && (
          <StandardOnboarding 
            isLoading={loading} 
            onComplete={handleComplete} 
            error={error} 
          />
        )}

        {/* Separated Onboarding Path: Deeni Guide */}
        {role === "DEENI_GUIDE" && (
          <GuideOnboarding 
            isLoading={loading} 
            onComplete={handleComplete} 
            error={error} 
          />
        )}

        {/* Back option */}
        {role && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => setRole(null)}
              className="text-brand-gold font-medium hover:underline text-lg"
            >
              &larr; Choose a different path
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
