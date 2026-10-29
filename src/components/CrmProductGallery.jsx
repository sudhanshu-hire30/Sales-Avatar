import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Maximize2, 
  Filter, 
  ArrowRight
} from 'lucide-react';
import { 
  CRM_CATEGORIES, 
  CRM_SCREENSHOTS, 
  getScreenshotUrl 
} from '../data/crmScreenshots';
import CrmLightboxModal from './CrmLightboxModal';

export default function CrmProductGallery({ 
  onOpenTrial, 
  onOpenDemo, 
  hideHeader = false,
  hideBottomCta = false 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Screens');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const location = useLocation();

  // Support deep-linking to specific screen or category via URL query parameters
  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const catParam = params.get('category');
      if (catParam && CRM_CATEGORIES.includes(catParam)) {
        setSelectedCategory(catParam);
      }
      const screenParam = params.get('screen');
      if (screenParam) {
        const idx = CRM_SCREENSHOTS.findIndex((s) => s.id === screenParam);
        if (idx !== -1) {
          setLightboxIndex(idx);
          setLightboxOpen(true);
          const screenCategory = CRM_SCREENSHOTS[idx].category;
          if (screenCategory) {
            setSelectedCategory(screenCategory);
          }
        }
      }
    }
  }, [location.search]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { 'All Screens': CRM_SCREENSHOTS.length };
    CRM_SCREENSHOTS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered list
  const filteredScreens = useMemo(() => {
    return CRM_SCREENSHOTS.filter((item) => {
      const matchesCategory = 
        selectedCategory === 'All Screens' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.navItem.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenLightbox = (screenId) => {
    const idx = CRM_SCREENSHOTS.findIndex((s) => s.id === screenId);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  return (
    <section id="crm-tour" className={`crm-gallery-section ${hideHeader ? 'no-header' : ''}`}>
      <div className="crm-gallery-container">
        {/* Section Header */}
        {!hideHeader && (
          <div className="crm-gallery-header">
            <div className="crm-gallery-badge">
              <Sparkles size={14} className="badge-sparkle" />
              <span>REAL CRM PRODUCT SHOWCASE</span>
            </div>
            <h2 className="crm-gallery-title">
              Take a Visual Tour of Our <br />
              <span className="gradient-text">Complete Cloud CRM Platform</span>
            </h2>
            <p className="crm-gallery-subtitle">
              Zero mockups. Zero generic placeholders. Explore the exact, production-grade cloud CRM interfaces your sales managers, field executives, and leadership team will use daily.
            </p>
          </div>
        )}

        {/* Filter Navigation & Search Bar */}
        <div className="crm-gallery-controls">
          <div className="crm-category-tabs">
            {CRM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`crm-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="crm-cat-count">{categoryCounts[cat] || 0}</span>
              </button>
            ))}
          </div>

          <div className="crm-search-box">
            <Search size={16} className="crm-search-icon" />
            <input
              type="text"
              placeholder="Search by module (e.g. leads, attendance, quota, whatsapp, meta)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="crm-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="crm-search-clear"
                onClick={() => setSearchQuery('')}
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="crm-results-meta">
          <span>Showing <strong>{filteredScreens.length}</strong> live application screens</span>
          {selectedCategory !== 'All Screens' && (
            <span className="crm-filter-tag">
              Category: {selectedCategory}
              <button type="button" onClick={() => setSelectedCategory('All Screens')}>&times;</button>
            </span>
          )}
        </div>

        {/* Screens Grid */}
        <div className="crm-cards-grid">
          {filteredScreens.map((screen) => {
            const imgUrl = getScreenshotUrl(screen.file);
            return (
              <div 
                key={screen.id} 
                className="crm-screen-card"
                onClick={() => handleOpenLightbox(screen.id)}
              >
                {/* Image Frame with Hover Overlay */}
                <div className="crm-card-image-wrap">
                  <img 
                    src={imgUrl} 
                    alt={screen.title} 
                    loading="lazy" 
                    className="crm-card-img" 
                  />
                  <div className="crm-card-overlay">
                    <button 
                      type="button" 
                      className="crm-card-zoom-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLightbox(screen.id);
                      }}
                    >
                      <Maximize2 size={16} />
                      <span>Inspect Full Screen</span>
                    </button>
                  </div>
                  <div className="crm-card-category-pill">
                    {screen.badge}
                  </div>
                </div>

                {/* Card Content */}
                <div className="crm-card-content">
                  <div className="crm-card-header-row">
                    <span className="crm-card-nav-tag">{screen.category}</span>
                    <span className="crm-card-nav-module">Nav: {screen.navItem}</span>
                  </div>

                  <h3 className="crm-card-title">{screen.title}</h3>
                  <p className="crm-card-desc">{screen.description}</p>

                  <div className="crm-card-highlights">
                    <div className="highlights-label">Key Capabilities:</div>
                    <ul className="highlights-list">
                      {screen.highlights.slice(0, 2).map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={13} color="#10b981" className="h-check" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="crm-card-footer">
                    <button 
                      type="button" 
                      className="crm-card-inspect-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLightbox(screen.id);
                      }}
                    >
                      <span>Explore this screen</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with CTA */}
        {!hideBottomCta && (
          <div className="crm-gallery-bottom-cta">
            <div className="cta-left">
              <h3>Ready to see your sales data in this platform?</h3>
              <p>Rent SalesAvatar with isolated multi-tenant architecture and instant company onboarding.</p>
            </div>
            <div className="cta-right">
              {onOpenTrial && (
                <button 
                  type="button" 
                  className="btn-hero-primary"
                  onClick={() => onOpenTrial('Professional')}
                >
                  Choose a Plan <ArrowRight size={16} />
                </button>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <CrmLightboxModal
        isOpen={lightboxOpen}
        screenshots={CRM_SCREENSHOTS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        onOpenTrial={onOpenTrial}
        onOpenDemo={onOpenDemo}
      />
    </section>
  );
}
