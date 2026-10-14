import React from 'react';
import { useParams } from 'react-router-dom';
import { BUILDERS, NEW_PROJECTS } from '../data/mockData';
import { Building2, Phone, CheckCircle2 } from 'lucide-react';

export const BuilderProfilePage = () => {
  const { id } = useParams();
  const builder = BUILDERS.find((b) => b.id === id) || BUILDERS[0];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border border-amber-500/30 flex flex-col md:flex-row items-center gap-8">
        <img src={builder.logo} alt={builder.name} className="w-28 h-28 rounded-2xl object-cover border-2 border-amber-400" />
        <div className="space-y-3">
          <h1 className="text-3xl font-heading font-extrabold text-white">{builder.name}</h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{builder.description}</p>
          <div className="flex items-center gap-4 text-xs font-semibold text-amber-300">
            <span>Experience: {builder.experience}</span>
            <span>•</span>
            <span>Completed: {builder.completedProjects}+ Projects</span>
            <span>•</span>
            <span>Ongoing: {builder.ongoingProjects} Projects</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Ongoing & Upcoming Projects by {builder.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NEW_PROJECTS.map((proj) => (
            <div key={proj.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <img src={proj.image} alt={proj.name} className="w-full h-48 object-cover rounded-2xl" />
              <h3 className="text-xl font-bold text-white">{proj.name}</h3>
              <p className="text-xs text-amber-300">{proj.location} • {proj.startingPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
