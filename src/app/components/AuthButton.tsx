"use client";

import { signIn, useSession } from "next-auth/react";
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
        console.log("Invoking signOut...");
        await serverSignOut();
        window.location.href = "/";
      }
    };

    return (
      <div className="flex items-center gap-4">
        <Link href="/profile" className="text-sm font-medium hover:text-brand-gold transition-colors">
          Welcome, {session.user.name?.split(" ")[0]}
        </Link>
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
