import React, { useState } from 'react';
import { NASHIK_LOCATIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, Building2, MapPin, DollarSign, User, FileText, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SellPropertyPage = () => {
  const { showToast } = useApp();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    propertyType: 'Apartment',
    purpose: 'sell', // 'sell' | 'rent'
    location: 'Gangapur Road',
    address: '',
    bhk: '3',
    bathrooms: '3',
    area: '1500',
    furnishing: 'Semi-Furnished',
    possession: 'Ready to Move',
    amenities: ['Swimming Pool', 'Gym', 'Security'],
    price: '7500000',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: ''
  });

  const STEPS = [
    { num: 1, title: 'Property Type' },
    { num: 2, title: 'Location' },
    { num: 3, title: 'Details' },
    { num: 4, title: 'Amenities' },
    { num: 5, title: 'Photos' },
    { num: 6, title: 'Price' },
    { num: 7, title: 'Owner Info' },
    { num: 8, title: 'Review & Submit' }
  ];

  const handleNext = () => {
    if (step < 8) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your property listing has been submitted successfully!', 'success');

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* HEADER */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          List Your Property Free
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Connect with <span className="gold-gradient-text">Genuine Buyers</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Post your apartment, villa, plot, or commercial space across Nashik in 8 simple steps.
        </p>
      </div>

      {submitted ? (
        <div className="glass-panel-gold rounded-3xl p-12 text-center space-y-6 border border-amber-500/40 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Submission Complete!</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your property has been submitted for MahaRERA verification. A Nashik Property 15 listing executive will contact you within 24 hours to schedule free photoshoot.
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="py-3.5 px-8 gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Post Another Property
          </button>
        </div>
      ) : (
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 space-y-8">
          {/* STEP PROGRESS BAR */}
          <div className="grid grid-cols-8 gap-1.5 border-b border-white/10 pb-6">
            {STEPS.map((s) => (
              <div key={s.num} className="space-y-1.5 text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto transition-all ${
                    step === s.num
                      ? 'bg-amber-500 text-black ring-4 ring-amber-500/20'
                      : step > s.num
                      ? 'bg-amber-400/20 text-amber-400 border border-amber-400'
                      : 'glass-panel text-slate-500'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-[9px] text-slate-400 hidden sm:block truncate">{s.title}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: PROPERTY TYPE */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 1: Choose Property Type & Purpose</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Purpose</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['sell', 'rent'].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setFormData({ ...formData, purpose: p })}
                        className={`py-3.5 rounded-2xl font-extrabold text-xs capitalize transition-all cursor-pointer ${
                          formData.purpose === p ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
                        }`}
                      >
                        For {p === 'sell' ? 'Sale' : 'Rent'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Property Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Apartment', 'Villa', 'Bungalow', 'NA Plot', 'Farmhouse', 'Commercial Office', 'Shop'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, propertyType: t })}
                        className={`py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          formData.propertyType === t ? 'bg-amber-500 text-black' : 'glass-panel text-slate-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 2: Property Location in Nashik</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Prime Locality</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {NASHIK_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Detailed Address / Building Name</label>
                  <textarea
                    rows={3}
                    placeholder="Enter building name, street address, landmarks..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 3: Property Configurations</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">BHK</label>
                    <select
                      value={formData.bhk}
                      onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                    >
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Bathrooms</label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Area (sq.ft)</label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: AMENITIES */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 4: Select Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Swimming Pool', 'Gym', 'Clubhouse', '24/7 Security', 'Power Backup', 'EV Charging', 'Rooftop Garden', 'Lift'].map((am) => (
                    <label key={am} className="glass-panel p-3 rounded-xl flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-amber-500" />
                      <span>{am}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: PHOTOS */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 5: Upload Photos & Videos</h3>
                <div className="border-2 border-dashed border-amber-500/30 rounded-3xl p-8 text-center space-y-3 glass-panel">
                  <Upload className="w-10 h-10 text-amber-400 mx-auto" />
                  <p className="text-xs text-slate-300 font-semibold">Drag & drop property photos or click to browse</p>
                  <span className="text-[10px] text-slate-500 block">PNG, JPG up to 10MB each (Free professional photoshoot included)</span>
                </div>
              </div>
            )}

            {/* STEP 6: PRICE */}
            {step === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 6: Expected Price</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Total Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm font-mono text-amber-300 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            {/* STEP 7: OWNER DETAILS */}
            {step === 7 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 7: Owner Contact Information</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Number"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 8: REVIEW */}
            {step === 8 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Step 8: Review Your Listing Details</h3>
                <div className="glass-panel p-5 rounded-2xl space-y-2 text-xs text-slate-300 border border-white/10">
                  <div><span className="text-slate-400">Type:</span> {formData.propertyType} ({formData.purpose})</div>
                  <div><span className="text-slate-400">Location:</span> {formData.location}</div>
                  <div><span className="text-slate-400">Config:</span> {formData.bhk} BHK • {formData.area} sq.ft</div>
                  <div><span className="text-slate-400">Asking Price:</span> ₹ {parseInt(formData.price || 0).toLocaleString()}</div>
                </div>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="py-3 px-6 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {step < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-3 px-8 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-3.5 px-8 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Submit Property for Verification
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
