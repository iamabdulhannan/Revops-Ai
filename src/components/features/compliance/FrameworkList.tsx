"use client";

import React from "react";
import type { ComplianceFramework, ComplianceStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

interface FrameworkListProps {
  frameworks: ComplianceFramework[];
  className?: string;
}

const statusBadgeVariant: Record<
  ComplianceStatus,
  "success" | "warning" | "danger"
> = {
  compliant: "success",
  "at-risk": "warning",
  critical: "danger",
};

const statusProgressColor: Record<
  ComplianceStatus,
  "success" | "warning" | "danger"
> = {
  compliant: "success",
  "at-risk": "warning",
  critical: "danger",
};

export function FrameworkList({ frameworks, className }: FrameworkListProps) {
  return (
    <div className={cn("bg-white rounded-[6px] shadow-card", className)}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-sm font-semibold text-black">Active Frameworks</h3>
        <p className="text-xs text-grey-500 mt-1">
          Regulatory frameworks being monitored
        </p>
      </div>

      {/* Framework rows */}
      <div className="px-6 pb-6">
        {frameworks.map((fw, index) => (
          <div
            key={fw.id}
            className={cn(
              "flex items-center gap-4 py-4",
              index < frameworks.length - 1 && "border-b border-grey-100"
            )}
          >
            {/* Short name */}
            <span className="text-sm font-semibold text-black w-14 flex-shrink-0">
              {fw.shortName}
            </span>

            {/* Badge */}
            <Badge variant={statusBadgeVariant[fw.status]} size="sm">
              {fw.status}
            </Badge>

            {/* Progress bar */}
            <div className="flex-1 min-w-0">
              <ProgressBar
                value={fw.score}
                color={statusProgressColor[fw.status]}
              />
            </div>

            {/* Score label */}
            <span className="text-xs font-medium text-grey-600 w-12 text-right flex-shrink-0">
              {fw.score}/100
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
