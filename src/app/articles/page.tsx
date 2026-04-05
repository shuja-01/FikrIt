"use client";

import { useEffect, useState } from "react";
import { 
  BookOpen, Clock, User, ArrowRight, Sparkles, 
  Search, Filter, Loader2, MessageSquare 
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const filteredArticles = activeCategory === "ALL" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const categories = [
    { id: "ALL", label: "All Research" },
    { id: "QURANIC_STUDIES", label: "Quranic Studies" },
    { id: "HADITH_SUNNAH", label: "Hadith & Sunnah" },
    { id: "FIQH", label: "Fiqh" },
    { id: "HISTORY_AHLULBAYT", label: "History" },
    { id: "CONTEMPORARY_ISSUES", label: "Contemporary" },
  ];

  return (
    <main className="min-h-screen bg-brand-sand pt-32 pb-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 text-center max-w-3xl mx-auto">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full font-black text-[10px] uppercase tracking-widest mb-6">
              <BookOpen size={14} /> Scholarly Research
           </div>
           <h1 className="text-6xl font-serif font-bold text-brand-dark mb-6 tracking-tight leading-tight">
             FikrIt <span className="italic text-brand-gold">Insights</span>
           </h1>
           <p className="text-xl text-gray-500 font-medium leading-relaxed">
             A library of scholarly articles, research, and contemporary reflections from our community of Deeni Guides.
           </p>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-y border-gray-100 py-8">
           <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                    activeCategory === cat.id
                      ? "bg-brand-dark text-white shadow-xl shadow-brand-gold/10"
                      : "bg-white text-gray-500 hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
           </div>
           <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full pl-12 pr-6 py-3 bg-white/50 border border-white/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-gold/10 outline-none backdrop-blur-sm transition-all"
              />
           </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <Loader2 size={32} className="animate-spin text-brand-gold" />
             <p className="text-gray-400 font-serif italic text-lg">Illuminating the library...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/articles/${article.slug}`}
                className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-sm hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500"
              >
                <div className="relative h-64 w-full overflow-hidden">
                   <img 
                     src={article.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"} 
                     alt={article.title}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-brand-dark/90 text-white rounded-full text-[10px] uppercase font-black tracking-widest backdrop-blur-md">
                        {article.category.replace('_', ' ')}
                      </span>
                   </div>
                </div>

                <div className="p-10 flex flex-col flex-1">
                   {/* Author Info */}
                   <div className="flex items-center gap-3 mb-6">
                      <img 
                        src={article.author.image || "/default-avatar.png"} 
                        className="w-10 h-10 rounded-full border-2 border-brand-gold/20 p-0.5" 
                        alt={article.author.name}
                      />
                      <div>
                        <p className="text-[10px] uppercase font-black text-brand-gold tracking-widest leading-none mb-1">
                           {article.author.scholarTitle || "Scholar"}
                        </p>
                        <p className="text-sm font-bold text-brand-dark">{article.author.name}</p>
                      </div>
                   </div>

                   <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                     {article.title}
                   </h3>

                   <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                     {article.excerpt || "Dive into this profound exploration of faith and wisdom, curated by our expert guides."}
                   </p>

                   <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1.5">
                           <Clock size={14} />
                           <span className="text-xs font-medium">{format(new Date(article.createdAt), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <MessageSquare size={14} />
                           <span className="text-xs font-medium">{article._count?.comments || 0}</span>
                        </div>
                      </div>
                      <span className="text-brand-gold group-hover:translate-x-2 transition-transform">
                        <ArrowRight size={18} />
                      </span>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-50 shadow-inner">
             <div className="w-20 h-20 bg-brand-sand rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} className="text-brand-gold/30" />
             </div>
             <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">The Library is Expanding</h3>
             <p className="text-gray-400 font-medium max-w-sm mx-auto">
               No articles found in this category yet. Our guides are currently authoring new research.
             </p>
          </div>
        )}

        {/* Call to Action */}
        <section className="mt-24 p-12 lg:p-20 bg-brand-dark rounded-[3.5rem] relative overflow-hidden text-center text-white border-8 border-white shadow-2xl">
           <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -ml-32 -mt-32" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-48 -mb-48" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles size={40} className="text-brand-gold mx-auto mb-8 animate-pulse" />
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 tracking-tight">Stay Guided on Your Journey</h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed font-serif italic">
                "Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise."
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <input 
                   type="email" 
                   placeholder="Join our newsletter"
                   className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:bg-white/20 transition-all font-medium min-w-[300px]"
                 />
                 <button className="w-full sm:w-auto px-10 py-4 bg-brand-gold text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all shadow-xl shadow-brand-gold/20">
                   Subscribe
                 </button>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}
