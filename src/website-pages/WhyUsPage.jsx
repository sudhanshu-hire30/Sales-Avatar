import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import usePageSeo from "../utils/usePageSeo";
import {
  Sparkles,
  Check,
  X,
  ArrowRight,
  Building2,
  Landmark,
  Truck,
  Laptop,
  Target,
  Factory,
  Store,
} from "lucide-react";
import HowItWorksSection from "../components/HowItWorksSection";

export default function WhyUsPage({ onOpenTrial, onOpenDemo }) {
  usePageSeo({
    title: "Why Choose SalesAvatar — Built for High-Growth Indian Sales Teams",
    description:
      "See why Indian companies choose SalesAvatar over spreadsheets and clunky foreign ERPs. Instant 15-min setup, mobile GPS attendance, native WhatsApp, and zero consultants.",
    keywords:
      "why choose salesavatar, CRM vs excel, best Indian CRM, affordable enterprise CRM, sales team software India",
    canonicalPath: "/why-us",
  });

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("highlight-pulse");
          setTimeout(() => el.classList.remove("highlight-pulse"), 2500);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const industries = [
    {
      id: "manufacturing",
      title: "Manufacturing & Distribution",
      icon: Factory,
      color: "#06b6d4",
      bgLight: "#ecfeff",
      tagline: "Supply chain pipelines, plant visits & bulk orders",
      points: [
        "Multi-tier dealer & sub-dealer network order tracking",
        "Material dispatch coordination and plant order milestone logs",
        "Consignment lead conversion and repeat bulk ordering cadences",
      ],
    },
    {
      id: "real-estate",
      title: "Real Estate & Property Developers",
      icon: Building2,
      color: "#2563eb",
      bgLight: "#eff6ff",
      tagline: "High volume leads & project site visits",
      points: [
        "Instant distribution of portal leads (99acres, MagicBricks, Housing)",
        "Site visit check-in verification via rep selfie and GPS coordinates",
        "Broker commission ledger and channel partner tracking",
      ],
    },
    {
      id: "field",
      title: "Field Sales & FMCG Distribution",
      icon: Truck,
      color: "#f97316",
      bgLight: "#fff7ed",
      tagline: "Retailer visits, route tracking & attendance",
      points: [
        "Geofenced shop attendance check-in with offline support",
        "Automated conveyance distance calculation for accurate travel allowances",
        "Stock requirement capture and direct distributor order booking",
      ],
    },
    {
      id: "dealerships",
      title: "Traders & Wholesale Dealerships",
      icon: Store,
      color: "#eab308",
      bgLight: "#fefce8",
      tagline: "Credit limits, inventory requisitions & trade inquiries",
      points: [
        "Quick wholesale order quotes with volume price tiers",
        "Credit limit alerts and outstanding payment collection reminders",
        "Multi-branch inventory lookup during client negotiation",
      ],
    },
    {
      id: "b2b",
      title: "B2B Tech & Corporate Services",
      icon: Laptop,
      color: "#10b981",
      bgLight: "#ecfdf5",
      tagline: "Long sales cycles & consultative proposals",
      points: [
        "Visual deal velocity pipeline tracking high-ticket multi-stage deals",
        "Custom proposal tracking and revision management with client notes",
        "Weighted quarterly ARR forecast models for executive leadership",
      ],
    },
    {
      id: "bfsi",
      title: "Banking, Financial Services & Insurance",
      icon: Landmark,
      color: "#ea580c",
      bgLight: "#fff7ed",
      tagline: "Strict regulatory compliance & customer verification",
      points: [
        "Indian DPDP Act compliant local cloud storage with encrypted fields",
        "Multi-stage loan & policy application tracking with document uploads",
        "Strict role-based hierarchy controls between branch and regional heads",
      ],
    },
  ];

  const industryActionLabels = {
    manufacturing: "Deploy for Manufacturing",
    "real-estate": "Deploy for Real Estate",
    field: "Deploy for Field Teams",
    dealerships: "Deploy for Wholesale",
    b2b: "Deploy for B2B Services",
    bfsi: "Deploy for BFSI",
  };

  return (
    <div className="subpage-view why-us-page">
      {/* Subpage Header Banner */}
      <section className="subpage-hero-banner">
        <div className="subpage-hero-split-container">
          {/* Left Column: Headline & CTA */}
          <div className="subpage-hero-left">
            <div className="section-pill-badge blue">
              <Sparkles size={13} />
              <span>THE SUBSCRIPTION ADVANTAGE</span>
            </div>
            <h1 className="subpage-hero-title">
              Why Buy Complex CRM Licenses <br />
              <span className="gradient-text">
                When You Can Rent What You Need?
              </span>
            </h1>
            <p className="subpage-hero-subtitle">
              A multi-tenant SaaS platform offering cloud CRM modules with
              flexible subscriptions, secure data isolation, and instant
              onboarding.
            </p>

            <div className="subpage-hero-checks">
              <div className="subpage-check-item">
                <Check size={14} color="#10b981" />
                <span>Zero Infrastructure Capex</span>
              </div>
              <div className="subpage-check-item">
                <Check size={14} color="#10b981" />
                <span>Multi-Tenant Data Privacy</span>
              </div>
              <div className="subpage-check-item">
                <Check size={14} color="#10b981" />
                <span>Monthly & Annual Rental Terms</span>
              </div>
            </div>

            <div className="subpage-hero-cta-row">
              <button
                type="button"
                className="btn-subpage-primary"
                onClick={() => onOpenTrial("Professional")}
              >
                Get Started <ArrowRight size={16} />
              </button>
              <Link to="/crm-tour" className="btn-subpage-ghost">
                Full Product Tour
              </Link>
            </div>
          </div>

          {/* Right Column: Visual ROI Comparison Card */}
          <div className="subpage-hero-right">
            <div className="hero-preview-glass-card">
              <div className="preview-card-header">
                <div className="preview-header-left">
                  <span className="live-pulse-dot" />
                  <span className="preview-header-title">
                    Platform Transformation Impact
                  </span>
                </div>
                <span className="preview-header-badge">Verified ROI</span>
              </div>

              <div className="preview-stream-list">
                <div
                  className="stream-item"
                  style={{ background: "#fef2f2", borderColor: "#fecaca" }}
                >
                  <div
                    className="stream-icon-box"
                    style={{ background: "#fee2e2", color: "#ef4444" }}
                  >
                    <X size={16} />
                  </div>
                  <div className="stream-content">
                    <div className="stream-title-row">
                      <b style={{ color: "#991b1b" }}>The Legacy CRM Way</b>
                    </div>
                    <span className="stream-sub">
                      36 hr delayed responses &bull; 25% lost deals on employee
                      exits &bull; Disconnected sheets
                    </span>
                  </div>
                </div>

                <div
                  className="stream-item"
                  style={{ background: "#ecfdf5", borderColor: "#a7f3d0" }}
                >
                  <div
                    className="stream-icon-box"
                    style={{ background: "#d1fae5", color: "#059669" }}
                  >
                    <Check size={16} />
                  </div>
                  <div className="stream-content">
                    <div className="stream-title-row">
                      <b style={{ color: "#065f46" }}>
                        The SalesAvatar Active Way
                      </b>
                    </div>
                    <span className="stream-sub">
                      88 sec auto-routing &bull; 100% centralized company data
                      &bull; GPS verified attendance
                    </span>
                    <span className="stream-revenue-pill">
                      +48% Quarterly ARR Growth
                    </span>
                  </div>
                </div>

                <div
                  className="stream-item"
                  style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}
                >
                  <div
                    className="stream-icon-box"
                    style={{ background: "#dbeafe", color: "#2563eb" }}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div className="stream-content">
                    <div className="stream-title-row">
                      <b style={{ color: "#1e40af" }}>
                        Flexible On-Demand Rental
                      </b>
                    </div>
                    <span className="stream-sub">
                      Zero server capex &bull; 100% Indian cloud data isolation
                      &bull; Live in 15 mins
                    </span>
                    <span
                      className="stream-revenue-pill"
                      style={{ color: "#1d4ed8", background: "#dbeafe" }}
                    >
                      Instant ROI From Day 1
                    </span>
                  </div>
                </div>
              </div>

              <div className="preview-card-bottom-stats">
                <div className="bottom-stat-col">
                  <b>3.4x</b>
                  <span>Speed to Contact</span>
                </div>
                <div className="bottom-stat-col">
                  <b>0%</b>
                  <span>Lead Drops</span>
                </div>
                <div className="bottom-stat-col">
                  <b>15 Mins</b>
                  <span>Floor Onboarding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 ROI Metric Cards */}
      <section className="why-metrics-section">
        <div className="why-metrics-container">
          <div className="why-metrics-grid">
            <div className="metric-card">
              <span className="metric-number">3.4x</span>
              <h4 className="metric-label">Faster Lead Response</h4>
              <p className="metric-sub">
                Automated round-robin eliminates 48-hour delays and connects
                reps in under 3 minutes.
              </p>
            </div>
            <div className="metric-card">
              <span className="metric-number">+42%</span>
              <h4 className="metric-label">Higher Deal Closure</h4>
              <p className="metric-sub">
                Automated WhatsApp cadences ensure warm opportunities never slip
                through cracks.
              </p>
            </div>
            <div className="metric-card">
              <span className="metric-number">100%</span>
              <h4 className="metric-label">Field Accountability</h4>
              <p className="metric-sub">
                GPS attendance and geofenced client visits provide complete
                executive transparency.
              </p>
            </div>
            <div className="metric-card">
              <span className="metric-number">3 Hrs</span>
              <h4 className="metric-label">Saved Daily Per Rep</h4>
              <p className="metric-sub">
                Zero manual reporting. Daily summary logs and payroll slips
                generate automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Head to Head Comparison */}
      <section className="why-compare-section">
        <div className="why-compare-container">
          <div className="section-center-header">
            <div className="section-pill-badge purple">
              <Target size={13} />
              <span>THE DIFFERENCE</span>
            </div>
            <h2 className="section-main-title">
              Legacy CRM vs The SalesAvatar Way
            </h2>
            <p className="section-main-subtitle">
              Why high-velocity Indian sales organizations are modernizing their
              tech stack.
            </p>
          </div>

          <div className="compare-two-columns">
            {/* The Old Way */}
            <div className="compare-column old-way">
              <div className="compare-col-header">
                <span className="col-status-badge red">
                  THE TRADITIONAL WAY
                </span>
                <h3>Complex & Clunky CRMs</h3>
                <p>Designed for accounting, not for active sales reps.</p>
              </div>
              <ul className="compare-list">
                <li>
                  <X size={18} color="#ef4444" />
                  <span>
                    Manual lead typing that reps procrastinate on for days
                  </span>
                </li>
                <li>
                  <X size={18} color="#ef4444" />
                  <span>Leads forgotten in spreadsheets when reps resign</span>
                </li>
                <li>
                  <X size={18} color="#ef4444" />
                  <span>
                    No idea if field reps actually visited client sites
                  </span>
                </li>
                <li>
                  <X size={18} color="#ef4444" />
                  <span>Sales reps feel micromanaged without recognition</span>
                </li>
                <li>
                  <X size={18} color="#ef4444" />
                  <span>
                    3 to 5 days wasted every month computing commission slips
                  </span>
                </li>
              </ul>
            </div>

            {/* The SalesAvatar Way */}
            <div className="compare-column new-way">
              <div className="compare-col-header">
                <span className="col-status-badge green">
                  THE SALESAVATAR WAY
                </span>
                <h3>Active Revenue Acceleration</h3>
                <p>
                  Designed to motivate reps and give founders complete clarity.
                </p>
              </div>
              <ul className="compare-list">
                <li>
                  <Check size={18} color="#10b981" />
                  <span>
                    100% automated ingestion from WhatsApp, Ads & Portals
                  </span>
                </li>
                <li>
                  <Check size={18} color="#10b981" />
                  <span>
                    Centralized database that belongs permanently to your
                    company
                  </span>
                </li>
                <li>
                  <Check size={18} color="#10b981" />
                  <span>
                    GPS geo-stamped check-ins with client selfie verification
                  </span>
                </li>
                <li>
                  <Check size={18} color="#10b981" />
                  <span>
                    Live floor leaderboards and monthly Avatar Recognition cup
                  </span>
                </li>
                <li>
                  <Check size={18} color="#10b981" />
                  <span>
                    1-click commission payroll calculation based on verified
                    deals
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Grid */}
      <section className="why-industries-section">
        <div className="why-industries-container">
          <div className="section-center-header">
            <div className="section-pill-badge blue">
              <Building2 size={13} />
              <span>INDUSTRY TAILORED</span>
            </div>
            <h2 className="section-main-title">
              Tailored For Your Industry Workflow
            </h2>
            <p className="section-main-subtitle">
              Pre-configured workflows tailored for the specific demands of
              Indian businesses.
            </p>
          </div>

          <div className="industries-cards-grid">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div key={ind.id} className="industry-box-card" id={ind.id}>
                  <div
                    className="ind-icon-row"
                    style={{ background: ind.bgLight, color: ind.color }}
                  >
                    <Icon size={26} strokeWidth={2.4} />
                  </div>
                  <h3>{ind.title}</h3>
                  <span className="ind-tagline">{ind.tagline}</span>

                  <ul className="ind-points-list">
                    {ind.points.map((pt, i) => (
                      <li key={i}>
                        <Check size={15} color={ind.color} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn-ind-action"
                    onClick={() => onOpenTrial("Business")}
                  >
                    {industryActionLabels[ind.id]} <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Step Framework */}
      <HowItWorksSection />
    </div>
  );
}
