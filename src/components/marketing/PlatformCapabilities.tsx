"use client";

import { cn } from "@/lib/cn";
import {
  BrainCircuit,
  Gauge,
  Bot,
  FileBarChart,
  ShieldCheck,
  Layers,
  DollarSign,
  Users,
} from "lucide-react";

const capabilities = [
  {
    icon: BrainCircuit,
    title: "AI Revenue Co-Pilot",
    description:
      "Ask any revenue question in plain English. \"Why did churn spike in Q3?\" \"Which deals close this month?\" Get instant answers backed by your real data.",
    tag: "AI-Powered",
  },
  {
    icon: Gauge,
    title: "Revenue Health Score",
    description:
      "One number that tells your CEO exactly how healthy your revenue engine is. Combines pipeline velocity, churn rate, NRR, and 20+ signals into a single 0-100 score.",
    tag: "Proprietary",
  },
  {
    icon: Bot,
    title: "Revenue Autopilot",
    description:
      "Automated playbooks that trigger when churn risk spikes, deals stall, or expansion opportunities surface. Your revenue machine runs even while you sleep.",
    tag: "Automation",
  },
  {
    icon: FileBarChart,
    title: "Board-Ready Reports",
    description:
      "Generate investor-grade revenue reports in 30 seconds. MRR waterfall, cohort analysis, revenue attribution — all with one click. No more Sunday night spreadsheet marathons.",
    tag: "Reporting",
  },
  {
    icon: ShieldCheck,
    title: "ASC 606 Compliance",
    description:
      "Automated revenue recognition that stays compliant. Track deferred revenue, contract modifications, and multi-element arrangements without the accounting headaches.",
    tag: "Compliance",
  },
  {
    icon: Layers,
    title: "Unified Revenue Timeline",
    description:
      "See every customer touchpoint — from first ad click to latest support ticket — in one chronological view. Finally understand the full customer revenue journey.",
    tag: "Visibility",
  },
  {
    icon: DollarSign,
    title: "Multi-Currency Intelligence",
    description:
      "Automatic conversion across PKR, INR, USD, EUR, and 50+ currencies. Real-time margin impact analysis when forex rates shift on your active projects.",
    tag: "Global",
  },
  {
    icon: Users,
    title: "Project Profitability",
    description:
      "For service companies: track margin per project, per client, per team. AI alerts you when a project trends toward negative margin before it happens.",
    tag: "Services",
  },
];

export function PlatformCapabilities() {
  return (
    <section id="capabilities" className="w-full py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            Platform Capabilities
          </p>
          <h2 className="text-3xl font-bold text-black tracking-tight">
            Not Just Another Dashboard. An AI Revenue Brain.
          </h2>
          <p className="mt-4 text-md text-grey-500">
            HubSpot shows your data. Clari forecasts your pipeline. RevOps AI thinks about your entire revenue engine — and tells you exactly what to do next.
          </p>
        </div>

        {/* Capability cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={cn(
                  "bg-white border border-border rounded-lg p-6 flex flex-col",
                  "hover:shadow-card-hover transition-shadow duration-200"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-grey-50 border border-border-light">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <span className="text-2xs font-semibold uppercase tracking-wider text-grey-400 bg-grey-50 px-2.5 py-1 rounded-pill">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-black text-sm">{cap.title}</h3>
                <p className="mt-2 text-xs text-grey-500 leading-relaxed flex-1">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
