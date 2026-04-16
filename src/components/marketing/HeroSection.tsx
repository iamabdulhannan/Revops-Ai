"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants/routes";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

const stats = [
  { value: "20-30%", label: "Revenue Recovered", icon: TrendingUp },
  { value: "<10 Min", label: "Setup Time", icon: Zap },
  { value: "85%", label: "Forecast Accuracy", icon: Sparkles },
  { value: "140%+", label: "Net Revenue Retention", icon: Shield },
];

const trustedBy = [
  "HubSpot",
  "Salesforce",
  "SAP",
  "Dynamics 365",
  "Stripe",
  "QuickBooks",
];

export function HeroSection() {
  return (
    <section className="w-full py-24 lg:py-32 overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-grey-100 rounded-pill px-4 py-1.5 text-xs font-semibold text-grey-700 border border-border-light">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Revenue Operations Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl lg:text-5xl font-bold text-black max-w-4xl mx-auto text-center tracking-tight leading-tight">
          Your AI Chief Revenue Officer
          <span className="block text-grey-400 mt-1">at a Fraction of the Cost</span>
        </h1>

        {/* Subheadline */}
        <p className="text-md text-grey-500 max-w-2xl mx-auto text-center mt-5 leading-relaxed">
          RevOps AI connects your CRM, billing, and support tools into one
          intelligent platform — then uses AI to predict revenue, prevent churn,
          and generate board-ready reports in 30 seconds. Not days.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href={ROUTES.REGISTER}
            className={cn(
              "inline-flex items-center gap-2 justify-center px-7 py-3 text-sm font-medium rounded-sm transition-colors duration-150",
              "bg-black text-white hover:bg-grey-800 shadow-button"
            )}
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#how-it-works"
            className={cn(
              "inline-flex items-center justify-center px-7 py-3 text-sm font-medium rounded-sm transition-colors duration-150",
              "bg-white text-black border border-grey-300 hover:bg-grey-50"
            )}
          >
            See How It Works
          </Link>
        </div>

        {/* Stat Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-lg border border-border bg-white p-6 text-center shadow-card hover:shadow-card-hover transition-shadow duration-200"
              >
                <Icon className="h-5 w-5 text-grey-400 mb-2" />
                <span className="text-2xl font-bold text-black">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs text-grey-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Trusted integrations ticker */}
        <div className="mt-16 text-center">
          <p className="text-xs text-grey-400 uppercase tracking-wider font-semibold mb-4">
            Works with the tools you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="bg-grey-50 border border-border-light rounded-pill px-4 py-1.5 text-xs font-medium text-grey-600"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
