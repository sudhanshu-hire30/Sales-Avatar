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
              Modern cloud CRM rental platform built for Indian businesses. Streamline lead tracking, field GPS visits, deal approvals, and automated revenue reporting.
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
                <span>Corporate, head & registered offices in Mumbai and Noida</span>
              </Link>
            </div>

            {/* Trust & Compliance Badges */}
            <div className="footer-compliance-row">
              <Link to="/security" className="compliance-chip clickable" title="Read about data protection and privacy controls">
                <ShieldCheck size={13} className="chip-icon" />
                <span>Privacy & data controls</span>
              </Link>
              <Link to="/security" className="compliance-chip clickable" title="Read about encryption and access controls">
                <Lock size={13} className="chip-icon" />
                <span>Encryption details</span>
              </Link>
            </div>
          </div>

          {/* Product Links - 5 Curated Core Modules */}
          <div className="footer-col">
            <h4 className="footer-heading">CRM Modules</h4>
            <ul className="footer-links">
              <li>
                <Link to="/features#leads" title="Capture and organize 1,248+ inbound sales leads">
                  Lead Management
                </Link>
              </li>
              <li>
                <Link to="/features#pipeline" title="Visual sales pipeline stages & lead interest distribution">
                  Visual Sales Pipeline
                </Link>
              </li>
              <li>
                <Link to="/features#followup" title="Automated calling queue with due and overdue alerts">
                  Follow-up Tasks & Alerts
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=deal-approvals" title="Contract value & discount percentage authorization center">
                  Deal & Won Approvals
                </Link>
              </li>
              <li>
                <Link to="/features#analytics" title="Executive BI dashboards, attribution & drop-off analytics">
                  Reports & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Operations & Integrations - 5 High-Value Workflows */}
          <div className="footer-col">
            <h4 className="footer-heading">Operations & Suite</h4>
            <ul className="footer-links">
              <li>
                <Link to="/features#attendance" title="GPS check-ins, site selfies & distance calculation">
                  Field Officer GPS Tracking
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=master-settings" title="WhatsApp Business API messaging & webhook automation">
                  WhatsApp Business Suite
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=marketing-integrations" title="Meta Facebook & Instagram Lead Ads instant webhook sync">
                  Meta Lead Ads Sync
                </Link>
              </li>
              <li>
                <Link to="/crm-tour?screen=project-sites" title="28 client project sites across 20-stage handover journey">
                  Project Sites & Handover
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => (onOpenEnterprise ? onOpenEnterprise('Enterprise') : onOpenTrial && onOpenTrial('Enterprise'))}
                  title="Configure custom enterprise CRM workflows"
                >
                  <span>Custom Enterprise Setup</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Platform / Company Links - 5 Essential Pages */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li>
                <Link to="/crm-tour" title="Take an interactive tour of our complete cloud CRM platform with 15+ live screens">
                  Interactive CRM Tour
                </Link>
              </li>
              <li>
                <Link to="/why-us" title="Why subscription CRM rental beats heavy legacy software">
                  Why Rent SalesAvatar
                </Link>
              </li>
              <li>
                <Link to="/pricing" title="Explore monthly and annual subscription tiers">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" title="Answers to common questions about deployment and billing">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" title="Get in touch with our technical assistance team">
                  Contact Support Desk
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
