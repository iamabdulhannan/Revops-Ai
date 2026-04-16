"use client";

import React from "react";
import type { ComplianceViolation } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface ViolationsTimelineProps {
  violations: ComplianceViolation[];
  className?: string;
  limit?: number;
}

const severityVariant: Record<
  ComplianceViolation["severity"],
  "danger" | "warning" | "default" | "info"
> = {
  critical: "danger",
  high: "warning",
  medium: "default",
  low: "info",
};

const statusDotColor: Record<ComplianceViolation["status"], string> = {
  open: "bg-danger",
  "in-review": "bg-warning",
  resolved: "bg-success",
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ViolationsTimeline({
  violations,
  className,
  limit,
}: ViolationsTimelineProps) {
  const displayed = limit ? violations.slice(0, limit) : violations;

  return (
    <div className={cn("bg-white rounded-[6px] shadow-card", className)}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-sm font-semibold text-black">Recent Violations</h3>
      </div>

      {/* Violations list */}
      <div className="px-6 pb-6 space-y-4">
        {displayed.map((v) => (
          <div key={v.id} className="flex items-start gap-3">
            {/* Status dot */}
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0",
                statusDotColor[v.status]
              )}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-black truncate">
                  {v.title}
                </span>
                <Badge variant={severityVariant[v.severity]} size="sm">
                  {v.severity}
                </Badge>
              </div>

              <p className="text-xs text-grey-500 mt-1">
                {v.framework} &middot; {v.department}
              </p>

              <p className="text-xs text-grey-400 mt-0.5">
                {formatTimestamp(v.detectedAt)}
              </p>
            </div>
          </div>
        ))}

        {displayed.length === 0 && (
          <p className="text-xs text-grey-400 text-center py-4">
            No violations to display.
          </p>
        )}
      </div>
    </div>
  );
}
