import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onOpenLogin, onOpenDemo, onOpenTrial, onOpenEnterprise }) {
  return (
    <footer className="footer-wrapper" aria-label="Website Footer">
      {/* Decorative Top Glow Bar */}
      <div className="footer-top-accent" />

      <div className="footer-container">
        {/* Main Navigation Columns */}
        <div className="footer-columns">
          {/* Brand Info & Trust Badges */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand" style={{ textDecoration: 'none' }} title="SalesAvatar Home">
              <div className="brand-logo-icon">
                <TrendingUp size={20} color="#ffffff" strokeWidth={2.8} />
              </div>
              <div className="brand-text">
                <div className="brand-title">
                  <span className="brand-bold">Sales</span>
                  <span className="brand-purple">Avatar</span>
                </div>
                <span className="brand-tagline">Sell &bull; Manage &bull; Grow</span>
              </div>
            </Link>

            <p className="footer-desc">
              Multi-tenant cloud CRM rental platform. Rent authentic lead management, deal approvals, 20-stage project site tracking, field GPS attendance, and sales quotas on flexible monthly or annual plans.
            </p>

            <div className="footer-contact-items">
              <a href="mailto:support@salesavatar.com" className="contact-line" title="Send email to support">
                <Mail size={15} className="contact-icon" />
                <span>support@salesavatar.com</span>
              </a>
              <a href="tel:+919876543210" className="contact-line" title="Call customer helpline">
                <Phone size={15} className="contact-icon" />
                <span>+91 98765 43210 (Mon-Sat, 9am-7pm)</span>
              </a>
              <Link to="/contact" className="contact-line" title="View office locations & directions">
                <MapPin size={15} className="contact-icon" />
                <span>A60 Sector 58, Noida, Uttar Pradesh, India</span>
              </Link>
            </div>

            {/* Trust & Compliance Badges */}
            <div className="footer-compliance-row">
              <Link to="/security" className="compliance-chip clickable" title="Read our Indian DPDP Act & GDPR compliance policy">
                <ShieldCheck size={13} className="chip-icon" />
                <span>DPDP & GDPR Compliant</span>
              </Link>
              <Link to="/security" className="compliance-chip clickable" title="Read our AES-256 bank-grade encryption architecture">
                <Lock size={13} className="chip-icon" />
                <span>AES-256 Encrypted</span>
              </Link>
            </div>
          </div>

          {/* Product Links - Targeted to specific feature modules */}
          <div className="footer-col">
            <h4 className="footer-heading">CRM Modules</h4>
            <ul className="footer-links">
              <li>
                <Link to="/features#leads" title="Capture and organize 1,248+ inbound sales leads">
                  Lead Management
                  <span className="link-badge core">CORE</span>
                </Link>
              </li>
              <li>
                <Link to="/features#customers" title="Customer 360 profiles & communication history timeline">
                  Customer 360° Records
                </Link>
              </li>
              <li>
                <Link to="/features#followup" title="Automated calling queue with due and overdue alerts">
                  Follow-up Tasks & Reminders
                  <span className="link-badge hot">HOT</span>
                </Link>
              </li>
              <li>
                <Link to="/features#pipeline" title="Visual sales pipeline stages & lead interest distribution">
                  Visual Sales Pipeline
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=deal-approvals" title="Contract value & discount percentage authorization center">
                  Deal & Won Approvals
                  <span className="link-badge pop">POPULAR</span>
                </Link>
              </li>
              <li>
                <Link to="/features#targets" title="Executive ₹4.80 Cr milestone targets & rep quotas">
                  Sales Team Quotas & Targets
                </Link>
              </li>
              <li>
                <Link to="/features#analytics" title="Executive BI dashboards, attribution & drop-off analytics">
                  Reports & Revenue Analytics
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=sales-leaderboard" title="Winner of the month podium & sales hall of fame">
                  Monthly Rep Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Links - Real Operations from Platform Screenshots */}
          <div className="footer-col">
            <h4 className="footer-heading">Operations & Suite</h4>
            <ul className="footer-links">
              <li>
                <Link to="/crm-tour?screen=project-sites" title="28 client project sites across 20-stage handover journey">
                  Project Sites & Handover
                  <span className="link-badge auto">20-STAGE</span>
                </Link>
              </li>
              <li>
                <Link to="/features#attendance" title="GPS check-ins, site selfies & distance calculation">
                  Field Officer GPS Tracking
                  <span className="link-badge pop">POPULAR</span>
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=attendance-tracking" title="Live daily punch register, late marks & monthly attendance calendar">
                  Employee Daily Punch Log
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=marketing-integrations" title="Meta Facebook & Instagram Lead Ads instant webhook sync">
                  Meta Lead Ads Automation
                  <span className="link-badge new">SYNC</span>
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=master-settings" title="WhatsApp Business API messaging & webhook automation">
                  WhatsApp Business Suite
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=workspace-chat" title="Internal 1-on-1 and channel messaging with deal card sharing">
                  Workspace Team Chat
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=company-feed" title="Internal social wall for work anniversaries and big wins">
                  Company Social Feed
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=my-storage" title="Sales collateral, brochures, rate cards and pitch deck cloud vault">
                  Sales Collateral Vault
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => (onOpenEnterprise ? onOpenEnterprise('Enterprise') : onOpenTrial && onOpenTrial('Enterprise'))}
                  title="Configure custom enterprise CRM workflows"
                >
                  <span>Custom Enterprise Workflows</span>
                  <span className="link-badge new">REQUEST</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Platform / Company Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li>
                <Link to="/crm-tour" title="Take a visual tour of our complete cloud CRM platform with 15+ live screens">
                  Live CRM Product Tour
                  <span className="link-badge live">15+ SCREENS</span>
                </Link>
              </li>
              <li><Link to="/why-us" title="Why subscription CRM rental beats heavy legacy software">Why Rent a Cloud CRM</Link></li>
              <li><Link to="/pricing" title="Explore monthly and annual subscription tiers">Monthly & Annual Plans</Link></li>
              <li><Link to="/faq" title="Answers to common questions about deployment and billing">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" title="Get in touch with our technical assistance team">Contact Support Desk</Link></li>
              <li>
                <Link to="/crm-tour" title="Explore the complete SalesAvatar product tour">
                  <span>Full Product Tour</span>
                  <ArrowRight size={13} style={{ marginLeft: 6, color: '#86be8f' }} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Speak to Sales & Consultations */}
          <div className="footer-col social-col">
            <h4 className="footer-heading">Speak to Sales</h4>
            <p className="social-tagline">
              Connect directly with an enterprise CRM solution architect to evaluate team workflows.
            </p>

            {/* Quick Action Customer Inbound Buttons */}
            <div className="footer-tenant-actions">
              <button
                type="button"
                className="footer-tenant-login-btn"
                onClick={onOpenDemo}
                title="Schedule a 1-on-1 CRM walkthrough"
              >
                <Sparkles size={14} />
                <span>Book a Live Demo</span>
              </button>

              <button
                type="button"
                className="footer-tenant-trial-btn"
                onClick={() => onOpenTrial && onOpenTrial('Professional')}
                title="Start your 14-day zero-risk trial"
              >
                <ArrowRight size={14} color="#818cf8" />
                <span>Start 14-Day Free Trial</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Copyright Strip */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              &copy; {CURRENT_YEAR} SalesAvatar. All rights reserved.
            </p>
            <span className="footer-craft-tag">
              <span className="flag-icon" role="img" aria-label="India Flag">🇮🇳</span>
              Built with precision for modern multi-tenant cloud CRM operations.
            </span>
          </div>

          <div className="footer-legal-links">
            <Link to="/privacy" title="Privacy policy & personal data processing">Privacy Policy</Link>
            <span className="legal-sep">&bull;</span>
            <Link to="/terms" title="Terms of service & subscription conditions">Terms of Service</Link>
            <span className="legal-sep">&bull;</span>
            <Link to="/cancellation-refund" title="Subscription cancellation & refund policy">Cancellation & Refund</Link>
            <span className="legal-sep">&bull;</span>
            <Link to="/security" title="Data residency & cloud security architecture">Security & Data Isolation</Link>
            <span className="legal-sep">&bull;</span>
            <Link to="/contact" title="Support desk and ticket escalation">Support Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
