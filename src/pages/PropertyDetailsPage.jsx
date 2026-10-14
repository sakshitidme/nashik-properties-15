import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AGENTS } from '../data/mockData';
import { get } from '../services/api';
import { useApp } from '../context/AppContext';
import { Heart, Scale, Share2, MapPin, CheckCircle2, Bed, Bath, Maximize2, Car, Calendar, ShieldCheck, Phone, MessageSquare, Calculator, Video, Compass, ChevronRight, Play, Box } from 'lucide-react';

export const PropertyDetailsPage = () => {
  const { slug } = useParams();
  const { toggleFavorite, isFavorite, toggleCompare, isCompared, openScheduleModal, openCallbackModal, addToRecentlyViewed, showToast } = useApp();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [activeImage, setActiveImage] = useState(null);
  const [activeMediaTab, setActiveMediaTab] = useState('photos');

  // EMI Calculator Local State
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  useEffect(() => {
    setLoading(true);
    setApiError(null);
    get(`/api/properties/${slug}`)
      .then((data) => {
        setProperty(data);
        setActiveImage(data.image);
        setLoanAmount(data.priceNumeric * 0.8);
        addToRecentlyViewed(data);
        setLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setLoading(false);
      });
  }, [slug]);

  // EMI Calculation
  const calculateEMI = () => {
    if (!loanAmount) return 0;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emiValue = calculateEMI();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'info');
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
          <p className="text-slate-300 text-sm font-medium">Loading property details…</p>
        </div>
      </div>
    );
  }

  // ── Error / not-found state ────────────────────────────────────────────────
  if (apiError || !property) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-white/10 max-w-md">
          <h3 className="text-xl font-bold text-white">Property Not Found</h3>
          <p className="text-xs text-slate-400">
            {apiError || 'This property listing is no longer available or the link may be incorrect.'}
          </p>
          <Link to="/buy" className="inline-block py-2.5 px-6 gold-gradient-bg text-black font-bold text-xs rounded-xl">
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  // ── Helper derived values ──────────────────────────────────────────────────
  const agent = AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];
  const isFav = isFavorite(property._id || property.id);
  const isComp = isCompared(property._id || property.id);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <Link to="/buy" className="hover:text-amber-400">Properties</Link>
        <span>/</span>
        <span className="text-white font-semibold truncate">{property.title}</span>
      </div>

      {/* HEADER TITLE & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {property.verified && (
              <span className="glass-panel px-3 py-1 rounded-full text-xs font-extrabold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>MahaRERA Verified Property</span>
              </span>
            )}
            <span className="glass-panel px-3 py-1 rounded-full text-xs font-bold text-slate-200 uppercase">
              {property.type}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{property.address}</span>
          </div>
        </div>

        {/* PRICE & ACTIONS */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            Offered Price
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono gold-gradient-text">
            {property.price}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(property)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isComp ? 'bg-amber-500 text-black border-amber-400' : 'glass-panel text-slate-300 hover:border-amber-400'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{isComp ? 'Compared' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(property)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isFav ? 'bg-amber-500 text-black border-amber-400' : 'glass-panel text-slate-300 hover:border-amber-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-black' : ''}`} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-amber-400 text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY & MEDIA SECTION */}
      <div className="space-y-4">
        {/* Media Switcher Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMediaTab('photos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMediaTab === 'photos' ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
            }`}
          >
            Photo Gallery ({property.gallery ? property.gallery.length : 1})
          </button>
          <button
            onClick={() => setActiveMediaTab('video')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMediaTab === 'video' ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>HD Video Tour</span>
          </button>
          <button
            onClick={() => setActiveMediaTab('360')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMediaTab === '360' ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>360° VR Tour</span>
          </button>
        </div>

        {activeMediaTab === 'photos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 h-[400px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30">
              <img src={activeImage} alt={property.title} className="w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-3 h-[400px] sm:h-[500px] overflow-y-auto">
              {(property.gallery?.length ? property.gallery : [property.image]).map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`rounded-2xl overflow-hidden h-28 border-2 transition-all cursor-pointer ${
                    activeImage === imgUrl ? 'border-amber-400 scale-95' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {activeMediaTab === 'video' && (
          <div className="h-[450px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30 flex items-center justify-center relative">
            <img src={property.image} alt="Video preview" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-amber-500 text-black flex items-center justify-center mx-auto shadow-2xl animate-pulse cursor-pointer">
                <Play className="w-8 h-8 fill-black ml-1" />
              </div>
              <h4 className="text-xl font-bold text-white">Watch Architectural HD Video Walkthrough</h4>
            </div>
          </div>
        )}

        {activeMediaTab === '360' && (
          <div className="h-[450px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30 flex items-center justify-center relative bg-slate-950">
            <div className="text-center space-y-4">
              <Box className="w-16 h-16 text-amber-400 animate-spin mx-auto" />
              <h4 className="text-xl font-bold text-white">Interactive 360° Virtual Model</h4>
              <p className="text-xs text-slate-400">Use your mouse or touch to rotate 360 degrees inside rooms.</p>
            </div>
          </div>
        )}
      </div>

      {/* QUICK SPECS BANNER */}
      <div className="glass-panel-gold rounded-3xl p-6 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {property.bhk > 0 && (
          <div className="flex items-center gap-3">
            <Bed className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block">Bedrooms</span>
              <span className="text-sm font-bold text-white font-mono">{property.bhk} BHK</span>
            </div>
          </div>
        )}
        {property.bathrooms > 0 && (
          <div className="flex items-center gap-3">
            <Bath className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block">Bathrooms</span>
              <span className="text-sm font-bold text-white">{property.bathrooms} Baths</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Maximize2 className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 block">Carpet Area</span>
            <span className="text-sm font-bold text-white">{property.area} sq.ft</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 block">Parking</span>
            <span className="text-sm font-bold text-white">{property.parking || 1} Covered</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 block">Possession</span>
            <span className="text-sm font-bold text-white">{property.possession}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 block">Furnishing</span>
            <span className="text-sm font-bold text-white truncate">{property.furnishing}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT DETAILED INFO */}
        <div className="lg:col-span-8 space-y-10">
          {/* DESCRIPTION */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white">Property Description</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* AMENITIES */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Amenities & Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(property.amenities?.length
                ? property.amenities
                : ['Swimming Pool', 'Gymnasium', '24/7 Security', 'Clubhouse', 'Power Backup', 'Landscaped Garden']
              ).map((am, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200 glass-panel p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* INTERACTIVE EMI CALCULATOR */}
          <div className="glass-panel-gold p-8 rounded-3xl border border-amber-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>Estimated Home Loan EMI</span>
              </div>
              <span className="text-2xl font-extrabold text-amber-300 font-mono">
                ₹ {emiValue.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ month</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>Loan Amount</span>
                  <span className="text-amber-400 font-mono">₹ {(loanAmount / 100000).toFixed(1)} Lakh</span>
                </div>
                <input
                  type="range"
                  min={property.priceNumeric * 0.2}
                  max={property.priceNumeric * 0.9}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>Interest Rate</span>
                  <span className="text-amber-400 font-mono">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="12"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>Tenure</span>
                  <span className="text-amber-400 font-mono">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* STICKY AGENT & ENQUIRY PANEL */}
        <div className="lg:col-span-4 glass-panel-gold p-6 rounded-3xl border border-amber-500/30 space-y-6 sticky top-28">
          {/* AGENT MINI BIO */}
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <img src={agent.avatar} alt={agent.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-400" />
            <div>
              <h4 className="text-sm font-bold text-white">{agent.name}</h4>
              <span className="text-[11px] text-amber-300 block">{agent.role}</span>
              <span className="text-[10px] text-slate-400 font-mono">Rating: ★ {agent.rating} ({agent.reviewsCount})</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => openScheduleModal(property)}
              className="w-full py-3.5 px-4 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Schedule Private Site Visit
            </button>

            <button
              onClick={() => openCallbackModal(property)}
              className="w-full py-3.5 px-4 rounded-xl glass-panel text-white font-bold text-xs hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Contact Verified Agent</span>
            </button>

            <a
              href={`https://wa.me/${agent.whatsapp || '919822015150'}?text=${encodeURIComponent(`Hi ${agent.name}, I am interested in ${property.title} on Nashik Property 15.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600/90 text-white font-bold text-xs hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 text-center">
            🔒 Zero Spam Guarantee • Free Luxury Cab Pickup Provided
          </div>
        </div>
      </div>
    </div>
  );
};
