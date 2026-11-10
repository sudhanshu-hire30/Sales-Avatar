import { getAssetUrl } from '../utils/assets';

export const CRM_CATEGORIES = [
  'All Screens',
  'Dashboard & Analytics',
  'Sales & Pipeline',
  'Goals & Recognition',
  'Operations & Sites',
  'Workspace & Chat',
  'HR & Attendance',
  'Settings & Security'
];

export const CRM_SCREENSHOTS = [
  {
    id: 'dashboard-overview',
    file: '6766b2b0-f170-47b7-b227-70f5f2c2d8dc.jpg',
    title: 'Executive Dashboard & Pipeline Funnel',
    category: 'Dashboard & Analytics',
    navItem: 'Dashboard',
    badge: 'Executive Hub',
    description: 'High-altitude command center displaying live pipeline funnel, interest distribution, 6 primary KPI cards, and quick rep check-ins.',
    highlights: [
      '6 Live Metric Cards: New Leads (1,284), Open Pipeline (856), To Call (237), Won (24), Won Value (₹12.8L), Follow-ups (418)',
      'Visual Pipeline Funnel: Real-time lead count breakdown across New, Contacted, Qualified, and Negotiation',
      'Interest Level Donut: Instant visibility into Hot (8%), Warm (24%), and Cold (52%) prospect distribution',
      'One-click morning check-in and automated manager reporting links'
    ]
  },
  {
    id: 'followup-queue',
    file: '96d04885-5c0b-44a5-bfa0-c637795ba64d.jpg',
    title: 'Follow-Up Queue & Calling Action Center',
    category: 'Dashboard & Analytics',
    navItem: 'Dashboard',
    badge: 'Calling Queue',
    description: 'Automated daily follow-up queue that prioritizes overdue prospects, schedule calls, and ensures zero warm leads turn cold.',
    highlights: [
      'Chronological queue separated by Overdue, Due Today, and Upcoming follow-ups',
      'Direct one-click call trigger with pre-filled customer context and past notes',
      'Instant post-call disposition tagging: Hot, Warm, Cold, or Re-schedule',
      'Automatic manager escalation timers when follow-ups exceed SLA limits'
    ]
  },
  {
    id: 'pipeline-analytics',
    file: '83161ec4-f704-4a73-acfc-15e759c7a704.jpg',
    title: 'Executive Analytics & Attribution Reports',
    category: 'Dashboard & Analytics',
    navItem: 'Reports',
    badge: 'BI & Reports',
    description: 'Deep-dive business intelligence analyzing sales conversion velocity, marketing channel attribution, and executive revenue trends.',
    highlights: [
      'Lead acquisition attribution across Meta, Google Ads, Organic Web, and Referrals',
      'Stage drop-off analytics identifying conversion bottlenecks in real time',
      'Monthly sales revenue run-rates and deal velocity forecasts',
      'Exportable CSV and PDF reports for executive management review'
    ]
  },
  {
    id: 'sales-leads-table',
    file: 'ef397b13-affc-4018-9693-fabea53c0aaa.jpg',
    title: 'Leads Directory & Pipeline Stage Tracker',
    category: 'Sales & Pipeline',
    navItem: 'Sales',
    badge: 'Core CRM',
    description: 'Comprehensive 1,248+ leads master directory with stage-by-stage filtering, multi-criteria search, and one-click communication shortcuts.',
    highlights: [
      'Segmented stage tabs: New (216), Contacted (384), Not Connected (305), Interested (124), Quotation Shared (83), Meeting (27)',
      'Quick action icons on every row: Phone Call, WhatsApp Message, Timeline Activity, and Meeting Scheduling',
      'Lead temperature tags: Hot, Warm, Cold, Untagged, and Rotting indicator',
      'Advanced multi-column filtering, bulk owner reassignment, and CSV import/export'
    ]
  },
  {
    id: 'lead-detail-timeline',
    file: '14c4bfbc-4c28-404d-a836-213b1e0d9519.jpg',
    title: 'Customer 360° Profile & Activity Timeline',
    category: 'Sales & Pipeline',
    navItem: 'Sales',
    badge: 'Lead 360°',
    description: 'Complete 360-degree prospect dossier containing contact information, stage progression, call logs, and WhatsApp conversation history.',
    highlights: [
      'Interactive pipeline progress bar with one-click stage advancing and reason logging',
      'Time-stamped audit trail of every phone call, email, site visit, and proposal shared',
      'Custom fields for project budget, Line of Business (LOB), and preferred location',
      'Built-in reminder scheduler and file attachment repository per customer'
    ]
  },
  {
    id: 'deal-approvals',
    file: '58e15603-66c4-4ed6-b47b-44607fc2ac05.jpg',
    title: 'Deal & Won Approvals Authorization Center',
    category: 'Sales & Pipeline',
    navItem: 'Deal approvals',
    badge: 'Governance',
    description: 'Structured approval workflow for high-value contracts, special discount percentages, and closed-won revenue recognition.',
    highlights: [
      'Pending deal review queue with contract value, rep name, and requested margin',
      'One-click manager Approve / Reject actions with required feedback notes',
      'Historical decision trends showing approved vs rejected values over time',
      'Automatic credit attribution to monthly sales quotas upon approval'
    ]
  },
  {
    id: 'executive-goals',
    file: 'a6fccb54-6ca5-44ea-84b8-bad25878ac35.jpg',
    title: 'Executive Targets & Monthly Quota Tracker',
    category: 'Goals & Recognition',
    navItem: 'Goals',
    badge: 'Targets',
    description: 'Company-wide revenue target gauge tracking overall progress against monthly quotas with pacing indicators.',
    highlights: [
      'Top-level target monitoring (e.g. ₹4.80 Crore monthly target milestone)',
      'Visual progress pacing bar (% achieved vs elapsed working days in the month)',
      'Team-wide contribution rankings and forecasted month-end closing value',
      'Automated alerts when the team falls behind target velocity'
    ]
  },
  {
    id: 'rep-monthly-goals',
    file: '458170f7-3746-4bd3-bf4d-054ed44db4bf.jpg',
    title: 'Individual Rep Quotas & Monthly Goals',
    category: 'Goals & Recognition',
    navItem: 'Goals',
    badge: 'Rep Quotas',
    description: 'Granular sales quota allocation per representative with real-time achievement percentages and deal velocity.',
    highlights: [
      'Individual rep target cards with target vs achieved revenue breakdown',
      'Visual progress bars with color-coded on-track, lagging, and exceeded badges',
      'Activity targets for daily calls, customer meetings, and property site visits',
      'Coaching indicators for team leaders to assist underperforming reps'
    ]
  },
  {
    id: 'sales-leaderboard',
    file: '4ceda028-1442-41ba-9b0a-71a7cd784d0b.jpg',
    title: 'Leaderboard & Winner of the Month',
    category: 'Goals & Recognition',
    navItem: 'Workspace',
    badge: 'Gamification',
    description: 'Gamified recognition hub celebrating top closers, revenue champions, and monthly performers to ignite team motivation.',
    highlights: [
      '1st, 2nd, and 3rd place podium with avatar badges and revenue milestones',
      'Revenue Catcher Hall of Fame featuring monthly MVPs',
      'Transparent peer rankings fostering healthy, friendly competition',
      'Deal celebration popups broadcast to the entire sales floor'
    ]
  },
  {
    id: 'project-sites',
    file: 'd5b197d3-4fcf-477a-8e7f-a567647cd704.jpg',
    title: 'Project Sites & Field Handover Tracking',
    category: 'Operations & Sites',
    navItem: 'Project Sites',
    badge: 'Field Ops',
    description: 'Operational tracking for client properties and project sites across a 20-stage journey from site survey to handover.',
    highlights: [
      '28 active project sites monitoring: Survey, Design, Civil Works, Handover',
      'Milestone payment collection tracking (₹1.84+ Crore collected across projects)',
      'Assigned field engineering and site supervision team members',
      'State-wise geographic distribution (Jaipur, Pune, Lucknow, Indore, Nagpur)'
    ]
  },
  {
    id: 'marketing-integrations',
    file: 'd25f846d-e03f-4ced-8e3f-07bef708940e.jpg',
    title: 'Meta (Facebook) Lead Ads & Automation',
    category: 'Operations & Sites',
    navItem: 'Marketing',
    badge: 'Lead Ingestion',
    description: 'Native integration with Meta Facebook & Instagram Lead Ads for zero-latency lead routing and automatic deduplication.',
    highlights: [
      'Direct Meta Graph API webhook connection with fallback polling engine',
      'Configurable duplicate handling: auto-skip, update existing, or notify manager',
      'Conversion API (CAPI) feedback loops to optimize ad campaigns with closed deals',
      'Multi-form mapping to specific sales teams and Line of Business (LOB)'
    ]
  },
  {
    id: 'workspace-chat',
    file: 'ee2dc4a5-06c3-449f-95d2-128827a9e5f9.jpg',
    title: 'Workspace Team Chat & Instant Sync',
    category: 'Workspace & Chat',
    navItem: 'Workspace',
    badge: 'Internal Chat',
    description: 'Built-in collaborative messaging environment enabling sales reps and managers to discuss deals and share files without leaving the CRM.',
    highlights: [
      '1-on-1 direct messaging and department channels with online status dots',
      'Inline sharing of lead cards, proposal PDFs, and pipeline charts',
      'Integrated voice and video call shortcuts for rapid remote team sync',
      'Instant push notifications on both desktop and mobile web'
    ]
  },
  {
    id: 'company-feed',
    file: '0768f219-5d47-49cf-8d6b-ee4cf7eb5024.jpg',
    title: 'Company Social Feed & Milestone Celebrations',
    category: 'Workspace & Chat',
    navItem: 'Workspace',
    badge: 'Culture',
    description: 'Internal social wall highlighting work anniversaries, big deal wins, new joinees, and company-wide notices.',
    highlights: [
      'Automated celebration cards for employee work anniversaries and birthdays',
      'Rich text posting with image attachments for management announcements',
      'Peer comments, likes, and cheer reactions boosting team morale',
      'Company policy updates and holiday circular broadcast'
    ]
  },
  {
    id: 'my-storage',
    file: '08b09b2b-ff0e-4fc5-8749-0e0cf11c37c7.jpg',
    title: 'My Storage & Sales Collateral Cloud Vault',
    category: 'Workspace & Chat',
    navItem: 'Workspace',
    badge: 'Cloud Storage',
    description: 'Secure central repository for sales brochures, rate cards, pitch decks, contract templates, and brand assets.',
    highlights: [
      'Organized folders: Project Files, Meeting Notes, Brand Collateral, Proposals',
      'Quick-attach functionality to send documents via WhatsApp or Email',
      'Encrypted cloud storage with company-isolated permissions',
      'Storage quota tracking with one-click file upload and preview'
    ]
  },
  {
    id: 'attendance-tracking',
    file: 'fd86ccb8-add2-4a4e-a1b4-badb0740a7cd.jpg',
    title: 'Employee Attendance & Daily Punch Log',
    category: 'HR & Attendance',
    navItem: 'HR',
    badge: 'Attendance',
    description: 'Live attendance register displaying punch-in times, late marks, half-days, and on-leave statuses across 49+ employees.',
    highlights: [
      'Daily overview: Present (19), Late (13), Half Day (0), On Leave (0), Not Punched (17)',
      'Exact morning punch-in timestamps and evening punch-out records',
      'Individual monthly attendance calendar view for HR & payroll verification',
      'CSV export ready for seamless payroll and salary processing'
    ]
  },
  {
    id: 'leave-holidays',
    file: '5f70f8a0-c896-46e1-b8eb-4e4c8fa50ad4.jpg',
    title: 'Leave Requests & Holiday Management',
    category: 'HR & Attendance',
    navItem: 'HR',
    badge: 'Leave Portal',
    description: 'Self-service portal for employees to request time off, check remaining leave balances, and view official company holidays.',
    highlights: [
      'Leave balance breakdown across Casual Leave, Sick Leave, and Paid Time Off',
      'Manager approval workflows with automated status notifications',
      'Upcoming company holiday calendar integrated with follow-up scheduler',
      'Leave history log with approval date stamps and audit trails'
    ]
  },
  {
    id: 'hr-letters',
    file: '1e956a08-469a-48e4-b213-e817201bbf43.jpg',
    title: 'HR Letters & Documentation Generator',
    category: 'HR & Attendance',
    navItem: 'HR',
    badge: 'HR Docs',
    description: 'Automated letter generator for drafting official offer letters, appointment orders, and experience certificates on company letterhead.',
    highlights: [
      'Standardized letterhead templates for Offer Letters, Joining, and Experience certs',
      'Dynamic variable replacement (Employee Name, CTC, Designation, Date of Joining)',
      'Digital signature integration and instant PDF download',
      'Central employee document dossier securely archived'
    ]
  },
  {
    id: 'view-team',
    file: 'a95dece7-13d8-4745-b8fd-8469619dbc44.jpg',
    title: 'Team Directory & Reporting Line Hierarchy',
    category: 'Settings & Security',
    navItem: 'View Team',
    badge: 'Org Chart',
    description: 'Organizational hierarchy view displaying 68 team members across 12 team leads with individual won values and overdue tasks.',
    highlights: [
      'Summary metrics: 68 Members, 12 Team Leads, 2,438 Open Leads, ₹18.6L Won Value',
      'Team Lead breakdown with nested team members (e.g. Nova Group with 9 reps)',
      'Real-time overdue follow-up counts per salesperson to maintain accountability',
      'Conversion percentage (% CONV) metrics to benchmark rep effectiveness'
    ]
  },
  {
    id: 'users-and-teams',
    file: '8277f4d8-ed48-4346-86fa-041001f5d072.jpg',
    title: 'Users & Roles Management (RBAC)',
    category: 'Settings & Security',
    navItem: 'View Team',
    badge: 'RBAC',
    description: 'Centralized administration directory to invite staff, assign granular roles, group reps under managers, and toggle account access.',
    highlights: [
      'Role-based permissions: Super Admin, Company Admin, Team Lead, Sales Rep, Coordinator',
      'Active / Disabled employee toggles for instant security offboarding',
      'Manager assignment rules for automated hierarchical lead visibility',
      'Audit log of user creation, password resets, and last login timestamps'
    ]
  },
  {
    id: 'help-tickets',
    file: '2dca9530-7eb3-4771-b115-7c9b13a30cda.jpg',
    title: 'Helpdesk & Customer Support Ticketing',
    category: 'Settings & Security',
    navItem: 'Help & Tickets',
    badge: 'Helpdesk',
    description: 'Multi-tiered customer support and internal IT ticketing hub with priority queuing, assigned agents, and SLA tracking.',
    highlights: [
      'Incoming ticket queue with priority flags: Urgent, High, Normal, Low',
      'Assigned agent tracking with resolution stage and customer contact details',
      'Threaded ticket comments with internal private notes between team members',
      'SLA resolution timers to prevent customer service complaints'
    ]
  },
  {
    id: 'my-profile',
    file: '3ed4f05a-94dc-4952-b3e6-b9f584b377bd.jpg',
    title: 'Personal Profile, Working Hours & Security',
    category: 'Settings & Security',
    navItem: 'Settings',
    badge: 'Account',
    description: 'Individual user account settings to manage profile details, working shift hours, connected devices, and password credentials.',
    highlights: [
      'Personal profile photo, phone number, email, and designation settings',
      'Working hours and shift timing configurations for calendar scheduling',
      'Logged-in devices overview with remote session termination',
      'Two-factor authentication (2FA) and password security management'
    ]
  },
  {
    id: 'master-settings',
    file: 'd5019f16-dda7-4810-af36-1b89b80c2918.jpg',
    title: 'Master CRM Settings & Configuration Hub',
    category: 'Settings & Security',
    navItem: 'Settings',
    badge: 'Admin Hub',
    description: 'Comprehensive configuration cockpit spanning Company Profile, Pipelines, Custom Fields, Access Roles, and Third-Party Integrations.',
    highlights: [
      'Company: Organization profile, branding colors, email service, daily summary schedule',
      'Team & Roles: Users, manager groups, and automated round-robin assignment rules',
      'Fields & Forms: Custom field builder, lead capture rules, meeting options, and junk filters',
      'Sales Pipeline & Integrations: Deal stages, win/loss reasons, WhatsApp, and Meta CAPI'
    ]
  }
];



export function getScreenshotUrl(filename) {
  return getAssetUrl(`images/crm-screens/${filename}`);
}

export function getScreenshotThumbnailUrl(filename) {
  return getAssetUrl(`images/crm-screens-original/${filename}`);
}
