import React, { useState, useMemo, useEffect } from 'react';
import { NASHIK_LOCATIONS } from '../data/mockData';
import { get } from '../services/api';
import { PropertyCard } from '../components/cards/PropertyCard';
import { Filter, KeyRound, Loader2 } from 'lucide-react';

export const RentPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [maxRent, setMaxRent] = useState('100000');
  const [selectedBhk, setSelectedBhk] = useState('');

  useEffect(() => {
    get('/api/properties?category=rent')
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setLoading(false);
      });
  }, []);

  const rentalProperties = useMemo(() => {
    return (properties || []).filter((p) => {
      if (p.category !== 'rent') return false;
      if (selectedLocation && p.location.toLowerCase() !== selectedLocation.toLowerCase()) return false;
      if (selectedBhk && p.bhk !== parseInt(selectedBhk)) return false;
      if (maxRent && p.priceNumeric > parseInt(maxRent)) return false;
      return true;
    });
  }, [properties, selectedLocation, selectedBhk, maxRent]);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>Rental Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Luxury Homes <span className="gold-gradient-text">for Rent</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Discover ready-to-move furnished apartments and executive suites for lease across Nashik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FILTERS */}
        <div className="lg:col-span-4 glass-panel-gold rounded-3xl p-6 border border-amber-500/30 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>Rental Filters</span>
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Locality</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="">All Nashik Localities</option>
              {NASHIK_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Max Monthly Rent</span>
              <span className="font-bold text-amber-300 font-mono">₹ {parseInt(maxRent).toLocaleString()} / mo</span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">BHK Configuration</label>
            <div className="grid grid-cols-3 gap-2">
              {['', '2', '3'].map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => setSelectedBhk(bhk)}
                  className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    selectedBhk === bhk ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
                  }`}
                >
                  {bhk === '' ? 'Any' : `${bhk} BHK`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LISTINGS */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-3">
                <Loader2 className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
                <p className="text-slate-300 text-sm">Loading rental listings…</p>
              </div>
            </div>
          ) : apiError ? (
            <div className="glass-panel rounded-3xl p-10 text-center border border-white/10 space-y-3">
              <p className="text-red-400 text-sm font-medium">Error loading properties</p>
              <p className="text-slate-400 text-xs">{apiError}</p>
            </div>
          ) : rentalProperties.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 space-y-3">
              <h3 className="text-xl font-bold text-white">No Rental Properties Found</h3>
              <p className="text-xs text-slate-400">Try adjusting your filters or check back soon for new listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rentalProperties.map((prop) => (
                <PropertyCard key={prop._id || prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
