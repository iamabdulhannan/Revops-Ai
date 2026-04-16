"use client";

import { useState } from "react";
import type { TimeRange } from "@/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { TimeRangeSelector } from "@/components/features/reports/TimeRangeSelector";
import { BoardReport } from "@/components/features/reports/BoardReport";
import { SalesReport } from "@/components/features/reports/SalesReport";
import { MarketingReport } from "@/components/features/reports/MarketingReport";
import { ChurnReport } from "@/components/features/reports/ChurnReport";

const reportTabs = [
  { label: "Board", value: "board" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
  { label: "Churn", value: "churn" },
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("6m");
  const [activeReport, setActiveReport] = useState("board");

  return (
    <div>
      <PageHeader title="Reports" subtitle="Generate and view revenue reports">
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </PageHeader>

      <Tabs
        tabs={reportTabs}
        activeTab={activeReport}
        onChange={setActiveReport}
        className="mb-6"
      />

      {activeReport === "board" && <BoardReport timeRange={timeRange} />}
      {activeReport === "sales" && <SalesReport timeRange={timeRange} />}
      {activeReport === "marketing" && <MarketingReport timeRange={timeRange} />}
      {activeReport === "churn" && <ChurnReport timeRange={timeRange} />}
    </div>
  );
}
