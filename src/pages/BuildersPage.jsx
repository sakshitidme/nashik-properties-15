import React from 'react';
import { Link } from 'react-router-dom';
import { BUILDERS } from '../data/mockData';
import { Building2, Award, Phone, CheckCircle2 } from 'lucide-react';

export const BuildersPage = () => {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Nashik Premier Developers
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Builder & Developer <span className="gold-gradient-text">Directory</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Top real estate construction groups delivering luxury high-rises, commercial hubs, and gated bungalow townships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BUILDERS.map((builder) => (
          <div
            key={builder.id}
            className="glass-panel-gold rounded-3xl p-8 border border-amber-500/30 flex flex-col justify-between space-y-6 group hover:border-amber-400 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={builder.logo} alt={builder.name} className="w-16 h-16 rounded-2xl object-cover border border-amber-400/50" />
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {builder.name}
                  </h3>
                  <span className="text-xs text-amber-400 font-mono font-bold">★ {builder.rating} Rated</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {builder.description}
              </p>

              <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Experience</span>
                  <span className="font-bold text-white">{builder.experience}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Completed</span>
                  <span className="font-bold text-amber-300 font-mono">{builder.completedProjects}+</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Ongoing</span>
                  <span className="font-bold text-emerald-400 font-mono">{builder.ongoingProjects} Proj.</span>
                </div>
              </div>
            </div>

            <Link
              to={`/builder/${builder.id}`}
              className="w-full py-3 rounded-xl gold-gradient-bg text-black font-extrabold text-xs text-center block cursor-pointer"
            >
              View Builder Profile & Projects
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
