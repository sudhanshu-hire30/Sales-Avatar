import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TrialModal, DemoModal, LoginModal, EnterpriseModal, QuickInquiryModal } from './components/Modals';

// Multi-Page Website Components
import HomePage from './website-pages/HomePage';
import CrmTourPage from './website-pages/CrmTourPage';
import FeaturesPage from './website-pages/FeaturesPage';
import PricingPage from './website-pages/PricingPage';
import WhyUsPage from './website-pages/WhyUsPage';
import TestimonialsPage from './website-pages/TestimonialsPage';
import FAQPage from './website-pages/FAQPage';
import ContactPage from './website-pages/ContactPage';
import { PrivacyPage, TermsPage, SecurityPage, CancellationRefundPage } from './website-pages/LegalPages';

import './App.css';
import './subpages.css';

// Automatically scroll window to top or to target anchor on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false);
  const [quickInquiryOpen, setQuickInquiryOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Business');
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    const quickInquiryShownKey = 'salesavatar-quick-inquiry-shown';

    if (window.localStorage.getItem(quickInquiryShownKey) === 'true') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setQuickInquiryOpen(true);
      window.localStorage.setItem(quickInquiryShownKey, 'true');
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenTrial = (plan = 'Business', cycle = 'monthly') => {
    setSelectedPlan(plan);
    setBillingCycle(cycle);
    setTrialModalOpen(true);
  };

  const handleOpenEnterprise = (planName = 'Enterprise') => {
    setSelectedPlan(planName);
    setEnterpriseModalOpen(true);
  };

  return (
    <div className="sales-avatar-app multi-page-site">
      <ScrollToTop />

      {/* Global Multi-Page Navbar */}
      <Navbar
        onOpenTrial={() => handleOpenTrial('Business')}
      />

      {/* Page Routing */}
      <main className="site-main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenEnterprise={handleOpenEnterprise}
              />
            }
          />
          <Route
            path="/crm-tour"
            element={
              <CrmTourPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/tour"
            element={
              <CrmTourPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/features"
            element={
              <FeaturesPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/pricing"
            element={
              <PricingPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenEnterprise={handleOpenEnterprise}
              />
            }
          />
          <Route
            path="/why-us"
            element={
              <WhyUsPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/solutions"
            element={
              <WhyUsPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/testimonials"
            element={
              <TestimonialsPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/faq"
            element={
              <FAQPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route
            path="/demo"
            element={
              <ContactPage
                onOpenTrial={handleOpenTrial}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
            }
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/cancellation-refund" element={<CancellationRefundPage />} />
          <Route path="/refund" element={<CancellationRefundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Multi-Page Footer */}
      <Footer
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenTrial={handleOpenTrial}
        onOpenEnterprise={handleOpenEnterprise}
      />

      {/* Interactive Global Modals */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        defaultPlan={selectedPlan}
        billingCycle={billingCycle}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <EnterpriseModal
        isOpen={enterpriseModalOpen}
        onClose={() => setEnterpriseModalOpen(false)}
        planName={selectedPlan}
      />

      <QuickInquiryModal
        isOpen={quickInquiryOpen}
        onClose={() => setQuickInquiryOpen(false)}
      />
    </div>
  );
}
