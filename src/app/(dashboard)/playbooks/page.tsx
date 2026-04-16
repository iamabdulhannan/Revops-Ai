"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Workflow, Play, Pause } from "lucide-react";
import { cn } from "@/lib/cn";

const initialPlaybooks = [
  {
    id: "1",
    name: "Churn Prevention",
    description:
      "Automatically triggers re-engagement sequences when a customer health score drops below 50.",
    trigger: "Health score < 50",
    actions: ["Send alert to CSM", "Schedule check-in call", "Trigger email sequence"],
    active: true,
    executions: 47,
    lastRun: "2 hours ago",
  },
  {
    id: "2",
    name: "Expansion Opportunity",
    description:
      "Identifies accounts with high usage patterns and triggers upsell motions for the sales team.",
    trigger: "Usage > 80% of plan",
    actions: ["Notify account owner", "Create expansion deal", "Send upgrade email"],
    active: true,
    executions: 23,
    lastRun: "1 day ago",
  },
  {
    id: "3",
    name: "Stalled Deal Revival",
    description:
      "Re-engages prospects when deals have been inactive for more than 14 days in any pipeline stage.",
    trigger: "Deal inactive > 14 days",
    actions: ["Send follow-up email", "Alert sales manager", "Update deal priority"],
    active: false,
    executions: 12,
    lastRun: "1 week ago",
  },
];

export default function PlaybooksPage() {
  const [playbooks, setPlaybooks] = useState(initialPlaybooks);

  function togglePlaybook(id: string) {
    setPlaybooks((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    );
  }

  return (
    <div>
      <PageHeader title="Playbooks" subtitle="Automate your revenue workflows">
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-black text-white hover:bg-grey-800 transition-colors duration-150 shadow-button"
        >
          Create Playbook
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {playbooks.map((playbook) => (
          <div
            key={playbook.id}
            className="rounded-[6px] bg-white border border-border p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-grey-50 border border-border-light shrink-0">
                <Workflow className="h-5 w-5 text-black" />
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-2xs font-semibold",
                  playbook.active
                    ? "bg-success-light text-success"
                    : "bg-grey-100 text-grey-500"
                )}
              >
                {playbook.active ? (
                  <Play className="h-2.5 w-2.5" />
                ) : (
                  <Pause className="h-2.5 w-2.5" />
                )}
                {playbook.active ? "Active" : "Paused"}
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold text-black">
              <Link href={`/playbooks/${playbook.id}`} className="hover:underline">
                {playbook.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-grey-500">{playbook.description}</p>

            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
                Trigger
              </p>
              <p className="mt-1 text-sm text-black">{playbook.trigger}</p>
            </div>

            <div className="mt-3">
              <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
                Actions
              </p>
              <ul className="mt-1 space-y-1">
                {playbook.actions.map((action) => (
                  <li
                    key={action}
                    className="text-xs text-grey-600 flex items-center gap-1.5"
                  >
                    <span className="h-1 w-1 rounded-full bg-grey-400 shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-border-light flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-grey-400">
                  {playbook.executions} executions
                </span>
                <span className="text-xs text-grey-400">
                  Last: {playbook.lastRun}
                </span>
              </div>
              <button
                type="button"
                onClick={() => togglePlaybook(playbook.id)}
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-[4px] transition-colors duration-150",
                  playbook.active
                    ? "text-grey-500 hover:bg-grey-100"
                    : "text-success hover:bg-success-light"
                )}
              >
                {playbook.active ? "Pause" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
