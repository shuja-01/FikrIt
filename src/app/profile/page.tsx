"use client";

import { useSession } from "next-auth/react";
import { User, Mail, ShieldCheck, Phone, Heart, BookOpen, Trash2, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { serverSignOut } from "@/app/actions/auth";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-brand-sand flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-gold" size={48} />
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
      try {
        const res = await fetch("/api/profile/delete", { method: "DELETE" });
        if (res.ok) {
           await serverSignOut();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <div className="glass-panel p-10 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-brand-sand border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
               {session.user?.image ? (
                 <img src={session.user.image} className="w-full h-full object-cover" />
               ) : (
                 <User className="text-brand-gold/50" size={40} />
               )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-serif font-bold text-brand-dark mb-1">{session.user?.name}</h1>
              <p className="text-brand-gold font-bold flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck size={16} /> {(session.user as any)?.role || "User"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                    <Mail size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</p>
                    <p className="font-medium">{session.user?.email}</p>
                  </div>
               </div>

               {(session.user as any)?.phone && (
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                      <Phone size={18} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Phone Number</p>
                      <p className="font-medium">{(session.user as any).phone}</p>
                    </div>
                 </div>
               )}
            </div>

            <div className="space-y-4">
               {(session.user as any)?.gender && (
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                      <Heart size={18} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Gender</p>
                      <p className="font-medium capitalize">{(session.user as any).gender}</p>
                    </div>
                 </div>
               )}

               {(session.user as any)?.marjae && (
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                      <BookOpen size={18} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Marja-e-Taqleed</p>
                      <p className="font-medium">{(session.user as any).marjae}</p>
                    </div>
                 </div>
               )}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
             <button 
              onClick={() => serverSignOut()}
               className="px-6 py-2 bg-brand-dark text-white rounded-full text-sm font-bold hover:bg-black transition-all"
             >
                Sign Out
             </button>
             <button 
               onClick={handleDelete}
               className="px-6 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold hover:bg-red-100 transition-all flex items-center gap-2"
             >
                <Trash2 size={16} /> Delete Account
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}
