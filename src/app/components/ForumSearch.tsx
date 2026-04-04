"use client";

import { useState } from "react";
import { Search, ExternalLink, Loader2 } from "lucide-react";

export default function ForumSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search-sistani?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
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
            className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
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

      {results.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">Search Results</h3>
          {results.map((result, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-serif font-bold text-brand-dark hover:text-brand-gold transition-colors flex items-center justify-between group"
              >
                {result.title}
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {result.snippet}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] bg-brand-sand text-brand-gold px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
                  {result.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
