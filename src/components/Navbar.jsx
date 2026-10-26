import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenTrial }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
        <nav className="nav-links">
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
          <NavLink to="/testimonials" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Testimonials
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
            Get Started Free <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          type="button" 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/features" onClick={() => setMobileMenuOpen(false)}>Features</NavLink>
          <NavLink to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</NavLink>
          <NavLink to="/why-us" onClick={() => setMobileMenuOpen(false)}>Why Us</NavLink>
          <NavLink to="/testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</NavLink>
          <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          <div className="mobile-drawer-actions">
            <button type="button" className="btn-get-started" onClick={() => { setMobileMenuOpen(false); onOpenTrial('Professional'); }}>
              Get Started Free <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
