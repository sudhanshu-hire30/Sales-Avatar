import React from 'react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { IMAGES, FALLBACK_IMAGES } from '../utils/assets';

export default function BottomCTASection({ 
  onOpenTrial, 
  onOpenDemo,
  backgroundImage = IMAGES.mountainSummit,
  badgeText = 'GET STARTED IN MINUTES',
  title = 'Ready to Turn Sales Chaos Into',
  titleHighlight = 'Predictable Monthly Revenue?',
  subtitle = 'Join Indian businesses closing deals faster with SalesAvatar. Book a personalized walkthrough and get a plan built for your sales operation.',
  primaryBtnText = 'Request CRM Setup',
  secondaryBtnText = 'Book a 1-on-1 Demo',
  checks = [
    'No credit card required',
    'Setup ready in 15 minutes',
    'Full access to all 8 CRM modules'
  ],
  annotationText = 'Zero Setup Fees • Cancel Anytime',
  showAnnotation = true
}) {
  return (
    <section 
      className="bottom-cta-section"
      aria-label="Call to action banner"
    >
      {/* 1. Static Premium Background Image Layer */}
      <div className="bottom-cta-bg">
        <div className="cta-bg-slide active">
          <img 
            src={backgroundImage} 
            alt="SalesAvatar leadership background" 
            className="cta-bg-image" 
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_IMAGES.mountainSummit) {
                e.currentTarget.src = FALLBACK_IMAGES.mountainSummit;
              }
            }}
          />
        </div>

        {/* Multi-depth contrast gradients for guaranteed text legibility */}
        <div className="cta-overlay-gradient"></div>
        <div className="cta-overlay-vignette"></div>
      </div>

      {/* 2. Foreground Content Layer */}
      <div className="bottom-cta-container">
        {/* Left Side: Call to Action content */}
        <div className="cta-left-content">
          {/* Pill Badge */}
          <div className="cta-pill-badge">
            <Sparkles size={13} className="badge-sparkle" />
            <span>{badgeText}</span>
          </div>

          {/* Heading */}
          <h2 className="cta-title">
            {title} <br className="cta-title-br" />
            <span className="gradient-highlight">{titleHighlight}</span>
          </h2>

          {/* Subtitle */}
          <p className="cta-subtitle">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons-row">
            <button 
              type="button" 
              className="btn-cta-primary"
              onClick={() => onOpenTrial && onOpenTrial('Business')}
            >
              {primaryBtnText} <ArrowRight size={17} />
            </button>
            <button 
              type="button" 
              className="btn-cta-secondary"
              onClick={onOpenDemo}
            >
              <div className="play-icon-bubble">
                <Play size={12} fill="#60a5fa" color="#60a5fa" />
              </div>
              {secondaryBtnText}
            </button>
          </div>

          {/* Checkmarks */}
          <div className="cta-checks-row">
            {checks.map((chk, i) => (
              <React.Fragment key={chk}>
                {i > 0 && <div className="check-separator">|</div>}
                <div className="check-item">
                  <CheckCircle2 size={16} className="check-green" />
                  <span>{chk}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side: Hand-drawn script indicator with animated arrow */}
        {showAnnotation && (
          <div className="cta-right-annotated">
            <div className="annotated-callout">
              <span className="handwritten-text">{annotationText}</span>
              <svg viewBox="0 0 100 45" className="curved-hand-arrow" aria-hidden="true">
                <path 
                  d="M 5,30 Q 55,42 90,8" 
                  fill="none" 
                  stroke="#60a5fa" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 80,6 L 92,7 L 88,18" 
                  fill="none" 
                  stroke="#60a5fa" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
