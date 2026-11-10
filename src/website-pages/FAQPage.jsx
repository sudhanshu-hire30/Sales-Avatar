import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePageSeo from '../utils/usePageSeo';
import MobileAutoMarquee from '../components/MobileAutoMarquee';
import {
  Sparkles,
  HelpCircle,
  ChevronDown,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function FAQPage({ onOpenTrial, onOpenDemo }) {
  const [category, setCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  const allFaqs = [
    {
      category: 'start',
      q: 'How does renting a cloud CRM on a subscription work?',
      a: 'Our platform allows businesses to rent a dedicated cloud CRM workspace on flexible monthly or annual subscriptions. Rather than purchasing heavy licenses, your company signs up, selects a tier based on user seats and modules, and gains instant access to an isolated company workspace.'
    },
    {
      category: 'start',
      q: 'What is the company onboarding and setup workflow?',
      a: 'Company onboarding is fast and automated. During registration, provide your company name, contact person, business email, mobile number, industry, and selected plan. We verify the business email, create your dedicated tenant, configure the initial company administrator, and provide an onboarding checklist.'
    },
    {
      category: 'start',
      q: 'Which CRM modules are confirmed and available in the workspace?',
      a: 'Available modules include Lead Management, Customer Records (360° account view), Follow-up Tasks & Reminders, Visual Sales Pipeline (Kanban stages), Field Officer Geo-Attendance, Dealer & Distributor Management, Sales Targets & Leaderboards, and Executive Reports & Analytics.'
    },
    {
      category: 'billing',
      q: 'What are the subscription plans and pricing?',
      a: 'We offer configurable plans: Starter at ₹999/month (up to 5 users with lead/customer management, follow-up reminders, basic dashboard); Growth at ₹1,699/month (up to 10 users); Professional at ₹2,499/month (up to 20 users with advanced reports, sales targets, and role permissions); Business at ₹4,999/month; and Enterprise with custom pricing, configurable limits, and tailored workflows.'
    },
    {
      category: 'billing',
      q: 'Can we switch between Monthly and Yearly billing, or upgrade plans?',
      a: 'Yes, absolutely. Company administrators can upgrade or downgrade plans, switch between monthly and annual billing (with a 20% annual discount), or request seat limit adjustments directly from the customer portal with pro-rated billing adjustments.'
    },
    {
      category: 'billing',
      q: 'What is your Cancellation and Refund Policy?',
      a: 'Subscribers can submit a cancellation request anytime through their customer portal. Cancelled subscriptions remain active until the end of the current paid billing cycle. Grace periods are provided for failed payment renewals before workspace access is suspended.'
    },
    {
      category: 'billing',
      q: 'Do you provide computerized GST tax invoices?',
      a: 'Yes! Every successful subscription payment generates an official computerized GST tax invoice containing your company name, billing address, and GSTIN, making you eligible for 18% Input Tax Credit (ITC).'
    },
    {
      category: 'security',
      q: 'How does multi-tenant data isolation work between different companies?',
      a: 'Every company is assigned a unique tenant ID upon registration. Every database query, record insertion, and API request is strictly tenant-scoped and authorized on the backend. Company A can never view, query, or access Company B’s users, leads, customers, tasks, or invoices.'
    },
    {
      category: 'security',
      q: 'What user roles and permissions are supported?',
      a: 'The platform supports a comprehensive role hierarchy: Platform Super Admin (manages the SaaS platform, plans, and tenants), Company Owner, Company Admin (manages company users and settings), Manager (oversees team pipelines and territories), and Sales Representative (accesses assigned leads and tasks).'
    },
    {
      category: 'integrations',
      q: 'How does field officer GPS attendance and site visit tracking work?',
      a: 'Field officers can clock in with geo-stamped mobile check-ins, record client visit locations with photos and outcome notes, and calculate daily conveyance travel distance without needing to install heavy third-party software.'
    },
    {
      category: 'integrations',
      q: 'How are payments verified before activating paid subscriptions?',
      a: 'We integrate with verified payment gateways (such as Razorpay or Stripe). Paid subscriptions are never activated by client-side responses; the backend verifies cryptographically signed webhook events idempotently before updating tenant subscription status.'
    }
  ];

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }), []);

  usePageSeo({
    title: 'Frequently Asked Questions & Help Center | SalesAvatar CRM',
    description: 'Find answers about SalesAvatar cloud CRM onboarding, 18% GST invoicing, Indian DPDP data security, field GPS tracking, and subscription plan management.',
    keywords: 'CRM FAQ, sales CRM questions, GST invoice CRM, field GPS attendance questions, cloud CRM security India',
    canonicalPath: '/faq',
    jsonLd: faqSchema
  });

  const filtered = allFaqs.filter(item => {
    const matchesCat = category === 'all' || item.category === category;
    return matchesCat;
  });

  return (
    <div className="subpage-view faq-page">
      {/* Header Banner */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-split-container">
          {/* Left Column: Search Bar & Topic Navigation */}
          <div className="subpage-hero-left">
            <div className="section-pill-badge blue">
              <Sparkles size={13} />
              <span>24/7 KNOWLEDGE BASE & HELP CENTER</span>
            </div>
            <h1 className="subpage-hero-title">
              How Can We Help You <br />
              <span className="gradient-text">Scale Your Sales Today?</span>
            </h1>
            <p className="subpage-hero-subtitle">
              Instant answers covering platform onboarding, Indian cloud data residency, GST invoicing, automated lead routing, and mobile GPS field attendance.
            </p>

            <MobileAutoMarquee className="subpage-hero-checks">
              <div className="subpage-check-item">
                <ShieldCheck size={14} color="#10b981" />
                <span>15-Min Rapid Onboarding</span>
              </div>
              <div className="subpage-check-item">
                <CheckCircle2 size={14} color="#10b981" />
                <span>Free Data Migration Service</span>
              </div>
              <div className="subpage-check-item">
                <Phone size={14} color="#2563eb" />
                <span>Direct WhatsApp & Phone Support</span>
              </div>
            </MobileAutoMarquee>

            <div className="subpage-hero-cta-row">
              <button
                type="button"
                className="site-cta-primary"
                onClick={onOpenDemo}
              >
                Book a Demo <ArrowRight size={16} />
              </button>
              <Link
                to="/crm-tour"
                className="site-cta-secondary"
              >
                Full Product Tour
              </Link>
            </div>
          </div>

          {/* Right Column: Help Center Topic Cards & Direct Desk */}
          <div className="subpage-hero-right">
            <div className="hero-preview-glass-card">
              <div className="preview-card-header">
                <div className="preview-header-left">
                  <span className="live-pulse-dot" />
                  <span className="preview-header-title">Help Center Navigator</span>
                </div>
                <span className="preview-header-badge">Instant Guides</span>
              </div>

              <div className="preview-stream-list" style={{ gap: 8, marginBottom: 14 }}>
                <div
                  className="stream-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCategory('start')}
                >
                  <div className="stream-icon-box" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                    <Sparkles size={16} />
                  </div>
                  <div className="stream-content">
                    <b style={{ fontSize: 13, color: '#0f172a' }}>Getting Started & Lead Ingestion</b>
                    <span style={{ fontSize: 11.5, color: '#64748b' }}>1-click Excel/CSV import, auto-routing rules & rep logins</span>
                  </div>
                </div>

                <div
                  className="stream-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCategory('security')}
                >
                  <div className="stream-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
                    <ShieldCheck size={16} />
                  </div>
                  <div className="stream-content">
                    <b style={{ fontSize: 13, color: '#0f172a' }}>Indian DPDP Act & Data Security</b>
                    <span style={{ fontSize: 11.5, color: '#64748b' }}>100% Mumbai AWS Cloud residency, zero offshore transfer</span>
                  </div>
                </div>

                <div
                  className="stream-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCategory('billing')}
                >
                  <div className="stream-icon-box" style={{ background: '#f1f5f9', color: '#475569' }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="stream-content">
                    <b style={{ fontSize: 13, color: '#0f172a' }}>GST Invoicing & Payment Modes</b>
                    <span style={{ fontSize: 11.5, color: '#64748b' }}>Official computerized 18% ITC tax invoices via Razorpay/NEFT</span>
                  </div>
                </div>
              </div>

              {/* Direct Support Contact Callout */}
              <div style={{
                background: '#1d4ed8',
                borderRadius: 14,
                padding: '12px 14px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}>
                <div>
                  <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>
                    Still Have Questions?
                  </span>
                  <b style={{ fontSize: 13, color: '#ffffff' }}>Direct Line: +91 98765 43210</b>
                </div>
                <Link
                  to="/crm-tour"
                  className="site-cta-secondary"
                >
                  Full Product Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="faq-content-section">
        <div className="faq-page-container">
          {/* Category Tabs */}
          <div className="features-filter-nav">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'start', label: 'Getting Started' },
              { id: 'billing', label: 'Billing & Plans' },
              { id: 'security', label: 'Security & DPDP' },
              { id: 'integrations', label: 'Integrations & API' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`feat-filter-btn ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Q&A Accordion List */}
          <div className="faq-page-accordion-list">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question-row faq-question-button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <ChevronDown size={18} className={`faq-arrow-icon ${isOpen ? 'rotate' : ''}`} />
                    </button>
                    {isOpen && (
                      <div id={`faq-answer-${idx}`} className="faq-answer-block">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="faq-no-results">
                <HelpCircle size={40} color="#94a3b8" />
                <h3>No matching questions found</h3>
                <p>Try searching with another keyword or reach out directly to our engineering team.</p>
              </div>
            )}
          </div>

          {/* Need More Help Box */}
          <div className="faq-help-box-card">
            <div className="help-box-content">
              <h3>Still have questions or need a custom integration?</h3>
              <p>Our sales engineering team in Noida & Mumbai is available Mon - Sat (9 AM to 7 PM IST) to help you configure your pipelines.</p>
              <div className="help-box-actions">
                <a href="mailto:support@salesavatar.com" className="btn-help-contact">
                  <Mail size={16} />
                  <span>support@salesavatar.com</span>
                </a>
                <a href="tel:+919876543210" className="btn-help-contact">
                  <Phone size={16} />
                  <span>+91 98765 43210</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
