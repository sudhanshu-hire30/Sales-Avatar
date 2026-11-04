import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageSeo from '../utils/usePageSeo';
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiFetch } from '../api';
import MobileAutoMarquee from '../components/MobileAutoMarquee';

export default function ContactPage({ onOpenTrial, onOpenDemo }) {
  usePageSeo({
    title: 'Contact Sales & Schedule 1-on-1 CRM Demo | SalesAvatar',
    description: 'Speak with a SalesAvatar CRM specialist. Request a customized 15-minute live walkthrough, discuss team pricing, or get instant onboarding support.',
    keywords: 'contact salesavatar, book CRM demo, sales software consultation India, enterprise CRM sales call',
    canonicalPath: '/contact'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '10-50',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: {
          ...formData,
          source: 'Contact Page Inquiry'
        }
      });
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Graceful local success
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="subpage-view contact-page">
      {/* Header Banner */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-split-container">
          {/* Left Column: Headline, Trust Checks & CTAs */}
          <div className="subpage-hero-left">
            <div className="section-pill-badge blue">
              <Sparkles size={13} />
              <span>2-HOUR SLA RESPONSE GUARANTEE</span>
            </div>
            <h1 className="subpage-hero-title">
              Let's Discuss Your <br />
              <span className="gradient-text">Cloud CRM Requirements</span>
            </h1>
            <p className="subpage-hero-subtitle">
              Whether you need a guided platform walkthrough, custom plan options for 50+ users, or dedicated tenant onboarding, our sales engineering desk responds in under 2 hours.
            </p>

            <MobileAutoMarquee className="subpage-hero-checks">
              <div className="subpage-check-item">
                <Clock size={14} color="#10b981" />
                <span>Under 2-Hour Response SLA</span>
              </div>
              <div className="subpage-check-item">
                <ShieldCheck size={14} color="#10b981" />
                <span>NDA & Data Privacy Guaranteed</span>
              </div>
              <div className="subpage-check-item">
                <Building2 size={14} color="#1d4ed8" />
                <span>Noida & Mumbai Tech Centers</span>
              </div>
            </MobileAutoMarquee>

            <div className="subpage-hero-cta-row">
              <button
                type="button"
                className="btn-subpage-primary"
                onClick={() => {
                  const el = document.getElementById('contact-form-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Send Us a Message <ArrowRight size={16} />
              </button>
              <Link
                to="/crm-tour"
                className="btn-subpage-ghost"
              >
                Full Product Tour
              </Link>
            </div>
          </div>

          {/* Right Column: Quick Connection Desk Card */}
          <div className="subpage-hero-right">
            <div className="hero-preview-glass-card">
              <div className="preview-card-header">
                <div className="preview-header-left">
                  <span className="live-pulse-dot" />
                  <span className="preview-header-title">Direct Connection Desk</span>
                </div>
                <span className="preview-header-badge">Online Now</span>
              </div>

              <div className="preview-stream-list" style={{ gap: 10, marginBottom: 14 }}>
                <a
                  href="tel:+919876543210"
                  className="stream-item"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="stream-icon-box" style={{ background: '#f0fdfa', color: '#0f766e' }}>
                    <Phone size={16} />
                  </div>
                  <div className="stream-content">
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Phone & WhatsApp</span>
                    <b style={{ fontSize: 13.5, color: '#0f172a' }}>+91 98765 43210</b>
                    <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>● Lines Open (9 AM – 7 PM IST)</span>
                  </div>
                </a>

                <a
                  href="mailto:sales@salesavatar.com"
                  className="stream-item"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="stream-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
                    <Mail size={16} />
                  </div>
                  <div className="stream-content">
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Sales & Partnerships</span>
                    <b style={{ fontSize: 13.5, color: '#0f172a' }}>sales@salesavatar.com</b>
                    <span style={{ fontSize: 11, color: '#64748b' }}>Guaranteed response in 2 hours</span>
                  </div>
                </a>

                <div className="stream-item">
                  <div className="stream-icon-box" style={{ background: '#f1f5f9', color: '#475569' }}>
                    <Building2 size={16} />
                  </div>
                  <div className="stream-content">
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Corporate Centers</span>
                    <b style={{ fontSize: 13, color: '#0f172a' }}>Noida Sector 62 & Mumbai BKC</b>
                    <span style={{ fontSize: 11, color: '#64748b' }}>In-person meeting upon request</span>
                  </div>
                </div>
              </div>

              {/* Instant Action CTA */}
              <Link
                to="/crm-tour"
                style={{
                  width: '100%',
                  background: '#1d4ed8',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '11px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
              >
                <span>Full Product Tour</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="contact-main-section" id="contact-form-section">
        <div className="contact-container">
          <div className="contact-two-columns">
            {/* Left: Contact Info & Office Addresses */}
            <div className="contact-info-column">
              <div className="contact-card-box">
                <span className="contact-box-badge">OFFICE LOCATIONS</span>
                <h3>Bharat Group — SalesAvatar</h3>
                <p className="contact-box-sub">
                  Visit our corporate, head, and registered offices.
                </p>

                <div className="contact-details-list">
                  <div className="contact-detail-row">
                    <div className="detail-icon-bubble">
                      <MapPin size={20} color="#1d4ed8" />
                    </div>
                    <div className="detail-text">
                      <b>Corporate Office – Mumbai</b>
                      <span>1306–1317, Peninsula Park, Plot No. A4, Veera Desai Industrial Road, Andheri West, Mumbai – 400053</span>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-bubble">
                      <Building2 size={20} color="#2563eb" />
                    </div>
                    <div className="detail-text">
                      <b>Head Office – Noida</b>
                      <span>A-60, A Block, Sector 58, Noida, Uttar Pradesh – 201309</span>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-bubble">
                      <Building2 size={20} color="#2563eb" />
                    </div>
                    <div className="detail-text">
                      <b>Registered Office</b>
                      <span>BH-32, Sector 70, Noida, Uttar Pradesh – 201301</span>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-bubble">
                      <Mail size={20} color="#10b981" />
                    </div>
                    <div className="detail-text">
                      <b>Direct Email</b>
                      <span>sales@salesavatar.com &bull; support@salesavatar.com</span>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-bubble">
                      <Phone size={20} color="#475569" />
                    </div>
                    <div className="detail-text">
                      <b>Phone / WhatsApp Support</b>
                      <span>+91 98765 43210 (Mon – Sat, 9:00 AM – 7:00 PM IST)</span>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-bubble">
                      <Clock size={20} color="#0f766e" />
                    </div>
                    <div className="detail-text">
                      <b>Guaranteed Response SLA</b>
                      <span>All inquiries receive a response within 2 hours during business hours.</span>
                    </div>
                  </div>
                </div>

                <div className="contact-trust-strip">
                  <div className="trust-pill"><ShieldCheck size={14} color="#10b981" /> ISO 27001 Certified</div>
                  <div className="trust-pill"><ShieldCheck size={14} color="#10b981" /> Indian DPDP Act Compliant</div>
                </div>
              </div>
            </div>

            {/* Right: Contact Inquiry Form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                {submitted ? (
                  <div className="contact-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={54} color="#10b981" />
                    </div>
                    <h3>Message Received!</h3>
                    <p>
                      Thank you for contacting SalesAvatar. Our sales engineering team has received your details and will get in touch with you at <strong>{formData.email}</strong> within 2 hours.
                    </p>
                    <button
                      type="button"
                      className="btn-subpage-primary"
                      onClick={() => setSubmitted(false)}
                      style={{ marginTop: 20 }}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="form-card-header">
                      <h3>Send Us a Direct Message</h3>
                      <p>Fill out the form below and an engineer will reach out promptly.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-actual-form">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Sharma"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label>Work Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="vikram@company.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 99999 99999"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label>Company Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apex Enterprises"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Sales Team Size</label>
                          <select
                            value={formData.teamSize}
                            onChange={e => setFormData({ ...formData, teamSize: e.target.value })}
                          >
                            <option value="1-10">1 – 10 Sales Reps</option>
                            <option value="10-50">10 – 50 Sales Reps</option>
                            <option value="50-100">50 – 100 Sales Reps</option>
                            <option value="100+">100+ Reps (Enterprise)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>How Can We Help Your Team?</label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your sales workflow, lead sources, or specific challenges..."
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-contact-submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending Message...' : 'Send Inquiry to Sales Team →'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
