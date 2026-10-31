import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users
} from 'lucide-react';

const views = [
  {
    id: 'manager',
    label: 'Sales manager',
    eyebrow: 'SEE THE BIG PICTURE',
    title: 'Know where revenue is stuck before the month ends.',
    detail: 'An example manager view of pipeline health, team activity, and the next decision that matters.',
    icon: BarChart3,
    accent: 'blue',
    metrics: [
      ['₹4.80 Cr', 'active pipeline', '+18.4%'],
      ['68', 'team members', '12 active now'],
      ['92%', 'follow-ups on time', 'healthy']
    ],
    stages: [
      ['New leads', '1,248', 88],
      ['Qualified', '504', 62],
      ['Proposal sent', '168', 42],
      ['Won this month', '48', 24]
    ]
  },
  {
    id: 'field',
    label: 'Field team',
    eyebrow: 'KEEP EVERY VISIT MOVING',
    title: 'Turn every site visit into a visible next step.',
    detail: 'An example field view connecting GPS activity, customer notes, tasks, and approvals.',
    icon: MapPin,
    accent: 'teal',
    metrics: [
      ['28', 'sites visited', 'today'],
      ['146', 'tasks completed', '+24%'],
      ['100%', 'visit notes synced', 'live']
    ],
    stages: [
      ['Visits planned', '86', 82],
      ['Checked in', '64', 66],
      ['Notes captured', '58', 53],
      ['Next actions', '42', 38]
    ]
  },
  {
    id: 'founder',
    label: 'Business owner',
    eyebrow: 'GROW WITH CONFIDENCE',
    title: 'Replace scattered updates with one shared view.',
    detail: 'An example owner view of the numbers, conversations, and people behind sales activity.',
    icon: Users,
    accent: 'navy',
    metrics: [
      ['₹18.2 L', 'won this month', '+32%'],
      ['3.4×', 'return on follow-up', 'tracked'],
      ['15 min', 'to go live', 'guided']
    ],
    stages: [
      ['Leads captured', '312', 90],
      ['Conversations', '228', 72],
      ['Deals moving', '94', 48],
      ['Revenue won', '31', 28]
    ]
  }
];

export default function RevenueControlRoomSection({ onOpenDemo }) {
  const [activeView, setActiveView] = useState('manager');
  const view = views.find(item => item.id === activeView) || views[0];
  const Icon = view.icon;

  return (
    <section className="revenue-control-room" aria-labelledby="revenue-control-room-title">
      <div className="revenue-control-room-header">
        <span className="revenue-control-room-kicker">YOUR SALES, IN ONE FRAME</span>
        <h2 id="revenue-control-room-title">
          Stop collecting updates.
          <br />
          <span>Start seeing momentum.</span>
        </h2>
        <p>See how SalesAvatar can present the same customer story differently for each role.</p>
      </div>

      <div className="revenue-control-room-shell">
        <div className="revenue-control-room-tabs" role="tablist" aria-label="SalesAvatar role views">
          {views.map(item => {
            const TabIcon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                role="tab"
                aria-selected={activeView === item.id}
                className={activeView === item.id ? 'is-active' : ''}
                onClick={() => setActiveView(item.id)}
              >
                <TabIcon size={15} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className={`revenue-control-room-panel revenue-control-room-panel-${view.accent}`} key={view.id}>
          <div className="revenue-control-room-copy">
            <span className="revenue-control-room-eyebrow">{view.eyebrow}</span>
            <h3>{view.title}</h3>
            <p>{view.detail}</p>
            <div className="revenue-control-room-proof">
              <CheckCircle2 size={16} />
              <span>One connected workspace. Zero status-chasing.</span>
            </div>
            <button type="button" className="revenue-control-room-cta" onClick={onOpenDemo}>
              See your team in motion <ArrowRight size={16} />
            </button>
          </div>

          <div className="revenue-control-room-dashboard" aria-label={`${view.label} CRM dashboard preview`}>
            <div className="revenue-dashboard-topbar">
              <span className="revenue-dashboard-brand"><Icon size={15} /> SalesAvatar</span>
              <span className="revenue-dashboard-live"><i></i> Sample data</span>
            </div>
            <div className="revenue-dashboard-metrics">
              {view.metrics.map(([value, label, trend]) => (
                <div className="revenue-dashboard-metric" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                  <small>{trend}</small>
                </div>
              ))}
            </div>
            <div className="revenue-dashboard-chart">
              <div className="revenue-dashboard-chart-heading">
                <span>Sales momentum</span>
                <span>Last 30 days</span>
              </div>
              <div className="revenue-dashboard-bars">
                {view.stages.map(([label, value, width], index) => (
                  <div className="revenue-dashboard-bar-row" key={label}>
                    <span>{label}</span>
                    <div><i style={{ '--bar-width': `${width}%`, '--bar-delay': `${index * 100}ms` }}></i></div>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="revenue-dashboard-footer">
              <span><MessageCircle size={13} /> Conversations connected</span>
              <span><ShieldCheck size={13} /> Role based access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
