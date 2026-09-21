import React, { useState } from 'react';
import { vettingStageDetails } from '../data/mockTalent';
import { CheckCircle2, ShieldCheck, Code2, Cpu, MessageSquareCheck, FileCheck, ChevronRight, Zap } from 'lucide-react';

export default function VettingPipeline({ setActiveTab, openDiscoveryModal }) {
  const [selectedStage, setSelectedStage] = useState(0);

  const iconMap = {
    FileCheck,
    Code2,
    Cpu,
    MessageSquareCheck,
    ShieldCheck
  };

  return (
    <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 bg-white border-b border-[#b8c8e0] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 w-full min-w-0">
        
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d0ddef] border border-[#a8bdd8] text-[#0f1d31] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Top 3% Talent Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1d31] tracking-tight font-heading break-words">
            The 5-Stage Talent <span className="text-[#1d4ed8]">Vetting Framework.</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Every candidate in the Sovereign2Fresh Empire Network passes a rigorous, multi-stage vetting pipeline spanning technical architecture, live coding, communication fluency, and background checks.
          </p>
        </div>

        {/* 5-Stage Horizontal Visual Funnel */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {vettingStageDetails.map((stageObj, idx) => {
            const isSelected = selectedStage === idx;

            return (
              <button
                key={idx}
                onClick={() => setSelectedStage(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f1d31] text-white border-[#2563eb] shadow-md scale-[1.02]'
                    : 'bg-[#f7faf6] text-slate-800 border-[#b8c8e0] hover:bg-[#e0e8f4]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs ${
                    isSelected ? 'bg-[#2563eb] text-white' : 'bg-[#e0e8f4] text-[#0f1d31] border border-[#a8bdd8]'
                  }`}>
                    0{stageObj.stage}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#d0ddef] text-[#0f1d31]'
                  }`}>
                    {stageObj.passRate}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-xs sm:text-sm line-clamp-1">
                    {stageObj.title}
                  </h4>
                  <p className={`text-[11px] line-clamp-2 ${isSelected ? 'text-slate-200' : 'text-slate-600'}`}>
                    {stageObj.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-bold">
                    <span>Active Review Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Deep Dive Panel */}
        <div className="bg-[#0f1d31] text-white p-8 sm:p-10 rounded-3xl border border-[#2563eb] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[#2563eb]/30 text-blue-300 flex items-center justify-center border border-[#2563eb]/50 text-xl font-extrabold">
                0{vettingStageDetails[selectedStage].stage}
              </span>
              <div>
                <span className="text-xs font-extrabold text-[#60a5fa] uppercase tracking-widest">
                  Vetting Protocol Filter
                </span>
                <h3 className="text-2xl font-extrabold text-white font-heading">
                  {vettingStageDetails[selectedStage].title}
                </h3>
              </div>
            </div>

            <p className="text-slate-200 text-base leading-relaxed font-normal">
              {vettingStageDetails[selectedStage].description}
            </p>

            <div className="bg-[#0a1628] p-5 rounded-2xl border border-[#2d4d38] space-y-3">
              <p className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Key Evaluation Criteria & SLAs
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60a5fa] shrink-0" />
                  <span>Peer-Level Code Architecture Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60a5fa] shrink-0" />
                  <span>Timed Algorithmic & Stack Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60a5fa] shrink-0" />
                  <span>English Fluency & Timezone Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60a5fa] shrink-0" />
                  <span>Verified Identity & Background Checks</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('talent')}
                className="px-6 py-3.5 rounded-xl bg-[#2563eb] text-white font-extrabold text-xs hover:bg-[#1d4ed8] transition-all flex items-center gap-2 border border-[#69966c] shadow-sm cursor-pointer"
              >
                <span>Browse Verified Talent Registry</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0a1628] p-6 rounded-3xl border border-[#2d4d38] space-y-6">
            <div className="flex items-center justify-between border-b border-[#2d4d38] pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase">Vetting Stage Funnel Metrics</span>
              <span className="text-xs font-extrabold text-[#60a5fa]">Strict Top 3% Filter</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span>Stage 1: Resume & GitHub Screening</span>
                  <span className="font-bold text-[#60a5fa]">100% ➔ 35%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563eb] w-[35%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span>Stage 2: Timed Algorithmic Code Challenge</span>
                  <span className="font-bold text-[#60a5fa]">35% ➔ 18%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563eb] w-[18%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span>Stage 3: Live System Design & Architecture</span>
                  <span className="font-bold text-[#60a5fa]">18% ➔ 8%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#69966c] w-[8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span>Stage 4: Soft Skills & Fluency Audit</span>
                  <span className="font-bold text-[#60a5fa]">8% ➔ 4%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span>Stage 5: Final Onboarding & NDA Execution</span>
                  <span className="font-bold text-[#60a5fa]">4% ➔ 3% ACCEPTED</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[3%]" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
