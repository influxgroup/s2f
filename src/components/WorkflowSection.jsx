import React, { useState } from 'react';
import { Layers, FileText, Search, Users, ShieldCheck, Code2, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WorkflowSection({ openDiscoveryModal }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      title: "Client Inquiry & Intake",
      subtitle: "Requirement Synthesis",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      description: "Submit project scope, target tech stack, timeline, budget, and squad composition requirements through our consultative portal.",
      details: [
        "Tech stack qualification (React, Node, Python, AWS, DevOps)",
        "Desired squad roles & seniority allocation",
        "Target start date and timezone overlap needs"
      ]
    },
    {
      step: "02",
      title: "Discovery & Architecture Consult",
      subtitle: "Technical Roadmap",
      icon: Search,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      description: "Consultative architecture review with a Senior Sovereign2Fresh Empire Architect to define project milestones, delivery SLAs, and security standards.",
      details: [
        "System architecture & code base review",
        "Security, HIPAA/GDPR & compliance alignment",
        "Sprint cadence & milestone delivery schedule"
      ]
    },
    {
      step: "03",
      title: "Internal Resource Assessment",
      subtitle: "Talent Matching",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      description: "Agency leadership evaluates internal verified talent pool to reserve capacity or assemble specialized engineering squads.",
      details: [
        "Availability verification across top 3% talent registry",
        "Peer skill alignment & stack compatibility check",
        "Seniority & leadership assignment"
      ]
    },
    {
      step: "04",
      title: "Build & Reserve Team Squad",
      subtitle: "Squad Assembly",
      icon: Users,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      description: "Sovereign2Fresh Empire selects and reserves specific engineers (e.g. 2 Backend, 1 Frontend, 1 UI/UX, 1 QA Automation, 1 Tech Lead).",
      details: [
        "Dedicated squad configuration tailored to project",
        "Developer profile portfolio packages provided to client",
        "Instant talent reservation"
      ]
    },
    {
      step: "05",
      title: "Dual-Layer Contracting & NDAs",
      subtitle: "Legal Protection",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      description: "Agency signs Master Services Agreement (MSA) with client. All talent signs strict binding NDAs and IP assignment contracts with Sovereign2Fresh Empire.",
      details: [
        "100% Client Intellectual Property Ownership",
        "Dual binding Non-Disclosure Agreements",
        "Disintermediation & liability safeguards"
      ]
    },
    {
      step: "06",
      title: "Agile Project Execution & QA",
      subtitle: "Sprint Delivery",
      icon: Code2,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      description: "Daily agile standups, weekly progress demos to client, continuous code review by Sovereign2Fresh Empire Tech Lead, and automated QA testing.",
      details: [
        "Dedicated Sovereign2Fresh Empire Tech Lead oversight on all PRs",
        "Weekly progress reports & client sprint reviews",
        "48-Hour Talent Replacement Guarantee active"
      ]
    },
    {
      step: "07",
      title: "Centralized Payment Settlement",
      subtitle: "Financial Assurance",
      icon: DollarSign,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      description: "Single client invoice settled with Sovereign2Fresh Empire. Sovereign2Fresh Empire handles cross-border payroll, currency management, and talent disbursements.",
      details: [
        "Transparent billing (Retainer, T&M, or Fixed Milestone)",
        "Cross-border SWIFT / Wise / Escrow handling",
        "No payroll overhead or international tax burden for client"
      ]
    }
  ];

  return (
    <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 bg-sage-banner text-[#0f1d31] border-b border-[#b8c8e0] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d0ddef] border border-[#a8bdd8] text-[#0f1d31] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>End-to-End Operational Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1d31] tracking-tight font-heading break-words">
            The 7-Step Agency Delivery <span className="text-[#1d4ed8]">Workflow.</span>
          </h2>
          <p className="text-slate-700 text-xs sm:text-base leading-relaxed">
            Our structured, high-touch operational workflow guarantees technical excellence, seamless communication, and risk-free project delivery.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 scrollbar-none justify-start lg:justify-center w-full max-w-full min-w-0 px-1">
          {steps.map((s, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-3.5 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f1d31] text-white border-[#2563eb] shadow-md scale-105'
                    : 'bg-white text-slate-700 border-[#b8c8e0] hover:bg-[#e0e8f4]'
                }`}
              >
                <span className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] ${
                  isSelected ? 'bg-[#2563eb] text-white font-extrabold' : 'bg-slate-100 text-slate-700'
                }`}>
                  {s.step}
                </span>
                <span className="whitespace-nowrap">{s.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Step Visual Card */}
        <div className="bg-[#0f1d31] text-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#2563eb] shadow-xl overflow-hidden relative w-full min-w-0">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-[#b5d6b2] font-heading bg-[#0a1628] px-4 py-1.5 rounded-2xl border border-[#2d4d38]">
                  Step {steps[activeStep].step}
                </span>
                <div>
                  <span className="text-xs font-extrabold text-[#60a5fa] uppercase tracking-widest">
                    {steps[activeStep].subtitle}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-heading">
                    {steps[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-200 text-base leading-relaxed font-normal">
                {steps[activeStep].description}
              </p>

              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Deliverables & Operational Safeguards</p>
                {steps[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 bg-[#0a1628] p-3 rounded-xl border border-[#2d4d38]">
                    <CheckCircle2 className="w-4 h-4 text-[#60a5fa] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={openDiscoveryModal}
                  className="px-6 py-3.5 rounded-xl bg-[#2563eb] text-white font-extrabold text-xs hover:bg-[#1d4ed8] transition-all flex items-center gap-2 shadow-sm border border-[#69966c] active:scale-95 cursor-pointer"
                >
                  <span>Initiate Step 01 Consult</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side: Step Photography Image */}
            <div className="lg:col-span-5 relative image-card-zoom">
              <div className="h-80 rounded-3xl overflow-hidden border-2 border-[#2563eb]/40 shadow-xl relative">
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d31] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0f1d31]/90 border border-[#2563eb] text-xs font-bold text-white flex items-center justify-between">
                  <span>Step {steps[activeStep].step}: {steps[activeStep].subtitle}</span>
                  <span className="text-[#60a5fa]">S2F Empire Ops</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
