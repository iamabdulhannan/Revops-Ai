"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { TimeRange, CampaignRow } from "@/types";
import { MetricCard } from "@/components/data-display/MetricCard";
import { ChartCard } from "@/components/data-display/ChartCard";
import { DataTable, type Column } from "@/components/data-display/DataTable";
import { FunnelChart } from "./FunnelChart";
import { AIInsightCard } from "./AIInsightCard";
import {
  getMarketingMetrics,
  getChannelPerformance,
  getMarketingFunnel,
  getCampaignROI,
  getAIInsight,
} from "@/data/mock-data";

interface MarketingReportProps {
  timeRange: TimeRange;
}

function ChannelTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-black rounded-[6px] shadow-dropdown px-3 py-2">
      <p className="text-xs font-medium text-black">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-xs text-grey-500 mt-0.5">
          {entry.dataKey === "leads" ? "Leads" : "Spend"}:{" "}
          <span className="text-black font-medium">
            {entry.dataKey === "spend"
              ? `$${((entry.value as number) / 1000).toFixed(0)}K`
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

const campaignColumns: Column<CampaignRow>[] = [
  { key: "name", label: "Campaign", sortable: true },
  { key: "channel", label: "Channel", sortable: true },
  {
    key: "spend",
    label: "Spend",
    sortable: true,
    render: (val) => `$${((val as number) / 1000).toFixed(1)}K`,
  },
  { key: "leads", label: "Leads", sortable: true },
  { key: "conversions", label: "Conversions", sortable: true },
  {
    key: "roi",
    label: "ROI",
    sortable: true,
    render: (val) => `${val}%`,
  },
];

export function MarketingReport({ timeRange }: MarketingReportProps) {
  const metrics = getMarketingMetrics(timeRange);
  const channels = getChannelPerformance(timeRange);
  const funnel = getMarketingFunnel(timeRange);
  const campaigns = getCampaignROI();
  const insight = getAIInsight("marketing", timeRange);

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

      {/* Channel Performance + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Channel Performance" subtitle="Leads by acquisition channel">
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={channels}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4" vertical={false} />
                <XAxis
                  dataKey="channel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#878787" }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#878787" }}
                  dx={-4}
                />
                <Tooltip content={<ChannelTooltip />} />
                <Bar dataKey="leads" fill="#000000" radius={[3, 3, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Marketing Funnel" subtitle="Lead to customer conversion">
          <FunnelChart stages={funnel} />
        </ChartCard>
      </div>

      {/* Campaign ROI Table */}
      <ChartCard title="Campaign ROI" subtitle="Performance by campaign">
        <DataTable columns={campaignColumns} data={campaigns} />
      </ChartCard>

      {/* AI Insight */}
      <AIInsightCard title="Marketing Channel Insights" content={insight} />
    </div>
  );
}
