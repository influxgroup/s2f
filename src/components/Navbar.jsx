import React, { useState } from 'react';
import { ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import s2fLogoHeader from '../assets/s2f_logo_header.png';

/* ─── Social Media Icons (Vibrant Brand Accents) ─── */
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.91-4.49V8.82a8.28 8.28 0 0 0 4.86 1.57v-3.7z"/>
    </svg>
  );
}

export default function Navbar({ activeTab, setActiveTab, openDiscoveryModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'agency', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'cybersecurity', label: 'Cyber Security' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Insights & Blog' },
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: InstagramIcon, 
      url: 'https://instagram.com/sovereign2fresh', 
      hoverColor: 'hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10' 
    },
    { 
      name: 'TikTok', 
      icon: TikTokIcon, 
      url: 'https://tiktok.com/@sovereign2fresh', 
      hoverColor: 'hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10' 
    },
    { 
      name: 'Facebook', 
      icon: FacebookIcon, 
      url: 'https://facebook.com/sovereign2fresh', 
      hoverColor: 'hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10' 
    },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-2xl border-b border-slate-700/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)] px-4 sm:px-6 lg:px-8 h-16 transition-colors w-full max-w-full flex items-center relative"
      style={{
        background: 'linear-gradient(180deg, rgba(13, 20, 36, 0.97) 0%, rgba(9, 14, 26, 0.98) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 w-full">
        
        {/* Official S2F Empire Logo Lockup */}
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0 select-none group" 
          onClick={() => handleNavClick('agency')}
        >
          <img
            src={s2fLogoHeader}
            alt="Sovereign2Fresh Empire"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
          />
        </div>

        {/* Vibrant Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-[13px] transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-blue-600 font-semibold shadow-[0_2px_12px_rgba(37,99,235,0.45)] border border-blue-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08] font-medium border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Social Icons & Contact Button */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Social Media Icons (Instagram, TikTok, Facebook) */}
          <div className="hidden sm:flex items-center gap-1.5 pr-2.5 border-r border-slate-700/80">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className={`w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 flex items-center justify-center text-slate-200 transition-all cursor-pointer shadow-sm active:scale-95 ${social.hoverColor}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Vibrant Action Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openDiscoveryModal();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-900/50 border border-sky-400/40 cursor-pointer select-none active:scale-[0.98]"
          >
            Contact Us
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
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
        <div className="absolute top-16 left-0 w-full bg-[#0d1424]/98 backdrop-blur-2xl border-b border-slate-700/80 px-4 py-4 space-y-2 lg:hidden shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm border border-blue-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-white" />}
              </button>
            );
          })}

          {/* Mobile Social Links */}
          <div className="pt-2 pb-1 border-t border-slate-800/80 flex items-center justify-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium transition-colors ${social.hoverColor}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDiscoveryModal();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-md border border-blue-400/30"
            >
              <span>Book Discovery Consult</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
