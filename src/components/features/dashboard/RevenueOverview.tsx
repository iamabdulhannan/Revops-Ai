"use client";

import { cn } from "@/lib/cn";
import { TrendingUp, TrendingDown } from "lucide-react";

const metrics = [
  {
    label: "Annual Recurring Revenue",
    value: "$2.4M",
    change: "+18%",
    changeLabel: "QoQ",
    trend: "up" as const,
    positive: true,
  },
  {
    label: "Monthly Recurring Revenue",
    value: "$200K",
    change: "+$18K",
    changeLabel: "vs last month",
    trend: "up" as const,
    positive: true,
  },
  {
    label: "Churn Rate",
    value: "3.2%",
    change: "-0.9%",
    changeLabel: "vs last quarter",
    trend: "down" as const,
    positive: true,
  },
  {
    label: "Pipeline",
    value: "$890K",
    change: "42 deals",
    changeLabel: "active",
    trend: "up" as const,
    positive: true,
  },
];

export function RevenueOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-[6px] bg-white p-6 shadow-card"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
            {metric.label}
          </p>
          <p className="mt-2 text-2xl font-bold text-black">{metric.value}</p>
          <div className="mt-3 flex items-center gap-1.5">
            {metric.trend === "up" ? (
              <TrendingUp
                className={cn(
                  "h-3.5 w-3.5",
                  metric.positive ? "text-success" : "text-danger"
                )}
              />
            ) : (
              <TrendingDown
                className={cn(
                  "h-3.5 w-3.5",
                  metric.positive ? "text-success" : "text-danger"
                )}
              />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                metric.positive ? "text-success" : "text-danger"
              )}
            >
              {metric.change}
            </span>
            <span className="text-xs text-grey-500">{metric.changeLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
