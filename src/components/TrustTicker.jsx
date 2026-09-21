import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

export default function TrustTicker() {
  const targetMarkets = [
    { country: "Nigeria", flagUrl: "https://flagcdn.com/w40/ng.png" },
    { country: "United States", flagUrl: "https://flagcdn.com/w40/us.png" },
    { country: "United Kingdom", flagUrl: "https://flagcdn.com/w40/gb.png" },
    { country: "Canada", flagUrl: "https://flagcdn.com/w40/ca.png" },
    { country: "European Union", flagUrl: "https://flagcdn.com/w40/eu.png" },
  ];

  const techLogos = [
    { name: "Flutter & React Native", icon: "📱" },
    { name: "PHP & Laravel", icon: "🔴" },
    { name: "Python & Django / FastAPI", icon: "🐍" },
    { name: "React & Next.js", icon: "⚡" },
    { name: "AWS Cloud Infrastructure", icon: "☁️" },
    { name: "Kubernetes & Docker", icon: "🐳" },
    { name: "Cyber Security & OWASP", icon: "🛡️" },
    { name: "PostgreSQL & Redis", icon: "🐘" },
  ];

  return (
    <section className="py-6 sm:py-8 bg-[#0a1322] border-y border-blue-900/40 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-5 w-full min-w-0">
        
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#60a5fa] shrink-0">
            <Globe className="w-4 h-4 text-[#60a5fa]" />
            <span>Serving Enterprise Clients In:</span>
          </div>

          {/* Country Badges with Real Flag Images (Guaranteed crisp flags on Windows & all platforms) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold">
            {targetMarkets.map((market, idx) => (
              <span
                key={idx}
                className="bg-[#0f1d31] border border-blue-800/40 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs shadow-sm hover:border-blue-500/50 transition-colors"
              >
                <img
                  src={market.flagUrl}
                  alt={`${market.country} Flag`}
                  className="w-4.5 h-3 object-cover rounded-[2px] shadow-xs"
                />
                <span className="font-medium text-slate-200">{market.country}</span>
              </span>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-[#60a5fa] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#60a5fa]" /> 100% Legal & NDA Safeguarded
            </span>
          </div>

        </div>

        {/* Tech Stack Pills Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 border-t border-white/5">
          {techLogos.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f1d31]/80 border border-blue-800/30 text-xs font-semibold text-slate-300 hover:border-blue-500/50 hover:text-white transition-all cursor-default"
            >
              <span>{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
