import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesQuickBar from '../components/FeaturesQuickBar';
import WhyUsSection from '../components/WhyUsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsAndFAQ from '../components/TestimonialsAndFAQ';

export default function HomePage({ onOpenTrial, onOpenDemo, onOpenEnterprise }) {
  return (
    <div className="home-page-view">
      {/* 1. Hero Section */}
      <HeroSection 
        onOpenTrial={onOpenTrial}
        onOpenDemo={onOpenDemo}
      />

      {/* 2. Quick Ribbon Bar */}
      <FeaturesQuickBar />

      {/* 3. Why Us / Grow Without Chaos */}
      <WhyUsSection />

      {/* 4. How It Works (3 Steps) */}
      <HowItWorksSection />

      {/* 5. Social Proof Testimonials & FAQ */}
      <TestimonialsAndFAQ />

    </div>
  );
}
