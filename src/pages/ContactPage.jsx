import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, CheckCircle2, Send, AlertCircle, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { post } from '../services/api';

export const ContactPage = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard: prevent duplicate submission
    if (submitting || submitted) return;

    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // POST /api/inquiries — Inquiry model: name, phone, email, message (+ optional propertyId/propertyTitle)
      await post('/api/inquiries', {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        message: formData.message.trim(),
      });
      setSubmitted(true);
      showToast('Your message has been sent to our Gangapur Road office!', 'success');
    } catch (err) {
      setSubmitError(err.message || 'Failed to send your message. Please try again.');
      showToast('Message could not be sent. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Get In Touch With Our Team
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Contact <span className="gold-gradient-text">Nashik Property 15</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Visit our flagship real-estate experience center on Gangapur Road or connect with an advisor instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* OFFICE DETAILS */}
        <div className="lg:col-span-5 glass-panel-gold rounded-3xl p-8 border border-amber-500/30 space-y-8">
          <h3 className="text-xl font-bold text-white">Experience Center</h3>

          <div className="space-y-6 text-xs text-slate-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Headquarters Address</span>
                <p className="leading-relaxed text-slate-300">
                  Woodland Tower 'A' Wing, Old Gangapur Naka, Gangapur Road, Nashik, Maharashtra 422005
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Advisory Hotline</span>
                <p className="font-mono text-amber-300">+91 98220 15150 / +91 94222 55888</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Official Email</span>
                <p className="text-slate-300">info@nashikproperty15.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Working Hours</span>
                <p className="text-slate-300">Monday - Sunday: 9:30 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919822015150"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600/90 text-white font-bold text-xs hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Instant Chat on WhatsApp</span>
          </a>
        </div>

        {/* CONTACT FORM */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 space-y-6">
          <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>

          {submitted ? (
            <div className="glass-panel p-8 rounded-2xl text-center space-y-3 border border-amber-500/30">
              <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Message Received!</h4>
              <p className="text-xs text-slate-300">Our Nashik concierge will get back to you within 2 hours.</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', message: '' });
                }}
                className="py-2.5 px-6 gold-gradient-bg text-black font-extrabold text-xs rounded-xl cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error alert */}
              {submitError && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    disabled={submitting}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98220 00000"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  disabled={submitting}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  How can we assist you? <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  disabled={submitting}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="I am looking for a 3 BHK in Gangapur Road or would like to list my property..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
