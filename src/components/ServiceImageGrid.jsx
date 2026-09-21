import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ServiceImageGrid({ setActiveTab, openDiscoveryModal }) {
  const services = [
    {
      title: "Mobile App & Web Development",
      category: "Flutter, React Native & Web",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      description: "Building native-performance iOS & Android mobile apps (Flutter, React Native) and modern web platforms (React, Next.js).",
      features: ["Flutter & React Native Cross-Platform", "Offline-First Mobile Architecture", "High-Performance React & Next.js"]
    },
    {
      title: "Enterprise Backend & Cloud APIs",
      category: "PHP, Laravel, Python & AWS",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      description: "Robust backend engines in PHP (Laravel) and Python (Django, FastAPI) integrated with AWS cloud infrastructure.",
      features: ["Laravel & PHP Microservices", "Django & FastAPI Async Backend", "AWS Cloud & Kubernetes DevOps"]
    },
    {
      title: "AI Engineering & LLM Automation",
      category: "Python AI & LangChain",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      description: "Building production LLM orchestration pipelines, RAG enterprise search engines, and custom predictive data models.",
      features: ["Python, PyTorch & LangChain LLMs", "Celery & Redis Background Tasks", "Custom AI Model Deployment"]
    },
    {
      title: "Cyber Security & IT Training",
      category: "Cyber Security & Certified Academy",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      description: "Penetration testing, vulnerability patch management, ISO 27001/OWASP security audits, and hands-on IT training.",
      features: ["Penetration Testing & Source Code Audit", "M365 & Entra ID Identity Hardening", "Certified Corporate Staff IT Training"]
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-white border-b border-[#b8c8e0]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#d0ddef] border border-[#a8bdd8] text-[#0f1d31] text-[11px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Vetted Technology Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f1d31] tracking-tight font-heading">
            Managed Engineering Capabilities & <span className="text-[#1d4ed8]">Squad Services.</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Full-lifecycle technical execution led by senior African IT professionals with guaranteed delivery standards.
          </p>
        </div>

        {/* 4-Column Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-[#f7faf6] rounded-2xl border border-[#b8c8e0] overflow-hidden shadow-sm hover:shadow-xl transition-all image-card-zoom flex flex-col justify-between group"
            >
              <div>
                {/* Compact Image Container */}
                <div className="relative h-44 overflow-hidden border-b border-[#b8c8e0]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#0f1d31] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#2563eb]">
                    {service.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-extrabold text-[#0f1d31] text-base font-heading group-hover:text-[#1d4ed8] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#d8e6d4]">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    if (service.category.includes('Cyber Security')) {
                      setActiveTab('cybersecurity');
                    } else {
                      openDiscoveryModal();
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0f1d31] text-white font-bold text-xs hover:bg-[#0b1525] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-sm"
                >
                  <span>{service.category.includes('Cyber Security') ? 'Explore Cyber Security & Training' : 'Request Service Squad'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
