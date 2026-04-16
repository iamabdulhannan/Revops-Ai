"use client";

import type { TimeRange } from "@/types";
import { MetricCard } from "@/components/data-display/MetricCard";
import { ChartCard } from "@/components/data-display/ChartCard";
import { RevenueLineChart } from "@/components/data-display/RevenueLineChart";
import { RevenueBarChart } from "@/components/data-display/RevenueBarChart";
import { AIInsightCard } from "./AIInsightCard";
import {
  getBoardMetrics,
  getRevenueLineData,
  getRevenueBarData,
  getAIInsight,
} from "@/data/mock-data";

interface BoardReportProps {
  timeRange: TimeRange;
}

export function BoardReport({ timeRange }: BoardReportProps) {
  const metrics = getBoardMetrics(timeRange);
  const lineData = getRevenueLineData(timeRange);
  const barData = getRevenueBarData(timeRange);
  const insight = getAIInsight("board", timeRange);

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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend" subtitle="Monthly recurring revenue">
          <RevenueLineChart data={lineData} />
        </ChartCard>
        <ChartCard title="New vs Churned Revenue" subtitle="Monthly breakdown">
          <RevenueBarChart data={barData} />
        </ChartCard>
      </div>

      {/* AI Insight */}
      <AIInsightCard title="Revenue Highlights" content={insight} />
    </div>
  );
}
