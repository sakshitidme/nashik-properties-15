import React, { useEffect, useState } from 'react';
import { get } from '../services/api';
import { PropertyCard } from '../components/cards/PropertyCard';
import { Building2, Store, Landmark, Warehouse, Factory, Briefcase, Loader2 } from 'lucide-react';

export const CommercialPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    get('/api/properties?category=commercial')
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setLoading(false);
      });
  }, []);

  const COMMERCIAL_TYPES = [
    { title: 'Corporate Offices', icon: <Briefcase className="w-5 h-5 text-amber-400" />, count: '45+ Spaces' },
    { title: 'Retail Shops', icon: <Store className="w-5 h-5 text-amber-400" />, count: '60+ Outlets' },
    { title: 'Showrooms', icon: <Building2 className="w-5 h-5 text-amber-400" />, count: '25+ Frontages' },
    { title: 'Warehouses', icon: <Warehouse className="w-5 h-5 text-amber-400" />, count: '30+ Logistics Hubs' },
    { title: 'Industrial MIDC', icon: <Factory className="w-5 h-5 text-amber-400" />, count: '18+ Plants' },
    { title: 'Commercial Land', icon: <Landmark className="w-5 h-5 text-amber-400" />, count: '20+ Plots' }
  ];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Grade-A Corporate Real Estate
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Commercial <span className="gold-gradient-text">Spaces & Offices</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          High-footfall retail storefronts, IT park office suites, and highway commercial land along College Road & Pathardi Phata.
        </p>
      </div>

      {/* CATEGORY GRID — static, no backend API needed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {COMMERCIAL_TYPES.map((cat, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/10 text-center space-y-2 hover:border-amber-400 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto">
              {cat.icon}
            </div>
            <h4 className="text-xs font-bold text-white">{cat.title}</h4>
            <span className="text-[10px] text-amber-300 block font-mono">{cat.count}</span>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Available Commercial Properties</h2>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-3">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
              <p className="text-slate-300 text-sm">Loading commercial listings…</p>
            </div>
          </div>
        ) : apiError ? (
          <div className="glass-panel rounded-3xl p-10 text-center border border-white/10 space-y-3">
            <p className="text-red-400 text-sm font-medium">Error loading properties</p>
            <p className="text-slate-400 text-xs">{apiError}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 space-y-3">
            <h3 className="text-xl font-bold text-white">No Commercial Listings Yet</h3>
            <p className="text-xs text-slate-400">Contact our team to list or enquire about commercial spaces in Nashik.</p>
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
