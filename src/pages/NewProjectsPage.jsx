import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NEW_PROJECTS, NASHIK_LOCATIONS } from '../data/mockData';
import { Building2, MapPin, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewProjectsPage = () => {
  const { openScheduleModal } = useApp();
  const [selectedLoc, setSelectedLoc] = useState('');

  const filteredProjects = selectedLoc
    ? NEW_PROJECTS.filter((p) => p.location.toLowerCase().includes(selectedLoc.toLowerCase()))
    : NEW_PROJECTS;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Newly Launched Developments
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          New Construction <span className="gold-gradient-text">Projects</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Discover upcoming townships, high-rise luxury towers, and pre-launch booking offers from top Nashik builders.
        </p>
      </div>

      {/* LOCATION FILTER ROW */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3 overflow-x-auto">
        <span className="text-xs font-bold text-slate-300 shrink-0">Filter by Locality:</span>
        <button
          onClick={() => setSelectedLoc('')}
          className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
            selectedLoc === '' ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
          }`}
        >
          All Locations
        </button>
        {NASHIK_LOCATIONS.slice(0, 6).map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelectedLoc(loc.name)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedLoc === loc.name ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="glass-panel-gold rounded-3xl overflow-hidden border border-amber-500/30 flex flex-col justify-between group hover:border-amber-400 transition-all"
          >
            <div className="h-64 relative overflow-hidden">
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-extrabold px-3 py-1 rounded-full">
                {proj.status}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs text-amber-400 font-extrabold tracking-wider uppercase">{proj.builder}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {proj.name}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{proj.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Starting Price</span>
                  <span className="text-lg font-bold text-amber-300 font-mono">{proj.startingPrice}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Possession Date</span>
                  <span className="text-sm font-bold text-white">{proj.possession}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400">Project Highlights</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {proj.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => openScheduleModal({ title: proj.name, location: proj.location })}
                  className="flex-1 py-3 px-4 rounded-xl glass-panel text-slate-200 hover:text-white font-bold text-xs cursor-pointer"
                >
                  Schedule Site Visit
                </button>
                <Link
                  to={`/project/${proj.id}`}
                  className="flex-1 py-3 px-4 rounded-xl gold-gradient-bg text-black font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
