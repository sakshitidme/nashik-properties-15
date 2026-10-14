import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { NASHIK_LOCATIONS, PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/cards/PropertyCard';
import { MapPin, TrendingUp, GraduationCap, Stethoscope, ShoppingBag, Bus, CheckCircle2 } from 'lucide-react';

export const LocationDetailsPage = () => {
  const { slug } = useParams();
  const locationData = NASHIK_LOCATIONS.find((l) => l.slug === slug) || NASHIK_LOCATIONS[0];
  const locProps = PROPERTIES.filter((p) => p.location.toLowerCase() === locationData.name.toLowerCase());

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* LOCALITY HERO */}
      <div className="relative h-[350px] sm:h-[420px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30">
        <img src={locationData.image} alt={locationData.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold uppercase">
            Locality Insights
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            {locationData.name}, Nashik
          </h1>
          <p className="text-sm text-amber-300 font-medium">{locationData.tagline}</p>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="glass-panel-gold rounded-3xl p-6 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="text-[10px] uppercase text-slate-400 font-bold block">Available Properties</span>
          <span className="text-2xl font-extrabold text-white font-mono">{locationData.propertiesCount} Units</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-400 font-bold block">Starting Price</span>
          <span className="text-2xl font-extrabold text-amber-300 font-mono">{locationData.startingPrice}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-400 font-bold block">Avg. Rate / sq.ft</span>
          <span className="text-2xl font-extrabold text-white font-mono">{locationData.avgPricePerSqft}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-slate-400 font-bold block">YoY Price Appreciation</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono flex items-center justify-center gap-1">
            <TrendingUp className="w-5 h-5" />
            {locationData.priceGrowth}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* OVERVIEW & INFRASTRUCTURE */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white">Locality Overview</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {locationData.description}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Social Infrastructure & Amenities</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* SCHOOLS */}
              <div className="glass-panel p-5 rounded-2xl space-y-3 border border-white/5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <GraduationCap className="w-4 h-4" />
                  <span>Renowned Schools & Colleges</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {locationData.schools?.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* HOSPITALS */}
              <div className="glass-panel p-5 rounded-2xl space-y-3 border border-white/5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Stethoscope className="w-4 h-4" />
                  <span>Hospitals & Healthcare</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {locationData.hospitals?.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTIVITY */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Bus className="w-4 h-4 text-amber-400" />
            <span>Transit & Connectivity</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {locationData.connectivity}
          </p>
        </div>
      </div>

      {/* PROPERTIES IN THIS LOCALITY */}
      <div className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold text-white">Properties for Sale & Rent in {locationData.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locProps.length > 0 ? (
            locProps.map((prop) => <PropertyCard key={prop.id} property={prop} />)
          ) : (
            PROPERTIES.slice(0, 3).map((prop) => <PropertyCard key={prop.id} property={prop} />)
          )}
        </div>
      </div>
    </div>
  );
};
