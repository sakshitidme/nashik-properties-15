import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroArchitectural3D } from '../components/3d/HeroArchitectural3D';
import { NashikMap3D } from '../components/3d/NashikMap3D';
import { PropertyCard } from '../components/cards/PropertyCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { PROPERTIES, NEW_PROJECTS, NASHIK_LOCATIONS, TESTIMONIALS, BLOG_POSTS } from '../data/mockData';
import { Search, Sparkles, Building2, MapPin, ChevronRight, ShieldCheck, Award, ArrowUpRight, PlusCircle, Quote, Star, CheckCircle, TrendingUp, Users } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  // Search State
  const [searchTab, setSearchTab] = useState('buy'); // 'buy' | 'rent'
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');
  const [searchBhk, setSearchBhk] = useState('');

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchLocation) query.append('location', searchLocation);
    if (searchType) query.append('type', searchType);
    if (searchBudget) query.append('budget', searchBudget);
    if (searchBhk) query.append('bhk', searchBhk);

    navigate(`/${searchTab}?${query.toString()}`);
  };

  const handleAiSearch = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    navigate(`/ai-finder?prompt=${encodeURIComponent(aiPrompt)}`);
  };

  // Property Categories List
  const CATEGORIES = [
    { title: 'Apartments', count: '450+ Properties', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', path: '/buy?type=Apartment' },
    { title: 'Villas', count: '120+ Estates', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', path: '/buy?type=Villa' },
    { title: 'Bungalows', count: '85+ Residences', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', path: '/buy?type=Bungalow' },
    { title: 'Plots & Land', count: '210+ Approved Plots', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', path: '/plots' },
    { title: 'Farmhouses', count: '40+ Vineyard Estates', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', path: '/buy?type=Farmhouse' },
    { title: 'Agricultural Land', count: '60+ Land Parcels', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', path: '/plots?category=agricultural' },
    { title: 'Commercial', count: '150+ Office & Shops', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', path: '/commercial' },
    { title: 'Rental Homes', count: '180+ Active Listings', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', path: '/rent' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-8">
      {/* 1. HERO SECTION */}
      <section className="relative flex items-center pt-28 pb-6 sm:pt-32 sm:pb-8 lg:pt-36 lg:pb-10 overflow-hidden">
        {/* Background Subtle Gradient & Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* LEFT HERO TEXT & FLOATING SEARCH */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-gold border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Nashik’s Premier Real Estate Marketplace</span>
            </div>

            {/* HEADER TEXT WITH INTEGRATED 3D MODEL ON MOBILE */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 lg:col-span-12 space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white font-heading tracking-tight leading-[1.1]">
                  Find a Place <br />
                  <span className="gold-gradient-text">You'll Love</span> to Call Home.
                </h1>
                <p className="text-xs sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                  Discover premium homes, luxury sky residences, investment plots, and commercial opportunities across Gangapur Road, College Road & Nashik.
                </p>
              </div>

              {/* 3D BUILDING MODEL IN HEADER FOR MOBILE */}
              <div className="sm:col-span-5 lg:hidden h-[200px] rounded-2xl glass-panel-gold border border-amber-500/30 overflow-hidden relative">
                <HeroArchitectural3D />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => navigate('/buy')}
                className="py-3 px-6 sm:py-4 sm:px-8 rounded-2xl gold-gradient-bg text-black font-extrabold text-xs sm:text-sm tracking-wide hover:opacity-95 transition-all shadow-xl shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Properties</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/sell')}
                className="py-3 px-6 sm:py-4 sm:px-8 rounded-2xl glass-panel text-white font-bold text-xs sm:text-sm hover:border-amber-400 hover:text-amber-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>List Your Property</span>
              </button>
            </div>

            {/* LARGE FLOATING GLASS SEARCH INTERFACE */}
            <div className="glass-panel-gold rounded-3xl p-4 sm:p-6 border border-amber-500/30 shadow-2xl space-y-4 mt-4">
              {/* Buy / Rent Tabs */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={() => setSearchTab('buy')}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    searchTab === 'buy'
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Buy Properties
                </button>
                <button
                  type="button"
                  onClick={() => setSearchTab('rent')}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    searchTab === 'rent'
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Rent Properties
                </button>
              </div>

              {/* SEARCH FORM INPUTS */}
              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Location */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Location</label>
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">All Nashik Locations</option>
                    {NASHIK_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Property Type</label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">All Types</option>
                    <option value="Apartment">Apartments</option>
                    <option value="Villa">Luxury Villas</option>
                    <option value="Bungalow">Bungalows</option>
                    <option value="Plots">NA Plots & Land</option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Commercial Office">Commercial</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Max Budget</label>
                  <select
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">Any Budget</option>
                    <option value="5000000">Under ₹50 Lakh</option>
                    <option value="10000000">Under ₹1 Crore</option>
                    <option value="20000000">Under ₹2 Crore</option>
                    <option value="50000000">Above ₹2 Crore</option>
                  </select>
                </div>

                {/* BHK */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">BHK Configuration</label>
                  <select
                    value={searchBhk}
                    onChange={(e) => setSearchBhk(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">Any BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK & Penthouses</option>
                    <option value="5">5+ BHK Villa</option>
                  </select>
                </div>

                {/* Submit Search */}
                <div className="sm:col-span-2 lg:col-span-4 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl gold-gradient-bg text-black font-extrabold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Properties Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT 3D HERO CANVAS FOR DESKTOP */}
          <div className="hidden lg:block lg:col-span-5 h-[460px] relative">
            <HeroArchitectural3D />
          </div>

        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Curated Residences
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              Properties <span className="gold-gradient-text">Worth Seeing</span>
            </h2>
          </div>
          <Link
            to="/buy"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
          >
            <span>Browse All 2,500+ Properties</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-COLUMN GRID ON MOBILE RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {PROPERTIES.slice(0, 6).map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 3. PROPERTY CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
            Architectural Varieties
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Explore Property <span className="gold-gradient-text">Categories</span>
          </h2>
          <p className="text-xs text-slate-400">
            From hillside luxury villas on Trimbak Road to prime commercial showrooms on College Road.
          </p>
        </div>

        {/* 2-COLUMN GRID ON MOBILE RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className="group relative h-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-end p-3 sm:p-6 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="relative z-10 space-y-1">
                <span className="text-[10px] text-amber-400 font-mono uppercase font-bold tracking-wider">
                  {cat.count}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. EXPLORE NASHIK 3D MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
            Locality Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Interactive <span className="gold-gradient-text">Nashik Map</span> Explorer
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Hover and interact with Nashik's top 11 prime localities to preview active listings, price growth & starting rates.
          </p>
        </div>

        <NashikMap3D />
      </section>

      {/* 5. NEW PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Premier Launches
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              Newly Launched <span className="gold-gradient-text">Projects</span>
            </h2>
          </div>
          <Link to="/projects" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
            <span>Explore All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-COLUMN GRID ON MOBILE RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6">
          {NEW_PROJECTS.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </section>

      {/* 6. AI PROPERTY FINDER PROMPT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-5 sm:p-6 border border-amber-500/40 relative overflow-hidden text-center space-y-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Conversational Search</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Tell Us What You're Looking For
            </h2>
            <p className="text-xs text-slate-300">
              Type your exact requirements in plain natural language and let our AI instantly filter Nashik properties for you.
            </p>
          </div>

          <form onSubmit={handleAiSearch} className="max-w-3xl mx-auto relative z-10 space-y-3">
            <div className="relative">
              <textarea
                rows={2}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder='e.g., "I am looking for a 3 BHK luxury penthouse in Gangapur Road under ₹1.5 Cr with private terrace garden and pool view..."'
                className="w-full bg-slate-950/90 border border-amber-500/30 rounded-2xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>
            
            <button
              type="submit"
              className="py-3 px-6 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Property</span>
            </button>
          </form>
        </div>
      </section>

      {/* 7. WHY CHOOSE US STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
            Trust & Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Real Estate Decisions, <span className="gold-gradient-text">Made Simpler.</span>
          </h2>
        </div>

        {/* Animated Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { num: '2,500+', label: 'Verified Properties', desc: 'Across 11 Nashik Localities' },
            { num: '1,200+', label: 'Happy Families', desc: 'Successfully Moved In' },
            { num: '25+', label: 'Prime Localities', desc: 'Extensive Micro-market Coverage' },
            { num: '15+', label: 'Years Experience', desc: 'Trusted Nashik Market Advisors' }
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel p-3 sm:p-5 rounded-2xl border border-white/10 text-center space-y-1 hover:border-amber-500/40 transition-all">
              <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold gold-gradient-text font-mono">
                {stat.num}
              </span>
              <h4 className="text-[11px] sm:text-xs font-bold text-white">{stat.label}</h4>
              <p className="text-[9px] sm:text-[10px] text-slate-400">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* 2-COLUMN GRID ON MOBILE RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { title: 'Verified Listings', desc: '15-Point physical & legal verification on every property.' },
            { title: 'Local Expertise', desc: 'Deep knowledge of Nashik Municipal & MahaRERA norms.' },
            { title: 'Transparent Info', desc: 'Zero hidden costs or undisclosed price surges.' },
            { title: 'Property Guidance', desc: 'End-to-end site visit cab pickups & legal paperwork.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-3 sm:p-4 rounded-xl border border-white/5 space-y-1">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <h5 className="text-[11px] sm:text-xs font-bold text-white">{item.title}</h5>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INVESTMENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-amber-500/30 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
            alt="Invest in Nashik"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

          <div className="lg:col-span-8 relative z-10 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              High Yield Appreciation
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Invest in <span className="gold-gradient-text">Nashik's Future</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              With the Samruddhi Expressway corridor and booming wine tourism, Nashik offers 12-16% annual capital appreciation in plot developments and commercial office hubs.
            </p>
          </div>

          <div className="lg:col-span-4 relative z-10 flex lg:justify-end">
            <button
              onClick={() => navigate('/plots')}
              className="py-3 px-6 rounded-xl gold-gradient-bg text-black font-extrabold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              Explore Investment Properties
            </button>
          </div>
        </div>
      </section>

      {/* 9. SELL PROPERTY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Have a Property to Sell or Rent?
            </h2>
            <p className="text-xs text-slate-300 max-w-lg">
              Connect your property directly with over 50,000 genuine buyers and tenants looking across Nashik.
            </p>
          </div>
          <button
            onClick={() => navigate('/sell')}
            className="py-3 px-6 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap cursor-pointer"
          >
            List Your Property Now
          </button>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-1 max-w-md mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
            Client Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            What Our <span className="gold-gradient-text">Buyers Say</span>
          </h2>
        </div>

        {/* 2-COLUMN GRID ON MOBILE RESPONSIVE */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {TESTIMONIALS.map((test) => (
            <div key={test.id} className="glass-panel p-3 sm:p-5 rounded-2xl border border-white/10 space-y-2 relative flex flex-col justify-between">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500/30" />
              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                "{test.review}"
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border border-amber-400 shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="text-[10px] sm:text-xs font-bold text-white truncate">{test.name}</h4>
                  <span className="text-[9px] sm:text-[10px] text-amber-300 block truncate">{test.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. BLOG INSIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Market Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Nashik Real Estate <span className="gold-gradient-text">Insights</span>
            </h2>
          </div>
          <Link to="/blog" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-COLUMN GRID ON MOBILE RESPONSIVE */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="glass-card rounded-2xl overflow-hidden group border border-white/10 hover:border-amber-500/40 cursor-pointer flex flex-col justify-between"
            >
              <div className="h-32 sm:h-44 overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
