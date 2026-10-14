import React, { useState } from 'react';
import { Search, Briefcase, ArrowRight, X, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function PortfolioPage({ openDiscoveryModal }) {
  const { content } = useCms();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9; // 3 per row x 3 rows max per page

  const categories = ['All', 'AI & Enterprise', 'Fintech & HR', 'Agritech & Supply Chain', 'E-Commerce & EdTech', 'Cybersecurity & Media'];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  // Case studies array with liveUrl and multiple images per project
  const fallbackCaseStudies = [
    {
      id: 1,
      title: "CV Transformer (AI SaaS Platform)",
      client: "CV Transformer SaaS (Global / Nigeria)",
      flag: "🌐",
      category: "AI & Enterprise",
      featured: true,
      liveUrl: "https://cvtransformer.com",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "Lovable AI", "n8n", "Node.js", "Firebase"],
      squadComposition: "1 Lead Developer (Full Stack & AI Prompts)",
      timeline: "3 Months Initial Rollout",
      metrics: [
        { label: "Docs Generated", value: "15,000+" },
        { label: "Parsing Time", value: "< 4s" },
        { label: "ATS Match", value: "98%" }
      ],
      summary: "Built an AI-driven SaaS career platform for automated resume formatting, cover letter generation, document workflow automation, and ATS optimization.",
      challenge: "Job seekers and professionals spent hours manually reformatting resumes and tailoring cover letters for applicant tracking systems (ATS).",
      solution: "Engineered a React web SaaS integrating Lovable AI prompt models and n8n background workflows for instant document parsing, keyword matching, and PDF generation.",
      results: "Processed over 15,000 document transformations with 98% ATS algorithm alignment."
    },
    {
      id: 2,
      title: "AI Employee Appraisal System",
      client: "Zeenab Foods Ltd. (Abuja, Nigeria)",
      flag: "🇳🇬",
      category: "AI & Enterprise",
      featured: true,
      liveUrl: "https://zeenabfoods.com/appraisal",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "Lovable AI", "n8n", "Microsoft 365", "SharePoint"],
      squadComposition: "1 IT Lead / Developer",
      timeline: "2 Months Delivery",
      metrics: [
        { label: "Review Time", value: "-75%" },
        { label: "Staff Evaluated", value: "100+" },
        { label: "Bias Reduced", value: "100%" }
      ],
      summary: "Developed an AI-assisted 360° performance evaluation platform digitizing appraisal cycles across corporate departments.",
      challenge: "Manual paper-based evaluation forms caused severe review delays, rating variance, and subjective feedback in staff appraisals.",
      solution: "Designed a 360° appraisal engine with self, manager, committee, and HR review stages featuring AI sentiment analysis and automated variance alerts.",
      results: "Reduced manual HR processing time by 75% while providing objective audit-ready performance reports for 100+ corporate employees."
    },
    {
      id: 3,
      title: "Secure Anonymous Voice Box App",
      client: "Zeenab Foods Ltd. (Abuja, Nigeria)",
      flag: "🇳🇬",
      category: "Cybersecurity & Media",
      featured: false,
      liveUrl: "https://voicebox.zeenabfoods.com",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "Cybersecurity Controls", "Encrypted Storage", "Node.js"],
      squadComposition: "1 Lead Developer / DevSecOps Engineer",
      timeline: "1 Month Delivery",
      metrics: [
        { label: "Anonymity", value: "100%" },
        { label: "Reports Logged", value: "250+" },
        { label: "Data Leak", value: "Zero" }
      ],
      summary: "Engineered a secure, encrypted anonymous whistleblowing and feedback portal to centralize internal reporting and protect employee confidentiality.",
      challenge: "Employees lacked a secure, identity-protected channel to communicate sensitive operational feedback or whistleblowing concerns.",
      solution: "Built a zero-identity-logging React web app with end-to-end payload encryption and protected compliance routing.",
      results: "Strengthened corporate transparency and compliance with zero identity data leaks."
    },
    {
      id: 4,
      title: "Smart GPS Geofenced Attendance PWA",
      client: "Enterprise Workforce Ops (Abuja, Nigeria)",
      flag: "🇳🇬",
      category: "Fintech & HR",
      featured: true,
      liveUrl: "https://attendance.workforceops.ng",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React PWA", "GPS Geofencing", "Node.js", "Firebase", "Export Engine"],
      squadComposition: "1 Lead Developer",
      timeline: "2 Months Delivery",
      metrics: [
        { label: "Fraud Deflected", value: "100%" },
        { label: "GPS Precision", value: "< 5m" },
        { label: "Payroll Accuracy", value: "+30%" }
      ],
      summary: "Built a mobile-first Progressive Web App for real-time GPS location attendance tracking, geofencing fraud prevention, and automated payroll exports.",
      challenge: "Field workers and multi-branch staff spoofed manual attendance records, causing inflated overtime payouts.",
      solution: "Developed a geofenced PWA requiring real-time GPS coordinate verification, anti-spoofing checks, and 1-click payroll CSV exports.",
      results: "Eliminated proxy attendance fraud across field personnel and streamlined monthly payroll calculations."
    },
    {
      id: 5,
      title: "Farm Connect & B2B Agritech Marketplace",
      client: "Agritech Enterprise (Nigeria)",
      flag: "🇳🇬",
      category: "Agritech & Supply Chain",
      featured: false,
      liveUrl: "https://farmconnect.africa",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "REST APIs", "Node.js", "PostgreSQL"],
      squadComposition: "1 Lead Full Stack Dev",
      timeline: "4 Months Delivery",
      metrics: [
        { label: "Farmers Onboarded", value: "2,500+" },
        { label: "B2B Orders", value: "₦150M+" },
        { label: "Middlemen cut", value: "-40%" }
      ],
      summary: "Developed a B2B agricultural procurement platform connecting rural farming clusters directly with commercial food processors.",
      challenge: "Smallholder farmers faced massive revenue losses due to exploitative middlemen and supply chain opacity.",
      solution: "Created a transparent digital marketplace featuring crop inventory listings, verified buyer matching, and delivery tracking.",
      results: "Directly connected 2,500+ farmers to enterprise buyers, increasing farmer profit margins significantly."
    },
    {
      id: 6,
      title: "CNTH Multivendor E-Commerce Store",
      client: "CNTH Store (Nigeria & West Africa)",
      flag: "🇳🇬",
      category: "E-Commerce & EdTech",
      featured: false,
      liveUrl: "https://cnthstore.com",
      image: "https://images.unsplash.com/photo-1556742049-0a6756574358?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1556742049-0a6756574358?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "Node.js", "REST APIs", "Payment Gateways", "PWA"],
      squadComposition: "1 Full Stack Dev, 1 UI/UX Designer",
      timeline: "3 Months Delivery",
      metrics: [
        { label: "Active Vendors", value: "120+" },
        { label: "Orders Processed", value: "45,000+" },
        { label: "Pay Speed", value: "Instant" }
      ],
      summary: "Architected a multivendor e-commerce portal supporting multi-merchant storefronts, vendor payouts, and mobile customer shopping.",
      challenge: "Independent merchants needed a unified marketplace supporting local payment gateways (Paystack/Flutterwave) and logistics routing.",
      solution: "Built a responsive multivendor web app with vendor dashboards, automated commission splits, and customer order tracking.",
      results: "Successfully processed over 45,000 orders across 120+ active online vendors."
    },
    {
      id: 7,
      title: "Asedo Automated Enterprise Payroll",
      client: "Asedo Corporate Services (Nigeria)",
      flag: "🇳🇬",
      category: "Fintech & HR",
      featured: false,
      liveUrl: "https-[#asedo.com]",
      liveUrl: "https://asedopayroll.com",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "TypeScript", "Calculation Engine", "PDF Generator"],
      squadComposition: "1 Lead Developer",
      timeline: "2 Months Delivery",
      metrics: [
        { label: "Calc Accuracy", value: "100%" },
        { label: "Payslips Exported", value: "5,000+" },
        { label: "Tax Compliance", value: "100%" }
      ],
      summary: "Engineered an automated corporate payroll system calculating PAYE tax deductions, pension contributions, net pay, and PDF payslips.",
      challenge: "Manual Excel payroll processing caused frequent tax computation errors and delayed monthly salary disbursements.",
      solution: "Built a React tax computation engine pre-programmed with Nigerian tax laws, automated deductions, and 1-click bulk payslip generator.",
      results: "Achieved 100% computational accuracy and zero tax penalty fines."
    },
    {
      id: 8,
      title: "Garnish Point Online Food Order & Kitchen Dispatch",
      client: "Garnish Point Ltd. (Abuja, Nigeria)",
      flag: "🇳🇬",
      category: "E-Commerce & EdTech",
      featured: false,
      liveUrl: "https://garnishpoint.app",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "Firebase", "Real-Time WebSockets", "Tailwind CSS"],
      squadComposition: "1 Full Stack Dev",
      timeline: "2 Months Delivery",
      metrics: [
        { label: "Prep Latency", value: "-35%" },
        { label: "Orders / Day", value: "500+" },
        { label: "Order Accuracy", value: "99.5%" }
      ],
      summary: "Developed a real-time food ordering and kitchen dispatch portal connecting customers with kitchen prep screens and delivery tracking.",
      challenge: "Kitchen staff struggled to synchronize incoming online orders with active prep stations, leading to customer order mix-ups.",
      solution: "Created a WebSocket-enabled kitchen dispatch screen with automated order queueing, status updates, and rider dispatching.",
      results: "Reduced average meal prep latency by 35% with 99.5% order accuracy."
    },
    {
      id: 9,
      title: "Nexhub Academy Scalable LMS Platform",
      client: "Nexhub Academy (Nigeria & Remote)",
      flag: "🇳🇬",
      category: "E-Commerce & EdTech",
      featured: false,
      liveUrl: "https://nexhubacademy.com",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "TypeScript", "Node.js", "Cloudfront Video", "Monetization"],
      squadComposition: "1 Full Stack Dev",
      timeline: "3 Months Delivery",
      metrics: [
        { label: "Students", value: "3,200+" },
        { label: "Courses Hosted", value: "45+" },
        { label: "Uptime", value: "99.9%" }
      ],
      summary: "Built a learning management platform supporting instructor course creation, video hosting, quiz evaluation, and course monetization.",
      challenge: "Course creators lacked an African-tailored LMS supporting local bank transfers and instant course certificate issuance.",
      solution: "Developed a React LMS featuring video playback, student progress tracking, quiz engines, and instant course monetization.",
      results: "Onboarded 3,200+ students and 45+ video courses with 99.9% uptime."
    },
    {
      id: 10,
      title: "Zeenab Foods Corporate Portal & 13 Managed Sub-Sites",
      client: "Zeenab Foods Ltd. (Abuja, Nigeria)",
      flag: "🇳🇬",
      category: "AI & Enterprise",
      featured: true,
      liveUrl: "https://zeenabfoods.com",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "M365", "SharePoint", "Security Hardening", "DNS Ops"],
      squadComposition: "Head of IT & Systems Developer",
      timeline: "Ongoing Managed Portfolio",
      metrics: [
        { label: "Sites Managed", value: "13 Websites" },
        { label: "Availability", value: "99.9%" },
        { label: "M365 Users", value: "100+" }
      ],
      summary: "Led frontend development for the primary corporate portal and managed a portfolio of 13 company websites and Microsoft 365 for 100+ users.",
      challenge: "The organization needed centralized IT governance, 99.9% web uptime, secure M365 collaboration, and unified brand web presence.",
      solution: "Architected secure React frontend portals, configured Microsoft Intune & SharePoint policies, and implemented automated security patch updates.",
      results: "Maintained 99.9% web availability across all 13 corporate portals while securing internal M365 operations for 100+ employees."
    },
    {
      id: 11,
      title: "Cyber Guard24 Threat Intelligence Portal",
      client: "Cyber Guard24 (Nigeria & UK)",
      flag: "🇬🇧",
      category: "Cybersecurity & Media",
      featured: false,
      liveUrl: "https://cyberguard24.com",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "Penetration Testing Tools", "Vulnerability Scanning"],
      squadComposition: "1 Cybersecurity DevSecOps Lead",
      timeline: "2 Months Delivery",
      metrics: [
        { label: "Threat Scans", value: "1,000+" },
        { label: "Audit SLA", value: "100%" },
        { label: "Defects Patched", value: "Zero" }
      ],
      summary: "Developed a cybersecurity portal providing threat intelligence insights, vulnerability assessment advisories, and ethical hacking showcases.",
      challenge: "Enterprise clients required transparent visibility into vulnerability audit findings and threat exposure scores.",
      solution: "Built a clean cybersecurity dashboard presenting vulnerability patch statuses, threat indices, and security awareness guides.",
      results: "Delivered audit-ready vulnerability monitoring for enterprise cybersecurity clients."
    },
    {
      id: 12,
      title: "Coretta Property Plus & Private Jet Homes",
      client: "Coretta Group & Realty (Lagos & Abuja)",
      flag: "🇳🇬",
      category: "AI & Enterprise",
      featured: false,
      liveUrl: "https://corettahomes.com",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      ],
      stacks: ["React.js", "Virtual Tours", "Property Search Engine"],
      squadComposition: "1 Lead Frontend Dev",
      timeline: "2 Months Delivery",
      metrics: [
        { label: "Listings Hosted", value: "500+" },
        { label: "Lead Growth", value: "+45%" },
        { label: "Load Time", value: "< 1.5s" }
      ],
      summary: "Built a luxury real estate showcase platform featuring HD property image carousels, virtual walkthroughs, and instant agent lead capture.",
      challenge: "High-net-worth real estate buyers experienced slow mobile page loads and clunky listing filters.",
      solution: "Engineered an optimized React property portal with fast image loading, location filtering, and direct WhatsApp lead routing.",
      results: "Increased qualified buyer lead conversions by 45% within the first 60 days."
    }
  ];

  const rawProjects = (content?.portfolio && content.portfolio.length > 0)
    ? content.portfolio
    : fallbackCaseStudies;

  const caseStudies = rawProjects.map(cs => {
    const stackArray = Array.isArray(cs.stacks)
      ? cs.stacks
      : typeof cs.stacks === 'string'
      ? cs.stacks.split(',').map(s => s.trim()).filter(Boolean)
      : [];
    return {
      ...cs,
      stacks: stackArray,
      images: Array.isArray(cs.images) && cs.images.length > 0 ? cs.images : [cs.image].filter(Boolean),
      metrics: Array.isArray(cs.metrics) && cs.metrics.length > 0 ? cs.metrics : [
        { label: cs.metric1Label || 'Performance', value: cs.metric1Value || '99.9%' },
        { label: cs.metric2Label || 'Delivery', value: cs.metric2Value || 'On Time' },
        { label: 'Client Satisfaction', value: '100%' }
      ]
    };
  });

  const openCaseStudyModal = (cs) => {
    setSelectedCaseStudy(cs);
    setActiveImageIndex(0);
  };

  const filteredCaseStudies = caseStudies.filter(cs => {
    const matchesCat = activeCategory === 'All' || cs.category === activeCategory;
    const matchesSearch =
      cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.stacks.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      cs.summary.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCaseStudies.length / ITEMS_PER_PAGE) || 1;
  const paginatedCaseStudies = filteredCaseStudies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="py-10 px-4 lg:px-8 bg-gradient-to-b from-[#edf1f7] via-[#e2eaf5] to-[#edf1f7] text-[#0f1d31] min-h-[85vh] relative">
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header Bar */}
        <div className="border-b border-blue-200/80 pb-5">
          <div className="space-y-1 text-center md:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f1d31] tracking-tight font-heading">
              Sovereign2Fresh Empire Real-World Project <span className="text-[#1d4ed8]">Portfolio.</span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Delivered across Nigeria and international enterprise markets — from AI automation tools and cyber-secure systems to high-scale web platforms.
            </p>
          </div>
        </div>

        {/* Compact Filter Controls Bar */}
        <div className="bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-blue-200/80 flex flex-col md:flex-row items-center gap-3 justify-between shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0f1d31] text-white shadow-sm'
                    : 'bg-blue-50/60 text-slate-700 hover:bg-blue-100/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by stack or project..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-blue-50/50 text-[#0f1d31] text-xs py-2 pl-9 pr-3 rounded-xl border border-blue-200/80 focus:border-[#2563eb] focus:outline-none placeholder:text-slate-500 font-medium"
            />
          </div>

        </div>

        {/* 3-Column Case Studies Grid (Max 3 Rows = 9 Cards per Page) */}
        {filteredCaseStudies.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No projects found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No case studies match your current filter or search criteria.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchTerm(''); setCurrentPage(1); }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedCaseStudies.map((cs) => (
                <div
                  key={cs.id}
                  onClick={() => openCaseStudyModal(cs)}
                  className="bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-500 transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5"
                >
                  <div>
                    {/* Image Screenshot Preview Container */}
                    <div className="relative h-36 sm:h-40 overflow-hidden border-b border-slate-100 bg-slate-900 shrink-0">
                      <img
                        src={cs.images ? cs.images[0] : cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                          {cs.category}
                        </span>
                        {cs.images && cs.images.length > 1 && (
                          <span className="bg-blue-600/90 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-xs">
                            {cs.images.length} Shots
                          </span>
                        )}
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 text-[11px] bg-slate-950/80 backdrop-blur-md text-slate-200 px-2 py-0.5 rounded font-medium border border-white/10">
                        {cs.flag} {cs.client.split('(')[0]}
                      </span>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-3.5 space-y-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] font-heading group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
                        {cs.title}
                      </h3>
                      
                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-normal">
                        {cs.summary}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {cs.stacks.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200/60">
                            {tech}
                          </span>
                        ))}
                        {cs.stacks.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-semibold self-center px-1">
                            +{cs.stacks.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Metrics Ribbon */}
                  <div className="p-3.5 pt-0 space-y-2.5">
                    <div className="grid grid-cols-3 gap-1 bg-slate-50/90 p-2 rounded-lg border border-slate-200/70 text-center">
                      {cs.metrics.map((m, mIdx) => (
                        <div key={mIdx} className={mIdx > 0 ? "border-l border-slate-200" : ""}>
                          <p className="font-bold text-blue-700 text-xs font-heading">{m.value}</p>
                          <p className="text-[9px] text-slate-500 font-medium truncate mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors pt-0.5">
                      <span>View Project Details & Screenshots</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-200/80">
                <p className="text-xs text-slate-500 font-medium">
                  Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                  <span className="font-semibold text-slate-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredCaseStudies.length)}</span> of{' '}
                  <span className="font-semibold text-slate-900">{filteredCaseStudies.length}</span> case studies
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(p => p - 1);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(p => p + 1);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Case Study Full Detail Modal with Multi-Image Carousel & Live URL Box */}
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white max-w-3xl w-full p-6 sm:p-8 rounded-3xl border border-blue-200 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-[#0f1d31]">
              
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 font-bold text-sm bg-slate-100 w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-[#1d4ed8] text-xs font-extrabold px-3 py-1 rounded-full uppercase border border-blue-200">
                    {selectedCaseStudy.category}
                  </span>
                  <span className="text-xs font-bold text-slate-600">{selectedCaseStudy.flag} {selectedCaseStudy.client}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f1d31] font-heading leading-tight">
                  {selectedCaseStudy.title}
                </h2>
              </div>

              {/* Live Project URL Launch Box */}
              {selectedCaseStudy.liveUrl && (
                <a
                  href={selectedCaseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0f1d31] text-white border border-blue-500/30 hover:border-blue-400 hover:bg-[#1a2b45] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-300 uppercase tracking-wider font-extrabold">Live Application URL</p>
                      <p className="text-xs font-semibold text-white font-mono">{selectedCaseStudy.liveUrl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              )}

              {/* Multi-Image Gallery Carousel Component */}
              <div className="space-y-3">
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-blue-200 bg-slate-900 group">
                  <img
                    src={
                      selectedCaseStudy.images && selectedCaseStudy.images.length > 0
                        ? selectedCaseStudy.images[activeImageIndex]
                        : selectedCaseStudy.image
                    }
                    alt={selectedCaseStudy.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  
                  <span className="absolute top-3 left-3 bg-[#0f1d31]/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                    Screenshot {activeImageIndex + 1} of {selectedCaseStudy.images?.length || 1}
                  </span>

                  {/* Previous / Next Arrow Controls */}
                  {selectedCaseStudy.images && selectedCaseStudy.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev === 0 ? selectedCaseStudy.images.length - 1 : prev - 1));
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer opacity-80 hover:opacity-100"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev === selectedCaseStudy.images.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer opacity-80 hover:opacity-100"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails Row */}
                {selectedCaseStudy.images && selectedCaseStudy.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {selectedCaseStudy.images.map((imgUrl, imgIdx) => (
                      <button
                        key={imgIdx}
                        onClick={() => setActiveImageIndex(imgIdx)}
                        className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          activeImageIndex === imgIdx
                            ? 'border-[#2563eb] ring-2 ring-blue-400/30 scale-105'
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${imgIdx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-3 bg-blue-50/80 p-4 rounded-2xl border border-blue-200 text-center">
                {selectedCaseStudy.metrics.map((m, mIdx) => (
                  <div key={mIdx} className={mIdx > 0 ? "border-l border-blue-200" : ""}>
                    <p className="text-xl font-extrabold text-[#1d4ed8] font-heading">{m.value}</p>
                    <p className="text-xs text-slate-700 font-bold mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Deep Dive Breakdown */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                <div>
                  <h4 className="font-extrabold text-[#0f1d31] text-base font-heading mb-1">Operational Challenge</h4>
                  <p className="bg-blue-50/40 p-4 rounded-xl border border-blue-200/80">{selectedCaseStudy.challenge}</p>
                </div>

                <div>
                  <h4 className="font-extrabold text-[#0f1d31] text-base font-heading mb-1">Sovereign2Fresh Empire Technical Solution</h4>
                  <p className="bg-blue-50/40 p-4 rounded-xl border border-blue-200/80">{selectedCaseStudy.solution}</p>
                </div>

                <div>
                  <h4 className="font-extrabold text-[#0f1d31] text-base font-heading mb-1">Verified Impact & Results</h4>
                  <p className="bg-blue-50/40 p-4 rounded-xl border border-blue-200/80">{selectedCaseStudy.results}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">Need a similar solution built for your team?</span>
                <button
                  onClick={() => {
                    setSelectedCaseStudy(null);
                    openDiscoveryModal();
                  }}
                  className="px-6 py-3 rounded-xl bg-[#2563eb] text-white font-extrabold text-xs hover:bg-[#1d4ed8] transition-all cursor-pointer shadow-sm"
                >
                  Book Discovery Consult
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
