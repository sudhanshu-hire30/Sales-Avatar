import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Star, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function TestimonialsPage({ onOpenTrial, onOpenDemo }) {
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      category: 'real-estate',
      name: 'Real Estate Developer',
      role: 'Head of Sales & Marketing',
      company: 'Property Developers (Sample Case Study)',
      metric: 'Fast Inbound Lead Distribution',
      stars: 5,
      avatar: 'RE',
      avatarColor: '#2563eb',
      quote: 'Renting our CRM on a monthly subscription gave us complete flexibility. Our weekend site visits and incoming portal leads are routed automatically to sales executives in seconds.'
    },
    {
      id: 2,
      category: 'bfsi',
      name: 'Financial Advisory Firm',
      role: 'VP of Wealth Operations',
      company: 'Financial Services (Sample Case Study)',
      metric: 'Role-Based Access Control',
      stars: 5,
      avatar: 'BF',
      avatarColor: '#ea580c',
      quote: 'We operate in a compliant environment. Having role-based document access, encrypted records, and complete tenant data isolation gives our compliance officers total peace of mind.'
    },
    {
      id: 3,
      category: 'field',
      name: 'Field Distribution Brand',
      role: 'National Operations Director',
      company: 'Distribution Network (Sample Case Study)',
      metric: 'Geo-Verified Attendance & Trips',
      stars: 5,
      avatar: 'FD',
      avatarColor: '#f97316',
      quote: 'Managing field executives across multiple cities was simplified with GPS check-ins and automated route travel allowances. Field officers log visits on their phones effortlessly.'
    },
    {
      id: 4,
      category: 'saas',
      name: 'B2B Software Company',
      role: 'Chief Revenue Officer',
      company: 'Enterprise Software (Sample Case Study)',
      metric: 'Visual Pipeline & Forecasts',
      stars: 5,
      avatar: 'B2',
      avatarColor: '#10b981',
      quote: 'The visual drag-and-drop Kanban pipeline and weighted revenue forecasting give leadership clear visibility into quarterly closures and stage-by-stage conversions.'
    },
    {
      id: 5,
      category: 'real-estate',
      name: 'Commercial Brokerage',
      role: 'Director of Business Development',
      company: 'Commercial Advisory (Sample Case Study)',
      metric: 'Centralized Customer Records',
      stars: 5,
      avatar: 'CB',
      avatarColor: '#06b6d4',
      quote: 'Centralizing all customer contacts, interaction history, and follow-up tasks ensures that our company data remains 100% secure in our tenant workspace at all times.'
    },
    {
      id: 6,
      category: 'field',
      name: 'Equipment Manufacturer',
      role: 'Regional Operations Manager',
      company: 'Dealer Network (Sample Case Study)',
      metric: 'Dealer & Distributor Management',
      stars: 5,
      avatar: 'DM',
      avatarColor: '#eab308',
      quote: 'The platform is lightweight and easy to learn. Managing authorized dealer networks, territory allocations, and customer support tickets happens all in one cloud workspace.'
    }
  ];

  const filtered = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === filter);

  return (
    <div className="subpage-view testimonials-page">
      {/* Header Banner */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-split-container">
          {/* Left Column: Headline, Trust Checks & CTAs */}
          <div className="subpage-hero-left">
            <div className="section-pill-badge blue">
              <Sparkles size={13} />
              <span>SUBSCRIBER CASE STUDIES (SAMPLE DATA)</span>
            </div>
            <h1 className="subpage-hero-title">
              How Modern Businesses Scale With <br />
              <span className="gradient-text">Cloud CRM Subscriptions</span>
            </h1>
            <p className="subpage-hero-subtitle">
              Discover how developers, financial firms, field distributors, and fast-scaling enterprises rent secure cloud CRM workspaces to streamline leads, sales pipelines, and team accountability.
            </p>

            <div className="subpage-hero-checks">
              <div className="subpage-check-item">
                <ShieldCheck size={14} color="#10b981" />
                <span>Multi-Tenant Data Isolation</span>
              </div>
              <div className="subpage-check-item">
                <Building2 size={14} color="#ea580c" />
                <span>Configurable Workspace Modules</span>
              </div>
              <div className="subpage-check-item">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>Subscriber Case Studies (Sample Data)</span>
              </div>
            </div>

            <div className="subpage-hero-cta-row">
              <button 
                type="button" 
                className="btn-subpage-primary"
                onClick={() => {
                  const el = document.getElementById('testimonials-grid-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onOpenTrial('Professional');
                }}
              >
                Explore Case Studies <ArrowRight size={16} />
              </button>
              <Link to="/crm-tour" className="btn-subpage-ghost">
                Full Product Tour
              </Link>
            </div>
          </div>

          {/* Right Column: Customer Spotlight Preview Card */}
          <div className="subpage-hero-right">
            <div className="hero-preview-glass-card">
              <div className="preview-card-header">
                <div className="preview-header-left">
                  <span className="live-pulse-dot" />
                  <span className="preview-header-title">Customer Spotlight</span>
                </div>
                <span className="preview-header-badge">Verified Story</span>
              </div>

              {/* Featured Quote Card */}
              <div style={{
                background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
                border: '1.5px solid #e2e8f0',
                borderRadius: 16,
                padding: '18px',
                textAlign: 'left',
                marginBottom: 16,
                boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.05)'
              }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p style={{
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: '#1e293b',
                  fontStyle: 'italic',
                  margin: '0 0 14px'
                }}>
                  "Before SalesAvatar, our site visit leads sat uncalled for 48 hours. Now every inquiry is routed in 90 seconds. Our weekend property site visits tripled in just two months."
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#2563eb',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 13
                    }}>
                      RV
                    </div>
                    <div>
                      <b style={{ display: 'block', fontSize: 13, color: '#0f172a' }}>Rajesh Varma</b>
                      <span style={{ fontSize: 11, color: '#64748b' }}>Head of Sales, Apex Realty</span>
                    </div>
                  </div>
                  <span style={{
                    background: '#ecfdf5',
                    color: '#047857',
                    border: '1px solid #a7f3d0',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 6
                  }}>
                    +310% Visits
                  </span>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                textAlign: 'center'
              }}>
                <div style={{ background: '#f8fafc', padding: '10px 6px', borderRadius: 10, border: '1px solid #f1f5f9' }}>
                  <b style={{ display: 'block', fontSize: 16, color: '#0f172a' }}>10k+</b>
                  <span style={{ fontSize: 10.5, color: '#64748b' }}>Active Closers</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 6px', borderRadius: 10, border: '1px solid #f1f5f9' }}>
                  <b style={{ display: 'block', fontSize: 16, color: '#0f172a' }}>₹450Cr+</b>
                  <span style={{ fontSize: 10.5, color: '#64748b' }}>Deals Closed</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 6px', borderRadius: 10, border: '1px solid #f1f5f9' }}>
                  <b style={{ display: 'block', fontSize: 16, color: '#0f172a' }}>90s</b>
                  <span style={{ fontSize: 10.5, color: '#64748b' }}>Avg Lead Touch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="testimonials-stats-bar">
        <div className="stats-bar-container">
          <div className="stat-col">
            <span className="stat-big">10,000+</span>
            <span className="stat-lbl">Active Sales Professionals</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-col">
            <span className="stat-big">4.9 / 5</span>
            <span className="stat-lbl">Average Customer Rating</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-col">
            <span className="stat-big">₹450+ Cr</span>
            <span className="stat-lbl">Deal Pipeline Tracked</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-col">
            <span className="stat-big">99.98%</span>
            <span className="stat-lbl">Verified Server Uptime</span>
          </div>
        </div>
      </section>

      {/* Testimonials Filter & Grid */}
      <section className="testimonials-content-section" id="testimonials-grid-section">
        <div className="testimonials-container">
          {/* Category Filter */}
          <div className="features-filter-nav">
            {[
              { id: 'all', label: 'All Industries' },
              { id: 'real-estate', label: 'Real Estate' },
              { id: 'bfsi', label: 'BFSI & Wealth' },
              { id: 'field', label: 'Field & Distribution' },
              { id: 'saas', label: 'B2B Tech & Services' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`feat-filter-btn ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="testimonials-cards-grid">
            {filtered.map(item => (
              <div key={item.id} className="test-full-card">
                <div className="test-top-row">
                  <div className="test-stars-row">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="test-impact-badge">{item.metric}</span>
                </div>

                <p className="test-quote-text">
                  "{item.quote}"
                </p>

                <div className="test-author-row">
                  <div className="test-avatar-bubble" style={{ background: item.avatarColor }}>
                    {item.avatar}
                  </div>
                  <div className="test-author-info">
                    <h4 className="test-author-name">{item.name}</h4>
                    <span className="test-author-role">{item.role}</span>
                    <span className="test-author-company">{item.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
