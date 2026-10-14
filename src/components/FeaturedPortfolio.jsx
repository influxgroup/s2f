import React from 'react';
import { ArrowRight, ExternalLink, Briefcase, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function FeaturedPortfolio({ setActiveTab, openDiscoveryModal }) {
  const { content } = useCms();

  const fallbackProjects = [
    {
      id: 1,
      title: "CV Transformer (AI SaaS Platform)",
      category: "AI & Enterprise",
      client: "CV Transformer SaaS",
      flag: "🌐",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      stacks: ["React.js", "Node.js", "AI Pipelines", "Firebase"],
      metrics: [
        { label: "Docs Generated", value: "15,000+" },
        { label: "Parsing Time", value: "< 4s" },
        { label: "ATS Match", value: "98%" }
      ],
      summary: "AI-driven career automation platform with intelligent resume parsing, automated cover letter generation, and ATS optimization."
    },
    {
      id: 2,
      title: "AI Employee Appraisal System",
      category: "AI & Enterprise",
      client: "Zeenab Foods Ltd.",
      flag: "🇳🇬",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      stacks: ["React.js", "Node.js", "Prompt Engineering"],
      metrics: [
        { label: "Review Time", value: "-75%" },
        { label: "Staff Evaluated", value: "100+" },
        { label: "Audit Accuracy", value: "100%" }
      ],
      summary: "360-degree enterprise performance evaluation engine digitizing multi-department appraisal cycles across corporate food distribution."
    },
    {
      id: 6,
      title: "CNTH Multivendor E-Commerce Store",
      category: "E-Commerce & EdTech",
      client: "CNTH Multivendor",
      flag: "🇳🇬",
      image: "https://images.unsplash.com/photo-1556742049-0a6756574358?auto=format&fit=crop&w=800&q=80",
      stacks: ["React.js", "Node.js", "Payment Gateways", "REST APIs"],
      metrics: [
        { label: "Active Vendors", value: "120+" },
        { label: "Orders Processed", value: "45,000+" },
        { label: "Payout Time", value: "Instant" }
      ],
      summary: "Scalable marketplace supporting multi-merchant storefronts, real-time escrow vendor payouts, and high-concurrency checkout."
    }
  ];

  const rawProjects = Array.isArray(content?.portfolio)
    ? content.portfolio
    : fallbackProjects;
  const projects = rawProjects.slice(0, 3);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Real-World Engineering <span className="text-blue-600">Case Studies.</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Explore how Sovereign2Fresh Empire delivers enterprise-grade software, AI automation, and secure web infrastructure for modern organizations.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View All {content?.portfolio?.length || 12} Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const stackArray = Array.isArray(project.stacks)
              ? project.stacks
              : typeof project.stacks === 'string'
              ? project.stacks.split(',').map(s => s.trim()).filter(Boolean)
              : [];

            const metricsList = Array.isArray(project.metrics) && project.metrics.length > 0
              ? project.metrics
              : [
                  { label: project.metric1Label || 'Performance', value: project.metric1Value || '99.9%' },
                  { label: project.metric2Label || 'Delivery', value: project.metric2Value || 'On Time' },
                  { label: 'Client Satisfaction', value: '100%' }
                ];

            const coverImage = project.image || (Array.isArray(project.images) && project.images[0]) || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={project.id || idx}
                onClick={() => {
                  setActiveTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-40 overflow-hidden border-b border-slate-100 bg-slate-900">
                    <img
                      src={coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                        {project.category || 'Enterprise'}
                      </span>
                    </div>
                    {project.client && (
                      <span className="absolute bottom-2.5 right-2.5 text-[11px] bg-slate-950/80 backdrop-blur-md text-slate-200 px-2 py-0.5 rounded font-medium border border-white/10">
                        {project.flag || '🌐'} {project.client}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-normal">
                      {project.summary}
                    </p>

                    {stackArray.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {stackArray.slice(0, 4).map((tech, tIdx) => (
                          <span key={tIdx} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200/60">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Metrics Ribbon & Link */}
                <div className="p-4 pt-0 space-y-3">
                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2 rounded-lg border border-slate-200/80 text-center">
                    {metricsList.slice(0, 3).map((m, mIdx) => (
                      <div key={mIdx} className={mIdx > 0 ? "border-l border-slate-200" : ""}>
                        <p className="font-bold text-blue-700 text-xs font-heading">{m.value}</p>
                        <p className="text-[9px] text-slate-500 font-medium truncate mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors pt-0.5">
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
