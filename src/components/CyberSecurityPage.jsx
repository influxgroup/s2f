import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Terminal, 
  KeyRound, 
  Cpu, 
  GraduationCap, 
  CheckCircle2, 
  Zap, 
  Search, 
  FileText, 
  Globe, 
  Users, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  AlertTriangle,
  Server,
  Code2,
  FileCheck,
  Building,
  Sparkles,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function CyberSecurityPage({ openDiscoveryModal, setActiveTab }) {
  const { content } = useCms();
  const security = content?.cybersecurity || {};

  // ─── State 1: Active Pillar / Service Tab ───
  const [activePillarTab, setActivePillarTab] = useState('all');


  // ─── State 2: Interactive Security Audit Estimator ───
  const [infrastructureType, setInfrastructureType] = useState('web-app');
  const [assetCount, setAssetCount] = useState('medium');
  const [complianceGoal, setComplianceGoal] = useState('iso27001');

  // ─── State 3: Training Explorer Filters ───
  const [trainingFilter, setTrainingFilter] = useState('All');
  const [trainingSearch, setTrainingSearch] = useState('');

  // ─── State 4: FAQ Accordion Open State ───
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // ─── Calculated Audit Estimator Metrics ───
  const estimatorResult = useMemo(() => {
    let score = 65;
    let SLA = '3-5 Business Days';
    let scope = 'Standard Vulnerability Assessment & PenTest';
    let deliverables = ['Vulnerability Audit Report', 'Remediation Roadmap', 'Executive Summary'];

    if (infrastructureType === 'web-app') {
      score += 10;
      scope = 'Web & REST API Black-Box / Grey-Box Penetration Test';
    } else if (infrastructureType === 'm365') {
      score += 15;
      scope = 'M365 Tenant, Entra ID SSO & Intune Security Architecture Audit';
      deliverables.push('M365 Hardening Script', 'DLP Policy Configuration');
    } else if (infrastructureType === 'mobile') {
      score += 12;
      scope = 'iOS / Android Application Binary Security & API Audit';
    } else if (infrastructureType === 'enterprise') {
      score += 25;
      SLA = '7-10 Business Days';
      scope = 'Full Zero-Trust Infrastructure, Cloud & Red Team Attack Simulation';
      deliverables.push('Red Team Exploitation Log', 'Zero-Trust Architecture Blueprint');
    }

    if (assetCount === 'large') {
      score += 10;
      SLA = infrastructureType === 'enterprise' ? '10-14 Business Days' : '5-7 Business Days';
    }

    if (complianceGoal === 'iso27001' || complianceGoal === 'soc2') {
      deliverables.push('ISO 27001 / SOC 2 Compliance Gap Matrix');
    } else if (complianceGoal === 'central-bank') {
      deliverables.push('Regulatory Financial Cyber Mandate Audit Signoff');
    }

    return { score, SLA, scope, deliverables };
  }, [infrastructureType, assetCount, complianceGoal]);

  // ─── Core Cybersecurity Services Data ───
  const cybersecurityPillars = [
    {
      id: 'pentest',
      category: 'defensive',
      title: 'Penetration Testing & Red Teaming',
      icon: Terminal,
      badge: 'Offensive Audit',
      summary: 'Simulated real-world cyberattacks against web apps, APIs, networks, and mobile applications to identify critical vulnerabilities before malicious hackers exploit them.',
      highlights: [
        'OWASP Top 10 & API Security Vulnerability Audits',
        'Web, Mobile (iOS/Android) & REST/GraphQL API PenTesting',
        'Network Infrastructure & Firewall Security Penetration',
        'Executive Audit Reports with Verified Proof-of-Concept Exploit Logs'
      ]
    },
    {
      id: 'vulnerability',
      category: 'defensive',
      title: 'Vulnerability Management & Patch Governance',
      icon: ShieldAlert,
      badge: 'Continuous Defense',
      summary: 'Automated continuous threat scanning, patch management orchestration, and threat intelligence updates to keep your systems hardened against zero-day exploits.',
      highlights: [
        'Continuous Automated Vulnerability Scanning & Prioritization',
        'Patch Management Orchestration for Linux, Windows & Cloud Instances',
        'Zero-Day Vulnerability Advisory & Rapid Remediation',
        'Third-Party Asset Risk Audits'
      ]
    },
    {
      id: 'devsecops',
      category: 'architecture',
      title: 'Cloud & DevSecOps Security Hardening',
      icon: Cpu,
      badge: 'Secure SDLC',
      summary: 'Embed security into your software development lifecycle. Secure CI/CD pipelines, containerized environments, and cloud infrastructure with automated security controls.',
      highlights: [
        'Static & Dynamic Application Security Testing (SAST / DAST)',
        'Container & Kubernetes Cluster Security Hardening',
        'Terraform & Cloud Infrastructure-as-Code (IaC) Security Audits',
        'Secrets Management & Vault Configuration (HashiCorp, AWS Secrets)'
      ]
    },
    {
      id: 'm365',
      category: 'architecture',
      title: 'Microsoft 365, SharePoint & Intune Hardening',
      icon: Server,
      badge: 'Enterprise Identity',
      summary: 'Comprehensive security hardening for Microsoft 365 environments, SharePoint data governance, Intune mobile device management, and Entra ID access controls.',
      highlights: [
        'Azure AD / Entra ID Conditional Access & Multi-Factor Authentication (MFA)',
        'SharePoint Online & OneDrive Data Loss Prevention (DLP)',
        'Microsoft Intune Compliance Policies for Remote Work Devices',
        'Anonymous Voice Box & Protected Internal Reporting Channels'
      ]
    },
    {
      id: 'compliance',
      category: 'compliance',
      title: 'ISO 27001, SOC 2 & Regulatory Readiness',
      icon: FileCheck,
      badge: 'Global Compliance',
      summary: 'End-to-end guidance to achieve and maintain international cybersecurity compliance standards, protecting your company from regulatory fines and client audits.',
      highlights: [
        'ISO/IEC 27001:2022 Information Security Management System (ISMS)',
        'SOC 2 Type I & Type II Readiness Audits',
        'GDPR, HIPAA & Central Bank Cybersecurity Compliance Alignment',
        'Third-Party Vendor Risk Assessment & Contract Legal Safeguards'
      ]
    },
    {
      id: 'incident',
      category: 'defensive',
      title: '24/7 Incident Response & Digital Forensics',
      icon: Lock,
      badge: 'Emergency Response',
      summary: 'Rapid containment, malware analysis, and forensic evidence collection in the event of a security breach, ransomware attack, or unauthorized access attempt.',
      highlights: [
        'Rapid Ransomware & Compromise Containment',
        'Digital Forensic Analysis & Evidence Preservation',
        'Root Cause Vulnerability Identification & Threat Neutralization',
        'Post-Incident Security Hardening & Business Continuity Restore'
      ]
    }
  ];

  // ─── IT & Cybersecurity Training Courses ───
  const trainingCourses = [
    {
      id: 1,
      title: 'Enterprise Cyber Security Awareness for All Staff',
      category: 'Corporate Employee Awareness',
      level: 'All Staff',
      duration: '1-Day Intensive or Self-Paced Modules',
      format: 'Live Virtual / On-Site Corporate Cohort',
      certificate: 'Certified Cyber-Aware Employee (S2F Empire)',
      summary: 'Empower non-technical employees to spot phishing emails, prevent social engineering, maintain strong password hygiene, and adhere to secure remote working protocols.',
      modules: [
        'Recognizing Phishing, Smishing & Executive Impersonation',
        'Password Hygiene, MFA & Password Managers',
        'Safe Web Browsing & Wi-Fi Risk Avoidance',
        'Incident Reporting & Data Privacy Fundamentals'
      ]
    },
    {
      id: 2,
      title: 'DevSecOps & Secure Coding for Software Engineers',
      category: 'Engineering & DevSecOps',
      level: 'Intermediate - Advanced',
      duration: '2 Weeks (Interactive Live Coding Labs)',
      format: 'Hands-On Engineering Bootcamp',
      certificate: 'S2F Certified Secure Software Engineer',
      summary: 'Master OWASP Top 10 vulnerabilities, input sanitization, secure API design, JWT authentication security, and automated SAST/DAST tools in React, Node, Python, and PHP/Laravel.',
      modules: [
        'OWASP Top 10 Exploitation & Code Defense',
        'Input Validation, XSS & SQL Injection Mitigation',
        'Secure API Architecture & OAuth2 / JWT Hardening',
        'Integrating Security Scanners in GitHub Actions / GitLab CI'
      ]
    },
    {
      id: 3,
      title: 'Ethical Hacking & Penetration Testing Mastery',
      category: 'Ethical Hacking',
      level: 'Intermediate - Advanced',
      duration: '4 Weeks (Hands-On Lab Environments)',
      format: 'Live Lab & Red Team Attack Simulator',
      certificate: 'S2F Certified Penetration Specialist',
      summary: 'Practical hands-on training in network scanning, web application vulnerability exploitation, privilege escalation, Metasploit fundamentals, and writing executive audit reports.',
      modules: [
        'Network Reconnaissance & Port Scanning (Nmap, Nessus)',
        'Web Application Vulnerability Exploitation (Burp Suite)',
        'Privilege Escalation & Post-Exploitation Techniques',
        'Professional Remediation Reporting & Client Presentation'
      ]
    },
    {
      id: 4,
      title: 'Microsoft 365, Intune & Cloud Systems Administration',
      category: 'IT Admin & M365',
      level: 'Beginner - Intermediate',
      duration: '3 Weeks (Practical Admin Console Labs)',
      format: 'Live Admin Console Workshop',
      certificate: 'S2F M365 Security Administrator',
      summary: 'Comprehensive hands-on training for IT admins managing Microsoft 365 tenants, SharePoint governance, Intune mobile device management, and Azure Entra ID access controls.',
      modules: [
        'Microsoft 365 Tenant Setup & Domain Security',
        'Entra ID (Azure AD) Conditional Access & MFA',
        'Intune Device Enrollment, Compliance & App Deployment',
        'SharePoint Online Permissions & DLP Policies'
      ]
    },
    {
      id: 5,
      title: 'Executive Cyber Risk Governance & ISO/SOC2 Leadership',
      category: 'Corporate Employee Awareness',
      level: 'Executive & C-Suite',
      duration: '2-Day Executive Workshop',
      format: 'Executive Briefing & Strategy Session',
      certificate: 'S2F Cyber Risk & Compliance Leader',
      summary: 'Designed for CTOs, CISOs, Managing Directors, and IT Leads navigating compliance mandates, risk assessments, vendor risk management, and cyber insurance requirements.',
      modules: [
        'Enterprise Risk Assessment Frameworks & Risk Registries',
        'ISO 27001 & SOC 2 Roadmap Implementation',
        'Managing Vendor Risk & Legal Data Protection Mandates',
        'Crisis Management, Cyber Insurance & Breach Communications'
      ]
    }
  ];

  // Filtered Training Courses
  const filteredCourses = useMemo(() => {
    return trainingCourses.filter(course => {
      const matchesCategory = trainingFilter === 'All' || course.category === trainingFilter;
      const matchesSearch = 
        course.title.toLowerCase().includes(trainingSearch.toLowerCase()) ||
        course.summary.toLowerCase().includes(trainingSearch.toLowerCase()) ||
        course.modules.some(m => m.toLowerCase().includes(trainingSearch.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [trainingFilter, trainingSearch]);

  // ─── FAQ Data ───
  const faqs = [
    {
      question: 'Why does my enterprise need a dedicated Penetration Test or Security Audit?',
      answer: 'Cyber threats evolve continuously. Unvetted applications and unmonitored infrastructure carry hidden vulnerability vectors that can lead to catastrophic data breaches, ransomware demands, and severe regulatory fines. A Sovereign2Fresh Empire penetration test simulates realistic cyberattacks to uncover flaws before malicious hackers do, providing proof-of-concept evidence and step-by-step remediation code patches.'
    },
    {
      question: 'How do you protect client source code confidentiality during security audits?',
      answer: 'Security and non-disclosure are in our DNA. Prior to receiving or reviewing any client source code or credentials, Sovereign2Fresh Empire executes dual-layer binding NDAs and Master Services Agreements. All code audits are performed in air-gapped, encrypted environments, and no client data is ever retained post-audit.'
    },
    {
      question: 'Can Sovereign2Fresh Empire deliver customized corporate IT & Cybersecurity training for our global workforce?',
      answer: 'Yes! We deliver tailored corporate training cohorts remotely for international teams across the US, UK, Europe, Canada, and Africa, as well as on-site corporate workshops. Curriculums can be customized to match your company stack (e.g. React, Node, Python, M365, AWS, GCP) and compliance requirements.'
    },
    {
      question: 'How fast can a Penetration Testing project start once engaged?',
      answer: 'Once legal NDAs and Statement of Work (SOW) are executed, our certified security engineering squad can initiate reconnaissance and audit activities within 24 to 48 hours. Preliminary high-risk findings are communicated immediately, followed by the comprehensive audit report.'
    },
    {
      question: 'Do your IT & Cybersecurity training courses issue verified certificates?',
      answer: 'Yes. Every participant who completes the training modules and passes the practical hands-on assessment receives a digitally verifiable Sovereign2Fresh Empire Certificate of Completion, complete with a unique validation hash.'
    }
  ];

  return (
    <div className="bg-[#070e1b] text-slate-100 min-h-screen selection:bg-[#2563eb] selection:text-white relative">
      
      {/* Dynamic SEO Meta Schema Injection for Google Search Crawlers */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CyberSecurityService",
        "name": "Sovereign2Fresh Empire Cyber Security & IT Training",
        "provider": {
          "@type": "Organization",
          "name": "Sovereign2Fresh Empire Ltd.",
          "url": "https://sovereign2freshempire.com"
        },
        "areaServed": ["Global", "North America", "Europe", "Africa"],
        "description": "Enterprise penetration testing, vulnerability management, cloud DevSecOps hardening, Microsoft 365 security, ISO 27001/SOC2 compliance, and certified corporate IT cybersecurity training."
      }) }} />

      {/* ─── HERO SECTION: CYBER DEFENSE HUB ─── */}
      <section className="relative pt-12 pb-20 px-6 lg:px-12 overflow-hidden border-b border-blue-900/40 bg-gradient-to-b from-[#0a1628] via-[#070e1b] to-[#070e1b]">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* Live Status Ribbon */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cyber Shield Ops: Active & Monitoring</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>ISO 27001 & SOC 2 Aligned</span>
            </div>
            {security.hotline && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span>24/7 Hotline: {security.hotline}</span>
              </div>
            )}
          </div>

          {/* Main Headline & SEO H1 */}
          <div className="text-center lg:text-left space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-heading">
              {security.headline ? (
                security.headline
              ) : (
                <>
                  Enterprise <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">Cyber Security Defense</span> & Global IT Training.
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
              {security.subheadline || 'Shield your corporate applications, cloud infrastructure, and M365 environments against zero-day exploits. We provide certified penetration testing, DevSecOps hardening, regulatory compliance, and high-impact corporate IT training for global enterprises.'}
            </p>
          </div>

          {/* Call to Action Buttons */}

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={openDiscoveryModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 border border-blue-400/40 active:scale-95 cursor-pointer transition-all"
            >
              <Shield className="w-4 h-4 text-blue-200" />
              <span>Schedule Security Audit</span>
              <ArrowRight className="w-4 h-4 text-blue-200" />
            </button>

            <a
              href="#training-section"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.07] backdrop-blur-md hover:bg-white/[0.12] text-white font-extrabold text-xs tracking-wide border border-white/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer transition-all"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Explore IT Training Academy</span>
            </a>
          </div>

          {/* Key Assurance Statistics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl lg:text-3xl font-black text-white font-heading">100%</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Zero-Trust SDLC</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl lg:text-3xl font-black text-blue-400 font-heading">24/48 Hrs</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Audit Initiation SLA</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl lg:text-3xl font-black text-cyan-400 font-heading">OWASP & NIST</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Audit Standards</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl lg:text-3xl font-black text-indigo-400 font-heading">1,200+</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Engineers & Admins Trained</div>
            </div>
          </div>

        </div>
      </section>


      {/* ─── INTERACTIVE RISK ASSESSMENT & PENTEST CALCULATOR ─── */}
      <section className="py-16 px-6 lg:px-12 border-b border-blue-900/30 bg-[#091322]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive Audit Estimator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Calculate Your Enterprise <span className="text-blue-400">Cyber Risk & Scope.</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Select your organization's infrastructure parameters to calculate a preliminary risk assessment score and recommended security audit deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
              
              {/* Option 1: Infrastructure Type */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-400" />
                  1. Target Infrastructure Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'web-app', label: 'Web Application & API' },
                    { id: 'm365', label: 'M365 & Intune Enterprise' },
                    { id: 'mobile', label: 'Mobile App (iOS/Android)' },
                    { id: 'enterprise', label: 'Full Hybrid Infrastructure' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setInfrastructureType(opt.id)}
                      className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        infrastructureType === opt.id
                          ? 'bg-blue-600/30 border-blue-500 text-white shadow-md shadow-blue-600/20'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Asset Scale */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  2. Number of Systems / Repositories / User Accounts
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'small', label: '1 - 5 Assets' },
                    { id: 'medium', label: '6 - 20 Assets' },
                    { id: 'large', label: '20+ Enterprise' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setAssetCount(opt.id)}
                      className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        assetCount === opt.id
                          ? 'bg-blue-600/30 border-blue-500 text-white shadow-md shadow-blue-600/20'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Primary Compliance Goal */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-400" />
                  3. Primary Compliance & Security Requirement
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'iso27001', label: 'ISO 27001 / SOC 2 Audit' },
                    { id: 'owasp', label: 'OWASP PenTest & Patching' },
                    { id: 'central-bank', label: 'Central Bank / Financial' },
                    { id: 'zero-trust', label: 'Zero-Trust Architecture' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setComplianceGoal(opt.id)}
                      className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        complianceGoal === opt.id
                          ? 'bg-blue-600/30 border-blue-500 text-white shadow-md shadow-blue-600/20'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Results Output Card (Right Column) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0f1e36] to-[#0b1628] border border-blue-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
              
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400">Calculated Security Profile</span>
                <h3 className="text-xl font-extrabold text-white font-heading">Recommended Audit Scope</h3>
              </div>

              {/* Score Meter */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400">Assessed Threat exposure:</div>
                  <div className="text-sm font-extrabold text-amber-400 flex items-center gap-1.5 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Audit Recommended</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white font-heading">{estimatorResult.score}/100</div>
                  <div className="text-[10px] text-slate-400">Exposure Index</div>
                </div>
              </div>

              {/* Dynamic Scope Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="font-bold text-slate-300 uppercase tracking-wider">Scope Definition:</div>
                <p className="text-blue-200 font-semibold leading-relaxed bg-blue-950/60 p-3 rounded-xl border border-blue-800/40">
                  {estimatorResult.scope}
                </p>

                <div className="pt-2">
                  <div className="font-bold text-slate-300 uppercase tracking-wider mb-2">Key Deliverables Included:</div>
                  <ul className="space-y-2">
                    {estimatorResult.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
                  <span>Estimated Audit SLA:</span>
                  <span className="font-extrabold text-white">{estimatorResult.SLA}</span>
                </div>
              </div>

              <button
                onClick={openDiscoveryModal}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 border border-blue-400/40 active:scale-95 cursor-pointer transition-all"
              >
                <span>Request Custom Audit Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* ─── 6 CORE CYBERSECURITY PILLARS ─── */}
      <section className="py-20 px-6 lg:px-12 border-b border-blue-900/30 bg-[#070e1b]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Spectrum Defense</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Our 6 Core Enterprise <span className="text-blue-400">Cybersecurity Pillars.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed for enterprise CTOs, CISOs, and IT leadership requiring zero-compromise security controls, strict confidentiality, and certified code remediation.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Cybersecurity Pillars' },
              { id: 'defensive', label: 'Offensive & Defensive Controls' },
              { id: 'architecture', label: 'Cloud & M365 Hardening' },
              { id: 'compliance', label: 'ISO 27001 & Governance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePillarTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePillarTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/40'
                    : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cybersecurityPillars
              .filter(p => activePillarTab === 'all' || p.category === activePillarTab)
              .map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-blue-500/50 p-6 sm:p-7 rounded-3xl space-y-4 hover:bg-white/[0.05] transition-all group shadow-lg flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                          {pillar.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-white font-heading group-hover:text-blue-300 transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {pillar.summary}
                      </p>

                      <div className="pt-2 space-y-2 border-t border-white/10">
                        {pillar.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <button
                        onClick={openDiscoveryModal}
                        className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-blue-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-white/10 group-hover:border-blue-400/40 cursor-pointer"
                      >
                        <span>Request Service Proposal</span>
                        <ChevronRight className="w-4 h-4 text-blue-300" />
                      </button>
                    </div>

                  </div>
                );
              })}
          </div>

        </div>
      </section>


      {/* ─── DEDICATED IT & CYBERSECURITY TRAINING ACADEMY ─── */}
      <section id="training-section" className="py-20 px-6 lg:px-12 border-b border-blue-900/30 bg-[#091426] relative">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Certified IT & Cybersecurity Academy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
              Upskill Your Teams with <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Certified IT Training.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Equip your software engineers, IT administrators, C-Suite executives, and general staff with hands-on, practical cybersecurity skills and official certification.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white/[0.03] backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {['All', 'Corporate Employee Awareness', 'Engineering & DevSecOps', 'Ethical Hacking', 'IT Admin & M365'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTrainingFilter(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    trainingFilter === cat
                      ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
                      : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={trainingSearch}
                onChange={(e) => setTrainingSearch(e.target.value)}
                placeholder="Search training modules..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

          </div>

          {/* Course List Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 p-7 rounded-3xl space-y-6 flex flex-col justify-between transition-all group shadow-xl"
              >
                <div className="space-y-4">
                  
                  {/* Top Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      {course.level}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-2xl font-extrabold text-white font-heading group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {course.summary}
                  </p>

                  {/* Details Pill Ribbon */}
                  <div className="flex flex-wrap gap-4 text-xs text-slate-300 py-2 border-y border-white/10">
                    <div>
                      <span className="text-slate-400 font-medium">Duration: </span>
                      <span className="font-bold text-white">{course.duration}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Format: </span>
                      <span className="font-bold text-white">{course.format}</span>
                    </div>
                  </div>

                  {/* Core Modules Breakdown */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">Curriculum Syllabus:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.modules.map((mod, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium bg-white/[0.02] p-2 rounded-lg border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certificate Pill */}
                  <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-800/40 text-xs flex items-center gap-2 text-blue-200 font-semibold">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Includes: {course.certificate}</span>
                  </div>

                </div>

                {/* Enrollment Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={openDiscoveryModal}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wide shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer transition-all"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Request Corporate Squad Training Cohort</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ─── CODE SECURITY & HIGH-TRUST ASSURANCE CALLOUT ─── */}
      <section className="py-16 px-6 lg:px-12 border-b border-blue-900/30 bg-[#070e1b]">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d1f3c] via-[#09152a] to-[#0d1f3c] border border-blue-500/40 shadow-2xl relative overflow-hidden space-y-6">
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Strict Code Confidentiality & IP Security</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  Guaranteed Data Privacy & Air-Gapped Code Security.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  We treat your source code, infrastructure architecture, and user data with bank-grade confidentiality. Dual-layer binding NDAs are executed before project kickoff, and all security audits are conducted in isolated, encrypted sandboxes.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-blue-300 pt-2 justify-center lg:justify-start">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Dual International NDAs</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Client IP Assignment</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Data Retention Post-Audit</span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={openDiscoveryModal}
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 border border-blue-400/40 active:scale-95 cursor-pointer transition-all"
                >
                  <span>Book Confidential Consult</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ─── FREQUENTLY ASKED QUESTIONS (SEO ACCORDION) ─── */}
      <section className="py-20 px-6 lg:px-12 border-b border-blue-900/30 bg-[#08101e]">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Cybersecurity Knowledge Base</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Frequently Asked <span className="text-blue-400">Questions.</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Everything you need to know about engaging Sovereign2Fresh Empire for cybersecurity audits and corporate IT training.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-blue-300 transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ─── PRE-FOOTER CTA ─── */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-[#08101e] to-[#0a1628]">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading max-w-2xl mx-auto">
            Ready to Protect Your Infrastructure & Train Your Tech Squads?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Connect with a Senior Sovereign2Fresh Empire Security Architect today for a confidential risk consultation.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={openDiscoveryModal}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 border border-blue-400/40 active:scale-95 cursor-pointer transition-all"
            >
              <span>Book Discovery & Security Consult</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
