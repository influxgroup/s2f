import React from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import s2fLogoFooter from '../assets/s2f_logo_footer.png';
import { useCms } from '../context/CmsContext';

export default function Footer({ setActiveTab, openDiscoveryModal }) {
  const cms = useCms();
  const contact = cms?.content?.contact || {};
  const phone = contact.phone || '+234 (0) 800-723-3674';
  const email = contact.email || 'info@sovereign2freshempire.com';
  const address = contact.officeAddress || 'Abuja, Federal Capital Territory, Nigeria';

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-[#070f1e] border-t border-blue-900/40 pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-300 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 w-full min-w-0">
        
        {/* Pre-Footer Call to Action (Authentic Human Engineering Aesthetic) */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c1322] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-sm text-white w-full">
          {/* Content */}
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-heading">
              Ready to build or scale your next project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              From enterprise software and cloud architecture to commercial drone surveys and cyber defense, our team is ready to help you plan and execute.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={openDiscoveryModal}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm transition-colors border border-slate-700/80 cursor-pointer active:scale-95"
            >
              Explore Our Work
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src={s2fLogoFooter}
                alt="Sovereign2Fresh Empire Logo"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform"
              />
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Sovereign2Fresh Empire is the high-trust technology partner delivering premier enterprise IT solutions, custom software engineering, cloud systems, and cyber defense to commercial clients, government agencies, and private firms worldwide.
            </p>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Agency Platform</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li>
                <button 
                  onClick={() => handleNavClick('agency')} 
                  className="hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('services')} 
                  className="hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Services Capabilities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('cybersecurity')} 
                  className="hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Cyber Security & Training
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('portfolio')} 
                  className="hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Portfolio & Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('blog')} 
                  className="hover:text-[#60a5fa] transition-colors cursor-pointer text-left"
                >
                  Insights & Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="hover:text-[#60a5fa] transition-colors text-blue-300 font-bold cursor-pointer text-left"
                >
                  Contact & Consult
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Stacks */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Engineering Stacks</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><span>Full Stack React & Node</span></li>
              <li><span>Python AI & LLM Systems</span></li>
              <li><span>DevOps & Cloud Infrastructure</span></li>
              <li><span>QA & Test Automation</span></li>
              <li><span>Enterprise UI/UX Design</span></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-slate-300 font-medium text-xs">
              <li>
                <a 
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                  className="flex items-start gap-2.5 hover:text-white transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#60a5fa] mt-0.5 shrink-0 group-hover:text-sky-300" />
                  <span className="leading-tight">{phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${email}`} 
                  className="flex items-start gap-2.5 hover:text-white transition-colors group break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#60a5fa] mt-0.5 shrink-0 group-hover:text-sky-300" />
                  <span className="leading-tight">{email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#60a5fa] mt-0.5 shrink-0" />
                  <span className="leading-tight text-slate-300">{address}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#2d4d38] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Sovereign2Fresh Empire Ltd. All rights reserved. Managed Technology Partner.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleNavClick('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavClick('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavClick('security')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Security Safeguards
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
