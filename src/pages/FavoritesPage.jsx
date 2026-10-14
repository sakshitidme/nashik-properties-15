import React from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/cards/PropertyCard';
import { PROPERTIES } from '../data/mockData';
import { Heart, Trash2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favorites } = useApp();

  const favList = favorites.length > 0 ? favorites : PROPERTIES.slice(0, 2);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Saved Shortlist</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Your Favorite <span className="gold-gradient-text">Properties</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Review saved luxury villas, apartments, and plot listings. Compare specifications or schedule a private site visit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favList.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  );
};
