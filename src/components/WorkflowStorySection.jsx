import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, MapPin, MessageSquareText, TrendingUp, Clock3, UserRound, Phone, CalendarCheck, CircleDollarSign } from 'lucide-react';

const workflowSteps = [
  {
    icon: MessageSquareText,
    label: '01 / Capture',
    title: 'Every inquiry starts with a clear next step.',
    detail: 'Route leads from forms, WhatsApp, and campaigns to the right owner automatically.',
    color: 'blue'
  },
  {
    icon: TrendingUp,
    label: '02 / Progress',
    title: 'Every deal has momentum you can see.',
    detail: 'Move opportunities through a shared pipeline while managers see what needs attention.',
    color: 'teal'
  },
  {
    icon: MapPin,
    label: '03 / Close',
    title: 'Every visit comes back to the same customer story.',
    detail: 'Connect field activity, follow-ups, approvals, and revenue in one operating rhythm.',
    color: 'navy'
  }
];

export default function WorkflowStorySection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const rotationTimer = window.setInterval(() => {
      setActiveStep((currentStep) => (currentStep + 1) % workflowSteps.length);
    }, 4200);
    return () => window.clearInterval(rotationTimer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const pauseRotation = () => section.classList.add('is-paused');
    const resumeRotation = () => section.classList.remove('is-paused');
    section.addEventListener('mouseenter', pauseRotation);
    section.addEventListener('mouseleave', resumeRotation);
    section.addEventListener('focusin', pauseRotation);
    section.addEventListener('focusout', resumeRotation);
    return () => {
      section.removeEventListener('mouseenter', pauseRotation);
      section.removeEventListener('mouseleave', resumeRotation);
      section.removeEventListener('focusin', pauseRotation);
      section.removeEventListener('focusout', resumeRotation);
    };
  }, []);

  return (
    <section ref={sectionRef} className="workflow-story-section" aria-labelledby="workflow-story-title">
      <div className="workflow-story-intro">
        <span className="workflow-story-kicker">MAKE SALES WORK FLOW</span>
        <h2 id="workflow-story-title">
          From first inquiry <span>to next win.</span>
        </h2>
        <p>One connected rhythm for every person, deal, and customer conversation.</p>
        <div className="workflow-story-scroll-cue" aria-live="polite">
          <ArrowDown size={16} />
          <span>Auto-playing workflow</span>
        </div>
      </div>

      <div className="workflow-story-track" ref={trackRef}>
        {workflowSteps.map(({ icon: Icon, label, title, detail, color }, index) => (
          <article className={`workflow-story-panel workflow-story-panel-${color} ${activeStep === index ? 'is-active' : ''}`} data-step-index={index} key={label} aria-hidden={activeStep !== index}>
            <div className="workflow-story-panel-copy">
              <span className="workflow-story-label">{label}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <div className="workflow-story-proof">
                <CheckCircle2 size={16} />
                <span>Connected to your sales workspace</span>
              </div>
            </div>
            <div className="workflow-story-visual" aria-label={`Illustrative ${label.toLowerCase()} workflow preview`}>
              <span className="workflow-floating-chip workflow-floating-chip-top">
                <span className="workflow-chip-dot"></span>
                Live sync
              </span>
              <div className="workflow-story-window">
                <div className="workflow-story-window-top">
                  <span></span><span></span><span></span>
                  <small>{index === 0 ? 'Lead inbox' : index === 1 ? 'Deal pipeline' : 'Field activity'}</small>
                </div>
                <div className="workflow-story-window-body">
                  <div className="workflow-story-icon"><Icon size={22} /></div>
                  <strong>{index === 0 ? 'New lead assigned' : index === 1 ? 'Deal moved forward' : 'Visit logged successfully'}</strong>
                  <span className="workflow-story-sample-label">Example workflow</span>
                  {index === 0 && (
                    <div className="workflow-activity-list">
                      <div className="workflow-activity-row"><span className="workflow-activity-icon"><UserRound size={13} /></span><span><b>Priya Sharma</b><small>Residential enquiry · Website</small></span><em>New</em></div>
                      <div className="workflow-activity-row"><span className="workflow-activity-icon whatsapp">W</span><span><b>WhatsApp follow-up</b><small>Next action · Today, 2:30 PM</small></span><Clock3 size={14} /></div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="workflow-pipeline-preview">
                      <div><small>QUALIFIED</small><strong>12 deals</strong><span style={{ '--progress': '72%' }}></span></div>
                      <ArrowRight size={16} />
                      <div className="workflow-pipeline-next"><small>PROPOSAL</small><strong>₹8.4L</strong><span style={{ '--progress': '48%' }}></span></div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="workflow-visit-preview">
                      <div className="workflow-visit-map"><span className="workflow-map-route"></span><span className="workflow-map-pin"><MapPin size={15} /></span><span className="workflow-map-pulse"></span></div>
                      <div className="workflow-visit-details"><span><CalendarCheck size={14} /> Visit checked in</span><b>Bharat Eco Fuels · Noida</b><small>Notes saved · Follow-up scheduled</small></div>
                    </div>
                  )}
                  <div className="workflow-story-action">
                    <span>{index === 0 ? 'Owner: Aditi Verma' : index === 1 ? 'Acme Industries · ₹4.8L' : 'Next action: follow-up call'}</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
                <span className="workflow-floating-chip workflow-floating-chip-bottom">
                  <CheckCircle2 size={12} />
                  {index === 0 ? 'Auto-assigned' : index === 1 ? 'On track' : 'Revenue linked'}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
