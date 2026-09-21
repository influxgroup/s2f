export const mockJobSignals = [
  {
    id: "SIG-901",
    company: "ApexFintech Inc.",
    market: "United States (New York, NY)",
    targetRole: "Senior DevOps & Cloud Architect",
    openDays: 42,
    salaryBudget: "$160,000 - $190,000 / yr",
    signalStrength: "High Intent (Job Open 40+ Days)",
    techStack: ["AWS", "Kubernetes", "Terraform", "PostgreSQL"],
    contactName: "David Miller",
    contactTitle: "VP of Engineering",
    email: "d.miller@apexfintech.com",
    linkedinUrl: "linkedin.com/in/david-miller-apex",
    status: "Qualified Lead",
    stage: "Outreach Sent"
  },
  {
    id: "SIG-902",
    company: "HealthPulse Tech",
    market: "United Kingdom (London)",
    targetRole: "Lead Full Stack Engineer (React/Node)",
    openDays: 35,
    salaryBudget: "£85,000 - £105,000 / yr",
    signalStrength: "High Growth (5 Tech Roles Open)",
    techStack: ["React", "Node.js", "TypeScript", "GCP"],
    contactName: "Sarah Jenkins",
    contactTitle: "Chief Technology Officer",
    email: "s.jenkins@healthpulse.co.uk",
    linkedinUrl: "linkedin.com/in/sarah-jenkins-cto",
    status: "Discovery Scheduled",
    stage: "Discovery Scheduled"
  },
  {
    id: "SIG-903",
    company: "CloudScale Analytics",
    market: "Canada (Toronto, ON)",
    targetRole: "Senior Python & AI Engineer",
    openDays: 28,
    salaryBudget: "$140,000 - $170,000 CAD",
    signalStrength: "Urgent Expansion Signal",
    techStack: ["Python", "FastAPI", "PyTorch", "Snowflake"],
    contactName: "Marcus Vance",
    contactTitle: "Head of AI & Data",
    email: "m.vance@cloudscale.io",
    linkedinUrl: "linkedin.com/in/marcusvance-ai",
    status: "New Signal",
    stage: "Signal Detected"
  },
  {
    id: "SIG-904",
    company: "PayEdge Global",
    market: "United States (San Francisco, CA)",
    targetRole: "Dedicated Engineering Squad (3 Devs + QA)",
    openDays: 15,
    salaryBudget: "$25,000 / month retainer",
    signalStrength: "Squad Inquiry Received",
    techStack: ["React", "Node.js", "PostgreSQL", "AWS"],
    contactName: "Elena Rostova",
    contactTitle: "Director of Product Engineering",
    email: "elena@payedge.com",
    linkedinUrl: "linkedin.com/in/elena-rostova-tech",
    status: "Proposal Sent",
    stage: "Proposal Sent"
  }
];

export const outreachTemplate = `Subject: Scalable Vetted Engineering Squad for {Company Name} / {Job Role}

Hi {Contact Name},

I noticed {Company Name} is currently expanding your engineering team and hiring for a {Job Role}. In the current market, sourcing senior technical talent with verified delivery capabilities can slow down key product roadmap milestones.

Sovereign2Fresh Empire provides a high-trust, managed alternative: a private network of elite, verified software engineers and dedicated technical squads. We handle the entire vetting pipeline, technical management overhead, and delivery QA—allowing you to scale your engineering output without friction.

Key Sovereign2Fresh Empire Guarantees:
• Top 3% Vetted Talent (Code Architecture, DSA, Soft Skills & Security audited)
• 48-Hour Talent Replacement SLA
• Dual-Layer NDAs & 100% Client IP Ownership
• Full Timezone Overlap with EST / PST / GMT

Would you be open to a brief 10-minute introductory call this week to see how our "Verified" model can support your immediate team capacity?

Best regards,
{Your Name}
Sovereign2Fresh Empire | Elite. Verified. Secure.
sovereign2freshempire.com`;
