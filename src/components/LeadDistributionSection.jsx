import React, { useState } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Scale, 
  Percent, 
  Building, 
  UserCheck, 
  Zap, 
  Timer 
} from 'lucide-react';

const DISTRIBUTION_METHODS = [
  {
    id: 'round-robin',
    name: 'Round Robin',
    tagline: 'Equal strict rotation',
    icon: RefreshCw,
    color: '#2563eb',
    bgLight: '#eff6ff',
    desc: 'Shares leads out one by one, taking turns in strict sequence.',
    example: 'You have 3 agents: Amit, Priya, Rahul. 6 leads arrive. Amit gets lead 1 and 4, Priya gets 2 and 5, Rahul gets 3 and 6 — 2 each, in strict rotation.',
    bestFor: 'A team of equals where everyone should get the same number of opportunities.',
    badge: '1-by-1 Equal Rotation',
    flow: [
      { agent: 'Amit', leads: ['Lead #1', 'Lead #4'], count: 2 },
      { agent: 'Priya', leads: ['Lead #2', 'Lead #5'], count: 2 },
      { agent: 'Rahul', leads: ['Lead #3', 'Lead #6'], count: 2 }
    ]
  },
  {
    id: 'least-load',
    name: 'Least Load',
    tagline: 'Workload balancing',
    icon: Scale,
    color: '#059669',
    bgLight: '#ecfdf5',
    desc: 'Gives the incoming lead to whichever agent is currently least busy.',
    example: 'Amit already has 40 open leads, Priya has 12, Rahul has 25. The next lead automatically goes to Priya, because she has the fewest. Once Priya catches up, it starts spreading out again.',
    bestFor: 'Keeping workloads even when some agents close or disqualify leads faster than others.',
    badge: 'Dynamic Workload Leveler',
    flow: [
      { agent: 'Amit', open: '40 Open', status: 'Queued' },
      { agent: 'Priya', open: '12 Open', status: 'Next Recipient ✓', highlight: true },
      { agent: 'Rahul', open: '25 Open', status: 'Queued' }
    ]
  },
  {
    id: 'weighted',
    name: 'Weighted %',
    tagline: 'Seniority & capacity shares',
    icon: Percent,
    color: '#1e40af',
    bgLight: '#eff6ff',
    desc: 'Splits leads by custom percentages that you allocate per rep.',
    example: 'You set Amit 50%, Priya 30%, Rahul 20%. Out of the next 100 leads, roughly 50 go to Amit, 30 to Priya, and 20 to Rahul.',
    bestFor: 'Seniors, star performers, or full-time closers who should carry more pipeline than juniors or part-timers.',
    badge: 'Capacity-Weighted Split',
    flow: [
      { agent: 'Amit (Senior Closer)', share: '50%', outOf100: '~50 Leads' },
      { agent: 'Priya (Mid-Level Rep)', share: '30%', outOf100: '~30 Leads' },
      { agent: 'Rahul (Junior Trainee)', share: '20%', outOf100: '~20 Leads' }
    ]
  },
  {
    id: 'team-round-robin',
    name: 'Team Round Robin',
    tagline: 'Territory & portal lock',
    icon: Building,
    color: '#8b5cf6',
    bgLight: '#f5f3ff',
    desc: 'Round robin, but restricted strictly within one designated team or city branch.',
    example: "Your 'Indore Team' has 3 members. You set this rule to the source 99acres. Every 99acres lead rotates between those 3 only — the Bhopal and Pune teams get none of them.",
    bestFor: 'When one team exclusively owns a specific city, project, marketing channel, or portal source.',
    badge: 'Territory-Locked Queue',
    flow: [
      { team: 'Indore Team (99acres)', members: '3 Agents', status: '100% Leads Allocated' },
      { team: 'Bhopal Team', members: '4 Agents', status: '0 Leads (Source Filtered)' },
      { team: 'Pune Team', members: '5 Agents', status: '0 Leads (Source Filtered)' }
    ]
  },
  {
    id: 'fixed-user',
    name: 'Fixed User / Triage',
    tagline: 'Single point of qualification',
    icon: UserCheck,
    color: '#06b6d4',
    bgLight: '#ecfeff',
    desc: 'Sends every matching lead directly to one designated coordinator or receptionist.',
    example: 'Every lead from your website inquiry form goes directly to Neha. She verifies the budget, phone number, and intent, then passes the qualified ones to the sales closers.',
    bestFor: 'A lead triager, receptionist, inbound telecaller, or single point of contact for raw incoming inquiries.',
    badge: 'Single Point of Contact',
    flow: [
      { step: '1. Inbound Form Submit', detail: 'Website Contact / Pricing Form' },
      { step: '2. Dedicated Triager (Neha)', detail: 'Verification, Qualification & Intent Check', highlight: true },
      { step: '3. Closer Assignment', detail: 'Transferred to Closer Pipeline with Complete Notes' }
    ]
  }
];

export default function LeadDistributionSection({ isEmbedded = false }) {
  const [activeDistMethod, setActiveDistMethod] = useState(0);

  const current = DISTRIBUTION_METHODS[activeDistMethod];
  const IconComp = current.icon;

  const content = (
    <div className="distribution-engine-section" id="lead-distribution">
      <div className="dist-engine-header">
            <div className="section-pill-badge purple">
              <Sparkles size={13} color="#1e40af" />
              <span>AUTOMATION &amp; ROUTING ENGINE</span>
            </div>
            <h2 className="dist-main-title">
              How Lead Distribution Works: <br className="dist-br" />
              <span className="gradient-text">The 5 Plain-Language Routing Rules</span>
            </h2>
            <p className="dist-main-sub">
              A visual rule engine that automatically matches incoming leads from Meta, portals (99acres, Housing), and website forms to the right sales reps. Rules run top-to-bottom with automated fallback protection and zero lead leakage.
            </p>
          </div>

          {/* Method Tabs */}
          <div className="dist-methods-tabs" role="tablist" aria-label="Lead Distribution Methods">
            <div className="dist-methods-track">
              {[...DISTRIBUTION_METHODS, ...DISTRIBUTION_METHODS].map((method, index) => {
                const IconComponent = method.icon;
                const methodIndex = index % DISTRIBUTION_METHODS.length;
                const isActive = activeDistMethod === methodIndex;
                const isDuplicate = index >= DISTRIBUTION_METHODS.length;
                return (
                  <button
                    key={`${method.id}-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-hidden={isDuplicate}
                    tabIndex={isDuplicate ? -1 : 0}
                    className={`dist-method-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveDistMethod(methodIndex)}
                  >
                    <div
                      className="tab-icon-box"
                      style={{
                        background: isActive ? method.color : method.bgLight,
                        color: isActive ? '#fff' : method.color
                      }}
                    >
                      <IconComponent size={16} />
                    </div>
                    <div className="tab-text-wrap">
                      <span className="tab-name">{method.name}</span>
                      <span className="tab-tagline">{method.tagline}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Method Deep-Dive Card */}
          <div className="dist-method-card">
            <div className="dist-method-left">
              <div 
                className="method-badge-pill" 
                style={{ 
                  background: current.bgLight, 
                  color: current.color, 
                  borderColor: current.color + '40' 
                }}
              >
                <IconComp size={14} />
                <span>{current.badge}</span>
              </div>
              <h3 className="method-title">{current.name}</h3>
              <p className="method-desc">{current.desc}</p>

              <div className="method-example-box">
                <div className="example-label-row">
                  <span className="example-tag">REAL-WORLD TEAM EXAMPLE</span>
                </div>
                <p className="example-text">{current.example}</p>
              </div>

              <div className="method-best-for-row">
                <span className="best-for-label">Best for:</span>
                <span className="best-for-val">{current.bestFor}</span>
              </div>
            </div>

            <div className="dist-method-right">
              <div className="flow-card-header">
                <span className="flow-title">Active Allocation Simulation</span>
                <span className="flow-status-badge">Automated Rule ✓</span>
              </div>
              <div className="flow-list">
                {current.flow.map((item, fIdx) => (
                  <div key={fIdx} className={`flow-item-box ${item.highlight ? 'highlight' : ''}`}>
                    <div className="flow-item-left">
                      <span className="flow-agent-name">{item.agent || item.team || item.step}</span>
                      <span className="flow-agent-sub">
                        {item.share && `Share: ${item.share}`}
                        {item.leads && `Assigned: ${item.leads.join(', ')}`}
                        {item.open && `Workload: ${item.open}`}
                        {item.members && `Coverage: ${item.members}`}
                        {item.detail && item.detail}
                      </span>
                    </div>
                    <div className="flow-item-right">
                      <span 
                        className="flow-metric-pill" 
                        style={{ background: current.bgLight, color: current.color }}
                      >
                        {item.count ? `${item.count} Leads` : (item.status || item.outOf100 || 'Routed')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2 & Step 3 Advanced Capability Cards */}
          <div className="dist-advanced-grid">
            <div className="dist-advanced-card">
              <div className="adv-card-top">
                <div className="adv-icon-box" style={{ background: '#eff6ff', color: '#1e40af' }}>
                  <Zap size={18} />
                </div>
                <span className="adv-step-badge">STEP 2 &bull; TIMING MODES</span>
              </div>
              <h4 className="adv-title">Instant Routing vs. Top-Up Pool</h4>
              <div className="adv-bullets">
                <div className="adv-bullet-item">
                  <div className="adv-bullet-header">
                    <strong>⚡ Instant Assignment (&lt; 30 sec)</strong>
                    <span className="adv-tag">For Meta / API Leads</span>
                  </div>
                  <p>Assigns the exact second a lead arrives. E.g. A Facebook lead comes in at 3:04 PM — Amit is notified at 3:04 PM to call while the lead is red-hot.</p>
                </div>
                <div className="adv-bullet-item">
                  <div className="adv-bullet-header">
                    <strong>📦 Top-Up From Pool (&ldquo;Hold in Pool&rdquo;)</strong>
                    <span className="adv-tag">For 1,00,000+ Sheets</span>
                  </div>
                  <p>Upload big databases without dumping them on the team. Settings: top up below 10, top up to 30, cap 50/day. Drains at the speed your reps actually dial.</p>
                </div>
              </div>
            </div>

            <div className="dist-advanced-card">
              <div className="adv-card-top">
                <div className="adv-icon-box" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
                  <Timer size={18} />
                </div>
                <span className="adv-step-badge">STEP 3 &bull; SLA PROTECTION</span>
              </div>
              <h4 className="adv-title">&ldquo;Use It or Lose It&rdquo; Auto-Reclaim</h4>
              <div className="adv-bullets">
                <div className="adv-bullet-item">
                  <div className="adv-bullet-header">
                    <strong>⏱️ Automated 24h Idle Reclaim</strong>
                    <span className="adv-tag">Zero Stale Leads</span>
                  </div>
                  <p>An unworked lead moves on instead of going cold. If Amit is given a lead at 10 AM Monday and never touches it, at 10 AM Tuesday it automatically shifts to Priya with full timeline audit logging.</p>
                </div>
                <div className="adv-bullet-item">
                  <div className="adv-bullet-header">
                    <strong>🛡️ Only Active Users Switch</strong>
                    <span className="adv-tag">Dead Inbox Filter</span>
                  </div>
                  <p>Automatically skips disabled or ex-employees. Leads never get stuck in abandoned accounts, and rules run top-to-bottom with designated fallback safety nets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

  if (isEmbedded) {
    return content;
  }

  return (
    <section className="home-distribution-section" id="lead-distribution">
      <div className="section-container">
        {content}
      </div>
    </section>
  );
}
