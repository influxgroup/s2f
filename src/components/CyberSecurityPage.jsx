import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Terminal, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Building2, 
  Landmark, 
  Briefcase, 
  ChevronDown, 
  AlertTriangle,
  GraduationCap,
  FileCheck,
  Cpu,
  Clock
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function CyberSecurityPage({ openDiscoveryModal, setActiveTab }) {
  const { content } = useCms();
  const security = content?.cybersecurity || {};
  const contact = content?.contact || {};

  const headline = security.headline || 'Critical Cybersecurity Defense For Businesses, Governments & Private Firms.';
  const subheadline = security.subheadline || 'One unpatched exploit can halt your entire organization and destroy client trust. Sovereign2Fresh Empire delivers certified penetration testing, cloud defense, and 24/7 incident response to guarantee operational continuity.';
  const hotlinePhone = security.hotline || contact.phone || '+234 (0) 800-723-3674';
  const heroBadge = security.heroBadge || 'Sovereign Threat Intelligence & Penetration Testing';
  const securityEmail = security.email || contact.email || 'security@sovereign2freshempire.com';

  // Active audience tab for targeted solutions: 'business' | 'government' | 'private'
  const [activeAudience, setActiveAudience] = useState('business');

  // Active service filter: 'all' | 'offensive' | 'cloud' | 'compliance' | 'incident'
  const [activeServiceCategory, setActiveServiceCategory] = useState('all');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  // ─── Default Metrics Bar ───
  const defaultMetrics = [
    { value: "< 15 Mins", label: "Incident Response SLA" },
    { value: "100%", label: "NDPR & ISO Pass Rate" },
    { value: "Zero Leaks", label: "Air-Gapped Audits & NDAs" },
    { value: "$50M+", label: "Protected Client Assets" }
  ];
  const metrics = (Array.isArray(security.metrics) && security.metrics.length > 0)
    ? security.metrics
    : defaultMetrics;

  // ─── Target Sectors Data ───
  const defaultSectorSolutions = {
    business: {
      title: "Commercial Enterprises, Fintechs & Digital Platforms",
      subtitle: "Protect Transactional Rails, Customer Financial Data, and Business Continuity.",
      threatContext: "For fast-growing tech companies and fintechs, a single API flaw or credential compromise can cause multi-million dollar fraud losses, immediate operational shutdown, and catastrophic regulatory fines from central banks and data protection authorities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      stakes: [
        "Financial data exfiltration and payment gateway tampering",
        "Ransomware attacks causing weeks of downtime and revenue loss",
        "PCI-DSS, NDPR, and Central Bank compliance penalties"
      ],
      solutions: [
        {
          title: "Web & Mobile API Penetration Testing",
          desc: "Full black-box and grey-box security tests simulating realistic financial cyberattacks against your payment endpoints, authentication logic, and mobile app binaries."
        },
        {
          title: "DevSecOps & Source Code Hardening",
          desc: "Automated static and dynamic vulnerability scans integrated directly into GitHub/GitLab CI/CD pipelines before any code deploys to production."
        },
        {
          title: "Cloud IAM & Kubernetes Defense",
          desc: "Securing AWS/Azure environments, secret vaults, database encryption, and preventing accidental S3 or database exposures."
        }
      ]
    },
    government: {
      title: "Government Ministries, Departments & Agencies (MDAs)",
      subtitle: "Defend Sovereign Digital Assets, Citizen Records, and Public Infrastructure.",
      threatContext: "Public sector portals and state databases face continuous threats from foreign threat actors, cyber-extortion syndicates, and internal leaks. We provide national sovereignty-grade security audits, infrastructure isolation, and regulatory attestation.",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80",
      stakes: [
        "Espionage targeting sensitive policy documents and citizen databases",
        "Ransomware hijacking government revenue or administrative portals",
        "Public trust collapse and national security vulnerabilities"
      ],
      solutions: [
        {
          title: "Critical Infrastructure & Network Perimeter Audits",
          desc: "Hardening national databases, government portals, and internal networks against unauthorized access, zero-day exploits, and DDoS sabotage."
        },
        {
          title: "Sovereign Data Protection & NDPR Compliance",
          desc: "Ensuring government citizen records adhere strictly to the Nigeria Data Protection Act (NDPA), NDPR mandates, and ISO 27001 data residency standards."
        },
        {
          title: "Air-Gapped Systems & Digital Forensics",
          desc: "Isolated security evaluations, tamper-proof audit trails, and forensic incident investigations with zero risk of information leakage."
        }
      ]
    },
    private: {
      title: "Private Firms, Legal Practices & Executive Leadership",
      subtitle: "Secure Confidential M&A Transactions, Legal Files, and Board Communications.",
      threatContext: "Law firms, private equity groups, and corporate boards are prime targets for Business Email Compromise (BEC), spear-phishing, and corporate espionage during high-stakes mergers, litigations, and commercial negotiations.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      stakes: [
        "Leaked acquisition targets, contract negotiations, and privileged client files",
        "CEO / CFO impersonation and fraudulent wire transfer directives",
        "Reputational destruction and loss of high-net-worth client retainers"
      ],
      solutions: [
        {
          title: "Microsoft 365, Entra ID & Identity Hardening",
          desc: "Enforcing zero-trust conditional access, phishing-resistant Multi-Factor Authentication (MFA), and automated Data Loss Prevention (DLP) across SharePoint and email."
        },
        {
          title: "Executive Spear-Phishing Defense & Surveillance",
          desc: "Dark web executive credential monitoring, executive device encryption, and targeted threat intelligence to neutralize impersonation scams."
        },
        {
          title: "Protected Internal Channels & Secure File Rooms",
          desc: "Encrypted internal communication channels, watermarked virtual deal rooms, and granular role-based file access controls."
        }
      ]
    }
  };

  // ─── Default Core Security Services ───
  const defaultServicesList = [
    {
      id: "pentest",
      category: "offensive",
      title: "Penetration Testing & Red Teaming",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      summary: "Manual and automated simulated cyberattacks against web platforms, mobile apps, and internal network infrastructure to locate and seal critical vulnerabilities before adversaries strike.",
      deliverables: [
        "OWASP Top 10 Web & REST/GraphQL API Vulnerability Exploits",
        "iOS & Android Binary Security & Reverse Engineering Audits",
        "Executive Risk Scorecard with Proof-of-Concept Exploit Proof",
        "Line-by-Line Developer Remediation Code Patches"
      ]
    },
    {
      id: "cloud",
      category: "cloud",
      title: "Cloud & DevSecOps Infrastructure Hardening",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      summary: "Comprehensive architecture review of AWS, Azure, Google Cloud, and containerized Kubernetes clusters to eliminate misconfigurations and privileged access loopholes.",
      deliverables: [
        "Infrastructure-as-Code (Terraform / Docker) Security Audits",
        "CI/CD Pipeline Security Integration (Automated SAST & DAST)",
        "Secrets Vault Configuration & Zero-Trust IAM Policies",
        "Cloud Storage & Database Misconfiguration Remediation"
      ]
    },
    {
      id: "m365",
      category: "cloud",
      title: "Microsoft 365 & Enterprise Identity Governance",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      summary: "Fortifying enterprise Microsoft 365 environments, SharePoint repositories, and Intune device endpoints to prevent Business Email Compromise (BEC) and unauthorized data leakage.",
      deliverables: [
        "Entra ID / Azure AD Conditional Access & Phishing-Resistant MFA",
        "SharePoint & OneDrive Data Loss Prevention (DLP) Policies",
        "Intune Mobile Device Compliance & Remote Wipe Protocols",
        "Privileged Access Management (PAM) & Admin Account Audits"
      ]
    },
    {
      id: "compliance",
      category: "compliance",
      title: "Regulatory Compliance & Security Audits",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      summary: "Guiding organizations through international and national regulatory audits to achieve verified compliance, avoiding crippling fines and passing partner security reviews.",
      deliverables: [
        "ISO/IEC 27001:2022 Information Security Management (ISMS)",
        "SOC 2 Type I & Type II Readiness Gap Assessment",
        "Nigeria Data Protection Act (NDPA) & NDPR Compliance Sign-Off",
        "Official Attestation of Security for Enterprise Client Reviews"
      ]
    },
    {
      id: "incident",
      category: "incident",
      title: "24/7 Incident Response & Digital Forensics",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      summary: "Rapid incident containment, active ransomware eradication, root cause digital forensic analysis, and business restoration in the event of an active cyber crisis.",
      deliverables: [
        "Immediate Compromise & Ransomware Containment",
        "Digital Forensic Evidence Extraction & Chain-of-Custody Logs",
        "Adversary Eradication & Post-Incident Architecture Rebuild",
        "Formal Breach Forensic Report for Regulators & Insurers"
      ]
    },
    {
      id: "training",
      category: "compliance",
      title: "Corporate Cyber Academy & Staff Awareness",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      summary: "Transforming your workforce into your strongest security defense through realistic simulated phishing attacks, executive threat briefings, and developer secure coding labs.",
      deliverables: [
        "Executive & Boardroom Cyber Threat & Crisis Briefings",
        "Simulated Email Phishing & Social Engineering Drills",
        "Secure Coding Workshops for Software Engineering Teams",
        "Verifiable Corporate Cyber Completion Certification"
      ]
    }
  ];

  // ─── Default 4-Step Audit Protocol ───
  const defaultAuditPhases = [
    {
      step: "01",
      title: "Confidential Scoping & NDA Execution",
      desc: "We sign enforceable bilateral non-disclosure agreements before reviewing any system details. Clear engagement boundaries, testing authorization, and zero-downtime rules of engagement are formalized."
    },
    {
      step: "02",
      title: "Deep-Vector Penetration & Threat Simulation",
      desc: "Certified ethical hackers simulate real-world threat actors using proprietary exploit tools and manual testing across web endpoints, cloud configurations, databases, and APIs."
    },
    {
      step: "03",
      title: "Executive Scorecard & Developer Remediation",
      desc: "You receive an executive briefing highlighting high-risk business exposures alongside an exhaustive technical report containing line-by-line code patches and configuration instructions."
    },
    {
      step: "04",
      title: "Verification Re-Test & Formal Attestation",
      desc: "Once your engineering team applies the security fixes, we re-test every flagged vulnerability. Upon successful verification, we issue an official Letter of Security Attestation for your board, clients, and regulators."
    }
  ];

  // ─── Default Executive FAQs ───
  const defaultFaqs = [
    {
      q: "How do you guarantee that penetration testing will not cause downtime for our live users or transactions?",
      a: "Our certified security engineers utilize surgical, controlled testing techniques with pre-agreed rules of engagement. For high-volume production platforms, testing can be conducted during low-traffic maintenance windows or against exact staging replicas. We maintain live communication with your DevOps and IT lead throughout the exercise to ensure zero service disruption."
    },
    {
      q: "How is the confidentiality of our source code, customer data, and system credentials protected?",
      a: "Confidentiality is the bedrock of our business. Before receiving any access, Sovereign2Fresh Empire executes dual-jurisdiction binding Non-Disclosure Agreements. All security audits are conducted from encrypted, air-gapped workstations. We adhere strictly to zero-data-retention: all testing data and temporary credentials are cryptographically destroyed post-audit."
    },
    {
      q: "Do you issue official certificates and attestation letters that we can submit to regulators, insurers, and enterprise clients?",
      a: "Yes. Following remediation verification, we issue an official Sovereign2Fresh Empire Letter of Attestation and Security Scorecard. This document is widely accepted by enterprise procurement teams, global audit firms, insurance underwriters, and regulatory authorities (such as NDPC, Central Bank, and international compliance bodies) as proof of rigorous security posture."
    },
    {
      q: "What is your emergency response SLA if our organization suspects an active breach or ransomware infection?",
      a: "For confirmed emergency security incidents, our 24/7 Digital Forensics and Incident Response team initiates containment triage within 15 minutes of contact through our dedicated Emergency Incident Hotline. We isolate compromised nodes, stop lateral ransomware propagation, and preserve forensic artifacts."
    }
  ];

  // ─── Active Content Merging ───
  const sectorSolutions = security.sectorSolutions || defaultSectorSolutions;
  const servicesList = (Array.isArray(security.servicesList) && security.servicesList.length > 0)
    ? security.servicesList
    : defaultServicesList;
  const auditPhases = (Array.isArray(security.auditPhases) && security.auditPhases.length > 0)
    ? security.auditPhases
    : defaultAuditPhases;
  const faqs = (Array.isArray(security.faqs) && security.faqs.length > 0)
    ? security.faqs
    : defaultFaqs;

  const filteredServices = servicesList.filter(s => {
    if (activeServiceCategory === 'all') return true;
    return s.category === activeServiceCategory;
  });

  const currentSector = sectorSolutions[activeAudience] || defaultSectorSolutions[activeAudience] || defaultSectorSolutions.business;

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-blue-600 selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION: COMPACT EXECUTIVE CYBER DEFENSE BANNER
      ────────────────────────────────────────────────────────── */}
      <section className="relative text-white py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-500/25 overflow-hidden">
        
        {/* Cybersecurity Operations Center Backdrop Image with Dark Multi-Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 pointer-events-none"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80')` 
          }}
        />
        {/* Layered High-Contrast Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050c1c]/96 via-[#071329]/92 to-[#091836]/85 backdrop-blur-[1px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050c1c]/60 to-[#050c1c]/95 pointer-events-none" />
        
        {/* Subtle Bottom Horizon Accent */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">

          <div className="max-w-3xl space-y-3.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
              <span>{heroBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold text-white tracking-tight leading-tight font-heading">
              {headline}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-2xl">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={openDiscoveryModal}
                className="px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-900/40 cursor-pointer active:scale-95 border border-blue-400/40"
              >
                <ShieldCheck className="w-4 h-4 text-blue-100" />
                <span>Request Confidential Security Audit</span>
                <ArrowRight className="w-4 h-4 text-blue-100" />
              </button>

              <a
                href={`tel:${hotlinePhone.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-2.5 sm:py-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Emergency Hotline: {hotlinePhone}</span>
              </a>
            </div>
          </div>

          {/* Compact Trust Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-700/60">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-950/70 backdrop-blur-md border border-slate-700/60 p-3 sm:p-3.5 rounded-xl space-y-0.5">
                <div className={`text-lg sm:text-xl font-black font-mono ${
                  idx === 0 ? 'text-emerald-400' : idx === 1 ? 'text-blue-400' : idx === 2 ? 'text-white' : 'text-slate-200'
                }`}>
                  {m.value}
                </div>
                <p className="text-[11px] text-slate-300 font-medium">{m.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          2. SECTOR-SPECIFIC DEFENSE: BUSINESS, GOVERNMENT, PRIVATE
      ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Tailored Cybersecurity Defense By Sector.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Threat vectors differ fundamentally across commercial fintechs, government parastatals, and private corporate partnerships. We provide sector-engineered security architectures built for your specific legal and operational environment.
            </p>
          </div>

          {/* Sector Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveAudience('business')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                activeAudience === 'business'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>Commercial Enterprises & Fintechs</span>
            </button>

            <button
              onClick={() => setActiveAudience('government')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                activeAudience === 'government'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Landmark className="w-4 h-4 text-emerald-500" />
              <span>Government Ministries & Agencies</span>
            </button>

            <button
              onClick={() => setActiveAudience('private')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                activeAudience === 'private'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <span>Private Firms & Corporate Leadership</span>
            </button>
          </div>

          {/* Active Sector Detailed Showcase Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Sector Overview</span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-heading">
                    {currentSector.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-700 pt-1">
                    {currentSector.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {currentSector.threatContext}
                </p>

                {/* Key Risks Callout Box */}
                <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-rose-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Critical Business Risks We Eliminate:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-rose-800">
                    {currentSector.stakes.map((stake, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{stake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-900 relative shadow-xs">
                  <img
                    src={currentSector.image}
                    alt={currentSector.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">
                      Verified Security Defense Active
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Sector Concrete Defense Solutions */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
                Our Specific Deliverables for this Sector:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {currentSector.solutions.map((sol, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">{sol.title}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{sol.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={openDiscoveryModal}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                <span>Book Sector Security Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          3. CORE SERVICES GRID (PHOTO-DRIVEN CORPORATE CARDS)
      ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                Our Core Cybersecurity Capabilities.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Rigorous offensive and defensive security practices conducted in strict compliance with international frameworks.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none self-start md:self-auto">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'offensive', label: 'Offensive Audits' },
                { id: 'cloud', label: 'Cloud & Identity' },
                { id: 'compliance', label: 'Compliance & Training' },
                { id: 'incident', label: 'Incident Response' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeServiceCategory === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 overflow-hidden border-b border-slate-100 bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base font-heading group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {service.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                        Key Deliverables:
                      </div>
                      {service.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={openDiscoveryModal}
                    className="w-full py-2.5 rounded-lg bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-200 hover:border-slate-900 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Request Service Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          4. HOW WE WORK: 4-STAGE AUDIT & ASSURANCE PROTOCOL
      ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Our 4-Stage Security Audit Protocol.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              A structured, confidential engagement workflow engineered to protect live systems from operational interruption while uncovering deepest risk vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditPhases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-mono font-bold text-blue-700 text-sm">
                    {phase.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {phase.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Enforceable Milestone</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          5. HIGH-STAKES URGENCY CALLOUT & DIRECT CONSULTATION BANNER
      ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b1528] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
                  Don't Wait For A Ransom Note Or Data Leak To Test Your Defenses.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
                  The average enterprise data breach costs over $4.4 million, takes 277 days to fully identify, and results in severe commercial fallout. Sovereign2Fresh Empire provides immediate, confidential assessments to ensure your company remains resilient.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-2">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Confidentiality Guaranteed</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Bilateral Binding NDAs</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Data Retention Post-Audit</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={openDiscoveryModal}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                >
                  <Lock className="w-4 h-4" />
                  <span>Book Private Security Assessment</span>
                </button>

                <a
                  href={`mailto:${securityEmail}`}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Email Security Desk Directly</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ──────────────────────────────────────────────────────────
          6. FREQUENTLY ASKED QUESTIONS (EXECUTIVE ACCORDION)
      ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Frequently Asked Questions.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Direct answers regarding our security testing procedures, confidentiality protocols, and regulatory certifications.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-100/70 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
