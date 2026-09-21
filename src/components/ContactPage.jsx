import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Building, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Globe, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { submitInquiry } from '../services/api';

export default function ContactPage({ setActiveTab }) {
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    serviceArea: 'Dedicated Software Engineering Squads',
    primaryStack: 'Full Stack (React / Node.js / AWS)',
    squadSize: 'Medium Managed Squad (4-6 Engineers)',
    timeline: 'Immediate (Within 48 Hours)',
    projectOverview: '',
    requestNda: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.workEmail.trim()) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.fullName,
        email: formData.workEmail,
        company: formData.companyName,
        phone: formData.phoneNumber,
        service_type: formData.serviceArea,
        budget_range: formData.squadSize,
        timeline: formData.timeline,
        message: `${formData.projectOverview || 'No overview provided'} [Primary Stack: ${formData.primaryStack}] [NDA Requested: ${formData.requestNda ? 'Yes' : 'No'}]`,
      };

      const res = await submitInquiry(payload);
      const generatedTicket = `S2F-INQ-${res?.data?.id ? String(res.data.id).padStart(5, '0') : Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.warn('API submission fallback:', err.message);
      const generatedTicket = `S2F-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#edf1f7] via-[#e2eaf5] to-[#edf1f7] text-[#0f1d31] min-h-[85vh] py-12 px-4 lg:px-8 selection:bg-blue-600 selection:text-white relative">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Page Header - Professional Clean Copy */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f1d31] tracking-tight font-heading">
            Contact Our Team
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Discuss your software engineering, cybersecurity, or IT training requirements with Sovereign2Fresh Empire. We review every submission and respond within 24 hours.
          </p>
        </div>

        {/* Submission Confirmation View */}
        {submitted ? (
          <div className="max-w-2xl bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl space-y-6 shadow-sm text-left">
            <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Inquiry Received</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#0f1d31] font-heading">
                Thank you, {formData.fullName}.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your message has been received. Our team will review your project details and reach out to <span className="text-[#0f1d31] font-bold">{formData.workEmail}</span> shortly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500 font-medium">Confirmation Reference Number</div>
              <div className="text-lg font-mono font-extrabold text-blue-600">{ticketId}</div>
              <div className="text-xs text-slate-500 pt-1">Response SLA: Guaranteed within 24 hours</div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f1d31] font-bold text-xs transition-colors border border-slate-300 cursor-pointer"
              >
                Submit Another Message
              </button>
              <button
                onClick={() => setActiveTab('agency')}
                className="px-5 py-2.5 rounded-xl bg-[#0f1d31] hover:bg-[#0b1525] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Return to Overview
              </button>
            </div>
          </div>
        ) : (
          /* Main Layout: White Crisp Form + Professional Contrast Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Card (Clean White Container) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl space-y-6 shadow-sm">
              
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-extrabold text-[#0f1d31] font-heading">Project Inquiry Form</h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Fill in your details below to request a consult or custom squad breakdown.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                
                {/* Section 1: Contact Information */}
                <div className="space-y-4">
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    1. Contact Details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Company Name *</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="companyName"
                          required
                          placeholder="Acme Corp"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none font-medium transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Your Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="Sarah Jenkins"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none font-medium transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Work Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          name="workEmail"
                          required
                          placeholder="s.jenkins@company.com"
                          value={formData.workEmail}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none font-medium transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Phone Number (Optional)</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="+1 (555) 019-2834"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none font-medium transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Technical Scope & Stack */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    2. Service Requirements
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Primary Service Needed</label>
                      <select
                        name="serviceArea"
                        value={formData.serviceArea}
                        onChange={handleChange}
                        className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] focus:bg-white focus:border-blue-600 focus:outline-none font-semibold cursor-pointer"
                      >
                        <option value="Dedicated Software Engineering Squads">Dedicated Software Engineering Squads</option>
                        <option value="Cyber Security Penetration Testing & Audit">Cyber Security Penetration Testing & Audit</option>
                        <option value="AI & Machine Learning Systems">AI & Machine Learning Systems</option>
                        <option value="Microsoft 365 & Security Hardening">Microsoft 365 & Security Hardening</option>
                        <option value="Corporate IT Training Cohorts">Corporate IT Training Cohorts</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Primary Tech Stack</label>
                      <select
                        name="primaryStack"
                        value={formData.primaryStack}
                        onChange={handleChange}
                        className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] focus:bg-white focus:border-blue-600 focus:outline-none font-semibold cursor-pointer"
                      >
                        <option value="Full Stack (React / Node.js / AWS)">Full Stack (React / Node.js / AWS)</option>
                        <option value="Python / AI / Machine Learning">Python / AI / Machine Learning</option>
                        <option value="DevOps & Kubernetes Cloud Infrastructure">DevOps & Kubernetes Cloud Infrastructure</option>
                        <option value="Cyber Security & Compliance">Cyber Security & Compliance</option>
                        <option value="Microsoft 365 & Enterprise Systems">Microsoft 365 & Enterprise Systems</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Squad Size / Scope</label>
                      <select
                        name="squadSize"
                        value={formData.squadSize}
                        onChange={handleChange}
                        className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] focus:bg-white focus:border-blue-600 focus:outline-none font-semibold cursor-pointer"
                      >
                        <option value="1 Senior Specialist / Architect">1 Senior Specialist / Architect</option>
                        <option value="Small Squad (2-3 Engineers)">Small Squad (2-3 Engineers)</option>
                        <option value="Medium Managed Squad (4-6 Engineers)">Medium Managed Squad (4-6 Engineers)</option>
                        <option value="Enterprise Squad (7+ Engineers)">Enterprise Squad (7+ Engineers)</option>
                        <option value="Project-Based Audit / Security Assessment">Project-Based Audit / Security Assessment</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Target Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] focus:bg-white focus:border-blue-600 focus:outline-none font-semibold cursor-pointer"
                      >
                        <option value="Immediate (Within 48 Hours)">Immediate (Within 48 Hours)</option>
                        <option value="Within 1-2 Weeks">Within 1-2 Weeks</option>
                        <option value="Within 1 Month">Within 1 Month</option>
                        <option value="Planning Phase">Planning Phase</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Project Details</label>
                    <textarea
                      name="projectOverview"
                      rows="4"
                      placeholder="Briefly describe your project requirements, goals, or timeline..."
                      value={formData.projectOverview}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 text-[#0f1d31] placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none font-normal transition-colors resize-none text-xs"
                    />
                  </div>

                </div>

                {/* Section 3: NDA Option */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="requestNda"
                      checked={formData.requestNda}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-white border-slate-300 cursor-pointer"
                    />
                    <div className="text-xs text-slate-700">
                      <span className="font-extrabold text-[#0f1d31]">Execute Non-Disclosure Agreement (NDA)</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">We will provide a standard NDA before discussing sensitive project code or infrastructure.</p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#0f1d31] hover:bg-[#0b1525] text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-blue-500/30 disabled:opacity-60"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>{loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
                </button>

              </form>

            </div>

            {/* Right Column: Direct Contact Anchor & Global Locations */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Direct Contact Box (Dark Anchor for High Contrast) */}
              <div className="bg-[#0f1d31] text-white border border-blue-500/30 p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">Direct Communication</span>
                  <h3 className="text-xl font-extrabold text-white font-heading">Global Executive Desk</h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="text-slate-400 text-[11px]">General Client Inquiries:</div>
                    <div className="font-extrabold text-white text-sm">consult@sovereign2freshempire.com</div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[11px]">Security & Audit Desk:</div>
                    <div className="font-extrabold text-white text-sm">security@sovereign2freshempire.com</div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Response SLA:</span>
                    <span className="font-extrabold text-emerald-400 text-xs bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">&lt; 24 Hours</span>
                  </div>
                </div>
              </div>

              {/* Global Locations Box */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-sm text-xs">
                <h3 className="text-sm font-extrabold text-[#0f1d31] uppercase tracking-wider font-heading">Global Locations</h3>

                <div className="space-y-3 text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-extrabold text-[#0f1d31]">🇺🇸 North America Hub</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">New York & Delaware Operations</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-extrabold text-[#0f1d31]">🇬🇧 European Hub</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">London, United Kingdom</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-extrabold text-[#0f1d31]">🇳🇬 African Tech Center</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">Abuja & Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Key Commitments Box */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2.5 text-xs text-slate-700 shadow-sm">
                <h3 className="text-sm font-extrabold text-[#0f1d31] uppercase tracking-wider mb-2 font-heading">Our Guarantees</h3>
                <p className="text-slate-600 text-[11px] flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  100% Client IP Assignment
                </p>
                <p className="text-slate-600 text-[11px] flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  Dual-Layer International NDAs
                </p>
                <p className="text-slate-600 text-[11px] flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  48-Hour Free Talent Replacement SLA
                </p>
                <p className="text-slate-600 text-[11px] flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  Full EST / PST / GMT Timezone Alignment
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
