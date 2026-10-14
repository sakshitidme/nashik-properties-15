import React from 'react';
import { Award, ShieldCheck, Users, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Redefining Real Estate in Nashik
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          About <span className="gold-gradient-text">Nashik Property 15</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Founded with a vision to eliminate middleman ambiguity, Nashik Property 15 is the city's premier tech-enabled luxury property marketplace.
        </p>
      </div>

      {/* STATS STRIP */}
      <div className="glass-panel-gold rounded-3xl p-8 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono gold-gradient-text">1,500+</span>
          <span className="text-xs text-slate-400 block pt-1">Properties Listed</span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono">₹ 450 Cr+</span>
          <span className="text-xs text-slate-400 block pt-1">Transaction Volume</span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">100%</span>
          <span className="text-xs text-slate-400 block pt-1">MahaRERA Compliant</span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">4.9 ★</span>
          <span className="text-xs text-slate-400 block pt-1">Customer Rating</span>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
          <ShieldCheck className="w-10 h-10 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Absolute Transparency</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every property listed on our platform undergoes a 24-point legal check and MahaRERA audit before going live.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
          <Sparkles className="w-10 h-10 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Tech-Driven Concierge</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            From 3D architectural renders to AI property matching, we leverage cutting-edge WebGL technology for immersive buyer experiences.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
          <Users className="w-10 h-10 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Hyper-Local Expertise</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our advisory team brings over 15 years of ground micro-market insights across Gangapur Road, College Road & Igatpuri.
          </p>
        </div>
      </div>
    </div>
  );
};
