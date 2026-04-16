"use client";

import React from "react";
import { FileText } from "lucide-react";
import type { ComplianceReport } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface ComplianceReportCardProps {
  report: ComplianceReport;
  onGenerate: (id: string) => void;
  onDownload: (id: string) => void;
  isGenerating: boolean;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const statusBadgeVariant: Record<
  ComplianceReport["status"],
  "success" | "warning" | "default"
> = {
  ready: "success",
  generating: "warning",
  "not-generated": "default",
};

const statusLabel: Record<ComplianceReport["status"], string> = {
  ready: "Ready",
  generating: "Generating",
  "not-generated": "Not Generated",
};

export function ComplianceReportCard({
  report,
  onGenerate,
  onDownload,
  isGenerating,
}: ComplianceReportCardProps) {
  const isReady = report.status === "ready";
  const showGenerateButton =
    report.status === "not-generated" || report.status === "generating";

  return (
    <div className="bg-white rounded-[6px] shadow-card p-6">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-[6px] flex items-center justify-center flex-shrink-0",
            isReady ? "bg-success-light" : "bg-grey-100"
          )}
        >
          <FileText
            className={cn(
              "w-5 h-5",
              isReady ? "text-success" : "text-grey-500"
            )}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-black truncate">
              {report.name}
            </h4>
            <Badge
              variant={statusBadgeVariant[report.status]}
              size="sm"
            >
              {statusLabel[report.status]}
            </Badge>
          </div>

          <p className="text-xs text-grey-500">{report.framework}</p>

          {report.lastGenerated && (
            <p className="text-xs text-grey-400 mt-1">
              Generated {formatDate(report.lastGenerated)}
              {report.fileSize && ` \u00B7 ${report.fileSize}`}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4">
        {isReady ? (
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onDownload(report.id)}
            >
              Download
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onGenerate(report.id)}
            >
              Regenerate
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            loading={isGenerating || report.status === "generating"}
            onClick={() => onGenerate(report.id)}
          >
            {isGenerating || report.status === "generating"
              ? "Generating..."
              : "Generate"}
          </Button>
        )}
      </div>
    </div>
  );
}
