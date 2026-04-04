"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/profile" className="text-sm font-medium hover:text-brand-gold transition-colors">
          Welcome, {session.user.name?.split(" ")[0]}
        </Link>
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-800 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm"
        >
          Sign Out <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-full text-sm font-medium hover:bg-black transition-colors shadow-lg hover:shadow-xl"
    >
      Sign In <User size={16} />
    </button>
  );
}
