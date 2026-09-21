import React, { useState } from 'react';
import { mockJobSignals, outreachTemplate } from '../data/mockLeads';
import { Briefcase, Building2, Mail, Copy, Check, ExternalLink, Sparkles, TrendingUp } from 'lucide-react';

export default function BdCrmDashboard() {
  const [selectedSignal, setSelectedSignal] = useState(mockJobSignals[0]);
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('Sovereign2Fresh Empire Business Development');

  const generatedEmail = outreachTemplate
    .replace('{Company Name}', selectedSignal.company)
    .replace('{Job Role}', selectedSignal.targetRole)
    .replace('{Contact Name}', selectedSignal.contactName)
    .replace('{Your Name}', senderName);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 px-4 lg:px-8 bg-sage-banner min-h-[85vh] text-[#0f1d31] relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d0ddef] border border-[#a8bdd8] text-[#0f1d31] text-xs font-bold uppercase tracking-wider shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Outbound BD & Intent Signal Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1d31] tracking-tight font-heading">
            Lead Generation Signals & <span className="text-[#1d4ed8]">Outreach Engine.</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Monitor active remote software engineering hiring signals across US, UK, and Canadian markets, and dispatch consultative talent outreach.
          </p>
        </div>

        {/* CRM Pipeline Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white border border-[#b8c8e0] shadow-sm text-center text-xs text-[#0f1d31]">
          <div className="p-2">
            <p className="text-slate-600 font-bold uppercase">Active Job Signals</p>
            <p className="text-2xl font-extrabold text-[#0f1d31] font-heading mt-1">24 Signals</p>
          </div>
          <div className="p-2 border-l border-slate-200">
            <p className="text-slate-600 font-bold uppercase">Outreach Response Rate</p>
            <p className="text-2xl font-extrabold text-[#1d4ed8] font-heading mt-1">32.4%</p>
          </div>
          <div className="p-2 border-l border-slate-200">
            <p className="text-slate-600 font-bold uppercase">Discovery Consults</p>
            <p className="text-2xl font-extrabold text-amber-700 font-heading mt-1">8 Scheduled</p>
          </div>
          <div className="p-2 border-l border-slate-200">
            <p className="text-slate-600 font-bold uppercase">Avg Deal Time</p>
            <p className="text-2xl font-extrabold text-cyan-800 font-heading mt-1">6 Days</p>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-[#0f1d31] text-base font-heading flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#2563eb]" />
              <span>Detected Market Hiring Signals (US / UK / CA)</span>
            </h3>

            <div className="space-y-3">
              {mockJobSignals.map((signal) => {
                const isSelected = selectedSignal.id === signal.id;
                return (
                  <div
                    key={signal.id}
                    onClick={() => setSelectedSignal(signal)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-white border-[#2563eb] shadow-md ring-2 ring-[#2563eb]/30'
                        : 'bg-white/80 border-[#b8c8e0] hover:border-[#2563eb]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2563eb]" />
                        <h4 className="font-extrabold text-[#0f1d31] text-sm font-heading">{signal.company}</h4>
                      </div>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#d0ddef] text-[#0f1d31] border border-[#a8bdd8]">
                        {signal.market}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#1d4ed8]">{signal.targetRole}</p>
                      <p className="text-xs text-slate-600 font-semibold">{signal.signalStrength} • Budget: {signal.salaryBudget}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                      <span>Contact: <strong className="text-[#0f1d31]">{signal.contactName}</strong> ({signal.contactTitle})</span>
                      <span className="text-amber-700 font-bold">{signal.stage}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Generator */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#b8c8e0] space-y-5 shadow-md">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-extrabold text-[#0f1d31] text-base font-heading flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2563eb]" />
                <span>Consultative Email Sequence Generator</span>
              </h3>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Target Company</label>
                  <input
                    type="text"
                    value={selectedSignal.company}
                    disabled
                    className="w-full bg-[#f4f8f4] text-[#0f1d31] py-2 px-3 rounded-xl border border-[#b8c8e0] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={selectedSignal.contactName}
                    disabled
                    className="w-full bg-[#f4f8f4] text-[#0f1d31] py-2 px-3 rounded-xl border border-[#b8c8e0] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Sender Representative Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-[#f4f8f4] text-[#0f1d31] py-2 px-3 rounded-xl border border-[#b8c8e0] focus:border-[#2563eb] focus:outline-none font-semibold"
                />
              </div>
            </div>

            {/* Pitch Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600 uppercase">Generated Pitch Preview</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-[#0f1d31] hover:text-[#1d4ed8] font-bold flex items-center gap-1 bg-[#d0ddef] px-2.5 py-1 rounded-lg border border-[#a8bdd8] cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Template'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={12}
                value={generatedEmail}
                className="w-full bg-[#f4f8f4] text-[#0f1d31] text-xs p-4 rounded-2xl border border-[#b8c8e0] leading-relaxed font-mono resize-none focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
              <span>Recipient Email: <strong className="text-[#0f1d31]">{selectedSignal.email}</strong></span>
              <a
                href={`https://${selectedSignal.linkedinUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#2563eb] hover:underline flex items-center gap-1 font-bold"
              >
                <span>LinkedIn Contact</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
