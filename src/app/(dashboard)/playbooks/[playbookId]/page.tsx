"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/cn";
import { playbookDetails } from "@/data/playbook-data";
import type { PlaybookExecution } from "@/data/playbook-data";
import {
  ArrowLeft,
  Play,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  List,
  Workflow,
} from "lucide-react";
import { PlaybookListView } from "@/components/features/playbooks/PlaybookListView";

/* Dynamically import FlowView to avoid SSR issues with React Flow */
const PlaybookFlowView = dynamic(
  () =>
    import("@/components/features/playbooks/PlaybookFlowView").then(
      (m) => m.PlaybookFlowView
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] rounded-[6px] bg-white border border-border shadow-card flex items-center justify-center">
        <p className="text-sm text-grey-400">Loading flow view…</p>
      </div>
    ),
  }
);

/* ---------- helpers ---------- */

type ViewMode = "list" | "flow";

function StatusBadge({ status }: { status: PlaybookExecution["status"] }) {
  const map = {
    completed: {
      label: "Completed",
      classes: "bg-success-light text-success",
      Icon: CheckCircle2,
    },
    "in-progress": {
      label: "In Progress",
      classes: "bg-warning-light text-warning",
      Icon: Loader2,
    },
    failed: {
      label: "Failed",
      classes: "bg-danger-light text-danger",
      Icon: AlertCircle,
    },
  } as const;

  const { label, classes, Icon } = map[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-2xs font-semibold",
        classes
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ---------- page ---------- */

export default function PlaybookDetailPage({
  params,
}: {
  params: { playbookId: string };
}) {
  const { playbookId } = params;
  const playbook = playbookDetails[playbookId];
  const [view, setView] = useState<ViewMode>("list");

  /* ---- not found fallback ---- */
  if (!playbook) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-lg font-bold text-black">Playbook Not Found</h2>
        <p className="mt-2 text-sm text-grey-500">
          The playbook you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/playbooks"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Playbooks
        </Link>
      </div>
    );
  }

  /* ---- stats ---- */
  const stats = [
    { label: "Executions", value: String(playbook.executions) },
    { label: "Success Rate", value: `${playbook.successRate}%` },
    { label: "Avg Time", value: playbook.avgTimeToComplete },
    { label: "Revenue Protected", value: formatCurrency(playbook.revenueProtected) },
  ];

  return (
    <div>
      {/* Back link */}
      <Link
        href="/playbooks"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-grey-500 hover:text-black transition-colors duration-150"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Playbooks
      </Link>

      {/* Header */}
      <PageHeader title={playbook.name} subtitle={playbook.description}>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-2xs font-semibold",
            playbook.active
              ? "bg-success-light text-success"
              : "bg-grey-100 text-grey-500"
          )}
        >
          {playbook.active ? (
            <Play className="h-2.5 w-2.5" />
          ) : (
            <Clock className="h-2.5 w-2.5" />
          )}
          {playbook.active ? "Active" : "Paused"}
        </span>
      </PageHeader>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[6px] bg-white border border-border p-4 shadow-card"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
              {stat.label}
            </p>
            <p className="mt-1 text-lg font-bold text-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Automation Flow */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-black">
            Automation Flow
          </h2>

          {/* View toggle */}
          <div className="inline-flex rounded-sm border border-grey-300 overflow-hidden">
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                view === "list"
                  ? "bg-black text-white"
                  : "bg-white text-grey-700 hover:bg-grey-50"
              )}
            >
              <List size={13} />
              List
            </button>
            <button
              type="button"
              onClick={() => setView("flow")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                view === "flow"
                  ? "bg-black text-white"
                  : "bg-white text-grey-700 hover:bg-grey-50"
              )}
            >
              <Workflow size={13} />
              Flow
            </button>
          </div>
        </div>

        {view === "list" ? (
          <PlaybookListView steps={playbook.steps} />
        ) : (
          <PlaybookFlowView steps={playbook.steps} />
        )}
      </section>

      {/* Recent Executions */}
      <section>
        <h2 className="text-base font-semibold text-black mb-4">
          Recent Executions
        </h2>

        <div className="rounded-[6px] bg-white border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-grey-50">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500">
                    Triggered
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500">
                    Progress
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500">
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody>
                {playbook.recentExecutions.map((exec) => (
                  <tr
                    key={exec.id}
                    className="border-b border-border-light last:border-0 hover:bg-grey-50 transition-colors duration-100"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-black whitespace-nowrap">
                      {exec.customerName}
                    </td>
                    <td className="px-4 py-3 text-xs text-grey-500 whitespace-nowrap">
                      {exec.triggeredAt}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={exec.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-grey-600 whitespace-nowrap">
                      {exec.stepsCompleted}/{exec.totalSteps} steps
                    </td>
                    <td className="px-4 py-3 text-xs text-grey-500 max-w-xs truncate">
                      {exec.outcome ?? <span className="text-grey-400">--</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
