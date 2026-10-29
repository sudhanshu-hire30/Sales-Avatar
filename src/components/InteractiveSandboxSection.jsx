import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  MessageCircle, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  Play, 
  Eye, 
  Clock, 
  Send, 
  UserCheck, 
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_DEALS = [
  { id: 'd1', company: 'Tata Solar EPC', value: 850000, stage: 'Discovery', contact: 'Anand Verma', time: '12m ago' },
  { id: 'd2', company: 'Godrej Prime Residency', value: 1420000, stage: 'Proposal Sent', contact: 'Kavita Roy', time: '1h ago' },
  { id: 'd3', company: 'Mahindra Logistics Hub', value: 680000, stage: 'Negotiation', contact: 'Sanjay Nair', time: '3h ago' },
  { id: 'd4', company: 'Reliance Polymers B2B', value: 1850000, stage: 'New Inbound', contact: 'Vikram Joshi', time: 'Just now' }
];

const STAGES = ['New Inbound', 'Discovery', 'Proposal Sent', 'Negotiation', 'Closed Won'];

export default function InteractiveSandboxSection({ onOpenDemo, onOpenTrial }) {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'whatsapp' | 'field' | 'bi'
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [chatSent, setChatSent] = useState(false);
  const [gpsPunched, setGpsPunched] = useState(false);

  const moveDealForward = (dealId) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== dealId) return deal;
        const currentIdx = STAGES.indexOf(deal.stage);
        const nextStage = currentIdx < STAGES.length - 1 ? STAGES[currentIdx + 1] : STAGES[0];
        
        if (nextStage === 'Closed Won') {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
        return { ...deal, stage: nextStage };
      })
    );
  };

  const handleSimulateWhatsApp = () => {
    setChatSent(true);
    setTimeout(() => {
      // Keep it open
    }, 400);
  };

  const handleSimulateGps = () => {
    setGpsPunched(!gpsPunched);
  };

  const formatINR = (val) => `₹${(val / 100000).toFixed(2)} Lakh`;

  // Total in pipeline
  const pipelineTotal = deals.reduce((sum, d) => sum + d.value, 0);
  const wonDealsTotal = deals.filter(d => d.stage === 'Closed Won').reduce((sum, d) => sum + d.value, 0);

  return (
    <section className="interactive-sandbox-section" id="live-demo">
      <div className="sandbox-container">
        {/* Top Header */}
        <div className="section-center-header">
          <div className="section-pill-badge orange">
            <Sparkles size={14} className="badge-sparkle" />
            <span>INTERACTIVE TEST DRIVE</span>
          </div>
          <h2 className="section-main-title">
            Try the CRM Yourself <br className="hidden-mobile" />
            <span className="gradient-text">Zero Sign-Up Required</span>
          </h2>
          <p className="section-main-subtitle">
            See why Indian sales reps love SalesAvatar: simple, lightning-fast workflows built to eliminate friction and close deals.
          </p>
        </div>

        {/* Feature Switcher Nav Pills */}
        <div className="sandbox-tabs-nav" role="tablist">
          <button 
            type="button" 
            role="tab"
            aria-selected={activeTab === 'pipeline'}
            className={`sandbox-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
          >
            <Layers size={17} />
            <span>1. Drag & Move Pipeline</span>
          </button>

          <button 
            type="button" 
            role="tab"
            aria-selected={activeTab === 'whatsapp'}
            className={`sandbox-tab-btn ${activeTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActiveTab('whatsapp')}
          >
            <MessageCircle size={17} />
            <span>2. 1-Click WhatsApp Follow-up</span>
          </button>

          <button 
            type="button" 
            role="tab"
            aria-selected={activeTab === 'field'}
            className={`sandbox-tab-btn ${activeTab === 'field' ? 'active' : ''}`}
            onClick={() => setActiveTab('field')}
          >
            <MapPin size={17} />
            <span>3. Field GPS & Client Check-in</span>
          </button>

          <button 
            type="button" 
            role="tab"
            aria-selected={activeTab === 'bi'}
            className={`sandbox-tab-btn ${activeTab === 'bi' ? 'active' : ''}`}
            onClick={() => setActiveTab('bi')}
          >
            <TrendingUp size={17} />
            <span>4. Real-time Quota Intelligence</span>
          </button>
        </div>

        {/* Interactive Play Area Card */}
        <div className="sandbox-play-window">
          {/* Top Window Chrome */}
          <div className="sandbox-window-bar">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="window-address-pill">
              <span className="lock-icon">&#128274;</span>
              <span>app.salesavatar.com/workspace/live-sandbox</span>
            </div>
            <div className="window-live-tag">
              <span className="pulse-indicator"></span>
              <span>Interactive Live Preview</span>
            </div>
          </div>

          {/* TAB 1: KANBAN PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="sandbox-content-pane pipeline-pane">
              <div className="sandbox-pane-instructions">
                <div className="instruction-badge">💡 Try It:</div>
                <span>Click <strong>&quot;Advance Stage &rarr;&quot;</strong> on any deal below to see it move across your sales stages!</span>
                <div className="pipeline-summary-pill">
                  Active Pipeline: <strong>{formatINR(pipelineTotal)}</strong> &bull; Won Deals: <strong className="green-text">{formatINR(wonDealsTotal)}</strong>
                </div>
              </div>

              <div className="sandbox-kanban-board">
                {STAGES.map((stageName) => {
                  const stageDeals = deals.filter((d) => d.stage === stageName);
                  const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

                  return (
                    <div key={stageName} className={`kanban-column ${stageName === 'Closed Won' ? 'won-column' : ''}`}>
                      <div className="kanban-column-header">
                        <div className="kanban-stage-title-wrap">
                          <span className="kanban-stage-name">{stageName}</span>
                          <span className="kanban-deal-count">{stageDeals.length}</span>
                        </div>
                        <span className="kanban-stage-sum">{formatINR(stageValue)}</span>
                      </div>

                      <div className="kanban-cards-stack">
                        {stageDeals.length === 0 ? (
                          <div className="kanban-empty-slot">Drop deals here</div>
                        ) : (
                          stageDeals.map((deal) => (
                            <div key={deal.id} className="kanban-deal-card">
                              <div className="deal-card-top">
                                <span className="deal-company-name">{deal.company}</span>
                                <span className="deal-value-tag">{formatINR(deal.value)}</span>
                              </div>
                              <div className="deal-card-mid">
                                <span className="deal-contact-name">&#128100; {deal.contact}</span>
                                <span className="deal-time-tag"><Clock size={11} /> {deal.time}</span>
                              </div>
                              <button 
                                type="button" 
                                className="btn-advance-deal"
                                onClick={() => moveDealForward(deal.id)}
                                title="Advance to next sales stage"
                              >
                                {deal.stage === 'Closed Won' ? 'Reset to Start ↺' : 'Advance Stage →'}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: WHATSAPP OUTREACH */}
          {activeTab === 'whatsapp' && (
            <div className="sandbox-content-pane whatsapp-pane">
              <div className="sandbox-pane-instructions">
                <div className="instruction-badge">💡 Try It:</div>
                <span>Click <strong>&quot;Send Instant WhatsApp Follow-up&quot;</strong> to simulate how 1-click templates engage leads in under 30 seconds.</span>
              </div>

              <div className="whatsapp-sandbox-grid">
                {/* Left: CRM Contact Action Panel */}
                <div className="crm-action-panel">
                  <div className="lead-quick-card">
                    <div className="lead-avatar-bubble">AK</div>
                    <div className="lead-info-meta">
                      <h4 className="lead-name">Ananya Kapoor</h4>
                      <span className="lead-company">Tata Capital Commercial Lending</span>
                      <span className="lead-phone">+91 98201 XXXXX &bull; Inquiry: Real Estate Machinery</span>
                    </div>
                  </div>

                  <div className="whatsapp-template-selector">
                    <span className="field-title">Selected Outreach Template:</span>
                    <div className="template-box">
                      <strong>&quot;High-Intent Price Quote &amp; Meeting Invitation&quot;</strong>
                      <p>Automated merge tags: [Lead Name], [Executive Name], [Proposal PDF Link]</p>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className="btn-trigger-whatsapp"
                    onClick={handleSimulateWhatsApp}
                  >
                    <Send size={16} />
                    <span>{chatSent ? 'Sent! Click to Resend' : 'Send Instant WhatsApp Follow-up'}</span>
                  </button>

                  <div className="whatsapp-crm-status">
                    <CheckCircle2 size={15} color="#10b981" />
                    <span>Automatically logged to customer CRM interaction timeline.</span>
                  </div>
                </div>

                {/* Right: Phone Simulator */}
                <div className="phone-screen-mockup">
                  <div className="phone-header">
                    <div className="phone-avatar-small">SA</div>
                    <div className="phone-chat-title">
                      <strong>SalesAvatar Official &bull; Verified</strong>
                      <span>Business Account</span>
                    </div>
                  </div>

                  <div className="phone-chat-body">
                    <div className="chat-bubble-received">
                      <span className="chat-sender">Ananya Kapoor</span>
                      <p>Hi, we received your proposal for the 50-unit commercial pipeline. Could you clarify delivery timelines?</p>
                      <span className="chat-timestamp">11:42 AM</span>
                    </div>

                    {chatSent && (
                      <div className="chat-bubble-sent animate-slide-up">
                        <p>
                          Hi Ananya ji! 👋 Thanks for reaching out. Delivery timeline is <strong>12 business days</strong> with full installation support.
                          <br /><br />
                          I&apos;ve attached your customized quote summary here: <strong>quote-tata-cap-v2.pdf</strong>.
                          <br /><br />
                          Can we schedule a 10-minute briefing today at 3:30 PM?
                        </p>
                        <div className="chat-meta-row">
                          <span className="chat-timestamp">11:43 AM</span>
                          <span className="double-blue-tick">&#10004;&#10004;</span>
                        </div>
                      </div>
                    )}

                    {!chatSent && (
                      <div className="chat-waiting-state">
                        <span>Waiting for your trigger on the left...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FIELD GPS & ATTENDANCE */}
          {activeTab === 'field' && (
            <div className="sandbox-content-pane field-pane">
              <div className="sandbox-pane-instructions">
                <div className="instruction-badge">💡 Try It:</div>
                <span>Toggle <strong>&quot;Client Site Geofence Verification&quot;</strong> to test how mobile GPS prevents fake attendance claims.</span>
              </div>

              <div className="field-sandbox-grid">
                <div className="field-controls-card">
                  <h4 className="field-card-title">Field Representative Check-in</h4>
                  <p className="field-card-subtitle">Real-time mobile punch register with location accuracy</p>

                  <div className="field-status-box">
                    <div className="field-row">
                      <span className="f-label">Executive:</span>
                      <strong className="f-val">Rahul Sharma (Sr. Field Executive)</strong>
                    </div>
                    <div className="field-row">
                      <span className="f-label">Assigned Client Site:</span>
                      <strong className="f-val">L&amp;T Realty Tech Park, Powai, Mumbai</strong>
                    </div>
                    <div className="field-row">
                      <span className="f-label">GPS Geofence Radius:</span>
                      <strong className="f-val">50 meters allowed</strong>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className={`btn-gps-punch ${gpsPunched ? 'punched' : ''}`}
                    onClick={handleSimulateGps}
                  >
                    <MapPin size={18} />
                    <span>{gpsPunched ? 'Check-in Verified (Click to Reset)' : 'Punch-In at Client Site (Simulate GPS)'}</span>
                  </button>

                  {gpsPunched && (
                    <div className="gps-verified-callout">
                      <CheckCircle2 size={18} color="#10b981" />
                      <div>
                        <strong>Geofence Match Verified (14m from site)</strong>
                        <span>Selfie stamped &bull; Battery level 84% &bull; Punch time 10:14 AM</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="field-map-card">
                  <div className="mock-map-bg">
                    <div className="map-geofence-ring">
                      <div className="map-pin-target">
                        <MapPin size={28} color="#ea580c" />
                        <span className="pin-label">Client HQ</span>
                      </div>
                      {gpsPunched && (
                        <div className="map-rep-marker pulse-rep">
                          <UserCheck size={18} color="#10b981" />
                          <span className="rep-label">Rahul (Present)</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="map-footer-audit">
                    <span>Coordinates: <strong>19.1176° N, 72.9060° E</strong></span>
                    <span className="green-text">100% Tamper Proof Audit Log</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REAL-TIME BI & QUOTAS */}
          {activeTab === 'bi' && (
            <div className="sandbox-content-pane bi-pane">
              <div className="sandbox-pane-instructions">
                <div className="instruction-badge">💡 Executive Intelligence:</div>
                <span>Live dashboard with zero manual reporting. See monthly target achievement and top floor performers.</span>
              </div>

              <div className="bi-sandbox-grid">
                {/* Meter card */}
                <div className="bi-stat-card">
                  <span className="bi-card-title">Monthly Quota Achievement</span>
                  <div className="bi-progress-meter">
                    <div className="bi-meter-numbers">
                      <span className="bi-current">₹3.84 Cr Closed</span>
                      <span className="bi-target">Target: ₹4.80 Cr</span>
                    </div>
                    <div className="bi-progress-track">
                      <div className="bi-progress-fill" style={{ width: '80%' }}>
                        <span className="progress-flag">80% Achieved</span>
                      </div>
                    </div>
                  </div>
                  <div className="bi-meter-sub">
                    <span>Forecasted Month-End: <strong>₹5.10 Cr (106% of Goal)</strong></span>
                  </div>
                </div>

                {/* Leaderboard card */}
                <div className="bi-stat-card">
                  <span className="bi-card-title">Top Sales Floor Performers</span>
                  <div className="bi-leaderboard-list">
                    <div className="leader-row rank-1">
                      <span className="rank-badge">👑 1</span>
                      <div className="leader-info">
                        <strong>Pooja Kapri</strong>
                        <span>34 Deals &bull; Customer Champion</span>
                      </div>
                      <span className="leader-val">₹94.2 Lakh</span>
                    </div>
                    <div className="leader-row rank-2">
                      <span className="rank-badge">2</span>
                      <div className="leader-info">
                        <strong>Prince Tiwari</strong>
                        <span>28 Deals &bull; High Velocity</span>
                      </div>
                      <span className="leader-val">₹78.5 Lakh</span>
                    </div>
                    <div className="leader-row rank-3">
                      <span className="rank-badge">3</span>
                      <div className="leader-info">
                        <strong>Ananya Sharma</strong>
                        <span>22 Deals &bull; Enterprise Accounts</span>
                      </div>
                      <span className="leader-val">₹64.0 Lakh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer inside window */}
          <div className="sandbox-bottom-banner">
            <div className="banner-text">
              <strong>Impressed by the speed?</strong>
              <span>Get your entire team onboarded in under 15 minutes with our guided setup.</span>
            </div>
            <div className="banner-actions">
              <button 
                type="button" 
                className="btn-sandbox-demo"
                onClick={onOpenDemo}
              >
                Book Guided 1-on-1 Demo <ArrowRight size={15} />
              </button>
              <button 
                type="button" 
                className="btn-sandbox-trial"
                onClick={() => onOpenTrial('Professional')}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
