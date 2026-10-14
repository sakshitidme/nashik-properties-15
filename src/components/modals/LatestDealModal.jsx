import React from 'react';
import { X, Check, PhoneCall, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../../data/mockData';

export const LatestDealModal = ({ isOpen, onClose, onOpenOffers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300 font-sans">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto glass-panel-gold border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 text-slate-100">
        
        {/* TOP BADGE BANNER */}
        <div className="bg-slate-900/90 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-amber-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            FEATURED LUXURY LISTING
          </span>
          <span className="text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 text-[9px]">
            EXCLUSIVE
          </span>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-lg glass-panel text-slate-300 hover:text-white hover:border-amber-500/40 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* IMAGE COVER */}
        <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            alt="The Grand Vista Sky Residences"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 space-y-0.5">
            <span className="text-amber-400 font-semibold text-[10px] uppercase tracking-widest block">
              Gangapur Road, Nashik
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white">
              The Grand Vista Sky Residences
            </h3>
          </div>
        </div>

        {/* CONTENT DETAILS */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center glass-panel p-2.5 rounded-xl border-amber-500/20">
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-semibold">Offer Price</span>
              <span className="font-heading text-sm sm:text-base font-bold gold-gradient-text">₹ 1.33 Cr</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-semibold">Config</span>
              <span className="text-xs font-semibold text-slate-200">4 BHK Penthouse</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-semibold">Possession</span>
              <span className="text-xs font-semibold text-amber-400">Ready to Move</span>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>100% MahaRERA Verified</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Direct Developer Rate</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Vineyard & River Views</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Luxury Italian Interiors</span>
            </li>
          </ul>

          {/* ACTION BUTTONS */}
          <div className="space-y-2 pt-1">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Inquire & Book Private Visit</span>
            </a>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenOffers) onOpenOffers();
                }}
                className="text-amber-400 hover:text-amber-300 underline cursor-pointer font-medium"
              >
                View Category Offers →
              </button>
              <button onClick={onClose} className="hover:text-slate-200 cursor-pointer">
                Dismiss
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

