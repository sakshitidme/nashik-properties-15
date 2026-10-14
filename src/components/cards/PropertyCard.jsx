import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, CheckCircle2, Bed, Bath, Maximize2, MapPin, Scale, ArrowUpRight, Calendar, RotateCw, Info } from 'lucide-react';

export const PropertyCard = ({ property }) => {
  const { toggleFavorite, isFavorite, toggleCompare, isCompared, openScheduleModal } = useApp();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const flipTimerRef = useRef(null);

  const isFav = isFavorite(property.id);
  const isComp = isCompared(property.id);

  // Auto flip back to original image after 2 seconds
  useEffect(() => {
    if (isFlipped) {
      flipTimerRef.current = setTimeout(() => {
        setIsFlipped(false);
      }, 2000);
    } else {
      if (flipTimerRef.current) {
        clearTimeout(flipTimerRef.current);
      }
    }

    return () => {
      if (flipTimerRef.current) {
        clearTimeout(flipTimerRef.current);
      }
    };
  }, [isFlipped]);

  // 3D Tilt Effect on Hover
  const handleMouseMove = (e) => {
    if (isFlipped) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleFlipToggle = (e) => {
    if (e) e.stopPropagation();
    if (flipTimerRef.current) {
      clearTimeout(flipTimerRef.current);
    }
    setRotate({ x: 0, y: 0 });
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isFlipped
          ? 'none'
          : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className="glass-card rounded-2xl sm:rounded-3xl group border border-white/10 hover:border-amber-500/40 relative flex flex-col justify-between"
    >
      {/* FLIPPABLE IMAGE / BACK DESCRIPTION CONTAINER */}
      <div 
        onClick={handleFlipToggle}
        className="relative h-44 sm:h-56 w-full cursor-pointer select-none"
        style={{ perspective: '1000px' }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className="relative w-full h-full"
        >
          {/* FRONT SIDE (IMAGE & BADGES) */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              position: 'absolute',
              inset: 0
            }}
            className="w-full h-full rounded-t-2xl sm:rounded-t-3xl overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

            {/* TOP BADGES */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
              <div className="flex items-center gap-1">
                {property.verified && (
                  <span className="glass-panel px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400/20" />
                    <span className="hidden sm:inline">Verified</span>
                  </span>
                )}
                <span className="glass-panel px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-slate-200 uppercase tracking-wider">
                  {property.type}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* FLIP BUTTON BADGE */}
                <button
                  onClick={handleFlipToggle}
                  className="p-1.5 sm:p-2 rounded-full backdrop-blur-md bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-black transition-all cursor-pointer flex items-center gap-1 text-[9px] font-bold"
                  title="Tap to Flip Image"
                >
                  <RotateCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
                  <span className="text-[8px] sm:text-[9px]">Tap to Flip</span>
                </button>

                {/* COMPARE BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCompare(property);
                  }}
                  className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isComp
                      ? 'bg-amber-500 text-black border border-amber-400'
                      : 'bg-black/60 text-slate-300 border border-white/10 hover:text-amber-400'
                  }`}
                  title={isComp ? 'In Compare' : 'Add to Compare'}
                >
                  <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>

                {/* FAVORITE BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(property);
                  }}
                  className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isFav
                      ? 'bg-amber-500 text-black border border-amber-400'
                      : 'bg-black/60 text-slate-300 border border-white/10 hover:text-amber-400'
                  }`}
                  title={isFav ? 'In Favorites' : 'Add to Favorites'}
                >
                  <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isFav ? 'fill-black' : ''}`} />
                </button>
              </div>
            </div>

            {/* BOTTOM OVERLAY PRICE */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-end justify-between pointer-events-none">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                  {property.category === 'rent' ? 'For Rent' : property.category === 'commercial' ? 'Commercial' : 'For Sale'}
                </span>
                <div className="text-sm sm:text-xl font-extrabold text-white font-mono tracking-tight">
                  {property.price}
                </div>
              </div>
              {property.pricePerSqft && (
                <span className="text-[9px] sm:text-[10px] text-slate-300 font-mono bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                  {property.pricePerSqft}
                </span>
              )}
            </div>
          </div>

          {/* BACK SIDE (DESCRIPTION & HIGHLIGHTS ON FLIP) */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              inset: 0
            }}
            className="w-full h-full glass-panel-gold p-3 sm:p-4 border border-amber-500/40 rounded-t-2xl sm:rounded-t-3xl flex flex-col justify-between text-slate-100 bg-slate-950/95 overflow-y-auto"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Property Details
                </span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
                  Tap to Flip 🔄
                </span>
              </div>

              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed line-clamp-4">
                {property.description || `Exclusive ${property.type} located in prime ${property.location}, Nashik. Features modern architectural design, MahaRERA verified documentation, Italian marble finishes, and 24/7 power backup.`}
              </p>

              <div className="space-y-1 text-[9px] sm:text-[10px] text-slate-400 pt-1">
                <div className="flex justify-between border-b border-white/5 py-0.5">
                  <span>Possession:</span>
                  <span className="text-amber-400 font-semibold">Ready / Dec 2026</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-0.5">
                  <span>MahaRERA:</span>
                  <span className="text-slate-200 font-mono">P51600024819</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>View Type:</span>
                  <span className="text-slate-200 font-semibold">Skyline / Garden</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleFlipToggle}
              className="w-full py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all cursor-pointer mt-1"
            >
              Flip Back to Image 🔄
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="p-3 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-slate-400 text-[10px] sm:text-xs font-semibold">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{property.location}, Nashik</span>
          </div>

          <Link to={`/property/${property.slug}`}>
            <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
        </div>

        {/* SPECS GRID */}
        <div className="grid grid-cols-3 gap-1 py-2 border-y border-white/10 text-[10px] sm:text-xs text-slate-300">
          {property.bhk > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold">{property.bhk} BHK</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span>{property.bathrooms} B</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="pt-0.5 flex items-center gap-1.5">
          <button
            onClick={() => openScheduleModal(property)}
            className="flex-1 py-1.5 sm:py-2 px-2 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-amber-500/40 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>Visit</span>
          </button>

          <Link
            to={`/property/${property.slug}`}
            className="flex-1 py-1.5 sm:py-2 px-2 rounded-xl gold-gradient-bg text-black font-extrabold text-[10px] sm:text-xs transition-all flex items-center justify-center gap-0.5 shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <span>View</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
