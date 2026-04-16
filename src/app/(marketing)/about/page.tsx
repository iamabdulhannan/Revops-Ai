import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ---------- Data ---------- */

const values = [
  {
    icon: Lightbulb,
    title: "Transparency Over Complexity",
    description:
      "Revenue operations should be clear, not convoluted. Every feature we build makes revenue easier to understand — not harder. If a dashboard needs a manual to read, we've failed.",
  },
  {
    icon: BrainCircuit,
    title: "AI That Augments, Not Replaces",
    description:
      "We don't believe AI should make decisions for you. We believe it should surface the right data, at the right time, so you can make better decisions faster. Your team's judgment, amplified by intelligence.",
  },
  {
    icon: Users,
    title: "Teams Over Tools",
    description:
      "The best technology gets out of the way. RevOps AI connects your existing tools so your team can stop wrestling with data and start growing revenue. We adapt to your workflow — not the other way around.",
  },
  {
    icon: Shield,
    title: "Trust Through Security",
    description:
      "Revenue data is the most sensitive data in your company. We maintain SOC 2 Type II compliance, encrypt everything at rest and in transit, and never share or sell your data. Period.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "The Problem Discovered",
    description:
      "Our founding team at Orbiqon saw the same pattern across every company we consulted: revenue teams drowning in disconnected tools, making decisions on stale data, and spending more time reporting than growing.",
  },
  {
    year: "2024",
    title: "Research & Validation",
    description:
      "We interviewed 100+ revenue leaders across SaaS, IT services, and e-commerce. The gap was clear: CRMs show data, BI tools visualize data, but nobody thinks about data. The market needed an AI revenue brain.",
  },
  {
    year: "2025",
    title: "RevOps AI Founded",
    description:
      "RevOps AI was born as an Orbiqon product — built by a team that has spent years in the trenches of revenue operations, software engineering, and artificial intelligence.",
  },
  {
    year: "2025",
    title: "Platform Launch",
    description:
      "We launched with 50+ integrations, AI forecasting, Revenue Health Score, and the AI Copilot — connecting CRMs, billing tools, and support platforms into one intelligent revenue layer.",
  },
  {
    year: "2026",
    title: "App Ecosystem & Global Expansion",
    description:
      "Native apps for HubSpot, Dynamics 365, Salesforce, and SAP. Multi-currency intelligence for global teams. Services Revenue Mode for IT companies. Expanding across 4 continents.",
  },
];

const teamHighlights = [
  {
    icon: Building2,
    stat: "Built by Orbiqon",
    description:
      "A product company with deep roots in enterprise software, AI, and revenue operations consulting.",
  },
  {
    icon: Globe,
    stat: "4 Countries",
    description:
      "Team members across Pakistan, UAE, US, and Europe — building a globally relevant platform.",
  },
  {
    icon: Zap,
    stat: "50+ Integrations",
    description:
      "We connect with the tools revenue teams already use — from CRMs to billing to customer support.",
  },
  {
    icon: Rocket,
    stat: "AI-First Architecture",
    description:
      "Built on Next.js, FastAPI, and modern ML pipelines — designed for speed, scale, and intelligence.",
  },
];

/* ---------- Page Component ---------- */

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            About Us
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
            We&apos;re Building the AI Operating System for Revenue Teams
          </h1>
          <p className="mt-5 text-md text-grey-500 max-w-2xl mx-auto leading-relaxed">
            RevOps AI was born from a simple frustration: revenue teams spend more
            time wrestling with disconnected tools than actually growing revenue.
            We&apos;re here to change that.
          </p>
        </div>

        {/* Team Highlights */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {teamHighlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.stat}
                className="bg-white border border-border rounded-lg p-6 text-center hover:shadow-card-hover transition-shadow duration-200"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-grey-50 border border-border-light mx-auto mb-3">
                  <Icon className="h-5 w-5 text-black" />
                </div>
                <p className="font-semibold text-black text-sm">{h.stat}</p>
                <p className="mt-1 text-xs text-grey-500">{h.description}</p>
              </div>
            );
          })}
        </div>

        {/* Our Story */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-black tracking-tight">
              From Consulting Frustration to Product Vision
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-grey-600 leading-relaxed">
              Before RevOps AI, our team at Orbiqon spent years consulting for
              companies across SaaS, IT services, fintech, and e-commerce. In every
              engagement, we saw the same problem: marketing, sales, and customer
              success teams working in silos, each with their own tools, their own
              data, and their own version of the truth.
            </p>
            <p className="text-sm text-grey-600 leading-relaxed">
              Deals were lost to broken handoffs. Churn surprised even the best CS
              teams. Board reports took entire weekends to build — and the numbers
              still didn&apos;t tie out. Every company we talked to had 5-15 revenue
              tools. None of them had a single source of truth.
            </p>
            <p className="text-sm text-grey-600 leading-relaxed">
              We saw the market filling up with point solutions — a CRM here, a
              forecasting tool there, a BI dashboard somewhere else. But nobody was
              building the intelligent layer that sits on top of everything and
              actually thinks about your revenue. Not just shows it. Thinks about it.
            </p>
            <p className="text-sm text-grey-700 leading-relaxed font-medium">
              That&apos;s why we built RevOps AI — the AI Chief Revenue Officer that
              connects every tool, predicts every outcome, and tells your team exactly
              what to do next. Not in a week. In seconds.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mt-24 bg-black rounded-lg p-10 lg:p-14 max-w-3xl mx-auto text-center">
          <Target className="h-8 w-8 text-grey-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Our Mission
          </h2>
          <p className="mt-4 text-md text-grey-400 max-w-xl mx-auto leading-relaxed">
            To give every revenue team — whether they sell software or services,
            whether they&apos;re 10 people or 10,000 — a single source of truth
            powered by AI. We believe that when teams can see their revenue clearly,
            they can grow it confidently.
          </p>
        </div>

        {/* Values */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
              What We Believe
            </p>
            <h2 className="text-3xl font-bold text-black tracking-tight">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white border border-border rounded-lg p-8 hover:shadow-card-hover transition-shadow duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-grey-50 border border-border-light mb-4">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="font-semibold text-black">{v.title}</h3>
                  <p className="mt-2 text-sm text-grey-500 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
              Our Journey
            </p>
            <h2 className="text-3xl font-bold text-black tracking-tight">
              Key Milestones
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-black text-white text-2xs font-bold shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-border my-2" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <p className="text-xs text-grey-400 font-medium">{m.year}</p>
                  <h3 className="font-semibold text-black mt-1">{m.title}</h3>
                  <p className="mt-2 text-sm text-grey-500 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backed by Orbiqon */}
        <div className="mt-24 bg-grey-50 rounded-lg p-10 lg:p-14 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
              Backed By
            </p>
            <h2 className="text-2xl font-bold text-black tracking-tight">
              An Orbiqon Product
            </h2>
            <p className="mt-4 text-sm text-grey-500 max-w-xl mx-auto leading-relaxed">
              RevOps AI is built and backed by Orbiqon — a technology company
              focused on building intelligent software products. Orbiqon brings
              deep expertise in enterprise software, AI/ML engineering, and
              go-to-market strategy to ensure RevOps AI isn&apos;t just another
              dashboard, but a genuine leap forward in how revenue teams operate.
            </p>
            <Link
              href="https://orbiqon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-grey-600 transition-colors duration-150"
            >
              Learn more about Orbiqon
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Ready to See Your Revenue Clearly?
          </h2>
          <p className="mt-3 text-sm text-grey-500 max-w-lg mx-auto">
            Join the revenue teams that stopped guessing and started knowing.
            Start your free trial today — no credit card required.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link
              href={ROUTES.REGISTER}
              className="inline-flex items-center gap-2 justify-center px-7 py-3 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 shadow-button transition-colors duration-150"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={ROUTES.USE_CASES}
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150"
            >
              See Use Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
