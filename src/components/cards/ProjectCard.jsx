import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, RotateCw, Info } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef(null);

  // Auto flip back after 2 seconds
  useEffect(() => {
    if (isFlipped) {
      timerRef.current = setTimeout(() => {
        setIsFlipped(false);
      }, 2000);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isFlipped]);

  const handleFlipToggle = (e) => {
    if (e) e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="glass-panel-gold rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/25 flex flex-col justify-between group hover:border-amber-400 transition-all">
      {/* 3D FLIPPABLE IMAGE CONTAINER */}
      <div
        onClick={handleFlipToggle}
        className="relative h-40 sm:h-52 w-full cursor-pointer select-none"
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
          {/* FRONT IMAGE */}
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
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

            {/* STATUS BADGE */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
              <span className="bg-amber-500 text-black text-[8px] sm:text-[10px] font-extrabold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase shadow-md">
                {project.status}
              </span>
              <button
                onClick={handleFlipToggle}
                className="p-1 sm:p-1.5 rounded-full backdrop-blur-md bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-black transition-all cursor-pointer flex items-center gap-1 text-[8px] sm:text-[9px] font-bold"
                title="Tap to Flip Image"
              >
                <RotateCw className={`w-3 h-3 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
                <span className="hidden sm:inline">Flip</span>
              </button>
            </div>
          </div>

          {/* BACK SIDE DESCRIPTION */}
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
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Project Overview
                </span>
                <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-500/30 font-bold">
                  Auto 2s 🔄
                </span>
              </div>

              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed line-clamp-4">
                {project.description || `${project.name} by ${project.builder} offers luxury configurations in ${project.location}, Nashik. RERA registered with state-of-the-art amenities.`}
              </p>

              <div className="space-y-1 text-[9px] sm:text-[10px] text-slate-400 pt-1">
                <div className="flex justify-between border-b border-white/5 py-0.5">
                  <span>Builder:</span>
                  <span className="text-amber-400 font-semibold">{project.builder}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-0.5">
                  <span>Possession:</span>
                  <span className="text-slate-200 font-mono">{project.possession}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleFlipToggle}
              className="w-full py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all cursor-pointer mt-1"
            >
              Flip Back 🔄
            </button>
          </div>
        </div>
      </div>

      {/* PROJECT DETAILS & BUTTON */}
      <div className="p-3 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <span className="text-[9px] sm:text-[11px] text-amber-400 font-semibold block">{project.builder}</span>
          <h3 className="text-xs sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 text-slate-400 text-[10px] sm:text-xs font-medium pt-0.5">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 text-[9px] sm:text-xs py-1.5 border-y border-white/10">
          <div>
            <span className="text-[8px] sm:text-[10px] text-slate-400 block">Starting Price</span>
            <span className="font-bold text-amber-300 font-mono">{project.startingPrice}</span>
          </div>
          <div>
            <span className="text-[8px] sm:text-[10px] text-slate-400 block">Possession</span>
            <span className="font-bold text-white truncate block">{project.possession}</span>
          </div>
        </div>

        <Link
          to="/projects"
          className="w-full py-2 px-3 rounded-xl gold-gradient-bg text-black font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-500/10 cursor-pointer"
        >
          <span>View Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
