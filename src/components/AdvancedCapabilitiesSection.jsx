import React, { useState } from 'react';
import { 
  Radio, 
  PieChart, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Laptop, 
  Flame, 
  Activity, 
  Clock, 
  Lock, 
  TrendingUp, 
  Send, 
  Database,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  UserCheck
} from 'lucide-react';

export default function AdvancedCapabilitiesSection({ onOpenTrial }) {
  const [activeLostFilter, setActiveLostFilter] = useState('all');

  return (
    <section className="advanced-capabilities-showcase" id="advanced-superpowers">
      <div className="adv-showcase-header">
        <div className="section-pill-badge blue">
          <Sparkles size={13} color="#2563eb" />
          <span>ADVANCED PLATFORM CAPABILITIES</span>
        </div>
        <h2 className="adv-showcase-title">
          3 Deep Platform Superpowers <br />
          <span className="gradient-text">Engineered for Indian Scale & Compliance</span>
        </h2>
        <p className="adv-showcase-sub">
          Moving beyond basic contact sheets. SalesAvatar integrates real-time Meta CAPI feedback, forensic loss reason diagnostics, and bank-grade session tracking right into your daily sales rhythm.
        </p>
      </div>

      <div className="adv-cards-stack">
        {/* =======================================================
            SUPERPOWER 1: META ADS & SERVER-SIDE CAPI INTEGRATION
            ======================================================= */}
        <div className="adv-feature-card meta-capi-card" id="meta-ads-capi">
          <div className="adv-card-left">
            <div className="adv-card-meta-badge">
              <span className="platform-tag meta-brand">
                <Radio size={14} className="pulse-icon" /> Meta Ads &amp; CAPI
              </span>
              <span className="sub-badge green">Zero Middleware Needed</span>
            </div>

            <h3 className="adv-card-heading">
              Meta Ads (FB &amp; IG) Instant Ingestion &amp; Server-Side CAPI
            </h3>
            <p className="adv-card-description">
              Hook Facebook &amp; Instagram Lead Ads directly into SalesAvatar in 60 seconds with zero Zapier or third-party fees. Send qualified and won conversion signals back to Meta via Server-to-Server Conversions API (CAPI) to optimize ad algorithms and reduce your cost per acquisition.
            </p>

            <ul className="adv-feature-checklist">
              <li>
                <div className="adv-check-icon"><Check size={14} /></div>
                <div>
                  <strong>&lt; 30-Second Webhook Ingestion:</strong>
                  <span>Leads land in your rep&apos;s queue before the user even exits Instagram.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon"><Check size={14} /></div>
                <div>
                  <strong>Server-Side CAPI Feedback Loop:</strong>
                  <span>Pings &ldquo;Lead Qualified&rdquo; and &ldquo;Deal Won&rdquo; back to Meta Ads Manager to train ad targeting.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon"><Check size={14} /></div>
                <div>
                  <strong>Direct Campaign &amp; Creative Attribution:</strong>
                  <span>Know which ad creative produced actual closed revenue, not just vanity form clicks.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon"><Check size={14} /></div>
                <div>
                  <strong>Instant Automated WhatsApp Trigger:</strong>
                  <span>Send an instant personalized greeting with product brochure the exact second they submit.</span>
                </div>
              </li>
            </ul>

            {onOpenTrial && (
              <button 
                type="button" 
                className="adv-cta-btn blue" 
                onClick={() => onOpenTrial('Business')}
              >
                <span>Connect Meta Ad Account</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          <div className="adv-card-right">
            {/* Visual Interactive Meta CAPI Flow Widget */}
            <div className="meta-flow-widget">
              <div className="widget-header">
                <div className="widget-status-dot active" />
                <span className="widget-title">Live Meta &bull; CAPI Closed-Loop Pipeline</span>
                <span className="widget-tag green">Real-Time Sync</span>
              </div>

              <div className="meta-flow-steps">
                {/* Step 1 */}
                <div className="flow-node">
                  <div className="node-icon meta-bg">
                    <Radio size={16} />
                  </div>
                  <div className="node-body">
                    <div className="node-row">
                      <strong className="node-title">1. Instagram / Facebook Lead Form</strong>
                      <span className="node-badge">Ad Ingestion</span>
                    </div>
                    <span className="node-sub">User submits: Rohit Sharma &bull; ₹25L Luxury Villa Interest</span>
                  </div>
                </div>

                {/* Flow connector line */}
                <div className="flow-connector">
                  <div className="connector-line" />
                  <span className="connector-badge">Direct Webhook (&lt; 22s)</span>
                </div>

                {/* Step 2 */}
                <div className="flow-node highlight">
                  <div className="node-icon sa-bg">
                    <Sparkles size={16} />
                  </div>
                  <div className="node-body">
                    <div className="node-row">
                      <strong className="node-title">2. SalesAvatar Automated Routing</strong>
                      <span className="node-badge orange">Round Robin</span>
                    </div>
                    <span className="node-sub">Assigned to Amit Patel &bull; Instant WhatsApp brochure fired</span>
                  </div>
                </div>

                {/* Flow connector line */}
                <div className="flow-connector">
                  <div className="connector-line" />
                  <span className="connector-badge">Rep Closes Deal (₹18,50,000)</span>
                </div>

                {/* Step 3 */}
                <div className="flow-node success">
                  <div className="node-icon capi-bg">
                    <Send size={16} />
                  </div>
                  <div className="node-body">
                    <div className="node-row">
                      <strong className="node-title">3. Meta CAPI Server-Side Ping</strong>
                      <span className="node-badge purple">Algorithm Fed</span>
                    </div>
                    <span className="node-sub">Event `Purchase_Won` passed to Pixel &bull; Meta optimizes ROAS</span>
                  </div>
                </div>
              </div>

              <div className="meta-kpi-summary">
                <div className="kpi-mini-col">
                  <span className="kpi-label">Avg Ingest Latency</span>
                  <span className="kpi-val green">&lt; 28 sec</span>
                </div>
                <div className="kpi-mini-col">
                  <span className="kpi-label">Middleware Cost</span>
                  <span className="kpi-val blue">₹0 (Zero API bills)</span>
                </div>
                <div className="kpi-mini-col">
                  <span className="kpi-label">ROAS Optimization</span>
                  <span className="kpi-val orange">+38% CPL Drop</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            SUPERPOWER 2: LOST REASONS TAXONOMY & TALK-TIME ANALYTICS
            ======================================================= */}
        <div className="adv-feature-card loss-analytics-card" id="loss-analytics">
          <div className="adv-card-left">
            <div className="adv-card-meta-badge">
              <span className="platform-tag amber-brand">
                <PieChart size={14} /> Loss Diagnostics &amp; Dial Time
              </span>
              <span className="sub-badge amber">Conversion Forensics</span>
            </div>

            <h3 className="adv-card-heading">
              Lost Reasons Taxonomy &amp; Real Rep Talk-Time Analytics
            </h3>
            <p className="adv-card-description">
              Stop guessing why pipeline deals vanish. SalesAvatar enforces structured loss categorisation so leadership knows whether deals drop due to pricing, competitor poaching, or poor calling persistence. Track actual connected phone talk time — not just vanity dial attempts.
            </p>

            <ul className="adv-feature-checklist">
              <li>
                <div className="adv-check-icon amber"><Check size={14} /></div>
                <div>
                  <strong>Mandatory Lost Reason Taxonomy:</strong>
                  <span>Requires reps to select root cause (Price, Location, Competitor, Invalid) before marking Lost.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon amber"><Check size={14} /></div>
                <div>
                  <strong>Connected Rep Talk-Time Ledger:</strong>
                  <span>Accurate measurement of time spent actually pitching prospects on voice calls vs idle time.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon amber"><Check size={14} /></div>
                <div>
                  <strong>Individual &amp; Team Quota Pacing:</strong>
                  <span>Real-time tracking of monthly revenue targets by BDM and BDE with visual burn charts.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon amber"><Check size={14} /></div>
                <div>
                  <strong>Stage Friction Funnel Analysis:</strong>
                  <span>Pinpoints the exact stage where prospects stall: New, Contacted, Proposal, or Negotiation.</span>
                </div>
              </li>
            </ul>

            {onOpenTrial && (
              <button 
                type="button" 
                className="adv-cta-btn amber" 
                onClick={() => onOpenTrial('Business')}
              >
                <span>Explore Analytics Dashboard</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          <div className="adv-card-right">
            {/* Visual Interactive Loss Breakdown & Talk Time Scorecard */}
            <div className="loss-scorecard-widget">
              <div className="widget-header">
                <div className="widget-status-dot amber" />
                <span className="widget-title">Lost Taxonomy &amp; Rep Activity Scorecard</span>
                <span className="widget-tag amber">Executive View</span>
              </div>

              {/* Loss Reason Breakdown Bars */}
              <div className="loss-bars-section">
                <div className="loss-section-title">
                  <span>Pipeline Drop-Off Reasons (Last 30 Days)</span>
                  <span className="text-muted">184 Deals Analyzed</span>
                </div>

                <div className="loss-bar-item">
                  <div className="bar-labels">
                    <span className="reason-name">💰 Price / Budget Barrier</span>
                    <span className="reason-percent">38% (70 deals)</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '38%', background: '#f59e0b' }} />
                  </div>
                </div>

                <div className="loss-bar-item">
                  <div className="bar-labels">
                    <span className="reason-name">📍 Location / Property Mismatch</span>
                    <span className="reason-percent">26% (48 deals)</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '26%', background: '#3b82f6' }} />
                  </div>
                </div>

                <div className="loss-bar-item">
                  <div className="bar-labels">
                    <span className="reason-name">⚔️ Competitor Selected</span>
                    <span className="reason-percent">21% (39 deals)</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '21%', background: '#ec4899' }} />
                  </div>
                </div>

                <div className="loss-bar-item">
                  <div className="bar-labels">
                    <span className="reason-name">📵 Invalid Number / Unreachable</span>
                    <span className="reason-percent">15% (27 deals)</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '15%', background: '#94a3b8' }} />
                  </div>
                </div>
              </div>

              {/* Rep Talk-Time & Pacing Cards */}
              <div className="rep-activity-grid">
                <div className="rep-act-box">
                  <div className="rep-act-header">
                    <PhoneCall size={14} className="icon-blue" />
                    <span>Daily Talk Time</span>
                  </div>
                  <div className="rep-act-val">3h 42m</div>
                  <span className="rep-act-sub green">&uarr; 18% vs team average</span>
                </div>

                <div className="rep-act-box">
                  <div className="rep-act-header">
                    <Activity size={14} className="icon-green" />
                    <span>Dials Connected</span>
                  </div>
                  <div className="rep-act-val">58 calls</div>
                  <span className="rep-act-sub">72% pick-up rate</span>
                </div>

                <div className="rep-act-box">
                  <div className="rep-act-header">
                    <TrendingUp size={14} className="icon-orange" />
                    <span>Closing Velocity</span>
                  </div>
                  <div className="rep-act-val">8.4 days</div>
                  <span className="rep-act-sub green">2.1 days faster</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            SUPERPOWER 3: SESSION SECURITY, DEVICE TRACKING & AUDIT
            ======================================================= */}
        <div className="adv-feature-card security-audit-card" id="security-audit">
          <div className="adv-card-left">
            <div className="adv-card-meta-badge">
              <span className="platform-tag green-brand">
                <ShieldCheck size={14} /> Enterprise Governance
              </span>
              <span className="sub-badge green">100% DPDP Act Compliant</span>
            </div>

            <h3 className="adv-card-heading">
              Session Security, Device Fingerprinting &amp; Immutable Audit Trails
            </h3>
            <p className="adv-card-description">
              Prevent unauthorized client data exports and unmonitored logins. SalesAvatar tracks every active device, IP address, and lead reassignment handoff with tamper-proof audit histories stored securely on Indian soil.
            </p>

            <ul className="adv-feature-checklist">
              <li>
                <div className="adv-check-icon green"><Check size={14} /></div>
                <div>
                  <strong>Device Fingerprint &amp; IP Auditing:</strong>
                  <span>Know exactly which PC or smartphone each sales representative uses to access client phone numbers.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon green"><Check size={14} /></div>
                <div>
                  <strong>Assignee History Ledger:</strong>
                  <span>Complete forensic audit of who owned any lead at the start and end of any time period.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon green"><Check size={14} /></div>
                <div>
                  <strong>Millisecond-Precision Action Timeline:</strong>
                  <span>Every stage advance, contact edit, phone call note, or export attempt is timestamped permanently.</span>
                </div>
              </li>
              <li>
                <div className="adv-check-icon green"><Check size={14} /></div>
                <div>
                  <strong>Accidental Deletion Recycle Bin:</strong>
                  <span>Restore accidentally deleted contacts or lead inquiries with single-click safety recovery.</span>
                </div>
              </li>
            </ul>

            {onOpenTrial && (
              <button 
                type="button" 
                className="adv-cta-btn green" 
                onClick={() => onOpenTrial('Business')}
              >
                <span>Review Enterprise Security</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          <div className="adv-card-right">
            {/* Visual Security & Active Devices Widget */}
            <div className="security-audit-widget">
              <div className="widget-header">
                <div className="widget-status-dot green" />
                <span className="widget-title">Active Devices &amp; Immutable Audit Trail</span>
                <span className="widget-tag green">Bank-Grade TLS 1.3</span>
              </div>

              {/* Active Device Sessions List */}
              <div className="security-devices-list">
                <div className="sec-device-item active">
                  <div className="device-icon-box">
                    <Laptop size={16} />
                  </div>
                  <div className="device-info">
                    <div className="device-name-row">
                      <strong>Windows 11 &bull; Chrome 124</strong>
                      <span className="device-status-badge current">Current Session</span>
                    </div>
                    <span className="device-meta">IP: 103.24.182.12 (Noida Sector 62 Office) &bull; Verified ✓</span>
                  </div>
                </div>

                <div className="sec-device-item">
                  <div className="device-icon-box mobile">
                    <Smartphone size={16} />
                  </div>
                  <div className="device-info">
                    <div className="device-name-row">
                      <strong>Apple iPhone 15 Pro &bull; SalesAvatar Mobile</strong>
                      <span className="device-status-badge active">Field Punch</span>
                    </div>
                    <span className="device-meta">GPS Check-in: DLF CyberCity, Gurugram (Selfie verified)</span>
                  </div>
                </div>
              </div>

              {/* Immutable Audit Log Snippet */}
              <div className="audit-log-box">
                <div className="audit-log-title">
                  <Lock size={12} />
                  <span>Immutable Reassignment Audit Ledger</span>
                </div>

                <div className="audit-events-stream">
                  <div className="audit-event">
                    <span className="audit-time">10:04:12 AM</span>
                    <span className="audit-text">
                      <b>Lead #1408</b> reassigned: <i>Amit Patel</i> &rarr; <b>Priya Nair</b> (Trigger: 24h SLA idle timeout)
                    </span>
                  </div>
                  <div className="audit-event">
                    <span className="audit-time">09:31:05 AM</span>
                    <span className="audit-text">
                      <b>Lead #1399</b> status changed: <i>Contacted</i> &rarr; <b>Negotiation (₹14,50,000)</b>
                    </span>
                  </div>
                  <div className="audit-event">
                    <span className="audit-time">09:00:22 AM</span>
                    <span className="audit-text">
                      <b>User Login Verified</b>: Rahul Verma via Chrome (2FA OTP verified)
                    </span>
                  </div>
                </div>
              </div>

              {/* Compliance Stamp */}
              <div className="compliance-stamp-row">
                <div className="stamp-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>DPDP Act 2023 Compliant</span>
                </div>
                <div className="stamp-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>Indian Data Residency</span>
                </div>
                <div className="stamp-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>256-Bit Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
