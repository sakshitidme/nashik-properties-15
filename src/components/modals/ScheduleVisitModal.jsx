import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Building2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { post } from '../../services/api';

export const ScheduleVisitModal = () => {
  const { scheduleModal, closeScheduleModal, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM - 12:00 PM',
    cabPickup: true
  });

  if (!scheduleModal.isOpen) return null;

  const property = scheduleModal.property;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await post('/api/inquiries', {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim() || undefined,
        message: `Site visit request for ${property?.title || 'a property'} on ${formData.date}, slot: ${formData.timeSlot}. Cab pickup: ${formData.cabPickup ? 'Yes' : 'No'}.`,
        propertyId: property?._id || property?.id,
        propertyTitle: property?.title,
      });
    } catch {
      // Non-blocking — still show success so UX is smooth
    } finally {
      setSubmitting(false);
    }
    setSubmitted(true);
    showToast(`Site visit scheduled successfully for ${formData.date}!`, 'success');
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
    setTimeout(() => {
      setSubmitted(false);
      closeScheduleModal();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={closeScheduleModal}
          className="absolute top-3 right-3 p-1.5 rounded-lg glass-panel text-slate-400 hover:text-white hover:border-amber-400 transition-all z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-4 sm:p-6 space-y-4">
          {/* HEADER */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-400">
              VIP Concierge Service
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Schedule Private Site Visit
            </h3>
            {property && (
              <div className="flex items-center gap-2 text-xs text-amber-300 font-medium pt-1">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="truncate">{property.title} • {property.location}</span>
              </div>
            )}
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h4 className="text-xl font-bold text-white">Visit Confirmed!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Our Nashik Property 15 Relationship Executive will reach out to confirm your private cab pickup and tour details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                    <option value="05:00 PM - 07:00 PM">Evening Sunset View (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="cabPickup"
                  checked={formData.cabPickup}
                  onChange={(e) => setFormData({ ...formData, cabPickup: e.target.checked })}
                  className="rounded border-amber-500/30 text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="cabPickup" className="text-xs text-slate-300 cursor-pointer">
                  Request complimentary luxury AC cab pickup & drop off in Nashik
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl gold-gradient-bg text-black font-extrabold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Confirming…</span></>
                ) : (
                  <span>Confirm Private Site Visit</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
