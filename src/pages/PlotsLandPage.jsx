import React, { useState, useMemo } from 'react';
import { PROPERTIES, NASHIK_LOCATIONS } from '../data/mockData';
import { PropertyCard } from '../components/cards/PropertyCard';
import { Map, TreePine, Fence, Home } from 'lucide-react';

export const PlotsLandPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const allPlots = PROPERTIES.filter((p) => p.category === 'plots');

  const filteredPlots = useMemo(() => {
    return allPlots.filter((p) => {
      if (selectedLocation && p.location.toLowerCase() !== selectedLocation.toLowerCase()) return false;
      if (selectedType && p.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      return true;
    });
  }, [allPlots, selectedLocation, selectedType]);

  const PLOT_TYPES = [
    { title: 'Residential Plots', desc: 'NMC & Collector Sanctioned NA plots with 1.5 FSI', icon: <Home className="w-5 h-5 text-amber-400" /> },
    { title: 'Commercial Plots', desc: 'Main Road Frontage NA plots for office & retail', icon: <Map className="w-5 h-5 text-amber-400" /> },
    { title: 'Agricultural Land', desc: 'Fertile farmland parcels near Dindori & Igatpuri', icon: <TreePine className="w-5 h-5 text-amber-400" /> },
    { title: 'Farmhouse Land', desc: 'Scenic foothill plots near Trimbak & Sula Vineyards', icon: <Fence className="w-5 h-5 text-amber-400" /> }
  ];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Land &amp; Plot Investments
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          NA Plots &amp; <span className="gold-gradient-text">Agricultural Land</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Sanctioned non-agricultural (NA) plots, gated bungalow layouts, and hilltop farm land across Makhmalabad, Trimbak Road &amp; Pathardi.
        </p>
      </div>

      {/* Plot type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLOT_TYPES.map((type, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 hover:border-amber-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              {type.icon}
            </div>
            <h4 className="text-base font-bold text-white">{type.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{type.desc}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
        >
          <option value="">All Localities</option>
          {NASHIK_LOCATIONS.map((loc) => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
        >
          <option value="">All Plot Types</option>
          <option value="Plots">NA Plots</option>
          <option value="Agricultural Land">Agricultural Land</option>
          <option value="Farmhouse">Farmhouse Land</option>
        </select>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          Featured Plot Listings
          <span className="ml-3 text-sm font-normal text-amber-400">({filteredPlots.length} listings)</span>
        </h2>

        {filteredPlots.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 space-y-3">
            <h3 className="text-xl font-bold text-white">No Plot Listings Found</h3>
            <p className="text-xs text-slate-400">Contact our land advisory team to enquire about available plots.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlots.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
