import React from 'react';
import { useParams } from 'react-router-dom';
import { AGENTS, PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/cards/PropertyCard';
import { Star, Phone, MessageSquare, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AgentProfilePage = () => {
  const { id } = useParams();
  const { openCallbackModal } = useApp();
  const agent = AGENTS.find((a) => a.id === id) || AGENTS[0];
  const agentProps = PROPERTIES.filter((p) => p.agentId === agent.id);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border border-amber-500/30 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 text-center">
          <img src={agent.avatar} alt={agent.name} className="w-36 h-36 rounded-full object-cover border-4 border-amber-400 mx-auto shadow-2xl" />
        </div>

        <div className="md:col-span-8 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{agent.agency}</span>
            <h1 className="text-3xl font-heading font-extrabold text-white">{agent.name}</h1>
            <p className="text-xs text-amber-200">{agent.role}</p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{agent.bio}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="glass-panel p-3 rounded-xl">
              <span className="text-slate-400 text-[10px] block">Experience</span>
              <span className="font-bold text-white">{agent.experience}</span>
            </div>
            <div className="glass-panel p-3 rounded-xl">
              <span className="text-slate-400 text-[10px] block">Transactions</span>
              <span className="font-bold text-amber-300 font-mono">{agent.salesCount}</span>
            </div>
            <div className="glass-panel p-3 rounded-xl">
              <span className="text-slate-400 text-[10px] block">Rating</span>
              <span className="font-bold text-amber-400 font-mono">★ {agent.rating} ({agent.reviewsCount})</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => openCallbackModal({ title: `Call request for ${agent.name}` })}
              className="py-3 px-6 gold-gradient-bg text-black font-extrabold text-xs rounded-xl flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contact {agent.name}</span>
            </button>
            <a
              href={`https://wa.me/${agent.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Agent</span>
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Active Properties Managed by {agent.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agentProps.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </div>
  );
};
