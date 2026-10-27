import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { TrendingUp, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenTrial, onOpenDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection for navbar background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and handle Escape key when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-logo-icon">
              <TrendingUp size={22} color="#ffffff" strokeWidth={2.8} />
            </div>
            <div className="brand-text">
              <div className="brand-title">
                <span className="brand-bold">Sales</span>
                <span className="brand-purple">Avatar</span>
              </div>
              <span className="brand-tagline">Sell &bull; Manage &bull; Grow</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/features" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Features
            </NavLink>
            <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Pricing
            </NavLink>
            <NavLink to="/why-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Why Us
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              FAQ
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Right CTA Buttons */}
          <div className="nav-actions">
            <button type="button" className="btn-get-started" onClick={() => onOpenTrial('Professional')}>
              Book a Demo <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button 
            type="button" 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/features" 
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features & Modules
            </NavLink>
            <NavLink 
              to="/pricing" 
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Plans & Pricing
            </NavLink>
            <NavLink 
              to="/why-us" 
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Us
            </NavLink>
            <NavLink 
              to="/faq" 
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ & Help
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Sales
            </NavLink>
            <div className="mobile-drawer-actions">
              <button 
                type="button" 
                className="btn-get-started btn-mobile-cta" 
                onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
              >
                Book a 1-on-1 Demo <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-backdrop" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

