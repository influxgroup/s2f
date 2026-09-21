import React, { useState } from 'react';
import { ChevronRight, Menu, X, Shield, ArrowRight } from 'lucide-react';
import s2fLogoHeader from '../assets/s2f_logo_header.png';

export default function Navbar({ activeTab, setActiveTab, openDiscoveryModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'agency', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'cybersecurity', label: 'Cyber Security' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'vetting', label: '5-Stage Vetting' },
    { id: 'talent', label: 'Talent Pool' },
    { id: 'blog', label: 'Insights & Blog' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/70 px-4 sm:px-6 lg:px-8 h-16 transition-colors w-full max-w-full flex items-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 w-full">
        
        {/* Official S2F Empire Logo Lockup */}
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0 select-none" 
          onClick={() => handleNavClick('agency')}
        >
          <img
            src={s2fLogoHeader}
            alt="Sovereign2Fresh Empire"
            className="h-8 sm:h-9 w-auto object-contain transition-opacity hover:opacity-90"
          />
        </div>

        {/* Human-Crafted Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-slate-800/80 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openDiscoveryModal();
            }}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md bg-white hover:bg-slate-100 text-slate-950 font-medium text-xs sm:text-sm transition-all shadow-sm hover:shadow cursor-pointer select-none active:scale-[0.98]"
          >
            Contact Us
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-200" />
            ) : (
              <Menu className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 px-4 py-4 space-y-1 lg:hidden shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
            );
          })}

          <div className="pt-3">
            <button
              onClick={() => handleNavClick('calculator')}
              className="w-full py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Calculate Squad Retainer</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
