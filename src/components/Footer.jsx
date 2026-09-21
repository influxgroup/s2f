import React from 'react';
import { Shield, CheckCircle2, ArrowRight, Globe, Lock } from 'lucide-react';
import s2fLogoFooter from '../assets/s2f_logo_footer.png';

export default function Footer({ setActiveTab, openDiscoveryModal }) {
  return (
    <footer className="bg-[#0a1628] border-t border-[#2d4d38] pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-300 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 w-full min-w-0">
        
        {/* Pre-Footer Call to Action Banner */}
        <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0f1d31] border border-[#2563eb] flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl relative overflow-hidden text-white w-full">
          <div className="space-y-2 text-center lg:text-left z-10 w-full lg:w-auto">
            <span className="text-[#60a5fa] font-extrabold text-[11px] sm:text-xs uppercase tracking-widest">
              Ready to Expand Your Technical Capacity?
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-heading break-words">
              Deploy Vetted Engineering Squads in Under 48 Hours.
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto lg:mx-0">
              100% Client IP Ownership • Dual Binding NDAs • Top 3% Vetted Software Talent
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0 z-10">
            <button
              onClick={openDiscoveryModal}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#2563eb] text-white font-extrabold text-xs hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-2 shadow-sm border border-[#69966c] active:scale-95 cursor-pointer"
            >
              <span>Book Discovery Consult</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#0a1628] text-white font-bold text-xs hover:bg-[#0f1d31] transition-all border border-[#2d4d38] active:scale-95 cursor-pointer"
            >
              Calculate Squad Retainer
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
              Sovereign2Fresh Empire is the high-trust, agency-led technology partner bridging top-tier vetted software engineering talent with global enterprise clients across North America, Europe, and worldwide.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-bold text-[#60a5fa]">
              <span>Official Slogan:</span>
              <span className="bg-[#0f1d31] px-2.5 py-0.5 rounded border border-[#2d4d38] text-white">
                Elite. Verified. Secure.
              </span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Agency Platform</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><button onClick={() => setActiveTab('agency')} className="hover:text-[#60a5fa] transition-colors">Overview</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-[#60a5fa] transition-colors">Services Capabilities</button></li>
              <li><button onClick={() => setActiveTab('cybersecurity')} className="hover:text-[#60a5fa] transition-colors">Cyber Security & Training</button></li>
              <li><button onClick={() => setActiveTab('vetting')} className="hover:text-[#60a5fa] transition-colors">5-Stage Vetting</button></li>
              <li><button onClick={() => setActiveTab('talent')} className="hover:text-[#60a5fa] transition-colors">Talent Registry</button></li>
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-[#60a5fa] transition-colors">Squad Calculator</button></li>
              <li><button onClick={() => setActiveTab('blog')} className="hover:text-[#60a5fa] transition-colors">Insights & Blog</button></li>
              <li><button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#60a5fa] transition-colors text-blue-300 font-bold">Contact & Consult</button></li>
            </ul>
          </div>

          {/* Column 2: Stacks */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Vetted Talent Stacks</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><span>Full Stack React & Node</span></li>
              <li><span>Python AI & LLM Systems</span></li>
              <li><span>DevOps & Cloud Infrastructure</span></li>
              <li><span>QA & Test Automation</span></li>
              <li><span>Enterprise UI/UX Design</span></li>
            </ul>
          </div>

          {/* Column 3: Compliance */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[#60a5fa]" /> 100% IP Assignment</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#60a5fa]" /> Dual Binding NDAs</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#60a5fa]" /> GDPR & SOC2 Aligned</li>
              <li className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-[#60a5fa]" /> US / UK / CA Legal Ops</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#2d4d38] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Sovereign2Fresh Empire Ltd. All rights reserved. Managed Technology Partner.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Security Safeguards</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
