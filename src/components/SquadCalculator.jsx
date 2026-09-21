import React, { useState } from 'react';
import { Calculator, Users, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function SquadCalculator({ openDiscoveryModal }) {
  const [squad, setSquad] = useState({
    techLeads: 1,
    backendDevs: 2,
    frontendDevs: 1,
    uiuxDesigners: 1,
    qaEngineers: 1
  });

  const [engagementModel, setEngagementModel] = useState('retainer');
  const [timezone, setTimezone] = useState('EST');

  const monthlyRates = {
    techLeads: 10500,
    backendDevs: 8500,
    frontendDevs: 7800,
    uiuxDesigners: 6500,
    qaEngineers: 5500
  };

  const hourlyRates = {
    techLeads: 75,
    backendDevs: 65,
    frontendDevs: 60,
    uiuxDesigners: 55,
    qaEngineers: 50
  };

  const totalHeadcount = Object.values(squad).reduce((a, b) => a + b, 0);

  const totalMonthlyCost =
    squad.techLeads * monthlyRates.techLeads +
    squad.backendDevs * monthlyRates.backendDevs +
    squad.frontendDevs * monthlyRates.frontendDevs +
    squad.uiuxDesigners * monthlyRates.uiuxDesigners +
    squad.qaEngineers * monthlyRates.qaEngineers;

  const totalHourlyCost =
    squad.techLeads * hourlyRates.techLeads +
    squad.backendDevs * hourlyRates.backendDevs +
    squad.frontendDevs * hourlyRates.frontendDevs +
    squad.uiuxDesigners * hourlyRates.uiuxDesigners +
    squad.qaEngineers * hourlyRates.qaEngineers;

  const averageBlendedHourly = totalHeadcount > 0 ? Math.round(totalHourlyCost / totalHeadcount) : 0;

  const handleIncrement = (role) => {
    setSquad(prev => ({ ...prev, [role]: prev[role] + 1 }));
  };

  const handleDecrement = (role) => {
    setSquad(prev => ({ ...prev, [role]: Math.max(0, prev[role] - 1) }));
  };

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-sage-banner min-h-[85vh] text-[#0f1d31] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d0ddef] border border-[#a8bdd8] text-[#0f1d31] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Commercial Squad Cost Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1d31] tracking-tight font-heading break-words">
            Interactive Custom Squad & <span className="text-[#1d4ed8]">Rate Calculator.</span>
          </h2>
          <p className="text-slate-700 text-xs sm:text-base leading-relaxed">
            Configure your ideal software engineering squad composition, select your engagement model, and view instant transparent agency pricing.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0">
          
          {/* Left Column: Squad Composition */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#b8c8e0] space-y-5 sm:space-y-6 shadow-md w-full min-w-0">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4 gap-2">
              <h3 className="font-extrabold text-[#0f1d31] text-base sm:text-lg font-heading flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2563eb] shrink-0" />
                <span>1. Select Squad Roles & Headcount</span>
              </h3>
              <span className="text-[11px] sm:text-xs font-bold bg-[#d0ddef] text-[#0f1d31] px-2.5 py-1 rounded-full border border-[#a8bdd8] whitespace-nowrap">
                {totalHeadcount} Members
              </span>
            </div>

            {/* Role Incrementers */}
            <div className="space-y-3 sm:space-y-4">
              {[
                { key: 'techLeads', label: 'Senior Technical Lead & AWS Cloud Architect', rate: '$75/hr • $10.5k/mo' },
                { key: 'backendDevs', label: 'Senior Backend Engineers (Laravel / Python / Node)', rate: '$65/hr • $8.5k/mo' },
                { key: 'frontendDevs', label: 'Senior Mobile & Frontend Engineers (Flutter / React / RN)', rate: '$62/hr • $8.0k/mo' },
                { key: 'uiuxDesigners', label: 'Cybersecurity Specialist & Penetration Tester', rate: '$65/hr • $8.5k/mo' },
                { key: 'qaEngineers', label: 'QA Automation Engineers (Playwright / Cypress)', rate: '$50/hr • $5.5k/mo' },
              ].map(role => (
                <div key={role.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f4f8f4] border border-[#b8c8e0]">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[#0f1d31] text-xs sm:text-sm break-words">{role.label}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-0.5">{role.rate}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
                    <span className="text-xs text-slate-500 font-medium sm:hidden">Count:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDecrement(role.key)}
                        className="w-8 h-8 rounded-xl bg-white text-slate-800 border border-[#b8c8e0] font-bold hover:bg-[#e0e8f4] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-extrabold text-[#1d4ed8] text-base font-heading">
                        {squad[role.key]}
                      </span>
                      <button
                        onClick={() => handleIncrement(role.key)}
                        className="w-8 h-8 rounded-xl bg-[#2563eb] text-white font-extrabold hover:bg-[#1d4ed8] flex items-center justify-center transition-all shadow-sm cursor-pointer active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timezone Selector */}
            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-slate-200">
              <h4 className="font-extrabold text-[#0f1d31] text-xs sm:text-sm font-heading flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563eb]" />
                <span>2. Timezone Overlap Requirement</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                {['EST (US East)', 'PST (US West)', 'GMT (UK/EU)', 'BST (Europe)'].map((tz) => (
                  <button
                    key={tz}
                    onClick={() => setTimezone(tz.split(' ')[0])}
                    className={`py-2 sm:py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      timezone === tz.split(' ')[0]
                        ? 'bg-[#0f1d31] text-white border-[#0f1d31] shadow-sm'
                        : 'bg-[#f4f8f4] text-slate-700 border-[#b8c8e0] hover:bg-[#e0e8f4]'
                    }`}
                  >
                    {tz}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing Summary Card */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#b8c8e0] space-y-5 sm:space-y-6 shadow-md lg:sticky lg:top-24 w-full min-w-0">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4">
              <h3 className="font-extrabold text-[#0f1d31] text-base sm:text-lg font-heading">Commercial Retainer Summary</h3>
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>

            {/* Model Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#f4f8f4] rounded-xl border border-[#b8c8e0] text-xs font-bold">
              <button
                onClick={() => setEngagementModel('retainer')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  engagementModel === 'retainer'
                    ? 'bg-[#0f1d31] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Monthly Retainer
              </button>
              <button
                onClick={() => setEngagementModel('tm')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  engagementModel === 'tm'
                    ? 'bg-[#0f1d31] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Time & Materials
              </button>
            </div>

            {/* Cost Big Display */}
            <div className="bg-[#f4f8f4] p-6 rounded-2xl border border-[#b8c8e0] text-center space-y-2">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Estimated Commercial Investment
              </p>

              {engagementModel === 'retainer' ? (
                <div>
                  <p className="text-4xl sm:text-5xl font-extrabold text-[#0f1d31] font-heading">
                    ${totalMonthlyCost.toLocaleString()}
                    <span className="text-sm font-semibold text-slate-600">/mo</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-semibold">Guaranteed dedicated capacity for {totalHeadcount} squad members</p>
                </div>
              ) : (
                <div>
                  <p className="text-4xl sm:text-5xl font-extrabold text-[#0f1d31] font-heading">
                    ${averageBlendedHourly}
                    <span className="text-sm font-semibold text-slate-600">/hr avg</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-semibold">Total squad billable rate: ${totalHourlyCost}/hr</p>
                </div>
              )}
            </div>

            {/* Included Guarantees */}
            <div className="space-y-2.5 text-xs text-slate-700 font-medium pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>Dedicated Sovereign2Fresh Empire Senior Tech Lead Oversight</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>48-Hour Talent Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>Dual NDAs & 100% Client Intellectual Property Rights</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>Zero payroll, tax, or cross-border admin overhead</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={openDiscoveryModal}
              className="w-full py-4 rounded-xl bg-[#2563eb] text-white font-extrabold text-sm hover:bg-[#1d4ed8] transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Submit Custom Squad Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
