import React from 'react';
import { 
  Check, 
  X, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Clock, 
  FileSpreadsheet, 
  Layers 
} from 'lucide-react';

export default function ComparisonSection({ onOpenDemo }) {
  const comparisonRows = [
    {
      feature: 'Inbound Lead Assignment',
      avatar: 'Instant 30s Round-Robin auto-routing',
      excel: 'Manual copy-pasting from emails (hours delay)',
      legacy: 'Complex workflow rules requiring paid admin'
    },
    {
      feature: 'WhatsApp 1-Click Messaging',
      avatar: 'Official 1-click templates + CRM auto-log',
      excel: 'Manual typing on personal phone (no records)',
      legacy: 'Requires expensive third-party Twilio/Zapier setup'
    },
    {
      feature: 'Field Officer GPS & Attendance',
      avatar: 'Native GPS geofencing & selfie check-in',
      excel: 'WhatsApp location shares with zero verification',
      legacy: 'Not available or requires separate field app'
    },
    {
      feature: 'Follow-Up Decay Alerts',
      avatar: 'Automatic overdue timers + manager alerts',
      excel: 'Leads forgotten forever when reps get busy',
      legacy: 'Generic task lists that reps ignore'
    },
    {
      feature: 'Setup & Onboarding Time',
      avatar: 'Live in 15 minutes (Guided assistance)',
      excel: 'Instant, but causes chaos after 100 leads',
      legacy: '3 to 6 months with costly ERP consultants'
    },
    {
      feature: 'Pricing & Lock-In',
      avatar: 'Starts at ₹999/mo &bull; Flexible &bull; GST ITC',
      excel: 'Free, but costs Lakhs in lost deal revenue',
      legacy: 'Billed in USD or hefty annual contracts upfront'
    },
    {
      feature: 'Indian DPDP Compliance & Cloud',
      avatar: '100% Indian Cloud data residency',
      excel: 'High risk of client data theft by exiting reps',
      legacy: 'Foreign servers with complicated cross-border terms'
    },
    {
      feature: 'Dedicated Support by Phone',
      avatar: 'Direct Indian phone & WhatsApp support',
      excel: 'None',
      legacy: 'Slow email ticketing with 48-hr SLA'
    }
  ];

  return (
    <section className="comparison-section" id="comparison">
      <div className="comparison-container">
        {/* Header */}
        <div className="section-center-header">
          <div className="section-pill-badge purple">
            <Zap size={14} className="badge-sparkle" />
            <span>THE HONEST COMPARISON</span>
          </div>
          <h2 className="section-main-title">
            Why Indian Sales Teams Are Ditching <br className="hidden-mobile" />
            <span className="gradient-text">Spreadsheets &amp; Overpriced CRMs</span>
          </h2>
          <p className="section-main-subtitle">
            See how SalesAvatar gives you enterprise-grade sales velocity without enterprise complexity or budget bloat.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="th-feature">Sales Capability</th>
                <th className="th-avatar highlighted-column">
                  <div className="th-avatar-inner">
                    <span className="th-badge">RECOMMENDED FOR SPEED</span>
                    <strong className="th-title">SalesAvatar CRM</strong>
                    <span className="th-sub">Purpose-built for Indian teams</span>
                  </div>
                </th>
                <th className="th-excel">
                  <div className="th-other-inner">
                    <FileSpreadsheet size={18} color="#64748b" />
                    <strong className="th-title">Excel &amp; WhatsApp</strong>
                    <span className="th-sub">Spreadsheet chaos</span>
                  </div>
                </th>
                <th className="th-legacy">
                  <div className="th-other-inner">
                    <Layers size={18} color="#64748b" />
                    <strong className="th-title">Legacy Foreign CRMs</strong>
                    <span className="th-sub">Salesforce, Zoho, HubSpot</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td className="td-feature">
                    <strong>{row.feature}</strong>
                  </td>
                  <td className="td-avatar highlighted-column">
                    <div className="td-content-avatar">
                      <div className="check-bubble-green">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span>{row.avatar}</span>
                    </div>
                  </td>
                  <td className="td-excel">
                    <div className="td-content-other">
                      <div className="cross-bubble-red">
                        <X size={14} strokeWidth={3} />
                      </div>
                      <span>{row.excel}</span>
                    </div>
                  </td>
                  <td className="td-legacy">
                    <div className="td-content-other">
                      <div className="warning-bubble-amber">
                        <Minus size={14} strokeWidth={3} />
                      </div>
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Callout inside table wrapper */}
          <div className="comparison-bottom-cta">
            <div className="cta-summary-text">
              <strong>Ready to upgrade your sales operations?</strong>
              <span>Switching from Excel takes under 15 minutes with our automated CSV/Excel importer.</span>
            </div>
            <button 
              type="button" 
              className="btn-compare-cta"
              onClick={onOpenDemo}
            >
              Book a Guided Walkthrough <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
