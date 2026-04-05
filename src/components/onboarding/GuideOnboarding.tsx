"use client";

import { ShieldCheck, Phone, Heart, BookOpen, Loader2, ArrowRight, AtSign, UserCircle, Award } from "lucide-react";
import { useState } from "react";

interface Props {
  isLoading: boolean;
  onComplete: (data: { 
    role: "DEENI_GUIDE"; 
    phone: string; 
    gender: string; 
    username: string;
    bio?: string;
    scholarTitle?: string;
  }) => void;
  error?: string;
}

export function GuideOnboarding({ isLoading, onComplete, error }: Props) {
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [scholarTitle, setScholarTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !gender || !username) return;
    onComplete({ role: "DEENI_GUIDE", phone, gender, username, bio, scholarTitle });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="glass-panel p-10 space-y-8 border-t-8 border-t-brand-gold">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="text-brand-gold" size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-brand-dark">Deeni Guide Application</h3>
            <p className="text-gray-500">Provide your credentials for community verification.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Unique Username</label>
            <div className="relative group">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-gold transition-colors" size={20} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="sheikh_ali"
                className="w-full pl-12 pr-6 py-4 bg-white/60 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all shadow-inner"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Scholar Title</label>
            <div className="relative group">
              <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-gold transition-colors" size={20} />
              <input 
                type="text" 
                value={scholarTitle}
                onChange={(e) => setScholarTitle(e.target.value)}
                placeholder="e.g. Sheikh, Mufti, Alim"
                className="w-full pl-12 pr-6 py-4 bg-white/60 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Phone Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-gold transition-colors" size={20} />
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-12 pr-6 py-4 bg-white/60 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all shadow-inner"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Gender</label>
            <div className="relative group">
              <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-gold transition-colors" size={20} />
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/60 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all shadow-inner appearance-none bg-no-repeat bg-[right_1.5rem_center]"
                required
              >
                <option value="">Select Gender...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Professional Bio</label>
            <div className="relative group">
              <UserCircle className="absolute left-4 top-6 text-gray-300 group-focus-within:text-brand-gold transition-colors" size={20} />
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the community about your expertise and background..."
                className="w-full pl-12 pr-6 py-4 bg-white/60 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all shadow-inner min-h-[120px]"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="flex justify-end pt-6">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-12 py-5 bg-brand-dark text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl hover:shadow-brand-gold/20 disabled:opacity-50 group"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
            Submit Official Application
          </button>
        </div>
      </div>
    </form>
  );
}
