import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WorkflowSection({ openDiscoveryModal }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      tabLabel: "Discovery & Architecture",
      title: "Technical Discovery & Architecture Blueprint",
      subtitle: "Scope & System Design",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      description: "We work directly with your team to analyze requirements, map out database schemas, design modular system architecture, and establish sprint milestones.",
      deliverables: [
        "Comprehensive Architecture Specification & Stack Selection",
        "Milestone Delivery Schedule & Sprint Roadmap",
        "Security, Scalability & Compliance Planning"
      ]
    },
    {
      step: "02",
      tabLabel: "Agile Development",
      title: "Full-Stack Development & Agile Sprints",
      subtitle: "Iterative Execution",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      description: "Our engineers build your software in structured 2-week agile sprints, featuring clean modular code, automated CI/CD pipelines, and weekly working demos.",
      deliverables: [
        "Direct Git Repository Collaboration & Clean Commit History",
        "Weekly Working Software Demos & Sprint Reviews",
        "Automated Unit & Integration Test Coverage"
      ]
    },
    {
      step: "03",
      tabLabel: "Security Auditing",
      title: "Cybersecurity Auditing & Code Hardening",
      subtitle: "Vulnerability Defense",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      description: "Before release, our security team conducts static and dynamic code audits, penetration testing, and cloud infrastructure hardening to eliminate vulnerabilities.",
      deliverables: [
        "OWASP Top 10 & API Vulnerability Assessment",
        "Cloud IAM, Environment Secrets & Database Hardening",
        "Technical Security Scorecard & Formal Attestation"
      ]
    },
    {
      step: "04",
      tabLabel: "Production & Support",
      title: "Production Rollout & Ongoing SLA Support",
      subtitle: "Cloud Launch & SLAs",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      description: "We execute zero-downtime production deployment, complete repository handover with 100% IP assignment, and provide reliable SLA-backed technical support.",
      deliverables: [
        "Zero-Downtime Cloud Deployment & Monitoring Setup",
        "100% Intellectual Property & Repository Handover",
        "Continuous Post-Launch Maintenance & Responsive SLA Support"
      ]
    }
  ];

  const current = steps[activeStep];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Project Delivery <span className="text-blue-600">Lifecycle.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            A transparent, 4-stage engineering process designed to take your software from concept to secure, high-scale production.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {steps.map((s, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {s.step}
                </span>
                <span>{s.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Phase {current.step} • {current.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Key Deliverables
                </div>
                {current.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={openDiscoveryModal}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-900 relative shadow-xs">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white text-[11px] font-medium">
                  Phase {current.step}: {current.tabLabel}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
