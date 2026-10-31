import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  PhoneCall, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronUp,
  Headphones
} from 'lucide-react';

export default function FloatingSalesWidget({ onOpenDemo, onOpenTrial }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/919565501189?text=${encodeURIComponent(
    'Hi SalesAvatar Team! 👋 I am interested in a CRM demo for my sales team. Can we connect?'
  )}`;

  return (
    <div className="floating-sales-widget-wrap">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          type="button" 
          className="btn-scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Popover Card */}
      {isOpen && (
        <div className="floating-sales-popover" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="sales-popover-header">
            <div className="popover-rep-badge">
              <div className="specialist-avatar">
                <Headphones size={18} color="#ffffff" />
                <span className="online-green-dot"></span>
              </div>
              <div className="popover-rep-meta">
                <strong>SalesAvatar Specialist</strong>
                <span>⚡ Online &bull; Replies in &lt;2 mins</span>
              </div>
            </div>
            <button 
              type="button" 
              className="popover-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close consultation popup"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="sales-popover-body">
            <div className="popover-greeting-box">
              <p className="popover-greeting">
                Namaste! 🙏 Looking to stop lead leakage, track field visits, or see a live demo of SalesAvatar?
              </p>
            </div>

            <div className="popover-actions-list">
              {/* WhatsApp Option */}
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-popover-whatsapp"
                onClick={() => setIsOpen(false)}
              >
                <div className="wa-icon-bubble">
                  <MessageCircle size={20} fill="#ffffff" color="#ffffff" />
                </div>
                <div className="wa-btn-text">
                  <strong>Chat on WhatsApp</strong>
                  <span>Instant reply from sales engineering</span>
                </div>
                <ArrowRight size={16} className="popover-action-arrow" />
              </a>

              {/* Book 1-on-1 Demo Option */}
              <button 
                type="button"
                className="btn-popover-demo"
                onClick={() => {
                  setIsOpen(false);
                  onOpenDemo();
                }}
              >
                <div className="demo-icon-bubble">
                  <Calendar size={20} color="#1e40af" />
                </div>
                <div className="demo-btn-text">
                  <strong>Book a 1-on-1 Demo</strong>
                  <span>15-min guided screen walkthrough</span>
                </div>
                <ArrowRight size={16} className="popover-action-arrow" />
              </button>

              {/* Direct Call Quick Link */}
              <a 
                href="tel:+919565501189" 
                className="btn-popover-call"
                title="Call SalesAvatar direct helpline"
              >
                <PhoneCall size={14} color="#1e40af" />
                <span>Sales Helpline: <strong>+91 95655 01189</strong></span>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="sales-popover-footer">
            <ShieldCheck size={14} color="#10b981" />
            <span>Privacy and hosting details available</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button 
        type="button" 
        className={`floating-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open sales consultation options"
      >
        <span className="trigger-pulse-ring"></span>
        <div className="trigger-icon-swap">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </div>
        {!isOpen && (
          <span className="trigger-tooltip">
            <span className="tooltip-pulse-dot"></span>
            <span className="tooltip-text">Need a Custom CRM Demo?</span>
          </span>
        )}
      </button>
    </div>
  );
}
