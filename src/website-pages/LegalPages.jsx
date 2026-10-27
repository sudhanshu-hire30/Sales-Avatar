import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="subpage-view legal-page">
      <section className="subpage-hero-banner">
        <div className="subpage-hero-container">
          <div className="section-pill-badge blue">
            <Lock size={13} />
            <span>DATA PRIVACY</span>
          </div>
          <h1 className="subpage-hero-title" style={{ textAlign: 'center' }}>
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="subpage-hero-subtitle" style={{ textAlign: 'center' }}>
            Last updated: October 2026 &bull; Compliant with the Indian Digital Personal Data Protection (DPDP) Act.
          </p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="legal-container">
          <div className="legal-card">
            <h3>1. Introduction & Scope</h3>
            <p>
              SalesAvatar Technologies ("SalesAvatar", "we", "us", or "our") is dedicated to protecting the confidentiality and security of customer data, sales records, lead data, and personal information processed through our sales CRM platform.
            </p>

            <h3>2. Data Collection & Processing</h3>
            <p>
              We process data solely on behalf of our enterprise customers as a Data Processor under applicable data protection laws. This includes user contact information, lead details, deal stages, and optional GPS coordinates recorded during field attendance verification.
            </p>

            <h3>3. Data Residency & Encryption</h3>
            <p>
              All customer databases and media attachments are hosted in secure AWS India data centers located in Mumbai. All data in transit is encrypted using TLS 1.3, and all data at rest is encrypted using industry-standard AES-256 encryption.
            </p>

            <h3>4. Ownership of Customer Data</h3>
            <p>
              Your company retains 100% complete ownership of all leads, contacts, deals, notes, and employee attendance records. We do not sell, rent, monetize, or share your proprietary business data with third parties.
            </p>

            <h3>5. Data Retention & Deletion</h3>
            <p>
              Upon termination of your account or subscription, you have the right to export all data in CSV or JSON format. Data is permanently purged from our primary database clusters within 30 days of confirmed contract termination.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="subpage-view legal-page">
      <section className="subpage-hero-banner">
        <div className="subpage-hero-container">
          <div className="section-pill-badge purple">
            <FileText size={13} />
            <span>LEGAL AGREEMENT</span>
          </div>
          <h1 className="subpage-hero-title" style={{ textAlign: 'center' }}>
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="subpage-hero-subtitle" style={{ textAlign: 'center' }}>
            Standard Enterprise SaaS Service Terms & User Agreement.
          </p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="legal-container">
          <div className="legal-card">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By signing up for or using the SalesAvatar platform, you agree to abide by these Terms of Service. If you are entering into this agreement on behalf of a company, you represent that you have the authority to bind such entity.
            </p>

            <h3>2. Subscription & User Seats</h3>
            <p>
              Access to SalesAvatar is provided on a subscription basis under your chosen plan (Starter, Growth, Professional, Business, or Enterprise). Each user login is assigned to a specific individual and may not be shared concurrently across multiple people.
            </p>

            <h3>3. 99.9% Service Level Agreement (SLA)</h3>
            <p>
              We guarantee a monthly platform uptime of at least 99.9%, excluding scheduled maintenance windows announced at least 48 hours in advance during off-peak hours.
            </p>

            <h3>4. Payment, Taxes & GST</h3>
            <p>
              All subscription fees are billed in Indian Rupees (INR) plus applicable Goods and Services Tax (GST). Computerized tax invoices with input tax credit are issued upon every successful payment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SecurityPage() {
  return (
    <div className="subpage-view legal-page">
      <section className="subpage-hero-banner">
        <div className="subpage-hero-container">
          <div className="section-pill-badge blue">
            <ShieldCheck size={13} />
            <span>ENTERPRISE GRADE SECURITY</span>
          </div>
          <h1 className="subpage-hero-title" style={{ textAlign: 'center' }}>
            Security & <span className="gradient-text">Compliance</span>
          </h1>
          <p className="subpage-hero-subtitle" style={{ textAlign: 'center' }}>
            Built to meet the highest security standards for Indian enterprises, BFSI, and healthcare organizations.
          </p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="legal-container">
          <div className="legal-card">
            <h3>Security Architecture Overview</h3>
            <p>
              SalesAvatar employs a defense-in-depth architecture designed to protect sensitive financial records, customer contacts, and company revenue data.
            </p>

            <div className="security-highlights-grid">
              <div className="sec-item">
                <CheckCircle2 size={20} color="#10b981" />
                <div>
                  <b>ISO/IEC 27001 Aligned Controls</b>
                  <p>Comprehensive information security management policies, vulnerability scanning, and audit trails.</p>
                </div>
              </div>

              <div className="sec-item">
                <CheckCircle2 size={20} color="#10b981" />
                <div>
                  <b>Indian DPDP Act Compliance</b>
                  <p>Strict local data residency in AWS Mumbai with no unauthorized cross-border personal data transfers.</p>
                </div>
              </div>

              <div className="sec-item">
                <CheckCircle2 size={20} color="#10b981" />
                <div>
                  <b>Role-Based Access Control (RBAC)</b>
                  <p>Granular field-level permissions preventing reps from exporting or tampering with proprietary lead records.</p>
                </div>
              </div>

              <div className="sec-item">
                <CheckCircle2 size={20} color="#10b981" />
                <div>
                  <b>Continuous Database Backups</b>
                  <p>Automated point-in-time recovery (PITR) with encrypted secondary backups across multiple availability zones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function CancellationRefundPage() {
  return (
    <div className="subpage-view legal-page">
      <section className="subpage-hero-banner">
        <div className="subpage-hero-container">
          <div className="section-pill-badge purple">
            <FileText size={13} />
            <span>SUBSCRIPTION POLICY</span>
          </div>
          <h1 className="subpage-hero-title" style={{ textAlign: 'center' }}>
            Cancellation & <span className="gradient-text">Refund Policy</span>
          </h1>
          <p className="subpage-hero-subtitle" style={{ textAlign: 'center' }}>
            Transparent terms for CRM subscription rentals, cancellations, renewals, and refunds.
          </p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="legal-container">
          <div className="legal-card">
            <h3>1. Subscription Rental Model</h3>
            <p>
              All CRM workspace tiers (Starter, Growth, Professional, Business, and Enterprise) are provided as cloud-hosted software subscriptions on a prepaid monthly or annual recurring billing cycle.
            </p>

            <h3>2. Cancellation Requests</h3>
            <p>
              A Company Administrator or Owner may submit a subscription cancellation request at any time directly through the protected customer portal. Once cancelled, your tenant workspace remains fully active and accessible until the conclusion of the current paid billing period. No further automated renewals will be charged after cancellation.
            </p>

            <h3>3. Refund Policy</h3>
            <p>
              Subscription rental fees are billed in advance for the chosen billing term (monthly or annual). Due to immediate cloud tenant provisioning, storage allocation, and server resource reservation:
            </p>
            <ul>
              <li>Monthly subscription payments are non-refundable once the billing cycle has begun.</li>
              <li>Annual subscriptions cancelled within seven (7) calendar days of the initial purchase or renewal are eligible for a prorated refund minus standard payment gateway transaction charges and the first month’s fee.</li>
              <li>No refunds are issued for partial month usage, mid-cycle downgrades, or unused user seat limits.</li>
            </ul>

            <h3>4. Failed Payments & Grace Periods</h3>
            <p>
              If an automatic renewal payment fails, our payment gateway will retry processing according to standard retry cadences. The platform grants a five (5) business day grace period during which workspace access remains active. If payment remains uncollected after the grace period, the company account is temporarily suspended until payment is verified.
            </p>

            <h3>5. Data Retrieval Upon Expiry</h3>
            <p>
              Following subscription cancellation or expiration, company administrators may export all tenant leads, customers, tasks, and report data in CSV format for up to thirty (30) calendar days before permanent deletion from active database clusters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
