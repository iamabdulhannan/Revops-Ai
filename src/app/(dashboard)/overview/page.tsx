"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { RevenueOverview } from "@/components/features/dashboard/RevenueOverview";
import { ChurnAnalysis } from "@/components/features/dashboard/ChurnAnalysis";
import { PipelineSummary } from "@/components/features/dashboard/PipelineSummary";
import { ChartCard } from "@/components/data-display/ChartCard";
import { RevenueLineChart } from "@/components/data-display/RevenueLineChart";
import { RevenueBarChart } from "@/components/data-display/RevenueBarChart";
import { DonutChart } from "@/components/data-display/DonutChart";
import { AIInsightCard } from "@/components/features/reports/AIInsightCard";

const recentActivity = [
  {
    id: "1",
    action: "Deal closed",
    detail: "Acme Corp - $48,000 ARR",
    time: "2 hours ago",
  },
  {
    id: "2",
    action: "New customer",
    detail: "TechFlow Inc signed up via HubSpot",
    time: "4 hours ago",
  },
  {
    id: "3",
    action: "Churn alert",
    detail: "DataSync Ltd health score dropped to 32",
    time: "6 hours ago",
  },
  {
    id: "4",
    action: "Playbook triggered",
    detail: "Re-engagement sequence for CloudOps Inc",
    time: "8 hours ago",
  },
  {
    id: "5",
    action: "Pipeline update",
    detail: "NetFlow Systems moved to Negotiation stage",
    time: "12 hours ago",
  },
];

export default function OverviewPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your revenue performance"
      />

      {/* Revenue metric cards */}
      <RevenueOverview />

      {/* Two-column grid: Churn + Pipeline */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChurnAnalysis />
        <PipelineSummary />
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="MRR Trend" subtitle="Monthly recurring revenue">
          <RevenueLineChart />
        </ChartCard>
        <ChartCard title="New vs Churned Revenue" subtitle="Monthly breakdown">
          <RevenueBarChart />
        </ChartCard>
      </div>

      <div className="mt-6">
        <ChartCard title="Revenue by Segment" subtitle="Customer plan distribution">
          <DonutChart />
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 rounded-[6px] bg-white p-6 shadow-card">
        <h3 className="text-md font-semibold text-black">Recent Activity</h3>
        <div className="mt-4 space-y-3">
          {recentActivity.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-[6px] border border-border-light px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-black">{event.action}</p>
                <p className="text-xs text-grey-500 mt-0.5">{event.detail}</p>
              </div>
              <span className="text-xs text-grey-400 shrink-0 ml-4">
                {event.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="mt-6">
        <AIInsightCard
          title="Revenue Summary"
          content="Your revenue performance shows strong momentum this quarter. ARR grew 18% to $2.4M, driven by expansion in the Growth tier. Net Revenue Retention of 112% indicates strong product-market fit. Churn decreased to 3.2% from 4.1% last quarter — the Churn Prevention playbook saved 18 accounts worth $48K in MRR. Pipeline is healthy at $890K across 42 deals with improving velocity. Focus areas: 3 deals stalled in Negotiation and 6 accounts with health scores below 50."
        />
      </div>
    </div>
  );
}
