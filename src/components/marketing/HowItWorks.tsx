"use client";

import { cn } from "@/lib/cn";
import {
  Link2,
  BrainCircuit,
  Rocket,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Link2,
    title: "Connect Your Tools",
    description:
      "Link your CRM, billing, support, and marketing tools in under 10 minutes. We support HubSpot, Salesforce, SAP, Dynamics 365, Stripe, QuickBooks, and 50+ more — with native apps for your favorite platforms.",
  },
  {
    step: "02",
    icon: BrainCircuit,
    title: "AI Learns Your Revenue",
    description:
      "Our AI engine analyzes every deal, every customer interaction, and every invoice to build a complete picture of your revenue health. It identifies patterns your team would take weeks to find.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Get Predictive Insights",
    description:
      "Revenue forecasts with 85% accuracy. Churn risk alerts before customers leave. Expansion signals when accounts are ready to upsell. Pipeline scores that tell your team exactly where to focus.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Board-Ready in 30 Seconds",
    description:
      "Generate investor-grade revenue reports instantly. Ask the AI copilot any revenue question in plain English — it answers with data, charts, and actionable recommendations.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-16 lg:py-24 bg-grey-50">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            How It Works
          </p>
          <h2 className="text-3xl font-bold text-black tracking-tight">
            From Disconnected Data to Revenue Intelligence in Minutes
          </h2>
          <p className="mt-4 text-md text-grey-500">
            No consultants. No 6-month implementations. Just connect, learn, and grow.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={cn(
                  "relative bg-white border border-border rounded-lg p-8",
                  "hover:shadow-card-hover transition-shadow duration-200"
                )}
              >
                {/* Step number */}
                <span className="absolute -top-3 -left-3 flex items-center justify-center w-8 h-8 bg-black text-white text-xs font-bold rounded-[6px]">
                  {step.step}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-grey-50 border border-border-light mb-4">
                  <Icon className="h-5 w-5 text-black" />
                </div>

                <h3 className="text-base font-semibold text-black">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-grey-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
