"use client";

import { cn } from "@/lib/cn";
import type { FunnelStage } from "@/types";

interface FunnelChartProps {
  stages: FunnelStage[];
  className?: string;
}

const barColors = ["bg-grey-400", "bg-grey-500", "bg-grey-700", "bg-grey-800", "bg-black"];

export function FunnelChart({ stages, className }: FunnelChartProps) {
  const maxValue = stages[0]?.value ?? 1;

  return (
    <div className={cn("space-y-3", className)}>
      {stages.map((stage, i) => {
        const widthPct = Math.max((stage.value / maxValue) * 100, 8);
        return (
          <div key={stage.name} className="flex items-center gap-3">
            <span className="text-xs text-grey-500 w-24 shrink-0 text-right truncate">
              {stage.name}
            </span>
            <div className="flex-1">
              <div
                className={cn(
                  "h-8 rounded-[4px] flex items-center px-3 transition-all duration-300",
                  barColors[i % barColors.length]
                )}
                style={{ width: `${widthPct}%` }}
              >
                <span className="text-xs font-medium text-white">
                  {stage.value.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-grey-600 w-12 shrink-0">
              {stage.rate}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
