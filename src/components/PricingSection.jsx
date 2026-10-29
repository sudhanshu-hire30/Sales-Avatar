import React, { useState } from "react";
import {
  Check,
  ArrowRight,
  Zap,
  BarChart2,
  Crown,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";

export default function PricingSection({ onSelectPlan, onOpenEnterprise }) {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'

  const plans = [
    {
      id: "starter",
      name: "Starter",
      tagline: "Up to 5 users & basic CRM",
      icon: Zap,
      monthlyPrice: "₹999",
      yearlyPrice: "₹799",
      yearlyTotal: "₹9,590/yr",
      users: "Up to 5 users",
      storage: "Lead & customer management",
      highlight: "Follow-up reminders & dashboard",
      themeColor: "#10b981",
      bgLight: "#ecfdf5",
      isPopular: false,
    },
    {
      id: "growth",
      name: "Growth",
      tagline: "Up to 10 users & sales pipeline",
      icon: BarChart2,
      monthlyPrice: "₹1,699",
      yearlyPrice: "₹1,359",
      yearlyTotal: "₹16,310/yr",
      users: "Up to 10 users",
      storage: "Visual sales pipeline",
      highlight: "Automated deal stages & alerts",
      themeColor: "#2563eb",
      bgLight: "#eff6ff",
      isPopular: false,
    },
    {
      id: "professional",
      name: "Professional",
      tagline: "Up to 20 users with reports & targets",
      icon: Crown,
      monthlyPrice: "₹2,499",
      yearlyPrice: "₹1,999",
      yearlyTotal: "₹23,990/yr",
      users: "Up to 20 users",
      storage: "Advanced reports & analytics",
      highlight: "Sales targets & role permissions",
      themeColor: "#ea580c",
      bgLight: "#fff7ed",
      isPopular: true,
      popularLabel: "Most Popular",
    },
    {
      id: "business",
      name: "Business",
      tagline: "Up to 50 users & field officer GPS",
      icon: Users,
      monthlyPrice: "₹4,999",
      yearlyPrice: "₹3,999",
      yearlyTotal: "₹47,990/yr",
      users: "Up to 50 users",
      storage: "Field officer & geo-attendance",
      highlight: "Dealer & distributor management",
      themeColor: "#f59e0b",
      bgLight: "#fffbeb",
      isPopular: false,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Custom limits & dedicated workflows",
      icon: Building2,
      monthlyPrice: "Custom pricing",
      yearlyPrice: "Custom pricing",
      yearlyTotal: "",
      users: "Configurable user limits",
      storage: "Optional custom workflows",
      highlight: "Integration & onboarding options",
      themeColor: "#1e293b",
      bgLight: "#f1f5f9",
      isPopular: false,
      isCustom: true,
    },
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        {/* Top Header */}
        <div className="section-center-header">
          <div className="section-pill-badge purple">
            <Zap size={13} color="#ea580c" />
            <span>TRANSPARENT, HONEST PRICING</span>
          </div>
          <h2 className="section-main-title">
            Simple Plans That Grow With Your Sales Team
          </h2>
          <p className="section-main-subtitle">
            Zero hidden fees. Zero implementation charges. Start with what you
            need today, and upgrade seats as your sales force expands.
          </p>

          {/* Monthly / Yearly Switcher */}
          <div className="pricing-toggle-wrap">
            <div
              className="pricing-toggle-pill"
              role="tablist"
              aria-label="Billing cycle selector"
            >
              <button
                type="button"
                role="tab"
                aria-selected={billingCycle === "monthly"}
                className={`toggle-option ${billingCycle === "monthly" ? "active" : ""}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={billingCycle === "yearly"}
                className={`toggle-option ${billingCycle === "yearly" ? "active" : ""}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* 5 Plans Grid */}
        <div className="pricing-grid-5">
          {plans.map((p) => {
            const Icon = p.icon;
            const isYearly = billingCycle === "yearly";
            const price = p.isCustom
              ? "Custom pricing"
              : isYearly
                ? p.yearlyPrice
                : p.monthlyPrice;

            return (
              <div
                key={p.id}
                className={`pricing-card-col ${p.isPopular ? "popular-card" : ""}`}
                style={{ "--plan-color": p.themeColor }}
              >
                {/* Most Popular Top Pill */}
                {p.isPopular && (
                  <div className="popular-pill-tag">
                    <Sparkles size={11} strokeWidth={2.6} />
                    <span>{p.popularLabel}</span>
                  </div>
                )}

                {/* Card Header */}
                <div className="plan-header-block">
                  <div className="plan-header-top">
                    <div
                      className="plan-icon-bubble"
                      style={{ background: p.bgLight, color: p.themeColor }}
                    >
                      <Icon size={19} strokeWidth={2.4} />
                    </div>
                    <h3 className="plan-name">{p.name}</h3>
                  </div>
                  <p className="plan-tagline">{p.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="plan-price-block">
                  <div className="price-main-row">
                    <span
                      className={`plan-amount ${p.isCustom ? "custom-text" : ""}`}
                    >
                      {price}
                    </span>
                    {!p.isCustom && <span className="plan-cadence">/mo</span>}
                  </div>
                  <div className="plan-tax-note">
                    {p.isCustom
                      ? "Tailored to your team size"
                      : isYearly
                        ? `Billed annually (${p.yearlyTotal}) + GST`
                        : "+ 18% GST • billed monthly"}
                  </div>
                </div>

                {/* Features List */}
                <ul className="plan-features-list">
                  <li>
                    <div
                      className="plan-check-bubble"
                      style={{ background: p.bgLight, color: p.themeColor }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{p.users}</span>
                  </li>
                  <li>
                    <div
                      className="plan-check-bubble"
                      style={{ background: p.bgLight, color: p.themeColor }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{p.storage}</span>
                  </li>
                  <li>
                    <div
                      className="plan-check-bubble"
                      style={{ background: p.bgLight, color: p.themeColor }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{p.highlight || "Configurable modules"}</span>
                  </li>
                </ul>

                {/* CTA Action */}
                <div className="plan-action-btn-wrap">
                  {p.isCustom ? (
                    <button
                      type="button"
                      className="btn-plan btn-plan-dark"
                      onClick={() => onOpenEnterprise(p.name)}
                    >
                      <span>Contact Sales</span>
                      <ArrowRight size={15} />
                    </button>
                  ) : p.isPopular ? (
                    <button
                      type="button"
                      className="btn-plan btn-plan-popular"
                      onClick={() => onSelectPlan(p.name, billingCycle)}
                    >
                      <span>Choose Plan</span>
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-plan btn-plan-outline"
                      onClick={() => onSelectPlan(p.name, billingCycle)}
                    >
                      <span>Choose Plan</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
