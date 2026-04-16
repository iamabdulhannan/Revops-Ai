"use client";

import {
  Link2,
  Clock,
  BrainCircuit,
  Target,
  Workflow,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/cn";

const features = [
  {
    icon: Link2,
    title: "Connect 50+ Tools",
    description:
      "Integrate your CRM, billing, support, and analytics tools in minutes. Pre-built connectors for HubSpot, Salesforce, SAP, Dynamics 365, Stripe, QuickBooks, and more.",
    highlight: "10-minute setup",
  },
  {
    icon: Clock,
    title: "Unified Revenue Timeline",
    description:
      "See every customer interaction — from first ad click to latest support ticket — across all tools in a single, chronological view. No more tab-switching.",
    highlight: "Full journey view",
  },
  {
    icon: BrainCircuit,
    title: "AI Revenue Forecasting",
    description:
      "Predict revenue, churn risk, and expansion opportunities with ML models trained on your data. Updated hourly, not quarterly.",
    highlight: "85% accuracy",
  },
  {
    icon: Target,
    title: "Pipeline Deal Scoring",
    description:
      "Prioritize deals with AI-powered health scores based on engagement signals, firmographic fit, and historical win patterns.",
    highlight: "30% higher win rate",
  },
  {
    icon: Workflow,
    title: "Automated Playbooks",
    description:
      "Trigger workflows automatically when churn risk spikes, deals stall, or expansion opportunities surface. Build once, runs forever.",
    highlight: "24/7 automation",
  },
  {
    icon: BarChart3,
    title: "Revenue Attribution",
    description:
      "Attribute revenue to campaigns, channels, and touchpoints with multi-touch models. Finally prove what marketing actually drives.",
    highlight: "Multi-touch models",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="w-full py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            Core Features
          </p>
          <h2 className="text-3xl font-bold text-black text-center tracking-tight">
            Everything You Need to Grow Revenue
          </h2>
          <p className="mt-4 text-md text-grey-500">
            Six core capabilities that replace your revenue spreadsheets with intelligence.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "bg-white border border-border rounded-lg p-6",
                  "hover:shadow-card-hover transition-shadow duration-200"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-grey-50 border border-border-light">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <span className="text-2xs font-semibold text-success bg-success-light px-2.5 py-1 rounded-pill">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="font-semibold text-black">{feature.title}</h3>
                <p className="mt-2 text-sm text-grey-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
