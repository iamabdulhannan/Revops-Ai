"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { DepartmentAuditTable } from "@/components/features/compliance/DepartmentAuditTable";
import {
  complianceDepartments,
  complianceViolations,
} from "@/data/compliance-data";
import type { ComplianceDepartment, ComplianceStatus } from "@/types";

function recalcStatus(score: number): ComplianceStatus {
  if (score >= 80) return "compliant";
  if (score >= 60) return "at-risk";
  return "critical";
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function AuditScannerPage() {
  const [departments, setDepartments] =
    useState<ComplianceDepartment[]>(complianceDepartments);
  const [scanningId, setScanningId] = useState<string | null>(null);
  const [scanAllLoading, setScanAllLoading] = useState(false);

  function handleScan(deptId: string) {
    setScanningId(deptId);

    setTimeout(() => {
      setDepartments((prev) =>
        prev.map((dept) => {
          if (dept.id !== deptId) return dept;
          const newScore = Math.min(100, dept.score + randomInt(3, 8));
          return {
            ...dept,
            lastScanned: "Just now",
            score: newScore,
            status: recalcStatus(newScore),
          };
        })
      );
      setScanningId(null);
    }, 2000);
  }

  function handleScanAll() {
    setScanAllLoading(true);

    setTimeout(() => {
      setDepartments((prev) =>
        prev.map((dept) => {
          const newScore = Math.min(100, dept.score + randomInt(2, 5));
          return {
            ...dept,
            lastScanned: "Just now",
            score: newScore,
            status: recalcStatus(newScore),
          };
        })
      );
      setScanAllLoading(false);
    }, 3000);
  }

  return (
    <div>
      <PageHeader
        title="Audit Scanner"
        subtitle="Scan departments for compliance violations"
      >
        <Button onClick={handleScanAll} loading={scanAllLoading}>
          Scan All Departments
        </Button>
      </PageHeader>

      <DepartmentAuditTable
        departments={departments}
        violations={complianceViolations}
        onScan={handleScan}
        scanningId={scanningId}
      />
    </div>
  );
}
