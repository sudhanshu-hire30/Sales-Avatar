import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  PhoneCall, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronUp
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
        <div className="floating-sales-popover">
          <div className="sales-popover-header">
            <div className="popover-rep-badge">
              <span className="online-green-dot"></span>
              <div className="popover-rep-meta">
                <strong>SalesAvatar Specialist</strong>
                <span>Online &bull; Replies in ~2 mins</span>
              </div>
            </div>
            <button 
              type="button" 
              className="popover-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close widget"
            >
              <X size={16} />
            </button>
          </div>

          <div className="sales-popover-body">
            <p className="popover-greeting">
              Namaste! 🙏 Looking to streamline your leads, follow-ups, or field sales team?
            </p>

            <div className="popover-actions-list">
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-popover-whatsapp"
                onClick={() => setIsOpen(false)}
              >
                <div className="wa-icon-bubble">
                  <MessageCircle size={18} fill="#ffffff" color="#ffffff" />
                </div>
                <div className="wa-btn-text">
                  <strong>Chat on WhatsApp</strong>
                  <span>Instant reply from CRM consultant</span>
                </div>
              </a>

              <button 
                type="button"
                className="btn-popover-demo"
                onClick={() => {
                  setIsOpen(false);
                  onOpenDemo();
                }}
              >
                <div className="demo-icon-bubble">
                  <Calendar size={18} color="#2563eb" />
                </div>
                <div className="demo-btn-text">
                  <strong>Book a 1-on-1 Demo</strong>
                  <span>15-min guided screen walkthrough</span>
                </div>
              </button>
            </div>
          </div>

          <div className="sales-popover-footer">
            <ShieldCheck size={14} color="#10b981" />
            <span>DPDP compliant &bull; 100% Indian Cloud</span>
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
            💬 Need a Custom CRM Demo?
          </span>
        )}
      </button>
    </div>
  );
}
