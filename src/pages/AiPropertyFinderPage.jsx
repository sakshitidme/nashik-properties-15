import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/cards/PropertyCard';
import { Sparkles, Send, Bot, CheckCircle2 } from 'lucide-react';

export const AiPropertyFinderPage = () => {
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || "I am looking for a 3 BHK luxury flat in Gangapur Road under 80 lakh...";
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(PROPERTIES.slice(0, 3));

  const handleAiSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResults(PROPERTIES);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Next-Gen Conversational AI Search</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          AI Property <span className="gold-gradient-text">Matchmaker</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Describe your dream property in simple words. Our AI scans prices, floorplans, and localities in Nashik.
        </p>
      </div>

      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold">
            <Bot className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Nashik Property 15 Intelligence Engine</h3>
            <span className="text-[10px] text-amber-300 block">Trained on NMC Sanctions & MahaRERA Market Rates</span>
          </div>
        </div>

        <form onSubmit={handleAiSearch} className="space-y-4">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type anything e.g. 'Show me ready to move 4 BHK penthouses near Someshwar waterfall with private pool access...'"
            className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Analyzing Nashik Database...' : 'Run AI Property Match'}</span>
          </button>
        </form>
      </div>

      {/* AI MATCH RESULTS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Matched Recommendations</span>
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono font-normal">
              98.4% Match Score
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </div>
  );
};
