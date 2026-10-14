import React from 'react';
import { ArrowRight, Code2, ShieldCheck, FileCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function DifferentiationMatrix({ openDiscoveryModal }) {
  const standards = [
    {
      title: "Production-Grade Architecture",
      description: "Modern React, Next.js, Node.js, and Python systems engineered for high performance, modular architecture, and zero-downtime cloud scalability.",
      features: [
        "Modern Full-Stack Architectures",
        "Clean REST & GraphQL Microservices",
        "Automated CI/CD & Cloud Infrastructure"
      ]
    },
    {
      title: "Built-In Cyber Security Baseline",
      description: "Security is embedded into every development sprint with vulnerability audits, OWASP Top 10 mitigation, and identity management hardening.",
      features: [
        "Vulnerability Scans & Code Audits",
        "Encrypted APIs & Access Controls",
        "ISO 27001 & SOC 2 Aligned Best Practices"
      ]
    },
    {
      title: "100% Client Intellectual Property",
      description: "Complete ownership of every line of code, repository, and design asset from day one, backed by international NDAs and clear assignment terms.",
      features: [
        "Direct Client IP Assignment",
        "Dual-Jurisdiction Binding NDAs",
        "Zero Vendor Lock-in or Licensing Fees"
      ]
    },
    {
      title: "Transparent Agile Delivery",
      description: "Clear milestone roadmaps, weekly working software demos, direct Git repository access, and dedicated technical leadership oversight.",
      features: [
        "Direct Git & Code Repository Access",
        "Weekly Demos & Milestone Reviews",
        "Direct Communication with Lead Engineers"
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Enterprise Engineering Standards & <span className="text-blue-600">Guarantees.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            How Sovereign2Fresh Empire delivers robust software systems, verified cybersecurity controls, and complete intellectual property protection.
          </p>
        </div>

        {/* 4-Card Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standards.map((standard, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 hover:border-blue-400 hover:shadow-xs transition-all"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                {standard.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {standard.description}
              </p>

              <div className="pt-2 space-y-2 border-t border-slate-200/80">
                {standard.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-white text-base sm:text-lg font-heading">
              Ready to build or secure your next digital platform?
            </h4>
            <p className="text-xs text-slate-400">
              Schedule a technical consultation to review your project scope, architecture requirements, and timeline.
            </p>
          </div>
          <button
            onClick={openDiscoveryModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs active:scale-95"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
