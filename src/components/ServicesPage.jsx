import React from 'react';
import { Cloud, Code2, Cpu, ShieldCheck, CheckCircle2, ArrowRight, Layers, Users, Sparkles, ChevronRight, Monitor, ShoppingBag, Wheat } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const iconMap = {
  'flutter-mobile': Code2,
  'laravel-php': Layers,
  'python-django-ai': Cpu,
  'aws-devops': Cloud,
  'cybersecurity': ShieldCheck,
  'react-fullstack': Monitor,
};

export default function ServicesPage({ setActiveTab, openDiscoveryModal }) {
  const { content } = useCms();
  const servicesList = content?.services && content.services.length > 0 ? content.services : [];

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
          {servicesList.map((service) => {
            const IconComponent = iconMap[service.id] || Layers;
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
                    {service.rate && (
                      <span className="text-[9px] font-mono font-semibold text-slate-500">
                        {service.rate}
                      </span>
                    )}
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
