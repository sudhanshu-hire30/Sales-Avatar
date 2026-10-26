import React from 'react';
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import WhyUsSection from '../components/WhyUsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsAndFAQ from '../components/TestimonialsAndFAQ';

export default function HomePage({ onOpenTrial, onOpenDemo, onOpenEnterprise }) {
  return (
    <div className="home-page-view clean-enterprise-home">
      {/* 1. Hero Section */}
      <HeroSection 
        onOpenTrial={onOpenTrial}
        onOpenDemo={onOpenDemo}
      />

      <section className="home-conversion-bar" aria-label="SalesAvatar buying benefits">
        <div className="home-conversion-inner">
          <div className="home-conversion-item">
            <Clock3 size={18} />
            <div>
              <strong>Live in 15 minutes</strong>
              <span>No implementation project</span>
            </div>
          </div>
          <div className="home-conversion-item">
            <ShieldCheck size={18} />
            <div>
              <strong>Built for Indian teams</strong>
              <span>Secure, DPDP-ready cloud CRM</span>
            </div>
          </div>
          <div className="home-conversion-item">
            <CheckCircle2 size={18} />
            <div>
              <strong>Clear plans, faster decisions</strong>
              <span>Choose the right fit for your team</span>
            </div>
          </div>
          <button
            type="button"
            className="home-conversion-cta"
            onClick={onOpenDemo}
          >
            Talk to sales <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* 2. Why Us / Grow Without Chaos */}
      <WhyUsSection />

      {/* 3. How It Works (3 Steps) */}
      <HowItWorksSection />

      {/* 4. Social Proof Testimonials */}
      <TestimonialsAndFAQ />

    </div>
  );
}
