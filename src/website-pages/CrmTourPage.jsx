import React from 'react';
import usePageSeo from '../utils/usePageSeo';
import { 
  Sparkles, 
  Layers, 
  Eye, 
  CheckCircle2, 
  Smartphone
} from 'lucide-react';
import CrmProductGallery from '../components/CrmProductGallery';

export default function CrmTourPage({ onOpenTrial, onOpenDemo }) {
  usePageSeo({
    title: 'Live CRM Product Tour & Screenshots — Real Application Screens | SalesAvatar',
    description: 'Explore 15+ production screenshots of SalesAvatar CRM: live lead pipelines, field officer GPS attendance registers, WhatsApp messaging, and executive revenue dashboards.',
    keywords: 'CRM screenshots, CRM product tour, sales pipeline UI, live CRM demo screenshots, field sales app preview',
    canonicalPath: '/crm-tour'
  });

  return (
    <div className="subpage-view crm-tour-page-view">
      {/* 1. Sleek, Purpose-Built Showcase Hero */}
      <section className="crm-tour-hero-banner">
        <div className="crm-tour-hero-container">
          {/* Eyebrow Live Badge */}
          <div className="crm-tour-pill-badge">
            <span className="live-pulse-dot"></span>
            <Sparkles size={13} className="badge-sparkle-icon" />
            <span>Interactive Platform Showcase &bull; 100% Real Software</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="crm-tour-hero-title">
            See how your team moves <br />
            <span className="gradient-text">from lead to close.</span>
          </h1>

          {/* Engaging Subtitle */}
          <p className="crm-tour-hero-subtitle">
            Explore real SalesAvatar screens across lead capture, pipeline management, field visits, team performance, and revenue reporting.
          </p>

          {/* 4 Modern Stat / Capability Highlight Cards */}
          <div className="crm-tour-stats-row">
            <div className="tour-stat-card">
              <div className="stat-icon-wrap icon-blue">
                <Eye size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-number">15+ Live Screens</span>
                <span className="stat-desc">Full HD production captures</span>
              </div>
            </div>

            <div className="tour-stat-card">
              <div className="stat-icon-wrap icon-purple">
                <Layers size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-number">8 Core Modules</span>
                <span className="stat-desc">Leads, pipelines, field & quotas</span>
              </div>
            </div>

            <div className="tour-stat-card">
              <div className="stat-icon-wrap icon-green">
                <CheckCircle2 size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-number">Zero Mockups</span>
                <span className="stat-desc">100% authentic active UI</span>
              </div>
            </div>

            <div className="tour-stat-card">
              <div className="stat-icon-wrap icon-amber">
                <Smartphone size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-number">Web & Mobile PWA</span>
                <span className="stat-desc">Field check-ins + desk portal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive CRM Product Gallery (Header hidden to prevent duplicate titles) */}
      <CrmProductGallery 
        onOpenTrial={onOpenTrial}
        onOpenDemo={onOpenDemo}
        hideHeader={true}
      />
    </div>
  );
}
