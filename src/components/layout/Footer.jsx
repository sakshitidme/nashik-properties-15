import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Phone, Mail, ArrowRight, ShieldCheck, Heart, MessageSquare } from 'lucide-react';
import { NASHIK_LOCATIONS } from '../../data/mockData';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-amber-500/15 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Glow Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-amber-500/25 bg-slate-950 border border-amber-500/40 p-0.5">
                <img src="/favicon.svg" alt="Nashik Property Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  NASHIK PROPERTY <span className="gold-gradient-text">15</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold -mt-1">
                  Next-Gen Real Estate Marketplace
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Nashik Property 15 is Nashik’s premier tech-enabled luxury real-estate platform. Discover verified luxury villas, sky residences, investment plots, and corporate commercial spaces across Nashik, Maharashtra.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Woodland Tower, Old Gangapur Naka, Gangapur Road, Nashik 422005</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 98220 15150 / +91 253 2351515</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>concierge@nashikproperty15.com</span>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="pt-1">
              <span className="text-xs text-amber-300 font-semibold block mb-2">Subscribe for Nashik Real Estate Reports</span>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Nashik Property 15 Insights!'); }} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  required
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 flex-1"
                />
                <button type="submit" className="gold-gradient-bg p-2 rounded-xl text-black font-bold hover:opacity-90 transition-all cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* 3 COLUMNS ON MOBILE RESPONSIVE */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-2 sm:gap-6 pt-4 lg:pt-0">
            {/* QUICK LINKS */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-400">
                Marketplace
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-xs">
                {['Buy Properties', 'Rent Homes', 'Commercial Hubs', 'Land & Plots', 'Newly Launched', 'Compare', 'EMI Calculator', 'AI Finder'].map((item, i) => {
                  const pathMap = {
                    'Buy Properties': '/buy',
                    'Rent Homes': '/rent',
                    'Commercial Hubs': '/commercial',
                    'Land & Plots': '/plots',
                    'Newly Launched': '/projects',
                    'Compare': '/compare',
                    'EMI Calculator': '/calculator',
                    'AI Finder': '/ai-finder'
                  };
                  return (
                    <li key={i}>
                      <Link to={pathMap[item] || '/buy'} className="hover:text-amber-300 transition-colors truncate block">
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* PRIME LOCALITIES */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-400">
                Localities
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-xs">
                {NASHIK_LOCATIONS.slice(0, 8).map((loc) => (
                  <li key={loc.id}>
                    <Link to={`/location/${loc.slug}`} className="hover:text-amber-300 transition-colors flex items-center justify-between gap-1">
                      <span className="truncate">{loc.name}</span>
                      <span className="text-[8px] sm:text-[10px] text-amber-400/70 font-mono hidden sm:inline">{loc.startingPrice}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY & NETWORK */}
            <div className="space-y-3">
              <h4 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-400">
                Company
              </h4>
              <ul className="space-y-2 text-[10px] sm:text-xs">
                {['About Us', 'Verified Agents', 'Builder Directory', 'Market Blog', 'User Dashboard', 'Sell Free', 'Concierge', 'FAQs'].map((item, i) => {
                  const pathMap = {
                    'About Us': '/about',
                    'Verified Agents': '/agents',
                    'Builder Directory': '/builders',
                    'Market Blog': '/blog',
                    'User Dashboard': '/dashboard',
                    'Sell Free': '/sell',
                    'Concierge': '/contact',
                    'FAQs': '/faq'
                  };
                  return (
                    <li key={i}>
                      <Link to={pathMap[item] || '/about'} className="hover:text-amber-300 transition-colors truncate block">
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NASHIK PROPERTY 15. All Rights Reserved. RERA Registered Agent & Advisory.</p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/faq" className="hover:text-slate-300">MahaRERA Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
