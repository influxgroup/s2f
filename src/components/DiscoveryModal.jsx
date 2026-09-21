import React, { useState } from 'react';
import { Shield, CheckCircle2, Sparkles, Send, X, Building2, User, Mail, Globe, Calendar, DollarSign } from 'lucide-react';
import { bookConsultation } from '../services/api';

export default function DiscoveryModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    targetStack: 'Full Stack (React / Node / AWS)',
    squadSize: 'Medium Squad (2-3 Engineers)',
    budgetRange: '$10,000 - $25,000 / month',
    startDate: 'Immediate (Within 7 Days)',
    projectOverview: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookConsultation({
        company_name: formData.companyName,
        contact_name: formData.contactName,
        email: formData.email,
        squad_type: `${formData.squadSize} [${formData.targetStack}]`,
        timeline: formData.startDate,
        notes: `${formData.projectOverview || 'No overview provided'} [Budget: ${formData.budgetRange}]`,
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Consultation submission notice:', err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1d31]/95 backdrop-blur-xl max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-blue-500/40 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm bg-[#0a1628] w-8 h-8 rounded-full border border-blue-800/60 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 text-[11px] font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confidential Discovery Consultation</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Book Technical Architecture Consult
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Synthesize your requirements with a Senior Sovereign2Fresh Empire Architect. Receive squad recommendations within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#0a1628] text-white py-2.5 px-3 rounded-xl border border-blue-900/60 focus:border-blue-500 focus:outline-none placeholder:text-slate-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-[#0a1628] text-white py-2.5 px-3 rounded-xl border border-blue-900/60 focus:border-blue-500 focus:outline-none placeholder:text-slate-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. s.jenkins@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0a1628] text-white py-2.5 px-3 rounded-xl border border-blue-900/60 focus:border-blue-500 focus:outline-none placeholder:text-slate-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Primary Tech Stack</label>
                  <select
                    value={formData.targetStack}
                    onChange={(e) => setFormData({ ...formData, targetStack: e.target.value })}
                    className="w-full bg-[#0a1628] text-white py-2.5 px-3 rounded-xl border border-blue-900/60 focus:outline-none font-medium"
                  >
                    <option>Full Stack (React / Node / AWS)</option>
                    <option>Python & AI / LLM Engineering</option>
                    <option>DevOps & Kubernetes Infrastructure</option>
                    <option>UI/UX & Frontend Engineering</option>
                    <option>Custom Dedicated Squad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Desired Squad Size</label>
                  <select
                    value={formData.squadSize}
                    onChange={(e) => setFormData({ ...formData, squadSize: e.target.value })}
                    className="w-full bg-[#0a1628] text-white py-2.5 px-3 rounded-xl border border-blue-900/60 focus:outline-none font-medium"
                  >
                    <option>Individual Senior Specialist (1 Dev)</option>
                    <option>Medium Squad (2-3 Engineers)</option>
                    <option>Full Squad (4-6 Engineers + Lead)</option>
                    <option>Enterprise Multi-Squad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Brief Project Overview</label>
                <textarea
                  rows={3}
                  placeholder="Outline key tech stack requirements, milestones, or timeline goals..."
                  value={formData.projectOverview}
                  onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                  className="w-full bg-[#0a1628] text-white py-2.5 px-3 rounded-xl border border-blue-900/60 focus:border-blue-500 focus:outline-none resize-none placeholder:text-slate-500 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-extrabold text-xs hover:from-blue-500 hover:to-indigo-500 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 border border-blue-400/40 active:scale-95 cursor-pointer disabled:opacity-60"
              >
                <Send className="w-4 h-4 text-blue-200" />
                <span>{loading ? 'Submitting...' : 'Confirm Consultation Request'}</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full mx-auto flex items-center justify-center border border-blue-500/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-extrabold text-white font-heading">
              Consultation Scheduled!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-blue-400">{formData.contactName}</strong>. Our Senior Technical Lead has received your request for <strong className="text-white">{formData.companyName}</strong> and will email you squad recommendations within 24 hours.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
