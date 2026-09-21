import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCmsContent, bulkSaveCms, saveCmsSection, loginAdmin } from '../services/api';
import { mockTalentPool } from '../data/mockTalent';

// Comprehensive factory defaults mirroring the live website
export const initialCmsDefaults = {
  hero: {
    statusPill: 'Available for Q3/Q4 Enterprise Engagements',
    headline: 'Dedicated Software Engineering Squads for Growing Tech Teams.',
    headlineHighlight: 'Growing Tech Teams.',
    subheadline: 'Sovereign2Fresh Empire connects companies with pre-vetted software engineers, DevSecOps leads, and systems architects. Build secure React applications, AI solutions, and enterprise cloud infrastructure.',
    primaryCta: 'Book a Consultation',
    secondaryCta: 'Calculate Squad Retainer',
    socialProofText: 'Trusted by 40+ Enterprise CTOs (4.9/5)',
    metricEngineers: 180,
    metricRetention: 90,
    metricSprints: 10,
    metricSlaHours: 48,
  },
  services: [
    {
      id: 'flutter-mobile',
      title: 'Flutter & React Native Cross-Platform Mobile Apps',
      badge: 'iOS & Android',
      tagline: 'High-performance Flutter and React Native mobile applications with offline SQLite sync, BLoC state management, and native device plugins.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
      category: 'Mobile Engineering',
      rate: '$50 - $75/hr'
    },
    {
      id: 'laravel-php',
      title: 'PHP & Laravel Enterprise SaaS Engineering',
      badge: 'Backend Architecture',
      tagline: 'Scalable PHP and Laravel REST APIs, Inertia.js microservices, payment gateways (Stripe, Paystack), and high-concurrency MySQL/Redis databases.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      category: 'Backend & SaaS',
      rate: '$55 - $80/hr'
    },
    {
      id: 'python-django-ai',
      title: 'Python, Django & AI RAG LLM Workflows',
      badge: 'AI & Automation',
      tagline: 'Python FastAPI async engines, Django REST frameworks, LangChain GenAI RAG pipelines, and automated background workers with Celery & Redis.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      category: 'AI & Automation',
      rate: '$65 - $95/hr'
    },
    {
      id: 'aws-devops',
      title: 'AWS Cloud Architecture, DevOps & Kubernetes',
      badge: 'Cloud & Infrastructure',
      tagline: 'AWS EKS Kubernetes clusters, Infrastructure-as-Code (Terraform), Serverless AWS Lambda microservices, and automated zero-downtime CI/CD pipelines.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      category: 'Cloud & DevOps',
      rate: '$60 - $90/hr'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Assessments & Code Hardening',
      badge: 'ISO 27001 & OWASP',
      tagline: 'Vulnerability assessments, OWASP code remediation, penetration testing, security auditing, and anonymous whistleblower portals.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      category: 'Security & Compliance',
      rate: '$75 - $110/hr'
    },
    {
      id: 'react-fullstack',
      title: 'React.js, Next.js & Modern Web Platforms',
      badge: 'Frontend Excellence',
      tagline: 'Ultra-fast React and Next.js web applications, complex Redux/Zustand state management, and high-converting enterprise portals.',
      image: 'https://images.unsplash.com/photo-1556742049-0a6756574358?auto=format&fit=crop&w=600&q=80',
      category: 'Frontend & Full-Stack',
      rate: '$50 - $75/hr'
    }
  ],
  cybersecurity: {
    headline: 'Enterprise Cybersecurity Audits & Code Hardening',
    subheadline: 'Rigorous vulnerability assessments, zero-day mitigation, and dual-layer compliance certifications for modern digital infrastructure.',
    hotline: '+234 (0) 800-723-3674',
    hotlineLabel: 'Emergency Threat Hotline (24/7)',
    slaResponse: 'Under 15 Minutes Emergency Response',
    packages: [
      {
        id: 'starter',
        name: 'Rapid Code & Infra Audit',
        tagline: 'Ideal for early-stage SaaS & seed startups heading into client security review.',
        price: '$2,850',
        cadence: 'One-time Assessment',
        turnaround: '4 Business Days',
        features: [
          'Full static & dynamic code vulnerability scan (SAST / DAST)',
          'OWASP Top 10 web/API weakness review',
          'Cloud IAM & S3 / storage bucket exposure audit',
          'Executive risk scorecard & developer remediation guide',
          'Formal Letter of Attestation for your enterprise clients'
        ]
      },
      {
        id: 'enterprise',
        name: 'Comprehensive Penetration Testing & Compliance',
        tagline: 'Deep gray-box penetration test for fintech, healthcare, and enterprise platforms.',
        price: '$6,500',
        cadence: 'Complete Engagement',
        turnaround: '10 Business Days',
        popular: true,
        features: [
          'All Rapid Audit inclusions',
          'Certified ethical hacker gray-box penetration testing',
          'Business logic flaw & authentication bypass testing',
          'Database encryption & secret management validation',
          'NDPR, GDPR & ISO 27001 readiness review',
          'Free 30-day re-test verification following remediation'
        ]
      },
      {
        id: 'continuous',
        name: 'DevSecOps & Retained Virtual CISO',
        tagline: 'Continuous security oversight and real-time defense for fast-shipping engineering teams.',
        price: '$3,800',
        cadence: 'Monthly Retainer',
        turnaround: 'Continuous 24/7 Monitoring',
        features: [
          'Automated CI/CD security gating (GitHub Actions / GitLab CI)',
          'Monthly dependency & container vulnerability patching',
          'Quarterly adversarial simulation & penetration testing',
          'Dedicated fractional CISO for enterprise client security calls',
          'Priority 15-minute emergency incident response hotline'
        ]
      }
    ]
  },
  differentiation: [
    {
      criterion: 'Vetting Standard',
      s2f: 'Top 1% vetted via 5-stage live coding & algorithmic rigor',
      outsourcing: 'Junior resumes marked up with unpredictable quality',
      freelance: 'Unverified self-reported ratings and portfolio claims'
    },
    {
      criterion: 'Time to Deployment',
      s2f: '48 to 72 hours with pre-screened technical matches',
      outsourcing: '4 to 8 weeks of slow recruiting cycles',
      freelance: 'Variable; weeks wasted interviewing unverified candidates'
    },
    {
      criterion: 'Engineer Replacement SLA',
      s2f: 'Guaranteed replacement within 48 hours at zero friction',
      outsourcing: 'Lengthy contract renegotiations and staff turnover',
      freelance: 'No replacement guarantee; you start from scratch'
    },
    {
      criterion: 'Intellectual Property (IP)',
      s2f: '100% direct client ownership backed by dual-jurisdiction NDAs',
      outsourcing: 'Agency retention ambiguities and messy IP assignments',
      freelance: 'Jurisdictional disputes and enforcement challenges'
    },
    {
      criterion: 'Timezone Alignment',
      s2f: '4 to 6 hours guaranteed overlap with UK (GMT) and US (EST)',
      outsourcing: '10-12 hour differences leading to delayed daily standups',
      freelance: 'Erratic schedules and uncoordinated availability'
    }
  ],
  vetting: [
    {
      stage: 1,
      title: 'Resume & Architectural Portfolio Screening',
      passRate: '18%',
      description: 'Comprehensive evaluation of past production systems, open-source repositories, architectural decisions, and enterprise deployment track record.'
    },
    {
      stage: 2,
      title: 'Live Algorithmic & Data Structure Testing',
      passRate: '8%',
      description: 'Rigorous 90-minute live session testing runtime complexity, dynamic programming, edge-case handling, and algorithmic problem-solving.'
    },
    {
      stage: 3,
      title: 'Full-Stack Practical Take-Home System',
      passRate: '4%',
      description: 'Candidate builds a working production-grade mini-service demonstrating clean architecture, asynchronous queues, unit tests, and Docker setup.'
    },
    {
      stage: 4,
      title: 'System Design & Distributed Scalability Interview',
      passRate: '2%',
      description: 'Conducted by a Principal Architect: designing high-availability database partitioning, caching strategies, and failover topologies.'
    },
    {
      stage: 5,
      title: 'English Fluency, Culture & Background Verification',
      passRate: '1%',
      description: 'Final behavioral review, communication evaluation under pressure, reference verification, and dual-jurisdiction background checks.'
    }
  ],
  talent: mockTalentPool,
  portfolio: [
    {
      id: 1,
      title: 'ApexPay - Multi-Currency Global Cross-Border Rails',
      client: 'ApexPay Financial Technologies',
      category: 'Fintech & HR',
      flag: '🇬🇧',
      liveUrl: 'https://sovereign2freshempire.com',
      images: [
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      ],
      stacks: 'React, Node.js, TypeScript, PostgreSQL, Redis, AWS ECS, Stripe',
      metric1Label: 'Daily Volume',
      metric1Value: '$4.2M+',
      metric2Label: 'SLA Uptime',
      metric2Value: '99.99%',
      summary: 'High-availability cross-border payment settlement system handling dual-fiat and crypto disbursements across UK, US, and West Africa.'
    },
    {
      id: 2,
      title: 'OmniHealth - Telemedicine & HIPAA Patient Records Cloud',
      client: 'OmniHealth Solutions Inc',
      category: 'AI & Enterprise',
      flag: '🇺🇸',
      liveUrl: 'https://sovereign2freshempire.com',
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
      ],
      stacks: 'Python, Django REST, React, AWS HealthLake, Docker, Celery',
      metric1Label: 'Consultations',
      metric1Value: '120K+',
      metric2Label: 'Latency',
      metric2Value: '< 60ms',
      summary: 'HIPAA-compliant telemedicine consultation hub with encrypted medical record synchronization and real-time audio/video consultations.'
    },
    {
      id: 3,
      title: 'FleetTrace - Nationwide Real-Time Cold-Chain IoT Telematics',
      client: 'FleetTrace Logistics Global',
      category: 'Agritech & Supply Chain',
      flag: '🇨🇦',
      liveUrl: 'https://sovereign2freshempire.com',
      images: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
      ],
      stacks: 'Flutter, Go, MQTT, TimescaleDB, Docker, AWS IoT Core',
      metric1Label: 'Active Trucks',
      metric1Value: '1,400+',
      metric2Label: 'Spoilage Drop',
      metric2Value: '-68%',
      summary: 'Real-time GPS telematics and ambient sensor telemetry platform safeguarding agricultural shipments with offline-first Flutter mobile apps.'
    }
  ],
  blog: [
    {
      id: 1,
      title: 'Bridging the Global Tech Gap: Why US Enterprises Are Scaling with African Engineers in 2026',
      excerpt: 'How top tech firms overcome domestic engineering shortages by accessing vetted, English-fluent African software engineering talent in timezone alignment.',
      author: 'Amina Bello (VP of Talent)',
      date: 'July 14, 2026',
      category: 'Talent Vetting',
      readTime: '6 min read',
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Building Unbreakable Backend Architecture with PHP, Laravel & Redis in 2026',
      excerpt: 'A practical deep dive into scaling high-concurrency Laravel SaaS platforms using horizontal MySQL sharding, Redis queues, and Redis cluster caching.',
      author: 'Kofi Mensah (Principal Architect)',
      date: 'July 08, 2026',
      category: 'Engineering Leadership',
      readTime: '8 min read',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Zero-Trust Cybersecurity Playbook for High-Growth Startups',
      excerpt: 'Essential checklist for safeguarding cloud infrastructure, eliminating open S3 buckets, and achieving SOC2 & NDPR compliance before Series A.',
      author: 'S2F DevSecOps Team',
      date: 'June 29, 2026',
      category: 'Cloud & DevOps',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    }
  ],
  contact: {
    headline: "Let's Build Something Exceptional Together",
    subheadline: 'Connect directly with Sovereign2Fresh Empire technical leadership to assemble your dedicated squad or book a cyber security audit.',
    email: 'info@sovereign2freshempire.com',
    secondaryEmail: 'engineering@sovereign2freshempire.com',
    phone: '+234 (0) 800-723-3674',
    officeAddress: 'Lagos Tech Hub / Global Remote Operations',
    hours: 'Monday - Friday: 08:00 - 18:00 WAT / GMT',
  }
};

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const cached = localStorage.getItem('s2f_cms_content');
      if (cached) {
        return { ...initialCmsDefaults, ...JSON.parse(cached) };
      }
    } catch (e) {
      console.warn('Could not read cached CMS content:', e);
    }
    return initialCmsDefaults;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('s2f_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const u = localStorage.getItem('s2f_admin_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });
  const [saveStatus, setSaveStatus] = useState({ state: 'idle', message: '' });

  // On mount, pull latest content from database if available
  useEffect(() => {
    async function loadRemoteContent() {
      try {
        const res = await fetchCmsContent();
        if (res && res.success && res.sections && Object.keys(res.sections).length > 0) {
          setContent(prev => {
            const merged = { ...prev, ...res.sections };
            try {
              localStorage.setItem('s2f_cms_content', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      } catch (err) {
        // Fallback to local default / cached content without breaking
        console.log('[CMS Sync] Using local cached/default CMS content');
      }
    }
    loadRemoteContent();
  }, []);

  // Update a single section (e.g. 'hero', 'services', etc.)
  const updateSection = async (sectionKey, data) => {
    setContent(prev => {
      const next = { ...prev, [sectionKey]: data };
      try {
        localStorage.setItem('s2f_cms_content', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    if (adminToken) {
      try {
        setSaveStatus({ state: 'saving', message: `Saving ${sectionKey}...` });
        await saveCmsSection(sectionKey, data, adminToken);
        setSaveStatus({ state: 'success', message: `Saved ${sectionKey} to cloud database!` });
        setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 3000);
      } catch (err) {
        console.error('Error saving CMS section to cloud:', err);
        setSaveStatus({ state: 'error', message: `Saved locally. Cloud sync failed: ${err.message}` });
        setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 5000);
      }
    }
  };

  // Bulk save all sections to cloud database
  const saveAllToCloud = async (overrideData = null) => {
    const dataToSave = overrideData || content;
    setSaveStatus({ state: 'saving', message: 'Saving all sections to cloud MySQL...' });

    // Always update local storage first
    try {
      localStorage.setItem('s2f_cms_content', JSON.stringify(dataToSave));
    } catch (e) {}

    if (!adminToken) {
      setSaveStatus({ state: 'success', message: 'Saved to browser cache. Log in to sync to cloud MySQL.' });
      setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 3500);
      return;
    }

    try {
      await bulkSaveCms(dataToSave, adminToken);
      setSaveStatus({ state: 'success', message: 'Successfully published all changes to live database!' });
      setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 3500);
    } catch (err) {
      console.error('Bulk save failed:', err);
      setSaveStatus({ state: 'error', message: `Cloud sync error: ${err.message}. Changes kept locally.` });
      setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 5000);
    }
  };

  // Factory reset to initial defaults
  const resetToFactoryDefaults = async () => {
    setContent(initialCmsDefaults);
    try {
      localStorage.removeItem('s2f_cms_content');
    } catch (e) {}

    if (adminToken) {
      await saveAllToCloud(initialCmsDefaults);
    }
  };

  // Admin login handler
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await loginAdmin(email, password);
      if (res.token) {
        setAdminToken(res.token);
        setAdminUser(res.user);
        localStorage.setItem('s2f_admin_token', res.token);
        localStorage.setItem('s2f_admin_user', JSON.stringify(res.user));
        setIsLoading(false);
        return { success: true, user: res.user };
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  // Admin logout handler
  const logout = () => {
    setAdminToken('');
    setAdminUser(null);
    localStorage.removeItem('s2f_admin_token');
    localStorage.removeItem('s2f_admin_user');
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        updateSection,
        saveAllToCloud,
        resetToFactoryDefaults,
        adminToken,
        adminUser,
        isLoggedIn: Boolean(adminToken),
        isLoading,
        saveStatus,
        login,
        logout,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
