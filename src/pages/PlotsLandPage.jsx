import React, { useEffect, useState } from 'react';
import { get } from '../services/api';
import { PropertyCard } from '../components/cards/PropertyCard';
import { Map, TreePine, Fence, Home, Loader2 } from 'lucide-react';

export const PlotsLandPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    get('/api/properties?category=plots')
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setLoading(false);
      });
  }, []);

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
          Land & Plot Investments
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          NA Plots & <span className="gold-gradient-text">Agricultural Land</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Sanctioned non-agricultural (NA) plots, gated bungalow layouts, and hilltop farm land across Makhmalabad, Trimbak Road & Pathardi.
        </p>
      </div>

      {/* Plot type cards — static, no backend API needed */}
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

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Featured Plot Listings</h2>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-3">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
              <p className="text-slate-300 text-sm">Loading plot listings…</p>
            </div>
          </div>
        ) : apiError ? (
          <div className="glass-panel rounded-3xl p-10 text-center border border-white/10 space-y-3">
            <p className="text-red-400 text-sm font-medium">Error loading plots</p>
            <p className="text-slate-400 text-xs">{apiError}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 space-y-3">
            <h3 className="text-xl font-bold text-white">No Plot Listings Yet</h3>
            <p className="text-xs text-slate-400">Contact our land advisory team to enquire about available plots.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop._id || prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
