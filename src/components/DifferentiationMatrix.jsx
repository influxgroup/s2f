import React from 'react';
import { Check, X, ShieldAlert, Zap, Award, ArrowUpRight } from 'lucide-react';

export default function DifferentiationMatrix({ openDiscoveryModal }) {
  const comparisonData = [
    {
      feature: "Vetting & Quality Control",
      s2f: "Top 3% Multi-Stage Code & Arch Audit",
      marketplace: "Self-reported profiles & basic quizzes",
      staffing: "Resume keyword matching"
    },
    {
      feature: "Delivery Accountability",
      s2f: "Full Agency Delivery & QA Lead Oversight",
      marketplace: "Individual freelancer responsibility",
      staffing: "None (Placement only)"
    },
    {
      feature: "Disintermediation Protection",
      s2f: "Contractual Agency Ownership & Dual NDAs",
      marketplace: "High platform bypass risk",
      staffing: "High one-time buyout fee"
    },
    {
      feature: "Talent Replacement SLA",
      s2f: "48-Hour Free Talent Replacement SLA",
      marketplace: "Must re-hire & restart search",
      staffing: "Slow 2-4 week replacement process"
    },
    {
      feature: "Intellectual Property Ownership",
      s2f: "100% Client IP Assignment & Dual NDAs",
      marketplace: "Varies by contractor agreement",
      staffing: "Requires separate legal addendums"
    },
    {
      feature: "Timezone & Communication",
      s2f: "Guaranteed 5-8 Hrs EST/PST/GMT Overlap",
      marketplace: "Unpredictable communication windows",
      staffing: "Varies by local placement"
    }
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-sage-banner border-b border-[#b8c8e0] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 w-full max-w-full min-w-0">
        
        {/* Section Title */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d0ddef] border border-[#a8bdd8] text-[#0f1d31] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Market Positioning</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1d31] tracking-tight font-heading break-words">
            Why Enterprise Leaders Choose <span className="text-[#1d4ed8]">Sovereign2Fresh Empire.</span>
          </h2>
          <p className="text-slate-700 text-xs sm:text-base leading-relaxed">
            Unlike unvetted freelancer marketplaces or rigid staffing agencies, Sovereign2Fresh Empire combines rigorous talent verification, agency-level delivery guarantees, and enterprise legal protection.
          </p>
        </div>

        {/* High-Contrast Comparison Table */}
        <div className="w-full max-w-full overflow-x-auto rounded-2xl sm:rounded-3xl border border-[#b8c8e0] bg-white shadow-md min-w-0">
          <table className="w-full text-left border-collapse min-w-[650px] sm:min-w-[700px]">
            <thead>
              <tr className="border-b border-[#b8c8e0] bg-[#0f1d31] text-white">
                <th className="p-5 text-xs font-extrabold uppercase tracking-wider w-1/4">
                  Feature / Capability
                </th>
                <th className="p-5 text-sm font-extrabold text-[#b5d6b2] bg-[#0a1628] w-1/3 border-x border-[#2d4d38]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#60a5fa]" />
                    <span>SOVEREIGN2FRESH EMPIRE MODEL</span>
                  </div>
                </th>
                <th className="p-5 text-xs font-extrabold uppercase tracking-wider text-slate-300 w-1/5">
                  Freelance Marketplaces
                </th>
                <th className="p-5 text-xs font-extrabold uppercase tracking-wider text-slate-300 w-1/5">
                  IT Staffing Agencies
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-800">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#e0e8f4]/60 transition-colors">
                  <td className="p-5 font-bold text-[#0f1d31]">
                    {row.feature}
                  </td>

                  {/* S2F Empire Column */}
                  <td className="p-5 font-extrabold text-[#0f1d31] bg-[#e0e8f4] border-x border-[#b8c8e0] flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{row.s2f}</span>
                  </td>

                  {/* Marketplace Column */}
                  <td className="p-5 text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{row.marketplace}</span>
                    </div>
                  </td>

                  {/* Staffing Agency Column */}
                  <td className="p-5 text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{row.staffing}</span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0f1d31] text-white border border-[#2563eb] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl w-full text-center sm:text-left">
          <div>
            <h4 className="font-extrabold text-white text-base sm:text-lg font-heading">Ready to scale with guaranteed delivery?</h4>
            <p className="text-xs text-slate-300 mt-1">Get custom squad recommendations matched to your technology stack in under 24 hours.</p>
          </div>
          <button
            onClick={openDiscoveryModal}
            className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#2563eb] text-white font-extrabold text-xs hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm border border-[#69966c] active:scale-95 cursor-pointer"
          >
            <span>Request Custom Squad</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
