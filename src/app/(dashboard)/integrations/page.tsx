"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Plug,
  Check,
  Plus,
  Upload,
  PenLine,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  X,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { csvTemplates, generateCSVTemplate } from "@/data/csv-templates";

/* ------------------------------------------------------------------ */
/*  Existing integration data (preserved exactly as-is)                */
/* ------------------------------------------------------------------ */

const initialIntegrations = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM, marketing automation, and sales pipeline management.",
    category: "CRM",
    connected: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Enterprise CRM with advanced reporting and analytics.",
    category: "CRM",
    connected: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing, subscriptions, and billing management.",
    category: "Billing",
    connected: true,
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Customer messaging, support chat, and knowledge base.",
    category: "Support",
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team communication with real-time alerts and notifications.",
    category: "Communication",
    connected: false,
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Web analytics, traffic analysis, and conversion tracking.",
    category: "Analytics",
    connected: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Mock preview rows per template                                      */
/* ------------------------------------------------------------------ */

function getMockRows(templateKey: string): string[][] {
  const mocks: Record<string, string[][]> = {
    customers: [
      ["Sarah Chen", "sarah@acme.com", "Acme Corp", "8400", "healthy"],
      ["James Wilson", "james@techflow.io", "TechFlow Inc", "12800", "healthy"],
      ["Maria Garcia", "maria@datasync.com", "DataSync Ltd", "4200", "critical"],
    ],
    deals: [
      ["Enterprise Renewal", "Acme Corp", "84000", "negotiation", "Sarah Chen"],
      ["New Expansion", "TechFlow Inc", "32000", "proposal", "James Wilson"],
      ["Startup Onboard", "Nova Digital", "12000", "qualified", "Lisa Chen"],
    ],
    pipeline: [
      ["Q1 Pipeline", "2024-01-01", "2024-03-31", "850000", "active"],
      ["Q2 Pipeline", "2024-04-01", "2024-06-30", "920000", "planned"],
      ["Enterprise Track", "2024-01-15", "2024-12-31", "1200000", "active"],
    ],
  };
  return mocks[templateKey] ?? mocks.customers;
}

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  /* CSV modal state */
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [csvStep, setCsvStep] = useState<"upload" | "preview" | "complete">("upload");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("customers");

  function toggleConnection(id: string) {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, connected: !i.connected } : i
      )
    );
  }

  function handleDownloadTemplate() {
    const csv = generateCSVTemplate(selectedTemplate);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTemplate}-template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetCSVModal() {
    setShowCSVModal(false);
    setCsvStep("upload");
    setSelectedTemplate("customers");
  }

  const templateKeys = Object.keys(csvTemplates);
  const currentTemplate = csvTemplates[selectedTemplate];
  const mockRows = getMockRows(selectedTemplate);

  return (
    <div>
      <PageHeader title="Integrations" subtitle="Connect your revenue stack" />

      {/* ---- A. "No CRM?" Banner ---- */}
      <div className="mb-6 rounded-[6px] bg-grey-50 border border-border p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-black shrink-0">
            <Upload className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-black">
              No CRM? No problem.
            </h3>
            <p className="text-sm text-grey-500 mt-0.5">
              Connect your tools below or import your data directly using CSV
              files and manual entry.
            </p>
          </div>
        </div>
      </div>

      {/* ---- B. Direct Data Input ---- */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {/* Manual Data Entry card */}
        <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-grey-50 border border-border-light shrink-0">
              <PenLine className="h-5 w-5 text-black" />
            </div>
            <span className="inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold uppercase bg-success-light text-success">
              No Setup Required
            </span>
          </div>
          <h3 className="mt-4 text-base font-semibold text-black">
            Manual Data Entry
          </h3>
          <p className="mt-1 text-sm text-grey-500">
            Add customers and deals directly through the dashboard. No
            integrations or file uploads needed.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              href="/customers"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150"
            >
              Customers
            </Link>
            <Link
              href="/pipeline"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150"
            >
              Pipeline
            </Link>
          </div>
        </div>

        {/* CSV Import card */}
        <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-grey-50 border border-border-light shrink-0">
              <FileSpreadsheet className="h-5 w-5 text-black" />
            </div>
            <span className="inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold uppercase bg-info-light text-info">
              Bulk Import
            </span>
          </div>
          <h3 className="mt-4 text-base font-semibold text-black">
            CSV Import
          </h3>
          <p className="mt-1 text-sm text-grey-500">
            Upload a CSV file to bulk import customers, deals, or pipeline data
            in seconds.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setShowCSVModal(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
            >
              <Upload className="h-3.5 w-3.5" />
              Import CSV
            </button>
          </div>
        </div>
      </div>

      {/* ---- D. Connected Services heading ---- */}
      <h2 className="text-base font-semibold text-black mb-4">
        Connected Services
      </h2>

      {/* ---- Existing integration cards (preserved) ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="rounded-[6px] bg-white border border-border p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-grey-50 border border-border-light shrink-0">
                <Plug className="h-5 w-5 text-black" />
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold uppercase",
                  "bg-grey-100 text-grey-600"
                )}
              >
                {integration.category}
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold text-black">
              {integration.name}
            </h3>
            <p className="mt-1 text-sm text-grey-500">
              {integration.description}
            </p>

            <div className="mt-5">
              {integration.connected ? (
                <button
                  type="button"
                  onClick={() => toggleConnection(integration.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-sm bg-success-light text-success border border-success/20 hover:bg-success/10 transition-colors duration-150"
                >
                  <Check className="h-3.5 w-3.5" />
                  Connected
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleConnection(integration.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ---- C. CSV Import Modal ---- */}
      {showCSVModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={resetCSVModal}
        >
          <div
            className="bg-white rounded-[6px] shadow-dropdown w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                {csvStep === "preview" && (
                  <button
                    type="button"
                    onClick={() => setCsvStep("upload")}
                    className="rounded-[4px] p-1 text-grey-400 hover:bg-grey-50 hover:text-black transition-colors duration-150"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <FileSpreadsheet className="h-5 w-5 text-black" />
                <h2 className="text-base font-semibold text-black">
                  {csvStep === "complete"
                    ? "Import Complete"
                    : csvStep === "preview"
                      ? "Preview Import"
                      : "Import CSV"}
                </h2>
              </div>
              <button
                type="button"
                onClick={resetCSVModal}
                className="rounded-[4px] p-1 text-grey-400 hover:bg-grey-50 hover:text-black transition-colors duration-150"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ---- Step: Upload ---- */}
            {csvStep === "upload" && (
              <div className="space-y-5">
                {/* Template selector */}
                <div>
                  <label className="block text-xs font-medium text-grey-600 mb-1.5">
                    Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full h-10 px-3 border border-grey-300 rounded-sm bg-white text-sm text-black transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  >
                    {templateKeys.map((key) => (
                      <option key={key} value={key}>
                        {csvTemplates[key].label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Download template link */}
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:text-grey-700 transition-colors duration-150"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download template
                </button>

                {/* Drag-drop area */}
                <div
                  className="flex flex-col items-center justify-center rounded-[6px] border-2 border-dashed border-grey-300 bg-grey-50 py-10 px-4 text-center cursor-pointer hover:border-grey-400 transition-colors duration-150"
                  onClick={() => setCsvStep("preview")}
                >
                  <Upload className="h-8 w-8 text-grey-400 mb-2" />
                  <p className="text-sm font-medium text-grey-600">
                    Drag and drop your CSV file here
                  </p>
                  <p className="text-xs text-grey-400 mt-1">
                    or click to browse files
                  </p>
                </div>

                {/* Column preview table */}
                {currentTemplate && (
                  <div>
                    <h4 className="text-xs font-medium text-grey-600 mb-2">
                      Expected columns
                    </h4>
                    <div className="rounded-[6px] border border-border overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-grey-50 border-b border-grey-300">
                            <th className="text-left text-xs uppercase font-medium text-grey-500 px-3 py-2 tracking-wider">
                              Column
                            </th>
                            <th className="text-left text-xs uppercase font-medium text-grey-500 px-3 py-2 tracking-wider">
                              Required
                            </th>
                            <th className="text-left text-xs uppercase font-medium text-grey-500 px-3 py-2 tracking-wider">
                              Example
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentTemplate.columns.map((col) => (
                            <tr
                              key={col.key}
                              className="border-b border-grey-100 last:border-b-0"
                            >
                              <td className="px-3 py-2 text-sm text-black font-medium">
                                {col.label}
                              </td>
                              <td className="px-3 py-2">
                                {col.required ? (
                                  <span className="inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold bg-danger-light text-danger">
                                    Required
                                  </span>
                                ) : (
                                  <span className="text-xs text-grey-400">
                                    Optional
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-xs text-grey-500 font-mono">
                                {col.example}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---- Step: Preview ---- */}
            {csvStep === "preview" && (
              <div className="space-y-5">
                {/* Summary badges */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium bg-grey-100 text-grey-700">
                    {mockRows.length} rows
                  </span>
                  <span className="inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium bg-grey-100 text-grey-700">
                    {currentTemplate?.columns.length ?? 0} columns
                  </span>
                </div>

                {/* Preview table */}
                <div className="rounded-[6px] border border-border overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-grey-50 border-b border-grey-300">
                        {currentTemplate?.columns.map((col) => (
                          <th
                            key={col.key}
                            className="text-left text-xs uppercase font-medium text-grey-500 px-3 py-2 tracking-wider whitespace-nowrap"
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockRows.map((row, ri) => (
                        <tr
                          key={ri}
                          className="border-b border-grey-100 last:border-b-0"
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="px-3 py-2 text-sm text-grey-700 whitespace-nowrap"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCsvStep("upload")}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCsvStep("complete")}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
                  >
                    Import
                  </button>
                </div>
              </div>
            )}

            {/* ---- Step: Complete ---- */}
            {csvStep === "complete" && (
              <div className="flex flex-col items-center text-center py-6">
                <CheckCircle2 className="h-14 w-14 text-success mb-4" />
                <h3 className="text-base font-semibold text-black">
                  3 records imported successfully
                </h3>
                <p className="text-sm text-grey-500 mt-1">
                  Your data has been added to the platform.
                </p>
                <button
                  type="button"
                  onClick={resetCSVModal}
                  className="mt-6 inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
