import React from 'react';
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';
import usePageSeo from '../utils/usePageSeo';
import HeroSection from '../components/HeroSection';
import InteractiveSandboxSection from '../components/InteractiveSandboxSection';
import IndustrySolutionsSection from '../components/IndustrySolutionsSection';
import RoiCalculatorSection from '../components/RoiCalculatorSection';
import WhyUsSection from '../components/WhyUsSection';
import ComparisonSection from '../components/ComparisonSection';
import PricingSection from '../components/PricingSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsAndFAQ from '../components/TestimonialsAndFAQ';
import BottomCTASection from '../components/BottomCTASection';

export default function HomePage({ onOpenTrial, onOpenDemo, onOpenEnterprise }) {
  usePageSeo({
    title: 'SalesAvatar CRM — #1 Cloud Sales CRM for Indian Businesses | Leads, Pipelines & Field GPS',
    description: 'Boost sales velocity with SalesAvatar — India’s top cloud CRM. Automated 30s lead routing, 1-click WhatsApp follow-ups, visual Kanban pipelines, GPS field attendance, and 18% GST invoices. Live in 15 mins.',
    keywords: 'CRM software India, best sales CRM India, cloud CRM small business, lead management software, field sales tracking app GPS, WhatsApp CRM India, real estate CRM software, B2B sales pipeline, affordable CRM with GST invoice',
    canonicalPath: '/'
  });

  return (
    <div className="home-page-view clean-enterprise-home">
      {/* 1. Hero Section */}
      <HeroSection 
        onOpenTrial={onOpenTrial}
        onOpenDemo={onOpenDemo}
      />

      {/* Trust & Buying Conversion Bar */}
      <section className="home-conversion-bar" aria-label="SalesAvatar buying benefits">
        <div className="home-conversion-inner">
          <div className="home-conversion-item">
            <Clock3 size={18} />
            <div>
              <strong>Live in 15 minutes</strong>
              <span>No 3-month IT implementation</span>
            </div>
          </div>
          <div className="home-conversion-item">
            <ShieldCheck size={18} />
            <div>
              <strong>Built for Indian teams</strong>
              <span>100% Indian Cloud &bull; DPDP ready</span>
            </div>
          </div>
          <div className="home-conversion-item">
            <CheckCircle2 size={18} />
            <div>
              <strong>18% GST Input Tax Credit</strong>
              <span>Computerized GST tax invoices</span>
            </div>
          </div>
          <button
            type="button"
            className="home-conversion-cta"
            onClick={onOpenDemo}
          >
            Schedule 1-on-1 Walkthrough <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* 2. Interactive Live CRM Sandbox (Test Drive directly on Homepage) */}
      <InteractiveSandboxSection 
        onOpenDemo={onOpenDemo}
        onOpenTrial={onOpenTrial}
      />

      {/* 3. Industry-Tailored Solutions (Real Estate, Manufacturing, Solar, Financial, Agencies) */}
      <IndustrySolutionsSection 
        onOpenDemo={onOpenDemo}
      />

      {/* 4. Interactive ROI & Revenue Growth Calculator */}
      <RoiCalculatorSection 
        onOpenDemo={onOpenDemo}
      />

      {/* 5. Why Us & Modern Sales Leadership */}
      <WhyUsSection />

      {/* 6. Honest Comparison: SalesAvatar vs Excel vs Legacy Foreign CRMs */}
      <ComparisonSection 
        onOpenDemo={onOpenDemo}
      />

      {/* 7. Transparent Plans & Pricing (Direct on Homepage) */}
      <PricingSection 
        onSelectPlan={(plan) => onOpenTrial(plan)}
        onOpenEnterprise={onOpenEnterprise}
      />

      {/* 8. Fast 3-Step Onboarding */}
      <HowItWorksSection />

      {/* 9. Authentic Customer Proof & Testimonials */}
      <TestimonialsAndFAQ />

      {/* 10. High-Impact Closing CTA Banner */}
      <BottomCTASection 
        onOpenTrial={onOpenTrial}
        onOpenDemo={onOpenDemo}
        badgeText="ZERO RISK ONBOARDING"
        title="Ready to Stop Lead Leakage &"
        titleHighlight="Scale Your Sales Floor?"
        subtitle="Join forward-thinking Indian businesses closing deals faster with SalesAvatar. Get your team provisioned in under 15 minutes."
        primaryBtnText="Request CRM Setup"
        secondaryBtnText="Book Guided Walkthrough"
        checks={[
          'Setup in 15 minutes',
          'Valid 18% GST Invoices with ITC',
          'Zero setup fees & cancel anytime'
        ]}
      />
    </div>
  );
}
