import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Zap,
  CheckCircle2,
  IndianRupee
} from 'lucide-react';

export default function RoiCalculatorSection({ onOpenDemo }) {
  const [teamSize, setTeamSize] = useState(8);
  const [monthlyLeads, setMonthlyLeads] = useState(250);
  const [avgDealValue, setAvgDealValue] = useState(75000); // INR
  const [currentConversion, setCurrentConversion] = useState(4); // 4%

  // Real-time calculation logic
  const calculations = useMemo(() => {
    // With SalesAvatar:
    // 1. Zero lead decay + 30-sec round-robin assignment increases contact rate by 40%
    // 2. Automated follow-ups prevent lead leakage by ~35%
    const currentDeals = Math.max(1, Math.round(monthlyLeads * (currentConversion / 100)));
    const additionalDeals = Math.max(1, Math.round(currentDeals * 0.38));
    const extraMonthlyRevenue = additionalDeals * avgDealValue;
    const extraAnnualRevenue = extraMonthlyRevenue * 12;

    // Time saved: 14 hours per rep per month (manual Excel entry, status updates, manual WhatsApp typing, lost notes)
    const hoursSavedPerMonth = teamSize * 14;

    // Investment cost: avg ₹1,200 per user per month
    const estimatedCrmCost = Math.max(999, teamSize * 1200);
    const roiMultiple = Math.max(3, Math.round(extraMonthlyRevenue / estimatedCrmCost));

    return {
      currentDeals,
      additionalDeals,
      extraMonthlyRevenue,
      extraAnnualRevenue,
      hoursSavedPerMonth,
      estimatedCrmCost,
      roiMultiple
    };
  }, [teamSize, monthlyLeads, avgDealValue, currentConversion]);

  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="roi-calculator-section" id="roi-calculator">
      <div className="roi-container">
        {/* Header */}
        <div className="section-center-header">
          <div className="section-pill-badge blue">
            <Calculator size={14} className="badge-sparkle" />
            <span>INTERACTIVE VALUE CALCULATOR</span>
          </div>
          <h2 className="section-main-title">
            Calculate How Much Revenue <br className="hidden-mobile" />
            <span className="gradient-text">SalesAvatar Will Add to Your Business</span>
          </h2>
          <p className="section-main-subtitle">
            Spreadsheets and scattered WhatsApp chats leak 30%+ of your inbound leads. See what happens when every follow-up is automated and tracked.
          </p>
        </div>

        {/* Split Calculator Grid */}
        <div className="roi-calculator-grid">
          {/* Left Column: Sliders */}
          <div className="roi-inputs-card">
            <div className="roi-card-header">
              <div className="roi-header-icon-wrap">
                <Zap size={20} color="#ea580c" />
              </div>
              <div>
                <h3 className="roi-card-title">Your Current Sales Numbers</h3>
                <p className="roi-card-desc">Adjust sliders to match your team profile</p>
              </div>
            </div>

            <div className="roi-sliders-stack">
              {/* Slider 1: Sales Team Size */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span className="slider-name">Active Sales Reps / Executives</span>
                  <span className="slider-value-pill">{teamSize} Members</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="50" 
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="roi-range-input"
                />
                <div className="slider-ticks">
                  <span>2 reps</span>
                  <span>25 reps</span>
                  <span>50 reps</span>
                </div>
              </div>

              {/* Slider 2: Monthly Inbound Leads */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span className="slider-name">Inbound Leads per Month</span>
                  <span className="slider-value-pill">{monthlyLeads} Leads</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="1000" 
                  step="10"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="roi-range-input"
                />
                <div className="slider-ticks">
                  <span>30 leads</span>
                  <span>500 leads</span>
                  <span>1,000+ leads</span>
                </div>
              </div>

              {/* Slider 3: Average Deal Size */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span className="slider-name">Average Deal / Order Value (INR)</span>
                  <span className="slider-value-pill">{formatINR(avgDealValue)}</span>
                </div>
                <input 
                  type="range" 
                  min="15000" 
                  max="500000" 
                  step="5000"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="roi-range-input"
                />
                <div className="slider-ticks">
                  <span>₹15,000</span>
                  <span>₹2.5 Lakh</span>
                  <span>₹5 Lakh+</span>
                </div>
              </div>

              {/* Slider 4: Current Win Rate */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span className="slider-name">Current Lead-to-Deal Win Rate</span>
                  <span className="slider-value-pill">{currentConversion}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  step="0.5"
                  value={currentConversion}
                  onChange={(e) => setCurrentConversion(Number(e.target.value))}
                  className="roi-range-input"
                />
                <div className="slider-ticks">
                  <span>1% (Early stage)</span>
                  <span>5% (Average)</span>
                  <span>15% (High ticket)</span>
                </div>
              </div>
            </div>

            <div className="roi-inputs-footnote">
              <ShieldCheck size={16} color="#10b981" />
              <span>Based on benchmark data from 40+ Indian B2B & field sales operations.</span>
            </div>
          </div>

          {/* Right Column: Projected ROI Output Card */}
          <div className="roi-results-card">
            <div className="roi-results-header">
              <span className="roi-badge-live">PROJECTED SALES IMPACT</span>
              <div className="roi-hero-stat">
                <span className="roi-hero-label">Estimated Monthly Revenue Increase</span>
                <div className="roi-hero-amount-wrap">
                  <span className="roi-hero-amount">{formatINR(calculations.extraMonthlyRevenue)}</span>
                  <span className="roi-hero-per">/month</span>
                </div>
                <span className="roi-hero-annual">
                  That&apos;s approximately <strong>{formatINR(calculations.extraAnnualRevenue)}</strong> in new annual pipeline revenue.
                </span>
              </div>
            </div>

            {/* 3 Metric Output Pills */}
            <div className="roi-metric-cards-row">
              <div className="roi-metric-item">
                <div className="roi-metric-icon green">
                  <TrendingUp size={18} />
                </div>
                <div className="roi-metric-data">
                  <span className="roi-metric-number">+{calculations.additionalDeals} Deals</span>
                  <span className="roi-metric-caption">Extra closed deals/mo</span>
                </div>
              </div>

              <div className="roi-metric-item">
                <div className="roi-metric-icon blue">
                  <Clock size={18} />
                </div>
                <div className="roi-metric-data">
                  <span className="roi-metric-number">{calculations.hoursSavedPerMonth} hrs</span>
                  <span className="roi-metric-caption">Admin time saved/mo</span>
                </div>
              </div>

              <div className="roi-metric-item">
                <div className="roi-metric-icon orange">
                  <Sparkles size={18} />
                </div>
                <div className="roi-metric-data">
                  <span className="roi-metric-number">{calculations.roiMultiple}x</span>
                  <span className="roi-metric-caption">Expected CRM ROI</span>
                </div>
              </div>
            </div>

            {/* Checklist of what eliminates leakage */}
            <div className="roi-feature-guarantees">
              <div className="guarantee-line">
                <CheckCircle2 size={16} color="#10b981" />
                <span><strong>Instant 30s Lead Routing:</strong> Zero leads left uncalled in spreadsheets</span>
              </div>
              <div className="guarantee-line">
                <CheckCircle2 size={16} color="#10b981" />
                <span><strong>1-Click WhatsApp Follow-ups:</strong> 3.8x faster response time to inquiries</span>
              </div>
              <div className="guarantee-line">
                <CheckCircle2 size={16} color="#10b981" />
                <span><strong>GPS Geofenced Site Check-ins:</strong> 100% verified field attendance & visits</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="roi-cta-wrap">
              <button 
                type="button" 
                className="btn-roi-cta"
                onClick={onOpenDemo}
              >
                Claim This ROI — Book a 1-on-1 Demo <ArrowRight size={17} />
              </button>
              <span className="roi-cta-subtext">Free 15-min consultation &bull; No credit card required &bull; 100% custom plan fit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
