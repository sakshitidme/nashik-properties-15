import React from 'react';
import { Link } from 'react-router-dom';
import { NASHIK_LOCATIONS } from '../data/mockData';
import { NashikMap3D } from '../components/3d/NashikMap3D';
import { MapPin, TrendingUp, ArrowUpRight } from 'lucide-react';

export const ExploreLocationsPage = () => {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Micro-Market Intelligence
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Explore Nashik <span className="gold-gradient-text">Localities</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Discover price appreciation trends, school proximities, healthcare facilities, and active inventory across 11 key zones in Nashik.
        </p>
      </div>

      {/* 3D INTERACTIVE MAP */}
      <NashikMap3D />

      {/* LOCATION CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {NASHIK_LOCATIONS.map((loc) => (
          <Link
            key={loc.id}
            to={`/location/${loc.slug}`}
            className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 group cursor-pointer flex flex-col justify-between"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-500/30">
                {loc.propertiesCount} Properties Listed
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>{loc.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-amber-200/80 font-medium">{loc.tagline}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting Rate</span>
                  <span className="font-bold text-amber-300 font-mono">{loc.startingPrice}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Annual Appreciation</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {loc.priceGrowth}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {loc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
