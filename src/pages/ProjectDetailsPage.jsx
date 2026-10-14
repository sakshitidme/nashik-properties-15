import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NEW_PROJECTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Building2, MapPin, Calendar, CheckCircle2, Phone, MessageSquare, Download, Layers, ShieldCheck, Play, Box } from 'lucide-react';

export const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { openScheduleModal, openCallbackModal } = useApp();
  const project = NEW_PROJECTS.find((p) => p.id === id) || NEW_PROJECTS[0];
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'floorplans' | '3d-tour' | 'masterplan'

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* HERO HERO BANNER */}
      <div className="relative h-[400px] sm:h-[480px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-extrabold uppercase">
              {project.status}
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
              {project.name}
            </h1>
            <div className="flex items-center gap-2 text-amber-300 text-sm font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{project.location} • By {project.builder}</span>
            </div>
          </div>

          <div className="glass-panel-gold p-4 rounded-2xl border border-amber-500/40 text-right space-y-1">
            <span className="text-[10px] uppercase text-slate-300 font-bold block">Starting Price</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{project.startingPrice}</span>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
        {[
          { id: 'overview', label: 'Project Overview' },
          { id: 'floorplans', label: 'Configurations & Floor Plans' },
          { id: '3d-tour', label: '360° Virtual Tour' },
          { id: 'masterplan', label: 'Master Plan & Amenities' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAIN TAB CONTENT */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'overview' && (
            <div className="glass-panel rounded-3xl p-8 space-y-6 border border-white/10">
              <h3 className="text-xl font-bold text-white">About {project.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.name} is a groundbreaking luxury residential development situated in the prime heart of {project.location}. Featuring architectural double-height lobby entry, sky bridges, energy efficient green building designs, and high-speed OTIS elevators.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="glass-panel p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block">Configurations</span>
                  <span className="text-sm font-bold text-amber-300">{project.configurations}</span>
                </div>
                <div className="glass-panel p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block">Target Possession</span>
                  <span className="text-sm font-bold text-white">{project.possession}</span>
                </div>
                <div className="glass-panel p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block">Total Units</span>
                  <span className="text-sm font-bold text-white">{project.totalUnits} Units</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-bold text-white">Project Key Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 glass-panel p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'floorplans' && (
            <div className="glass-panel rounded-3xl p-8 space-y-6 border border-white/10">
              <h3 className="text-xl font-bold text-white">Configurations & Floor Plans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['3 BHK Sky Apartment (1,850 sq.ft)', '4 BHK Luxury Duplex (2,600 sq.ft)'].map((plan, i) => (
                  <div key={i} className="glass-panel-gold p-6 rounded-2xl border border-amber-500/30 space-y-4">
                    <img src={project.image} alt="Floor plan" className="w-full h-40 object-cover rounded-xl" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">{plan}</h4>
                      <span className="text-xs text-amber-300 font-mono">Starting from ₹ 88 Lakh</span>
                    </div>
                    <button className="w-full py-2.5 glass-panel text-xs text-amber-300 font-bold rounded-xl flex items-center justify-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Floorplan PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === '3d-tour' && (
            <div className="glass-panel rounded-3xl p-8 space-y-6 border border-white/10 text-center">
              <h3 className="text-xl font-bold text-white">Interactive 360° Virtual Walkthrough</h3>
              <div className="h-80 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                <Box className="w-12 h-12 text-amber-400 animate-bounce" />
                <span className="text-xs text-slate-300">3D Matterport VR Model Loading...</span>
                <button className="py-2.5 px-6 gold-gradient-bg text-black font-bold text-xs rounded-xl flex items-center gap-2">
                  <Play className="w-4 h-4 fill-black" />
                  <span>Launch Virtual Tour</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'masterplan' && (
            <div className="glass-panel rounded-3xl p-8 space-y-6 border border-white/10">
              <h3 className="text-xl font-bold text-white">Master Plan & World-Class Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Sky Infinity Pool', 'Clubhouse & Lounge', 'Private Cinema', 'EV Charging Bays', 'Sports Turf', 'Spa & Sauna', '24/7 Security', 'Kids Play Zone'].map((amenity, i) => (
                  <div key={i} className="glass-panel p-4 rounded-xl text-center space-y-1">
                    <Layers className="w-5 h-5 text-amber-400 mx-auto" />
                    <span className="text-xs font-bold text-white block">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* STICKY SIDEBAR ENQUIRY */}
        <div className="lg:col-span-4 glass-panel-gold rounded-3xl p-6 border border-amber-500/30 space-y-6 sticky top-28">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-400">Project Sales Desk</span>
            <h4 className="text-lg font-bold text-white">Book Site Visit & Sample Flat</h4>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => openScheduleModal({ title: project.name, location: project.location })}
              className="w-full py-3.5 px-4 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Schedule Private Visit
            </button>

            <button
              onClick={() => openCallbackModal({ title: project.name })}
              className="w-full py-3.5 px-4 rounded-xl glass-panel text-white font-bold text-xs hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Request Instant Callback</span>
            </button>

            <a
              href="https://wa.me/919822015150"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600/90 text-white font-bold text-xs hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Official Sales</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
