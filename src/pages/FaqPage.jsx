import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, DollarSign, Home, FileText } from 'lucide-react';

export const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const FAQS = [
    {
      q: 'Are all properties on Nashik Property 15 MahaRERA verified?',
      a: 'Yes, every new construction project and developer listing on Nashik Property 15 undergoes strict verification. We verify MahaRERA registration numbers, approved building plans from NMC, and title clearance before publishing.'
    },
    {
      q: 'Which areas in Nashik offer the highest property appreciation?',
      a: 'Gangapur Road, College Road, and Pathardi Phata have consistently delivered 9% to 14% annual capital growth due to prime social infrastructure, premium educational hubs, and seamless Samruddhi Mahamarg connectivity.'
    },
    {
      q: 'How does the free private site visit schedule work?',
      a: 'When you click "Schedule Site Visit", select your preferred date and time. Our concierge provides complimentary luxury AC cab pickup and drop-off right from your home anywhere in Nashik.'
    },
    {
      q: 'Are there any hidden brokerage fees for buyers?',
      a: 'No! We charge 0% brokerage on all new launch developer properties. For resale and rental transactions, transparent standardized fees apply upfront.'
    },
    {
      q: 'How can I list my property for sale or rent on the platform?',
      a: 'Simply click "Sell Property" in the top bar, follow our 8-step wizard to input your details, photos, and price. Our team will verify and activate your listing within 24 hours.'
    }
  ];

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Knowledge & Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Frequently Asked <span className="gold-gradient-text">Questions</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Clear answers to common questions about buying, renting, home loans, and MahaRERA compliance in Nashik.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="glass-panel-gold rounded-2xl border border-amber-500/30 overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-amber-400 shrink-0 transition-transform ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
