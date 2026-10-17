import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROPERTIES, NASHIK_LOCATIONS } from '../data/mockData';
import { PropertyCard } from '../components/cards/PropertyCard';
import { Search, Filter, Grid, List, SlidersHorizontal, RotateCcw, CheckCircle2 } from 'lucide-react';

export const BuyPropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Load properties from mock data (PDF-derived)
  useEffect(() => {
    setProperties(PROPERTIES);
    setLoading(false);
  }, []);


  // Filters State
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('budget') || '50000000');
  const [selectedBhk, setSelectedBhk] = useState(searchParams.get('bhk') || '');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price-asc' | 'price-desc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filter Properties Logic
  const filteredProperties = useMemo(() => {
    return (properties || []).filter((p) => {
      if (p.category !== 'buy' && p.category !== 'plots') return false;
      if (selectedLocation && p.location.toLowerCase() !== selectedLocation.toLowerCase()) return false;
      if (selectedType && p.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      if (selectedBhk && p.bhk !== parseInt(selectedBhk)) return false;
      if (maxPrice && p.priceNumeric > parseInt(maxPrice)) return false;
      if (verifiedOnly && !p.verified) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      return new Date(b.addedDate) - new Date(a.addedDate);
    });
  }, [properties, selectedLocation, selectedType, selectedBhk, maxPrice, verifiedOnly, sortBy]);

  const resetFilters = () => {
    setSelectedLocation('');
    setSelectedType('');
    setMaxPrice('50000000');
    setSelectedBhk('');
    setVerifiedOnly(false);
  };

  if (loading) {
    return (
      <div className="text-center text-white">Loading properties...</div>
    );
  }
  if (apiError) {
    return (
      <div className="text-center text-red-500">Error: {apiError}</div>
    );
  }
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* PAGE HEADER */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Residential & Investment Marketplace
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Find Your <span className="gold-gradient-text">Perfect Property</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Explore verified apartments, penthouses, villas, and plots across Gangapur Road, College Road & Nashik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT FILTERS SIDEBAR */}
        <div className="lg:col-span-4 glass-panel-gold rounded-3xl p-6 border border-amber-500/30 space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>Advanced Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Location Filter */}
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

          {/* Property Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Property Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Plots">NA Plot</option>
              <option value="Farmhouse">Farmhouse</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Max Budget</span>
              <span className="font-bold text-amber-300 font-mono">
                ₹ {(parseInt(maxPrice) / 100000).toFixed(0)} Lakh
              </span>
            </div>
            <input
              type="range"
              min="2000000"
              max="50000000"
              step="1000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* BHK Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">BHK Configuration</label>
            <div className="grid grid-cols-4 gap-2">
              {['', '2', '3', '4'].map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => setSelectedBhk(bhk)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedBhk === bhk
                      ? 'bg-amber-500 text-black'
                      : 'glass-panel text-slate-300 hover:border-amber-400'
                  }`}
                >
                  {bhk === '' ? 'Any' : `${bhk} BHK`}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Only Toggle */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Verified Listings Only</span>
            </span>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded border-amber-500/30 text-amber-500 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* RIGHT PROPERTY LISTINGS */}
        <div className="lg:col-span-8 space-y-6">
          {/* SORT & CONTROLS */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-300 font-medium">
              Showing <span className="text-amber-400 font-bold font-mono">{filteredProperties.length}</span> Properties in Nashik
            </span>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="newest">Sort by Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              <div className="flex items-center gap-1 glass-panel p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GRID RENDER */}
          {filteredProperties.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-white/10">
              <h3 className="text-xl font-bold text-white">No Properties Found</h3>
              <p className="text-xs text-slate-400">Try adjusting your filters or resetting budget parameters.</p>
              <button onClick={resetFilters} className="py-2.5 px-6 gold-gradient-bg text-black font-bold text-xs rounded-xl">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop._id || prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
