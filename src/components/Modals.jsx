import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Sparkles,
  Lock,
  Play,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { apiFetch } from '../api';

export function TrialModal({ isOpen, onClose, defaultPlan = 'Professional', billingCycle = 'monthly' }) {
  if (!isOpen) return null;

  return (
    <TrialModalContent
      key={`${defaultPlan}-${billingCycle}`}
      onClose={onClose}
      defaultPlan={defaultPlan}
      billingCycle={billingCycle}
    />
  );
}

function TrialModalContent({ onClose, defaultPlan, billingCycle }) {
  const usersByPlan = {
    Starter: '1-5 Users',
    Growth: '6-10 Users',
    Professional: '11-20 Users',
    Business: '21-50 Users',
    Enterprise: '50+ Users'
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Real Estate & Properties',
    usersCount: usersByPlan[defaultPlan] || '1-5 Users',
    plan: defaultPlan,
    billingCycle: billingCycle,
    agreedToTerms: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await apiFetch('/trial-signup', {
        method: 'POST',
        body: formData
      });

      setSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b2b', '#f97316', '#ea580c', '#f59e0b', '#10b981']
      });
    } catch {
      setErrorMessage('We could not submit your registration right now. Please try again or contact our sales team.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog trial-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success-view">
            <div className="success-icon-bubble">
              <CheckCircle2 size={44} color="#10b981" />
            </div>
            <h3 className="success-title">CRM Setup Request Received</h3>
            <p className="success-desc">
              We have received your request for <strong>{formData.company || 'your organization'}</strong> and the <strong>{formData.plan} Plan</strong>. Our sales team will contact <strong>{formData.email}</strong> to confirm pricing, onboarding, and next steps.
            </p>
            <div className="success-highlights">
              <div className="highlight-pill">✓ Plan fit confirmed with your team</div>
              <div className="highlight-pill">✓ Guided onboarding available</div>
              <div className="highlight-pill">✓ Secure company workspace setup</div>
            </div>
            <button
              type="button"
              className="btn-modal-action"
              onClick={onClose}
            >
              Back to website
            </button>
          </div>
        ) : (
          <div className="modal-body-content">
            <div className="modal-header-block">
              <div className="modal-pill-tag">
                <Sparkles size={13} />
                <span>CRM SETUP & ONBOARDING</span>
              </div>
              <h3 className="modal-title">Plan Your CRM Setup</h3>
              <p className="modal-subtitle">
                Tell us about your team and we will recommend the right plan and onboarding path.
              </p>
            </div>

            {errorMessage && (
              <div className="modal-error-box">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prince"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Industries Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99999 99999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="Real Estate & Properties">Real Estate & Properties</option>
                    <option value="Manufacturing & Dealers">Manufacturing & Distribution</option>
                    <option value="BFSI & Financial Services">BFSI & Financial Services</option>
                    <option value="B2B SaaS & Tech">B2B SaaS & Tech</option>
                    <option value="Retail & Direct Sales">Retail & Direct Sales</option>
                    <option value="Other Industry">Other Industry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Selected Plan</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  >
                    <option value="Starter">
                      Starter (Up to 5 users &bull; {formData.billingCycle === 'yearly' ? '₹9,590/yr' : '₹999/mo'})
                    </option>
                    <option value="Growth">
                      Growth (Up to 10 users &bull; {formData.billingCycle === 'yearly' ? '₹16,310/yr' : '₹1,699/mo'})
                    </option>
                    <option value="Professional">
                      Professional (Up to 20 users &bull; {formData.billingCycle === 'yearly' ? '₹23,990/yr' : '₹2,499/mo'}) - Popular
                    </option>
                    <option value="Business">
                      Business (Up to 50 users &bull; {formData.billingCycle === 'yearly' ? '₹47,990/yr' : '₹4,999/mo'})
                    </option>
                    <option value="Enterprise">
                      Enterprise (Custom pricing & limits)
                    </option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '10px 0 14px' }}>
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  required
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: '#2563eb', cursor: 'pointer' }}
                />
                <label htmlFor="consentCheckbox" style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }}>
                  I agree to the Terms of Service, Privacy Policy, and Cancellation & Refund Policy.
                </label>
              </div>

              <button
                type="submit"
                className="btn-modal-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Request...' : 'Request Pricing & Setup →'}
              </button>

              <div className="modal-trust-footer">
                <ShieldCheck size={15} color="#10b981" />
                <span>Multi-Tenant Isolation &bull; DPDP Act Compliant Data Residency</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function DemoModal({ isOpen, onClose }) {
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '11-50'
  });
  const [demoSent, setDemoSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [demoError, setDemoError] = useState('');

  if (!isOpen) return null;

  const handleDemoSchedule = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setDemoError('');
    try {
      await apiFetch('/demo', {
        method: 'POST',
        body: {
          ...demoForm,
          source: 'Live Demo Walkthrough Request'
        }
      });
      setDemoSent(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      setDemoError('We could not reserve your demo right now. Please try again or contact our sales team.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog demo-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {demoSent ? (
          <div className="modal-success-view">
            <div className="success-icon-bubble">
              <CheckCircle2 size={40} color="#10b981" />
            </div>
            <h3 className="success-title">Demo Session Reserved!</h3>
            <p className="success-desc">
              Your request for <strong>{demoForm.company || 'your team'}</strong> has been sent to our sales engineering desk. We will contact <strong>{demoForm.email}</strong> within 2 hours to confirm your 1-on-1 walkthrough.
            </p>
            <button type="button" className="btn-modal-action" onClick={onClose}>Done</button>
          </div>
        ) : (
          <div className="modal-body-content">
            <div className="modal-header-block">
              <div className="modal-pill-tag">
                <Sparkles size={13} />
                <span>GUIDED WALKTHROUGH</span>
              </div>
              <h3 className="modal-title">Book a 1-on-1 Guided Demo</h3>
              <p className="modal-subtitle">
                See how SalesAvatar fits your exact sales workflow with a customized 15-minute screen tour.
              </p>
            </div>

            {demoError && (
              <div className="modal-error-box">{demoError}</div>
            )}

            <form onSubmit={handleDemoSchedule} className="modal-form">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Prince"
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikrant@company.com"
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99999 99999"
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Company / Firm *</label>
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    value={demoForm.company}
                    onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Sales Team Size</label>
                  <select
                    value={demoForm.teamSize}
                    onChange={(e) => setDemoForm({ ...demoForm, teamSize: e.target.value })}
                  >
                    <option value="1-5">1 - 5 Reps</option>
                    <option value="6-10">6 - 10 Reps</option>
                    <option value="11-50">11 - 50 Reps</option>
                    <option value="51-200">51 - 200 Reps</option>
                    <option value="200+">200+ Enterprise</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-modal-submit" disabled={submitting}>
                {submitting ? 'Scheduling Demo...' : 'Schedule Live Demo →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function EnterpriseModal({ isOpen, onClose, planName = 'Enterprise' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    requirement: `Inquiring about ${planName} plan: custom deployment, SLA guarantees, and custom integrations.`
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: {
          ...form,
          plan: planName,
          source: `Enterprise Inquiry (${planName})`
        }
      });
      setSent(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog enterprise-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {sent ? (
          <div className="modal-success-view">
            <div className="success-icon-bubble">
              <CheckCircle2 size={40} color="#10b981" />
            </div>
            <h3 className="success-title">Enterprise Request Received!</h3>
            <p className="success-desc">
              Your inquiry has been delivered to our enterprise team at <strong>sales@salesavatar.com</strong>. A dedicated solutions consultant will provide a custom commercial proposal within 2 hours.
            </p>
            <button type="button" className="btn-modal-action" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div className="modal-body-content">
            <div className="modal-header-block">
              <div className="modal-pill-tag">
                <Building2 size={13} />
                <span>ENTERPRISE SOLUTIONS</span>
              </div>
              <h3 className="modal-title">Custom Pricing & Architecture</h3>
              <p className="modal-subtitle">
                For organizations with 100+ reps, custom integrations, or dedicated cloud deployments.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Prince"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Official Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikrant@enterprise.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99999 99999"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="Company Name"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Specific Requirements</label>
                <textarea
                  rows={3}
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-modal-submit" disabled={submitting}>
                {submitting ? 'Sending Request...' : 'Request Custom Enterprise Quote →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function QuickInquiryModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: ''
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: {
          ...form,
          source: 'Quick Inquiry Popup'
        }
      });
      setSent(true);
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog quick-inquiry-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close quick enquiry">
          <X size={20} />
        </button>

        {sent ? (
          <div className="modal-success-view">
            <div className="success-icon-bubble">
              <CheckCircle2 size={40} color="#10b981" />
            </div>
            <h3 className="success-title">Enquiry Received!</h3>
            <p className="success-desc">
              Thanks for reaching out. Our team will contact you shortly to understand your CRM requirements.
            </p>
            <button type="button" className="btn-modal-action" onClick={onClose}>Done</button>
          </div>
        ) : (
          <div className="modal-body-content">
            <div className="modal-header-block">
              <div className="modal-pill-tag">
                <Sparkles size={13} />
                <span>QUICK ENQUIRY</span>
              </div>
              <h3 className="modal-title">How can we help your team?</h3>
              <p className="modal-subtitle">
                Share a few details and our CRM specialist will get in touch with you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99999 99999"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>What would you like to know?</label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about your CRM requirements..."
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-modal-submit" disabled={submitting}>
                {submitting ? 'Sending Enquiry...' : 'Send Quick Enquiry →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
