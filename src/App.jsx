import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustTicker from './components/TrustTicker';
import ServiceImageGrid from './components/ServiceImageGrid';
import ServicesPage from './components/ServicesPage';
import CyberSecurityPage from './components/CyberSecurityPage';
import PortfolioPage from './components/PortfolioPage';
import DifferentiationMatrix from './components/DifferentiationMatrix';
import WorkflowSection from './components/WorkflowSection';
import VettingPipeline from './components/VettingPipeline';
import SquadCalculator from './components/SquadCalculator';
import TalentPoolExplorer from './components/TalentPoolExplorer';
import BdCrmDashboard from './components/BdCrmDashboard';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AdminCmsPage from './components/AdminCmsPage';
import { CmsProvider } from './context/CmsContext';

function checkIsAdminUrl() {
  if (typeof window === 'undefined') return false;
  return window.location.hash === '#admin' || window.location.search.includes('admin=true');
}

function MainApp() {
  const [isAdminView, setIsAdminView] = useState(checkIsAdminUrl);
  const [activeTab, setActiveTab] = useState('agency'); // agency | services | cybersecurity | portfolio | vetting | talent | calculator | blog | bdcrm | contact

  // Listen for Option B: Navigating directly to #admin or ?admin=true
  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminView(checkIsAdminUrl());
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleExitAdmin = () => {
    setIsAdminView(false);
    // Clean URL hash or search param without full page reload
    if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
      const cleanUrl = window.location.pathname;
      window.history.pushState(null, '', cleanUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDiscoveryModal = () => {
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Mode (#admin or ?admin=true), render full Admin Content Studio
  if (isAdminView) {
    return <AdminCmsPage onExitAdmin={handleExitAdmin} />;
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#edf1f7] text-[#0f1d31] flex flex-col font-sans selection:bg-[#2563eb] selection:text-white">
      
      {/* Top Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDiscoveryModal={openDiscoveryModal}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-grow w-full max-w-full min-w-0 overflow-x-hidden">
        {activeTab === 'agency' && (
          <>
            <HeroSection setActiveTab={setActiveTab} openDiscoveryModal={openDiscoveryModal} />
            <TrustTicker />
            <ServiceImageGrid setActiveTab={setActiveTab} openDiscoveryModal={openDiscoveryModal} />
            <DifferentiationMatrix openDiscoveryModal={openDiscoveryModal} />
            <WorkflowSection openDiscoveryModal={openDiscoveryModal} />
            <VettingPipeline setActiveTab={setActiveTab} openDiscoveryModal={openDiscoveryModal} />
            <SquadCalculator openDiscoveryModal={openDiscoveryModal} />
          </>
        )}

        {activeTab === 'services' && (
          <ServicesPage setActiveTab={setActiveTab} openDiscoveryModal={openDiscoveryModal} />
        )}

        {activeTab === 'cybersecurity' && (
          <CyberSecurityPage openDiscoveryModal={openDiscoveryModal} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioPage openDiscoveryModal={openDiscoveryModal} />
        )}

        {activeTab === 'vetting' && (
          <VettingPipeline setActiveTab={setActiveTab} openDiscoveryModal={openDiscoveryModal} />
        )}

        {activeTab === 'talent' && (
          <TalentPoolExplorer openDiscoveryModal={openDiscoveryModal} />
        )}

        {activeTab === 'calculator' && (
          <SquadCalculator openDiscoveryModal={openDiscoveryModal} />
        )}

        {activeTab === 'blog' && (
          <BlogPage openDiscoveryModal={openDiscoveryModal} />
        )}

        {activeTab === 'contact' && (
          <ContactPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'bdcrm' && (
          <BdCrmDashboard />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} openDiscoveryModal={openDiscoveryModal} />

      {/* Floating Animated Back To Top Button */}
      <BackToTop />

    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainApp />
    </CmsProvider>
  );
}
