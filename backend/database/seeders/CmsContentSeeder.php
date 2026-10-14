<?php

namespace Database\Seeders;

use App\Models\CmsContent;
use Illuminate\Database\Seeder;

class CmsContentSeeder extends Seeder
{
    /**
     * Seed the CMS contents table with clean, modern enterprise data.
     */
    public function run(): void
    {
        // 1. Hero Section
        $hero = [
            'statusPill' => 'Enterprise IT Solutions & Cyber Defense',
            'headline' => 'Premier Enterprise IT Solutions & Custom Software Development.',
            'headlineHighlight' => 'Custom Software Development.',
            'subheadline' => 'Sovereign2Fresh Empire delivers world-class IT solutions, bespoke software development, cloud infrastructure, and mission-critical cybersecurity for commercial businesses, government institutions, and private firms.',
            'primaryCta' => 'Book an IT Consultation',
            'secondaryCta' => 'Explore Portfolio',
            'socialProofText' => 'Trusted by 40+ Enterprise CTOs & Tech Leaders (4.9/5)',
            'metricEngineers' => 180, // Projects Delivered (180+)
            'metricRetention' => 99,  // System SLA Uptime (99.9%)
            'metricSprints' => 100,   // Client Satisfaction (100%)
            'metricSlaHours' => 48,   // Rapid Kickoff (< 48h)
        ];

        // 2. Services (All 8 offerings including the 4 from the home page grid)
        $services = [
            [
                'id' => 'mobile-web-dev',
                'title' => 'Mobile App & Web Development',
                'badge' => 'Flutter, React Native & Web',
                'tagline' => 'Building native-performance iOS & Android mobile apps (Flutter, React Native) and modern web platforms (React, Next.js).',
                'image' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
                'category' => 'Mobile & Web Engineering',
                'filterCategory' => 'software',
                'rate' => 'End-to-End Delivery',
                'features' => [
                    'Flutter & React Native Cross-Platform',
                    'Offline-First Mobile Architecture',
                    'High-Performance React & Next.js'
                ],
                'stack' => ['Flutter', 'React Native', 'React', 'Next.js', 'TypeScript']
            ],
            [
                'id' => 'backend-cloud-apis',
                'title' => 'Enterprise Backend & Cloud APIs',
                'badge' => 'PHP, Laravel, Python & AWS',
                'tagline' => 'Robust backend engines in PHP (Laravel) and Python (Django, FastAPI) integrated with AWS cloud infrastructure.',
                'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
                'category' => 'Cloud & Backend Systems',
                'filterCategory' => 'cloud',
                'rate' => 'Enterprise SLA',
                'features' => [
                    'Laravel & PHP Microservices',
                    'Django & FastAPI Async Backend',
                    'AWS Cloud & Kubernetes DevOps'
                ],
                'stack' => ['PHP', 'Laravel', 'Python', 'FastAPI', 'AWS', 'Docker']
            ],
            [
                'id' => 'ai-llm-automation',
                'title' => 'AI Engineering & LLM Automation',
                'badge' => 'Python AI & LangChain',
                'tagline' => 'Building production LLM orchestration pipelines, RAG enterprise search engines, and custom predictive data models.',
                'image' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
                'category' => 'AI & Data Engineering',
                'filterCategory' => 'ai',
                'rate' => 'Custom AI Solution',
                'features' => [
                    'Python, PyTorch & LangChain LLMs',
                    'Celery & Redis Background Tasks',
                    'Custom AI Model Deployment'
                ],
                'stack' => ['Python', 'PyTorch', 'LangChain', 'OpenAI', 'Pinecone', 'Celery']
            ],
            [
                'id' => 'cybersecurity-training',
                'title' => 'Cyber Security & IT Training',
                'badge' => 'Cyber Security & Certified Academy',
                'tagline' => 'Penetration testing, vulnerability patch management, ISO 27001/OWASP security audits, and hands-on IT training.',
                'image' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
                'category' => 'Cyber Security & Audits',
                'filterCategory' => 'security',
                'rate' => 'Certified Audit',
                'features' => [
                    'Penetration Testing & Source Code Audit',
                    'M365 & Entra ID Identity Hardening',
                    'Certified Corporate Staff IT Training'
                ],
                'stack' => ['OWASP', 'Kali Linux', 'Burp Suite', 'ISO 27001', 'NDPR']
            ],
            [
                'id' => 'react-fullstack',
                'title' => 'Custom Enterprise Software & Web Platforms',
                'badge' => 'Web & SaaS Architecture',
                'tagline' => 'High-concurrency React and Next.js web applications, multi-tenant SaaS architectures, REST/GraphQL APIs, and mission-critical enterprise portals.',
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                'category' => 'Software Engineering',
                'filterCategory' => 'software',
                'rate' => 'Enterprise SLA',
                'features' => [
                    'High-concurrency React & Next.js architectures',
                    'Multi-tenant SaaS & API microservices',
                    '100% Client IP Assignment & Dual NDAs'
                ],
                'stack' => ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL']
            ],
            [
                'id' => 'drone-aerial-services',
                'title' => 'Commercial Drone Services & Aerial Land Mapping',
                'badge' => 'Aerial & Geospatial Media',
                'tagline' => 'High-definition 4K/6K aerial cinematography, 3D topographical land surveys, architectural progress tracking, and asset inspection for luxury real estate, commercial properties, and infrastructure developments.',
                'image' => 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
                'category' => 'Drone & Media',
                'filterCategory' => 'drone',
                'rate' => 'Custom Flight Scope',
                'features' => [
                    'High-resolution 4K/6K cinematic video for real estate',
                    'Precision topographical surveys & 3D site reconstruction',
                    'Certified commercial drone flight operations'
                ],
                'stack' => ['4K/6K Cinema Drone', 'Aerial Land Surveys', 'Orthomosaic 3D', 'Real Estate Filming', 'Asset Inspection']
            ],
            [
                'id' => 'digital-marketing-branding',
                'title' => 'Digital Marketing, Social Media & Brand Architecture',
                'badge' => 'Growth & Brand Strategy',
                'tagline' => 'Full-spectrum digital marketing campaigns, executive social media management, bespoke brand identity design, high-converting ad funnels, and data-driven customer acquisition across global channels.',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                'category' => 'Digital Marketing',
                'filterCategory' => 'marketing',
                'rate' => 'Campaign Engagements',
                'features' => [
                    'Social media growth & content production',
                    'High-converting ad funnels (Meta, Google, LinkedIn)',
                    'Brand visual identity guidelines & conversion design'
                ],
                'stack' => ['Brand Identity', 'Social Media Management', 'Performance Marketing', 'SEO & SEM', 'Creative Content']
            ],
            [
                'id' => 'corporate-training',
                'title' => 'Corporate IT Academy & Executive Cyber Defense',
                'badge' => 'Workforce Enablement',
                'tagline' => 'Hands-on technical upskilling cohorts for engineering staff, executive cyber risk briefings, phishing simulations, and corporate certification programs.',
                'image' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
                'category' => 'IT Training',
                'filterCategory' => 'training',
                'rate' => 'Cohort Programs',
                'features' => [
                    'Simulated phishing campaigns & threat awareness',
                    'Board-level executive cyber governance briefings',
                    'Certified software & cloud engineering cohorts'
                ],
                'stack' => ['Live Labs', 'Phishing Sims', 'Executive Briefings', 'Certification']
            ]
        ];

        // 3. Cyber Security Packages
        $cybersecurity = [
            'headline' => 'Enterprise Cybersecurity Audits & Code Hardening',
            'subheadline' => 'Rigorous vulnerability assessments, zero-day mitigation, and dual-layer compliance certifications for modern digital infrastructure.',
            'hotline' => '+234 (0) 800-723-3674',
            'hotlineLabel' => 'Emergency Threat Hotline (24/7)',
            'slaResponse' => 'Under 15 Minutes Emergency Response',
            'packages' => [
                [
                    'id' => 'starter',
                    'name' => 'Rapid Code & Infra Audit',
                    'tagline' => 'Ideal for early-stage SaaS & seed startups heading into client security review.',
                    'price' => '$2,850',
                    'cadence' => 'One-time Assessment',
                    'turnaround' => '4 Business Days',
                    'features' => [
                        'Full static & dynamic code vulnerability scan (SAST / DAST)',
                        'OWASP Top 10 web/API weakness review',
                        'Cloud IAM & S3 / storage bucket exposure audit',
                        'Executive risk scorecard & developer remediation guide',
                        'Formal Letter of Attestation for your enterprise clients'
                    ]
                ],
                [
                    'id' => 'enterprise',
                    'name' => 'Comprehensive Penetration Testing & Compliance',
                    'tagline' => 'Deep gray-box penetration test for fintech, healthcare, and enterprise platforms.',
                    'price' => '$6,500',
                    'cadence' => 'Complete Engagement',
                    'turnaround' => '10 Business Days',
                    'popular' => true,
                    'features' => [
                        'All Rapid Audit inclusions',
                        'Certified ethical hacker gray-box penetration testing',
                        'Business logic flaw & authentication bypass testing',
                        'Database encryption & secret management validation',
                        'NDPR, GDPR & ISO 27001 readiness review',
                        'Free 30-day re-test verification following remediation'
                    ]
                ],
                [
                    'id' => 'continuous',
                    'name' => 'DevSecOps & Retained Virtual CISO',
                    'tagline' => 'Continuous security oversight and real-time defense for fast-shipping engineering teams.',
                    'price' => '$3,800',
                    'cadence' => 'Monthly Retainer',
                    'turnaround' => 'Continuous 24/7 Monitoring',
                    'features' => [
                        'Automated CI/CD security gating (GitHub Actions / GitLab CI)',
                        'Monthly dependency & container vulnerability patching',
                        'Quarterly adversarial simulation & penetration testing',
                        'Dedicated fractional CISO for enterprise client security calls',
                        'Priority 15-minute emergency incident response hotline'
                    ]
                ]
            ]
        ];

        // 4. Differentiation Standards
        $differentiation = [
            [
                'criterion' => 'Technical Standard',
                's2f' => 'Top senior engineers assessed via live architecture & coding benchmarks',
                'outsourcing' => 'Junior resumes marked up with unpredictable quality',
                'freelance' => 'Unverified self-reported ratings and portfolio claims'
            ],
            [
                'criterion' => 'Time to Deployment',
                's2f' => '48 to 72 hours with pre-screened technical matches',
                'outsourcing' => '4 to 8 weeks of slow recruiting cycles',
                'freelance' => 'Variable; weeks wasted interviewing unverified candidates'
            ],
            [
                'criterion' => 'Engineer Replacement SLA',
                's2f' => 'Guaranteed replacement within 48 hours at zero friction',
                'outsourcing' => 'Lengthy contract renegotiations and staff turnover',
                'freelance' => 'No replacement guarantee; you start from scratch'
            ],
            [
                'criterion' => 'Intellectual Property (IP)',
                's2f' => '100% direct client ownership backed by dual-jurisdiction NDAs',
                'outsourcing' => 'Agency retention ambiguities and messy IP assignments',
                'freelance' => 'Jurisdictional disputes and enforcement challenges'
            ],
            [
                'criterion' => 'Timezone Alignment',
                's2f' => '4 to 6 hours guaranteed overlap with UK (GMT) and US (EST)',
                'outsourcing' => '10-12 hour differences leading to delayed daily standups',
                'freelance' => 'Erratic schedules and uncoordinated availability'
            ]
        ];

        // 5. Real-World Portfolio Projects (The authentic 12 projects from live site)
        $portfolio = [
            [
                'id' => 1,
                'title' => 'CV Transformer (AI SaaS Platform)',
                'client' => 'CV Transformer SaaS (Global / Nigeria)',
                'flag' => '🌐',
                'category' => 'AI & Enterprise',
                'featured' => true,
                'liveUrl' => 'https://cvtransformer.com',
                'image' => 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, Lovable AI, n8n, Node.js, Firebase',
                'metric1Label' => 'Docs Generated',
                'metric1Value' => '15,000+',
                'metric2Label' => 'Parsing Time',
                'metric2Value' => '< 4s',
                'summary' => 'AI-driven SaaS career platform for automated resume formatting, cover letter generation, document workflow automation, and ATS optimization.'
            ],
            [
                'id' => 2,
                'title' => 'AI Employee Appraisal System',
                'client' => 'Zeenab Foods Ltd. (Abuja, Nigeria)',
                'flag' => '🇳🇬',
                'category' => 'AI & Enterprise',
                'featured' => true,
                'liveUrl' => 'https://zeenabfoods.com/appraisal',
                'image' => 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, Lovable AI, n8n, Microsoft 365, SharePoint',
                'metric1Label' => 'Review Time',
                'metric1Value' => '-75%',
                'metric2Label' => 'Staff Evaluated',
                'metric2Value' => '100+',
                'summary' => 'Developed an AI-assisted 360° performance evaluation platform digitizing appraisal cycles across corporate departments.'
            ],
            [
                'id' => 3,
                'title' => 'Secure Anonymous Voice Box App',
                'client' => 'Zeenab Foods Ltd. (Abuja, Nigeria)',
                'flag' => '🇳🇬',
                'category' => 'Cybersecurity & Media',
                'featured' => false,
                'liveUrl' => 'https://voicebox.zeenabfoods.com',
                'image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, Cybersecurity Controls, Encrypted Storage, Node.js',
                'metric1Label' => 'Anonymity',
                'metric1Value' => '100%',
                'metric2Label' => 'Reports Logged',
                'metric2Value' => '250+',
                'summary' => 'Engineered a secure, encrypted anonymous whistleblowing and feedback portal to centralize internal reporting and protect employee confidentiality.'
            ],
            [
                'id' => 4,
                'title' => 'Smart GPS Geofenced Attendance PWA',
                'client' => 'Enterprise Workforce Ops (Abuja, Nigeria)',
                'flag' => '🇳🇬',
                'category' => 'Fintech & HR',
                'featured' => true,
                'liveUrl' => 'https://attendance.workforceops.ng',
                'image' => 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React PWA, GPS Geofencing, Node.js, Firebase, Export Engine',
                'metric1Label' => 'Fraud Deflected',
                'metric1Value' => '100%',
                'metric2Label' => 'GPS Precision',
                'metric2Value' => '< 5m',
                'summary' => 'Built a mobile-first Progressive Web App for real-time GPS location attendance tracking, geofencing fraud prevention, and automated payroll exports.'
            ],
            [
                'id' => 5,
                'title' => 'Farm Connect & B2B Agritech Marketplace',
                'client' => 'Agritech Enterprise (Nigeria)',
                'flag' => '🇳🇬',
                'category' => 'Agritech & Supply Chain',
                'featured' => false,
                'liveUrl' => 'https://farmconnect.africa',
                'image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, REST APIs, Node.js, PostgreSQL',
                'metric1Label' => 'Farmers Onboarded',
                'metric1Value' => '2,500+',
                'metric2Label' => 'B2B Orders',
                'metric2Value' => '₦150M+',
                'summary' => 'Developed a B2B agricultural procurement platform connecting rural farming clusters directly with commercial food processors.'
            ],
            [
                'id' => 6,
                'title' => 'CNTH Multivendor E-Commerce Store',
                'client' => 'CNTH Store (Nigeria & West Africa)',
                'flag' => '🇳🇬',
                'category' => 'E-Commerce & EdTech',
                'featured' => true,
                'liveUrl' => 'https://cnthstore.com',
                'image' => 'https://images.unsplash.com/photo-1556742049-0a6756574358?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1556742049-0a6756574358?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, Node.js, REST APIs, Payment Gateways, PWA',
                'metric1Label' => 'Active Vendors',
                'metric1Value' => '120+',
                'metric2Label' => 'Orders Processed',
                'metric2Value' => '45,000+',
                'summary' => 'Architected a multivendor e-commerce portal supporting multi-merchant storefronts, vendor payouts, and mobile customer shopping.'
            ],
            [
                'id' => 7,
                'title' => 'Asedo Automated Enterprise Payroll',
                'client' => 'Asedo Corporate Services (Nigeria)',
                'flag' => '🇳🇬',
                'category' => 'Fintech & HR',
                'featured' => false,
                'liveUrl' => 'https://asedopayroll.com',
                'image' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, TypeScript, Calculation Engine, PDF Generator',
                'metric1Label' => 'Calc Accuracy',
                'metric1Value' => '100%',
                'metric2Label' => 'Payslips Exported',
                'metric2Value' => '5,000+',
                'summary' => 'Engineered an automated corporate payroll system calculating PAYE tax deductions, pension contributions, net pay, and PDF payslips.'
            ],
            [
                'id' => 8,
                'title' => 'Garnish Point Online Food Order & Kitchen Dispatch',
                'client' => 'Garnish Point Ltd. (Abuja, Nigeria)',
                'flag' => '🇳🇬',
                'category' => 'E-Commerce & EdTech',
                'featured' => false,
                'liveUrl' => 'https://garnishpoint.app',
                'image' => 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, Firebase, Real-Time WebSockets, Tailwind CSS',
                'metric1Label' => 'Prep Latency',
                'metric1Value' => '-35%',
                'metric2Label' => 'Orders / Day',
                'metric2Value' => '500+',
                'summary' => 'Developed a real-time food ordering and kitchen dispatch portal connecting customers with kitchen prep screens and delivery tracking.'
            ],
            [
                'id' => 9,
                'title' => 'Nexhub Academy Scalable LMS Platform',
                'client' => 'Nexhub Academy (Nigeria & Remote)',
                'flag' => '🇳🇬',
                'category' => 'E-Commerce & EdTech',
                'featured' => false,
                'liveUrl' => 'https://nexhubacademy.com',
                'image' => 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, TypeScript, Node.js, Cloudfront Video, Monetization',
                'metric1Label' => 'Students',
                'metric1Value' => '3,200+',
                'metric2Label' => 'Courses Hosted',
                'metric2Value' => '45+',
                'summary' => 'Built a learning management platform supporting instructor course creation, video hosting, quiz evaluation, and course monetization.'
            ],
            [
                'id' => 10,
                'title' => 'Zeenab Foods Corporate Portal & 13 Managed Sub-Sites',
                'client' => 'Zeenab Foods Ltd. (Abuja, Nigeria)',
                'flag' => '🇳🇬',
                'category' => 'AI & Enterprise',
                'featured' => false,
                'liveUrl' => 'https://zeenabfoods.com',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, M365, SharePoint, Security Hardening, DNS Ops',
                'metric1Label' => 'Sites Managed',
                'metric1Value' => '13 Websites',
                'metric2Label' => 'Availability',
                'metric2Value' => '99.9%',
                'summary' => 'Led frontend development for the primary corporate portal and managed a portfolio of 13 company websites and Microsoft 365 for 100+ users.'
            ],
            [
                'id' => 11,
                'title' => 'Cyber Guard24 Threat Intelligence Portal',
                'client' => 'Cyber Guard24 (Nigeria & UK)',
                'flag' => '🇬🇧',
                'category' => 'Cybersecurity & Media',
                'featured' => false,
                'liveUrl' => 'https://cyberguard24.com',
                'image' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, Penetration Testing Tools, Vulnerability Scanning',
                'metric1Label' => 'Threat Scans',
                'metric1Value' => '1,000+',
                'metric2Label' => 'Audit SLA',
                'metric2Value' => '100%',
                'summary' => 'Developed a cybersecurity portal providing threat intelligence insights, vulnerability assessment advisories, and ethical hacking showcases.'
            ],
            [
                'id' => 12,
                'title' => 'Coretta Property Plus & Private Jet Homes',
                'client' => 'Coretta Group & Realty (Lagos & Abuja)',
                'flag' => '🇳🇬',
                'category' => 'AI & Enterprise',
                'featured' => false,
                'liveUrl' => 'https://corettahomes.com',
                'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
                ],
                'stacks' => 'React.js, Virtual Tours, Property Search Engine',
                'metric1Label' => 'Listings Hosted',
                'metric1Value' => '500+',
                'metric2Label' => 'Lead Growth',
                'metric2Value' => '+45%',
                'summary' => 'Built a luxury real estate showcase platform featuring HD property image carousels, virtual walkthroughs, and instant agent lead capture.'
            ]
        ];

        // 6. Blog Articles (All 5 articles matching the frontend)
        $blog = [
            [
                'id' => 1,
                'title' => 'Bridging the Global Tech Gap: Why US Enterprises Are Scaling with African Engineers in 2026',
                'category' => 'Engineering Leadership',
                'archiveMonth' => 'July 2026',
                'readTime' => '6 min read',
                'date' => 'July 24, 2026',
                'author' => 'Kofi Mensah',
                'authorRole' => 'Principal Tech Architect',
                'authorAvatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
                'coverImage' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
                'summary' => 'An executive breakdown of how distributed engineering squads across Ghana, Nigeria, and Kenya are solving capacity bottlenecks for North American scale-ups with full timezone overlap.',
                'excerpt' => 'An executive breakdown of how distributed engineering squads across Ghana, Nigeria, and Kenya are solving capacity bottlenecks for North American scale-ups with full timezone overlap.',
                'content' => "The global demand for senior software engineering talent has reached an unprecedented peak. Enterprise CTOs in New York, London, and Toronto face immense pressure to accelerate product roadmaps while maintaining strict code quality and security SLAs.\n\nOver the past three years, the tech landscape has witnessed a dramatic shift toward African technology hubs. With over 700,000 professional software developers across the continent, countries like Nigeria, Ghana, Kenya, South Africa, and Egypt have become premier destinations for high-trust staff augmentation.\n\nKey Advantages of Scaling with African Squads:\n1. Synchronous EST/PST/GMT Timezone Overlap for daily standups\n2. Rigorous CS Degree Foundations & Senior System Design Proficiency\n3. Pre-vetted English Fluency & Agile Team Culture Alignment"
            ],
            [
                'id' => 2,
                'title' => 'The Top 3% Vetting Playbook: How We Audit Code Architecture & Seniority SLAs',
                'category' => 'Engineering Standards',
                'archiveMonth' => 'July 2026',
                'readTime' => '8 min read',
                'date' => 'July 18, 2026',
                'author' => 'Amina Bello',
                'authorRole' => 'Senior AI & Vetting Lead',
                'authorAvatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                'image' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
                'coverImage' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
                'summary' => "A deep dive into Sovereign2Fresh Empire's 5-stage vetting pipeline: live pair-programming architecture audits, timed DSA challenges, soft skills fluency checks, and identity verification.",
                'excerpt' => "A deep dive into Sovereign2Fresh Empire's 5-stage vetting pipeline: live pair-programming architecture audits, timed DSA challenges, soft skills fluency checks, and identity verification.",
                'content' => "Unvetted freelancer marketplaces carry high disintermediation risks, inconsistent delivery, and hidden management overhead. To guarantee enterprise-grade delivery, Sovereign2Fresh Empire operates a strict 5-stage vetting pipeline.\n\nOnly 3% of applicants pass our multi-stage evaluation. Every developer is audited on code clean architecture, distributed system design, English communication fluency, and legal compliance before joining our dedicated engineering squads."
            ],
            [
                'id' => 3,
                'title' => 'Mitigating Remote Hiring Risk: NDAs, Disintermediation Safeguards & 100% IP Ownership',
                'category' => 'Engineering Leadership',
                'archiveMonth' => 'July 2026',
                'readTime' => '5 min read',
                'date' => 'July 12, 2026',
                'author' => 'Teboho Mokoena',
                'authorRole' => 'DevOps & Compliance Lead',
                'authorAvatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                'image' => 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
                'coverImage' => 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
                'summary' => 'How dual-layer Master Services Agreements and binding international NDAs protect enterprise clients from platform leakage and intellectual property disputes.',
                'excerpt' => 'How dual-layer Master Services Agreements and binding international NDAs protect enterprise clients from platform leakage and intellectual property disputes.',
                'content' => "Intellectual property protection is the single most critical concern for enterprise leaders contracting remote technical talent. Without binding legal frameworks, companies risk platform disintermediation and IP ownership ambiguities.\n\nSovereign2Fresh Empire solves this by acting as the primary contract holder. Clients execute Master Services Agreements directly with Sovereign2Fresh Empire, while all developers execute dual binding NDAs and full IP assignment agreements."
            ],
            [
                'id' => 4,
                'title' => 'Scaling Cloud Infrastructure: AWS vs. GCP Migration Best Practices for Scale-Ups',
                'category' => 'Cloud & DevOps',
                'archiveMonth' => 'June 2026',
                'readTime' => '7 min read',
                'date' => 'June 20, 2026',
                'author' => 'Teboho Mokoena',
                'authorRole' => 'DevOps Lead',
                'authorAvatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
                'coverImage' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
                'summary' => 'Best practices for architecting zero-downtime Kubernetes deployments, Terraform IaC scripts, and cost-optimized multi-cloud environments.',
                'excerpt' => 'Best practices for architecting zero-downtime Kubernetes deployments, Terraform IaC scripts, and cost-optimized multi-cloud environments.',
                'content' => "Cloud infrastructure costs can quickly spiral out of control during rapid scaling phases. Learn how dedicated DevOps squads implement Terraform IaC automation and Kubernetes pod autoscaling to reduce cloud spend by up to 40% while maintaining 99.99% SLA availability."
            ],
            [
                'id' => 5,
                'title' => 'AI & LLM Orchestration: How Dedicated Python Squads Build Production RAG Engines',
                'category' => 'AI & Machine Learning',
                'archiveMonth' => 'June 2026',
                'readTime' => '9 min read',
                'date' => 'June 14, 2026',
                'author' => 'Amina Bello',
                'authorRole' => 'AI Engineer',
                'authorAvatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                'image' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
                'coverImage' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
                'summary' => 'Exploring LangChain, PyTorch, Pinecone, and FastAPI architectures used by African AI specialists to build custom enterprise search models.',
                'excerpt' => 'Exploring LangChain, PyTorch, Pinecone, and FastAPI architectures used by African AI specialists to build custom enterprise search models.',
                'content' => "Retrieval-Augmented Generation (RAG) has transformed enterprise data management. Discover how our Python & AI engineering squads design custom vector database pipelines to enable secure, internal AI search engines for enterprise clients."
            ]
        ];

        // 7. Contact Info
        $contact = [
            'headline' => "Let's Build Something Exceptional Together",
            'subheadline' => 'Connect directly with Sovereign2Fresh Empire technical leadership for bespoke enterprise software, commercial drone surveys, or cyber security defense.',
            'email' => 'info@sovereign2freshempire.com',
            'secondaryEmail' => 'engineering@sovereign2freshempire.com',
            'phone' => '+234 (0) 800-723-3674',
            'officeAddress' => 'Abuja, Federal Capital Territory, Nigeria',
            'hours' => 'Monday - Friday: 08:00 - 18:00 WAT / GMT',
        ];

        $sections = [
            'hero' => $hero,
            'services' => $services,
            'cybersecurity' => $cybersecurity,
            'differentiation' => $differentiation,
            'portfolio' => $portfolio,
            'blog' => $blog,
            'contact' => $contact,
            'settings' => $contact,
        ];

        // Clean out any obsolete sections like vetting, talent, calculator
        CmsContent::whereIn('section_key', ['vetting', 'talent', 'calculator', 'squads'])->delete();

        // Upsert all clean sections
        foreach ($sections as $key => $data) {
            CmsContent::updateOrCreate(
                ['section_key' => $key],
                [
                    'data' => $data,
                    'updated_by' => 'system_clean',
                ]
            );
        }
    }
}
