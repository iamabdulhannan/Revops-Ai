"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/cn";

interface ComplianceSummaryCardsProps {
  compliant: number;
  atRisk: number;
  critical: number;
  totalChecks: number;
}

const cards = [
  {
    key: "compliant",
    label: "Compliant",
    Icon: ShieldCheck,
    bgClass: "bg-success-light",
    textClass: "text-success",
  },
  {
    key: "atRisk",
    label: "At Risk",
    Icon: AlertTriangle,
    bgClass: "bg-warning-light",
    textClass: "text-warning",
  },
  {
    key: "critical",
    label: "Critical",
    Icon: ShieldAlert,
    bgClass: "bg-danger-light",
    textClass: "text-danger",
  },
] as const;

export function ComplianceSummaryCards({
  compliant,
  atRisk,
  critical,
  totalChecks,
}: ComplianceSummaryCardsProps) {
  const counts: Record<string, number> = { compliant, atRisk, critical };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map(({ key, label, Icon, bgClass, textClass }) => (
        <div
          key={key}
          className="bg-white rounded-[6px] shadow-card p-6"
        >
          <div
            className={cn(
              "w-8 h-8 rounded-[6px] flex items-center justify-center mb-4",
              bgClass
            )}
          >
            <Icon className={cn("w-4 h-4", textClass)} />
          </div>

          <p className={cn("text-2xl font-bold", textClass)}>
            {counts[key]}
          </p>
          <p className="text-xs text-grey-500 mt-1">{label}</p>
          <p className="text-xs text-grey-400 mt-0.5">
            of {totalChecks} total checks
          </p>
        </div>
      ))}
    </div>
  );
}
