"use client";

import { cn } from "@/lib/cn";

interface CustomerProfileProps {
  name: string;
  company: string;
  mrr: number;
  healthScore: number;
}

export function CustomerProfile({
  name,
  company,
  mrr,
  healthScore,
}: CustomerProfileProps) {
  const healthColor =
    healthScore >= 70
      ? "bg-success"
      : healthScore >= 40
        ? "bg-warning"
        : "bg-danger";

  const healthLabel =
    healthScore >= 70
      ? "Healthy"
      : healthScore >= 40
        ? "At Risk"
        : "Critical";

  return (
    <div className="rounded-[6px] bg-white p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-black">{name}</h3>
          <p className="mt-0.5 text-sm text-grey-500">{company}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn("inline-block h-2.5 w-2.5 rounded-full", healthColor)}
          />
          <span className="text-xs font-medium text-grey-700">
            {healthLabel}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border-light pt-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
            MRR
          </p>
          <p className="mt-1 text-xl font-bold text-black">
            ${mrr.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
            Health Score
          </p>
          <p className="mt-1 text-xl font-bold text-black">{healthScore}/100</p>
        </div>
      </div>
    </div>
  );
}
