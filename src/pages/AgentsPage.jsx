import React from 'react';
import { Link } from 'react-router-dom';
import { AGENTS } from '../data/mockData';
import { Star, Phone, MessageSquare, MapPin, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AgentsPage = () => {
  const { openCallbackModal } = useApp();

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Verified Real Estate Specialists
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Meet Our <span className="gold-gradient-text">Top Property Agents</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Experienced RERA-registered advisors specializing in luxury villas, residential apartments, and commercial investments across Nashik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col justify-between space-y-6 group hover:border-amber-400 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {agent.name}
                  </h3>
                  <span className="text-xs text-amber-300 block font-medium">{agent.role}</span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 pt-1 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{agent.rating} ({agent.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {agent.bio}
              </p>

              <div className="space-y-2 py-3 border-y border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-bold text-white">{agent.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Listings:</span>
                  <span className="font-bold text-amber-300 font-mono">{agent.propertiesListed} Units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Specialization Areas:</span>
                  <span className="font-semibold text-slate-200">{agent.areas.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => openCallbackModal({ title: `Consultation with ${agent.name}` })}
                className="flex-1 py-3 px-4 rounded-xl glass-panel text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact Agent</span>
              </button>

              <Link
                to={`/agent/${agent.id}`}
                className="flex-1 py-3 px-4 rounded-xl gold-gradient-bg text-black font-extrabold text-xs text-center cursor-pointer"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
