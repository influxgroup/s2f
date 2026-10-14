import React from 'react';
import { ArrowLeft, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsOfServicePage({ setActiveTab, openDiscoveryModal }) {
  const sections = [
    { id: 'agreement-scope', label: '1. Agreement & Scope of Services' },
    { id: 'custom-engineering', label: '2. Software & Enterprise IT Engagements' },
    { id: 'drone-aerial', label: '3. Commercial Drone & Aerial Survey Operations' },
    { id: 'branding-marketing', label: '4. Digital Marketing & Brand Identity' },
    { id: 'cybersecurity', label: '5. Cybersecurity Audits & Training' },
    { id: 'ip-ownership', label: '6. 100% Intellectual Property Assignment' },
    { id: 'fees-payment', label: '7. Payment Terms & Invoicing' },
    { id: 'warranties-liability', label: '8. Warranties & Limitation of Liability' },
    { id: 'term-termination', label: '9. Term, Termination & Handover' },
    { id: 'governing-law', label: '10. Governing Law & Dispute Resolution' },
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

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Version: October 2026
          </span>
        </div>

        {/* Header Block */}
        <div className="pt-10 pb-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            These Terms of Service (&ldquo;Terms&rdquo;) govern the professional relationship between Sovereign2Fresh Empire Ltd. (&ldquo;Sovereign2Fresh&rdquo;, &ldquo;Company&rdquo;) and the client entity (&ldquo;Client&rdquo;) commissioning our technology, software development, commercial drone, digital marketing, or cybersecurity services.
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
                <p className="text-[11px] text-slate-500">Need a customized enterprise Master Services Agreement (MSA)?</p>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Custom Enterprise MSA</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </aside>

          {/* Legal Body Copy */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-10 space-y-10 shadow-xs">

            {/* Section 1 */}
            <section id="agreement-scope" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                1. Agreement & Scope of Services
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                By signing a Statement of Work (SOW), executing an enterprise order form, or accepting a written project proposal, the Client agrees to be bound by these Terms of Service. In the event of any conflict between these Terms and a countersigned SOW, the terms of the specific SOW will prevail.
              </p>
            </section>

            {/* Section 2 */}
            <section id="custom-engineering" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                2. Software & Enterprise IT Engagements
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                For custom web, mobile, cloud infrastructure, and AI engineering services:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Sprint Delivery & Milestones:</strong> Engineering deliverables follow Agile sprint cycles as specified in each SOW. The Client is given a standard 7 business-day user acceptance testing (UAT) review period for each completed milestone.
                </li>
                <li>
                  <strong className="text-slate-900">Code Quality & Standards:</strong> Sovereign2Fresh commits to modern production practices including automated linting, test coverage, CI/CD pipeline deployment, and documented architecture.
                </li>
                <li>
                  <strong className="text-slate-900">Service Level Agreement (SLA):</strong> Where dedicated engineering personnel or retainers are contracted, Sovereign2Fresh provides a rapid replacement or scale-up response within 48 business hours.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="drone-aerial" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                3. Commercial Drone & Aerial Survey Operations
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                For aerial inspection, construction progress documentation, real estate 4K media, and land boundary surveys:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Aviation Compliance & Safety:</strong> All flights are conducted in strict accordance with national civil aviation authority regulations. Flight operations are subject to favorable meteorological conditions and airspace clearances.
                </li>
                <li>
                  <strong className="text-slate-900">Site Permissions & Access:</strong> The Client is responsible for securing physical property access rights and notifying neighboring land stakeholders where required by local ordinances.
                </li>
                <li>
                  <strong className="text-slate-900">Deliverables Handover:</strong> Orthomosaic models, point clouds, 3D surface meshes, and raw 4K cinema media will be transferred via high-speed encrypted data links upon milestone sign-off.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="branding-marketing" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                4. Digital Marketing & Brand Identity
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                For branding design, social media management, content production, and paid digital growth campaigns:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Client Approvals:</strong> Content calendars and brand assets are submitted in advance for client editorial review.
                </li>
                <li>
                  <strong className="text-slate-900">Advertising Spend:</strong> Third-party advertising budgets (Meta, Google, LinkedIn, TikTok) are paid directly by the Client or pre-funded via dedicated ad account credentials; advertising spend is distinct from Sovereign2Fresh agency retainer fees.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="cybersecurity" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                5. Cybersecurity Audits & Training
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Security penetration testing, vulnerability assessments, and employee defense training:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Rules of Engagement:</strong> Ethical penetration testing commences only upon countersignature of formal Rules of Engagement (RoE) specifying testing scopes, IP ranges, and safe harbor declarations.
                </li>
                <li>
                  <strong className="text-slate-900">Confidential Vulnerability Disclosures:</strong> Audit findings and threat disclosures are transmitted strictly via encrypted channels and never shared with third parties.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="ip-ownership" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                6. 100% Intellectual Property Assignment
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Upon full payment of all milestone invoices due under an engagement, Sovereign2Fresh transfers and assigns to the Client 100% of all worldwide right, title, and interest in and to the custom software code, visual brand assets, drone survey data, and documentation developed uniquely for the Client.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Any pre-existing open-source libraries or foundational frameworks incorporated into the deliverables remain subject to their respective open-source licenses (MIT, Apache 2.0, BSD).
              </p>
            </section>

            {/* Section 7 */}
            <section id="fees-payment" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                7. Payment Terms & Invoicing
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Invoices are issued based on agreed milestone schedules or monthly retainer dates. Standard payment terms are Net-14 days unless negotiated otherwise in the SOW. In the event of non-payment past 30 calendar days, Sovereign2Fresh reserves the right to pause active development and deployment pipelines until outstanding balances are resolved.
              </p>
            </section>

            {/* Section 8 */}
            <section id="warranties-liability" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                8. Warranties & Limitation of Liability
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Sovereign2Fresh warrants that all work will be performed in a professional, workmanlike manner in accordance with recognized industry standards. Custom software carries a 30-day post-deployment bug warranty covering defects in contracted scope.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, or consequential damages. Total cumulative liability under any claim arising out of an engagement shall not exceed the total fees paid by the Client to Sovereign2Fresh in the three (3) months preceding the claim.
              </p>
            </section>

            {/* Section 9 */}
            <section id="term-termination" className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                9. Term, Termination & Handover
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Either party may terminate an ongoing retainer agreement by giving thirty (30) days written notice to the other party. Upon notice of termination, Sovereign2Fresh will execute an orderly transition, handing over all current repositories, cloud keys, architectural diagrams, and assets accrued to date.
              </p>
            </section>

            {/* Section 10 */}
            <section id="governing-law" className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-heading">
                10. Governing Law & Dispute Resolution
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                These Terms shall be construed and governed in accordance with the laws of Nigeria (or the jurisdiction explicitly specified in the enterprise Master Services Agreement). The parties agree to first seek informal executive resolution before submitting disputes to binding commercial arbitration.
              </p>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1 mt-4">
                <p><strong className="text-slate-900">Legal Counsel & Contracting Desk:</strong></p>
                <p>Email: <a href="mailto:legal@sovereign2fresh.com" className="text-blue-600 hover:underline">legal@sovereign2fresh.com</a></p>
                <p>Support & Consultations: <a href="mailto:consult@sovereign2fresh.com" className="text-blue-600 hover:underline">consult@sovereign2fresh.com</a></p>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
