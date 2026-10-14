import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, X, Send, Sparkles, RefreshCw, User, 
  Building, PhoneCall, ArrowRight, CheckCircle2, ChevronRight, MessageSquare 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROPERTIES, AGENTS, NASHIK_LOCATIONS } from '../../data/mockData';
import { WhatsAppModal } from '../modals/WhatsAppModal';

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const ChatbotWidget = () => {
  const { openScheduleVisitModal, openCallbackModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to **Nashik Property**. I'm your AI Luxury Property Concierge. How can I assist your real estate journey today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "🏡 Top 3 BHKs on Gangapur Road",
        "📍 Collector Approved NA Plots",
        "💰 Calculate EMI & Home Loans",
        "📞 Speak to a Luxury Advisor"
      ]
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setUnreadCount(0);
  };

  const generateBotResponse = (userText) => {
    const textLower = userText.toLowerCase();

    // 1. Gangapur Road / Buy 3BHK
    if (textLower.includes('gangapur') || textLower.includes('3 bhk') || textLower.includes('3bhk')) {
      const matchingProps = PROPERTIES.filter(p => p.location.toLowerCase().includes('gangapur') || p.bhk === 3);
      const firstProp = matchingProps[0] || PROPERTIES[0];

      return {
        text: `Here are premium 3 BHK & sky residences on **Gangapur Road**:\n\n✨ **${firstProp.title}**\n- Location: ${firstProp.location}\n- Price: ${firstProp.price}\n- Highlights: ${firstProp.features.slice(0, 2).join(', ')}`,
        propertyCard: firstProp,
        suggestions: [
          `View ${firstProp.title}`,
          "Schedule Site Visit for this",
          "Show More Gangapur Road Listings",
          "Contact Listing Agent"
        ]
      };
    }

    // 2. Plots / Land / NA Plot
    if (textLower.includes('plot') || textLower.includes('land') || textLower.includes('makhmalabad')) {
      const plotProp = PROPERTIES.find(p => p.category === 'plots') || PROPERTIES[4];
      return {
        text: `We have 100% verified **Collector Sanctioned NA Plots** in Makhmalabad & Ring Road areas:\n\n🌳 **${plotProp.title}**\n- Price: ${plotProp.price}\n- Area: ${plotProp.area} sq.ft\n- Status: ${plotProp.possession}`,
        propertyCard: plotProp,
        suggestions: [
          "Book NA Plot Site Tour",
          "Check Title Search Documents",
          "Other Plot Locations"
        ]
      };
    }

    // 3. EMI / Loan / Finance
    if (textLower.includes('emi') || textLower.includes('loan') || textLower.includes('finance') || textLower.includes('bank')) {
      return {
        text: "💡 **Home Loan & EMI Assistance**\n\nWe partner with HDFC, SBI, ICICI, and Axis Bank to provide 8.35% p.a. pre-approved home loan rates with ZERO processing fee for Nashik Property buyers.\n\nEstimated EMI for **₹80 Lakh loan (20 Yrs @ 8.5%)**: **₹69,426 / month**.",
        actionBtn: { label: "Open EMI Calculator Tool", link: "/emi-calculator" },
        suggestions: [
          "Check Loan Eligibility",
          "Talk to Bank Mortgage Specialist",
          "Search Homes under 80 Lakh"
        ]
      };
    }

    // 4. Contact / Agent / Call / Advisor
    if (textLower.includes('contact') || textLower.includes('agent') || textLower.includes('speak') || textLower.includes('call') || textLower.includes('advisor')) {
      const topAgent = AGENTS[0];
      return {
        text: `👤 **${topAgent.name}**\n_${topAgent.role}_\n\n"I am available to assist you with private site viewings, negotiation, and legal paperwork."\n\n📞 Phone: ${topAgent.phone}\n⭐ Rating: ${topAgent.rating} / 5`,
        actionBtn: { label: "Request Instant Callback", triggerCallback: true },
        suggestions: [
          "Request Instant Callback",
          "Schedule Site Visit",
          "View All Verified Agents"
        ]
      };
    }

    // 5. Locations / Areas in Nashik
    if (textLower.includes('location') || textLower.includes('area') || textLower.includes('college road') || textLower.includes('indira nagar')) {
      return {
        text: "📍 **Prime Nashik Investment Corridors**:\n\n1. **Gangapur Road**: Ultra-luxury high-rises & river views\n2. **College Road**: High-end retail & boutique residences\n3. **Indira Nagar**: Gated family townships\n4. **Pathardi Phata**: Commercial hubs & expressway access",
        suggestions: [
          "Explore All Locations",
          "Properties in Indira Nagar",
          "Properties on College Road"
        ]
      };
    }

    // Default Fallback
    return {
      text: "I can help you search for properties, check MahaRERA verified listings, estimate EMIs, or schedule a free site visit across Nashik.",
      suggestions: [
        "🏡 Search Luxury Apartments",
        "🌳 View NA Investment Plots",
        "📅 Schedule Free Private Site Visit",
        "📞 Call Senior Property Consultant"
      ]
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply.text,
        propertyCard: botReply.propertyCard,
        actionBtn: botReply.actionBtn,
        suggestions: botReply.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.toLowerCase().includes('visit')) {
      openScheduleVisitModal();
      return;
    }
    if (suggestion.toLowerCase().includes('callback') || suggestion.toLowerCase().includes('speak')) {
      openCallbackModal();
      return;
    }
    handleSendMessage(suggestion);
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTONS (WHATSAPP & AI CHATBOT STACKED) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* WHATSAPP FLOATING BUTTON */}
        <button
          onClick={() => setShowWhatsAppModal(true)}
          className="group relative bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-emerald-300/40"
          title="Direct WhatsApp Inquiry (+91 88882 80824)"
        >
          <WhatsAppIcon className="w-6 h-6 fill-white" />

          {/* Pulsing ring indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
          </span>

          {/* Hover Tooltip Pill */}
          <span className="hidden md:flex absolute right-16 bg-slate-900/95 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            WhatsApp Us (+91 88882 80824) 💬
          </span>
        </button>
        {/* Render WhatsApp Modal */}
        {showWhatsAppModal && (
          <WhatsAppModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />
        )}

        {/* AI CHATBOT TRIGGER BUTTON */}
        {!isOpen && (
          <button
            onClick={handleOpenToggle}
            className="group relative gold-gradient-bg text-black p-4 rounded-full shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-amber-300/50"
            title="Nashik Property AI Assistant"
          >
            <Bot className="w-7 h-7 stroke-[2.5] text-black group-hover:rotate-12 transition-transform" />
            
            {/* Pulsing ring indicator */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-black"></span>
            </span>

            {/* Hover Tooltip Pill */}
            <span className="hidden md:flex absolute right-16 bg-slate-900/90 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              AI Property Assistant 🤖
            </span>
          </button>
        )}
      </div>

      {/* CHAT WINDOW DRAWER */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[540px] max-h-[85vh] glass-panel-gold border border-amber-500/30 rounded-3xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 font-sans">
          
          {/* HEADER */}
          <div className="bg-slate-950/90 border-b border-amber-500/20 px-5 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl gold-gradient-bg flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Bot className="w-6 h-6 text-black stroke-[2.5]" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
                  NASHIK PROPERTY <span className="gold-gradient-text">AI</span>
                </h3>
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Online Real Estate Concierge
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-all"
                title="Reset Conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleOpenToggle}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MESSAGES BODY */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/60 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5 animate-in fade-in duration-200`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                  {msg.sender === 'bot' ? (
                    <span className="font-semibold text-amber-400 flex items-center gap-1">
                      <Bot className="w-3 h-3" /> AI Assistant
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-300 flex items-center gap-1">
                      <User className="w-3 h-3 text-amber-400" /> You
                    </span>
                  )}
                  <span>• {msg.timestamp}</span>
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'gold-gradient-bg text-black font-semibold rounded-br-none shadow-md shadow-amber-500/10'
                      : 'glass-panel border-amber-500/20 text-slate-200 rounded-bl-none shadow-lg'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Inline Property Card attached to message */}
                  {msg.propertyCard && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
                      <img
                        src={msg.propertyCard.image}
                        alt={msg.propertyCard.title}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          {msg.propertyCard.location}
                        </span>
                        <h4 className="font-heading font-bold text-xs text-white line-clamp-1">
                          {msg.propertyCard.title}
                        </h4>
                        <span className="font-extrabold text-xs gold-gradient-text block mt-0.5">
                          {msg.propertyCard.price}
                        </span>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <Link
                          to={`/property/${msg.propertyCard.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex-1 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-[11px] text-center hover:opacity-90"
                        >
                          View Listing
                        </Link>
                        <button
                          onClick={() => openScheduleVisitModal(msg.propertyCard)}
                          className="flex-1 py-1.5 rounded-lg glass-panel text-amber-300 font-bold text-[11px] text-center hover:bg-white/10"
                        >
                          Book Visit
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {msg.actionBtn && (
                    <div className="mt-2.5 pt-2 border-t border-white/10">
                      {msg.actionBtn.link ? (
                        <Link
                          to={msg.actionBtn.link}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold hover:bg-amber-500 hover:text-black transition-all"
                        >
                          <span>{msg.actionBtn.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            if (msg.actionBtn.triggerCallback) openCallbackModal();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg gold-gradient-bg text-black text-[11px] font-extrabold hover:opacity-90 transition-all cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{msg.actionBtn.label}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 max-w-[95%]">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(sug)}
                        className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-amber-500/25 text-[11px] text-amber-300 font-medium hover:bg-amber-500 hover:text-black transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>{sug}</span>
                        <ChevronRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs glass-panel px-3.5 py-2.5 rounded-2xl w-fit border-amber-500/20">
                <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-[11px]">AI Concierge is searching listings...</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT FOOTER */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950/95 border-t border-amber-500/20 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask about properties, 3 BHKs, plots, EMIs..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-slate-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl gold-gradient-bg text-black disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all cursor-pointer shadow-md shadow-amber-500/20"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
