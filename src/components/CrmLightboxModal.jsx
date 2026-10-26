import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  LayoutGrid,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { getScreenshotUrl } from '../data/crmScreenshots';

export default function CrmLightboxModal({
  isOpen,
  screenshots,
  currentIndex,
  onClose,
  onNavigate,
  onOpenTrial,
  onOpenDemo
}) {
  const filmstripRef = useRef(null);
  const activeThumbRef = useRef(null);
  const [showFilmstrip, setShowFilmstrip] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + screenshots.length) % screenshots.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % screenshots.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, screenshots.length, onClose, onNavigate]);

  // Auto-scroll active thumbnail into view smoothly
  useEffect(() => {
    if (activeThumbRef.current && filmstripRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex]);

  if (!isOpen || !screenshots || screenshots.length === 0) return null;

  const current = screenshots[currentIndex];
  if (!current) return null;

  const imageUrl = getScreenshotUrl(current.file);

  const scrollFilmstrip = (direction) => {
    if (filmstripRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="crm-lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={current.title}>
      <div 
        className="crm-lightbox-dialog" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="crm-lightbox-header">
          <div className="crm-lightbox-title-wrap">
            <div className="crm-lightbox-meta-row">
              <span className="crm-lightbox-badge">
                <Sparkles size={12} className="meta-sparkle" />
                <span>{current.category}</span>
                <span className="meta-sep">&bull;</span>
                <span className="meta-subbadge">{current.badge}</span>
              </span>
            </div>
            <h3 className="crm-lightbox-title">{current.title}</h3>
          </div>

          {/* Fixed Center Navigation Pill */}
          <div className="crm-lightbox-nav-pill-group">
            <button 
              type="button" 
              className="crm-header-arrow-btn"
              onClick={() => onNavigate((currentIndex - 1 + screenshots.length) % screenshots.length)}
              title="Previous Screen (Left Arrow)"
              aria-label="Previous Screen"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="crm-lightbox-counter-pill">
              Screen <strong>{currentIndex + 1}</strong> of {screenshots.length}
            </span>
            <button 
              type="button" 
              className="crm-header-arrow-btn"
              onClick={() => onNavigate((currentIndex + 1) % screenshots.length)}
              title="Next Screen (Right Arrow)"
              aria-label="Next Screen"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="crm-lightbox-header-right">
            {/* Keyboard Shortcuts Hint */}
            <div className="crm-lightbox-key-hints" title="Keyboard Shortcuts">
              <span className="key-cap">←</span>
              <span className="key-cap">→</span>
              <span className="key-label">Navigate</span>
              <span className="key-sep">&bull;</span>
              <span className="key-cap">ESC</span>
              <span className="key-label">Close</span>
            </div>

            <div className="crm-lightbox-actions">
              <button 
                type="button" 
                className={`crm-lightbox-btn-icon ${!showFilmstrip ? 'active-toggle' : ''}`}
                onClick={() => setShowFilmstrip(!showFilmstrip)} 
                title={showFilmstrip ? 'Hide thumbnail filmstrip' : 'Show thumbnail filmstrip'}
              >
                <LayoutGrid size={15} />
                <span className="btn-label-desktop">{showFilmstrip ? 'Hide Scroller' : 'Show Scroller'}</span>
              </button>
              <button 
                type="button" 
                className="crm-lightbox-btn-close" 
                onClick={onClose} 
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area: Split View */}
        <div className="crm-lightbox-body">
          {/* Left Canvas: Completely Unobstructed Screenshot Showcase */}
          <div className="crm-lightbox-stage-container">
            {/* Complete Full Area Image Showcase - Zero Margin */}
            <div className="crm-browser-frame">
              <div className="crm-browser-viewport">
                <img 
                  src={imageUrl} 
                  alt={current.title} 
                  className="crm-lightbox-main-img" 
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Clean, Beautiful Info Drawer */}
          <div className="crm-lightbox-info-pane">
            <div className="crm-pane-card">
              <div className="pane-card-header">
                <span className="crm-pane-label">MODULE DESCRIPTION</span>
                <span className="pane-active-tag">{current.navItem || 'Overview'}</span>
              </div>
              <p className="crm-pane-desc">{current.description}</p>
              
              <div className="crm-pane-specs-grid">
                <div className="spec-pill">
                  <Zap size={11} className="spec-icon" />
                  <span>Real-Time Sync</span>
                </div>
                <div className="spec-pill">
                  <ShieldCheck size={11} className="spec-icon" />
                  <span>SOC-2 Certified</span>
                </div>
                <div className="spec-pill">
                  <Layers size={11} className="spec-icon" />
                  <span>Enterprise Role</span>
                </div>
              </div>
            </div>

            <div className="crm-pane-card">
              <span className="crm-pane-label">REAL FEATURES VISIBLE ON THIS SCREEN</span>
              <ul className="crm-pane-highlights">
                {current.highlights.map((h, idx) => (
                  <li key={idx}>
                    <div className="check-icon-circle">
                      <CheckCircle2 size={14} className="crm-pane-check" />
                    </div>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="crm-pane-card trust-card">
              <div className="crm-real-badge">
                <span className="real-indicator-dot" />
                <span className="real-badge-text">Authentic Production Capture</span>
              </div>
              <p className="trust-card-sub">
                Captured from active multi-tenant production deployments. Zero mockups or placeholder graphics.
              </p>
            </div>

            {/* Action Buttons in Drawer */}
            {(onOpenTrial || onOpenDemo) && (
              <div className="crm-pane-cta-block">
                {onOpenTrial && (
                  <button
                    type="button"
                    className="pane-cta-primary-btn"
                    onClick={() => {
                      onClose();
                      onOpenTrial('Professional');
                    }}
                  >
                    <span>Start 14-Day Free Trial</span>
                    <ArrowRight size={14} />
                  </button>
                )}
                {onOpenDemo && (
                  <Link
                    to="/crm-tour"
                    className="pane-cta-secondary-btn"
                  >
                    <span>Full Product Tour</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Filmstrip Footer with Smooth Thumbnail Navigation */}
        {showFilmstrip && (
          <div className="crm-lightbox-filmstrip">
            <div className="crm-filmstrip-wrapper">
              <button
                type="button"
                className="filmstrip-arrow-btn left"
                onClick={() => scrollFilmstrip('left')}
                title="Scroll thumbnails left"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="crm-filmstrip-scroll" ref={filmstripRef}>
                {screenshots.map((s, idx) => {
                  const thumbUrl = getScreenshotUrl(s.file);
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={s.id}
                      ref={isActive ? activeThumbRef : null}
                      type="button"
                      className={`crm-filmstrip-item ${isActive ? 'active' : ''}`}
                      onClick={() => onNavigate(idx)}
                      title={`${idx + 1}. ${s.title}`}
                    >
                      <img src={thumbUrl} alt={s.title} loading="lazy" />
                      <span className="crm-filmstrip-tag">{idx + 1}</span>
                      {isActive && <span className="active-dot-indicator" />}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="filmstrip-arrow-btn right"
                onClick={() => scrollFilmstrip('right')}
                title="Scroll thumbnails right"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
