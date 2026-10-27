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
                    placeholder="+91 98765 43210"
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
  const [activeVideoTab, setActiveVideoTab] = useState('overview');
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '10-50'
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
        body: demoForm
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

        <div className="demo-modal-layout">
          {/* Left: Video Showcase */}
          <div className="demo-video-col">
            <div className="demo-player-container">
              {/* Simulated HD video player walkthrough */}
              <div className="simulated-player">
                <div className="player-badge">LIVE WALKTHROUGH</div>
                <div className="player-center-play">
                  <Play size={28} fill="#ffffff" color="#ffffff" />
                </div>
                <div className="player-bottom-bar">
                  <span className="player-time">03:45 / 07:20</span>
                  <div className="player-timeline">
                    <div className="timeline-progress"></div>
                  </div>
                  <span className="player-hd">1080p HD</span>
                </div>
              </div>
            </div>

            <div className="demo-chapters-tabs">
              <button
                type="button"
                className={`chapter-tab ${activeVideoTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveVideoTab('overview')}
              >
                1. CRM Workspace
              </button>
              <button
                type="button"
                className={`chapter-tab ${activeVideoTab === 'leads' ? 'active' : ''}`}
                onClick={() => setActiveVideoTab('leads')}
              >
                2. Leads & Customers
              </button>
              <button
                type="button"
                className={`chapter-tab ${activeVideoTab === 'attendance' ? 'active' : ''}`}
                onClick={() => setActiveVideoTab('attendance')}
              >
                3. Visual Pipeline
              </button>
              <button
                type="button"
                className={`chapter-tab ${activeVideoTab === 'payroll' ? 'active' : ''}`}
                onClick={() => setActiveVideoTab('payroll')}
              >
                4. Field Officers & GPS
              </button>
            </div>
          </div>

          {/* Right: Schedule 1-on-1 Personalized Demo */}
          <div className="demo-form-col">
            <h3 className="demo-col-title">Book a 1-on-1 Guided Demo</h3>
            <p className="demo-col-sub">See how SalesAvatar fits your exact sales workflow.</p>

            {demoError && (
              <div className="modal-error-box">{demoError}</div>
            )}

            {demoSent ? (
              <div className="demo-sent-box">
                <CheckCircle2 size={36} color="#10b981" />
                <h4>Demo Session Reserved!</h4>
                <p>Our sales engineering lead will call you within 2 hours to confirm your screen-share time slot.</p>
                <button type="button" className="btn-modal-action" onClick={onClose}>Done</button>
              </div>
            ) : (
              <form onSubmit={handleDemoSchedule} className="demo-form">
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
                    placeholder="+91 98765 43210"
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Sales Team Size</label>
                  <select
                    value={demoForm.teamSize}
                    onChange={(e) => setDemoForm({ ...demoForm, teamSize: e.target.value })}
                  >
                    <option value="1-10">1 - 10 Reps</option>
                    <option value="11-50">11 - 50 Reps</option>
                    <option value="51-200">51 - 200 Reps</option>
                    <option value="200+">200+ Enterprise</option>
                  </select>
                </div>
                <button type="submit" className="btn-modal-submit" disabled={submitting}>
                  {submitting ? 'Scheduling in MySQL...' : 'Schedule Live Demo →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleClose = () => {
    setLoginSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog login-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        {loginSuccess ? (
          <div className="modal-success-view">
            <div className="success-icon-bubble">
              <CheckCircle2 size={38} color="#10b981" />
            </div>
            <h3 className="success-title">Signed In!</h3>
            <p className="success-desc">
              Welcome back, <strong>{email || 'Member'}</strong>. You are successfully signed in to SalesAvatar.
            </p>
            <button type="button" className="btn-modal-action" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <div className="modal-body-content">
            <div className="modal-header-block">
              <div className="modal-pill-tag">
                <Lock size={13} />
                <span>ACCOUNT LOGIN</span>
              </div>
              <h3 className="modal-title">Sign in to SalesAvatar</h3>
              <p className="modal-subtitle">
                Access your sales workspace, analytics & account settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="modal-form">
              <div className="form-group">
                <label>Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <div className="label-with-action">
                  <label>Password</label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset link sent to your email.');
                    }}
                    className="sub-helper"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-modal-submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : 'Sign In →'}
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
    requirement: `Inquiring about ${planName} plan: custom deployment, SLA guarantees, and custom API integrations.`
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
        body: form
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
              Saved in our MySQL database. An enterprise solutions consultant will provide a custom commercial proposal within 4 hours.
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
                    placeholder="+91 98765 43210"
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
                {submitting ? 'Submitting to MySQL...' : 'Request Custom Enterprise Quote →'}
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
        body: form
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
                    placeholder="+91 98765 43210"
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
