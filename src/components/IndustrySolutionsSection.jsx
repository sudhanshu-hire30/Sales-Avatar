import React, { useState } from 'react';
import { 
  Building2, 
  Factory, 
  Sun, 
  Coins, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MapPin,
  MessageSquare
} from 'lucide-react';

const INDUSTRIES = [
  {
    id: 'real-estate',
    name: 'Real Estate & Builders',
    icon: Building2,
    badge: 'Property & Infrastructure',
    color: '#ea580c',
    headline: 'Stop Losing High-Ticket Property Inquiries to Delayed Callbacks',
    painPoint: '99acres & housing inquiries sit in spreadsheets for hours, site visits get missed, and channel partner (broker) disputes eat up margins.',
    solution: 'Auto-assign property leads in 30 seconds, auto-trigger WhatsApp brochures, and geofence site-visit check-ins with client feedback.',
    metrics: [
      { label: 'Faster Callback Response', val: '< 60 Sec' },
      { label: 'Site Visit Conversion', val: '+44%' },
      { label: 'Zero Broker Dispute', val: '100% Locked' }
    ],
    features: [
      'Instant integration with 99acres, Magicbricks, and Meta Lead Ads',
      'Site visit scheduler with SMS/WhatsApp directions to prospective buyers',
      'Channel Partner (CP) tag lock to avoid duplicate commission claims',
      'Inventory unit status (Available, Booked, Token Received)'
    ]
  },
  {
    id: 'manufacturing',
    name: 'B2B & Distributors',
    icon: Factory,
    badge: 'Manufacturing & Wholesale',
    color: '#ea580c',
    headline: 'Total Visibility Over Dealer Networks & Field Order Bookings',
    painPoint: 'Field sales executives claim fake client visits, order quotes take days for manager approval, and dealer payment follow-ups get delayed.',
    solution: 'GPS geofenced client visits, 1-click quotation approvals with discount limits, and automated outstanding payment reminders.',
    metrics: [
      { label: 'Field Visit Authenticity', val: '100% Geo-verified' },
      { label: 'Quote Turnaround Time', val: '4x Faster' },
      { label: 'Dealer Retention Rate', val: '+38%' }
    ],
    features: [
      'Mobile app GPS attendance with selfie check-in at factory/dealer gates',
      'Multi-level discount authorization workflows for sales heads',
      'Centralized dealer profile with order history and credit status',
      'Dispatch status notifications via WhatsApp to wholesale buyers'
    ]
  },
  {
    id: 'solar',
    name: 'Solar EPC & CleanTech',
    icon: Sun,
    badge: 'Solar & Renewable Energy',
    color: '#eab308',
    headline: 'Track Every Project From Rooftop Survey to Grid Net Metering',
    painPoint: 'Lead acquisition is expensive, technical site photos get lost on WhatsApp, and government subsidy paperwork delays project cash flow.',
    solution: 'Dedicated project site pipeline with technical survey photo uploads, customer KYC vault, and stage-by-stage installation tracking.',
    metrics: [
      { label: 'Survey-to-Quote Speed', val: 'Same Day' },
      { label: 'Subsidy Paperwork Delay', val: '-60%' },
      { label: 'Customer Referrals', val: '+32%' }
    ],
    features: [
      'Rooftop technical survey checklist with GPS location and photo attachments',
      'Milestone tracking: Sanction Letter ➔ Installation ➔ Net Metering ➔ Subsidy',
      'Automated customer WhatsApp updates on installation milestone progress',
      'Team quota tracking for kilowatt (kW) capacity closed per month'
    ]
  },
  {
    id: 'financial',
    name: 'Loan DSAs & Fintech',
    icon: Coins,
    badge: 'Loans, Mortgages & Insurance',
    color: '#10b981',
    headline: 'Close More Loans & Policies Without Document Verification Chaos',
    painPoint: 'Incomplete borrower documents cause bank rejections, customer loan files get stuck, and sales commission calculations are tedious.',
    solution: 'Secure document collection vault, multi-bank file progress tracking, and automated commission reconciliation for sales agents.',
    metrics: [
      { label: 'File Disbursal Ratio', val: '+48%' },
      { label: 'Document Rejection Rate', val: '-70%' },
      { label: 'Agent Payout Accuracy', val: '100%' }
    ],
    features: [
      'Automated KYC & ITR document collection portal via WhatsApp links',
      'Multi-lender pipeline tracking (HDFC, ICICI, SBI, Axis status stages)',
      'Sub-DSA & agent hierarchy with commission split automation',
      'Data encryption & DPDP-ready Indian cloud storage for financial safety'
    ]
  },
  {
    id: 'services',
    name: 'Agencies & Tech Services',
    icon: Briefcase,
    badge: 'Consulting & Professional Services',
    color: '#8b5cf6',
    headline: 'Turn Long Sales Cycles Into Predictable Monthly Retainers',
    painPoint: 'RFP responses take too long, meeting minutes are forgotten, and retainer contract renewals slip through the cracks.',
    solution: 'Unified client account 360°, contract expiry alert timers, and automated proposal follow-ups that keep your team top-of-mind.',
    metrics: [
      { label: 'Proposal Win Rate', val: '+35%' },
      { label: 'Client Retainer Renewals', val: '94%' },
      { label: 'Meeting Note Logging', val: '100%' }
    ],
    features: [
      'Discovery-to-SOW stage pipeline with contract value tracking',
      'Automatic meeting reminders and calendar integration',
      'Renewal reminder alerts 30 days before retainer contracts lapse',
      'Internal team collaboration channels for cross-functional proposal writing'
    ]
  }
];

export default function IndustrySolutionsSection({ onOpenDemo }) {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);

  return (
    <section className="industry-solutions-section" id="solutions">
      <div className="industry-container">
        {/* Section Header */}
        <div className="section-center-header">
          <div className="section-pill-badge orange">
            <Sparkles size={14} className="badge-sparkle" />
            <span>TAILORED FOR YOUR INDUSTRY</span>
          </div>
          <h2 className="section-main-title">
            Built for How Your Industry <br className="hidden-mobile" />
            <span className="gradient-text">Actually Sells in India</span>
          </h2>
          <p className="section-main-subtitle">
            One size never fits all. Select your sector below to see the exact workflow customizations SalesAvatar delivers on Day 1.
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="industry-tabs-bar" role="tablist">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isSelected = selectedIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`industry-nav-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedIndustry(ind)}
              >
                <div className="ind-btn-icon-wrap" style={{ color: ind.color }}>
                  <Icon size={18} />
                </div>
                <span className="ind-btn-name">{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="industry-detail-card">
          <div className="industry-detail-grid">
            {/* Left Content Column */}
            <div className="ind-detail-left">
              <div className="ind-pill-badge">
                <span>{selectedIndustry.badge}</span>
              </div>

              <h3 className="ind-detail-headline">{selectedIndustry.headline}</h3>

              {/* The Pain & The Fix */}
              <div className="ind-problem-solution-box">
                <div className="prob-sol-row problem">
                  <span className="badge-tag red">The Costly Chaos:</span>
                  <p>{selectedIndustry.painPoint}</p>
                </div>
                <div className="prob-sol-row solution">
                  <span className="badge-tag green">SalesAvatar Fix:</span>
                  <p>{selectedIndustry.solution}</p>
                </div>
              </div>

              {/* 4 Feature Bullets */}
              <div className="ind-features-list">
                <h4 className="features-list-title">Day-1 Configured Capabilities:</h4>
                <div className="features-grid-two">
                  {selectedIndustry.features.map((feat, i) => (
                    <div key={i} className="ind-feat-item">
                      <CheckCircle2 size={16} color="#10b981" className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ind-cta-row">
                <button 
                  type="button" 
                  className="btn-ind-demo"
                  onClick={onOpenDemo}
                >
                  See {selectedIndustry.name} Demo <ArrowRight size={16} />
                </button>
                <span className="ind-guarantee-note">
                  <ShieldCheck size={14} color="#10b981" /> Custom field labels &amp; pipeline ready in 15 mins
                </span>
              </div>
            </div>

            {/* Right Metric Box */}
            <div className="ind-detail-right">
              <div className="ind-stats-showcase">
                <h4 className="stats-showcase-title">Measurable Industry Impact</h4>
                <div className="ind-metrics-stack">
                  {selectedIndustry.metrics.map((m, idx) => (
                    <div key={idx} className="ind-stat-tile">
                      <span className="ind-stat-val">
                        {m.val}
                      </span>
                      <span className="ind-stat-label">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="ind-quote-box">
                  <p className="ind-quote-text">
                    &ldquo;Setting up SalesAvatar for our field sales team took less than a morning. Our inquiry leakage dropped to zero within 2 weeks.&rdquo;
                  </p>
                  <span className="ind-quote-author">
                    Verified Indian Sales Leader &bull; {selectedIndustry.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
