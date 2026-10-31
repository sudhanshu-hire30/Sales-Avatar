import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  CheckSquare, 
  BarChart2, 
  MapPin, 
  Building2, 
  Award, 
  LineChart, 
  ShieldCheck
} from 'lucide-react';

export default function FeaturesQuickBar({ onSelectFeature }) {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 'lead-management',
      title: 'Lead Management',
      subtitle: 'Inbound & Routing',
      color: '#10b981',
      bgLight: '#ecfdf5',
      icon: Users,
      desc: 'Capture inbound leads automatically from website forms, ads, and phone inquiries with instant round-robin auto-assignment and deduplication.'
    },
    {
      id: 'customer-management',
      title: 'Customer 360°',
      subtitle: 'Accounts & History',
      color: '#2563eb',
      bgLight: '#eff6ff',
      icon: Briefcase,
      desc: 'Centralized customer database with complete interaction history, contact persons, past transactions, document attachments, and notes.'
    },
    {
      id: 'followup-tasks',
      title: 'Follow-up Tasks',
      subtitle: 'Reminders & Alerts',
      color: '#f43f5e',
      bgLight: '#fff1f2',
      icon: CheckSquare,
      desc: 'Never miss a prospective client. Automated follow-up task scheduling, reminder alerts, overdue warnings, and manager escalation timers.'
    },
    {
      id: 'sales-pipeline',
      title: 'Sales Pipeline',
      subtitle: 'Visual Kanban Stages',
      color: '#1e40af',
      bgLight: '#eff6ff',
      icon: BarChart2,
      desc: 'Drag-and-drop visual pipeline stages, deal velocity tracking, revenue forecasts, probability weighting, and win/loss reason analysis.'
    },
    {
      id: 'field-officers',
      title: 'Field Officers',
      subtitle: 'GPS & Attendance',
      color: '#10b981',
      bgLight: '#ecfdf5',
      icon: MapPin,
      desc: 'Geo-verified mobile attendance, selfie check-in, real-time client site visits, and automated conveyance travel allowance logging.'
    },
    {
      id: 'dealer-management',
      title: 'Dealers & Network',
      subtitle: 'Distributor Orders',
      color: '#1d4ed8',
      bgLight: '#eff6ff',
      icon: Building2,
      desc: 'Manage dealer and distributor networks, partner order requests, regional territory allocation, and channel partner communications.'
    },
    {
      id: 'sales-targets',
      title: 'Sales Targets',
      subtitle: '& Team Quotas',
      color: '#1d4ed8',
      bgLight: '#eff6ff',
      icon: Award,
      desc: 'Set monthly and quarterly sales quotas, track rep achievement in real time, and incentivize team closers with transparent leaderboards.'
    },
    {
      id: 'reports-analytics',
      title: 'Reports & Analytics',
      subtitle: 'Executive Dashboards',
      color: '#3b82f6',
      bgLight: '#eff6ff',
      icon: LineChart,
      desc: 'Executive summaries, conversion funnel bottlenecks, sales rep performance scorecards, and automated daily exportable reports.'
    },
    {
      id: 'role-permissions',
      title: 'Roles & Security',
      subtitle: 'Multi-Tenant RBAC',
      color: '#0284c7',
      bgLight: '#f0f9ff',
      icon: ShieldCheck,
      desc: 'Multi-tenant architecture with strict data isolation. Role-based authorization for Super Admins, Company Admins, Managers, and Reps.'
    }
  ];

  return (
    <section id="features" className="quick-features-bar">
      <div className="quick-bar-container">
        <div className="quick-bar-scroll" aria-label="SalesAvatar product features">
          <div className="quick-bar-track">
            {[0, 1].map((groupIndex) => (
              <div
                className="quick-bar-group"
                key={`feature-group-${groupIndex}`}
                aria-hidden={groupIndex === 1}
              >
                {features.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedFeature?.id === item.id;
                  return (
                    <div
                      key={`${groupIndex}-${item.id}`}
                      className={`quick-pill-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        const next = isSelected ? null : item;
                        setSelectedFeature(next);
                        if (onSelectFeature) onSelectFeature(next);
                      }}
                      style={{
                        '--pill-accent': item.color,
                        '--pill-bg-light': item.bgLight
                      }}
                    >
                      <div className="quick-pill-icon-box">
                        <Icon size={18} color={item.color} strokeWidth={2.4} />
                      </div>
                      <div className="quick-pill-text">
                        <span className="quick-pill-title">{item.title}</span>
                        <span className="quick-pill-sub">{item.subtitle}</span>
                        <span className="quick-pill-desc">{item.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
