import React, { useState } from 'react';
import { X, Gift, Check, Send, Home, Landmark, Building2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SpecialOffersModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('flat');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', propertyType: 'Flats & Apartments' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Special offer voucher sent via WhatsApp!', 'success');
  };

  const offers = {
    flat: {
      title: 'Apartment & Flat Direct Booking Offer',
      badge: 'STAMP DUTY WAIVER + KITCHEN PACKAGE',
      items: [
        'Waiver on Stamp Duty & Registration charges',
        'Modular Kitchen by Sleek / Hafele included',
        'Direct Developer Price Guarantee',
        'Zero Processing Fee on Loan Facilitation'
      ]
    },
    house: {
      title: 'Bungalow & Independent Villa Package',
      badge: 'SOLAR SYSTEM + ARCHITECTURAL CONSULT',
      items: [
        '5kW Solar Rooftop Power Installation',
        'Interior Architectural Design Consultation',
        'Private Garden & Landscape Package',
        'Smart Security System Pre-installation'
      ]
    },
    land: {
      title: 'Collector Sanctioned NA Plots Offer',
      badge: 'FREE DEMARCATION + LEGAL CLEARANCE',
      items: [
        'Discount on Gated NA Township Plots',
        'Land Demarcation & Boundary Surveying included',
        '30-Year Title Search Legal Clearance Document',
        'Flexible Payment Terms'
      ]
    },
    commercial: {
      title: 'Prime Commercial & Office Units Offer',
      badge: 'RENTAL GUARANTEE PACKAGE',
      items: [
        'Assured Rental Yield Structure',
        'Zero Management Fee for 24 Months',
        'High Footfall Highway Frontage Options'
      ]
    }
  };

  const currentOffer = offers[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300 font-sans">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-panel-gold border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 text-slate-100">
        
        {/* HEADER */}
        <div className="bg-slate-900/90 border-b border-amber-500/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Gift className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-amber-400 block">
                SPECIAL INCENTIVES & OFFERS
              </span>
              <h3 className="font-heading text-base font-extrabold text-white">
                Exclusive Direct Developer Deals
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg glass-panel text-slate-300 hover:text-white hover:border-amber-500/40 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CATEGORY SELECTOR TABS */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-slate-900/50 border-b border-amber-500/15 text-center">
          <button
            onClick={() => setActiveTab('flat')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
              activeTab === 'flat'
                ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-amber-400 hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Apartments</span>
          </button>

          <button
            onClick={() => setActiveTab('house')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
              activeTab === 'house'
                ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-amber-400 hover:bg-white/5'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Villas</span>
          </button>

          <button
            onClick={() => setActiveTab('land')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
              activeTab === 'land'
                ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-amber-400 hover:bg-white/5'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>NA Plots</span>
          </button>

          <button
            onClick={() => setActiveTab('commercial')}
            className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
              activeTab === 'commercial'
                ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-amber-400 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commercial</span>
          </button>
        </div>

        {/* OFFER DETAILS BOX */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="space-y-2.5 glass-panel p-3.5 rounded-xl border-amber-500/20">
            <div className="flex items-center justify-between flex-wrap gap-1.5">
              <h4 className="font-heading text-sm font-bold text-white">
                {currentOffer.title}
              </h4>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">
                {currentOffer.badge}
              </span>
            </div>

            <ul className="space-y-2 pt-1 text-xs text-slate-300">
              {currentOffer.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CLAIM OFFER FORM */}
          {submitted ? (
            <div className="glass-panel p-4 rounded-xl text-center space-y-2 border-amber-500/20">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-heading text-base font-bold text-white">Voucher Claimed Successfully!</h4>
              <p className="text-xs text-slate-300">
                Our real estate team will send your voucher via WhatsApp shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-1 px-5 py-2 rounded-xl gold-gradient-bg text-black font-extrabold text-xs cursor-pointer hover:opacity-95"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Claim Special Offer Voucher
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-900/80 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-slate-900/80 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Claim Offer Voucher</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

