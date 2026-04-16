import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const settingsTabs = [
  { label: "General", href: "/settings", active: false },
  { label: "Team", href: "/settings/team", active: false },
  { label: "Billing", href: "/settings/billing", active: true },
];

const currentPlan = {
  name: "Growth",
  price: "$349",
  period: "/mo",
  renewalDate: "March 15, 2026",
};

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/mo",
    features: ["500 contacts", "3 integrations", "1 user seat"],
    current: false,
  },
  {
    name: "Growth",
    price: "$349",
    period: "/mo",
    features: [
      "5,000 contacts",
      "10 integrations",
      "AI forecasting",
      "5 user seats",
    ],
    current: true,
  },
  {
    name: "Scale",
    price: "$899",
    period: "/mo",
    features: [
      "Unlimited contacts",
      "Unlimited integrations",
      "Advanced AI",
      "15 user seats",
    ],
    current: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Everything in Scale",
      "Custom AI training",
      "SSO & SCIM",
      "Unlimited seats",
    ],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <div>
      <PageHeader title="Billing" subtitle="Manage your subscription and invoices" />

      {/* Settings sub-navigation */}
      <div className="flex items-center gap-0 border-b border-grey-200 mb-6">
        {settingsTabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative px-4 pb-3 pt-1 text-sm font-medium transition-colors duration-150",
              tab.active
                ? "text-black font-semibold"
                : "text-grey-500 hover:text-grey-700"
            )}
          >
            {tab.label}
            {tab.active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </Link>
        ))}
      </div>

      {/* Current plan */}
      <div className="rounded-[6px] bg-white border border-black p-6 shadow-card mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
              Current Plan
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black">
                {currentPlan.name}
              </span>
              <span className="text-lg font-bold text-black">
                {currentPlan.price}
              </span>
              <span className="text-sm text-grey-500">{currentPlan.period}</span>
            </div>
            <p className="mt-1 text-xs text-grey-500">
              Renews on {currentPlan.renewalDate}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150 shrink-0"
          >
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Plan options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "rounded-lg bg-white border p-6 shadow-card flex flex-col",
              plan.current ? "border-black" : "border-border"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-grey-500">
              {plan.name}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-black">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-grey-500">{plan.period}</span>
              )}
            </div>

            <ul className="mt-4 flex-1 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  <span className="text-xs text-grey-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={cn(
                "mt-5 w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-150",
                plan.current
                  ? "bg-grey-100 text-grey-500 cursor-default"
                  : "bg-white text-black border border-grey-300 hover:bg-grey-50"
              )}
              disabled={plan.current}
            >
              {plan.current ? "Current Plan" : "Switch Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
