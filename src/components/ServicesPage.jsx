import React, { useState } from 'react';
import { 
  Cloud, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Lock, 
  Clock, 
  Monitor, 
  GraduationCap, 
  Smartphone,
  ExternalLink,
  Camera,
  Megaphone
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

const iconMap = {
  'react-fullstack': Monitor,
  'flutter-mobile': Smartphone,
  'cybersecurity': ShieldCheck,
  'aws-devops': Cloud,
  'python-django-ai': Cpu,
  'drone-aerial-services': Camera,
  'digital-marketing-branding': Megaphone,
  'corporate-training': GraduationCap,
};

// Fallback comprehensive enterprise services
const defaultEnterpriseServices = [
  {
    id: 'react-fullstack',
    title: 'Custom Enterprise Software & Web Platforms',
    badge: 'Web & SaaS Architecture',
    tagline: 'High-concurrency React and Next.js web applications, multi-tenant SaaS architectures, REST/GraphQL APIs, and mission-critical enterprise portals.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'Software Engineering',
    filterCategory: 'software',
    rate: 'Enterprise SLA',
    features: [
      'High-concurrency React & Next.js web architectures',
      'Multi-tenant SaaS platforms & microservices API design',
      '100% Client IP Assignment & Dual Binding NDAs'
    ],
    stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL']
  },
  {
    id: 'flutter-mobile',
    title: 'Enterprise Mobile Engineering (iOS & Android)',
    badge: 'Mobile Ecosystems',
    tagline: 'Native-performance cross-platform mobile apps with offline-first SQLite sync, biometric authentication, and payment gateway SDK integrations.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    category: 'Mobile Engineering',
    filterCategory: 'software',
    rate: 'End-to-End Delivery',
    features: [
      'Flutter & React Native cross-platform applications',
      'Offline-first encrypted SQLite database synchronization',
      'Payment gateway SDKs (Paystack, Stripe, Interswitch)'
    ],
    stack: ['Flutter', 'React Native', 'iOS', 'Android', 'SQLite']
  },
  {
    id: 'cybersecurity',
    title: 'Cyber Security Audits & Defensive Hardening',
    badge: 'Mission-Critical Defense',
    tagline: 'Offensive penetration testing, source code vulnerability remediation, Zero Trust access controls, and NDPR/ISO 27001 regulatory certifications.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    category: 'Cyber Security',
    filterCategory: 'security',
    rate: 'Certified Audit',
    features: [
      'Full black-box web application & API penetration testing',
      'Microsoft 365, Azure AD & Zero Trust privileged hardening',
      'Formal Letter of Attestation for regulators & enterprise clients'
    ],
    stack: ['OWASP Top 10', 'Kali Linux', 'Burp Suite', 'ISO 27001', 'NDPR'],
    isSecurity: true
  },
  {
    id: 'aws-devops',
    title: 'Cloud Infrastructure, DevOps & High-Availability',
    badge: 'Cloud & Infrastructure',
    tagline: 'Multi-cloud architectures across AWS, Azure, and GCP. Automated zero-downtime CI/CD pipelines, Kubernetes container orchestration, and 99.9% uptime SLAs.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud & DevOps',
    filterCategory: 'cloud',
    rate: '99.9% Uptime SLA',
    features: [
      'AWS EKS & Kubernetes container orchestration clusters',
      'Infrastructure-as-Code automation using Terraform & Ansible',
      '24/7 automated telemetry monitoring & disaster auto-recovery'
    ],
    stack: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform']
  },
  {
    id: 'python-django-ai',
    title: 'Enterprise AI, Private RAG & Intelligent Automation',
    badge: 'AI & Automation',
    tagline: 'Production-ready AI agents, document processing pipelines, and air-gapped Retrieval-Augmented Generation (RAG) engines safeguarding proprietary data.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'AI & Automation',
    filterCategory: 'ai',
    rate: 'Custom AI Solution',
    features: [
      'Private Enterprise RAG search engines for internal data',
      'FastAPI async microservices with Celery & Redis task queues',
      'High-accuracy automated document processing & extraction'
    ],
    stack: ['Python', 'FastAPI', 'PyTorch', 'LangChain', 'Pinecone']
  },
  {
    id: 'drone-aerial-services',
    title: 'Commercial Drone Services & Aerial Land Mapping',
    badge: 'Aerial & Geospatial Media',
    tagline: 'High-definition 4K/6K aerial cinematography, 3D topographical land surveys, architectural progress tracking, and asset inspection for luxury real estate, commercial properties, and infrastructure developments.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    category: 'Drone & Media',
    filterCategory: 'drone',
    rate: 'Custom Flight Scope',
    features: [
      'High-resolution 4K/6K cinematic video for luxury real estate & estates',
      'Precision topographical surveys & orthomosaic 3D site reconstruction',
      'Certified commercial drone pilots with full airspace regulatory authorization'
    ],
    stack: ['4K/6K Cinema Drone', 'Aerial Land Surveys', 'Orthomosaic 3D', 'Real Estate Filming', 'Asset Inspection']
  },
  {
    id: 'digital-marketing-branding',
    title: 'Digital Marketing, Social Media & Brand Architecture',
    badge: 'Growth & Brand Strategy',
    tagline: 'Full-spectrum digital marketing campaigns, executive social media management, bespoke brand identity design, high-converting ad funnels, and data-driven customer acquisition across global channels.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Digital Marketing',
    filterCategory: 'marketing',
    rate: 'Campaign Engagements',
    features: [
      'End-to-end social media growth, content production & community management',
      'Performance ad funnels (Meta, Google, LinkedIn) optimized for ROI',
      'Corporate brand identity guidelines, visual assets & conversion design'
    ],
    stack: ['Brand Identity', 'Social Media Management', 'Performance Marketing', 'SEO & SEM', 'Creative Content']
  },
  {
    id: 'corporate-training',
    title: 'Corporate IT Academy & Executive Cyber Defense',
    badge: 'Workforce Enablement',
    tagline: 'Hands-on technical upskilling cohorts for engineering staff, executive cyber risk briefings, phishing simulations, and corporate certification programs.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    category: 'IT Training',
    filterCategory: 'training',
    rate: 'Cohort Programs',
    features: [
      'Simulated phishing campaigns & employee threat awareness drills',
      'Board-level executive cyber governance & compliance briefings',
      'Hands-on technical software & cloud engineering cohorts'
    ],
    stack: ['Live Labs', 'Phishing Sims', 'Executive Briefings', 'Certification']
  }
];

export default function ServicesPage({ setActiveTab, openDiscoveryModal }) {
  const { content } = useCms();
  const [activeFilter, setActiveFilter] = useState('all');

  // Merge CMS items or fallback to enhanced defaults
  const servicesList = defaultEnterpriseServices.map((defService) => {
    const cmsMatch = content?.services?.find(s => s.id === defService.id);
    return cmsMatch ? { ...defService, ...cmsMatch } : defService;
  });

  const filteredServices = activeFilter === 'all'
    ? servicesList
    : servicesList.filter(s => s.filterCategory === activeFilter || s.category?.toLowerCase().includes(activeFilter));

  const filterTabs = [
    { id: 'all', label: 'All Services' },
    { id: 'software', label: 'Software & Web' },
    { id: 'security', label: 'Cyber Security' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'drone', label: 'Drone & Aerial' },
    { id: 'marketing', label: 'Marketing & Branding' },
    { id: 'training', label: 'Corporate Academy' },
  ];

  return (
    <div className="bg-[#edf1f7] text-[#0f1d31] min-h-[90vh] py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ─── Page Hero Banner ─── */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f1d31] tracking-tight font-heading leading-tight">
            Premier Enterprise IT Solutions & <span className="text-blue-700">Digital Capabilities.</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Bespoke software development, mission-critical cyber defense, cloud systems, and intelligent automation built for business enterprises, government institutions, and private firms.
          </p>
        </div>

        {/* ─── Interactive Filter Navigation Tabs ─── */}
        <div className="flex items-center justify-center">
          <div className="p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-300/80 shadow-xs flex flex-wrap gap-1 max-w-full justify-center">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-[#0f1d31] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── 3-Column Modern Service Cards Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.id] || Layers;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* High-Resolution Photo Header with Badge Overlay */}
                  <div className="relative h-48 sm:h-52 overflow-hidden border-b border-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                    
                    {/* Top Category Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                        <IconComponent className="w-3.5 h-3.5 text-blue-400" />
                        <span>{service.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Value Proposition */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    {service.stack && service.stack.length > 0 && (
                      <div className="pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {service.stack.map((item, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0">
                  {service.isSecurity ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setActiveTab('cybersecurity');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer text-center"
                      >
                        <span>Cyber Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={openDiscoveryModal}
                        className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-center"
                      >
                        <span>Book Audit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={openDiscoveryModal}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-sm group-hover:bg-blue-600"
                    >
                      <span>Request Project Scoping</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* ─── Enterprise Engineering Guarantees Matrix ─── */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f1d31] font-heading">
              How We Deliver Enterprise Technology
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Contractual reliability, verified engineering standards, and zero vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#0f1d31] text-base">Full Sovereign IP Ownership</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                100% of all intellectual property, source repositories, documentation, and cloud deployment pipelines are transferred to your organization under binding legal NDAs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#0f1d31] text-base">Zero Technical Debt Protocol</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Every release passes automated static analysis, security vulnerability audits, and peer architecture reviews before production deployment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#0f1d31] text-base">Guaranteed 24/7 SLA Continuity</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Contractual emergency response SLAs, proactive telemetry monitoring, and dedicated technical leadership on call for rapid containment and zero-downtime maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Bottom Custom Consultation Callout ─── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1d31] text-white border border-blue-600/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-blue-400 font-extrabold text-xs uppercase tracking-widest">
              Custom Architecture & Complex Systems
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              Have unique enterprise requirements or large-scale legacy migration?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Consult with our Senior Solutions Architects for technical feasibility, architectural blueprints, and fixed-scope delivery timelines.
            </p>
          </div>

          <button
            onClick={openDiscoveryModal}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer shadow-lg shadow-blue-900/50 border border-blue-400/40"
          >
            <span>Book Technical Consult</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
