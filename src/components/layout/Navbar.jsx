import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, PlusCircle, User, Menu, X, Building, Search, Scale } from 'lucide-react';

export const Navbar = () => {
  const { favorites, compareList } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy', path: '/buy' },
    { name: 'Rent', path: '/rent' },
    { name: 'Commercial', path: '/commercial' },
    { name: 'Projects', path: '/projects' },
    { name: 'Locations', path: '/locations' },
    { name: 'Agents', path: '/agents' },
    { name: 'Sell Property', path: '/sell' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/15 py-3 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-slate-950/80 to-transparent py-5 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-all bg-slate-950 border border-amber-500/40 p-0.5">
            <img src="/favicon.svg" alt="Nashik Property Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              NASHIK <span className="gold-gradient-text">PROPERTY</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold -mt-1">
              Luxury Real Estate
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-slate-900/40 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Comparison Icon Button */}
          {compareList.length > 0 && (
            <Link
              to="/compare"
              className="relative p-2.5 rounded-xl glass-panel text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-all cursor-pointer"
              title="Compare Properties"
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-400 text-black rounded-full text-[10px] font-bold flex items-center justify-center">
                {compareList.length}
              </span>
            </Link>
          )}

          {/* Favorites Button */}
          <Link
            to="/favorites"
            className="relative p-2.5 rounded-xl glass-panel text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-all cursor-pointer"
            title="Favorites"
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-400 text-black rounded-full text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Login Link */}
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white glass-panel hover:border-white/20 transition-all flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Login</span>
          </Link>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('/sell')}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs tracking-wide hover:opacity-95 hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>List Property</span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link to="/favorites" className="p-2 glass-panel text-amber-400 rounded-lg relative">
            <Heart className="w-5 h-5 fill-amber-400/20" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl glass-panel text-slate-200 hover:text-amber-400 transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel-gold border-t border-amber-500/20 px-6 py-6 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-slate-200 glass-panel hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl glass-panel text-center text-xs font-bold text-white flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>Login / Account</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/sell');
              }}
              className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Property</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
