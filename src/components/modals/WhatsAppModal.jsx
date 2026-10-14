import React, { useState } from 'react';
import { X, User, Phone } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const WhatsAppModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: 'Buy 2/3 BHK Flat',
    location: 'Gangapur Road',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const textMessage = `Hello Nashik Property!\n\n*Quick Property Inquiry*\n👤 Name: ${formData.name || 'Interested Buyer'}\n📞 Phone: ${formData.phone || 'Not provided'}\n🏢 Requirement: ${formData.propertyType}\n📍 Preferred Area: ${formData.location}\n💬 Message: ${formData.message || 'I want more details & site visit.'}`;
    
    const whatsappUrl = `https://wa.me/918888280824?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel-gold border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-emerald-950/80 bg-slate-950/95 space-y-4">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <WhatsAppIcon className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
                WhatsApp Direct Inquiry
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                Official Helpline: +91 88882 80824
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[10px] uppercase font-bold text-amber-300 block mb-1">
              Your Name *
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Enter full name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-amber-300 block mb-1">
              WhatsApp Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="Enter 10-digit mobile number..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-amber-300 block mb-1">
                Property Interest
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-2 text-[11px] text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Buy 2/3 BHK Flat">Buy 2/3 BHK Flat</option>
                <option value="Luxury Villa / House">Luxury Villa / House</option>
                <option value="NA Plot / Land">NA Plot / Land</option>
                <option value="Commercial Shop / Office">Commercial Space</option>
                <option value="Rent Residential Property">Rent Property</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-amber-300 block mb-1">
                Preferred Area
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-2 text-[11px] text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Gangapur Road">Gangapur Road</option>
                <option value="College Road">College Road</option>
                <option value="Indira Nagar">Indira Nagar</option>
                <option value="Makhmalabad">Makhmalabad</option>
                <option value="Pathardi Phata">Pathardi Phata</option>
                <option value="Govind Nagar">Govind Nagar</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-amber-300 block mb-1">
              Your Requirement / Query
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Budget ₹75 Lakhs, ready possession needed..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all mt-1"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Send Inquiry on WhatsApp</span>
          </button>
        </form>

      </div>
    </div>
  );
};
