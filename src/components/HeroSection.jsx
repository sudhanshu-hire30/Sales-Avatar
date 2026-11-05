import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  Search,
  Bell,
  Settings,
  Calendar,
  Users,
  Clock,
  Sparkles,
  ChevronLeft,
  LayoutGrid,
  Briefcase,
  ShieldCheck,
  Building2,
  HardHat,
  BarChart2,
  Target,
  Megaphone,
  UserCheck,
  MessageCircle,
  LogOut,
  Plus,
  Download,
  Mail,
  Table,
  PhoneCall,
  IndianRupee,
  Lightbulb,
  Home,
  Maximize2,
  HelpCircle
} from 'lucide-react';
import {
  CRM_SCREENSHOTS,
  getScreenshotUrl
} from '../data/crmScreenshots';
import CrmLightboxModal from './CrmLightboxModal';
import MobileAutoMarquee from './MobileAutoMarquee';

const TRUST_LOGOS = [
  { file: 'company-logos/bharat-eco-fuels.png', alt: 'Bharat Eco Fuels' },
  { file: 'company-logos/bharat-energreen.png', alt: 'Bharat Energreen' },
  { file: 'company-logos/bharat-ecocharge.png', alt: 'Bharat Ecocharge' },
  { file: 'company-logos/bharat-power-lubes.png', alt: 'Bharat Power Lubes' },
  { file: 'company-logos/bharat-ecosolar.png', alt: 'Bharat Ecosolar' },
  { file: 'company-logos/connectyfy.png', alt: 'Connectyfy' },
  { file: 'company-logos/hire30.png', alt: 'Hire30' }
];

const SIDEBAR_SCREENS = {
  'Dashboard': {
    id: 'dashboard-overview',
    file: '6766b2b0-f170-47b7-b227-70f5f2c2d8dc.jpg',
    title: 'Dashboard / Executive Overview & Funnel',
    category: 'Dashboard & Analytics',
    badge: 'Executive Hub'
  },
  'Workspace': {
    id: 'workspace-chat',
    file: 'ee2dc4a5-06c3-449f-95d2-128827a9e5f9.jpg',
    title: 'Workspace / Real-Time Team Chat',
    category: 'Workspace & Chat',
    badge: 'Collaboration'
  },
  'Sales': {
    id: 'sales-leads-table',
    file: 'ef397b13-affc-4018-9693-fabea53c0aaa.jpg',
    title: 'Sales / 1,248+ Leads & Pipeline Stages',
    category: 'Sales & Pipeline',
    badge: 'Lead Ingestion'
  },
  'Deal approvals': {
    id: 'deal-approvals',
    file: '58e15603-66c4-4ed6-b47b-44607fc2ac05.jpg',
    title: 'Deal Approvals / Won Deals Authorization',
    category: 'Sales & Pipeline',
    badge: 'Deal Approvals'
  },
  'LOB': {
    id: 'master-settings',
    file: 'd5019f16-dda7-4810-af36-1b89b80c2918.jpg',
    title: 'LOB / Business Units & Setup',
    category: 'Settings & Security',
    badge: 'Business Units'
  },
  'Project Sites': {
    id: 'project-sites',
    file: 'd5b197d3-4fcf-477a-8e7f-a567647cd704.jpg',
    title: 'Project Sites / Field Progress (28 Sites)',
    category: 'Operations & Sites',
    badge: 'Field Operations'
  },
  'Reports': {
    id: 'pipeline-analytics',
    file: '83161ec4-f704-4a73-acfc-15e759c7a704.jpg',
    title: 'Reports / Executive Revenue & Attribution',
    category: 'Dashboard & Analytics',
    badge: 'Attribution BI'
  },
  'Goals': {
    id: 'executive-goals',
    file: 'a6fccb54-6ca5-44ea-84b8-bad25878ac35.jpg',
    title: 'Goals / Monthly Quota Tracking (₹4.80 Cr)',
    category: 'Goals & Recognition',
    badge: 'Sales Targets'
  },
  'Marketing': {
    id: 'marketing-integrations',
    file: 'd25f846d-e03f-4ced-8e3f-07bef708940e.jpg',
    title: 'Marketing / Meta Facebook Lead Ads & CAPI',
    category: 'Operations & Sites',
    badge: 'Ad Integrations'
  },
  'HR': {
    id: 'hr-letters',
    file: '1e956a08-469a-48e4-b213-e817201bbf43.jpg',
    title: 'HR / Employee Letters & Letterhead Docs',
    category: 'HR & Attendance',
    badge: 'HR Automation'
  },
  'WhatsApp': {
    id: 'master-settings',
    file: 'd5019f16-dda7-4810-af36-1b89b80c2918.jpg',
    title: 'WhatsApp / Business Number & Auto-Flows',
    category: 'Settings & Security',
    badge: 'WhatsApp API'
  },
  'View Team': {
    id: 'view-team',
    file: 'a95dece7-13d8-4745-b8fd-8469619dbc44.jpg',
    title: 'Team / Reporting Hierarchy (68 Members)',
    category: 'Settings & Security',
    badge: 'Org Chart'
  },
  'Help & Tickets': {
    id: 'help-tickets',
    file: '2dca9530-7eb3-4771-b115-7c9b13a30cda.jpg',
    title: 'Support / Helpdesk & Tickets',
    category: 'Settings & Security',
    badge: 'Helpdesk SLA'
  },
  'Settings': {
    id: 'master-settings',
    file: 'd5019f16-dda7-4810-af36-1b89b80c2918.jpg',
    title: 'Settings / Master CRM Control Center',
    category: 'Settings & Security',
    badge: 'Administration'
  }
};

export default function HeroSection({ onOpenTrial, onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('This month');
  const [sidebarItem, setSidebarItem] = useState('Dashboard');
  const [dashboardMode, setDashboardMode] = useState('live'); // 'live' or 'screenshot'
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentScreenMeta = SIDEBAR_SCREENS[sidebarItem] || SIDEBAR_SCREENS['Dashboard'];

  const handleSidebarItemClick = (item) => {
    setSidebarItem(item);
    setDashboardMode(item === 'Dashboard' ? 'live' : 'screenshot');
  };

  const handleOpenScreenshot = (screenId) => {
    const targetId = screenId || currentScreenMeta.id;
    const idx = CRM_SCREENSHOTS.findIndex(s => s.id === targetId);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-ambient-orbit hero-ambient-orbit-one" aria-hidden="true">
        <span className="hero-orbit-dot"></span>
      </div>
      <div className="hero-ambient-orbit hero-ambient-orbit-two" aria-hidden="true">
        <span className="hero-orbit-dot"></span>
      </div>
      <div className="hero-container">
        {/* Left Column: Hero Copy & CTA */}
        <div className="hero-left">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-status-dot"></span>
            <span>THE SALES CRM BUILT FOR INDIAN TEAMS</span>
          </div>
          <div className="hero-live-signal" aria-hidden="true">
            <span className="hero-live-signal-line"></span>
            <span>Live workspace signal</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            The sales CRM built for <br className="hero-title-br" />
            <span className="gradient-text">how Indian teams sell</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Built for growing Indian sales teams that need faster lead response,
            clear pipeline ownership, and field activity in one workspace.
          </p>

          {/* Trust Checkmarks */}
          <MobileAutoMarquee className="hero-checks">
            <div className="check-item">
              <CheckCircle2 size={16} className="check-icon" />
              <span>15-minute setup</span>
            </div>
            <div className="check-item">
              <CheckCircle2 size={16} className="check-icon" />
              <span>Guided team onboarding</span>
            </div>
          </MobileAutoMarquee>

          {/* Action Buttons */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onOpenDemo}
            >
              Book a Demo <ArrowRight size={17} />
            </button>
            <Link
              to="/crm-tour"
              className="btn-hero-secondary"
            >
              <div className="play-icon-bubble">
                <Play size={12} fill="#2563eb" color="#2563eb" />
              </div>
              See the CRM in action
            </Link>
          </div>
        </div>

        {/* Right Column: Realistic Laptop Showcase with Live CRM Dashboard */}
        <div className="hero-right">
          <div className="hero-proof-cluster" aria-label="Illustrative sales dashboard figures">
            <span className="hero-proof-label">Illustrative metrics</span>
            <div className="hero-proof-card hero-proof-card-leads">
              <span className="hero-proof-icon"><Users size={13} /></span>
              <span className="hero-proof-copy">
                <strong>1,248</strong>
                <small>active leads</small>
              </span>
              <span className="hero-proof-trend">+18%</span>
            </div>
            <div className="hero-proof-card hero-proof-card-pipeline">
              <span className="hero-proof-icon"><IndianRupee size={13} /></span>
              <span className="hero-proof-copy">
                <strong>₹4.8 Cr</strong>
                <small>pipeline tracked</small>
              </span>
              <span className="hero-proof-pulse" aria-hidden="true"></span>
            </div>
            <div className="hero-proof-card hero-proof-card-followups">
              <span className="hero-proof-icon"><Clock size={13} /></span>
              <span className="hero-proof-copy">
                <strong>92%</strong>
                <small>follow-ups on time</small>
              </span>
              <span className="hero-proof-ring" aria-hidden="true"></span>
            </div>
          </div>

          {/* Floating Badge above laptop */}
          <div
            className="floating-laptop-tag"
          >
            <div className="tag-icon-ring">
              <Sparkles size={14} color="#1e40af" />
            </div>
            <div className="tag-text">
              <span className="tag-title">Explore Live CRM Platform &rarr;</span>
              <span className="tag-subtitle">Interactive Dashboard preview &bull; Click for full tour</span>
            </div>
          </div>

          {/* Laptop Mockup Outer Frame */}
          <div className="laptop-wrapper">
            <div className="laptop-lid">
              <div className="laptop-camera"></div>

              {/* Laptop Screen Inside */}
              <div className="laptop-screen">
                {/* Desktop View: Interactive CRM Screen Body with Sidebar */}
                <div className="crm-screen-body crm-desktop-screen-body">
                  {/* Left Sidebar inside laptop */}
                  <div className="crm-sidebar">
                    {/* Header: DW Demo */}
                    <div className="crm-sidebar-header">
                      <div className="crm-sidebar-brand">
                        <div className="crm-avatar-circle">DW</div>
                        <span className="crm-brand-name">Demo</span>
                      </div>
                      <ChevronLeft size={13} className="crm-sidebar-collapse-icon" />
                    </div>

                    {/* Nav Items List */}
                    <div className="crm-nav-list">
                      <div className={`crm-nav-item ${sidebarItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Dashboard')}>
                        <Home size={12} className="crm-nav-icon" />
                        <span>Dashboard</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Workspace' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Workspace')}>
                        <LayoutGrid size={12} className="crm-nav-icon" />
                        <span>Workspace</span>
                        <span className="crm-badge-red">3</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Sales' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Sales')}>
                        <Briefcase size={12} className="crm-nav-icon" />
                        <span>Sales</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Deal approvals' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Deal approvals')}>
                        <ShieldCheck size={12} className="crm-nav-icon" />
                        <span>Deal approvals</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'LOB' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('LOB')}>
                        <Building2 size={12} className="crm-nav-icon" />
                        <span>LOB</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Project Sites' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Project Sites')}>
                        <HardHat size={12} className="crm-nav-icon" />
                        <span>Project Sites</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Reports' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Reports')}>
                        <BarChart2 size={12} className="crm-nav-icon" />
                        <span>Reports</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Goals' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Goals')}>
                        <Target size={12} className="crm-nav-icon" />
                        <span>Goals</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Marketing' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Marketing')}>
                        <Megaphone size={12} className="crm-nav-icon" />
                        <span>Marketing</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'HR' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('HR')}>
                        <UserCheck size={12} className="crm-nav-icon" />
                        <span>HR</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'WhatsApp' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('WhatsApp')}>
                        <MessageCircle size={12} className="crm-nav-icon" />
                        <span>WhatsApp</span>
                      </div>
                    </div>

                    {/* TEAM Section */}
                    <div className="crm-sidebar-team-section">
                      <span className="crm-team-heading">TEAM</span>
                      <div className={`crm-nav-item ${sidebarItem === 'View Team' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('View Team')}>
                        <Users size={12} className="crm-nav-icon" />
                        <span>View Team</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Help & Tickets' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Help & Tickets')}>
                        <HelpCircle size={12} className="crm-nav-icon" />
                        <span>Help & Tickets</span>
                      </div>
                      <div className={`crm-nav-item ${sidebarItem === 'Settings' ? 'active' : ''}`} onClick={() => handleSidebarItemClick('Settings')}>
                        <Settings size={12} className="crm-nav-icon" />
                        <span>Settings</span>
                      </div>
                    </div>

                    {/* Bottom User Profile */}
                    <div className="crm-sidebar-user">
                      <div className="crm-user-avatar-wrap">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80"
                          alt="Alex Turner"
                          className="crm-user-img"
                        />
                        <span className="crm-status-dot online"></span>
                      </div>
                      <div className="crm-user-info">
                        <span className="crm-user-fullname">Alex Turner</span>
                        <span className="crm-user-status">
                          <span className="status-emoji">&#128522;</span> Set a status
                        </span>
                      </div>
                      <LogOut size={12} className="crm-logout-icon" title="Log out" />
                    </div>
                  </div>

                  {/* Main View Area */}
                  <div className="crm-main-area">
                    {/* View Switcher: Interactive Live Dashboard OR Real Screenshot */}
                    {sidebarItem === 'Dashboard' && dashboardMode === 'live' ? (
                      <>
                        {/* Top Screen Nav (only needed for live interactive dashboard) */}
                        <div className="crm-top-nav">
                          <div className="crm-top-left">
                            <h2 className="crm-page-title">{sidebarItem}</h2>
                            <div className="crm-view-mode-toggle">
                            </div>
                          </div>
                          <div className="crm-top-right">
                            <button
                              type="button"
                              className="crm-icon-action crm-inspect-top-btn"
                              title="Inspect Screen in Full Resolution"
                              onClick={() => handleOpenScreenshot()}
                            >
                              <Maximize2 size={13} />
                            </button>
                            <button className="crm-icon-action" title="Search">
                              <Search size={13} />
                            </button>
                            <button className="crm-btn-plus" title="Add New">
                              <Plus size={13} />
                            </button>
                            <button className="crm-icon-action" title="Download Reports">
                              <Download size={13} />
                            </button>
                            <button className="crm-icon-action crm-bell-wrap" title="Notifications">
                              <Bell size={13} />
                              <span className="crm-notif-badge">5</span>
                            </button>
                            <div className="crm-nav-avatar-wrap">
                              <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80"
                                alt="Alex"
                                className="crm-nav-avatar"
                              />
                              <span className="crm-status-dot online"></span>
                            </div>
                          </div>
                        </div>

                        {/* Main Content Scroll Area */}
                        <div className="crm-dashboard-scroll">
                          {/* 1. Deals Approval Warning Banner */}
                          <div className="crm-approval-banner">
                            <div className="crm-approval-left">
                              <div className="crm-approval-icon">
                                <CheckCircle2 size={13} />
                              </div>
                              <div className="crm-approval-text">
                                <span className="crm-approval-title">12 Deals waiting for amount approval</span>
                                <span className="crm-approval-sub">Approve here so it counts toward the monthly goal.</span>
                              </div>
                            </div>
                            <button className="crm-approval-btn" type="button" onClick={(event) => {
                              event.currentTarget.textContent = 'APPROVED ✓';
                              event.currentTarget.disabled = true;
                            }}>
                              APPROVE &rarr;
                            </button>
                          </div>

                          {/* 2. Welcome Greeting & Quick Action Pills */}
                          <div className="crm-welcome-row">
                            <div className="crm-welcome-text">
                              <p className="crm-greeting">
                                Good afternoon, <span className="greeting-name">Alex</span>
                              </p>
                              <p className="crm-greeting-sub">
                                Your pipeline at a glance <span className="crm-link-reports">View reports &rarr;</span>
                              </p>
                            </div>

                            <div className="crm-action-pills">
                              {/* Check in button */}
                              <div className="crm-checkin-btn">
                                <div className="checkin-icon-wrap">
                                  <Clock size={11} />
                                </div>
                                <div className="checkin-copy">
                                  <span className="checkin-label">START YOUR DAY</span>
                                  <span className="checkin-action">Check in &rarr;</span>
                                </div>
                              </div>

                              {/* Reports to manager */}
                              <div className="crm-reports-to-pill">
                                <UserCheck size={11} className="reports-to-icon" />
                                <div className="reports-to-info">
                                  <span className="reports-to-label">REPORTS TO</span>
                                  <span className="reports-to-val"><strong>Demo</strong> (Manager)</span>
                                </div>
                                <Mail size={10} className="reports-to-mail" />
                              </div>

                              {/* Monthly Target: Sarah Lee */}
                              <div className="crm-target-pill">
                                <span className="target-pct-badge">%</span>
                                <div className="target-copy">
                                  <span className="target-label">THIS MONTH'S TARGET</span>
                                  <div className="target-person">
                                    <img
                                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&auto=format&fit=crop&q=80"
                                      alt="Sarah Lee"
                                      className="target-avatar"
                                    />
                                    <span className="target-name">Sarah Lee</span>
                                    <span className="target-arrow">&rsaquo;</span>
                                  </div>
                                </div>
                              </div>

                              <button className="crm-settings-btn" title="Settings">
                                <Settings size={12} />
                              </button>
                            </div>
                          </div>

                          {/* 3. Filter Tabs & Pivot Row */}
                          <div className="crm-filter-bar">
                            <div className="crm-segmented-tabs">
                              {['Today', '7 days', '30 days', 'This month', 'All time', 'Custom'].map((tab) => (
                                <button
                                  key={tab}
                                  className={`crm-tab-btn ${activeTab === tab ? 'active' : ''}`}
                                  onClick={() => setActiveTab(tab)}
                                >
                                  {tab}
                                </button>
                              ))}
                            </div>
                            <button className="crm-pivot-btn">
                              <Table size={11} />
                              <span>Pivot</span>
                            </button>
                          </div>

                          {/* 4. KPI Cards Row (6 Metric Cards) */}
                          <div className="crm-kpi-row-6">
                            {/* 1. New leads */}
                            <div className="crm-kpi-box">
                              <div className="kpi-box-header">
                                <span className="kpi-box-icon"><Users size={11} /></span>
                                <span className="kpi-box-title">New leads</span>
                              </div>
                              <div className="kpi-box-val">1,284</div>
                              <div className="kpi-box-sub">This month</div>
                            </div>

                            {/* 2. Open pipeline */}
                            <div className="crm-kpi-box">
                              <div className="kpi-box-header">
                                <span className="kpi-box-icon"><BarChart2 size={11} /></span>
                                <span className="kpi-box-title">Open pipeline</span>
                              </div>
                              <div className="kpi-box-val">856</div>
                              <div className="kpi-box-sub sub-teal">72% contacted</div>
                            </div>

                            {/* 3. To call */}
                            <div className="crm-kpi-box">
                              <div className="kpi-box-header">
                                <span className="kpi-box-icon"><PhoneCall size={11} /></span>
                                <span className="kpi-box-title">To call</span>
                              </div>
                              <div className="kpi-box-val">237</div>
                              <div className="kpi-box-sub">Assigned, not worked</div>
                            </div>

                            {/* 4. Won */}
                            <div className="crm-kpi-box">
                              <div className="kpi-box-header">
                                <span className="kpi-box-icon"><CheckCircle2 size={11} /></span>
                                <span className="kpi-box-title">Won</span>
                              </div>
                              <div className="kpi-box-val">24</div>
                              <div className="kpi-box-sub">189 lost</div>
                            </div>

                            {/* 5. Won value */}
                            <div className="crm-kpi-box">
                              <div className="kpi-box-header">
                                <span className="kpi-box-icon"><IndianRupee size={11} /></span>
                                <span className="kpi-box-title">Won value</span>
                              </div>
                              <div className="kpi-box-val">&#8377;12.8 L</div>
                              <div className="kpi-box-sub">This month</div>
                            </div>

                            {/* 6. Follow-ups */}
                            <div className="crm-kpi-box">
                              <div className="kpi-box-header">
                                <span className="kpi-box-icon"><Calendar size={11} /></span>
                                <span className="kpi-box-title">Follow-ups</span>
                              </div>
                              <div className="kpi-box-val">418</div>
                              <div className="kpi-box-sub">220 overdue &bull; 198 due</div>
                            </div>
                          </div>

                          {/* 5. Two Main Dashboard Cards: PIPELINE FUNNEL & INTEREST LEVEL */}
                          <div className="crm-bottom-cards-grid">
                            {/* Panel Left: PIPELINE FUNNEL */}
                            <div className="crm-panel-card">
                              <div className="crm-panel-header">
                                <div>
                                  <h3 className="crm-panel-title">PIPELINE FUNNEL</h3>
                                  <p className="crm-panel-sub">Leads by stage &bull; This month</p>
                                </div>
                              </div>

                              <div className="crm-funnel-list">
                                <div className="funnel-row">
                                  <span className="funnel-stage-name">New</span>
                                  <div className="funnel-track">
                                    <div className="funnel-bar bar-blue" style={{ width: '100%' }}></div>
                                  </div>
                                  <span className="funnel-stage-count">520</span>
                                </div>

                                <div className="funnel-row">
                                  <span className="funnel-stage-name">Contacted</span>
                                  <div className="funnel-track">
                                    <div className="funnel-bar bar-purple" style={{ width: '60%' }}></div>
                                  </div>
                                  <span className="funnel-stage-count">312</span>
                                </div>

                                <div className="funnel-row">
                                  <span className="funnel-stage-name">Not Connected</span>
                                  <div className="funnel-track">
                                    <div className="funnel-bar bar-pink" style={{ width: '38%' }}></div>
                                  </div>
                                  <span className="funnel-stage-count">198</span>
                                </div>

                                <div className="funnel-row">
                                  <span className="funnel-stage-name">Qualified</span>
                                  <div className="funnel-track">
                                    <div className="funnel-bar bar-orange" style={{ width: '28%' }}></div>
                                  </div>
                                  <span className="funnel-stage-count">146</span>
                                </div>

                                <div className="funnel-row">
                                  <span className="funnel-stage-name">Proposal</span>
                                  <div className="funnel-track">
                                    <div className="funnel-bar bar-yellow" style={{ width: '18%' }}></div>
                                  </div>
                                  <span className="funnel-stage-count">96</span>
                                </div>

                                <div className="funnel-row">
                                  <span className="funnel-stage-name">Negotiation</span>
                                  <div className="funnel-track">
                                    <div className="funnel-bar bar-green" style={{ width: '10%' }}></div>
                                  </div>
                                  <span className="funnel-stage-count">54</span>
                                </div>
                              </div>
                            </div>

                            {/* Panel Right: INTEREST LEVEL */}
                            <div className="crm-panel-card">
                              <div className="crm-panel-header">
                                <div>
                                  <h3 className="crm-panel-title">INTEREST LEVEL</h3>
                                  <p className="crm-panel-sub">Hot / Warm / Cold &bull; Leads worked &bull; This month</p>
                                </div>
                              </div>

                              <div className="crm-interest-body">
                                {/* Donut Chart */}
                                <div className="interest-donut-wrap">
                                  <svg viewBox="0 0 100 100" className="interest-donut-svg">
                                    {/* Background ring */}
                                    <circle cx="50" cy="50" r="37" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                                    {/* Segments: Circumference = 2 * PI * 37 = 232.48 */}
                                    {/* Hot 8% = 18.6 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="37"
                                      fill="none"
                                      stroke="#ef4444"
                                      strokeWidth="12"
                                      strokeDasharray="18.6 213.88"
                                      strokeDashoffset="0"
                                      transform="rotate(-90 50 50)"
                                    />
                                    {/* Warm 24% = 55.8 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="37"
                                      fill="none"
                                      stroke="#1d4ed8"
                                      strokeWidth="12"
                                      strokeDasharray="55.8 176.68"
                                      strokeDashoffset="-18.6"
                                      transform="rotate(-90 50 50)"
                                    />
                                    {/* Cold 52% = 120.89 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="37"
                                      fill="none"
                                      stroke="#0ea5e9"
                                      strokeWidth="12"
                                      strokeDasharray="120.89 111.59"
                                      strokeDashoffset="-74.4"
                                      transform="rotate(-90 50 50)"
                                    />
                                    {/* Untagged 16% = 37.2 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="37"
                                      fill="none"
                                      stroke="#94a3b8"
                                      strokeWidth="12"
                                      strokeDasharray="37.2 195.28"
                                      strokeDashoffset="-195.29"
                                      transform="rotate(-90 50 50)"
                                    />
                                  </svg>
                                  <div className="donut-stat-center">
                                    <span className="donut-count">2,104</span>
                                    <span className="donut-label">LEADS</span>
                                  </div>
                                </div>

                                {/* Legend Table */}
                                <div className="interest-legend-table">
                                  <div className="interest-legend-item">
                                    <span className="interest-dot dot-hot"></span>
                                    <span className="interest-name">Hot</span>
                                    <span className="interest-count">168</span>
                                    <span className="interest-pct">8%</span>
                                  </div>
                                  <div className="interest-legend-item">
                                    <span className="interest-dot dot-warm"></span>
                                    <span className="interest-name">Warm</span>
                                    <span className="interest-count">504</span>
                                    <span className="interest-pct">24%</span>
                                  </div>
                                  <div className="interest-legend-item">
                                    <span className="interest-dot dot-cold"></span>
                                    <span className="interest-name">Cold</span>
                                    <span className="interest-count">1,102</span>
                                    <span className="interest-pct">52%</span>
                                  </div>
                                  <div className="interest-legend-item">
                                    <span className="interest-dot dot-untagged"></span>
                                    <span className="interest-name">Untagged</span>
                                    <span className="interest-count">330</span>
                                    <span className="interest-pct">16%</span>
                                  </div>
                                </div>
                              </div>

                              {/* Recommendation Banner inside card */}
                              <div className="crm-reengage-banner">
                                <div className="reengage-left">
                                  <div className="reengage-icon">
                                    <Lightbulb size={12} />
                                  </div>
                                  <div className="reengage-copy">
                                    <p className="reengage-title">Cold leads are 12% higher this month.</p>
                                    <p className="reengage-sub">Consider a re-engagement campaign.</p>
                                  </div>
                                </div>
                                <button className="reengage-btn">View Leads &rarr;</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Real CRM Application Screenshot Display */
                      <div className="crm-screenshot-scroll">
                        <div
                          className="crm-screen-image-container"
                        >
                          <img
                            src={getScreenshotUrl(currentScreenMeta.file)}
                            alt={currentScreenMeta.title}
                            className="crm-real-screen-img"
                          />
                          <div className="crm-screen-floating-top">
                            <div className="crm-floating-meta">
                              <span className="screen-category-badge">{currentScreenMeta.category}</span>
                              <span className="screen-badge-pill">{currentScreenMeta.badge}</span>
                            </div>
                            <div className="crm-floating-actions">
                              {sidebarItem === 'Dashboard' && (
                                <button
                                  type="button"
                                  className="crm-switch-live-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDashboardMode('live');
                                  }}
                                  title="Switch to interactive UI"
                                >
                                  Interactive UI &rarr;
                                </button>
                              )}
                              <button
                                type="button"
                                className="screen-inspect-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenScreenshot(currentScreenMeta.id);
                                }}
                                title="Inspect in full screen lightbox"
                              >
                                <Maximize2 size={11} />
                                <span>Inspect Full Screen</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile View: High-Resolution CRM Dashboard Image properly fitted to laptop */}
                <div
                  className="crm-mobile-screen-view"
                >
                  <img
                    src={getScreenshotUrl('6766b2b0-f170-47b7-b227-70f5f2c2d8dc.jpg')}
                    alt="SalesAvatar CRM Executive Dashboard"
                    className="crm-mobile-dashboard-img"
                    loading="eager"
                  />
                  <div className="crm-mobile-screen-badge-bar">
                    <span className="crm-mobile-badge-live">
                      <Sparkles size={11} />
                      <span>Executive Dashboard</span>
                    </span>
                    <span className="crm-mobile-badge-tap">
                      <span>Interactive preview</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base / Keyboard Chassis */}
            <div className="laptop-base">
              <div className="laptop-notch"></div>
            </div>
            <div className="laptop-reflection"></div>
          </div>
        </div>
      </div>

      {/* Client Logo Trust Strip */}
      <div className="hero-trust-strip">
        <div className="hero-trust-container">
          <span className="trust-strip-title">POWERING HIGH-GROWTH SALES TEAMS ACROSS INDIA</span>
          <div className="trust-logos-wrapper" aria-label="Customer trust logos">
            <div className="trust-logos-track">
              {[0, 1, 2, 3, 4, 5].map((groupIdx) => (
                <div
                  key={`trust-logos-group-${groupIdx}`}
                  className="trust-logos-group"
                  aria-hidden={groupIdx > 0 ? "true" : undefined}
                >
                  {TRUST_LOGOS.map((logo, idx) => (
                    <div key={`trust-logo-${groupIdx}-${idx}`} className="trust-logo-item">
                      <img src={getAssetUrl(logo.file)} alt={logo.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for All 22 CRM Screens */}
      <CrmLightboxModal
        isOpen={lightboxOpen}
        screenshots={CRM_SCREENSHOTS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        onOpenTrial={onOpenTrial}
        onOpenDemo={onOpenDemo}
      />
    </section>
  );
}
