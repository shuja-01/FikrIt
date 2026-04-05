"use client";

import { signIn, signOut as clientSignOut, useSession } from "next-auth/react";
import { User, LogOut, Trash2 } from "lucide-react";
import Link from "next/link";
import { serverSignOut } from "@/app/actions/auth";

export default function AuthButton() {
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        console.log("Starting profile delete sequence...");
        const res = await fetch("/api/profile/delete", { method: "DELETE" });
        
        if (res.ok) {
          console.log("Delete successful, signing out...");
          // Using server action for sign out after deletion to ensure session is cleared on server too
          await serverSignOut();
        } else {
          const errorData = await res.json().catch(() => ({}));
          console.error("Delete failed:", { status: res.status, errorData });
          alert(`Failed to delete profile: ${errorData.error || res.statusText || "Database constraint error. Please run 'db push'."}`);
        }
      } catch (error: any) {
        console.error("Failed to delete profile error:", error);
        alert(`Request failed: ${error.message || "An unexpected error occurred"}`);
      }
    }
  };

  if (session && session.user) {
    const handleSignOut = async () => {
      if (confirm("Are you sure you want to sign out?")) {
        console.log("Invoking client-side signOut...");
        await clientSignOut({ callbackUrl: "/" });
      }
    };

    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <Link href="/profile" className="text-sm font-bold text-brand-dark hover:text-brand-gold transition-colors">
            {session.user.name?.split(" ")[0]}
          </Link>
          {(session.user as any).role === "DEENI_GUIDE" && (
            <Link href="/guide/dashboard" className="text-[10px] font-black text-brand-gold uppercase tracking-wider hover:underline">
              Guide Dashboard &rarr;
            </Link>
          )}
          {(session.user as any).role === "ADMIN" && (
            <Link href="/fikradmin" className="text-[10px] font-black text-brand-gold uppercase tracking-wider hover:underline">
              Admin Panel &rarr;
            </Link>
          )}
        </div>
        <button 
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Delete Account"
        >
          <Trash2 size={18} />
        </button>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-800 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm"
        >
          Sign Out <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => signIn("google", { prompt: "select_account" })}
      className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-full text-sm font-medium hover:bg-black transition-colors shadow-lg hover:shadow-xl"
    >
      Sign In <User size={16} />
    </button>
  );
}
