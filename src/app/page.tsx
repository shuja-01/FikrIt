import Link from "next/link";
import Image from "next/image";
import AuthButton from "./components/AuthButton";
import { HelpCircle, Video, TrendingUp, BookMarked } from "lucide-react";
import ForumSearch from "./components/ForumSearch";
import DailyReflection from "./components/DailyReflection";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-sand">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 glass-panel border-b-0 m-4 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          {/* Real Logo from public folder */}
          <div className="w-16 h-16 relative overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm">
             <Image 
               src="/NewFIlogo.png" 
               alt="Fikrit Logo" 
               fill 
               className="object-contain"
             />
          </div>
          <span className="text-xl font-serif font-bold tracking-widest uppercase text-brand-dark">Fikrit</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-700">
          <Link href="/forum" className="hover:text-brand-gold transition-colors">Q&A Forum</Link>
          <Link href="/articles" className="hover:text-brand-gold transition-colors">Articles</Link>
          <Link href="/videos" className="hover:text-brand-gold transition-colors">Videos</Link>
          <a 
            href="https://archive.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-brand-gold transition-colors"
          >
            Books
          </a>
        </div>
        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute top-0 right-0 -mr-40 top-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-8 text-brand-dark">
            Share Your <span className="text-gradient">Thinking.</span><br />
            Elevate Your Faith.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Welcome to Fikrit. Engage in deep Q&A, study structured courses, and immerse yourself in a community built around authentic Islamic knowledge and thoughtful exchange.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <Link href="/ask" className="px-8 py-4 bg-brand-gold text-white rounded-full font-bold hover:bg-yellow-600 transition-all shadow-xl shadow-brand-gold/20 flex items-center gap-2 transform hover:-translate-y-1">
              <HelpCircle size={20} /> Ask a Question
            </Link>
            <Link href="/videos" className="px-8 py-4 bg-white text-brand-dark border border-gray-100 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm transform hover:-translate-y-1">
              <Video size={20} /> Watch Latest Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Forum Search Section - Sistani Integrated */}
      <section className="px-6 md:px-12 lg:px-24 pb-16">
         <ForumSearch />
      </section>

      {/* Daily Reflection Widget & Quick Links */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Daily Feature */}
          <DailyReflection />

          {/* Tools Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/forum" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center flex-col justify-center text-center hover:translate-y-[-2px] transition-transform cursor-pointer">
              <TrendingUp className="text-emerald-600 mb-2" size={24} />
              <span className="font-medium text-sm">Trending<br/>Discussions</span>
            </Link>
            <a 
              href="https://archive.org/" 
              target="_blank" 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center flex-col justify-center text-center hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              <BookMarked className="text-blue-600 mb-2" size={24} />
              <span className="font-medium text-sm">Top Books<br/>Library</span>
            </a>
          </div>

        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-16 text-gray-400 text-sm border-t border-gray-200 bg-white/30">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="relative w-48 h-16 overflow-hidden">
            <Image 
              src="/NewFIlogo.png" 
              alt="Fikrit Full Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <p className="max-w-xs text-xs italic">"Empowering the community through shared thinking and authentic knowledge."</p>
        </div>
        &copy; {new Date().getFullYear()} Fikrit - Share Your Thinking.
      </footer>
    </main>
  );
}
