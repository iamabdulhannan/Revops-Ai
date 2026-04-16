"use client";

import { Shield, AlertTriangle, TrendingDown } from "lucide-react";
import type { TimeRange, AtRiskAccount } from "@/types";
import { MetricCard } from "@/components/data-display/MetricCard";
import { ChartCard } from "@/components/data-display/ChartCard";
import { RevenueLineChart } from "@/components/data-display/RevenueLineChart";
import { DataTable, type Column } from "@/components/data-display/DataTable";
import { AIInsightCard } from "./AIInsightCard";
import { cn } from "@/lib/cn";
import {
  getChurnMetrics,
  getChurnTrendData,
  getAtRiskAccounts,
  getAIInsight,
} from "@/data/mock-data";

interface ChurnReportProps {
  timeRange: TimeRange;
}

const accountColumns: Column<AtRiskAccount>[] = [
  { key: "name", label: "Account", sortable: true },
  {
    key: "healthScore",
    label: "Health",
    sortable: true,
    render: (val) => {
      const score = val as number;
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold",
            score < 40
              ? "bg-danger-light text-danger"
              : score < 50
                ? "bg-warning-light text-warning"
                : "bg-grey-100 text-grey-600"
          )}
        >
          {score}
        </span>
      );
    },
  },
  {
    key: "mrr",
    label: "MRR",
    sortable: true,
    render: (val) => `$${(val as number).toLocaleString()}`,
  },
  { key: "riskFactor", label: "Risk Factor", sortable: true },
  {
    key: "daysSinceActivity",
    label: "Days Inactive",
    sortable: true,
    render: (val) => `${val}d`,
  },
];

const recoveryPlaybooks = [
  {
    name: "Churn Prevention",
    description: "Auto-trigger re-engagement when health drops below 50",
    saved: 18,
    icon: Shield,
  },
  {
    name: "Win-Back Campaign",
    description: "30-day email sequence for churned accounts",
    saved: 6,
    icon: TrendingDown,
  },
  {
    name: "Executive Escalation",
    description: "Alert leadership for high-value at-risk accounts",
    saved: 4,
    icon: AlertTriangle,
  },
];

export function ChurnReport({ timeRange }: ChurnReportProps) {
  const metrics = getChurnMetrics(timeRange);
  const trendData = getChurnTrendData(timeRange);
  const atRisk = getAtRiskAccounts();
  const insight = getAIInsight("churn", timeRange);

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

      {/* Churn Trend + At-Risk Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Churn Rate Trend" subtitle="Monthly churn rate %">
          <RevenueLineChart data={trendData} />
        </ChartCard>
        <ChartCard title="At-Risk Accounts" subtitle="Accounts requiring attention">
          <DataTable columns={accountColumns} data={atRisk} />
        </ChartCard>
      </div>

      {/* Recovery Playbooks */}
      <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
        <h3 className="text-base font-semibold text-black mb-4">
          Recovery Playbooks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recoveryPlaybooks.map((pb) => {
            const Icon = pb.icon;
            return (
              <div
                key={pb.name}
                className="rounded-[6px] border border-border-light p-4 hover:shadow-card transition-shadow duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-grey-600" />
                  <span className="text-sm font-semibold text-black">{pb.name}</span>
                </div>
                <p className="text-xs text-grey-500">{pb.description}</p>
                <p className="mt-2 text-xs font-medium text-success">
                  {pb.saved} accounts saved
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insight */}
      <AIInsightCard title="Churn Risk Assessment" content={insight} />
    </div>
  );
}
