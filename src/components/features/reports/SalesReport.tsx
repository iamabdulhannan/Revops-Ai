"use client";

import type { TimeRange, RepPerformance } from "@/types";
import { MetricCard } from "@/components/data-display/MetricCard";
import { ChartCard } from "@/components/data-display/ChartCard";
import { DataTable, type Column } from "@/components/data-display/DataTable";
import { FunnelChart } from "./FunnelChart";
import { AIInsightCard } from "./AIInsightCard";
import {
  getSalesMetrics,
  getSalesFunnel,
  getRepPerformance,
  getAIInsight,
} from "@/data/mock-data";

interface SalesReportProps {
  timeRange: TimeRange;
}

const repColumns: Column<RepPerformance>[] = [
  { key: "name", label: "Rep", sortable: true },
  {
    key: "deals",
    label: "Deals",
    sortable: true,
  },
  {
    key: "pipeline",
    label: "Pipeline",
    sortable: true,
    render: (val) => `$${((val as number) / 1000).toFixed(0)}K`,
  },
  {
    key: "winRate",
    label: "Win Rate",
    sortable: true,
    render: (val) => `${val}%`,
  },
  {
    key: "avgDealSize",
    label: "Avg Deal",
    sortable: true,
    render: (val) => `$${((val as number) / 1000).toFixed(1)}K`,
  },
  {
    key: "velocity",
    label: "Velocity",
    sortable: true,
    render: (val) => `${val} days`,
  },
];

export function SalesReport({ timeRange }: SalesReportProps) {
  const metrics = getSalesMetrics(timeRange);
  const funnel = getSalesFunnel(timeRange);
  const reps = getRepPerformance();
  const insight = getAIInsight("sales", timeRange);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            change={m.change}
            changeLabel={m.changeLabel}
            trend={m.trend}
          />
        ))}
      </div>

      {/* Funnel + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Sales Funnel" subtitle="Stage conversion rates">
          <FunnelChart stages={funnel} />
        </ChartCard>
        <ChartCard title="Rep Performance" subtitle="Individual metrics">
          <DataTable columns={repColumns} data={reps} />
        </ChartCard>
      </div>

      {/* AI Insight */}
      <AIInsightCard title="Sales Performance Insights" content={insight} />
    </div>
  );
}
