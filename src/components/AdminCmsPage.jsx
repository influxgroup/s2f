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
  GitBranch,
  Users,
  Briefcase,
  BookOpen,
  Inbox,
  Settings,
  Save,
  LogOut,
  ExternalLink,
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
  ChevronRight,
  Eye
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
  const [emailInput, setEmailInput] = useState('admin@sovereign2freshempire.com');
  const [passwordInput, setPasswordInput] = useState('S2FAdmin2026!Secure');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Active Admin Section Tab
  const [activeSection, setActiveSection] = useState('hero'); // hero | services | security | matrix | vetting | talent | portfolio | blog | leads | settings

  // Leads CRM State
  const [inquiries, setInquiries] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsSubTab, setLeadsSubTab] = useState('inquiries'); // inquiries | consultations | subscribers

  // Editing Modals / Inline states
  const [editingItem, setEditingItem] = useState(null); // for talent, service, portfolio, blog
  const [itemType, setItemType] = useState(''); // 'service' | 'talent' | 'portfolio' | 'blog' | 'package'

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
      console.warn('Leads fetch error:', err);
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
  // 1. LOGIN SCREEN (If not authenticated)
  // ─────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-100 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <img src={s2fLogoHeader} alt="Sovereign2Fresh Empire" className="h-9 mx-auto object-contain" />
            <h1 className="text-xl font-bold text-white tracking-tight font-heading pt-2">
              Admin Content Studio
            </h1>
            <p className="text-xs text-slate-400">
              Manage website copy, services, talent, portfolio, and live leads.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-lg bg-red-950/70 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-slate-300">Admin Email</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="admin@sovereign2freshempire.com"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingLogin}
              className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmittingLogin ? 'Authenticating...' : 'Sign In to Admin Studio'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={onExitAdmin}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>← Back to Public Website</span>
            </button>
            <span className="text-[11px] text-slate-500">Hostinger Cloud MySQL</span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. MAIN ADMIN CMS STUDIO INTERFACE
  // ─────────────────────────────────────────────────────────────
  const navTabs = [
    { id: 'hero', label: 'Hero & Headlines', icon: Sparkles },
    { id: 'services', label: 'Services & Capabilities', icon: Layers, count: content.services?.length },
    { id: 'security', label: 'Cyber Security & Audits', icon: ShieldCheck },
    { id: 'matrix', label: 'Differentiation Matrix', icon: Scale },
    { id: 'vetting', label: '5-Stage Vetting Pipeline', icon: GitBranch },
    { id: 'talent', label: 'Vetted Talent Pool', icon: Users, count: content.talent?.length },
    { id: 'portfolio', label: 'Portfolio & Case Studies', icon: Briefcase, count: content.portfolio?.length },
    { id: 'blog', label: 'Insights & Blog', icon: BookOpen, count: content.blog?.length },
    { id: 'leads', label: 'Live Leads & Inquiries', icon: Inbox, badge: 'Live DB' },
    { id: 'settings', label: 'Contact & Global Info', icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Fixed Admin Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={s2fLogoHeader} alt="Sovereign2Fresh Empire" className="h-8 w-auto object-contain" />
          <div className="hidden sm:block border-l border-slate-800 pl-4">
            <span className="text-xs font-semibold text-white">Admin CMS Studio</span>
            <span className="text-[10px] text-emerald-400 block font-mono">Live Database Connected</span>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2.5">
          {saveStatus.state !== 'idle' && (
            <div
              className={`text-xs px-3 py-1 rounded-md font-medium flex items-center gap-1.5 ${
                saveStatus.state === 'saving'
                  ? 'bg-blue-950 text-blue-300 border border-blue-800 animate-pulse'
                  : saveStatus.state === 'success'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-red-950 text-red-300 border border-red-800'
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
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Publish all modified content directly to Hostinger MySQL"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Save All to Cloud</span>
            <span className="md:hidden">Save</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            title="Return to the live customer view"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            onClick={logout}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Sign out from CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Studio Body: Sidebar Navigation + Content Area */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-full">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 shrink-0 p-3 space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Content Sections
          </div>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3">
            <button
              onClick={() => {
                if (window.confirm('Reset all CMS content back to original factory defaults? This will overwrite recent modifications.')) {
                  resetToFactoryDefaults();
                }
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-800 hover:border-red-900/60 text-slate-500 hover:text-red-400 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Factory Defaults</span>
            </button>
          </div>
        </aside>

        {/* Right Dynamic Form Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto max-w-5xl">
          
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

          {/* TAB 5: VETTING PIPELINE */}
          {activeSection === 'vetting' && (
            <VettingEditor
              vetting={content.vetting || []}
              onSave={(updated) => updateSection('vetting', updated)}
            />
          )}

          {/* TAB 6: VETTED TALENT POOL */}
          {activeSection === 'talent' && (
            <TalentEditor
              talent={content.talent || []}
              onSave={(updated) => updateSection('talent', updated)}
            />
          )}

          {/* TAB 7: PORTFOLIO */}
          {activeSection === 'portfolio' && (
            <PortfolioEditor
              portfolio={content.portfolio || []}
              onSave={(updated) => updateSection('portfolio', updated)}
            />
          )}

          {/* TAB 8: BLOG */}
          {activeSection === 'blog' && (
            <BlogEditor
              blog={content.blog || []}
              onSave={(updated) => updateSection('blog', updated)}
            />
          )}

          {/* TAB 9: LIVE LEADS CRM */}
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

          {/* TAB 10: CONTACT & SETTINGS */}
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
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Hero Section & Headline Settings</h2>
          <p className="text-xs text-slate-400 mt-1">Configure primary value proposition, CTAs, and counter ribbon metrics.</p>
        </div>
        {saved && <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium"><Check className="w-4 h-4" /> Changes Applied</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">Main Copy & Badges</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Status Pill Text (Top Badge)</label>
            <input
              type="text"
              value={formData.statusPill || ''}
              onChange={(e) => setFormData({ ...formData, statusPill: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Primary Headline</label>
            <input
              type="text"
              value={formData.headline || ''}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Headline Highlight Words (Colored Blue)</label>
            <input
              type="text"
              value={formData.headlineHighlight || ''}
              onChange={(e) => setFormData({ ...formData, headlineHighlight: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Subheadline / Supporting Narrative</label>
            <textarea
              rows={3}
              value={formData.subheadline || ''}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Primary CTA Label</label>
              <input
                type="text"
                value={formData.primaryCta || ''}
                onChange={(e) => setFormData({ ...formData, primaryCta: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Secondary CTA Label</label>
              <input
                type="text"
                value={formData.secondaryCta || ''}
                onChange={(e) => setFormData({ ...formData, secondaryCta: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-medium text-slate-400">Social Proof Text</label>
            <input
              type="text"
              value={formData.socialProofText || ''}
              onChange={(e) => setFormData({ ...formData, socialProofText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500"
            />
          </div>
        </div>

        {/* Counter Ribbon Metrics */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">Animated Counter Ribbon Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Engineers Deployed (+)</label>
              <input
                type="number"
                value={formData.metricEngineers ?? 180}
                onChange={(e) => setFormData({ ...formData, metricEngineers: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Client Retention (%)</label>
              <input
                type="number"
                value={formData.metricRetention ?? 90}
                onChange={(e) => setFormData({ ...formData, metricRetention: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Sprints Delivered (K+)</label>
              <input
                type="number"
                value={formData.metricSprints ?? 10}
                onChange={(e) => setFormData({ ...formData, metricSprints: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Replacement SLA (Hrs)</label>
              <input
                type="number"
                value={formData.metricSlaHours ?? 48}
                onChange={(e) => setFormData({ ...formData, metricSlaHours: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
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
  const [newItem, setNewItem] = useState(null);

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
      rate: '$60 - $85/hr',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
    };
    const next = [...list, created];
    setList(next);
    onSave(next);
    setEditingIndex(next.length - 1);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Services & Technical Capabilities</h2>
          <p className="text-xs text-slate-400 mt-1">Manage all technical offerings, rate ranges, and stack descriptions.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((service, idx) => (
          <div key={service.id || idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            {editingIndex === idx ? (
              <ServiceForm
                data={service}
                onSave={(updated) => handleUpdate(idx, updated)}
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      {service.badge}
                    </span>
                    <h3 className="font-bold text-white text-sm pt-1">{service.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{service.tagline}</p>
                  </div>
                  <img
                    src={service.image}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-slate-800 shrink-0"
                  />
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{service.rate || '$50 - $80/hr'}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingIndex(idx)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
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
        <label className="text-[11px] text-slate-400">Service Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Badge</label>
          <input
            type="text"
            value={formData.badge || ''}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Rate Range</label>
          <input
            type="text"
            value={formData.rate || ''}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Description Tagline</label>
        <textarea
          rows={2}
          value={formData.tagline || ''}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Cover Image URL</label>
        <input
          type="text"
          value={formData.image || ''}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(formData)}
          className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
        >
          Apply
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
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Cyber Security & Audits Management</h2>
          <p className="text-xs text-slate-400 mt-1">Configure threat hotline, response SLAs, and security packages.</p>
        </div>
        {saved && <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium"><Check className="w-4 h-4" /> Saved</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200">Incident Triage & Hotline</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Emergency Phone Hotline</label>
              <input
                type="text"
                value={formData.hotline || ''}
                onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">SLA Response Guarantee</label>
              <input
                type="text"
                value={formData.slaResponse || ''}
                onChange={(e) => setFormData({ ...formData, slaResponse: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Page Headline</label>
            <input
              type="text"
              value={formData.headline || ''}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Page Subheadline</label>
            <textarea
              rows={2}
              value={formData.subheadline || ''}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>

        {/* 3 Security Packages */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">Audit & Retainer Packages</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(formData.packages || []).map((pkg, idx) => (
              <div key={pkg.id || idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="space-y-1">
                  <input
                    type="text"
                    value={pkg.name || ''}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="w-full font-bold text-white text-xs px-2 py-1 rounded bg-slate-950 border border-slate-700"
                    placeholder="Package Name"
                  />
                  <input
                    type="text"
                    value={pkg.price || ''}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-full text-blue-400 font-mono text-sm px-2 py-1 rounded bg-slate-950 border border-slate-700 font-bold"
                    placeholder="Price (e.g. $2,850)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">Cadence / Turnaround</label>
                  <input
                    type="text"
                    value={pkg.turnaround || ''}
                    onChange={(e) => handlePackageChange(idx, 'turnaround', e.target.value)}
                    className="w-full text-xs px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">Tagline</label>
                  <textarea
                    rows={2}
                    value={pkg.tagline || ''}
                    onChange={(e) => handlePackageChange(idx, 'tagline', e.target.value)}
                    className="w-full text-xs px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
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
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Differentiation Matrix Editor</h2>
          <p className="text-xs text-slate-400 mt-1">Comparison criteria table between S2F, Traditional Outsourcing, and Freelance.</p>
        </div>
        <button
          onClick={handleAddRow}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Criterion Row</span>
        </button>
      </div>

      <div className="space-y-4">
        {list.map((row, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={row.criterion || ''}
                onChange={(e) => handleRowChange(idx, 'criterion', e.target.value)}
                className="font-bold text-white text-xs px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 w-64"
                placeholder="Comparison Criterion"
              />
              <button
                onClick={() => handleDeleteRow(idx)}
                className="p-1.5 text-slate-400 hover:text-red-400 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[10px] text-blue-400 font-bold uppercase">Sovereign2Fresh Standard</label>
                <textarea
                  rows={2}
                  value={row.s2f || ''}
                  onChange={(e) => handleRowChange(idx, 's2f', e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-slate-950 border border-blue-900/60 text-slate-200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Traditional Outsourcing</label>
                <textarea
                  rows={2}
                  value={row.outsourcing || ''}
                  onChange={(e) => handleRowChange(idx, 'outsourcing', e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Freelance Platforms</label>
                <textarea
                  rows={2}
                  value={row.freelance || ''}
                  onChange={(e) => handleRowChange(idx, 'freelance', e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
      >
        <Save className="w-4 h-4" />
        <span>Save Differentiation Matrix</span>
      </button>
    </div>
  );
}

/* ─── 5. VETTING PIPELINE EDITOR ─── */
function VettingEditor({ vetting = [], onSave }) {
  const [list, setList] = useState(vetting);
  const [saved, setSaved] = useState(false);

  const handleStageChange = (index, field, value) => {
    const next = [...list];
    next[index] = { ...next[index], [field]: value };
    setList(next);
  };

  const handleSave = () => {
    onSave(list);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">5-Stage Vetting Pipeline Editor</h2>
          <p className="text-xs text-slate-400 mt-1">Configure the 5 rigorous screening gates and cumulative pass rates.</p>
        </div>
        {saved && <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium"><Check className="w-4 h-4" /> Saved</span>}
      </div>

      <div className="space-y-4">
        {list.map((stage, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {stage.stage || idx + 1}
                </span>
                <input
                  type="text"
                  value={stage.title || ''}
                  onChange={(e) => handleStageChange(idx, 'title', e.target.value)}
                  className="font-bold text-white text-xs px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 w-80 sm:w-96"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-mono">Pass Rate:</span>
                <input
                  type="text"
                  value={stage.passRate || ''}
                  onChange={(e) => handleStageChange(idx, 'passRate', e.target.value)}
                  className="w-16 text-center font-bold text-emerald-400 text-xs px-2 py-1 rounded bg-slate-950 border border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Evaluation Description</label>
              <textarea
                rows={2}
                value={stage.description || ''}
                onChange={(e) => handleStageChange(idx, 'description', e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
      >
        <Save className="w-4 h-4" />
        <span>Save Vetting Pipeline</span>
      </button>
    </div>
  );
}

/* ─── 6. TALENT POOL EDITOR ─── */
function TalentEditor({ talent = [], onSave }) {
  const [list, setList] = useState(talent);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleUpdate = (index, updated) => {
    const next = [...list];
    next[index] = updated;
    setList(next);
    onSave(next);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm('Remove this engineer profile from the talent pool?')) {
      const next = list.filter((_, i) => i !== index);
      setList(next);
      onSave(next);
    }
  };

  const handleCreate = () => {
    const newEngineer = {
      id: `CLT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: 'New Vetted Engineer',
      title: 'Senior Full Stack Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      country: 'Nigeria (Lagos)',
      flag: '🇳🇬',
      timezone: 'WAT (5 hrs overlap with UK/EST)',
      seniority: 'Senior',
      yearsExp: 6,
      primaryStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      availability: 'Available Immediately',
      billableRate: 60,
      overallScore: 97,
      completedProjects: 8,
      bio: 'Expert software engineer with deep expertise in scalable cloud microservices, clean architecture, and modern web application development.'
    };
    const next = [newEngineer, ...list];
    setList(next);
    onSave(next);
    setEditingIndex(0);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Vetted Talent Pool Explorer</h2>
          <p className="text-xs text-slate-400 mt-1">Manage software engineers, technical stacks, billable rates, and availability.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Engineer Profile</span>
        </button>
      </div>

      <div className="space-y-3">
        {list.map((eng, idx) => (
          <div key={eng.id || idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            {editingIndex === idx ? (
              <TalentForm
                data={eng}
                onSave={(updated) => handleUpdate(idx, updated)}
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={eng.avatar}
                    alt={eng.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{eng.name}</span>
                      <span className="text-xs">{eng.flag}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {eng.id}
                      </span>
                    </div>
                    <p className="text-xs text-blue-400 font-medium">{eng.title}</p>
                    <p className="text-[11px] text-slate-400">{eng.country} • {eng.yearsExp} Yrs Exp • Score: {eng.overallScore}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-xs font-bold text-white font-mono">${eng.billableRate}/hr</span>
                    <span className="text-[10px] block text-emerald-400">{eng.availability}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingIndex(idx)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TalentForm({ data, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    ...data,
    primaryStackString: Array.isArray(data.primaryStack) ? data.primaryStack.join(', ') : data.primaryStack || ''
  });

  const handleFormSubmit = () => {
    const stackArray = formData.primaryStackString
      ? formData.primaryStackString.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    onSave({
      ...formData,
      primaryStack: stackArray
    });
  };

  return (
    <div className="space-y-3 pt-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Full Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Professional Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Billable Rate ($/hr)</label>
          <input
            type="number"
            value={formData.billableRate ?? 60}
            onChange={(e) => setFormData({ ...formData, billableRate: Number(e.target.value) })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Years Experience</label>
          <input
            type="number"
            value={formData.yearsExp ?? 5}
            onChange={(e) => setFormData({ ...formData, yearsExp: Number(e.target.value) })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Availability</label>
          <input
            type="text"
            value={formData.availability || ''}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Primary Tech Stack (comma separated)</label>
        <input
          type="text"
          value={formData.primaryStackString}
          onChange={(e) => setFormData({ ...formData, primaryStackString: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          placeholder="React, Node.js, TypeScript, AWS, PostgreSQL"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Bio Summary</label>
        <textarea
          rows={2}
          value={formData.bio || ''}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Avatar Image URL</label>
        <input
          type="text"
          value={formData.avatar || ''}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleFormSubmit}
          className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
        >
          Save Engineer
        </button>
      </div>
    </div>
  );
}

/* ─── 7. PORTFOLIO & CASE STUDIES EDITOR ─── */
function PortfolioEditor({ portfolio = [], onSave }) {
  const [list, setList] = useState(portfolio);
  const [editingIndex, setEditingIndex] = useState(null);

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
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Portfolio & Case Studies</h2>
          <p className="text-xs text-slate-400 mt-1">Manage featured client case studies, metrics, and technology architectures.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Case Study</span>
        </button>
      </div>

      <div className="space-y-4">
        {list.map((item, idx) => (
          <div key={item.id || idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
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
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{item.client}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.summary}</p>
                  <p className="text-[11px] text-slate-500 font-mono">Tech Stack: {item.stacks}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setEditingIndex(idx)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
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
          <label className="text-[11px] text-slate-400">Project Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Client Organization</label>
          <input
            type="text"
            value={formData.client || ''}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Category</label>
          <input
            type="text"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Tech Stack Summary</label>
          <input
            type="text"
            value={formData.stacks || ''}
            onChange={(e) => setFormData({ ...formData, stacks: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Executive Summary</label>
        <textarea
          rows={2}
          value={formData.summary || ''}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(formData)}
          className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
        >
          Save Case Study
        </button>
      </div>
    </div>
  );
}

/* ─── 8. BLOG & INSIGHTS EDITOR ─── */
function BlogEditor({ blog = [], onSave }) {
  const [list, setList] = useState(blog);
  const [editingIndex, setEditingIndex] = useState(null);

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
      author: 'S2F Engineering Leadership',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category: 'Engineering Leadership',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    };
    const next = [newArticle, ...list];
    setList(next);
    onSave(next);
    setEditingIndex(0);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Insights & Engineering Blog</h2>
          <p className="text-xs text-slate-400 mt-1">Publish thought leadership articles and technical engineering guides.</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="space-y-4">
        {list.map((post, idx) => (
          <div key={post.id || idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
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
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.date} • {post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{post.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
                  <p className="text-[11px] text-slate-500">By {post.author}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setEditingIndex(idx)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
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
  const [formData, setFormData] = useState(data);

  return (
    <div className="space-y-3 pt-1">
      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Article Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Author</label>
          <input
            type="text"
            value={formData.author || ''}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Category</label>
          <input
            type="text"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Read Time</label>
          <input
            type="text"
            value={formData.readTime || ''}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Summary Excerpt</label>
        <textarea
          rows={2}
          value={formData.excerpt || ''}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Cover Image URL</label>
        <input
          type="text"
          value={formData.coverImage || ''}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(formData)}
          className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
        >
          Save Article
        </button>
      </div>
    </div>
  );
}

/* ─── 9. LIVE LEADS CRM VIEWER (From Hostinger MySQL) ─── */
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
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Live Inbound Leads & Consultations</h2>
          <p className="text-xs text-slate-400 mt-1">Direct real-time feed from Hostinger Cloud MySQL database.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
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
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setSubTab('inquiries')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
            subTab === 'inquiries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Contact Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setSubTab('consultations')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
            subTab === 'consultations' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Consultation Bookings ({consultations.length})
        </button>
        <button
          onClick={() => setSubTab('subscribers')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
            subTab === 'subscribers' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
        {subTab === 'inquiries' && (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Client</th>
                <th className="p-3">Email / Phone</th>
                <th className="p-3">Service Interest</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No inquiries recorded in database yet.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-semibold text-white">{inq.name}</td>
                    <td className="p-3 font-mono text-blue-400">
                      <div>{inq.email}</div>
                      {inq.phone && <div className="text-slate-400 text-[10px]">{inq.phone}</div>}
                    </td>
                    <td className="p-3 text-slate-300">{inq.service_needed || 'General Inquiry'}</td>
                    <td className="p-3 text-slate-400 max-w-xs truncate">{inq.message}</td>
                    <td className="p-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
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
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Booked At</th>
                <th className="p-3">Client Name</th>
                <th className="p-3">Work Email</th>
                <th className="p-3">Organization</th>
                <th className="p-3">Target Timeline</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No consultation bookings recorded yet.
                  </td>
                </tr>
              ) : (
                consultations.map((cons) => (
                  <tr key={cons.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(cons.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-semibold text-white">{cons.name}</td>
                    <td className="p-3 font-mono text-blue-400">{cons.email}</td>
                    <td className="p-3">{cons.company || 'Confidential'}</td>
                    <td className="p-3 text-slate-300">{cons.timeline || 'Immediate'}</td>
                    <td className="p-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
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
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Subscribed Date</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500">
                    No newsletter subscribers registered yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-mono text-white">{sub.email}</td>
                    <td className="p-3 text-slate-400">{sub.source || 'Website'}</td>
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

/* ─── 10. SETTINGS & CONTACT INFO EDITOR ─── */
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
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Contact Information & Global Settings</h2>
          <p className="text-xs text-slate-400 mt-1">Configure global office addresses, support emails, and operating hours.</p>
        </div>
        {saved && <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium"><Check className="w-4 h-4" /> Saved</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Primary Support Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Secondary / Technical Email</label>
              <input
                type="email"
                value={formData.secondaryEmail || ''}
                onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Direct Phone Line</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Operating Business Hours</label>
              <input
                type="text"
                value={formData.hours || ''}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Physical Office / Hub Address</label>
            <input
              type="text"
              value={formData.officeAddress || ''}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Global Settings</span>
        </button>
      </form>
    </div>
  );
}
