import React from 'react';
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

      {/* 2. Why Us / Grow Without Chaos */}
      <WhyUsSection />

      {/* 3. How It Works (3 Steps) */}
      <HowItWorksSection />

      {/* 4. Social Proof Testimonials */}
      <TestimonialsAndFAQ />

    </div>
  );
}
