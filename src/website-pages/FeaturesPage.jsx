import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Filter, 
  Calendar, 
  BarChart2, 
  MapPin, 
  Trophy, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Maximize2,
  Eye
} from 'lucide-react';
import CrmLightboxModal from '../components/CrmLightboxModal';
import { CRM_SCREENSHOTS, getScreenshotUrl } from '../data/crmScreenshots';

const featureList = [
    {
      id: 'leads',
      category: 'pipeline',
      title: 'Lead Management & Automated Ingestion',
      badge: '01. Ingestion',
      icon: Users,
      color: '#10b981',
      bgLight: '#ecfdf5',
      screenshotFile: 'ef397b13-affc-4018-9693-fabea53c0aaa.jpg',
      screenshotScreenId: 'sales-leads-table',
      screenshotTitle: '1,248+ Leads Directory & Multi-Stage Table',
      desc: 'Capture and organize inbound sales leads automatically from web forms, ad campaigns, and incoming inquiries with instant deduplication.',
      points: [
        'Instant round-robin or territory-based auto-assignment',
        'Automatic deduplication and phone number verification',
        'Lead decay warning timers when follow-ups are overdue',
        'Custom tagging by product, budget, and source campaign'
      ]
    },
    {
      id: 'customers',
      category: 'pipeline',
      title: 'Customer 360° Account Management',
      badge: '02. Accounts',
      icon: Users,
      color: '#06b6d4',
      bgLight: '#ecfeff',
      screenshotFile: '14c4bfbc-4c28-404d-a836-213b1e0d9519.jpg',
      screenshotScreenId: 'lead-detail-timeline',
      screenshotTitle: 'Lead Profile & Call/WhatsApp Activity Timeline',
      desc: 'Complete customer profiles with centralized contact details, transaction records, past orders, file attachments, and communication timelines.',
      points: [
        'Centralized customer directory with company hierarchy',
        'Complete interaction history across calls, meetings, and emails',
        'Document and contract attachment storage per customer',
        'Customer segmentation by lifetime value and account health'
      ]
    },
    {
      id: 'pipeline',
      category: 'pipeline',
      title: 'Visual Drag-and-Drop Sales Pipeline',
      badge: '03. Conversions',
      icon: Filter,
      color: '#2563eb',
      bgLight: '#eff6ff',
      screenshotFile: '6766b2b0-f170-47b7-b227-70f5f2c2d8dc.jpg',
      screenshotScreenId: 'dashboard-overview',
      screenshotTitle: 'Pipeline Funnel & Lead Interest Distribution',
      desc: 'Track every deal across customizable stages: New Lead, Contacted, Qualified, Proposal Sent, Negotiation, and Won.',
      points: [
        'Visual Kanban stages with total deal revenue metrics',
        'Probability weighting and forecasted monthly revenue',
        '1-click stage advancement with reason logging on drop-offs',
        'Full historical audit trail of deal movements'
      ]
    },
    {
      id: 'followup',
      category: 'tasks',
      title: 'Follow-Up Tasks & Reminder Automation',
      badge: '04. Follow-Ups',
      icon: Calendar,
      color: '#ea580c',
      bgLight: '#fff7ed',
      screenshotFile: '96d04885-5c0b-44a5-bfa0-c637795ba64d.jpg',
      screenshotScreenId: 'followup-queue',
      screenshotTitle: 'Due Follow-Ups & One-Click Calling Queue',
      desc: 'Never let a warm prospect go cold. Schedule calls, meetings, and follow-up alerts with automated reminders for sales reps and managers.',
      points: [
        'Push notifications, SMS, and email alerts prior to calls',
        'Overdue task warnings and manager escalation timers',
        'Call outcome notes and meeting minutes logging',
        'Automated calendar sync and daily follow-up queue'
      ]
    },
    {
      id: 'attendance',
      category: 'field',
      title: 'Field Officer Management & Geo-Attendance',
      badge: '05. Field Force',
      icon: MapPin,
      color: '#f97316',
      bgLight: '#fff7ed',
      screenshotFile: 'fd86ccb8-add2-4a4e-a1b4-badb0740a7cd.jpg',
      screenshotScreenId: 'attendance-tracking',
      screenshotTitle: 'Employee Attendance & Daily Punch Register',
      desc: 'Track on-field sales representatives with GPS location stamping, selfie verification, client site check-ins, and conveyance tracking.',
      points: [
        'Geofenced mobile check-in & check-out at client properties',
        'Live rep location and visit timestamps during shift hours',
        'Automated conveyance distance calculation in kilometers',
        'Verification of client visits with photos and site notes'
      ]
    },
    {
      id: 'dealers',
      category: 'field',
      title: 'Dealer & Distributor Network Management',
      badge: '06. Distribution',
      icon: Filter,
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
      screenshotFile: 'd5b197d3-4fcf-477a-8e7f-a567647cd704.jpg',
      screenshotScreenId: 'project-sites',
      screenshotTitle: 'Project Sites & 20-Stage Handover Progress',
      desc: 'Manage authorized dealer networks, distributor orders, territory assignments, and partner sales fulfillment in a unified hub.',
      points: [
        'Dealer profiles, credit terms, and regional territory allocation',
        'Distributor purchase order logging and dispatch tracking',
        'Channel partner sales performance and target comparisons',
        'Automated stock inquiries and order status updates'
      ]
    },
    {
      id: 'targets',
      category: 'analytics',
      title: 'Sales Team Management & Target Quotas',
      badge: '07. Performance',
      icon: Trophy,
      color: '#eab308',
      bgLight: '#fefce8',
      screenshotFile: 'a6fccb54-6ca5-44ea-84b8-bad25878ac35.jpg',
      screenshotScreenId: 'executive-goals',
      screenshotTitle: 'Executive ₹4.80 Cr Target & Quota Pacing',
      desc: 'Set and track individual and team sales targets. Monitor closing ratios, rep velocity, and celebrate milestones transparently.',
      points: [
        'Monthly and quarterly sales target setting by rep and team',
        'Real-time quota progress tracking and closing projections',
        'Sales leaderboards to foster healthy motivation',
        'Activity scorecards: calls, meetings, site visits, and revenue'
      ]
    },
    {
      id: 'analytics',
      category: 'analytics',
      title: 'Reports & Executive Analytics',
      badge: '08. Intelligence',
      icon: BarChart2,
      color: '#10b981',
      bgLight: '#ecfdf5',
      screenshotFile: '83161ec4-f704-4a73-acfc-15e759c7a704.jpg',
      screenshotScreenId: 'pipeline-analytics',
      screenshotTitle: 'Executive Pipeline Analytics & Attribution',
      desc: 'Transform sales activity into actionable insights. Real-time dashboards, conversion bottleneck detection, and exportable reports.',
      points: [
        'Interactive dashboards with date range, team, and territory filters',
        'Conversion funnel analysis to identify drop-off stages',
        'Automated scheduled report delivery via email to management',
        'Complete audit logs of tenant activities and records'
      ]
    }
  ];

export default function FeaturesPage({ onOpenTrial, onOpenDemo }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const location = useLocation();

  const handleOpenScreenshot = (screenId) => {
    const idx = CRM_SCREENSHOTS.findIndex((s) => s.id === screenId);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        setActiveCategory((prev) => {
          const match = featureList.find((f) => f.id === id);
          if (match && prev !== 'all' && prev !== match.category) {
            return 'all';
          }
          return prev;
        });
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('highlight-pulse');
          setTimeout(() => el.classList.remove('highlight-pulse'), 2500);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const filteredFeatures = activeCategory === 'all' 
    ? featureList 
    : featureList.filter(f => f.category === activeCategory);

  return (
    <div className="subpage-view features-page">
      {/* Page Header */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-split-container">
          {/* Left Column: Headline & CTA */}
          <div className="subpage-hero-left">
            <div className="section-pill-badge blue">
              <Sparkles size={13} />
              <span>PLATFORM CAPABILITIES & MODULES</span>
            </div>
            <h1 className="subpage-hero-title">
              Engineered to Power Every Stage of <br />
              <span className="gradient-text">Your Sales Cycle</span>
            </h1>
            <p className="subpage-hero-subtitle">
              From multi-channel lead ingestion to drag-and-drop pipelines, geo-attendance, gamified recognition, and payroll automation — everything is seamlessly unified.
            </p>

            <div className="subpage-hero-checks">
              <div className="subpage-check-item">
                <Check size={14} color="#10b981" />
                <span>8 Unified Modules</span>
              </div>
              <div className="subpage-check-item">
                <Check size={14} color="#10b981" />
                <span>90s Lead Auto-Routing</span>
              </div>
              <div className="subpage-check-item">
                <Check size={14} color="#10b981" />
                <span>100% DPDP Compliant</span>
              </div>
            </div>

            <div className="subpage-hero-cta-row">
              <button 
                type="button" 
                className="btn-subpage-primary" 
                onClick={() => onOpenTrial('Business')}
              >
                Request CRM Setup <ArrowRight size={16} />
              </button>
              <Link
                to="/crm-tour"
                className="btn-subpage-ghost" 
              >
                Full Product Tour
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Real-Time Preview Card */}
          <div className="subpage-hero-right">
            <div className="hero-preview-glass-card">
              <div className="preview-card-header">
                <div className="preview-header-left">
                  <span className="live-pulse-dot" />
                  <span className="preview-header-title">Live Sales Activity Pulse</span>
                </div>
                <span className="preview-header-badge">Real-Time Sync</span>
              </div>

              <div className="preview-stream-list">
                <div className="stream-item">
                  <div className="stream-icon-box" style={{ background: '#ecfdf5', color: '#10b981' }}>
                    <Users size={16} />
                  </div>
                  <div className="stream-content">
                    <div className="stream-title-row">
                      <b>New Lead Ingestion</b>
                      <span className="stream-time">Just now</span>
                    </div>
                    <span className="stream-sub">Rajesh Enterprises (Auto-assigned to Priya N.)</span>
                    <span className="stream-revenue-pill">₹8,50,000 Deal</span>
                  </div>
                </div>

                <div className="stream-item">
                  <div className="stream-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
                    <MapPin size={16} />
                  </div>
                  <div className="stream-content">
                    <div className="stream-title-row">
                      <b>Field Check-in Verified</b>
                      <span className="stream-time">3m ago</span>
                    </div>
                    <span className="stream-sub">DLF CyberCity, Gurugram (Selfie + GPS verified ✓)</span>
                  </div>
                </div>

                <div className="stream-item">
                  <div className="stream-icon-box" style={{ background: '#fefce8', color: '#eab308' }}>
                    <Trophy size={16} />
                  </div>
                  <div className="stream-content">
                    <div className="stream-title-row">
                      <b>Deal Won & Celebrated!</b>
                      <span className="stream-time">14m ago</span>
                    </div>
                    <span className="stream-sub">NextGen Infra (+₹14,20,000) &bull; Prince Tiwari</span>
                    <span className="stream-revenue-pill">🏆 #1 Sales Avatar</span>
                  </div>
                </div>
              </div>

              <div className="preview-card-bottom-stats">
                <div className="bottom-stat-col">
                  <b>84 sec</b>
                  <span>Avg Response Time</span>
                </div>
                <div className="bottom-stat-col">
                  <b>98.4%</b>
                  <span>Active Reps On-Floor</span>
                </div>
                <div className="bottom-stat-col">
                  <b>₹1.42 Cr</b>
                  <span>Pipeline Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="features-content-section">
        <div className="features-container">
          <div className="features-filter-nav">
            {[
              { id: 'all', label: 'All Modules' },
              { id: 'pipeline', label: 'Leads, Customers & Pipelines' },
              { id: 'tasks', label: 'Follow-up Reminders' },
              { id: 'field', label: 'Field Officers & Dealers' },
              { id: 'analytics', label: 'Reports & Sales Targets' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`feat-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detailed Features Grid */}
          <div className="features-detailed-grid">
            {filteredFeatures.map(f => {
              const Icon = f.icon;
              const imgUrl = f.screenshotFile ? getScreenshotUrl(f.screenshotFile) : null;
              return (
                <div key={f.id} className="feature-detail-card" id={f.id}>
                  <div className="feature-card-header">
                    <div className="feature-icon-box" style={{ background: f.bgLight, color: f.color }}>
                      <Icon size={24} strokeWidth={2.4} />
                    </div>
                    <span className="feature-badge-pill" style={{ color: f.color, background: f.bgLight }}>
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="feature-card-title">{f.title}</h3>
                  <p className="feature-card-desc">{f.desc}</p>

                  {/* Real CRM Screen Visual Preview */}
                  {imgUrl && (
                    <div 
                      className="feature-screen-preview-box"
                      onClick={() => handleOpenScreenshot(f.screenshotScreenId)}
                      title={`Inspect ${f.screenshotTitle} in full resolution`}
                    >
                      <div className="preview-top-bar">
                        <span className="preview-tag">Verified Real Screen</span>
                        <span className="preview-zoom-label">
                          <Maximize2 size={12} /> Inspect
                        </span>
                      </div>
                      <img 
                        src={imgUrl} 
                        alt={f.screenshotTitle || f.title} 
                        className="feature-real-img"
                        loading="lazy"
                      />
                      <div className="preview-screen-caption">
                        {f.screenshotTitle}
                      </div>
                    </div>
                  )}

                  <ul className="feature-points-list">
                    {f.points.map((pt, i) => (
                      <li key={i}>
                        <Check size={16} color={f.color} className="point-check-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="feature-card-footer">
                    <button 
                      type="button" 
                      className="btn-card-learn" 
                      onClick={() => onOpenTrial('Business')}
                    >
                      <span>Try this module</span>
                      <ArrowRight size={14} />
                    </button>
                    {f.screenshotScreenId && (
                      <button
                        type="button"
                        className="btn-card-screenshot"
                        onClick={() => handleOpenScreenshot(f.screenshotScreenId)}
                      >
                        <Eye size={13} />
                        <span>See Screen</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Matrix Table */}
          <div className="comparison-table-wrapper">
            <div className="table-header-block">
              <span className="section-pill-badge purple">
                <ShieldCheck size={13} />
                <span>SIDE-BY-SIDE EVALUATION</span>
              </span>
              <h2 className="table-main-title">SalesAvatar vs Legacy Alternatives</h2>
              <p className="table-main-sub">
                Why modern Indian sales leaders are replacing fragmented spreadsheets and complex Western CRMs.
              </p>
            </div>

            <div className="table-responsive-box">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Capability / Metric</th>
                    <th className="highlight-col">SalesAvatar Platform</th>
                    <th>WhatsApp & Excel Sheets</th>
                    <th>Legacy Western CRMs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Lead Leakage & Auto-Routing</strong></td>
                    <td className="highlight-col"><Check size={18} color="#10b981" /> 100% automated with zero drops</td>
                    <td>❌ High manual leakage (20-35%)</td>
                    <td>⚠️ Complex setup ($$$ consultants)</td>
                  </tr>
                  <tr>
                    <td><strong>GPS Field Rep Attendance</strong></td>
                    <td className="highlight-col"><Check size={18} color="#10b981" /> Built-in with selfie check-in</td>
                    <td>❌ Honor system / WhatsApp groups</td>
                    <td>❌ Requires separate third-party app</td>
                  </tr>
                  <tr>
                    <td><strong>Sales Motivation & Recognition</strong></td>
                    <td className="highlight-col"><Check size={18} color="#10b981" /> Live Leaderboards & Avatar cup</td>
                    <td>❌ None</td>
                    <td>⚠️ Dull static reports only</td>
                  </tr>
                  <tr>
                    <td><strong>Commission & Salary Calculation</strong></td>
                    <td className="highlight-col"><Check size={18} color="#10b981" /> 1-Click automated payout ledger</td>
                    <td>❌ 3 days of monthly manual Excel work</td>
                    <td>❌ Needs dedicated payroll plugin</td>
                  </tr>
                  <tr>
                    <td><strong>Setup & Onboarding Time</strong></td>
                    <td className="highlight-col"><Check size={18} color="#10b981" /> Live in 15 minutes</td>
                    <td>Immediate but fragile</td>
                    <td>❌ 4 to 12 weeks of training</td>
                  </tr>
                  <tr>
                    <td><strong>Indian DPDP Act Compliance</strong></td>
                    <td className="highlight-col"><Check size={18} color="#10b981" /> 100% Compliant (Indian Data Centers)</td>
                    <td>❌ High compliance risk</td>
                    <td>⚠️ Stored in foreign jurisdictions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <CrmLightboxModal
        isOpen={lightboxOpen}
        screenshots={CRM_SCREENSHOTS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        onOpenTrial={() => onOpenTrial('Business')}
        onOpenDemo={onOpenDemo}
      />
    </div>
  );
}
