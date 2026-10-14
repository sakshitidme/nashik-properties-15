import React from 'react';
import { useApp } from '../context/AppContext';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/cards/PropertyCard';
import { User, Heart, Calendar, FileText, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserDashboardPage = () => {
  const { user, setUser, favorites, scheduledVisits, showToast } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* DASHBOARD HEADER */}
      <div className="glass-panel-gold rounded-3xl p-8 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xl">
            {user ? user.name.charAt(0) : 'U'}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-400">
              {user ? user.role : 'Buyer'} Portal
            </span>
            <h1 className="text-2xl font-bold text-white">{user ? user.name : 'Welcome, Home Buyer'}</h1>
            <p className="text-xs text-slate-400">{user ? user.email : 'user@nashikproperty.com'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="py-2.5 px-5 glass-panel text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Heart className="w-4 h-4" />
            <span>Shortlisted Listings</span>
          </div>
          <span className="text-3xl font-extrabold text-white font-mono">{favorites.length}</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Calendar className="w-4 h-4" />
            <span>Scheduled Site Visits</span>
          </div>
          <span className="text-3xl font-extrabold text-white font-mono">{scheduledVisits.length || 1}</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Active Enquiries</span>
          </div>
          <span className="text-3xl font-extrabold text-white font-mono">2</span>
        </div>
      </div>

      {/* RECENT FAVORITES */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Your Saved Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(favorites.length > 0 ? favorites : PROPERTIES.slice(0, 3)).map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </div>
  );
};
