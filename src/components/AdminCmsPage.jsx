import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import {
  fetchAdminInquiries,
  updateInquiryStatus,
  fetchAdminConsultations,
  updateConsultationStatus,
  fetchAdminSubscribers
} from '../services/api';
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  ShieldCheck,
  Scale,
  Briefcase,
  BookOpen,
  Inbox,
  Settings,
  Save,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Search,
  Download,
  RotateCcw,
  Check,
  Eye,
  ArrowLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import s2fLogoHeader from '../assets/s2f_logo_header.png';

export default function AdminCmsPage({ onExitAdmin }) {
  const {
    content,
    updateSection,
    saveAllToCloud,
    resetToFactoryDefaults,
    adminToken,
    adminUser,
    isLoggedIn,
    saveStatus,
    login,
    logout
  } = useCms();

  // Authentication State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Active Admin Section Tab
  const [activeSection, setActiveSection] = useState('hero'); // hero | services | security | matrix | portfolio | blog | leads | settings

  // Leads CRM State
  const [inquiries, setInquiries] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Load leads when in leads tab and authenticated
  useEffect(() => {
    if (activeSection === 'leads' && adminToken) {
      loadLeads();
    }
  }, [activeSection, adminToken]);

  const loadLeads = async () => {
    setLeadsLoading(true);
    try {
      const [inqRes, consRes, subsRes] = await Promise.allSettled([
        fetchAdminInquiries(adminToken),
        fetchAdminConsultations(adminToken),
        fetchAdminSubscribers(adminToken)
      ]);

      if (inqRes.status === 'fulfilled' && inqRes.value?.data) {
        setInquiries(inqRes.value.data);
      }
      if (consRes.status === 'fulfilled' && consRes.value?.data) {
        setConsultations(consRes.value.data);
      }
      if (subsRes.status === 'fulfilled' && subsRes.value?.data) {
        setSubscribers(subsRes.value.data);
      }
    } catch (err) {
      console.error('Failed to load leads from database:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmittingLogin(true);
    try {
      await login(emailInput, passwordInput);
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 1. MODERN AUTHENTICATION SCREEN (Linear / Stripe Style)
  // ─────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <img src={s2fLogoHeader} alt="Sovereign2Fresh Empire" className="h-10 mx-auto object-contain" />
            <div className="pt-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Content Studio</h1>
              <p className="text-xs text-slate-500 mt-1">
                Sign in to manage live copy, services, portfolio, and database leads.
              </p>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-slate-700">Admin Email</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-xs"
                placeholder="admin@sovereign2freshempire.com"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-xs"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingLogin}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSubmittingLogin ? 'Verifying Credentials...' : 'Sign In to Studio'}
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={onExitAdmin}
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400">Hostinger Cloud MySQL</span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. MAIN MODERN CMS STUDIO INTERFACE
  // ─────────────────────────────────────────────────────────────
  const navTabs = [
    { id: 'hero', label: 'Hero & Headlines', icon: Sparkles },
    { id: 'services', label: 'Services & Capabilities', icon: Layers, count: content.services?.length },
    { id: 'security', label: 'Cyber Security & Audits', icon: ShieldCheck },
    { id: 'matrix', label: 'Differentiation Matrix', icon: Scale },
    { id: 'portfolio', label: 'Portfolio & Case Studies', icon: Briefcase, count: content.portfolio?.length },
    { id: 'blog', label: 'Insights & Blog', icon: BookOpen, count: content.blog?.length },
    { id: 'leads', label: 'Live Leads & Inquiries', icon: Inbox, count: inquiries.length + consultations.length },
    { id: 'settings', label: 'Contact & Global Info', icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Fixed Clean Modern Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <img src={s2fLogoHeader} alt="Sovereign2Fresh Empire" className="h-7 w-auto object-contain" />
          <div className="hidden sm:flex items-center gap-2.5 border-l border-slate-200 pl-4">
            <span className="text-xs font-semibold text-slate-900">Admin Content Studio</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live MySQL Connected
            </span>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2.5">
          {saveStatus.state !== 'idle' && (
            <div
              className={`text-xs px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition-all ${
                saveStatus.state === 'saving'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                  : saveStatus.state === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {saveStatus.state === 'saving' && <Clock className="w-3.5 h-3.5" />}
              {saveStatus.state === 'success' && <CheckCircle className="w-3.5 h-3.5" />}
              {saveStatus.state === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
              <span>{saveStatus.message}</span>
            </div>
          )}

          <button
            onClick={() => saveAllToCloud()}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Publish all modified content directly to Hostinger MySQL"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Save All to Cloud</span>
            <span className="md:hidden">Save</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
            title="Return to the live customer view"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            onClick={logout}
            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-slate-600 border border-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1.5 shadow-2xs"
            title="Sign out from CMS Studio"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body: Sidebar Navigation + Content Workspace */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-full">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 shrink-0 p-4 space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Content Sections
          </div>
          <nav className="space-y-0.5">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                      isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-8 px-1">
            <button
              onClick={() => {
                if (window.confirm('Reset all CMS content back to original factory defaults? This will overwrite recent modifications.')) {
                  resetToFactoryDefaults();
                }
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50/50 text-slate-500 hover:text-red-600 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Factory Defaults</span>
            </button>
          </div>
        </aside>

        {/* Right Dynamic Form Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-[#f8fafc] overflow-y-auto max-w-5xl">
          
          {/* TAB 1: HERO & HEADLINES */}
          {activeSection === 'hero' && (
            <HeroEditor content={content.hero} onSave={(updated) => updateSection('hero', updated)} />
          )}

          {/* TAB 2: SERVICES & CAPABILITIES */}
          {activeSection === 'services' && (
            <ServicesEditor
              services={content.services || []}
              onSave={(updated) => updateSection('services', updated)}
            />
          )}

          {/* TAB 3: CYBER SECURITY */}
          {activeSection === 'security' && (
            <SecurityEditor
              security={content.cybersecurity || {}}
              onSave={(updated) => updateSection('cybersecurity', updated)}
            />
          )}

          {/* TAB 4: DIFFERENTIATION MATRIX */}
          {activeSection === 'matrix' && (
            <MatrixEditor
              matrix={content.differentiation || []}
              onSave={(updated) => updateSection('differentiation', updated)}
            />
          )}

          {/* TAB 5: PORTFOLIO */}
          {activeSection === 'portfolio' && (
            <PortfolioEditor
              portfolio={content.portfolio || []}
              onSave={(updated) => updateSection('portfolio', updated)}
            />
          )}

          {/* TAB 6: BLOG */}
          {activeSection === 'blog' && (
            <BlogEditor
              blog={content.blog || []}
              onSave={(updated) => updateSection('blog', updated)}
            />
          )}

          {/* TAB 7: LIVE LEADS CRM */}
          {activeSection === 'leads' && (
            <LeadsCrmViewer
              inquiries={inquiries}
              consultations={consultations}
              subscribers={subscribers}
              loading={leadsLoading}
              onRefresh={loadLeads}
              adminToken={adminToken}
            />
          )}

          {/* TAB 8: CONTACT & SETTINGS */}
          {activeSection === 'settings' && (
            <SettingsEditor
              settings={content.contact || {}}
              onSave={(updated) => updateSection('contact', updated)}
            />
          )}

        </main>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-EDITORS FOR EACH INDIVIDUAL PAGE SECTION
// ─────────────────────────────────────────────────────────────

/* ─── 1. HERO SECTION EDITOR ─── */
function HeroEditor({ content = {}, onSave }) {
  const [formData, setFormData] = useState(content);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Hero Section & Headline Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Configure primary value proposition, CTAs, and counter ribbon metrics.</p>
        </div>
        {saved && (
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
            <Check className="w-3.5 h-3.5" /> Changes Applied
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-semibold text-slate-900 pb-2 border-b border-slate-100">Main Copy & Narrative</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Status Pill Text (Top Badge)</label>
            <input
              type="text"
              value={formData.statusPill || ''}
              onChange={(e) => setFormData({ ...formData, statusPill: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Primary Headline</label>
            <input
              type="text"
              value={formData.headline || ''}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Headline Highlight Words (Colored Blue)</label>
            <input
              type="text"
              value={formData.headlineHighlight || ''}
              onChange={(e) => setFormData({ ...formData, headlineHighlight: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Subheadline / Supporting Narrative</label>
            <textarea
              rows={3}
              value={formData.subheadline || ''}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Primary CTA Label</label>
              <input
                type="text"
                value={formData.primaryCta || ''}
                onChange={(e) => setFormData({ ...formData, primaryCta: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Secondary CTA Label</label>
              <input
                type="text"
                value={formData.secondaryCta || ''}
                onChange={(e) => setFormData({ ...formData, secondaryCta: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-slate-700">Social Proof Text</label>
            <input
              type="text"
              value={formData.socialProofText || ''}
              onChange={(e) => setFormData({ ...formData, socialProofText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Counter Ribbon Metrics */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 pb-2 border-b border-slate-100">Animated Metric Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Projects Delivered (+)</label>
              <input
                type="number"
                value={formData.metricEngineers ?? 180}
                onChange={(e) => setFormData({ ...formData, metricEngineers: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">System SLA Uptime (%)</label>
              <input
                type="number"
                value={formData.metricRetention ?? 99}
                onChange={(e) => setFormData({ ...formData, metricRetention: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Client Satisfaction (%)</label>
              <input
                type="number"
                value={formData.metricSprints ?? 100}
                onChange={(e) => setFormData({ ...formData, metricSprints: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Rapid Kickoff SLA (Hrs)</label>
              <input
                type="number"
                value={formData.metricSlaHours ?? 48}
                onChange={(e) => setFormData({ ...formData, metricSlaHours: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Hero Changes</span>
        </button>
      </form>
    </div>
  );
}

/* ─── 2. SERVICES EDITOR ─── */
function ServicesEditor({ services = [], onSave }) {
  const [list, setList] = useState(services);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleUpdate = (index, updated) => {
    const next = [...list];
    next[index] = updated;
    setList(next);
    onSave(next);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this service capability?')) {
      const next = list.filter((_, i) => i !== index);
      setList(next);
      onSave(next);
    }
  };

  const handleCreate = () => {
    const created = {
      id: `custom-service-${Date.now()}`,
      title: 'New Engineering Service',
      badge: 'Architecture',
      tagline: 'Comprehensive delivery of modern enterprise software and cloud systems.',
      category: 'Software Engineering',
      rate: 'Enterprise SLA',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
    };
    const next = [...list, created];
    setList(next);
    onSave(next);
    setEditingIndex(next.length - 1);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Services & Technical Capabilities</h2>
          <p className="text-xs text-slate-500 mt-1">Manage all technical offerings, engagement models, and stack descriptions.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((service, idx) => (
          <div key={service.id || idx} className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-xs">
            {editingIndex === idx ? (
              <ServiceForm
                data={service}
                onSave={(updated) => handleUpdate(idx, updated)}
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm pt-0.5">{service.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{service.tagline}</p>
                  </div>
                  <img
                    src={service.image}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{service.rate || 'Enterprise SLA'}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingIndex(idx)}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data);

  return (
    <div className="space-y-3 pt-1">
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Service Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Badge</label>
          <input
            type="text"
            value={formData.badge || ''}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Engagement / Delivery Model</label>
          <input
            type="text"
            value={formData.rate || ''}
            placeholder="e.g. Enterprise SLA"
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Description Tagline</label>
        <textarea
          rows={2}
          value={formData.tagline || ''}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Cover Image URL</label>
        <input
          type="text"
          value={formData.image || ''}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(formData)}
          className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}

/* ─── 3. CYBER SECURITY EDITOR ─── */
function SecurityEditor({ security = {}, onSave }) {
  const [formData, setFormData] = useState(security);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePackageChange = (index, field, value) => {
    const nextPackages = [...(formData.packages || [])];
    nextPackages[index] = { ...nextPackages[index], [field]: value };
    setFormData({ ...formData, packages: nextPackages });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Cyber Security & Audits Management</h2>
          <p className="text-xs text-slate-500 mt-1">Configure threat hotline, response SLAs, and security packages.</p>
        </div>
        {saved && (
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
            <Check className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 pb-2 border-b border-slate-100">Incident Triage & Hotline</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Emergency Phone Hotline</label>
              <input
                type="text"
                value={formData.hotline || ''}
                onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">SLA Response Guarantee</label>
              <input
                type="text"
                value={formData.slaResponse || ''}
                onChange={(e) => setFormData({ ...formData, slaResponse: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Page Headline</label>
            <input
              type="text"
              value={formData.headline || ''}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Page Subheadline</label>
            <textarea
              rows={2}
              value={formData.subheadline || ''}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
            />
          </div>
        </div>

        {/* 3 Security Packages */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Audit & Retainer Packages</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(formData.packages || []).map((pkg, idx) => (
              <div key={pkg.id || idx} className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-xs">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={pkg.name || ''}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="w-full font-bold text-slate-900 text-sm px-2.5 py-1.5 rounded-lg border border-slate-200 focus:border-blue-600"
                    placeholder="Package Name"
                  />
                  <input
                    type="text"
                    value={pkg.price || ''}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-full text-blue-600 font-mono text-base px-2.5 py-1.5 rounded-lg border border-slate-200 font-bold focus:border-blue-600"
                    placeholder="Price (e.g. $2,850)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Cadence / Turnaround</label>
                  <input
                    type="text"
                    value={pkg.turnaround || ''}
                    onChange={(e) => handlePackageChange(idx, 'turnaround', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Tagline</label>
                  <textarea
                    rows={2}
                    value={pkg.tagline || ''}
                    onChange={(e) => handlePackageChange(idx, 'tagline', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-800"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Security Settings</span>
        </button>
      </form>
    </div>
  );
}

/* ─── 4. DIFFERENTIATION MATRIX EDITOR ─── */
function MatrixEditor({ matrix = [], onSave }) {
  const [list, setList] = useState(matrix);
  const [saved, setSaved] = useState(false);

  const handleRowChange = (index, field, value) => {
    const next = [...list];
    next[index] = { ...next[index], [field]: value };
    setList(next);
  };

  const handleSave = () => {
    onSave(list);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddRow = () => {
    const newRow = {
      criterion: 'New Comparison Metric',
      s2f: 'Sovereign2Fresh Empire enterprise standard',
      outsourcing: 'Traditional agency drawback',
      freelance: 'Freelance platform risk'
    };
    setList([...list, newRow]);
  };

  const handleDeleteRow = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Differentiation Matrix Editor</h2>
          <p className="text-xs text-slate-500 mt-1">Comparison criteria table between S2F, Traditional Outsourcing, and Freelance.</p>
        </div>
        <button
          onClick={handleAddRow}
          className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Criterion Row</span>
        </button>
      </div>

      <div className="space-y-4">
        {list.map((row, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={row.criterion || ''}
                onChange={(e) => handleRowChange(idx, 'criterion', e.target.value)}
                className="font-bold text-slate-900 text-sm px-3 py-1.5 rounded-lg border border-slate-300 w-72 focus:border-blue-600"
                placeholder="Comparison Criterion"
              />
              <button
                onClick={() => handleDeleteRow(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer rounded hover:bg-red-50 transition-colors"
                title="Remove Criterion"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Sovereign2Fresh Standard</label>
                <textarea
                  rows={2}
                  value={row.s2f || ''}
                  onChange={(e) => handleRowChange(idx, 's2f', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/40 text-slate-900 focus:border-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Traditional Outsourcing</label>
                <textarea
                  rows={2}
                  value={row.outsourcing || ''}
                  onChange={(e) => handleRowChange(idx, 'outsourcing', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-700 focus:border-slate-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Freelance Platforms</label>
                <textarea
                  rows={2}
                  value={row.freelance || ''}
                  onChange={(e) => handleRowChange(idx, 'freelance', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-700 focus:border-slate-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
      >
        <Save className="w-3.5 h-3.5" />
        <span>Save Differentiation Matrix</span>
      </button>
    </div>
  );
}

/* ─── 5. PORTFOLIO & CASE STUDIES EDITOR ─── */
function PortfolioEditor({ portfolio = [], onSave }) {
  const [list, setList] = useState(portfolio);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setList(portfolio);
  }, [portfolio]);

  const handleUpdate = (index, updated) => {
    const next = [...list];
    next[index] = updated;
    setList(next);
    onSave(next);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this case study from portfolio?')) {
      const next = list.filter((_, i) => i !== index);
      setList(next);
      onSave(next);
    }
  };

  const handleCreate = () => {
    const newCase = {
      id: Date.now(),
      title: 'New Client Enterprise Project',
      client: 'Global Technology Client',
      category: 'AI & Enterprise',
      flag: '🇬🇧',
      liveUrl: 'https://sovereign2freshempire.com',
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'],
      stacks: 'React, Node.js, PostgreSQL, AWS',
      metric1Label: 'Performance',
      metric1Value: '+45%',
      metric2Label: 'Uptime',
      metric2Value: '99.99%',
      summary: 'Production enterprise system delivered with full cloud architecture and automated CI/CD pipelines.'
    };
    const next = [newCase, ...list];
    setList(next);
    onSave(next);
    setEditingIndex(0);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portfolio & Case Studies</h2>
          <p className="text-xs text-slate-500 mt-1">Manage featured client case studies, metrics, and technology architectures.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Case Study</span>
        </button>
      </div>

      <div className="space-y-4">
        {list.map((item, idx) => (
          <div key={item.id || idx} className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-xs">
            {editingIndex === idx ? (
              <PortfolioForm
                data={item}
                onSave={(updated) => handleUpdate(idx, updated)}
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{item.client}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.summary}</p>
                  <p className="text-[11px] text-slate-400 font-mono">Tech Stack: {item.stacks}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setEditingIndex(idx)}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
                    title="Edit Case Study"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer transition-colors"
                    title="Delete Case Study"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data);

  return (
    <div className="space-y-3 pt-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Project Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Client Organization</label>
          <input
            type="text"
            value={formData.client || ''}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Category</label>
          <input
            type="text"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Tech Stack Summary</label>
          <input
            type="text"
            value={formData.stacks || ''}
            onChange={(e) => setFormData({ ...formData, stacks: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Executive Summary</label>
        <textarea
          rows={2}
          value={formData.summary || ''}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(formData)}
          className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
        >
          Save Case Study
        </button>
      </div>
    </div>
  );
}

/* ─── 6. BLOG & INSIGHTS EDITOR ─── */
function BlogEditor({ blog = [], onSave }) {
  const [list, setList] = useState(blog);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setList(blog);
  }, [blog]);

  const handleUpdate = (index, updated) => {
    const next = [...list];
    next[index] = updated;
    setList(next);
    onSave(next);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this article from the blog?')) {
      const next = list.filter((_, i) => i !== index);
      setList(next);
      onSave(next);
    }
  };

  const handleCreate = () => {
    const newArticle = {
      id: Date.now(),
      title: 'New Technical Article Title',
      excerpt: 'Brief overview of this software architecture analysis or industry trend.',
      summary: 'Brief overview of this software architecture analysis or industry trend.',
      author: 'S2F Engineering Leadership',
      authorRole: 'Tech Architect',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      archiveMonth: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      category: 'Engineering Leadership',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      content: 'Write full technical breakdown here.'
    };
    const next = [newArticle, ...list];
    setList(next);
    onSave(next);
    setEditingIndex(0);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Insights & Engineering Blog</h2>
          <p className="text-xs text-slate-500 mt-1">Publish thought leadership articles and technical engineering guides.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="space-y-4">
        {list.map((post, idx) => (
          <div key={post.id || idx} className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-xs">
            {editingIndex === idx ? (
              <BlogForm
                data={post}
                onSave={(updated) => handleUpdate(idx, updated)}
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.date} • {post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{post.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{post.excerpt || post.summary}</p>
                  <p className="text-[11px] text-slate-400">By {post.author}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setEditingIndex(idx)}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    ...data,
    coverImage: data.coverImage || data.image || '',
    excerpt: data.excerpt || data.summary || '',
  });

  const handleSave = () => {
    const normalized = {
      ...formData,
      image: formData.coverImage,
      coverImage: formData.coverImage,
      summary: formData.excerpt,
      excerpt: formData.excerpt,
    };
    onSave(normalized);
  };

  return (
    <div className="space-y-3 pt-1">
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Article Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Author</label>
          <input
            type="text"
            value={formData.author || ''}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Category</label>
          <input
            type="text"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700">Read Time</label>
          <input
            type="text"
            value={formData.readTime || ''}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Summary Excerpt</label>
        <textarea
          rows={2}
          value={formData.excerpt || ''}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Cover Image URL</label>
        <input
          type="text"
          value={formData.coverImage || ''}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-700">Full Article Content</label>
        <textarea
          rows={4}
          value={formData.content || ''}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 text-xs focus:border-blue-600 font-sans"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
        >
          Save Article
        </button>
      </div>
    </div>
  );
}

/* ─── 7. LIVE LEADS CRM VIEWER (From Hostinger MySQL) ─── */
function LeadsCrmViewer({ inquiries = [], consultations = [], subscribers = [], loading, onRefresh, adminToken }) {
  const [subTab, setSubTab] = useState('inquiries'); // inquiries | consultations | subscribers
  const [search, setSearch] = useState('');

  const exportCsv = (data, filename) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val || '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Live Inbound Leads & Consultations</h2>
          <p className="text-xs text-slate-500 mt-1">Direct real-time feed from Hostinger Cloud MySQL database.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => {
              if (subTab === 'inquiries') exportCsv(inquiries, 's2f_inquiries');
              if (subTab === 'consultations') exportCsv(consultations, 's2f_consultations');
              if (subTab === 'subscribers') exportCsv(subscribers, 's2f_subscribers');
            }}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
        <button
          onClick={() => setSubTab('inquiries')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            subTab === 'inquiries' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Contact Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setSubTab('consultations')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            subTab === 'consultations' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Consultation Bookings ({consultations.length})
        </button>
        <button
          onClick={() => setSubTab('subscribers')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            subTab === 'subscribers' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-x-auto shadow-xs">
        {subTab === 'inquiries' && (
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Email / Phone</th>
                <th className="p-3.5">Service Interest</th>
                <th className="p-3.5">Message</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No inquiries recorded in database yet.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900">{inq.name}</td>
                    <td className="p-3.5 font-mono text-blue-600">
                      <div>{inq.email}</div>
                      {inq.phone && <div className="text-slate-500 text-[10px]">{inq.phone}</div>}
                    </td>
                    <td className="p-3.5 text-slate-700">{inq.service_type || inq.service_needed || 'Enterprise IT Solutions'}</td>
                    <td className="p-3.5 text-slate-500 max-w-xs truncate">{inq.message}</td>
                    <td className="p-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                        {inq.status || 'Received'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {subTab === 'consultations' && (
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-3.5">Booked At</th>
                <th className="p-3.5">Client Name</th>
                <th className="p-3.5">Work Email</th>
                <th className="p-3.5">Organization</th>
                <th className="p-3.5">Engagement Scope</th>
                <th className="p-3.5">Target Timeline</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No consultation bookings recorded yet.
                  </td>
                </tr>
              ) : (
                consultations.map((cons) => (
                  <tr key={cons.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(cons.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900">{cons.name}</td>
                    <td className="p-3.5 font-mono text-blue-600">{cons.email}</td>
                    <td className="p-3.5 text-slate-700">{cons.company || 'Confidential'}</td>
                    <td className="p-3.5 text-slate-700">{cons.service_type || cons.squad_type || 'Architecture Consult'}</td>
                    <td className="p-3.5 text-slate-500">{cons.timeline || 'Immediate'}</td>
                    <td className="p-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                        {cons.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {subTab === 'subscribers' && (
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-3.5">Subscribed Date</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-400">
                    No newsletter subscribers registered yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-mono text-slate-900">{sub.email}</td>
                    <td className="p-3.5 text-slate-500">{sub.source || 'Website'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── 8. SETTINGS & CONTACT INFO EDITOR ─── */
function SettingsEditor({ settings = {}, onSave }) {
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Contact Information & Global Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Configure global office addresses, support emails, and operating hours.</p>
        </div>
        {saved && (
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
            <Check className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Primary Support Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Secondary / Technical Email</label>
              <input
                type="email"
                value={formData.secondaryEmail || ''}
                onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Direct Phone Line</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Operating Business Hours</label>
              <input
                type="text"
                value={formData.hours || ''}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Physical Office / Hub Address</label>
            <input
              type="text"
              value={formData.officeAddress || ''}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Global Settings</span>
        </button>
      </form>
    </div>
  );
}
