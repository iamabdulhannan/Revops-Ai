"use client";

import { cn } from "@/lib/cn";

const stages = [
  { name: "Lead", percentage: 20, color: "bg-grey-400" },
  { name: "Qualified", percentage: 25, color: "bg-grey-600" },
  { name: "Proposal", percentage: 30, color: "bg-grey-800" },
  { name: "Negotiation", percentage: 15, color: "bg-black" },
  { name: "Closed", percentage: 10, color: "bg-success" },
];

const summaryStats = [
  { label: "Total Value", value: "$890K" },
  { label: "Avg Deal Size", value: "$21.2K" },
  { label: "Win Rate", value: "34%" },
];

export function PipelineSummary() {
  return (
    <div className="rounded-[6px] bg-white p-6 shadow-card">
      <h3 className="text-md font-semibold text-black">Pipeline Health</h3>

      <div className="mt-5">
        <div className="flex h-3 w-full overflow-hidden rounded-pill">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className={cn("h-full", stage.color)}
              style={{ width: `${stage.percentage}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          {stages.map((stage) => (
            <div key={stage.name} className="flex items-center gap-1.5">
              <span
                className={cn("inline-block h-2 w-2 rounded-full", stage.color)}
              />
              <span className="text-xs text-grey-500">
                {stage.name} ({stage.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border-light pt-5">
        {summaryStats.map((stat) => (
          <div key={stat.label}>
            <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
              {stat.label}
            </p>
            <p className="mt-1 text-lg font-bold text-black">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
