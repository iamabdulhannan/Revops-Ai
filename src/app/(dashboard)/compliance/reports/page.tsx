"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ComplianceReportCard } from "@/components/features/compliance/ComplianceReportCard";
import { ReportGenerateModal } from "@/components/features/compliance/ReportGenerateModal";
import { complianceReports } from "@/data/compliance-data";
import type { ComplianceReport } from "@/types";

export default function ComplianceReportsPage() {
  const [reports, setReports] = useState<ComplianceReport[]>(complianceReports);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  function handleGenerate(reportId: string) {
    setGeneratingId(reportId);

    setTimeout(() => {
      const today = new Date().toISOString().split("T")[0];
      const fileSize = `${(Math.random() * 4 + 1).toFixed(1)} MB`;

      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "ready" as const,
                lastGenerated: today,
                fileSize,
              }
            : report
        )
      );
      setGeneratingId(null);
    }, 2500);
  }

  function handleDownload(reportId: string) {
    console.log("Download report:", reportId);
  }

  function handleNewReport(config: { framework: string; type: string }) {
    const newReport: ComplianceReport = {
      id: "rpt-" + Date.now(),
      name: `Custom ${config.framework} Report`,
      type: config.type as ComplianceReport["type"],
      framework: config.framework,
      lastGenerated: null,
      status: "not-generated",
    };
    setReports((prev) => [...prev, newReport]);
    setShowGenerateModal(false);
  }

  return (
    <div>
      <PageHeader
        title="Compliance Reports"
        subtitle="Generate audit-ready compliance reports"
      >
        <Button onClick={() => setShowGenerateModal(true)}>New Report</Button>
      </PageHeader>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ComplianceReportCard
            key={report.id}
            report={report}
            onGenerate={handleGenerate}
            onDownload={handleDownload}
            isGenerating={generatingId === report.id}
          />
        ))}
      </div>

      <ReportGenerateModal
        open={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleNewReport}
      />
    </div>
  );
}
