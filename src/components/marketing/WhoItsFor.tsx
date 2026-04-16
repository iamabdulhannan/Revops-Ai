"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import {
  ArrowRight,
  Building2,
  Rocket,
  Globe,
  PieChart,
} from "lucide-react";

const audiences = [
  {
    icon: Rocket,
    title: "B2B SaaS Companies",
    range: "$2M – $50M ARR",
    description:
      "You have HubSpot or Salesforce, Stripe for billing, Intercom for support — but no single view of revenue. RevOps AI connects everything and tells you where to focus.",
    painPoints: [
      "Disconnected CRM, billing, and support tools",
      "Sunday night board report panic",
      "Churn surprises that should have been predicted",
    ],
  },
  {
    icon: Building2,
    title: "IT Services Companies",
    range: "200 – 1,000 Employees",
    description:
      "Project-based revenue, utilization tracking, multi-currency billing — RevOps AI's Services Mode was built specifically for companies like yours.",
    painPoints: [
      "No visibility into per-project profitability",
      "Client concentration risk goes unnoticed",
      "Utilization and bench rates tracked in spreadsheets",
    ],
  },
  {
    icon: PieChart,
    title: "PE/VC Portfolio Companies",
    range: "Multi-Company Oversight",
    description:
      "Give your portfolio companies a standardized revenue ops stack. Compare performance across the portfolio with unified metrics and AI-powered benchmarking.",
    painPoints: [
      "Every portfolio company reports differently",
      "No standardized revenue health metric",
      "Board prep takes days per company",
    ],
  },
  {
    icon: Globe,
    title: "Global & Multi-Currency Teams",
    range: "Operating in 2+ Countries",
    description:
      "Teams billing in USD, EUR, PKR, INR, and more need real-time margin impact analysis. Our multi-currency intelligence handles conversion, hedging alerts, and consolidated reporting.",
    painPoints: [
      "Forex fluctuations silently eat margins",
      "Consolidating multi-entity revenue is manual",
      "Regional performance is a black box",
    ],
  },
];

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="w-full py-16 lg:py-24 bg-grey-50">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            Built For
          </p>
          <h2 className="text-3xl font-bold text-black tracking-tight">
            Whether You Sell Software or Services, We Speak Revenue
          </h2>
        </div>

        {/* Audience cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.title}
                className={cn(
                  "bg-white border border-border rounded-lg p-8",
                  "hover:shadow-card-hover transition-shadow duration-200"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-grey-50 border border-border-light shrink-0">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{aud.title}</h3>
                    <span className="text-xs text-grey-400 font-medium">
                      {aud.range}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-grey-500 leading-relaxed">
                  {aud.description}
                </p>

                <div className="mt-4 space-y-2">
                  {aud.painPoints.map((p) => (
                    <div
                      key={p}
                      className="flex items-start gap-2 text-xs text-grey-600"
                    >
                      <span className="text-danger mt-0.5 shrink-0">✕</span>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href={ROUTES.USE_CASES}
            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-grey-600 transition-colors duration-150"
          >
            See detailed use cases
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
