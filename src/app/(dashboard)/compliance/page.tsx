"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ComplianceScoreGauge } from "@/components/features/compliance/ComplianceScoreGauge";
import { ComplianceSummaryCards } from "@/components/features/compliance/ComplianceSummaryCards";
import { FrameworkList } from "@/components/features/compliance/FrameworkList";
import { ViolationsTimeline } from "@/components/features/compliance/ViolationsTimeline";
import { AIInsightCard } from "@/components/features/reports/AIInsightCard";
import {
  overallComplianceScore,
  complianceSummary,
  complianceFrameworks,
  complianceViolations,
  complianceAIRecommendation,
} from "@/data/compliance-data";

export default function ComplianceDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Compliance Dashboard"
        subtitle="Monitor regulatory compliance across your operations"
      />

      {/* Score gauge + summary cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[6px] shadow-card p-6">
            <ComplianceScoreGauge score={overallComplianceScore} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <ComplianceSummaryCards
            compliant={complianceSummary.compliant}
            atRisk={complianceSummary.atRisk}
            critical={complianceSummary.critical}
            totalChecks={complianceSummary.totalChecks}
          />
        </div>
      </div>

      {/* Frameworks + Violations */}
      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <FrameworkList frameworks={complianceFrameworks} />
        <ViolationsTimeline violations={complianceViolations} limit={5} />
      </div>

      {/* AI Insight */}
      <div className="mt-6">
        <AIInsightCard
          title="Compliance Analysis"
          content={complianceAIRecommendation}
        />
      </div>
    </div>
  );
}
