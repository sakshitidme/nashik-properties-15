import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, X, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { post } from '../../services/api';

export const CallbackModal = () => {
  const { callbackModalData, closeCallbackModal, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!callbackModalData) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await post('/api/inquiries', {
        name: name.trim(),
        phone: phone.trim(),
        message: `Callback request. Preferred time: ${preferredTime}. Property: ${callbackModalData?.title || 'General inquiry'}.`,
        propertyId: callbackModalData?._id || callbackModalData?.id,
        propertyTitle: callbackModalData?.title,
      });
    } catch {
      // Non-blocking — show success regardless
    } finally {
      setSubmitting(false);
    }
    setSubmitted(true);
    showToast('Callback request registered! Our executive will call you shortly.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-panel-gold w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:p-6 border border-amber-500/40 relative shadow-2xl space-y-4">
        <button
          onClick={closeCallbackModal}
          className="absolute top-4 right-4 p-2 rounded-full glass-panel text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Instant Advisory Call</span>
          </div>
          <h3 className="text-xl font-bold text-white">Request Immediate Callback</h3>
          <p className="text-xs text-slate-300">
            Regarding: <span className="text-amber-300 font-semibold">{callbackModalData.title || 'Nashik Property Advisory'}</span>
          </p>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Request Confirmed!</h4>
            <p className="text-xs text-slate-300">A Nashik Property 15 advisor will reach out during your selected slot.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                closeCallbackModal();
              }}
              className="py-2.5 px-6 gold-gradient-bg text-black font-extrabold text-xs rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98220 00000"
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Preferred Slot</label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Submitting…</span></>
              ) : (
                <span>Submit Callback Request</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
