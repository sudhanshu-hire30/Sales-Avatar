import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { IMAGES, FALLBACK_IMAGES } from '../utils/assets';

const testimonials = [
  {
    name: 'Vikram Singhania', role: 'Managing Director', company: 'Singhania Polychem & Tubes', location: 'Pune & Ahmedabad', metric: '100% Geo-Verified Visits', avatar: IMAGES.businessman1, fallback: FALLBACK_IMAGES.businessman1, rating: 5,
    quote: 'We have 28 field executives visiting industrial distributors daily. Before SalesAvatar, attendance was reported on WhatsApp with constant disputes. Geofenced client site check-ins with selfie stamps gave us complete transparency within our first month.'
  },
  {
    name: 'Pooja Deshmukh', role: 'Head of Sales & Marketing', company: 'Skyline Landmark Developers', location: 'Bangalore & Hyderabad', metric: '30s Lead Assignment', avatar: IMAGES.businesswoman2, fallback: FALLBACK_IMAGES.businesswoman2, rating: 5,
    quote: 'Portal inquiries from 99acres and housing portals used to sit in spreadsheets for hours. With SalesAvatar, leads are auto-assigned in under 30 seconds with instant WhatsApp templates. Our site visit conversion jumped by 42% in Q3.'
  },
  {
    name: 'Sunil Mehta', role: 'VP Commercial Operations', company: 'Vardhman Auto Components', location: 'Gurugram, NCR', metric: '50 Users in 1 Day', avatar: IMAGES.businessman3, fallback: FALLBACK_IMAGES.businessman3, rating: 5,
    quote: 'Traditional enterprise software demanded ₹14 Lakhs upfront with 6 months of customization. We rented SalesAvatar on a monthly subscription, onboarded our 50-member sales and dispatch team in an afternoon, and never looked back.'
  }
];

export default function TestimonialsAndFAQ() {
  return (
    <div className="social-proof-and-faq-wrap">
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
          <div className="testimonials-marquee-wrapper" aria-label="Customer testimonials">
            <div className="testimonials-track">
              {[0, 1].map((group) => (
                <div className="testimonials-group" aria-hidden={group === 1 ? 'true' : undefined} key={group}>
                  {testimonials.map((testimonial, index) => (
                    <article key={`${group}-${index}`} className="testimonial-card">
                      <div className="testimonial-card-top">
                        <div className="stars-row">{Array.from({ length: testimonial.rating }, (_, star) => <Star key={star} size={15} fill="#f59e0b" color="#f59e0b" />)}</div>
                        <span className="testimonial-metric-chip">{testimonial.metric}</span>
                      </div>
                      <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="testimonial-author">
                        <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" onError={(event) => { if (testimonial.fallback && event.currentTarget.src !== testimonial.fallback) event.currentTarget.src = testimonial.fallback; }} />
                        <div className="author-info"><h4 className="author-name">{testimonial.name}</h4><span className="author-role">{testimonial.role}</span><span className="author-company-line"><strong>{testimonial.company}</strong> &bull; {testimonial.location}</span></div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
