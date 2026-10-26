import React, { useState, useMemo } from 'react';
import { 
  Star, 
  ChevronDown, 
  Sparkles, 
  Search, 
  X, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  TrendingUp, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { IMAGES, FALLBACK_IMAGES } from '../utils/assets';

const testimonials = [
  {
    name: 'Vikram Singhania',
    role: 'Managing Director',
    company: 'Singhania Polychem & Tubes',
    location: 'Pune & Ahmedabad',
    metric: '100% Geo-Verified Visits',
    avatar: IMAGES.businessman1,
    fallback: FALLBACK_IMAGES.businessman1,
    rating: 5,
    quote: 'We have 28 field executives visiting industrial distributors daily. Before SalesAvatar, attendance was reported on WhatsApp with constant disputes. Geofenced client site check-ins with selfie stamps gave us complete transparency within our first month.'
  },
  {
    name: 'Pooja Deshmukh',
    role: 'Head of Sales & Marketing',
    company: 'Skyline Landmark Developers',
    location: 'Bangalore & Hyderabad',
    metric: '30s Lead Assignment',
    avatar: IMAGES.businesswoman2,
    fallback: FALLBACK_IMAGES.businesswoman2,
    rating: 5,
    quote: 'Portal inquiries from 99acres and housing portals used to sit in spreadsheets for hours. With SalesAvatar, leads are auto-assigned in under 30 seconds with instant WhatsApp templates. Our site visit conversion jumped by 42% in Q3.'
  },
  {
    name: 'Sunil Mehta',
    role: 'VP Commercial Operations',
    company: 'Vardhman Auto Components',
    location: 'Gurugram, NCR',
    metric: '50 Users in 1 Day',
    avatar: IMAGES.businessman3,
    fallback: FALLBACK_IMAGES.businessman3,
    rating: 5,
    quote: 'Traditional enterprise software demanded ₹14 Lakhs upfront with 6 months of customization. We rented SalesAvatar on a monthly subscription, onboarded our 50-member sales and dispatch team in an afternoon, and never looked back.'
  }
];

  const faqCategories = [
    { id: 'all', label: 'All Questions' },
    { id: 'rental', label: '🏢 CRM Rental & Subscriptions' },
    { id: 'multitenant', label: '🛡️ Multi-Tenant & Security' },
    { id: 'modules', label: '⚡ Confirmed CRM Modules' },
    { id: 'field', label: '📍 Field Officers & GPS' },
    { id: 'billing', label: '💳 Pricing & Invoicing' }
  ];

  const faqs = [
    {
      id: 'how-crm-rental-works',
      category: 'rental',
      categoryName: 'CRM Rental',
      icon: Zap,
      iconColor: '#ea580c',
      iconBg: '#fff7ed',
      q: 'How does the CRM rental and subscription model work?',
      a: 'Instead of paying high upfront software licensing and infrastructure costs, businesses rent a secure cloud CRM workspace on monthly or annual subscriptions. You choose a plan (Starter ₹999/mo for up to 5 users, Professional ₹2,499/mo for up to 20 users, or Enterprise custom), and can scale user seats as your company grows.',
      highlights: ['🏢 Flexible monthly/annual subscriptions', '⚡ Instant tenant workspace creation', '📈 Scale seats as you grow']
    },
    {
      id: 'tenant-data-isolation',
      category: 'multitenant',
      categoryName: 'Multi-Tenant Architecture',
      icon: ShieldCheck,
      iconColor: '#3b82f6',
      iconBg: '#eff6ff',
      q: 'How is our company data protected from other companies on the platform?',
      a: 'The platform is built on an enterprise multi-tenant architecture where every database record is permanently bound to a unique tenant ID. Server-side authorization and tenant-scoped queries guarantee that Company A can never view or access Company B’s users, leads, customers, tasks, reports, or invoices.',
      highlights: ['🔒 Strict tenant ID data isolation', '🛡️ Role-based authorization', '📋 Comprehensive audit logging']
    },
    {
      id: 'available-modules',
      category: 'modules',
      categoryName: 'CRM Workspace Modules',
      icon: TrendingUp,
      iconColor: '#10b981',
      iconBg: '#ecfdf5',
      q: 'Which CRM modules are included in the workspace?',
      a: 'The platform includes core modules for Lead Management, Customer Records (360° account view), Follow-up Tasks & Reminders, Visual Sales Pipeline (Kanban), Sales Team Quotas & Targets, Field Officer Geo-Attendance, Dealer/Distributor Management, and Executive Reports & Analytics.',
      highlights: ['👥 Lead & customer management', '📊 Visual drag-and-drop pipeline', '📅 Field officer GPS attendance']
    },
    {
      id: 'field-gps-attendance',
      category: 'field',
      categoryName: 'Field Officers',
      icon: MapPin,
      iconColor: '#f59e0b',
      iconBg: '#fffbeb',
      q: 'Can field officers punch attendance and log visits on mobile devices?',
      a: 'Yes! Field executives can log geo-verified mobile attendance, register client visit check-ins with timestamps and site photos, record meeting notes, and track daily conveyance kilometers directly from their mobile browser without downloading heavy software.',
      highlights: ['📍 Geo-verified check-in & check-out', '🗺️ Client site visit verification', '📝 On-site notes and photo logs']
    },
    {
      id: 'company-onboarding',
      category: 'rental',
      categoryName: 'Onboarding',
      icon: CheckCircle2,
      iconColor: '#06b6d4',
      iconBg: '#ecfeff',
      q: 'What is the company registration and onboarding process?',
      a: 'Registration takes less than 3 minutes. Enter your company name, contact person, business email, mobile number, industry, and select your plan. We verify your business email, provision your isolated company tenant, create your initial Company Administrator login, and provide an onboarding checklist.',
      highlights: ['⚡ Under 3-minute registration', '🏢 Instant tenant workspace setup', '📋 Guided onboarding checklist']
    },
    {
      id: 'pricing-and-billing',
      category: 'billing',
      categoryName: 'Billing & GST',
      icon: CreditCard,
      iconColor: '#8b5cf6',
      iconBg: '#f5f3ff',
      q: 'What are the subscription plans and do you provide GST tax invoices?',
      a: 'We offer Starter (₹999/mo, up to 5 users), Growth (₹1,699/mo, up to 10 users), Professional (₹2,499/mo, up to 20 users), Business (₹4,999/mo, up to 50 users), and Enterprise (custom limits). All paid accounts receive computerized 18% GST tax invoices with your company GSTIN for full Input Tax Credit (ITC).',
      highlights: ['💳 Starter ₹999/mo & Professional ₹2,499/mo', '📄 Official 18% GST ITC invoices', '🔄 Monthly and annual billing']
    }
  ];

export default function TestimonialsAndFAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState('how-crm-rental-works');

  // Filter FAQs based on active category and search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const qLower = faq.q.toLowerCase();
      const aLower = faq.a.toLowerCase();
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = !searchLower || qLower.includes(searchLower) || aLower.includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="social-proof-and-faq-wrap">
      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <div className="section-center-header">
            <div className="section-pill-badge purple">
              <CheckCircle2 size={13} color="#ea580c" />
              <span>AUTHENTIC CUSTOMER STORIES</span>
            </div>
            <h2 className="section-main-title">Real Sales Teams. Real Measurable Growth.</h2>
            <p className="section-main-subtitle">
              See how high-velocity sales teams across India cut spreadsheet chaos and close deals faster every month.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-card-top">
                  <div className="stars-row">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  {t.metric && (
                    <span className="testimonial-metric-chip">
                      {t.metric}
                    </span>
                  )}
                </div>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="author-avatar"
                    onError={(e) => {
                      if (t.fallback && e.currentTarget.src !== t.fallback) {
                        e.currentTarget.src = t.fallback;
                      }
                    }}
                  />
                  <div className="author-info">
                    <h4 className="author-name">{t.name}</h4>
                    <span className="author-role">{t.role}</span>
                    <span className="author-company-line">
                      <strong>{t.company}</strong> &bull; {t.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className="faq-section">
        {/* Soft Ambient Glows */}
        <div className="faq-ambient-glow-left" aria-hidden="true" />
        <div className="faq-ambient-glow-right" aria-hidden="true" />

        <div className="faq-container">
          {/* Header */}
          <div className="section-center-header">
            <div className="section-pill-badge blue">
              <Sparkles size={13} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="section-main-title">
              Got Questions? <span className="faq-title-gradient">We Have Answers.</span>
            </h2>
            <p className="section-main-subtitle">
              Everything you need to know about getting started, Meta & WhatsApp integrations, GPS tracking, and scaling your sales.
            </p>
          </div>

          {/* Interactive Search Bar & Category Filters */}
          <div className="faq-toolbar">
            <div className="faq-search-box">
              <Search size={18} className="faq-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any question (e.g. WhatsApp, GPS, attendance, pricing)..."
                className="faq-search-input"
                aria-label="Search questions"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="faq-search-clear-btn"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="faq-categories-row" role="tablist">
              {faqCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = cat.id === 'all' 
                  ? faqs.length 
                  : faqs.filter(f => f.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery('');
                    }}
                    className={`faq-cat-pill ${isActive ? 'active' : ''}`}
                  >
                    <span>{cat.label}</span>
                    <span className="faq-cat-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion List */}
          <div className="faq-accordion-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                const IconComponent = faq.icon;

                return (
                  <div
                    key={faq.id}
                    className={`faq-item-card ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-card-header"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-header-left">
                        {/* Topic Icon Bubble */}
                        <div 
                          className="faq-icon-bubble"
                          style={{ 
                            backgroundColor: faq.iconBg, 
                            color: faq.iconColor 
                          }}
                        >
                          <IconComponent size={19} />
                        </div>

                        {/* Title & Tag */}
                        <div className="faq-header-text">
                          <span className="faq-category-tag">{faq.categoryName}</span>
                          <span className="faq-question-title">{faq.q}</span>
                        </div>
                      </div>

                      {/* Animated Chevron Indicator */}
                      <div className={`faq-chevron-circle ${isOpen ? 'rotated' : ''}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    {/* Smooth CSS Grid Expandable Answer Container */}
                    <div className="faq-answer-collapsible">
                      <div className="faq-answer-inner">
                        <div className="faq-answer-content">
                          <p className="faq-answer-text">{faq.a}</p>

                          {/* Key Feature Highlight Badges */}
                          {faq.highlights && faq.highlights.length > 0 && (
                            <div className="faq-highlights-list">
                              {faq.highlights.map((item, hIdx) => (
                                <span key={hIdx} className="faq-highlight-pill">
                                  <CheckCircle2 size={13} className="pill-check-icon" />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="faq-empty-state">
                <HelpCircle size={36} className="faq-empty-icon" />
                <h4 className="faq-empty-title">No matching questions found</h4>
                <p className="faq-empty-desc">
                  Try searching for another keyword or reset the category filters.
                </p>
                <button
                  type="button"
                  className="faq-reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Clear Filters & Show All
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
