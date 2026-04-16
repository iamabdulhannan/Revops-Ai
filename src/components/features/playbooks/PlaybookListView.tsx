"use client";

import { cn } from "@/lib/cn";
import type { PlaybookStep } from "@/data/playbook-data";
import { stepMeta } from "./playbook-flow-utils";

interface PlaybookListViewProps {
  steps: PlaybookStep[];
}

export function PlaybookListView({ steps }: PlaybookListViewProps) {
  return (
    <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
      <div className="relative flex flex-col gap-0">
        {steps.map((step, idx) => {
          const meta = stepMeta[step.type];
          const Icon = meta.icon;
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.id} className="relative flex items-start gap-4">
              {/* Vertical connector line */}
              {!isLast && (
                <div
                  className="absolute left-[19px] top-[40px] w-px bg-grey-300"
                  style={{ height: "calc(100% - 16px)" }}
                />
              )}

              {/* Step icon badge */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border",
                  meta.bgClass
                )}
              >
                <Icon className={cn("h-4 w-4", meta.colorClass)} />
              </div>

              {/* Content */}
              <div className="pb-6 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-semibold text-grey-400">
                    Step {step.order}
                  </span>
                  <span className="text-2xs text-grey-400 capitalize">
                    {step.type}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-semibold text-black">
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs text-grey-500">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
