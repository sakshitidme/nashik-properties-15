import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PROPERTIES } from '../data/mockData';
import { Scale, X, CheckCircle2, Bed, Bath, Maximize2, MapPin, Calendar, Plus } from 'lucide-react';

export const PropertyComparisonPage = () => {
  const { compareList, removeFromCompare, clearCompare, openScheduleModal } = useApp();

  // If list is empty, default to comparing 2 properties for demonstration
  const displayProperties = compareList.length > 0 ? compareList : PROPERTIES.slice(0, 2);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Spec Matrix Comparison</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Property <span className="gold-gradient-text">Comparison</span>
          </h1>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold glass-panel px-4 py-2 rounded-xl border border-rose-500/30 cursor-pointer"
          >
            Clear All Properties
          </button>
        )}
      </div>

      {/* COMPARISON MATRIX TABLE */}
      <div className="glass-panel-gold rounded-3xl overflow-x-auto border border-amber-500/30">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-6 text-xs uppercase font-extrabold text-amber-400 w-1/4">Features</th>
              {displayProperties.map((prop) => (
                <th key={prop.id} className="p-6 text-slate-200 font-bold w-1/3 relative">
                  <button
                    onClick={() => removeFromCompare(prop.id)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="space-y-2 pr-6">
                    <img src={prop.image} alt={prop.title} className="w-full h-36 object-cover rounded-2xl" />
                    <h3 className="text-sm font-bold text-white line-clamp-1">{prop.title}</h3>
                    <span className="text-lg font-mono font-extrabold text-amber-300 block">{prop.price}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            <tr>
              <td className="p-6 font-bold text-slate-400">Location</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6 font-semibold text-white">{p.location}</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">Property Type</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6 text-amber-300 font-bold">{p.type}</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">BHK Configuration</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6 font-mono font-bold text-white">{p.bhk || 0} BHK</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">Carpet Area</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6 font-mono">{p.area} sq.ft</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">Price / sq.ft</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6 font-mono text-amber-400 font-bold">{p.pricePerSqft || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">Bathrooms</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6">{p.bathrooms} Baths</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">Furnishing Status</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6">{p.furnishing}</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">Possession</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6 font-semibold text-white">{p.possession}</td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-slate-400">Actions</td>
              {displayProperties.map((p) => (
                <td key={p.id} className="p-6 space-y-2">
                  <Link
                    to={`/property/${p.slug}`}
                    className="w-full py-2.5 gold-gradient-bg text-black font-extrabold text-[11px] rounded-xl text-center block"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => openScheduleModal(p)}
                    className="w-full py-2.5 glass-panel text-white font-bold text-[11px] rounded-xl cursor-pointer"
                  >
                    Schedule Visit
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
