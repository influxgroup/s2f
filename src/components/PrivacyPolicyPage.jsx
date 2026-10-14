import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function PrivacyPolicyPage({ setActiveTab, openDiscoveryModal }) {
  const sections = [
    { id: 'introduction', label: '1. Introduction & Overview' },
    { id: 'data-collected', label: '2. Information We Collect' },
    { id: 'how-we-use', label: '3. How We Use Your Information' },
    { id: 'client-confidentiality', label: '4. Enterprise Client Confidentiality' },
    { id: 'specialized-services', label: '5. Drone, Media & Marketing Data' },
    { id: 'sharing-disclosure', label: '6. Third-Party Disclosures' },
    { id: 'security-retention', label: '7. Data Security & Retention' },
    { id: 'international-rights', label: '8. Global Privacy Rights (GDPR & NDPR)' },
    { id: 'contact-dpo', label: '9. Data Protection Officer & Contact' },
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

        {/* Back Link & Navigation Bar */}
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

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Effective: October 2026
          </span>
        </div>

        {/* Header Block */}
        <div className="pt-10 pb-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            This Privacy Policy describes how Sovereign2Fresh Empire Ltd. (&ldquo;Sovereign2Fresh&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, protects, and handles personal and proprietary information across our enterprise software engineering, commercial drone operations, digital marketing, and cybersecurity consulting services.
          </p>
        </div>

        {/* Main Content Layout with Sidebar TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">

          {/* Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Contents
              </h2>
              <nav className="space-y-1.5">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="block w-full text-left text-xs text-slate-600 hover:text-blue-600 py-1 transition-colors cursor-pointer truncate"
                  >
                    {sec.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">Need specific compliance documentation or signed DPA?</p>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Data Protection Agreement</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </aside>

          {/* Legal Body Copy */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-10 space-y-10 shadow-xs">

            {/* Section 1 */}
            <section id="introduction" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                1. Introduction & Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Sovereign2Fresh Empire Ltd. delivers mission-critical technology solutions to businesses, government institutions, and private enterprises globally. Respecting your privacy and preserving the security of your proprietary software, commercial telemetry, and operational data is central to our operational principles.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                By accessing our website, engaging our bespoke engineering squads, commissioning aerial drone surveys, or retaining our branding and marketing teams, you acknowledge the terms outlined in this Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-collected" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                2. Information We Collect
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We collect information directly from you when you interact with our platform or retain our services, as well as automatically through standard operational interactions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Direct Contact Information:</strong> Name, professional email address, corporate telephone number, organization name, job title, and service engagement requirements submitted through consultation forms.
                </li>
                <li>
                  <strong className="text-slate-900">Technical & Project Specifications:</strong> Architectural briefs, repository scopes, API requirements, and infrastructure metadata shared during preliminary discovery calls.
                </li>
                <li>
                  <strong className="text-slate-900">Commercial & Financial Records:</strong> Corporate billing addresses, tax identifiers, and payment processing details necessary to service contract agreements (handled via secure enterprise payment processors).
                </li>
                <li>
                  <strong className="text-slate-900">Automated Usage Data:</strong> Anonymized browser telemetry, IP addresses, referring URLs, and session analytics collected strictly to enhance website responsiveness and stability.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="how-we-use" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                3. How We Use Your Information
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We strictly process collected information for legitimate business purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>Delivering custom software engineering, cloud systems integration, and cybersecurity audits.</li>
                <li>Executing commercial drone survey flights, photographic processing, and land boundary orthomosaic modeling.</li>
                <li>Designing, deploying, and managing targeted social media campaigns, brand collateral, and performance marketing funnels.</li>
                <li>Generating proposals, scopes of work (SOWs), contracts, and compliance attestations.</li>
                <li>Maintaining communication regarding project milestones, sprint updates, and emergency technical support.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="client-confidentiality" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                4. Enterprise Client Confidentiality
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Client proprietary intellectual property, software codebase access, database schemas, and commercial strategies are treated with strict confidentiality. All Sovereign2Fresh engineers and consultants are bound by mutual Non-Disclosure Agreements (NDAs). We never monetize, sell, train public AI models on, or publicly reference your private source code without explicit written consent.
              </p>
            </section>

            {/* Section 5 */}
            <section id="specialized-services" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                5. Drone, Media & Marketing Data
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                For our specialized aerial and marketing branches:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Commercial Drone Services:</strong> All aerial footage, geospatial sensor readings, infrared captures, and topological maps collected during real estate or land surveys belong exclusively to the client upon project completion. Unedited raw footage is preserved in encrypted local storage and purged in accordance with our retention policy.
                </li>
                <li>
                  <strong className="text-slate-900">Digital Marketing & Branding:</strong> Audience demographics, ad spend metrics, and social platform access credentials provided to run brand campaigns are stored in isolated vault environments with credential rotation upon campaign conclusion.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="sharing-disclosure" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                6. Third-Party Disclosures
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We do not sell, rent, or trade your personal information. Disclosures are limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Infrastructure Providers:</strong> Vetted cloud infrastructure vendors (e.g., AWS, Google Cloud) that uphold ISO 27001 / SOC 2 compliance.
                </li>
                <li>
                  <strong className="text-slate-900">Legal Compliance:</strong> Instances where disclosure is strictly mandated by applicable regulatory authorities or valid court orders.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="security-retention" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                7. Data Security & Retention
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We apply comprehensive technical safeguards including TLS 1.3 encryption in transit, AES-256 storage encryption at rest, role-based access control, and mandatory multi-factor authentication across all internal accounts. Contact records are retained only for the duration necessary to satisfy commercial agreements and statutory tax obligations.
              </p>
            </section>

            {/* Section 8 */}
            <section id="international-rights" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                8. Global Privacy Rights (GDPR & NDPR)
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Depending on your geographic jurisdiction, you have the right to request access to, rectification of, or erasure of your personal records held in our systems. You may also object to or restrict processing of your data by submitting a formal request to our Data Protection team.
              </p>
            </section>

            {/* Section 9 */}
            <section id="contact-dpo" className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                9. Data Protection Officer & Contact
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                If you have questions, privacy requests, or wish to execute a custom Data Processing Addendum (DPA), please contact our legal and compliance desk:
              </p>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                <p><strong className="text-slate-900">Sovereign2Fresh Empire Ltd.</strong></p>
                <p>Legal & Data Protection Desk: <a href="mailto:privacy@sovereign2fresh.com" className="text-blue-600 hover:underline">privacy@sovereign2fresh.com</a></p>
                <p>General Inquiries: <a href="mailto:consult@sovereign2fresh.com" className="text-blue-600 hover:underline">consult@sovereign2fresh.com</a></p>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
