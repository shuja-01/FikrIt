import Link from "next/link";
import { ChevronLeft, Video } from "lucide-react";

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-brand-sand pt-24 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft size={20} /> Back to Home
        </Link>
        <div className="glass-panel p-12 text-center">
          <Video className="mx-auto text-red-600 mb-6" size={64} />
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4 text-gradient">Watch Latest Videos</h1>
          <p className="text-gray-600 max-w-lg mx-auto">Watch lectures, Q&A sessions, and educational content from our scholars. We'll be updating this gallery soon.</p>
        </div>
      </div>
    </main>
  );
}
