import React, { useEffect, useState } from 'react';
import { ArrowRight, Bell, Check, CheckCircle2, CircleDollarSign, Clock3, MapPin, MessageSquareText, Pause, Play, TrendingUp, UserRound, Users } from 'lucide-react';

const moments = [
  { id: 'capture', step: '01', label: 'New lead assigned', title: 'A new inquiry finds its owner.', detail: 'Priya Sharma · Residential enquiry', action: 'Assigned to Aditi Verma', status: 'Owner assigned', icon: MessageSquareText, badge: 'PS' },
  { id: 'progress', step: '02', label: 'Follow-up created', title: 'The next action is already clear.', detail: 'Qualified opportunity · Proposal stage', action: 'Call reminder · Today, 2:30 PM', status: 'Task scheduled', icon: TrendingUp, badge: 'AI' },
  { id: 'field', step: '03', label: 'Visit synced', title: 'The field update reaches the whole team.', detail: 'Bharat Eco Fuels · Noida', action: 'Visit notes synced to account', status: 'Customer updated', icon: MapPin, badge: 'BF' }
];

export default function CrmLiveDemoSection({ onOpenDemo }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || document.hidden) return undefined;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % moments.length), 2200);
    const onVisibility = () => {
      if (!document.hidden) setActive((index) => (index + 1) % moments.length);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [paused, reducedMotion]);

  const moment = moments[active];
  const MomentIcon = moment.icon;

  return (
    <section className="crm-live-demo" aria-labelledby="crm-live-demo-title">
      <div className="crm-live-demo-inner">
        <div className="crm-live-demo-copy">
          <span className="crm-live-demo-kicker"><span className="crm-live-dot" /> CRM IN MOTION</span>
          <h2 id="crm-live-demo-title">Watch one customer journey <span>come together.</span></h2>
          <p>From the first inquiry to a field visit, keep every handoff visible in one sales workspace.</p>
          <div className="crm-live-demo-actions">
            <button type="button" className="crm-live-demo-cta" onClick={onOpenDemo}>See it with your workflow <ArrowRight size={16} /></button>
            <button type="button" className="crm-live-demo-pause" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
              {paused ? <Play size={14} /> : <Pause size={14} />}{paused ? 'Play preview' : 'Pause preview'}
            </button>
          </div>
          <div className="crm-live-demo-dots" role="tablist" aria-label="CRM workflow scenes">
            {moments.map((item, index) => <button key={item.id} type="button" role="tab" aria-label={`Show ${item.label}`} aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => { setActive(index); setPaused(true); }} />)}
          </div>
        </div>

        <div className={`crm-live-demo-stage scene-${moment.id}`} aria-live="polite">
          <div className="crm-demo-orbit crm-demo-orbit-one" />
          <div className="crm-demo-orbit crm-demo-orbit-two" />
          <div className="crm-demo-window">
            <div className="crm-demo-topbar"><div className="crm-demo-brand"><span className="crm-demo-brand-icon"><TrendingUp size={14} /></span> SalesAvatar</div><span className="crm-demo-top-status"><i /> Workspace preview</span><Bell size={15} /></div>
            <div className="crm-demo-content">
              <aside className="crm-demo-sidebar"><span className="crm-demo-side-active"><Users size={14} /> Leads</span><span><TrendingUp size={14} /> Pipeline</span><span><MapPin size={14} /> Field visits</span><span><MessageSquareText size={14} /> Activities</span></aside>
              <div className="crm-demo-main">
                <div className="crm-demo-main-head"><div><small>SALES WORKSPACE / PIPELINE OVERVIEW</small><h3>One workspace. Every sales move.</h3></div><span className="crm-demo-sample">Sample data</span></div>
                <div className="crm-demo-customer-card">
                  <div className="crm-demo-avatar">PS</div><div className="crm-demo-customer"><strong>Priya Sharma</strong><span>Residential enquiry · Website</span></div><span className="crm-demo-stage-chip">{active === 0 ? 'New lead' : active === 1 ? 'Proposal' : 'Visit logged'}</span>
                </div>
                <div className="crm-demo-journey">
                  <div className={`crm-demo-journey-step ${active >= 0 ? 'done' : ''}`}><span><Check size={12} /></span><div><b>Inquiry received</b><small>Website form · 10:42 AM</small></div></div>
                  <div className={`crm-demo-journey-step ${active >= 1 ? 'done' : ''}`}><span>{active >= 1 ? <Check size={12} /> : <UserRound size={12} />}</span><div><b>{active === 0 ? 'Assigned to Aditi' : 'Proposal follow-up'}</b><small>{active === 0 ? 'Owner set automatically' : 'Next action · Today, 2:30 PM'}</small></div></div>
                  <div className={`crm-demo-journey-step ${active >= 2 ? 'done' : ''}`}><span>{active >= 2 ? <Check size={12} /> : <MapPin size={12} />}</span><div><b>{active === 2 ? 'Visit checked in' : 'Customer visit'}</b><small>{active === 2 ? 'Noida · Notes synced' : 'Planned · Customer location'}</small></div></div>
                </div>
                <div className="crm-demo-bottom"><span><Clock3 size={13} /> {moment.detail}</span><span className="crm-demo-linked"><CheckCircle2 size={13} /> Customer record updated</span></div>
              </div>
            </div>
          </div>
          <div className="crm-demo-action-card" key={moment.id}>
            <div className="crm-demo-action-card-top"><span className="crm-demo-action-kicker"><i /> CRM AUTOMATION</span><span className="crm-demo-step-count">{moment.step} / 03</span></div>
            <div className="crm-demo-action-person"><span className={`crm-demo-action-avatar crm-demo-action-avatar-${moment.id}`}>{moment.badge}</span><span><b>{moment.label}</b><small>{moment.detail}</small></span></div>
            <div className="crm-demo-action-result"><span className="crm-demo-action-check"><Check size={12} /></span><span>{moment.action}</span><span className="crm-demo-done-pill">Done</span></div>
          </div>
          <div className="crm-demo-floating crm-demo-floating-bottom"><CircleDollarSign size={15} /><span>Every handoff stays connected</span></div>
        </div>
      </div>
    </section>
  );
}
