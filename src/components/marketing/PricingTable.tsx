"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants/routes";

type Plan = {
  name: string;
  price: string;
  period: string;
  audience: string;
  featured: boolean;
  features: string[];
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$149",
    period: "/mo",
    audience: "For early-stage teams",
    featured: false,
    features: [
      "Up to 1,000 contacts",
      "3 integrations",
      "Basic AI forecasting",
      "Revenue Health Score",
      "5 user seats",
      "50 AI queries/month",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    price: "$399",
    period: "/mo",
    audience: "For scaling revenue teams",
    featured: true,
    features: [
      "Up to 10,000 contacts",
      "10 integrations",
      "Advanced AI forecasting",
      "Automated playbooks",
      "15 user seats",
      "500 AI queries/month",
      "1 native app (HubSpot or D365)",
      "Priority support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Scale",
    price: "$899",
    period: "/mo",
    audience: "For full revenue operations",
    featured: false,
    features: [
      "Unlimited contacts",
      "Unlimited integrations",
      "Advanced AI + custom models",
      "All native apps included",
      "40 user seats",
      "Unlimited AI queries",
      "Multi-currency intelligence",
      "Dedicated CSM",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    audience: "For large organizations",
    featured: false,
    features: [
      "Everything in Scale",
      "Custom AI training on your data",
      "SAP Fiori extension",
      "SSO, SCIM & audit logs",
      "Unlimited seats",
      "Multi-entity consolidation",
      "SLA guarantee",
      "Dedicated solutions engineer",
    ],
    cta: "Contact Sales",
  },
];

export function PricingTable() {
  return (
    <section id="pricing" className="w-full py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-black text-center tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-md text-grey-500 text-center max-w-lg mx-auto">
            Start with a 14-day free trial. Scale as your revenue operations grow.
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "bg-white border rounded-lg p-8 flex flex-col relative",
                plan.featured
                  ? "border-black shadow-card-hover"
                  : "border-border shadow-card"
              )}
            >
              {/* Popular badge */}
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-2xs font-semibold uppercase tracking-wider px-4 py-1 rounded-pill">
                  Most Popular
                </span>
              )}

              {/* Plan name */}
              <p className="text-sm font-semibold uppercase tracking-wider text-grey-500">
                {plan.name}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-black">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-grey-500">{plan.period}</span>
                )}
              </div>

              {/* Audience */}
              <p className="mt-2 text-sm text-grey-500">{plan.audience}</p>

              {/* Feature list */}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-grey-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Link
                href={plan.name === "Enterprise" ? "/about" : ROUTES.REGISTER}
                className={cn(
                  "mt-8 inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium rounded-sm transition-colors duration-150",
                  plan.featured
                    ? "bg-black text-white hover:bg-grey-800 shadow-button"
                    : "bg-white text-black border border-grey-300 hover:bg-grey-50"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
