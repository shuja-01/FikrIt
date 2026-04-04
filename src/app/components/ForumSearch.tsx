"use client";

import { useState } from "react";
import { Search, ExternalLink, Loader2 } from "lucide-react";

export default function ForumSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [moreLink, setMoreLink] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setMoreLink(null);
    try {
      const res = await fetch(`/api/search-sistani?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.results || []);
      setMoreLink(data.moreLink || null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch results. Sistani.org might be temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-panel p-6 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-4 text-brand-gold font-bold">
          <Search size={20} /> Forum Search
        </div>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions or rulings (includes Sistani.org)..." 
            className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all bg-white"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-gold text-white rounded-xl font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 min-w-[120px]"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Search"}
          </button>
        </form>
        <p className="mt-3 text-xs text-gray-400 text-center">
          *Results will include community discussions and official Sistani.org rulings.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-center text-sm animate-in fade-in zoom-in-95">
          {error}
        </div>
      )}

      {hasSearched && !loading && !error && results.length === 0 && (
        <div className="bg-white border border-gray-100 text-gray-500 p-12 rounded-xl text-center animate-in fade-in zoom-in-95">
          <p className="font-medium mb-1">No results found for "{query}"</p>
          <p className="text-xs">Try broader keywords or search directly on <a href={moreLink || "https://www.sistani.org/english/qa/"} target="_blank" className="text-brand-gold underline font-bold">Sistani.org</a></p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Top Results</h3>
            {moreLink && (
               <a 
                 href={moreLink} 
                 target="_blank" 
                 className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1"
               >
                 View More on Sistani.org <ExternalLink size={10} />
               </a>
            )}
          </div>
          
          <div className="grid gap-4">
            {results.slice(0, 2).map((result, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border-l-4 border-l-brand-gold border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-serif font-bold text-brand-dark group-hover:text-brand-gold transition-colors block mb-2"
                >
                  {result.title}
                </a>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {result.snippet}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] bg-brand-sand text-brand-gold px-2 py-1 rounded-full font-black uppercase tracking-widest">
                    OFFICIAL RULING
                  </span>
                  <a href={result.url} target="_blank" className="text-xs text-gray-400 hover:text-brand-gold font-bold">Read full QA &rarr;</a>
                </div>
              </div>
            ))}
          </div>

          {results.length > 2 && (
             <div className="bg-brand-sand/30 border border-brand-gold/10 p-6 rounded-2xl text-center mt-6">
                <p className="text-sm text-brand-dark font-medium mb-2">Want to explore more detailed rulings on this topic?</p>
                <a 
                   href={moreLink || `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`}
                   target="_blank"
                   className="inline-flex items-center gap-2 bg-brand-gold text-white px-6 py-2.5 rounded-full text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-brand-gold/20"
                >
                   Go to Sistani.org for more results <ExternalLink size={14} />
                </a>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
