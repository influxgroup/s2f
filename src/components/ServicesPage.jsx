import React from 'react';
import { Cloud, Code2, Cpu, ShieldCheck, CheckCircle2, ArrowRight, Layers, Users, Sparkles, ChevronRight, Monitor, ShoppingBag, Wheat } from 'lucide-react';

export default function ServicesPage({ setActiveTab, openDiscoveryModal }) {
  const serviceOfferings = [
    {
      id: 'flutter-mobile',
      icon: Code2,
      title: 'Flutter & React Native Cross-Platform Mobile Apps',
      badge: 'iOS & Android',
      tagline: 'High-performance Flutter and React Native mobile applications with offline SQLite sync, BLoC state management, and native device plugins.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'laravel-php',
      icon: Layers,
      title: 'PHP & Laravel Enterprise SaaS Engineering',
      badge: 'Backend Architecture',
      tagline: 'Scalable PHP and Laravel REST APIs, Inertia.js microservices, payment gateways (Stripe, Paystack), and high-concurrency MySQL/Redis databases.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'python-django-ai',
      icon: Cpu,
      title: 'Python, Django & AI RAG LLM Workflows',
      badge: 'AI & Automation',
      tagline: 'Python FastAPI async engines, Django REST frameworks, LangChain GenAI RAG pipelines, and automated background workers with Celery & Redis.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'aws-devops',
      icon: Cloud,
      title: 'AWS Cloud Architecture, DevOps & Kubernetes',
      badge: 'Cloud & Infrastructure',
      tagline: 'AWS EKS Kubernetes clusters, Infrastructure-as-Code (Terraform), Serverless AWS Lambda microservices, and automated zero-downtime CI/CD pipelines.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cybersecurity',
      icon: ShieldCheck,
      title: 'Cybersecurity Assessments & Code Hardening',
      badge: 'ISO 27001 & OWASP',
      tagline: 'Vulnerability assessments, OWASP code remediation, penetration testing, security auditing, and anonymous whistleblower portals.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'react-fullstack',
      icon: Monitor,
      title: 'React.js, Next.js & Modern Web Platforms',
      badge: 'Frontend Excellence',
      tagline: 'Ultra-fast React and Next.js web applications, complex Redux/Zustand state management, and high-converting enterprise portals.',
      image: 'https://images.unsplash.com/photo-1556742049-0a6756574358?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-10 px-4 lg:px-8 bg-gradient-to-b from-[#edf1f7] via-[#e2eaf5] to-[#edf1f7] text-[#0f1d31] min-h-[85vh] relative">
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header Section */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900/10 border border-blue-500/20 text-[#2563eb] text-[11px] font-extrabold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Proven Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f1d31] tracking-tight font-heading">
            Enterprise IT, AI & <span className="text-[#1d4ed8]">Software Services.</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            Real-world technical services delivered for Nigerian enterprises, SMEs, and international clients.
          </p>
        </div>

        {/* Unique Asymmetric Horizontal Micro-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-6xl mx-auto">
          {serviceOfferings.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={openDiscoveryModal}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-blue-200/80 shadow-xs hover:shadow-xl hover:border-blue-500 transition-all duration-300 group flex items-center gap-4 cursor-pointer hover:-translate-y-0.5"
              >
                {/* Left Thumbnail Image Accent */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden shadow-sm border border-blue-100 group-hover:border-blue-400 transition-colors">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d31]/70 via-transparent to-transparent" />
                  
                  {/* Floating Icon Overlay on Thumbnail */}
                  <div className="absolute bottom-2 left-2 w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-md">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Right Writeup Content Lockup */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-extrabold bg-blue-50 text-[#1d4ed8] px-2 py-0.5 rounded-md uppercase tracking-wider border border-blue-200/70">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-[#0f1d31] text-sm sm:text-base font-heading group-hover:text-[#1d4ed8] transition-colors truncate">
                    {service.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug line-clamp-2 font-medium">
                    {service.tagline}
                  </p>

                  <div className="pt-1 flex items-center gap-1 text-[11px] font-extrabold text-[#2563eb] group-hover:translate-x-1 transition-transform">
                    <span>Deploy Capability</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Squad Calculator Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl text-[#0f1d31] border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 border border-blue-200/80 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0f1d31] text-sm font-heading">Need a custom technical stack combination?</h4>
              <p className="text-xs text-slate-600 font-medium font-body">Configure your exact team composition using our interactive Squad Rate Calculator.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('calculator')}
            className="px-4 py-2 rounded-xl bg-[#0f1d31] hover:bg-[#1e293b] text-white font-extrabold text-xs transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer shadow-sm"
          >
            <span>Launch Squad Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
