"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { ComplianceDepartment, ComplianceViolation, ComplianceStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

interface DepartmentAuditTableProps {
  departments: ComplianceDepartment[];
  violations: ComplianceViolation[];
  onScan: (id: string) => void;
  scanningId: string | null;
}

const statusBadgeVariant: Record<
  ComplianceStatus,
  "success" | "warning" | "danger"
> = {
  compliant: "success",
  "at-risk": "warning",
  critical: "danger",
};

const statusProgressColor: Record<
  ComplianceStatus,
  "success" | "warning" | "danger"
> = {
  compliant: "success",
  "at-risk": "warning",
  critical: "danger",
};

const severityVariant: Record<
  ComplianceViolation["severity"],
  "danger" | "warning" | "default" | "info"
> = {
  critical: "danger",
  high: "warning",
  medium: "default",
  low: "info",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DepartmentAuditTable({
  departments,
  violations,
  onScan,
  scanningId,
}: DepartmentAuditTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white rounded-[6px] shadow-card overflow-hidden">
      {/* Table header */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-grey-100">
              <th className="px-6 py-3 w-8" />
              <th className="px-3 py-3 text-xs font-semibold text-grey-500 uppercase tracking-wide">
                Department
              </th>
              <th className="px-3 py-3 text-xs font-semibold text-grey-500 uppercase tracking-wide w-48">
                Score
              </th>
              <th className="px-3 py-3 text-xs font-semibold text-grey-500 uppercase tracking-wide">
                Status
              </th>
              <th className="px-3 py-3 text-xs font-semibold text-grey-500 uppercase tracking-wide text-center">
                Violations
              </th>
              <th className="px-3 py-3 text-xs font-semibold text-grey-500 uppercase tracking-wide">
                Last Scanned
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-grey-500 uppercase tracking-wide" />
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => {
              const isExpanded = expandedId === dept.id;
              const deptViolations = violations.filter(
                (v) => v.department === dept.name
              );
              const isScanning = scanningId === dept.id;

              return (
                <React.Fragment key={dept.id}>
                  {/* Main row */}
                  <tr
                    className={cn(
                      "border-b border-grey-100 cursor-pointer hover:bg-grey-50 transition-colors",
                      isExpanded && "bg-grey-50"
                    )}
                    onClick={() => toggleExpand(dept.id)}
                  >
                    {/* Chevron */}
                    <td className="px-6 py-4">
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 text-grey-400 transition-transform duration-200",
                          isExpanded && "rotate-90"
                        )}
                      />
                    </td>

                    {/* Department name */}
                    <td className="px-3 py-4">
                      <span className="text-sm font-medium text-black">
                        {dept.name}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <ProgressBar
                          value={dept.score}
                          color={statusProgressColor[dept.status]}
                          className="flex-1"
                        />
                        <span className="text-xs font-medium text-grey-600 w-8 text-right">
                          {dept.score}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-4">
                      <Badge variant={statusBadgeVariant[dept.status]} size="sm">
                        {dept.status}
                      </Badge>
                    </td>

                    {/* Violations count */}
                    <td className="px-3 py-4 text-center">
                      <span className="text-sm text-grey-700">
                        {dept.violationsCount}
                      </span>
                    </td>

                    {/* Last scanned */}
                    <td className="px-3 py-4">
                      <span className="text-xs text-grey-500">
                        {formatDate(dept.lastScanned)}
                      </span>
                    </td>

                    {/* Scan button */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        disabled={isScanning}
                        onClick={(e) => {
                          e.stopPropagation();
                          onScan(dept.id);
                        }}
                        className={cn(
                          "bg-black text-white px-3 py-1.5 text-xs font-medium rounded-sm transition-colors",
                          "hover:bg-grey-800 disabled:opacity-50 disabled:pointer-events-none"
                        )}
                      >
                        {isScanning ? "Scanning..." : "Scan"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded violations */}
                  {isExpanded && deptViolations.length > 0 && (
                    <tr key={`${dept.id}-expanded`}>
                      <td colSpan={7} className="bg-grey-50 px-10 py-4">
                        <div className="space-y-4">
                          {deptViolations.map((v) => (
                            <div
                              key={v.id}
                              className="bg-white rounded-[6px] border border-grey-100 p-4"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-black">
                                  {v.title}
                                </span>
                                <Badge
                                  variant={severityVariant[v.severity]}
                                  size="sm"
                                >
                                  {v.severity}
                                </Badge>
                              </div>
                              <p className="text-xs text-grey-600 mb-2">
                                {v.description}
                              </p>
                              <p className="text-xs text-grey-500 italic">
                                {v.recommendation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}

                  {isExpanded && deptViolations.length === 0 && (
                    <tr key={`${dept.id}-expanded`}>
                      <td colSpan={7} className="bg-grey-50 px-10 py-4">
                        <p className="text-xs text-grey-400 text-center">
                          No violations found for this department.
                        </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
