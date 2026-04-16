"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "flat";
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  changeLabel,
  trend,
  className,
}: MetricCardProps) {
  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: "text-success",
    },
    down: {
      icon: TrendingDown,
      color: "text-danger",
    },
    flat: {
      icon: Minus,
      color: "text-grey-500",
    },
  };

  const { icon: TrendIcon, color } = trendConfig[trend];

  return (
    <div
      className={cn(
        "bg-white rounded-[6px] shadow-card p-6",
        "transition-shadow duration-200 hover:shadow-card-hover",
        className
      )}
    >
      <p className="text-xs uppercase tracking-wider text-grey-500 font-medium">
        {label}
      </p>
      <p className="text-2xl font-bold text-black mt-1">{value}</p>
      <div className="flex items-center gap-1.5 mt-3">
        <TrendIcon className={cn("h-3.5 w-3.5", color)} />
        <span className={cn("text-xs font-medium", color)}>
          {change > 0 ? "+" : ""}
          {change}%
        </span>
        <span className="text-xs text-grey-400">{changeLabel}</span>
      </div>
    </div>
  );
}
