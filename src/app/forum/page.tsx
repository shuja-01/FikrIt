import Link from "next/link";
import { ChevronLeft, MessageSquare } from "lucide-react";

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={20} /> Back to Home
        </Link>
        <div className="glass-panel p-12 text-center">
          <MessageSquare className="mx-auto text-brand-gold mb-6" size={64} />
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4 text-gradient">Q&A Forum</h1>
          <p className="text-gray-600 max-w-lg mx-auto">Explore existing discussions and seek answers from our community of scholars. This section is currently being expanded.</p>
          <div className="mt-10 flex justify-center gap-4">
             <Link href="/ask" className="px-8 py-3 bg-brand-gold text-white rounded-full font-bold shadow-lg hover:brightness-110 transition-all">Ask a Question</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
