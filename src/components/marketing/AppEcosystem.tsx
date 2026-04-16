"use client";

import { cn } from "@/lib/cn";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const apps = [
  {
    name: "HubSpot",
    status: "Available",
    description:
      "CRM Card + Sidebar panel. See Revenue Health Score, AI forecasts, and board reports directly inside HubSpot records.",
    features: [
      "Revenue Health Score widget",
      "AI-powered deal insights",
      "One-click board reports",
      "Churn risk alerts on contacts",
    ],
  },
  {
    name: "Dynamics 365",
    status: "Coming Q3",
    description:
      "Power App embedded in D365 Sales. Revenue intelligence overlay on your pipeline, with AI forecasting in your existing workflow.",
    features: [
      "Embedded Power App widget",
      "Pipeline AI overlay",
      "Revenue forecast sidebar",
      "Custom D365 dashboards",
    ],
  },
  {
    name: "Salesforce",
    status: "Coming Q4",
    description:
      "AppExchange app with Lightning components. Unified revenue view alongside your Salesforce data without switching tabs.",
    features: [
      "Lightning component suite",
      "Revenue attribution panel",
      "AI copilot in Salesforce",
      "Automated playbook triggers",
    ],
  },
  {
    name: "SAP",
    status: "2026",
    description:
      "Fiori Launchpad tile for SAP S/4HANA. Enterprise-grade revenue intelligence integrated with your ERP financials and project systems.",
    features: [
      "SAP Fiori native tile",
      "S/4HANA financial sync",
      "Project profitability overlay",
      "Multi-entity consolidation",
    ],
  },
];

const integrations = [
  { name: "Stripe", category: "Billing" },
  { name: "QuickBooks", category: "Accounting" },
  { name: "Xero", category: "Accounting" },
  { name: "Intercom", category: "Support" },
  { name: "Zendesk", category: "Support" },
  { name: "Slack", category: "Communication" },
  { name: "Google Analytics", category: "Analytics" },
  { name: "Mixpanel", category: "Analytics" },
  { name: "Jira", category: "Project Mgmt" },
  { name: "Shopify", category: "Commerce" },
  { name: "LinkedIn Ads", category: "Marketing" },
  { name: "Mailchimp", category: "Email" },
];

export function AppEcosystem() {
  return (
    <section id="apps" className="w-full py-16 lg:py-24 bg-grey-50">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 mb-3">
            App Ecosystem
          </p>
          <h2 className="text-3xl font-bold text-black tracking-tight">
            Native Apps for Every Platform You Use
          </h2>
          <p className="mt-4 text-md text-grey-500">
            RevOps AI doesn&apos;t just connect to your tools — it lives inside them.
            Native extensions for HubSpot, Salesforce, Dynamics 365, and SAP
            bring AI revenue intelligence right where your team already works.
          </p>
        </div>

        {/* App Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {apps.map((app) => (
            <div
              key={app.name}
              className={cn(
                "bg-white border rounded-lg p-6 flex flex-col",
                app.status === "Available"
                  ? "border-black shadow-card-hover"
                  : "border-border shadow-card"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-black">{app.name}</h3>
                <span
                  className={cn(
                    "text-2xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-pill",
                    app.status === "Available"
                      ? "bg-success-light text-success"
                      : "bg-grey-100 text-grey-500"
                  )}
                >
                  {app.status}
                </span>
              </div>

              <p className="text-xs text-grey-500 leading-relaxed mb-4">
                {app.description}
              </p>

              <ul className="space-y-2 flex-1">
                {app.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                    <span className="text-xs text-grey-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Integrations */}
        <div className="mt-16 text-center">
          <p className="text-sm font-semibold text-black mb-4">
            Plus 50+ data integrations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {integrations.map((int) => (
              <span
                key={int.name}
                className="bg-white border border-border rounded-pill px-4 py-2 text-xs font-medium text-grey-700"
              >
                {int.name}
                <span className="text-grey-400 ml-1.5">· {int.category}</span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href={ROUTES.REGISTER}
            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-grey-600 transition-colors duration-150"
          >
            View all integrations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
