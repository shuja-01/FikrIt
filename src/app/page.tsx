import Link from "next/link";
import { BookOpen, HelpCircle, Video, TrendingUp, Sun, BookMarked, User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-sand">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 glass-panel border-b-0 m-4 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          {/* Logo representation */}
          <div className="w-8 h-8 relative flex items-center justify-center">
            <div className="absolute inset-x-1 bottom-0 h-4 border-l-4 border-r-4 border-t-4 border-brand-gold rounded-t-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-2 bg-brand-gold"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-2 bg-brand-gold"></div>
          </div>
          <span className="text-xl font-serif font-bold tracking-widest uppercase">Fikrit</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-medium text-sm">
          <Link href="/forum" className="hover:text-brand-gold transition-colors">Q&A Forum</Link>
          <Link href="/articles" className="hover:text-brand-gold transition-colors">Articles</Link>
          <Link href="/videos" className="hover:text-brand-gold transition-colors">Videos</Link>
          <Link href="/books" className="hover:text-brand-gold transition-colors">Books</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-full text-sm font-medium hover:bg-black transition-colors shadow-lg hover:shadow-xl">
             Sign In <User size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute top-0 right-0 -mr-40 top-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            Share Your <span className="text-gradient">Thinking.</span><br />
            Elevate Your Faith.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
            Welcome to Fikrit. Engage in deep Q&A, study structured courses, and immerse yourself in a community built around authentic Islamic knowledge and thoughtful exchange.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-brand-gold text-white rounded-full font-semibold hover:bg-yellow-600 transition-all shadow-xl shadow-brand-gold/20 flex items-center gap-2">
              <HelpCircle size={18} /> Ask a Question
            </button>
            <button className="px-6 py-3 bg-white text-brand-dark border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
              <Video size={18} /> Watch Latest Videos
            </button>
          </div>
        </div>
      </section>

      {/* Daily Reflection Widget & Quick Links */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Daily Feature */}
          <div className="md:col-span-2 glass-panel p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold group-hover:w-full transition-all duration-700 opacity-10" />
            <div className="flex items-center gap-2 text-brand-gold mb-4 font-semibold text-sm tracking-uppercase">
               <Sun size={16} /> Daily Reflection
            </div>
            <h3 className="text-2xl font-serif mb-4 leading-normal">
              "And He found you lost and guided [you]." 
            </h3>
            <p className="text-gray-500 text-sm">— Quran 93:7 (Surah Ad-Duhaa)</p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center flex-col justify-center text-center hover:translate-y-[-2px] transition-transform cursor-pointer">
              <TrendingUp className="text-emerald-600 mb-2" size={24} />
              <span className="font-medium text-sm">Trending<br/>Discussions</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center flex-col justify-center text-center hover:translate-y-[-2px] transition-transform cursor-pointer">
              <BookMarked className="text-blue-600 mb-2" size={24} />
              <span className="font-medium text-sm">Top Books<br/>Library</span>
            </div>
          </div>

        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-10 text-gray-400 text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} Fikrit - Share Your Thinking.
      </footer>
    </main>
  );
}
