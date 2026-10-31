import React from 'react';
import { 
  Users, 
  Filter, 
  TrendingUp, 
  ArrowRight, 
  Rocket 
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      numColor: '#1e40af',
      iconBg: '#eff6ff',
      iconColor: '#1e40af',
      icon: Users,
      title: 'Register & Select Plan',
      desc: 'Choose Starter, Professional, or Enterprise and provision your company tenant'
    },
    {
      num: 2,
      numColor: '#3b82f6',
      iconBg: '#eff6ff',
      iconColor: '#1d4ed8',
      icon: Filter,
      title: 'Onboard Team & Modules',
      desc: 'Set role-based permissions, configure pipelines, and import customer records'
    },
    {
      num: 3,
      numColor: '#1d4ed8',
      iconBg: '#eff6ff',
      iconColor: '#1e40af',
      icon: TrendingUp,
      title: 'Manage, Track & Scale',
      desc: 'Execute follow-ups, field GPS attendance, sales targets, and subscription renewals'
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Top Header */}
        <div className="section-center-header">
          <div className="section-pill-badge purple">
            <Rocket size={13} color="#1e40af" />
            <span>FAST ONBOARDING</span>
          </div>
          <h2 className="section-main-title">Up and Running in Under 15 Minutes</h2>
          <p className="section-main-subtitle">
            No expensive consultants. No complex coding. Here's how quickly your team can ditch messy spreadsheets and start closing deals.
          </p>
        </div>

        {/* Steps Flow Row */}
        <div className="steps-flow-row">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={s.num}>
                <div className="step-card-item">
                  <div className="step-badge-number" style={{ background: s.numColor }}>
                    {s.num}
                  </div>
                  <div className="step-content-card">
                    <div className="step-icon-box" style={{ background: s.iconBg }}>
                      <Icon size={24} color={s.iconColor} strokeWidth={2.3} />
                    </div>
                    <div className="step-text-wrap">
                      <h4 className="step-title">{s.title}</h4>
                      <p className="step-desc">{s.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Connecting arrow if not last */}
                {idx < steps.length - 1 && (
                  <div className="step-connector-arrow">
                    <ArrowRight size={22} color="#94a3b8" />
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* End Callout: Rocket with dashed curve */}
          <div className="ready-grow-callout">
            <div className="curved-dashed-arrow">
              <svg viewBox="0 0 70 30" className="curve-svg">
                <path 
                  d="M 5,25 Q 35,-5 65,18" 
                  fill="none" 
                  stroke="#818cf8" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                />
              </svg>
            </div>
            <div className="rocket-bubble">
              <Rocket size={24} color="#1e40af" className="rocket-icon" />
            </div>
            <span className="ready-grow-text">
              And You're Ready <br />
              <strong>to Grow! &#128640;</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
