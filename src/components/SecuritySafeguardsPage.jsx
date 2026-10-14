import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, Server, Key, Terminal, AlertTriangle, FileCheck } from 'lucide-react';

export default function SecuritySafeguardsPage({ setActiveTab, openDiscoveryModal }) {
  const safeguards = [
    {
      id: 'infrastructure',
      title: '1. Cloud Infrastructure & Perimeter Security',
      summary: 'Our cloud architectures leverage isolated Virtual Private Clouds (VPCs), strict security groups, web application firewalls (WAF), and automated DDoS mitigation.',
      details: [
        'Tier-4 data center hosting via AWS, Google Cloud, and Microsoft Azure.',
        'Zero public database endpoints; all relational and document stores sit inside isolated private subnets with bastion/VPN access only.',
        'Continuous perimeter threat scanning and automated patch deployment across all production cluster nodes.',
      ],
    },
    {
      id: 'encryption',
      title: '2. Cryptographic Controls & Data Encryption',
      summary: 'All client proprietary data, communications, and database records are safeguarded by current cryptographic ciphers.',
      details: [
        'Data in Transit: Mandatory TLS 1.3 encryption across all public interfaces and internal microservice mesh routes.',
        'Data at Rest: AES-256 encryption across storage volumes, database tables, and object buckets with KMS key rotation.',
        'Hardware-backed secrets management (AWS KMS, HashiCorp Vault) to ensure zero plaintext API keys in configuration files.',
      ],
    },
    {
      id: 'secure-sdlc',
      title: '3. Secure Software Development Lifecycle (SDLC)',
      summary: 'Security is integrated directly into our CI/CD pipelines from the initial commit to deployment.',
      details: [
        'Automated Static Application Security Testing (SAST) and dynamic vulnerability analysis integrated into GitHub Actions pipelines.',
        'Dependency vulnerability auditing (Dependabot, Snyk) with automated alerts for CVE updates.',
        'Mandatory peer review on 100% of pull requests prior to merging into production branches.',
        'Strict separation between Development, Staging, and Production deployment environments.',
      ],
    },
    {
      id: 'access-identity',
      title: '4. Identity & Access Management (IAM)',
      summary: 'We enforce the Principle of Least Privilege across all engineering and management accounts.',
      details: [
        'Mandatory Multi-Factor Authentication (MFA) via authenticator apps or FIDO2 hardware security keys.',
        'Role-Based Access Control (RBAC) ensuring developers only access the specific client repositories to which they are assigned.',
        'Immediate automated session de-provisioning upon engineer off-boarding or contract completion.',
      ],
    },
    {
      id: 'drone-aerial-security',
      title: '5. Commercial Drone & Aerial Survey Security',
      summary: 'Rigorous chain-of-custody protocols for all drone flight telemetry, raw 4K cinema media, and topographical point cloud surveys.',
      details: [
        'Physical chain-of-custody: Flight memory media is retrieved by licensed remote pilots and transferred directly to encrypted local workstations.',
        'Firmware-level geofencing and flight safety failsafes adhering to civil aviation airspace regulations.',
        'Raw photographic surveys and photogrammetry models are isolated in client-specific encrypted buckets with timed access tokens.',
      ],
    },
    {
      id: 'nda-ip-isolation',
      title: '6. Code Isolation & Mutual NDAs',
      summary: 'Dual-binding Non-Disclosure Agreements safeguard all commercial engagements and intellectual assets.',
      details: [
        'Every Sovereign2Fresh engineer signs binding intellectual property assignment and confidentiality clauses before joining a client project.',
        'Client source code is strictly ring-fenced; code from one client is never shared, reused, or exposed to another engagement.',
        'Client data is never used to train public generative AI or LLM models without explicit written permission.',
      ],
    },
    {
      id: 'incident-response',
      title: '7. Incident Response & 24/7 Monitoring',
      summary: 'Automated monitoring alerts our engineering operations leads to anomalies in real time.',
      details: [
        'Centralized log aggregation with immutable audit trails for all administrative actions.',
        'Designated Security Operations lead with a 4-hour critical incident triage and mitigation SLA.',
        'Formal post-mortem analysis and transparent reporting delivered to affected clients following any detected anomaly.',
      ],
    },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link & Header Bar */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-200">
          <button
            onClick={() => {
              setActiveTab('agency');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Back to Home</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            SOC 2 / ISO 27001 Aligned
          </span>
        </div>

        {/* Header Block */}
        <div className="pt-10 pb-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
            Enterprise Security Safeguards
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            At Sovereign2Fresh Empire Ltd., security is an active engineering discipline. We build and operate high-availability systems with defense-in-depth architecture, rigorous cryptographic safeguards, and certified airspace compliance.
          </p>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">

          {/* Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Safeguard Domains
              </h2>
              <nav className="space-y-1.5">
                {safeguards.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="block w-full text-left text-xs text-slate-600 hover:text-blue-600 py-1 transition-colors cursor-pointer truncate"
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">Need our SOC2 report or vendor security questionnaire completed?</p>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Security Packet</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </aside>

          {/* Detailed Security Pillars */}
          <div className="lg:col-span-8 space-y-6">

            {safeguards.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs"
              >
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                  {sec.title}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {sec.summary}
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {sec.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Responsible Disclosure Section */}
            <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Responsible Vulnerability Disclosure
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We welcome reports from ethical security researchers. If you believe you have discovered a security vulnerability affecting Sovereign2Fresh Empire platforms or client infrastructure, please contact our security team immediately. We commit to acknowledging receipt within 24 hours.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
                <a
                  href="mailto:security@sovereign2fresh.com"
                  className="text-sky-400 hover:text-sky-300 font-semibold underline"
                >
                  security@sovereign2fresh.com
                </a>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-400">PGP Key available upon request</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
