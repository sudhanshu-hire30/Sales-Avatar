import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  TrendingUp,
  MessageCircle,
  PhoneCall,
  Mail,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  LogOut,
  Lock,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  X,
  LayoutDashboard,
  BarChart3,
  Zap,
  Activity,
  Award,
  CheckSquare,
  Square,
  ExternalLink,
  Send,
  Copy,
  Check,
  ChevronRight,
  Target,
  DollarSign,
  Briefcase,
  Layers,
  HelpCircle,
  Menu,
  UserPlus
} from 'lucide-react';
import api from '../api';
import usePageSeo from '../utils/usePageSeo';

const STAGE_OPTIONS = [
  'New Inbound',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Closed Won',
  'Closed Lost'
];

const REP_ROLES = [
  'Enterprise AE Specialist',
  'Mid-Market Sales Lead',
  'Inbound SDR Lead',
  'Growth & Strategic Alliances',
  'Key Account Manager',
  'Commercial Sales Representative'
];

export default function AdminLeadsPage() {
  usePageSeo({
    title: 'Admin Command Center | SalesAvatar CRM',
    description: 'Private enterprise lead management, sales pipeline, and rep analytics portal.',
    canonicalPath: '/admin',
    robots: 'noindex, nofollow'
  });

  // Auth State
  const [token, setToken] = useState(() => localStorage.getItem('salesavatar_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('salesavatar_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Navigation Tab: 'pipeline' | 'analytics' | 'reps'
  const [activeTab, setActiveTab] = useState('pipeline');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Leads Data & Statistics
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Dynamic Sales Reps List from MySQL
  const [repsList, setRepsList] = useState([]);
  const [repsLoading, setRepsLoading] = useState(false);
  const [addRepModalOpen, setAddRepModalOpen] = useState(false);
  const [newRepData, setNewRepData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Enterprise AE Specialist',
    quota: 1000000
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedRep, setSelectedRep] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Bulk Selection
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  // Modals & Drawers
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeLead, setActiveLead] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    deal_value: 75000,
    stage: 'New Inbound',
    assigned_to: 'Prince Tiwari',
    plan_interested: 'Professional',
    notes: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // 1. Fetch leads & stats from server
  const fetchLeads = useCallback(async (isSilent = false) => {
    if (!token) return;
    if (!isSilent) setLoading(true);
    setRefreshing(true);
    try {
      let queryUrl = '/admin/leads?';
      if (selectedStage !== 'all') queryUrl += `stage=${encodeURIComponent(selectedStage)}&`;
      if (selectedSource !== 'all') queryUrl += `source=${encodeURIComponent(selectedSource)}&`;
      if (searchQuery.trim()) queryUrl += `search=${encodeURIComponent(searchQuery.trim())}&`;
      if (sortBy !== 'newest') queryUrl += `sortBy=${encodeURIComponent(sortBy)}&`;

      const [leadsRes, statsRes] = await Promise.all([
        api.get(queryUrl),
        api.get('/admin/leads/stats')
      ]);

      if (leadsRes.success) setLeads(leadsRes.leads || []);
      if (statsRes.success) setStats(statsRes.stats);
    } catch (err) {
      if (err.message && err.message.includes('401')) {
        handleLogout();
      } else {
        showToast('Sync error: ' + err.message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, selectedStage, selectedSource, searchQuery, sortBy]);

  // 1b. Fetch dynamic sales reps from MySQL
  const fetchReps = useCallback(async () => {
    if (!token) return;
    setRepsLoading(true);
    try {
      const res = await api.get('/admin/reps');
      if (res.success && Array.isArray(res.reps)) {
        setRepsList(res.reps);
        if (res.reps.length > 0 && !newLead.assigned_to) {
          setNewLead(prev => ({ ...prev, assigned_to: res.reps[0].name }));
        }
      }
    } catch (err) {
      console.error('[Admin Reps Error]', err);
    } finally {
      setRepsLoading(false);
    }
  }, [token, newLead.assigned_to]);

  useEffect(() => {
    if (token) {
      fetchLeads();
      fetchReps();
    }
  }, [fetchLeads, fetchReps, token]);

  // 2. Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await api.post('/auth/login', {
        email: loginEmail,
        password: loginPassword
      });

      if (res.success && res.token) {
        localStorage.setItem('salesavatar_admin_token', res.token);
        localStorage.setItem('salesavatar_admin_user', JSON.stringify(res.user));
        setToken(res.token);
        setAdminUser(res.user);
        showToast(`Welcome back, ${res.user.name}!`);
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('salesavatar_admin_token');
    localStorage.removeItem('salesavatar_admin_user');
    setToken('');
    setAdminUser(null);
    setLeads([]);
    setRepsList([]);
  };

  // 3. Stage Change
  const handleStageChange = async (leadId, newStage) => {
    try {
      const current = leads.find(l => l.id === leadId);
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
      if (activeLead && activeLead.id === leadId) {
        setActiveLead(prev => ({ ...prev, stage: newStage }));
      }

      await api.patch(`/admin/leads/${leadId}`, { stage: newStage });
      showToast(`Updated to "${newStage}"`);
      fetchLeads(true);
      fetchReps();
    } catch (err) {
      showToast('Stage update failed: ' + err.message);
      fetchLeads(true);
    }
  };

  // 4. Rep Reassignment
  const handleRepChange = async (leadId, newRep) => {
    try {
      const current = leads.find(l => l.id === leadId);
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assigned_to: newRep } : l));
      if (activeLead && activeLead.id === leadId) {
        setActiveLead(prev => ({ ...prev, assigned_to: newRep }));
      }

      await api.patch(`/admin/leads/${leadId}`, { assigned_to: newRep });
      showToast(`Reassigned to ${newRep}`);
      fetchReps();
    } catch (err) {
      showToast('Reassignment failed: ' + err.message);
      fetchLeads(true);
    }
  };

  // 4b. Add New Sales Rep Handler
  const handleCreateRep = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/reps', newRepData);
      if (res.success) {
        showToast(`Sales representative "${newRepData.name}" added!`);
        setAddRepModalOpen(false);
        setNewRepData({
          name: '',
          email: '',
          phone: '',
          role: 'Enterprise AE Specialist',
          quota: 1000000
        });
        fetchReps();
      }
    } catch (err) {
      showToast('Failed to add sales rep: ' + err.message);
    }
  };

  // 4c. Delete Sales Rep Handler
  const handleDeleteRep = async (repId, repName) => {
    if (!window.confirm(`Are you sure you want to remove "${repName}" from the sales team?`)) return;
    try {
      await api.delete(`/admin/reps/${repId}`);
      showToast(`Representative "${repName}" removed.`);
      fetchReps();
    } catch (err) {
      showToast('Delete failed: ' + err.message);
    }
  };

  // 5. Save Notes
  const handleSaveNotes = async () => {
    if (!activeLead) return;
    try {
      await api.patch(`/admin/leads/${activeLead.id}`, { notes: activeLead.notes });
      showToast('Lead notes updated successfully');
      setDrawerOpen(false);
      fetchLeads(true);
    } catch (err) {
      showToast('Failed to save notes: ' + err.message);
    }
  };

  // 6. Add Manual Lead
  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/leads/manual', newLead);
      if (res.success) {
        showToast('New lead added to pipeline!');
        setAddModalOpen(false);
        setNewLead({
          name: '',
          email: '',
          phone: '',
          company: '',
          deal_value: 75000,
          stage: 'New Inbound',
          assigned_to: repsList[0]?.name || 'Prince Tiwari',
          plan_interested: 'Professional',
          notes: ''
        });
        fetchLeads();
        fetchReps();
      }
    } catch (err) {
      showToast('Failed to add lead: ' + err.message);
    }
  };

  // 7. Delete Lead
  const handleDeleteLead = async (leadId, leadName) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${leadName || 'this lead'}"?`)) return;
    try {
      await api.delete(`/admin/leads/${leadId}`);
      showToast('Lead deleted from pipeline.');
      setLeads(prev => prev.filter(l => l.id !== leadId));
      setSelectedLeadIds(prev => prev.filter(id => id !== leadId));
      if (activeLead && activeLead.id === leadId) setDrawerOpen(false);
      fetchLeads(true);
      fetchReps();
    } catch (err) {
      showToast('Delete failed: ' + err.message);
    }
  };

  // 8. Bulk Operations
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map(l => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedLeadIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkStageChange = async (targetStage) => {
    if (selectedLeadIds.length === 0) return;
    try {
      await api.post('/admin/leads/bulk-stage', {
        leadIds: selectedLeadIds,
        stage: targetStage
      });
      showToast(`Updated ${selectedLeadIds.length} leads to "${targetStage}"`);
      setSelectedLeadIds([]);
      fetchLeads();
      fetchReps();
    } catch (err) {
      showToast('Bulk update failed: ' + err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeadIds.length === 0) return;
    if (!window.confirm(`Permanently delete ${selectedLeadIds.length} selected leads?`)) return;
    try {
      await api.post('/admin/leads/bulk-delete', { leadIds: selectedLeadIds });
      showToast(`Deleted ${selectedLeadIds.length} leads`);
      setSelectedLeadIds([]);
      fetchLeads();
      fetchReps();
    } catch (err) {
      showToast('Bulk delete failed: ' + err.message);
    }
  };

  // 9. Export CSV
  const handleExportCsv = () => {
    const tokenVal = localStorage.getItem('salesavatar_admin_token');
    const exportUrl = `${import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api')}/admin/leads/export`;

    fetch(exportUrl, {
      headers: { Authorization: `Bearer ${tokenVal}` }
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `salesavatar-crm-leads-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast('Leads CSV exported successfully!');
      })
      .catch(err => showToast('Export failed: ' + err.message));
  };

  // WhatsApp Launcher
  const openWhatsApp = (phone, name, company) => {
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hi ${name || 'there'}, thank you for your interest in SalesAvatar CRM for ${company || 'your business'}. Prince here from SalesAvatar. When is a convenient time today for your 15-minute live workflow demo?`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  // Currency Formatter
  const formatINR = (val) => {
    const num = Number(val) || 0;
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakh`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Client-side filtering for rep
  const filteredLeads = useMemo(() => {
    let result = leads;
    if (selectedRep !== 'all') {
      result = result.filter(l => l.assigned_to === selectedRep);
    }
    return result;
  }, [leads, selectedRep]);

  // Stage count calculations for pills
  const stageCounts = useMemo(() => {
    const counts = { all: leads.length };
    STAGE_OPTIONS.forEach(s => counts[s] = 0);
    leads.forEach(l => {
      if (counts[l.stage] !== undefined) counts[l.stage]++;
    });
    return counts;
  }, [leads]);

  // -------------------------------------------------------------------------
  // VIEW A: DEDICATED ADMIN LOGIN SCREEN (NO PUBLIC FOOTER/NAV/WHATSAPP)
  // -------------------------------------------------------------------------
  if (!token) {
    return (
      <div className="admin-isolated-login-wrapper">
        <div className="login-box-glow"></div>
        <div className="login-card-container">
          <div className="login-brand-header">
            <div className="brand-logo-icon">
              <TrendingUp size={24} color="#ffffff" strokeWidth={2.8} />
            </div>
            <div>
              <h2 className="login-title">SalesAvatar CRM</h2>
              <span className="login-tagline">Super Admin Command Center</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {loginError && (
              <div className="login-error-alert">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <div className="form-group">
              <label>Work Email</label>
              <div className="input-wrap">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@salesavatar.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <Lock size={16} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="btn-toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-login-submit" disabled={loginLoading}>
              {loginLoading ? 'Authenticating Security Token...' : 'Enter Admin Command Center'}
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="admin-login-security-notice">
            <ShieldCheck size={14} className="security-icon" />
            <span>256-Bit Encrypted Session • MySQL Protected • Strictly Private</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VIEW B: ENTERPRISE FULL ADMIN DASHBOARD (FROZEN STICKY SIDEBAR + VIEWPORT)
  // -------------------------------------------------------------------------
  return (
    <div className={`admin-enterprise-root ${sidebarCollapsed ? 'sidebar-minimized' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. LEFT ADMIN SIDEBAR - PERMANENTLY FIXED & NEVER MOVES WITH CONTENT */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand-section">
          <div className="sidebar-brand-header">
            <div className="brand-logo-icon">
              <TrendingUp size={22} color="#ffffff" strokeWidth={2.8} />
            </div>
            {!sidebarCollapsed && (
              <div className="brand-title-wrap">
                <h1 className="brand-title">SalesAvatar</h1>
                <span className="brand-badge">COMMAND CENTER</span>
              </div>
            )}
          </div>
          <button
            className="btn-collapse-sidebar"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title="Toggle Sidebar"
          >
            <ChevronRight size={16} className={`collapse-chevron ${sidebarCollapsed ? 'rotated' : ''}`} />
          </button>
        </div>

        {/* Database Status Indicator */}
        {!sidebarCollapsed && (
          <div className="sidebar-status-card">
            <div className="status-indicator-dot"></div>
            <div className="status-info">
              <span className="status-label">MySQL 8.0 Live</span>
              <span className="status-sub">Auto-Syncing Engine</span>
            </div>
          </div>
        )}

        {/* Navigation Modules */}
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => { setActiveTab('pipeline'); setMobileMenuOpen(false); }}
          >
            <LayoutDashboard size={19} className="nav-icon" />
            {!sidebarCollapsed && <span>Leads Pipeline</span>}
            {!sidebarCollapsed && (
              <span className="nav-badge">{leads.length}</span>
            )}
          </button>

          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}
          >
            <BarChart3 size={19} className="nav-icon" />
            {!sidebarCollapsed && <span>Funnel & Analytics</span>}
          </button>

          <button
            className={`nav-item ${activeTab === 'reps' ? 'active' : ''}`}
            onClick={() => { setActiveTab('reps'); setMobileMenuOpen(false); }}
          >
            <Users size={19} className="nav-icon" />
            {!sidebarCollapsed && <span>Sales Team & Quota</span>}
            {!sidebarCollapsed && (
              <span className="nav-badge rep-badge-count">{repsList.length}</span>
            )}
          </button>
        </nav>

        {/* Sidebar Footer: Profile & Actions */}
        <div className="sidebar-footer">
          <div className="admin-profile-card">
            <div className="profile-avatar">SA</div>
            {!sidebarCollapsed && (
              <div className="profile-details">
                <span className="profile-name">{adminUser?.name || 'SalesAvatar Admin'}</span>
                <span className="profile-email">{adminUser?.email || 'admin@salesavatar.com'}</span>
              </div>
            )}
            <button
              className="btn-logout"
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>

          {!sidebarCollapsed && (
            <a href="/" target="_blank" rel="noreferrer" className="btn-visit-site">
              <ExternalLink size={14} />
              <span>Visit Public Site</span>
            </a>
          )}
        </div>
      </aside>

      {/* 2. MAIN ADMIN CONTENT CONTAINER - SCROLLS INDEPENDENTLY */}
      <main className="admin-main-viewport">
        {/* Top Header Bar */}
        <header className="admin-header-bar">
          <div className="header-left">
            <button
              className="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
            <div className="header-breadcrumb">
              <span className="crumb-root">SalesAvatar Command</span>
              <ChevronRight size={14} className="crumb-separator" />
              <span className="crumb-active">
                {activeTab === 'pipeline' && 'Leads Command Pipeline'}
                {activeTab === 'analytics' && 'Conversion Funnel & Revenue Analytics'}
                {activeTab === 'reps' && 'Sales Reps & Quota Distribution'}
              </span>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="btn-admin-header secondary"
              onClick={() => { fetchLeads(); fetchReps(); }}
              disabled={refreshing}
              title="Sync latest leads and team data from database"
            >
              <RefreshCw size={15} className={refreshing ? 'spin' : ''} />
              <span>{refreshing ? 'Syncing...' : 'Live Sync'}</span>
            </button>

            {activeTab === 'reps' ? (
              <button
                className="btn-admin-header primary"
                onClick={() => setAddRepModalOpen(true)}
              >
                <UserPlus size={16} />
                <span>Add Sales Rep</span>
              </button>
            ) : (
              <>
                <button
                  className="btn-admin-header secondary"
                  onClick={handleExportCsv}
                  title="Export all leads to CSV"
                >
                  <Download size={15} />
                  <span>Export CSV</span>
                </button>

                <button
                  className="btn-admin-header primary"
                  onClick={() => setAddModalOpen(true)}
                >
                  <Plus size={16} />
                  <span>+ Add Inbound Lead</span>
                </button>
              </>
            )}
          </div>
        </header>

        {/* TAB 1: PIPELINE / LEADS COMMAND */}
        {activeTab === 'pipeline' && (
          <div className="tab-content-wrapper">
            {/* KPI Metric Cards */}
            <div className="admin-kpi-grid">
              <div className="kpi-metric-card blue">
                <div className="kpi-icon-box">
                  <Users size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Total Inbound Leads</span>
                  <strong className="kpi-val">{stats?.totalLeads ?? leads.length}</strong>
                  <span className="kpi-sub">Captured via website, demo & ads</span>
                </div>
              </div>

              <div className="kpi-metric-card orange">
                <div className="kpi-icon-box">
                  <Clock size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Priority Follow-up</span>
                  <strong className="kpi-val">{stats?.newInbound ?? stageCounts['New Inbound']}</strong>
                  <span className="kpi-sub">New leads waiting for first call</span>
                </div>
              </div>

              <div className="kpi-metric-card green">
                <div className="kpi-icon-box">
                  <CheckCircle2 size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Closed Won Revenue</span>
                  <strong className="kpi-val">{formatINR(stats?.closedWonRevenue || 185000)}</strong>
                  <span className="kpi-sub">{stats?.closedWon ?? stageCounts['Closed Won']} won enterprise deals</span>
                </div>
              </div>

              <div className="kpi-metric-card purple">
                <div className="kpi-icon-box">
                  <TrendingUp size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Active Pipeline Value</span>
                  <strong className="kpi-val">{formatINR(stats?.totalPipelineValue || 1780000)}</strong>
                  <span className="kpi-sub">Estimated potential revenue</span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="admin-toolbar-card">
              <div className="toolbar-search-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads by client name, email, company, or phone..."
                />
                {searchQuery && (
                  <button className="btn-clear-txt" onClick={() => setSearchQuery('')}>
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="toolbar-filters-row">
                {/* Stage Filter Pills */}
                <div className="stage-filter-pills">
                  <button
                    className={`stage-pill ${selectedStage === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedStage('all')}
                  >
                    All ({stageCounts.all})
                  </button>
                  {STAGE_OPTIONS.map((stg) => (
                    <button
                      key={stg}
                      className={`stage-pill ${selectedStage === stg ? 'active' : ''}`}
                      onClick={() => setSelectedStage(stg)}
                    >
                      {stg} ({stageCounts[stg] || 0})
                    </button>
                  ))}
                </div>

                <div className="toolbar-dropdowns">
                  {/* Source Filter */}
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Inbound Sources</option>
                    <option value="Website Demo">Website Demo</option>
                    <option value="Free Trial">Free Trial</option>
                    <option value="ROI Calculator">ROI Calculator</option>
                    <option value="Contact Us">Contact Form</option>
                    <option value="Facebook Lead Ads">Facebook Ads</option>
                    <option value="Admin Manual Entry">Admin Manual Entry</option>
                  </select>

                  {/* Rep Filter - Dynamically from MySQL */}
                  <select
                    value={selectedRep}
                    onChange={(e) => setSelectedRep(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Sales Reps ({repsList.length})</option>
                    {repsList.map(r => (
                      <option key={r.id || r.name} value={r.name}>{r.name}</option>
                    ))}
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="admin-select"
                  >
                    <option value="newest">Newest First</option>
                    <option value="value_desc">Deal Value: High to Low</option>
                    <option value="value_asc">Deal Value: Low to High</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions Banner (appears when items selected) */}
              {selectedLeadIds.length > 0 && (
                <div className="bulk-actions-banner">
                  <span className="bulk-selection-count">
                    <CheckSquare size={16} className="text-orange" />
                    <strong>{selectedLeadIds.length}</strong> lead(s) selected
                  </span>

                  <div className="bulk-btn-group">
                    <div className="bulk-stage-wrap">
                      <span>Change Stage to:</span>
                      <select
                        onChange={(e) => {
                          if (e.target.value) handleBulkStageChange(e.target.value);
                          e.target.value = '';
                        }}
                        className="admin-select small"
                      >
                        <option value="">Select Stage...</option>
                        {STAGE_OPTIONS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <button className="btn-bulk-delete" onClick={handleBulkDelete}>
                      <Trash2 size={14} />
                      <span>Delete Selected</span>
                    </button>

                    <button className="btn-bulk-cancel" onClick={() => setSelectedLeadIds([])}>
                      Clear Selection
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Leads Table */}
            <div className="admin-table-wrapper">
              <table className="leads-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '48px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={filteredLeads.length > 0 && selectedLeadIds.length === filteredLeads.length}
                        onChange={handleSelectAll}
                        aria-label="Select all leads"
                      />
                    </th>
                    <th style={{ minWidth: '220px' }}>Lead & Company</th>
                    <th style={{ minWidth: '220px' }}>Contact Info</th>
                    <th style={{ minWidth: '150px' }}>Source & Date</th>
                    <th style={{ minWidth: '130px' }}>Deal Value</th>
                    <th style={{ minWidth: '160px' }}>Sales Stage</th>
                    <th style={{ minWidth: '170px' }}>Assigned Rep</th>
                    <th style={{ minWidth: '140px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="table-loading-state">
                        <RefreshCw size={28} className="spin" />
                        <span>Loading leads from MySQL database...</span>
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="table-empty-state">
                        <Building2 size={38} />
                        <h4>No leads found matching filters</h4>
                        <p>Try resetting your stage or source filters, or click "+ Add Inbound Lead".</p>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const isSelected = selectedLeadIds.includes(lead.id);
                      return (
                        <tr key={lead.id} className={`lead-table-row ${isSelected ? 'row-selected' : ''}`}>
                          <td style={{ textAlign: 'center', width: '48px' }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectOne(lead.id)}
                              aria-label={`Select ${lead.name}`}
                            />
                          </td>
                          <td className="lead-name-cell">
                            <div className="lead-avatar-wrap">
                              <div className="lead-avatar-circle">
                                {(lead.name || 'L').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong className="lead-full-name">{lead.name}</strong>
                                <span className="lead-company-name">
                                  <Building2 size={13} />
                                  {lead.company || 'Enterprise Client'}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="lead-contact-cell">
                            <div className="lead-contact-stack">
                              <a href={`mailto:${lead.email}`} className="contact-link email">
                                <Mail size={13} />
                                <span>{lead.email}</span>
                              </a>
                              {lead.phone && (
                                <a href={`tel:${lead.phone}`} className="contact-link phone">
                                  <PhoneCall size={13} />
                                  <span>{lead.phone}</span>
                                </a>
                              )}
                            </div>
                          </td>

                          <td className="lead-source-cell">
                            <div className="lead-source-stack">
                              <span className="source-tag">{lead.source || 'Website Demo'}</span>
                              <span className="date-tag">
                                <Clock size={11} />
                                {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Today'}
                              </span>
                            </div>
                          </td>

                          <td className="lead-deal-cell">
                            <span className="deal-val-pill">
                              {formatINR(lead.deal_value || 75000)}
                            </span>
                          </td>

                          <td className="lead-stage-cell">
                            <select
                              value={lead.stage || 'New Inbound'}
                              onChange={(e) => handleStageChange(lead.id, e.target.value)}
                              className={`stage-select-dropdown stage-${(lead.stage || 'new-inbound').toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {STAGE_OPTIONS.map((stg) => (
                                <option key={stg} value={stg}>{stg}</option>
                              ))}
                            </select>
                          </td>

                          <td className="lead-rep-cell">
                            <select
                              value={lead.assigned_to || (repsList[0]?.name || 'Prince Tiwari')}
                              onChange={(e) => handleRepChange(lead.id, e.target.value)}
                              className="rep-select-dropdown"
                            >
                              {repsList.map((rep) => (
                                <option key={rep.id || rep.name} value={rep.name}>{rep.name}</option>
                              ))}
                            </select>
                          </td>

                          <td className="lead-actions-cell">
                            <div className="table-actions-row">
                              {lead.phone && (
                                <button
                                  className="btn-action-icon whatsapp"
                                  title="Open WhatsApp Chat"
                                  onClick={() => openWhatsApp(lead.phone, lead.name, lead.company)}
                                >
                                  <MessageCircle size={15} />
                                </button>
                              )}

                              {lead.phone && (
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="btn-action-icon phone"
                                  title="Call Lead"
                                >
                                  <PhoneCall size={14} />
                                </a>
                              )}

                              <button
                                className="btn-action-icon note"
                                title="View Details & Notes"
                                onClick={() => {
                                  setActiveLead(lead);
                                  setDrawerOpen(true);
                                }}
                              >
                                <Edit3 size={14} />
                              </button>

                              <button
                                className="btn-action-icon delete"
                                title="Delete Lead"
                                onClick={() => handleDeleteLead(lead.id, lead.name)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CONVERSION FUNNEL & REVENUE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="tab-content-wrapper">
            <div className="analytics-section-card">
              <div className="card-header-bar">
                <div className="card-header-title">
                  <BarChart3 size={20} className="text-orange" />
                  <h3>Enterprise Sales Pipeline Conversion Funnel</h3>
                </div>
                <span className="card-badge">Real-time Stage Progression</span>
              </div>

              {/* Visual Funnel */}
              <div className="conversion-funnel-grid">
                {STAGE_OPTIONS.map((stg, idx) => {
                  const count = stageCounts[stg] || 0;
                  const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                  const colors = ['#38bdf8', '#f59e0b', '#a855f7', '#ea580c', '#10b981', '#ef4444'];
                  return (
                    <div key={stg} className="funnel-step-card">
                      <div className="funnel-step-header">
                        <span className="step-num">0{idx + 1}</span>
                        <strong className="step-name">{stg}</strong>
                      </div>
                      <div className="funnel-step-val">
                        <span className="val-number">{count}</span>
                        <span className="val-pct">{pct}% of pipeline</span>
                      </div>
                      <div className="funnel-bar-track">
                        <div
                          className="funnel-bar-fill"
                          style={{ width: `${Math.max(pct, 8)}%`, background: colors[idx % colors.length] }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sources & Velocity Breakdown */}
            <div className="analytics-dual-grid">
              <div className="analytics-section-card">
                <div className="card-header-bar">
                  <div className="card-header-title">
                    <Layers size={18} className="text-blue" />
                    <h4>Lead Acquisition Channels</h4>
                  </div>
                </div>
                <div className="sources-breakdown-list">
                  {[
                    { name: 'Website Demo Requests', count: leads.filter(l => (l.source || '').includes('Demo')).length, color: '#38bdf8' },
                    { name: 'Free Trial Signups', count: leads.filter(l => (l.source || '').includes('Trial')).length, color: '#10b981' },
                    { name: 'ROI Calculator Inquiries', count: leads.filter(l => (l.source || '').includes('ROI')).length, color: '#f59e0b' },
                    { name: 'Contact Us & Custom Quotations', count: leads.filter(l => (l.source || '').includes('Contact')).length, color: '#a855f7' },
                    { name: 'Facebook & Ads Inbound', count: leads.filter(l => (l.source || '').includes('Facebook') || (l.source || '').includes('Ads')).length, color: '#ea580c' }
                  ].map((src) => {
                    const pct = leads.length > 0 ? Math.round((src.count / leads.length) * 100) : 0;
                    return (
                      <div key={src.name} className="source-metric-row">
                        <div className="source-info-line">
                          <span>{src.name}</span>
                          <strong>{src.count} leads ({pct}%)</strong>
                        </div>
                        <div className="source-progress-track">
                          <div className="source-progress-fill" style={{ width: `${Math.max(pct, 5)}%`, background: src.color }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="analytics-section-card">
                <div className="card-header-bar">
                  <div className="card-header-title">
                    <Target size={18} className="text-green" />
                    <h4>Deal Metrics & Sales Velocity</h4>
                  </div>
                </div>
                <div className="deal-metrics-stack">
                  <div className="metric-box-card">
                    <span className="metric-title">Average Deal Value</span>
                    <strong className="metric-highlight">
                      {formatINR(leads.length > 0 ? Math.round((stats?.totalPipelineValue || 1780000) / leads.length) : 75000)}
                    </strong>
                    <span className="metric-sub">Across active inbound opportunities</span>
                  </div>

                  <div className="metric-box-card">
                    <span className="metric-title">Pipeline Conversion Rate</span>
                    <strong className="metric-highlight text-green">
                      {leads.length > 0 ? Math.round(((stats?.closedWon || 1) / leads.length) * 100) : 20}%
                    </strong>
                    <span className="metric-sub">From inbound lead to closed customer</span>
                  </div>

                  <div className="metric-box-card">
                    <span className="metric-title">Target Response Time SLA</span>
                    <strong className="metric-highlight text-orange">&lt; 15 Minutes</strong>
                    <span className="metric-sub">Real-time WhatsApp & Phone trigger</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SALES TEAM & DYNAMIC REPS FROM MYSQL */}
        {activeTab === 'reps' && (
          <div className="tab-content-wrapper">
            <div className="admin-reps-header-banner">
              <div>
                <h2>Enterprise Sales Representatives Directory</h2>
                <p>Manage lead distribution, monthly quotas, and closed deal performance across active team members.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-admin-header primary" onClick={() => setAddRepModalOpen(true)}>
                  <UserPlus size={16} />
                  <span>Add Sales Rep</span>
                </button>
                <button className="btn-admin-header secondary" onClick={() => setAddModalOpen(true)}>
                  <Plus size={16} />
                  <span>Assign Lead</span>
                </button>
              </div>
            </div>

            {repsLoading && repsList.length === 0 ? (
              <div className="table-loading-state">
                <RefreshCw size={28} className="spin" />
                <span>Loading sales team from MySQL database...</span>
              </div>
            ) : repsList.length === 0 ? (
              <div className="table-empty-state">
                <Users size={38} />
                <h4>No sales representatives registered yet</h4>
                <p>Click "Add Sales Rep" above to register your first team member.</p>
              </div>
            ) : (
              <div className="reps-grid-container">
                {repsList.map((rep) => {
                  const repLeads = leads.filter(l => l.assigned_to === rep.name);
                  const wonDeals = repLeads.filter(l => l.stage === 'Closed Won');
                  const wonRevenue = wonDeals.reduce((sum, l) => sum + (Number(l.deal_value) || 0), 0);
                  const activePipeline = repLeads.reduce((sum, l) => sum + (Number(l.deal_value) || 0), 0);
                  const attainment = rep.quota > 0 ? Math.min(Math.round((wonRevenue / Number(rep.quota)) * 100), 100) : 0;

                  return (
                    <div key={rep.id || rep.name} className="rep-profile-card">
                      <div className="rep-header">
                        <div className="rep-avatar-circle">
                          {rep.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="rep-name-group">
                          <strong className="rep-name">{rep.name}</strong>
                          <span className="rep-role">{rep.role || 'Sales Executive'}</span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{rep.email}</span>
                        </div>
                        <span className="rep-active-badge">{repLeads.length} Leads</span>
                      </div>

                      <div className="rep-stats-grid">
                        <div className="rep-stat-box">
                          <span className="stat-label">Active Pipeline</span>
                          <strong className="stat-val">{formatINR(activePipeline)}</strong>
                        </div>
                        <div className="rep-stat-box">
                          <span className="stat-label">Won Revenue</span>
                          <strong className="stat-val text-green">{formatINR(wonRevenue)}</strong>
                        </div>
                      </div>

                      <div className="quota-attainment-wrap">
                        <div className="quota-text-line">
                          <span>Quota Attainment ({formatINR(rep.quota || 1000000)})</span>
                          <strong>{attainment}%</strong>
                        </div>
                        <div className="quota-bar-track">
                          <div
                            className="quota-bar-fill"
                            style={{ width: `${Math.max(attainment, 8)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="rep-card-actions">
                        <button
                          className="btn-rep-action"
                          onClick={() => {
                            setSelectedRep(rep.name);
                            setActiveTab('pipeline');
                          }}
                        >
                          <Filter size={14} />
                          <span>Assigned Leads ({repLeads.length})</span>
                        </button>

                        {rep.phone && (
                          <a
                            href={`https://wa.me/${rep.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(rep.name)}%2C%20here%20is%20your%20SalesAvatar%20CRM%20lead%20update.`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-rep-action whatsapp"
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        <button
                          className="btn-rep-action delete"
                          title="Remove Sales Rep"
                          onClick={() => handleDeleteRep(rep.id, rep.name)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3. MODAL: ADD INBOUND LEAD */}
      {addModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setAddModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>+ Add Inbound Lead to Pipeline</h3>
              <button onClick={() => setAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="modal-form-body">
              <div className="modal-form-grid">
                <div className="form-field">
                  <label>Contact Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div className="form-field">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="e.g. Acme Industries Ltd"
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-field">
                  <label>Work Email *</label>
                  <input
                    type="email"
                    required
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="ramesh@acme.com"
                  />
                </div>

                <div className="form-field">
                  <label>WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-field">
                  <label>Estimated Deal Value (INR)</label>
                  <input
                    type="number"
                    value={newLead.deal_value}
                    onChange={(e) => setNewLead({ ...newLead, deal_value: e.target.value })}
                    placeholder="75000"
                  />
                </div>

                <div className="form-field">
                  <label>Initial Sales Stage</label>
                  <select
                    value={newLead.stage}
                    onChange={(e) => setNewLead({ ...newLead, stage: e.target.value })}
                  >
                    {STAGE_OPTIONS.map((stg) => (
                      <option key={stg} value={stg}>{stg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-field">
                  <label>Assign to Sales Rep</label>
                  <select
                    value={newLead.assigned_to}
                    onChange={(e) => setNewLead({ ...newLead, assigned_to: e.target.value })}
                  >
                    {repsList.map((rep) => (
                      <option key={rep.id || rep.name} value={rep.name}>{rep.name} ({rep.role})</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Interested CRM Tier</label>
                  <select
                    value={newLead.plan_interested}
                    onChange={(e) => setNewLead({ ...newLead, plan_interested: e.target.value })}
                  >
                    <option value="Professional">Professional Tier</option>
                    <option value="Business">Business Tier</option>
                    <option value="Enterprise">Enterprise Custom</option>
                  </select>
                </div>
              </div>

              <div className="form-field full-width">
                <label>Sales Notes & Customer Requirement</label>
                <textarea
                  rows="3"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Notes from initial conversation, custom CRM requirements, team size..."
                ></textarea>
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: ADD SALES REPRESENTATIVE */}
      {addRepModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setAddRepModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>+ Register New Sales Representative</h3>
              <button onClick={() => setAddRepModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRep} className="modal-form-body">
              <div className="modal-form-grid">
                <div className="form-field">
                  <label>Representative Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newRepData.name}
                    onChange={(e) => setNewRepData({ ...newRepData, name: e.target.value })}
                    placeholder="e.g. Vikram Malhotra"
                  />
                </div>

                <div className="form-field">
                  <label>Work Email *</label>
                  <input
                    type="email"
                    required
                    value={newRepData.email}
                    onChange={(e) => setNewRepData({ ...newRepData, email: e.target.value })}
                    placeholder="vikram@salesavatar.com"
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-field">
                  <label>WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    value={newRepData.phone}
                    onChange={(e) => setNewRepData({ ...newRepData, phone: e.target.value })}
                    placeholder="+91 98111 22334"
                  />
                </div>

                <div className="form-field">
                  <label>Monthly Sales Quota (INR)</label>
                  <input
                    type="number"
                    required
                    value={newRepData.quota}
                    onChange={(e) => setNewRepData({ ...newRepData, quota: e.target.value })}
                    placeholder="1000000"
                  />
                </div>
              </div>

              <div className="form-field full-width">
                <label>Sales Designation & Role</label>
                <select
                  value={newRepData.role}
                  onChange={(e) => setNewRepData({ ...newRepData, role: e.target.value })}
                >
                  {REP_ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setAddRepModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  Save Sales Rep to MySQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. DRAWER / MODAL: VIEW LEAD DETAILS & EDIT NOTES */}
      {drawerOpen && activeLead && (
        <div className="admin-modal-backdrop" onClick={() => setDrawerOpen(false)}>
          <div className="admin-modal-card drawer-style" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{activeLead.name}</h3>
                <span className="drawer-subtitle">{activeLead.company} • {activeLead.source || 'Website Demo'}</span>
              </div>
              <button onClick={() => setDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-form-body">
              {/* Quick Actions Row */}
              <div className="lead-quick-actions-bar">
                {activeLead.phone && (
                  <button
                    className="btn-quick-comm whatsapp"
                    onClick={() => openWhatsApp(activeLead.phone, activeLead.name, activeLead.company)}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Chat</span>
                  </button>
                )}
                {activeLead.phone && (
                  <a href={`tel:${activeLead.phone}`} className="btn-quick-comm phone">
                    <PhoneCall size={15} />
                    <span>Call Client</span>
                  </a>
                )}
                <a href={`mailto:${activeLead.email}`} className="btn-quick-comm email">
                  <Mail size={15} />
                  <span>Send Email</span>
                </a>
              </div>

              {/* Lead Details Grid */}
              <div className="lead-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Work Email</span>
                  <strong className="meta-val">{activeLead.email}</strong>
                </div>

                <div className="meta-item">
                  <span className="meta-label">Phone</span>
                  <strong className="meta-val">{activeLead.phone || 'N/A'}</strong>
                </div>

                <div className="meta-item">
                  <span className="meta-label">Deal Value</span>
                  <strong className="meta-val text-green">{formatINR(activeLead.deal_value || 75000)}</strong>
                </div>

                <div className="meta-item">
                  <span className="meta-label">Captured Date</span>
                  <strong className="meta-val">
                    {activeLead.created_at ? new Date(activeLead.created_at).toLocaleString('en-IN') : 'Recent'}
                  </strong>
                </div>
              </div>

              {/* Stage & Rep Selectors */}
              <div className="modal-form-grid">
                <div className="form-field">
                  <label>Current Stage</label>
                  <select
                    value={activeLead.stage || 'New Inbound'}
                    onChange={(e) => handleStageChange(activeLead.id, e.target.value)}
                  >
                    {STAGE_OPTIONS.map((stg) => (
                      <option key={stg} value={stg}>{stg}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Assigned Representative</label>
                  <select
                    value={activeLead.assigned_to || (repsList[0]?.name || 'Prince Tiwari')}
                    onChange={(e) => handleRepChange(activeLead.id, e.target.value)}
                  >
                    {repsList.map((rep) => (
                      <option key={rep.id || rep.name} value={rep.name}>{rep.name} ({rep.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes Editor */}
              <div className="form-field full-width">
                <label>CRM Follow-up Notes & Next Steps</label>
                <textarea
                  rows="5"
                  value={activeLead.notes || ''}
                  onChange={(e) => setActiveLead({ ...activeLead, notes: e.target.value })}
                  placeholder="Record call summary, pricing discussion, customized requirements..."
                ></textarea>
              </div>

              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => handleDeleteLead(activeLead.id, activeLead.name)}
                  style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
                >
                  <Trash2 size={15} style={{ marginRight: '6px' }} />
                  Delete Lead
                </button>
                <button type="button" className="btn-modal-submit" onClick={handleSaveNotes}>
                  Save Notes & Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
