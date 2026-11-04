import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageSeo from '../utils/usePageSeo';
import { 
  Sparkles, 
  Check, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  HelpCircle, 
  ChevronDown
} from 'lucide-react';
import PricingSection from '../components/PricingSection';
import MobileAutoMarquee from '../components/MobileAutoMarquee';

export default function PricingPage({ onOpenTrial, onOpenDemo, onOpenEnterprise }) {
  usePageSeo({
    title: 'Predictable CRM Pricing & Plans — Starting at ₹999/mo | SalesAvatar',
    description: 'Transparent CRM subscription plans for Indian sales teams. Starting at ₹999/mo with 18% GST tax invoices, guided onboarding, zero setup fees, and cancel anytime.',
    keywords: 'CRM pricing India, affordable CRM software, CRM price per user, sales CRM plans India, CRM with GST invoice, small business CRM subscription',
    canonicalPath: '/pricing'
  });

  const [openFaq, setOpenFaq] = useState(null);

  const pricingFaqs = [
    {
      q: 'Can we switch between Monthly and Yearly billing anytime?',
      a: 'Yes, you can easily upgrade from monthly to yearly billing or change plans from your workspace settings at any time with pro-rated billing.'
    },
    {
      q: 'Do you provide valid GST invoices for input tax credit?',
      a: 'Yes, absolutely. All Indian business accounts receive computerized GST invoices with your company GSTIN, eligible for 18% input tax credit (ITC).'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major corporate credit cards, debit cards, UPI (Google Pay, PhonePe, Paytm), Net Banking via Razorpay, and direct NEFT/RTGS for annual enterprise plans.'
    },
    {
      q: 'How do we choose the right plan before we commit?',
      a: 'Our team helps you select the right plan, configure your workspace, and start onboarding quickly. We can arrange a guided walkthrough before you commit.'
    },
    {
      q: 'What happens to our customer data if we decide to cancel?',
      a: 'Your data is strictly yours. You can export all leads, pipeline history, attendance records, and ticket logs to CSV/Excel at any time with one click.'
    }
  ];

  return (
    <div className="subpage-view pricing-page">
      {/* Subpage Header Banner */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-split-container">
          {/* Left Column: Headline, Trust Checks & CTAs */}
          <div className="subpage-hero-left">
            <div className="section-pill-badge blue">
              <Sparkles size={13} />
              <span>TRANSPARENT, SCALABLE TIERS</span>
            </div>
            <h1 className="subpage-hero-title">
              Simple, Predictable Pricing <br />
              <span className="gradient-text">Built to Scale With Your Team</span>
            </h1>
            <p className="subpage-hero-subtitle">
              Clear monthly or annual plans, transparent GST invoices, and dedicated onboarding assistance for your sales team.
            </p>

            <MobileAutoMarquee className="subpage-hero-checks">
              <div className="subpage-check-item">
                <ShieldCheck size={14} color="#0f766e" />
                <span>Guided onboarding for every plan</span>
              </div>
              <div className="subpage-check-item">
                <Check size={14} color="#0f766e" />
                <span>18% GST Invoices with ITC</span>
              </div>
              <div className="subpage-check-item">
                <Building2 size={14} color="#1d4ed8" />
                <span>100% Indian Cloud Data Residency</span>
              </div>
            </MobileAutoMarquee>

            <div className="subpage-hero-cta-row">
              <button 
                type="button" 
                className="btn-subpage-primary"
                onClick={() => {
                  const el = document.getElementById('pricing-plans-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onOpenTrial('Professional');
                }}
              >
                View Plans & Features <ArrowRight size={16} />
              </button>
              <Link
                to="/crm-tour"
                className="btn-subpage-ghost"
              >
                Full Product Tour
              </Link>
            </div>
          </div>

          {/* Right Column: Plan Selection Guide */}
          <div className="subpage-hero-right">
            <div className="hero-preview-glass-card pricing-guide-card">
              <div className="preview-card-header">
                <div className="preview-header-left">
                  <span className="live-pulse-dot" />
                  <span className="preview-header-title">Find Your Best Fit</span>
                </div>
                <span className="preview-header-badge">Simple Plans</span>
              </div>

              <div className="pricing-guide-intro">
                <span className="pricing-guide-kicker">Built around your team</span>
                <h3>Start small. Scale without switching platforms.</h3>
                <p>Every tier includes the tools your sales team needs to move faster.</p>
              </div>

              <div className="pricing-guide-list">
                <div className="pricing-guide-row">
                  <span className="pricing-guide-icon"><Check size={14} /></span>
                  <div><b>Growing teams</b><span>Starter to Professional plans</span></div>
                </div>
                <div className="pricing-guide-row">
                  <span className="pricing-guide-icon"><Check size={14} /></span>
                  <div><b>Multi-branch sales</b><span>Business workflows and controls</span></div>
                </div>
                <div className="pricing-guide-row">
                  <span className="pricing-guide-icon"><Check size={14} /></span>
                  <div><b>Enterprise operations</b><span>Custom scale, SLA, and onboarding</span></div>
                </div>
              </div>

              <div className="pricing-guide-footer">
                <span><ShieldCheck size={15} /> Secure onboarding and support</span>
                <button type="button" onClick={() => onOpenTrial('Professional')}>
                  Explore plans <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Plans Grid with Monthly/Yearly toggle */}
      <div id="pricing-plans-section">
        <PricingSection 
          onSelectPlan={(plan, cycle) => onOpenTrial(plan, cycle)}
          onOpenEnterprise={onOpenEnterprise}
        />
      </div>

      {/* Plan Feature Comparison Table */}
      <section className="pricing-matrix-section">
        <div className="pricing-matrix-container">
          <div className="section-center-header">
            <div className="section-pill-badge purple">
              <ShieldCheck size={13} />
              <span>DETAILED BREAKDOWN</span>
            </div>
            <h2 className="section-main-title">Compare All Tier Capabilities</h2>
            <p className="section-main-subtitle">
              Every tool and limit clearly documented across our 5 plans.
            </p>
          </div>

          <div className="table-scroll-hint" aria-hidden="true">
            <span>⇄ Swipe horizontally to compare all 5 tiers</span>
          </div>

          <div className="table-responsive-box">
            <table className="comparison-table pricing-spec-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>Plan Feature</th>
                  <th>Starter (₹999/mo)</th>
                  <th>Growth (₹1,699/mo)</th>
                  <th className="highlight-col">Professional (₹2,499/mo)</th>
                  <th>Business (₹4,999/mo)</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-group-header">
                  <td colSpan="6">Core Capacity & Users</td>
                </tr>
                <tr>
                  <td>Team Member Seats</td>
                  <td>Up to 5 users</td>
                  <td>Up to 10 users</td>
                  <td className="highlight-col">Up to 20 users</td>
                  <td>Up to 50 users</td>
                  <td>Configurable (100+)</td>
                </tr>
                <tr>
                  <td>Lead & Customer Management</td>
                  <td><Check size={16} color="#10b981" /></td>
                  <td><Check size={16} color="#10b981" /></td>
                  <td className="highlight-col"><Check size={16} color="#10b981" /></td>
                  <td><Check size={16} color="#10b981" /></td>
                  <td><Check size={16} color="#10b981" /></td>
                </tr>
                <tr>
                  <td>Follow-up Reminders</td>
                  <td>Basic Reminders</td>
                  <td>Automated Alerts</td>
                  <td className="highlight-col">Advanced Reminders</td>
                  <td>Priority WhatsApp/SMS</td>
                  <td>Custom Multi-Channel</td>
                </tr>

                <tr className="table-group-header">
                  <td colSpan="6">Pipelines & Workflows</td>
                </tr>
                <tr>
                  <td>Sales Pipeline Stages</td>
                  <td>Standard Pipeline</td>
                  <td>Visual Kanban Stages</td>
                  <td className="highlight-col">Multi-Stage Pipelines</td>
                  <td>Multi-Branch Pipelines</td>
                  <td>Custom Workflows</td>
                </tr>
                <tr>
                  <td>Reports & Analytics</td>
                  <td>Basic Dashboard</td>
                  <td>Pipeline Reports</td>
                  <td className="highlight-col">Advanced Reports & Metrics</td>
                  <td>Executive Analytics</td>
                  <td>Custom BI & Data Lake</td>
                </tr>
                <tr>
                  <td>Sales Targets & Performance</td>
                  <td><Minus size={16} color="#94a3b8" /></td>
                  <td>Basic Targets</td>
                  <td className="highlight-col">Sales Targets & Milestones</td>
                  <td>Team Leaderboards</td>
                  <td>Custom KPI Tracking</td>
                </tr>
                <tr>
                  <td>Field Officer & Geo-Attendance</td>
                  <td><Minus size={16} color="#94a3b8" /></td>
                  <td><Minus size={16} color="#94a3b8" /></td>
                  <td className="highlight-col">Optional Add-on</td>
                  <td><Check size={16} color="#10b981" /> GPS Verification</td>
                  <td><Check size={16} color="#10b981" /> Geofenced Routes</td>
                </tr>
                <tr>
                  <td>Dealer & Distributor Management</td>
                  <td><Minus size={16} color="#94a3b8" /></td>
                  <td><Minus size={16} color="#94a3b8" /></td>
                  <td className="highlight-col"><Minus size={16} color="#94a3b8" /></td>
                  <td><Check size={16} color="#10b981" /> Included</td>
                  <td><Check size={16} color="#10b981" /> Custom Network</td>
                </tr>

                <tr className="table-group-header">
                  <td colSpan="6">Security, Multi-Tenancy & Roles</td>
                </tr>
                <tr>
                  <td>Role-Based Permissions</td>
                  <td>Company Admin</td>
                  <td>3 Standard Roles</td>
                  <td className="highlight-col">Granular Role Permissions</td>
                  <td>Custom Role Hierarchy</td>
                  <td>Tenant & Field-Level RBAC</td>
                </tr>
                <tr>
                  <td>Multi-Tenant Data Isolation</td>
                  <td>Tenant-Scoped DB</td>
                  <td>Tenant-Scoped DB</td>
                  <td className="highlight-col">Tenant-Scoped DB</td>
                  <td>Tenant-Scoped DB</td>
                  <td>Dedicated Tenant DB / VPC</td>
                </tr>
                <tr>
                  <td>Support SLA Response</td>
                  <td>Email (24 hrs)</td>
                  <td>Chat & Email (8 hrs)</td>
                  <td className="highlight-col">Priority Support (2 hrs)</td>
                  <td>Dedicated Desk (1 hr)</td>
                  <td>Dedicated Onboarding & 15m SLA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* Pricing FAQs */}
      <section className="pricing-faq-section">
        <div className="pricing-faq-container">
          <div className="section-center-header">
            <div className="section-pill-badge blue">
              <HelpCircle size={13} />
              <span>QUESTIONS ANSWERED</span>
            </div>
            <h2 className="section-main-title">Pricing Frequently Asked Questions</h2>
          </div>

          <div className="faq-accordion-list">
            {pricingFaqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question-row">
                    <span className="faq-q-text">{item.q}</span>
                    <ChevronDown size={18} className={`faq-arrow-icon ${isOpen ? 'rotate' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="faq-answer-block">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
