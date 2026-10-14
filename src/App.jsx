import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScheduleVisitModal } from './components/modals/ScheduleVisitModal';
import { CallbackModal } from './components/modals/CallbackModal';
import { ToastNotification } from './components/modals/ToastNotification';
import { LatestDealModal } from './components/modals/LatestDealModal';
import { SpecialOffersModal } from './components/modals/SpecialOffersModal';
import { ChatbotWidget } from './components/chat/ChatbotWidget';
import { Tag, Sparkles } from 'lucide-react';

// Pages Import
import { HomePage } from './pages/HomePage';
import { BuyPropertiesPage } from './pages/BuyPropertiesPage';
import { RentPropertiesPage } from './pages/RentPropertiesPage';
import { CommercialPage } from './pages/CommercialPage';
import { PlotsLandPage } from './pages/PlotsLandPage';
import { NewProjectsPage } from './pages/NewProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { ExploreLocationsPage } from './pages/ExploreLocationsPage';
import { LocationDetailsPage } from './pages/LocationDetailsPage';
import { SellPropertyPage } from './pages/SellPropertyPage';
import { AgentsPage } from './pages/AgentsPage';
import { AgentProfilePage } from './pages/AgentProfilePage';
import { BuildersPage } from './pages/BuildersPage';
import { BuilderProfilePage } from './pages/BuilderProfilePage';
import { PropertyComparisonPage } from './pages/PropertyComparisonPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AiPropertyFinderPage } from './pages/AiPropertyFinderPage';
import { EmiCalculatorPage } from './pages/EmiCalculatorPage';
import { LoginPage } from './pages/LoginPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';

// Scroll To Top on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Automatic Popups Manager
const AutoPopups = () => {
  const [showLatestDeal, setShowLatestDeal] = useState(false);
  const [showOffersModal, setShowOffersModal] = useState(false);

  useEffect(() => {
    // Popup 1: Latest Deal appears after 2.5 seconds
    const dealTimer = setTimeout(() => {
      setShowLatestDeal(true);
    }, 2500);

    return () => clearTimeout(dealTimer);
  }, []);

  return (
    <>
      <LatestDealModal
        isOpen={showLatestDeal}
        onClose={() => setShowLatestDeal(false)}
        onOpenOffers={() => setShowOffersModal(true)}
      />

      <SpecialOffersModal
        isOpen={showOffersModal}
        onClose={() => setShowOffersModal(false)}
      />

      {/* FLOATING LUXURY BADGES */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={() => setShowLatestDeal(true)}
          className="glass-panel-gold hover:border-amber-400 text-amber-300 hover:text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-lg shadow-black/50 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Featured Deal</span>
        </button>

        <button
          onClick={() => setShowOffersModal(true)}
          className="gold-gradient-bg text-black hover:opacity-95 py-2.5 px-4 rounded-xl text-xs font-extrabold shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          <span>Special Offers</span>
        </button>
      </div>
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buy" element={<BuyPropertiesPage />} />
              <Route path="/rent" element={<RentPropertiesPage />} />
              <Route path="/commercial" element={<CommercialPage />} />
              <Route path="/plots" element={<PlotsLandPage />} />
              <Route path="/new-projects" element={<NewProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetailsPage />} />
              <Route path="/property/:slug" element={<PropertyDetailsPage />} />
              <Route path="/locations" element={<ExploreLocationsPage />} />
              <Route path="/location/:slug" element={<LocationDetailsPage />} />
              <Route path="/sell" element={<SellPropertyPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/agent/:id" element={<AgentProfilePage />} />
              <Route path="/builders" element={<BuildersPage />} />
              <Route path="/builder/:id" element={<BuilderProfilePage />} />
              <Route path="/compare" element={<PropertyComparisonPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/ai-finder" element={<AiPropertyFinderPage />} />
              <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Modals, Chatbot & Notifications */}
          <ScheduleVisitModal />
          <CallbackModal />
          <ToastNotification />
          <AutoPopups />
          <ChatbotWidget />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

